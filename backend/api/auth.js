const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')


module.exports = app =>{
    const signin = async (req, res) =>{

        //verificar se o email e a senha estão presentes
        if(!req.body.email || !req.body.password){
            return res.status(400).send('informe usuário e senha')
        }

        //buscar usuário
        const user = await app.db('users')
           .where({email: req.body.email })
           .first()

        if (!user) return res.status(400).send('Usuário não encontrado')
    
        //verificar se o email e a senha são os mesmos do banco de dados

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        //senha recebida
        
        if(!isMatch) return res.status(401).send('Email e/ou Senha inválidos')//401 -> acesso não autorizado
    
        //gerando o token (com validade)
        //data atual
        const now = Math.floor(Date.now() / 1000)//dividir por mil pra pegar em segundos

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now,//data de geração do token
            exp: now + (60 * 10)
            //exp: now + (60 * 60 * 24 * 3)//o token valerá 3 dias
        }

        res.json({
            ...payload, 
            token: jwt.encode(payload, authSecret)
        })//o auth vai gerar o token a partir do segredo dentro do env, do qual so o servidor q tem esse token poderá ter acesso
    }

    const validateToken = async (req,res)=>{
        const userData = req.body || null


        try{
            if(userData){
                const token = jwt.decode(userData.token, authSecret)//decodificando o token
                if(new Date(token.exp * 1000) > new Date()){
                    return res.send(true)
                }
            }
        }catch(e){

        }

        res.send(false)// token invalido

    }
    
    
    
    
    return { signin, validateToken}
}