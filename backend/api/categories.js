module.exports = app =>{
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation

    const save = (req, res)=> {
        const category = { ...req.body }

        //se o id vier na url é o metodo PUT
        if(req.params.id) category.id = req.params.id

        //validações
        try {
            //se caso n existir o nome
            existsOrError(category.name, 'Nome não informado')
            notExistsOrError()
        } catch(msg){
            return res.status(400).send(msg)
        }

        //se o id tiver setado
        if(category.id){
            app.db('categories')
                .update(category)
                .where({ id: category.id })
                .then(_=> res.status(204).send())
                .catch(err => req.status(500).send(err))
        } else {
            //se o category.id não estiver setado é uma inclusao
            app.db('categories')
            .insert(category)
            .then(_=> res.status(204).send())
            .catch(err =>res.status(500).send(err))
        }
        }

        const remove = async (req, res) => {
            try{
                existsOrError(req.params.id, 'Código da categoria não informado')
                
                //saber se existe subcategorias
                const subCategory = await app.db('categories')
                .where({ parentId: req.params.id })

                //não pode existir subcategorias (se existir vai retornar um erro)
                notExistsOrError(subCategory, 'Categoria possui subcategorias.')

                //saber se tem alrgum artigo associado
                const article = await app.db('articles')
                    .where({ categoryId: req.params.id })

                notExistsOrError(article, 'Categoria possui artigos armazenados.')

                //excluir
                const rowsDeleted = await app.db('categories')
                    .where({ id: req.params.id }).del()

                //caso não tenha encontrado nada
                existsOrError(rowsDeleted, 'Categoria não encontrada')

                res.status(204).send()
            } catch(msg) {
                res.status(400).send()
            }
        }
    



    const withPath = categories => {
        //pegar a categoria pai
        const getParent = (categories, parentId) => {
            const parent = categories.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null
        }

        const categoriesWithPath = categories.map(category => {
            let path = category.name
            let parent = getParent(categories, category.parentId)

            while(parent) {
                path = `${parent.name} > ${path}`
                parent = getParent(categories, parent.parentId)
            }

            return { ...category, path }
        })

        categoriesWithPath.sort((a, b) => {
            if(a.path < b.path) return -1
            if(a.path > b.path) return 1
            return 0
        })

        return categoriesWithPath
    }

    const get = (req, res) => {
        app.db('categories')//vai retornar um array de categorias
        .then(categories => res.json(withPath(categories)))
        .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('categories')
            .where({ id: req.params.id })
            .first()
            .then(category => res.json(category))
            .catch(err => res.status(500).send(err))
    }



    const toTree = (categories, tree) => {
        if(!tree) tree = categories.filter(c => !c.parentId)
        tree = tree.map(parentNode => {
            const isChild = node => node.parentId == parentNode.id
            parentNode.children = toTree(categories, categories.filter(isChild))
            return parentNode
        })
        return tree
    }

    const getTree = (req, res) => {
        app.db('categories')
            .then(categories => res.json(toTree(categories)))
            .catch(err => res.status(500).send(err))
    }                                               //vai converter as categorias com o path( categoriax > categoriaY ) para a arvore que vai ser exibida no frontend
 
    return { save, remove, get, getById, getTree }
}