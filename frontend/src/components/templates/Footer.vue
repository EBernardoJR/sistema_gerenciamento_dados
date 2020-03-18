<template>
  <footer class="footer">
      <span>Copyright <strong>Bernardo Inc</strong> &copy; 2020</span>
  </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
    .footer{
        grid-area: footer;
        background-color: #ddd;
        color: #333;

        display: flex;
        align-items: center; /*coluna*/
        justify-content: flex-end; /*linha*/
        padding-right: 10px;/*não ficar colado do lado direito*/
    }
</style>