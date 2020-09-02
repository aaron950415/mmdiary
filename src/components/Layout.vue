<template>
  <div class="nav-wrapper" :class="classPreFix && `${classFix}-wrapper`">
    <div class="content" :class="classPreFix && `${classFix}-content`">
      <slot></slot>
    </div>
    <Nav></Nav>
  </div>
</template>

<script lang="ts">
export default{
  props:['classPreFix'],
  name:'Layout'
}
</script>

<style scoped lang="scss">
  .nav-wrapper{
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .content{
    flex-grow: 1;
    overflow: auto;
  }
</style>
