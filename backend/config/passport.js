//verficação do token
const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt} = passportJwt

module.exports = app => {

    //parametros da estrategia
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()//token que foi extraido
    }

    const strategy = new Strategy(params, (payload, done) =>{
        app.db('users')
            .where({ id: payload.id })
            .first()
            .then(user => done(null, user ? { ...payload } : false))//primeiro parametro é o parametro de erro
            .catch(err => done(err, false))
    })//o payload é o que foi passado no auth.js

    passport.use(strategy)
    
    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}