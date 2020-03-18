<template>
  <div class="article-by-id">
    <PageTitle icon='fa fa-file-o'
        :main="article.name" :sub="article.description" />
    <div class="article-content" v-html="article.content">
        <!-- o v-html é para o conteudo ser renderizado como uma arquivo html -->
    </div>
    
  </div>
</template>

<script>
import 'highlightjs/styles/dracula.css'
import hljs from 'highlightjs/highlight.pack'
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../templates/PageTitle'


export default {
    name: 'ArticleById',
   components: { PageTitle },
   data: function(){
       return {
           article: {}
       }
   },
   mounted(){
       const url = `${baseApiUrl}/articles/${this.$route.params.id}`
       axios.get(url).then(res => this.article = res.data)
   },
   updated(){
       document.querySelectorAll('pre').forEach(e => {
           hljs.highlightBlock(e)
       })
   }

}
</script>

<style>
    .article-content {
        background-color: #FFF;
        border-radius: 8px;
        padding: 25px;

    }
    /* códigos */
    .article-content pre{
        padding: 20px;
        border-radius: 8px;
        font-size: 1.1rem;
        background-color: black;
        color: rgb(36, 204, 72);
    }
    .article-content img{
        max-width: 100%;

    }
    .article-content :last-child {
        margin-bottom: 0px;
    }
</style>