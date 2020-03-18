import axios from 'axios'

const sucess = res => res //vai passar sem tratar nada
const error = err => {
    let time = 0 
    if(401 === err.response.status) {
        //vai redirecionar à pagina inicial
        window.location = '/'
        time += 1
        if(time <= 1) alert('Sessão expirada. Realize o Login novamente')
    }else {
        return Promise.reject(err) //caso contrario vai rejeitar esta promises
    }
}

axios.interceptors.response.use(sucess, error)