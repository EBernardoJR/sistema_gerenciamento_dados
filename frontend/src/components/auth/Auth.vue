<template>
  <div class="auth-content">
      <div class="auth-modal">
          <img src="@/assets/logo.png" width="200" alt="logo" />
          <hr>
          <div class="auth-title">
              {{ showSignup ? 'Cadrasto' : 'Login'}}
          </div>
          <!-- Cadastro (o name serve para salvar no browser para ser lembrado dps)-->
          <input v-if="showSignup" name="name" v-model="user.name" placeholder="Nome">
          <!-- email aparecerá nos dois casos -->
          <input v-model="user.email" name="email" type="text" placeholder="Email">
          <input type="password" name="password" v-model="user.password" placeholder="Senha">
          <input v-if="showSignup" v-model="user.confirmPassword" 
            type="password" placeholder="Confirme a senha">
        <button v-if="showSignup" @click="signup">Cadastrar</button>
        <button v-else @click="signin">Entrar</button>

        <!-- previnir ação padrao do link e ficar alternando entre a tela de login e cadstro-->
        <a href @click.prevent=" showSignup = !showSignup ">
            <span v-if="showSignup">Ja é cadastrado? faça o login</span>
            <span v-else>Não é cadastrado? Registre-se aqui</span>
        </a>
      </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '@/global'
import axios from 'axios'

export default {
    name: 'Auth',
    data: function(){
        return{
            showSignup: false,
            user: {}
        }
    },
    methods: {
        signin(){
            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res => {
                    //armazenando na store
                    this.$store.commit('setUser', res.data)
                    //localStorage (salva como string)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                                        //chave
                    this.$router.push({ path: '/'})
                }).catch(showError)

        },
        //cadastro
        signup(){
            axios.post(`${baseApiUrl}/signup`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.user = {}
                    this.showSignup = false
                }).catch(showError)
        }
    }
}
</script>

<style>

.auth-content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.auth-modal {
    background-color: #fff;
    width: 320px;
    padding: 35px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15)
;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.auth-title {
    font-size: 1.2rem;
    font-weight: 100;
    margin-top: 10px;
    margin-bottom: 15px;
}

.auth-modal input{
    border: 1px solid #bbb;
    width: 100%;
    margin-bottom: 15px;
    padding: 3px 10px;
    /* linha azul em volta qnd clica */
    outline: none
}

.auth-modal button{
  background-color: #626468;
  color: #fff; 
  padding: 5px 15px;
  border-radius: 5px; 
}

.auth-modal a{
    margin-top: 35px;

}
.auth-modal hr {
    border: 0;
    width: 100%;
    height: 2px;
    background-image: linear-gradient(to right, rgba(120, 120, 120, 0), rgba(120, 120, 120, 0.75), rgba(120, 120, 120, 0))
}
</style>