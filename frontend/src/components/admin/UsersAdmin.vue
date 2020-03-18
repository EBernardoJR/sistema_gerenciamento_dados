<template>
  <div class="users-admin">
      <b-from>
          <input id="user-id" type="hidden" v-model="user.id" />
          <!-- primeira linha -->
          <b-row>
              <!-- dispositivos medios = 6/colunas e dispositivos pequenos = 12/12 colunas  -->
              <b-col md="6" sm="12">
                  <b-form-group label="Nome:" label-for="user-name">
                      <b-form-input id="user-name" type="text" v-model="user.name"
                        required :readonly="mode === 'remove'" placeholder="Informe o nome do Usuário" />

                  </b-form-group>
              </b-col>
              <b-col md="6" sm="12">
                  <b-form-group label="Email: " label-for="user-email">
                      <b-form-input id="user-email" type="text" v-model="user.email"
                        required :readonly="mode === 'remove'" placeholder="Informe o Email do Usuário" />

                  </b-form-group>
              </b-col>
          </b-row>

        <b-form-checkbox id="user-admin" v-show="mode === 'save'" v-model="user.admin" class="mt-3 mb-3">
            Administrador
        </b-form-checkbox>
          <!-- segunda linha -->
          <b-row v-show="mode === 'save'">
              <!-- dispositivos medios = 6/colunas e dispositivos pequenos = 12/12 colunas  -->
              <b-col md="6" sm="12">
                  <b-form-group label="Senha:" label-for="user-password">
                      <b-form-input id="user-password" type="password" v-model="user.password"
                        required placeholder="Informe a senha do Usuário" />

                  </b-form-group>
              </b-col>
              <b-col md="6" sm="12">
                  <b-form-group label="Confirmação de Senha:" label-for="user-confirm-password">
                      <b-form-input id="user-confirm-password" type="password" v-model="user.confirmPassword"
                        required placeholder="Confirme a senha do Usuário" />

                  </b-form-group>
              </b-col>
          </b-row>
            <!-- botões de ações -->
        <b-row>
            <b-col xs="12">

            <b-button variant="primary mb-3" v-if="mode ==='save'" @click="save">Salvar</b-button>
            <b-button variant="danger mb-3" v-if="mode ==='remove'" @click="remove">Remover</b-button>
            <b-button class="ml-2 mb-3" @click="reset">Cancelar</b-button>
            </b-col>
        </b-row>
        <hr>
      </b-from>
      <!-- listar os usuários -->
      <b-table hover striped :items="users" :fields="fields">
          <template slot="actions" slot-scope="data">
              <b-button variant="warning" @click="loadUser(data.item)" class="mr-2 mt-2">
                  <i class="fa fa-pencil"></i>
              </b-button>
              <!-- alem de mostrar o button de remove, possibilitando a chamada da função, ai desabilitar o button save -->
              <b-button variant="danger" @click="loadUser(data.item, 'remove')" class="mr-2 mt-2">
                  <i class="fa fa-trash"></i>
              </b-button>
          </template>
      </b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from '../../global'
import axios from 'axios'


export default {
    name: "UsersAdmin",
    data: function() {
        return {
            mode: 'save', //inserir user
            user: {},
            users: [],
            fields: [
                //modificando os campos
                { key: 'id', label: 'Código', sortable: true},
                { key: 'name', label: 'Nome', sortable: true},
                { key: 'email', label: 'Email', sortable: true},
                { key: 'admin', label: 'Administrador', sortable: true, 
                    formatter: value => value ? 'Sim' : 'Não'},
                { key: 'actions', label: "Ações", }
            ]
        }
    },
    methods: {
        loadUsers() {
            //carregar usuários
            const url = `${baseApiUrl}/users`
            axios.get(url).then(response => {
                this.users = response.data
            })
        },
        reset(){
            this.mode = 'save'
            this.user = {},//zerar o objeto user
            this.loadUsers()
        },
        save(){
            //descobrir qual metodo usar (post, put)
            //se o id tiver setado o metodo sera put
            const method = this.user.id ? 'put' : 'post'
            const id = this.user.id ? `/${this.user.id}` : ''
            axios[method](`${baseApiUrl}/users${id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSucess()//vai mandar a msg de sucesso
                    this.reset()
                }).catch(showError)
        },
        remove(){
            const id = this.user.id
            axios.delete(`${baseApiUrl}/users/${id}`)
                .then(()=>{
                    this.$toasted.global.defaultSucess()//mostra  msg no canto superior da tela
                    this.reset()
                }
                ).catch(showError)
                this.loadUsers()
        },
        loadUser(user, mode = 'save'){
            this.mode = mode
            this.user = { ...user }//coloca o usuário selecionado no estado
        }
    },
    mounted() {
        this.loadUsers()
    }
}
</script>

<style>

</style>