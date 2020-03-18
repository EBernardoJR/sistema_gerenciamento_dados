<template>
  <div class="loading">
      <img src="@/assets/loading.gif" alt="loading...">
  </div>
</template>

<script>
export default {
    name: 'Loading'
}
</script>

<style>
    .loading {
        grid-area: content; /*vai ocupar a area q o conteudo ocupa*/
        display: flex;
        justify-content: center;
        align-items: center
    }
</style>