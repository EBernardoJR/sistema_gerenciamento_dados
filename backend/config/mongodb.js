const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/knowledge_stats', { useNewUrlParser: true })//vai criar o banco automaticamente
    .catch(e => {
        const msg = 'ERRO!! Não foi possivel conectar-se ao MongoDB'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })