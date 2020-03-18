<template>
    <div class="user-dropdown">
        <div class="user-button">
            <span class="d-none d-sm-block">{{ user.name }}</span>
            <div class="user-dropdown-img">
                <Gravatar :email="user.email" alt="User" />
            </div>
            <i class="fa fa-angle-down"></i>
        </div>

        <div class="user-dropdown-content">
            <!-- utilizando as routas  -->
            <router-link to="/admin" v-if="user.admin"> <i class="fa fa-cogs"></i> Administração</router-link>
            <a href @click.prevent="logout"><i class="fa fa-sign-out"></i> Sair</a>
        </div>

    </div>
</template>

<script>
//o gravatar vai gerar uma imagem com base no email
import { mapState } from 'vuex'
import Gravatar from 'vue-gravatar'//avatar
//logout
import { userKey } from '@/global'


export default {
    name: "UserDropdown",
    components: { Gravatar },
    computed: mapState(['user']),
    methods: {
        logout() {
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            this.$router.push({ name: 'auth' })
        }
    }

}
</script>

<style>
    .user-dropdown {
    
        height: 100%;
    }
    .user-button {
        display: flex;
        align-items: center;
        color: #fff;
        font-weight: 100;
        height: 100%;
        padding: 0px 20px;

    }

    .user-dropdown:hover {
        background-color: rgba(0, 0, 0, 0.247);
    }
    .user-dropdown-img {
        margin: 0px 10px;

    }
    .user-dropdown-img > img {
        height: 37px;
        border-radius: 15px;
    }

    .user-dropdown-content {
        position: absolute;
        right: 0px;
        background-color: #f9f9f9;
        min-width: 206px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.247);
        padding: 10px;
        z-index: 1; /*vai ter preferencia e aparecerá na frente das outras*/

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        visibility: hidden;/*não mostrará*/
        opacity: 0;
        transition: visibility 0s, opacity 0.5s linear;


    }
    .user-dropdown:hover .user-dropdown-content{
        /*quando o mouse estiver em cima do dropdown, o conteudo será mostrado*/
        visibility: visible;
        opacity: 1;
    }
    .user-dropdown-content a{
        text-decoration: none;
        color: #000;
        padding: 10px;
    }
    .user-dropdown-content a:hover{
        background-color: #ededed;
        font-size: 1.2em;
        text-decoration: none;
        color: #000;
    }
</style>