<template>
  <div class="stat">
      <div class="stat-icon">
          <i :class="icon" :style="style"></i>
      </div>
        <div class="stat-info">
            <span class="stat-title">{{ title }}</span>
            <span class="stat-value">{{ value }}</span>
        </div>
  </div>
</template>

<script>
export default {
    name: 'Stat',
    props: ['title', 'value', 'icon', 'color'],
    computed: {
        style(){
            return "color: " + (this.color || "#000") //cor passada ou a padrao
        }
    }
}
</script>

<style>
    .stat {
        flex: 1;/*vai crescer conforme a necessidad*/
        display: flex;
        border-radius: 8px;
        margin-right: 40px;
        margin-bottom: 20px;
        background-color: #fff;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15)
    }

    .stat-icon {
        display: flex;
        align-items: center;
    }
    .stat-icon i {
        font-size: 5em;
    }
    .stat-info {
        display: flex;
        flex: 1;/*as informações vão crescer mas o icone não*/
        flex-direction: column;
        align-items: flex-end; /*horizontalmente*/
    }

    .stat-title {
        font-size: 1.2em;
    }
    .stat-value {
        font-size: 2.3em;
    }
</style>