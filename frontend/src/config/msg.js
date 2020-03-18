import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {//colocando o toasted no vue
    iconPack: 'fontawesome',
    duration: 3000 //padrão da msg
})

Vue.toasted.register(
    'defaultSucess',
    'Operação Realizada com sucesso',
    { type: 'sucess', icon: 'check' }//check da fontawesome
)

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Ops... erro inesperado' : payload.msg,
    { type: 'error', icon: 'times' }
)