//criptografar a senha
const bcrypt = require('bcrypt-nodejs')


//o app está relacionado ao app do index.js
module.exports = app => {
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation
    const encryptPassword = password => {
        //a regra da encriptação
        const salt = bcrypt.genSaltSync(10)//numero de repetição para processar os dados
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = {...req.body}
        //se vier nos parametros da requisição
        if(req.params.id) user.id = req.params.id

        if(!req.originalUrl.startsWith('/users')) user.admin = false //se url n for /users (não ficará disponivel no signup)

        
        if(!req.user || !req.user.admin) user.admin = false


        try{
            existsOrError(user.name, 'Nome não encontrado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação de senha inválida')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            const userFromDB = await app.db('users')//tabela que vai buscar o usuário
                .where({ email: user.email }).first()//pegar o primeiro  user
        
            if(!user.id){//se o id do usuário nao for passado não pode inserir 
                notExistsOrError(userFromDB, 'Usuário já cadrastado')//se existir vai mandar a msg
            }
        } catch(msg){
            return res.status(400).send(msg)//vai mandar a msg dos respectivos erros(nome nao informado...)
        }

        user.password = encryptPassword(user.password)//encriptografar a senha
        delete user.confirmPassword

        if(user.id){
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .whereNull('deletedAt')
                .then(_ => req.status(204).send())//se o update der certo
                .catch(error => res.status(500).send(error))
            } else{
                app.db('users')
                    .insert(user)
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }
    
    }

    //pegar o usuário
    const get = (req, res)=>{
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .whereNull('deletedAt')
            .then(users => res.json(users))//se a requisição for bem sucedida, vai retornar os usuários
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id })
            .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }
    

    //remover o usuário do sistema (não do banco de dados)
    const remove = async (req, res) => {
        try {
            const articles = await app.db('articles')
                .where({ userId: req.params.id })
            notExistsOrError(articles, 'Usuário possui artigos.')

            const rowsUpdate = await app.db('users')
                .update({deletedAt: new Date()})//colocar no banco de dados a data q o usuario foi deletado
                .where({ id: req.params.id })
            existsOrError(rowsUpdate, 'Usuário não foi encontrado.')


            req.status(204).send()
        } catch(msg){
            res.status(400).send(msg)
        }
    }

    //retornar todas as funções que deseja pôr no app
    return {
        save,
        get,
        getById,
        remove
    }
}