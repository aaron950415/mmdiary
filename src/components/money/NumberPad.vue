<template>
  <div class="numberPad noselect">
    <div class="output">{{output}}</div>
    <div @click="choosed" class="buttons">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button @click="Del">Del</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button @click="Clear">Clear</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="OK" @click="OK">OK</button>
      <button class="zero">0</button>
      <button>.</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class NumberPad extends Vue {
  @Prop(Number) readonly value!: number;
  output = this.value.toString();
  choosed(e: MouseEvent) {
    if ((e.target as HTMLElement).className === "buttons") {
      return;
    }
    const input = (e.target as HTMLElement).innerHTML;

    if (input === "Del" || input === "OK" || this.output.length === 16) {
      return;
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
      } else if (input === ".") {
        this.output += input;
      }
      return;
    }
    if (input === "." && this.output.indexOf(".") >= 0) {
      return;
    } else {
      this.output += input;
    }
    return;
  }
  Clear() {
    this.output = "0";
  }
  Del() {
    this.output.length !== 1
      ? (this.output = this.output.slice(0, -1))
      : (this.output = "0");
  }
  OK() {
    const number=parseFloat(this.output)
    this.$emit("update:value",number);
    this.$emit('submit',number)
    this.output = "0";
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
  }
  .buttons {
    @extend %clearFix;
    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;
      &.OK {
        height: 64 * 2px;
        float: right;
      }
      &.zero {
        width: 25 * 2%;
      }
      $bg: #f2f2f2;
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4 * 2%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 4 * 2%);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 4 * 3%);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 4 * 4%);
      }
      &:nth-child(14) {
        background: darken($bg, 4 * 5%);
      }
      &:nth-child(12) {
        background: darken($bg, 4 * 6%);
      }
    }
  }
}
</style>
