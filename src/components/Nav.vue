<template>
  <nav>
    <router-link class="item" to="/labels" active-class="selected"><Icon class="labels" name='labels'></Icon>标签</router-link>
    <router-link class="item" to="/money" active-class="selected"><Icon class="money" name='money'></Icon>记账</router-link>
    <router-link class="item" to="/statistic" active-class="selected"><Icon class="statistic" name='statistic'></Icon>统计</router-link>
  </nav>
</template>

<script lang="ts">

export default{
  name:'Nav'
}
</script>
<style lang="scss" scoped>
 @import "~@/assets/style/helper.scss";
  nav{
    position: fixed;
    left: 0;
    bottom: 0;width: 100%;
    max-width: 500px;
    margin-left: 50%;
    transform: translateX(-50%);
    display: flex;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
    flex-direction: row;
    font-size: 12px;
    background-color: #fff;
    > .item{  
      padding: 12px;
      width: 33.3333333%;
      display: flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;
      .icon{
        width: 32px;
        height: 32px;
      }
    }
    > .item.selected{
      color: $color-highlight;
    }
  }
</style>
