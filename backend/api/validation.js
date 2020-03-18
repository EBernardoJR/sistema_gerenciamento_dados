module.exports = app => {
    //validar usuário
function existsOrError(value, msg){
    //se o valor não existir vai gerar um erro

    if(!value) throw msg//se o valor não estiver setado
    if(Array.isArray(value) && value.length === 0 )throw msg//se for um array e estiver vazio
    if(typeof value === 'string' && !value.trim()) throw msg // testar se a string está vazia  
    
}

function notExistsOrError(value, msg){
    try{ 
        existsOrError(value, msg)
    } catch(msg){
        return
    }
    throw msg
}

function equalsOrError(valueA, valueB, msg){
    if(valueA !== valueB) throw msg
}

return{
    existsOrError,
    notExistsOrError,
    equalsOrError
}
}