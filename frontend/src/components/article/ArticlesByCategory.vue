<template>
  <div class="articles-by-category">
      <PageTitle icon="fa fa-folder-o"
        :main="category.name" sub="Categoria" />
        <ul>
            <li v-for="article in articles" :key="article.id">
                <ArticleItem :article="article" />
            </li>
        </ul>
        <div class="load-more">
            <button v-if="loadMore" class="btn btn-lg btn-outline-primary" @click="getArticles">Carregar mais artigos</button>
        </div>
  </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../templates/PageTitle'
import ArticleItem from './ArticleItem'

export default {
    name: 'ArticlesByCategory',
    components: { PageTitle, ArticleItem },
    data: function(){
        return {
            category: {},
            articles: [],
            page: 1,
            loadMore: true
        }
    },
    methods: {
        getCategory(){
            const url = `${baseApiUrl}/categories/${this.category.id}`
            axios(url).then(res => this.category = res.data)
        },
        getArticles(){
            const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`
            axios(url).then(res => {
                this.articles = this.articles.concat(res.data) //adiocionar a nova requisição sem alterar os artigos ja preenchido
                this.page++

                if(res.data.length === 0) this.loadMore = false //primeira requisição q n voltar mais nada, vai sumir o botão
            })
        }
    },
    watch: {
        //vai responder a cada mundança de routa
        $route(to){
            this.category.id = to.params.id
            this.articles = []
            this.page = 1
            this.loadMore = true

            this.getCategory()
            this.getArticles()
        }
    },
    mounted(){
        //colocando o id passado coko parametro na rota
        this.category.id = this.$route.params.id
        this.getCategory()
        this.getArticles()
    }
}
</script>

<style>
    .articles-by-category ul {
        list-style-type: none;
        padding: 0px;

    }
    .load-more{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }
</style>