const admin = require('./admin')

module.exports = app =>{

    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin) //essas rotas serão publicas
    app.post('/validateToken', app.api.auth.validateToken)


    //essas rotas serão privadas
    app.route('/users') //rota + o metodo
        .all(app.config.passport.authenticate())//validação do token(os metodos post e get irão passar por esse filtro)
        .post(admin(app.api.user.save))//função save dentro de user.js
                        //pasta api/ arquivo user/ funcao save
        .get(admin(app.api.user.get))

    //se caso o id vier como parametro no link, metodo put

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))
        .delete(admin(app.api.user.remove))

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.categories.get))
        .post(admin(app.api.categories.save))


    //tem que colocar as rotas especificas antes da /categories/:id
    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.categories.getTree)

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.categories.getById)
        .put(admin(app.api.categories.save))
        .delete(admin(app.api.categories.remove))


    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.article.get))
        .post(admin(app.api.article.save))

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getById)
        .put(admin(app.api.article.save))
        .delete(admin(app.api.article.remove))//so vai retornar a função middleware do remove se o usuário for admin

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getByCategory)

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stats.get)

}