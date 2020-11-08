<template>
  <div>
    <div>
      <ul class="date">
        <li
          v-for="item in date"
          :key="item"
          @click="dateChange($event.target.innerHTML)"
          :class="{ selected: item === chooseType }"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="chart" ref="wrapper"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import echarts from "echarts";
@Component
export default class Charts extends Vue {
  @Prop() chooseType?: string;
  @Prop() options?: any;
  chart?: any;

  mounted() {
    this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    this.chart.setOption(this.options);
  }
  @Watch("options")
  onOptionsChange() {
    this.chart.setOption(this.options);

    this.chart.resize();
  }

  date = ["日", "月"];
  dateChange(value: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss">
.date {
  max-width: 500px;
  display: flex;
  margin-top: 20px;
  position: absolute;
  z-index: 10;
  left: 0;
  margin-left: 50%;

  transform: translateX(-50%);
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
  top: 40px;
  height: 200px;
  overflow-y: hidden;
  &-wrapper::-webkit-scrollbar {
    display: none;
  }
  &-wrapper {
    overflow: auto;
    overflow-y: hidden;
  }
}
</style>
