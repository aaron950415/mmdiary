<template>
  <div>
    <div>
      <ul class="date" >
        <li
          v-for="item in date"
          :key="item"
          @click="dateChange($event.target.innerHTML)"
          :class="{ 'selected': item === chooseType}"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="chart" ref="wrapper"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import echarts from "echarts";
@Component
export default class Charts extends Vue {
  @Prop() chooseType?: string;
  @Prop() options?: any;
  mounted() {
    const chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    chart.setOption(this.options);
  }
  date = ["日", "月"];
  
  dateChange(value: string) {
    this.$emit('update:value',value)
  }
  
}
</script>

<style lang="scss">
.date {
  display: flex;
  margin-top: 20px;
  margin-left: 50vw;
  position: absolute;
  z-index: 10;
  transform: translateX(-80px);
  > li {
    border-radius: 5px;
    text-align: center;
    width: 80px;
    padding: 4px;
    background: grey;
    color: white;
  }
  > .selected {
    background: blue;
  }
}
.chart {
  height: 400px;
  &-wrapper {
    overflow: auto;
  }
}
</style>
