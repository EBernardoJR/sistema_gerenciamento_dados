//vai ficar monitorando mudanças no BD

const schedule = require('node-schedule')

module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function(){
        const usersCount = await app.db('users').count('id').first()
        const categoriesCount = await app.db('categories').count('id').first()
        const articlesCount = await app.db('articles').count('id').first()

        const { Stat } = app.api.stats
        
        const lastStat = await Stat.findOne({}, {}, {
            sort: { 'createdAt' : -1 }
        })

        //nova estatisticas 

        const stat = new Stat({
            users: usersCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            createdAt: new Date()
        })

        //saber se há mudanças

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeArticles = !lastStat || stat.articles !== lastStat.articles
        
        
        if(changeUsers || changeCategories || changeArticles){
            //inserindo os dados atualizados no mongodb
            stat.save().then(() => console.log('[Stats] As estatísticas foram atualizadas'))
        } //o save vai salvar as mudanças

    })//vai monitorar de 1 em 1 minuto
}