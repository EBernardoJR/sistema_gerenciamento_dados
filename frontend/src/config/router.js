import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/components/home/Home'//caminho absoluto
import AdminPages from '../components/admin/AdminPages'
import ArticlesByCategory from '../components/article/ArticlesByCategory'
import ArticleById from '../components/article/ArticleById'
import Auth from '../components/auth/Auth'
//acessando o storage para conferir qual usuario logado
import { userKey } from '@/global'


Vue.use(VueRouter);

//rotas
const routes = [{
    name: 'home', 
    path: '/', //url
    component: Home //componente q vai ser carregado
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: {
        requiredAdmin: true //so vai para a rota se for admin
    }
    
}, {
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory
},{
    name: 'articleById',
    path: '/article/:id',
    component: ArticleById
},{
    name: 'auth',
    path: '/auth',
    component: Auth
}

];

const router = new VueRouter({
    mode: 'history', //modo
    routes: routes
})

//evento q vai ser chamado sempre q for de uma rota pra outra

router.beforeEach((to, from, next) => {//o next é pra verificar se vai continuar 
    const json = localStorage.getItem(userKey)

    //saber se a rota requer q o usuários seja admin
    if(to.matched.some(record => record.meta.requiredAdmin)){
        const user = JSON.parse(json)
        //se o usuário estiver setado e se for admin, ele vai continuar nevegando para a routa, se n for ele vai pra home
        if(!user.admin) console.log('User does not permission for to acess this router')
        user && user.admin ? next() : next({ path: '/'})
    }else{ //se a rota n tiver requiredAdmin vai seguir pra outra rota normalmente
        next()
    }
})

export default router;