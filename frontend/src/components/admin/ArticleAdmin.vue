<template>
  <div class="article-admin">
        <b-form>
            <input id="article-id" type="hidden" v-model="article.id" />
            <b-form-group label="Nome:" label-for="article-name">
                <b-form-input id="article-name" type="text"
                    v-model="article.name" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o Nome do Artigo..." />
            </b-form-group>
            <b-form-group label="Descrição:" label-for="article-description">
                <b-form-input id="article-description" type="text"
                    v-model="article.description" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe a Descrição do Artigo..." />
            </b-form-group>
            <b-form-group v-if="mode === 'save'" label="Imagem (URL):" label-for="article-image">
                <b-form-input id="article-image" type="text"
                    v-model="article.imageUrl" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe a imagem do Artigo..." />
            </b-form-group>
            <b-form-group label="Categoria:" label-for="article-categoryId">
                <b-form-select v-if="mode === 'save'"
                    id="article-categoryId"
                    :options="categories" v-model="article.categoryId" />
                <b-form-input v-else
                    id="article-categoryId" type="text"
                    v-model="article.path"
                    readonly />
            </b-form-group>

            <b-form-group label="Autor:" label-for="article-userId">
                <b-form-select v-if="mode === 'save'"
                    id="article-userId"
                    :options="users" v-model="article.userId" />
                <b-form-input v-else
                    id="article-userId" type="text"
                    v-model="article.path"
                    readonly />
            </b-form-group>
            <b-form-group v-if="mode === 'save'" label="Conteúdo: " label-for='category-content'>
              <VueEditor v-model="article.content"
                placeholder="Conteúdo do Artigo" />
            </b-form-group>
            <b-button variant="primary" v-if="mode === 'save'"
                @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'"
                @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table hover striped :items="articles" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <!-- paginação -->
        <b-pagination size="md" v-model="page"
          :total-rows="count" :per-page="limit" />
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { baseApiUrl, showError } from '../../global'
import axios from 'axios'


export default {
    name: 'ArticleAdmin',
    components: { VueEditor },
    data: function() {
        return {
            mode: 'save', //inserir categoria
            article: {},
            articles: [],
            categories: [],
            users: [],
            page: 1,
            limit: 0,//paginação
            count: 0,
            fields: [
                //modificando os campos
                { key: 'id', label: 'Código', sortable: true},
                { key: 'name', label: 'Nome', sortable: true},
                { key: 'email', label: 'Email', sortable: true},
                { key: 'description', label: 'Descrição', sortable: true},
                { key: 'actions', label: "Ações", }
            ]
        }
    },
    methods: {
        loadArticles() {
            //carregar usuários
            const url = `${baseApiUrl}/articles?page=${this.page}`
            axios.get(url).then(response => {
              // this.articles = response.data
              this.articles = response.data.data
              this.count = response.data.count
              this.limit = response.data.limit              


              })
        },
        reset(){
            this.mode = 'save'
            this.article = {},//zerar o objeto category
            this.loadArticles()
        },
        save(){
            //descobrir qual metodo usar (post, put)
            //se o id tiver setado o metodo sera put
            const method = this.article.id ? 'put' : 'post'
            const id = this.article.id ? `/${this.article.id}` : ''
            axios[method](`${baseApiUrl}/articles${id}`, this.article)
                .then(() => {
                    this.$toasted.global.defaultSucess()//vai mandar a msg de sucesso
                    this.reset()
                }).catch(showError)
        },
        remove(){
            const id = this.article.id
            axios.delete(`${baseApiUrl}/articles/${id}`)
                .then(()=>{
                    this.$toasted.global.defaultSucess()//mostra  msg no canto superior da tela
                    this.reset()
                }
                ).catch(showError)
                this.loadArticles()
        },
        loadArticle(article, mode = 'save'){
            this.mode = mode
            axios.get(`${baseApiUrl}/articles/${article.id}`)//o id do artigo q recebeu
              .then(res => this.article = res.data)
            },//coloca o usuário selecionado no estado
            
        loadCategory(){
          const url = `${baseApiUrl}/categories`
          axios.get(url).then(res =>{
            this.categories = res.data.map(category =>{
              return { value: category.id, text: category.path}
            })
          })
        },
        loadUsers(){
          const url = `${baseApiUrl}/users`
          axios.get(url).then(res =>{
            this.users = res.data.map(user =>{
              return {value: user.id, text: `${user.name} - ${user.email}`}
            })
          })
        }
        },
    watch: {
      page(){//monitorar a paginação
        this.loadArticles()
      }
    },
    mounted() {
        this.loadArticles()
        this.loadCategory()
        this.loadUsers()
    }
}
</script>

<style>

</style>

