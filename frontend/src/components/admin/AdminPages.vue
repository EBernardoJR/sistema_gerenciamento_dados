<template>
  <div class="admin-pages">
      <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
        sub="Cadastros, Atualizações, entre outras ações concedidas aos administradores" />
      <div class="admin-pages-tabs">
        <!-- vue + bootstrap -->
        <b-card no-body>
            <b-tabs card>
              <!-- pages -->
              <!-- active é a pagina q vai ta selecionada por padrão -->
              <b-tab title="Artigos" active>
                <ArticleAdmin />
              </b-tab>
              <b-tab title="Categorias" >
                <CategoriesAdmin />
              </b-tab>
              <b-tab title="Usuários">
                <UsersAdmin />
              </b-tab>
            </b-tabs>
        </b-card>
      </div>
  </div>
</template>

<script>
import PageTitle from '../templates/PageTitle'
import UsersAdmin from './UsersAdmin'
import CategoriesAdmin from './CategoriesAdmin'
import ArticleAdmin from './ArticleAdmin'

export default {
    name: 'AdminPages',
    components: { PageTitle, UsersAdmin, CategoriesAdmin, ArticleAdmin }
}
</script>

<style>

</style>