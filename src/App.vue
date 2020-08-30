<template>
  <div id="app">
    app
    <hr>
    <router-view/>
    <router-link to="/money">123</router-link><br>
    <router-link to="/label">123</router-link><br>
    <router-link to="/statistic">123</router-link><br>
  </div>
</template>
<script lang="ts">
  import { x } from './components/test.vue';
export default {
  
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
