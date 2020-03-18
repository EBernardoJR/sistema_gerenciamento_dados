<template>
    <aside class="menu" v-show="isMenuVisible">
        <div class="menu-filter">
            <i class="fa fa-search fa-lg"></i>
            <input type="text" placeholder="Filtrar..."
                v-model="treeFilter" class="filter-field">
        </div>
        <Tree :data="treeData" :options="treeOptions"
            :filter="treeFilter" ref='tree' />
    </aside>
</template>

<script>
import { mapState } from 'vuex'//vai mapear os states do store
//arvore do menu
import Tree from 'liquor-tree'
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
    name: 'Menu',
    components: { Tree },
    computed: mapState(['isMenuVisible']),
    data: function(){
        return{
            treeFilter: '',
            treeData: this.getTreeData(),//qnd a promise for resolvida a arvore vai ser renderizada
            treeOptions: {
                propertyNames: {
                    'text': 'name' //para renderizar a arvore, tem q ligar a propriedade name da categoria à text
                },
                filter: {
                    emptyText: 'Categoria não encontrada'
                }
            }
        }
    },
    methods: {
        getTreeData(){
            const url = `${baseApiUrl}/categories/tree`//buscar a arvore de categoria
            return axios.get(url).then(res => res.data)//retornando os dados para qnd a função for chamada
        },
        //procurar os artigos da categoria
        onNodeSelect(node){
            this.$router.push({
                name: 'articlesByCategory',
                params:{
                    id: node.id
                }
                //verificar o tamanho do dispositivo
            })
            if(this.$mq === 'xs' || this.$mq === 'sm'){
                this.$store.commit('toggleMenu', false)//vai fechar o menu ao entrar na categoria
            }
        }
    },
    mounted(){
        //refs referencia qualquer elemento dentro do template
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
    }
}
</script>

<style>
   .menu{
       grid-area: menu;
       background: linear-gradient(to right, #232526, #414345);
       display: flex;
        flex-direction: column;
        flex-wrap: wrap;/*permite quebra de linha*/
        overflow: hidden;
    }

    .menu a, 
    .menu a:hover{
        color: #fff;
        text-decoration: none;
       

    }
    /* a classe .tree-node foi criada pela arvore */
    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover{
        background-color: rgba(255, 255, 255, 0.2);
        
    }
    .tree-arrow.has-child {
        filter: brightness(2)
    }
    .menu-filter {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px;
        padding-bottom: 8px;
        border-bottom: 1px solid #aaa;
    }
    .menu-filter i{
        color: #aaa;
        margin-right: 15px;
    }

    .menu input{
        color: #ccc;
        font-size: 1.2rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }
    .tree-filter-empty {
        color: #ccc;
        margin-left: 20px;
    }
</style>