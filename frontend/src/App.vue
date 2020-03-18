
<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
		<Header title="Sistema de Gerenciamento de dados - Bernardo" :hideUserDropdown="!user" :hideToggle="!user"/>
		<Menu v-if="user"/>
		<Loading v-if="tokenValidation" />
		<Content v-else/>
		<Footer />
	</div>
</template>

<script>
//:class="{'hide-menu': !isMenuVisible}" => so vai pôr a classe hide-menu se o isMenuVisible estiver como false
import { mapState } from 'vuex'
import Header from "@/components/templates/Header"//o @ é a referencia do src do projeto
import Menu from "./components/templates/Menu"
import Content from "./components/templates/Content"
import Footer from "./components/templates/Footer"
import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'
import Loading from './components/templates/Loading'


export default {
	name: "App",
	//declarar componentes
	components: {
		Header,
		Menu,
		Content,
		Footer,
		Loading
	},
	computed: mapState(['isMenuVisible', 'user']),
	data: function(){
		return {
			tokenValidation: true
		}
	},
	methods: {
		async validateToken(){
			this.tokenValidation = true

			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)
			//se não tiver nenhum usuario no local storage ele vai pra tela de autenticacao
			if(!userData){
				this.tokenValidation = false
				return this.$router.push({ name: 'auth' })
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

			//se validar o token
			if(res.data){
				this.$store.commit('setUser', userData)


				//responsividade do menu
				if(this.$mq === 'xs' || this.$mq === 'sm'){
                this.$store.commit('toggleMenu', false)//vai fechar o menu ao entrar na categoria
            }
			} else{
				localStorage.removeItem(userKey)
				//se caso o token tiver expirado
				this.$router.push({ name: 'auth' })
			}

			this.tokenValidation = false
		}
	},
	//chamado antes do mounted
	created(){
		this.validateToken()
	}
}
</script>

<style>
	*{
		font-family: "Lato", sans-serif;/*font lato referenciada no index do public*/


	}

	body{
		margin: 0;

	}
	#app{
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		height: 100vh;/*100% da altura*/
		/*css grid*/
		display: grid;
		grid-template-rows: 60px 1fr 40px;/*header conteudo footer*/
		grid-template-columns: 300px 1fr; /*menu conteudo*/
		grid-template-areas: 
			/*linhas*/
			"header header"
			"menu content"
			"menu footer";
		}
	#app.hide-menu{
		/*vai esconder o menu*/
		grid-template-areas: 
			"header header"
			"content content"
			"footer footer";
	}


</style>