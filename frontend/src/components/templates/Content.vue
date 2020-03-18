<template>
    <div class="content">
    <!-- visualizar as rotas -->
    <router-view></router-view>
  </div>
</template>

<script>


export default {
    name: 'Content'
}
</script>

<style>
    .content {
        grid-area: content; /*a area q vai ser a grid*/
        /* background-color: #efefef;  */
        background: url('../../assets/background.jpg');
        padding: 20px;
    }
</style>