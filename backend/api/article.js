const queries = require('./queries')

module.exports = app => {
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation


    const save = (req, res) => {
        
        const article = { ...req.body }

        if(req.params.id) article.id = req.params.id

        try{
            existsOrError(article.name, 'Nome do artigo não informado')
            existsOrError(article.description, 'Descrição do arquivo não informada')
            existsOrError(article.categoryId, 'Categoria do artigo não informada')
            existsOrError(article.userId, 'Autor do artigo não informado')
            existsOrError(article.content, 'Conteudo não informado')
        }catch(msg) {
            res.status(400).send(msg)
        }

        if(article.id){
            app.db('articles')
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }else {//incluir
            app.db('articles')
                .insert(article)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(`erro na inserção: ${err}`))
        }

    }



        const remove = async (req, res) => {
            try{
                const rowsDelete = await app.db('articles')
                    .where({ id: req.params.id }).del()

                  //caso o valor retorne vazio  
                try{
                    
                    existsOrError(rowsDelete, 'Artigo não foi encontrado')
                }catch(msg){
                    res.status(400).send(msg)
                }

            }catch(msg){
                res.status(500).send(msg)//erro 500 -> servidor ; erro 400 -> usuário
            }
        }

        const limit = 3 //usado para paginação
        
        const get = async (req, res ) =>{

           //vai receber qual pagina quer ir
            const page = req.query.page || 1 //pagina padrao

            const result = await app.db('articles').count('id').first()//saber quantos registros tem na base de dados
            const count = parseInt(result.count)

            app.db('articles')
                .select('id', 'name', 'description')
                .limit(limit).offset(page * limit - limit)
                .then(articles => res.json({data: articles, count, limit }))
                .catch(err => res.status(500).send(err))
        }

        const getById = (req, res) => {
            app.db('articles')
            .where({id: req.params.id })
            .first()
            .then(article => {
                article.content = article.content.toString()//vem em binario
                return res.json(article)
            })
            .catch(err=> res.status(500).send(err))
        }

        //vai pegar os artigos que tenha o id das categorias pais
        const getByCategory = async (req, res) => {
            const categoryId = req.params.id //vai pegar todos os artigos da categoria informada e seus filhos
            const page = req.query.page || 1
            const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
            const ids = categories.rows.map(c => c.id)//array de id

            app.db({a: 'articles', u: 'users'})//tabelas articles e users
                .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name'})
                .limit(limit).offset(page * limit - limit)
                .whereRaw('?? = ??', ['u.id', 'a.userId'])//juntar as duas tabelas
                .whereIn('categoryId', ids)//wher id in (x, y, z)
                .orderBy('a.id', 'desc')
                .then(articles => res.json(articles))
                .catch(err => res.status(500).send(`Ocorreu um erro: ${err}`))
        
        }



        return { save, remove, get, getById, getByCategory }

}