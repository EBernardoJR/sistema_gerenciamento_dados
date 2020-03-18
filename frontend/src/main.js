import Vue from 'vue'
import 'font-awesome/css/font-awesome.css'//icone
import App from './App'
import store from './config/store'
//cadastra as dependencias como o axios q retornar a mensasgem de expiração do token
import './config/bootstrap'
import './config/msg'
import './config/axios'
import './config/mq'
import router from './config/router'
//import axios from 'axios'

Vue.config.productionTip = false

//configurando o token no header (temporariamente)
//axios.defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6InRlc3RlIiwiZW1haWwiOiJ0ZXN0ZUBnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTgxMzMzNDMwLCJleHAiOjE1ODE1OTI2MzB9.GqfM1P2uZA3edFs-o5e6JI4ZRfEpi1h04y_85wtEebY'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')