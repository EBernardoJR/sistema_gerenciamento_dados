const express = require("express")
const app = express()
const port = 3000
const consign = require('consign')
const db = require('./config/db.js')
const mongoose = require('mongoose')
require('./config/mongodb.js')//configuração de conexão com o mongodb

app.db = db//vai deixar o banco de dados disponivel no app, que pode ser aceessado como parametro no consign
//vai ficar disponivel o app.db 
app.mongoose = mongoose

consign()
    .include('./config/passport.js')//validação do token do usuário q está prestes a entrar
    .then('./config/middlewares.js') //vai injetar as rotas, apis dentro da app
    .then('./api/validation.js')//vai carregar primeiro a validação
    .then('./api')//vai carregar todos os arquivos dentro da pasta api
    .then('./schedule')//permite o monitoramento das estatisticas do mongodb
    .then('./config/routes.js')
    .into(app)


app.listen(port, ()=>{
    console.log(`Servidor rodando na porta: ${port}`)
})

