<template>
  <div class="page-title">
      <h1>
          <i v-if="icon" :class="icon"></i> {{ main }}
      </h1>
      <h2>{{ sub }}</h2>
      <!-- linha -->
      <hr>
  </div>
</template>

<script>
export default {
    name: "PageTitle",
    props: [
        'icon',
        'main',
        'sub'
    ]
}
</script>

<style>
    .page-title h1{
        margin: 0;
        color:rgb(131, 126, 126);
        background-color: rgba(78, 76, 76, 0.747);
        width: 50vh;
        border-radius: 5px;
        color: rgb(236, 230, 230);
    }
    .page-title h2{
        color: rgb(236, 230, 230);
        margin-top: 5px;
        font-size: 1.3em;
        background-color: rgba(78, 76, 76, 0.747);
        border-radius: 5px;
        width: 50%;
    }
</style>