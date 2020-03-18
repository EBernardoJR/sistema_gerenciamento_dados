const bodyParser = require('body-parser')
const cors = require('cors')//evita erros ao acessar a pag

module.exports = app =>{
    app.use(bodyParser.json())
    app.use(cors())
}