<template>
  <div>
    <ul class="tabs" :class="{[classPrefix+'-tabs-item']:classPrefix}">
      <li class="tabs-item" v-for="item in dataSource" :key="item.value" @click="select(item)" :class="{selected: item.value===value,[classPrefix+'-tabs-item']:classPrefix}">{{item.text}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/member-delimiter-style */
import { Vue,Component,Prop } from "vue-property-decorator";
  type DataSourceItem={text: string, value: string}
@Component
export default class Date extends Vue {
  @Prop({required:true,type:Array}) dataSource!: DataSourceItem[]
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;

  select(item: DataSourceItem){

    this.$emit('update:value',item.value)
  }


}
</script>

<style lang="scss" scoped>
.tabs {
  background: #dac9c9;
  display: flex;
  text-align: center;
  font-size: 24px;
  &-item {
    width: 50%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>
