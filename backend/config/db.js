const config = require('../knexfile.js')
const knex = require('knex')(config)
//vai chmar a função passando as configurações como parametro
//pode fazer o knex migrate:latest aqui
//knex.migrate.latest([config])

module.exports = knex