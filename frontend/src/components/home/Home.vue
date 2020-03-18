<template>
  <div>
      <PageTitle icon="fa fa-home" main="Dashboard" sub="Produção, Edição, Armazenamento e Compartilhamento de Artigos" />
      <div class="stats">
        <Stat title="Categorias" :value="stat.categories"
          icon='fa fa-folder' color="#d54d50" />
          <Stat title="Artigos" :value="stat.articles"
          icon='fa fa-file' color="#3bc480" />
         <Stat title="Usuários" :value="stat.users"
          icon='fa fa-user' color="#3282cd" />
      </div>
  </div>
</template>

<script>
import PageTitle from '../templates/PageTitle'
import Stat from './Stat'
import axios from 'axios'
import { baseApiUrl } from '@/global'


export default {
    name: 'Home',
    components: { PageTitle, Stat },
    data: function(){
      //pegando dados do backend
      return {
        stat: {}
      }
    },
    methods: {
      getStats(){
        axios.get(`${baseApiUrl}/stats`).then(response => this.stat = response.data)
      }
    }, //ciclos de vidas - assim q o componente for renderizado
    mounted(){
      this.getStats()
    }
}
</script>

<style>
  .stats {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;/*vai quebrar linha caso todos os componentes n seja renderizado*/
    
  }
</style>