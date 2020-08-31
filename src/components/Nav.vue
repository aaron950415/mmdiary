<template>
  <div class="nav">

    <router-link to="/labels"><icon name='labels'></icon>标签</router-link>|
    <router-link to="/money"><icon name='money'></icon>记账</router-link>|
    <router-link to="/statistic"><icon name='statistic'></icon>统计</router-link>
  </div>
</template>

<script lang="ts">

export default{
  name:'Nav',
  data(){
    return{}
  },
  methods:{
  }
}
</script>

<style scoped>
  .nav{
    border: 1px red solid;
  }
</style>
