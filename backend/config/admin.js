//validando admnistrador

module.exports = middleware =>{
    return (req, res, next) => {
        //ele so vai chamar a função middleware passada se o admin for true
        if(req.user.admin){
            middleware(req, res, next)
        } else{
            res.status(401).send('Usuário não é admnistrador.')
        }
    }
}