<template>
  <div class="numberPad">
    <div class="output">0</div>
    <div class="buttons">
      <button>1</button>
      <button>2</button>
      <button>2</button>
      <button>Del</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>Clear</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="OK">OK</button>
      <button class="zero">0</button>
      <button>.</button>
    </div>
  </div>
</template>

<script>
export default{
  name:'NumberPad'
}
</script>

<style lang="scss" scoped>
  @import '~@/assets/style/helper.scss';
  .numberPad{
    .output{
      @extend %clearFix;
      @extend %innerShadow;
      font-size:36px;
      font-family:Consolas,monospace;
      padding: 9px 16px;
      text-align:right;
    }
    .button{
      @extend %clearFix;
      > button{
        width: 25%;
        height: 64%;
        float: left;
        background:transparent;
        border:none;
        &.ok{
          height: 64*2px;
          float:right;
        }
        &.zero{
          width: 25*2%;
        }
        $bg:#f2f2f2;
        &:nth-child(2),&:nth-child(5){
          background: darken($bg,4*2%);
        }
      }
    }
  }
</style>
