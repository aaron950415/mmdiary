<template>
  <Layout class="noselect">
    <Tabs
      class="tab"
      class-prefix="type"
      :data-source="typeList"
      :value.sync="type"
    ></Tabs>
    <div class="chart-wrapper" ref="chartWrapper">
      <Charts
        v-if="chooseType === 'month'"
        style="width: 200%"
        :options="chartMonthOptions"
        @update:value="dataType"
        :chooseType="chooseType"
      ></Charts>
      <Charts
        v-else
        style="width: 430%"
        :options="chartDayOptions"
        @update:value="dataType"
        :chooseType="chooseType"
      ></Charts>
    </div>
    <ol v-if="groupList.length > 0">
      <li v-for="(group, index) in groupList" :key="index">
        <h3 class="tittle">
          {{group.tittle.substr(5, 8) }} <span>totally ${{ group.total }}</span>
        </h3>
        <ol>
          <li class="record" v-for="item in group.items" :key="item.id">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>${{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">Recording Not Found</div>
  </Layout>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/member-delimiter-style */
import { Vue, Component, Watch } from "vue-property-decorator";
import Tabs from "@/components/statistic/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import Charts from "@/components/statistic/Charts.vue";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import _ from "lodash";
import { set } from "vue/types/umd";
@Component({
  components: { Tabs, Charts },
})
export default class Statistic2 extends Vue {
  data() {
    return {
      chooseType: "month",
    };
  }
  mounted() {
    window.scrollTo(0, 0);
    const chart = this.$refs.chartWrapper as HTMLDivElement;
    chart.scrollLeft = chart.scrollWidth;
  }
  updated() {
    const chart = this.$refs.chartWrapper as HTMLDivElement;
    chart.scrollLeft = chart.scrollWidth;
  }
  dataType(payload: string) {
    this.chooseType = payload.trim();
    return this.chooseType;
  }
  tagString(tags: Tag[]) {
    if (tags.length === 0) {
      return "label is null";
    } else {
      return tags.map((t) => t.name).join(",");
    }
  }
  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    console.log(day,now);
    if (day.isSame(now, "day")) {
      return "today";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "yesterday";
    } else if (day.isSame(now, "year")) {
      return day.format("MMM D");
    } else {
      return day.format("MMM D YYYY");
    }
  }
  get chartDayOptions() {
    const today = new Date();
    const array = [];
    for (let i = 0; i <= 29; i++) {
      const dateString = dayjs(today).subtract(i, "day").format("YYYY-MMM-DD");
      const found = _.find(this.groupList, { tittle: dateString });
      array.push({ date: dateString, value: found ? found.total : 0 });
    }
    let keys = array.map((item) => item.date);
    keys = keys.reverse();
    const values = array.map((item) => item.value);
    values.reverse();
    return {
      grid: {
        left: 0,
        right: 0,
      },
      xAxis: {
        type: "category",
        data: keys,
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: "#666",
          },
        },
        axisLabel: {
          formatter: function (value: string) {
            return value.substr(5);
          },
        },
      },
      yAxis: {
        type: "value",
        show: false,
      },
      series: [
        {
          symbol: "circle",
          symbolSize: 12,
          itemStyle: { borderWidth: 1, color: "#666" },
          data: values,
          type: "line",
        },
      ],
      tooltip: {
        show: true,
        triggerOn: "click",
        formatter: "{c}",
        position: "top",
      },
    };
  }
  get chartMonthOptions() {
    const today = new Date();
    const array = [];
    const found = this.groupList.map((item) => item.tittle.substr(0, 8));
    const total: any = this.groupList.map((item) => item.total);
    for (let i = 0; i <= 11; i++) {
      let c = 0;
      let count = 0;
      const dateString = dayjs(today).subtract(i, "M").format("YYYY-MMM");
      found.map((item) => {
        if (item === dateString) {
          c += total[count];
        }
        count++;
      });
      array.push({ date: dateString, value: c ? c : 0 });
    }
    let keys = array.map((item) => item.date.substr(5, 8));

    keys = keys.reverse();
    const values = array.map((item) => item.value);
    values.reverse();

    return {
      grid: {
        left: 0,
        right: 0,
      },
      xAxis: {
        type: "category",
        data: keys,
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: "#666",
          },
        },
        axisLabel: {
          formatter: function (value: string) {
            return value;
          },
        },
      },
      yAxis: {
        type: "value",
        show: false,
      },
      series: [
        {
          symbol: "circle",
          symbolSize: 12,
          itemStyle: { borderWidth: 1, color: "#666" },
          data: values,
          type: "line",
        },
      ],
      tooltip: {
        show: true,
        triggerOn: "click",
        formatter: "{c}",
        position: "top",
      },
    };
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get groupList() {
    const recordList = this.recordList;
    if (recordList.length === 0) {
      return [];
    }

    const newList = clone(recordList)
      .filter((r) => r.type === this.type)
      .sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
    if (newList.length === 0) {
      return [];
    }
    type Result = { tittle: string; total?: number; items: RecordItem[] }[];
    const result: Result = [
      {
        tittle: dayjs(newList[0].createAt).format("YYYY-MMM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.tittle).isSame(dayjs(current.createAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          tittle: dayjs(current.createAt).format("YYYY-MMM-DD"),
          items: [current],
        });
      }
    }
    result.map((group) => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    return result;
  }
  chooseType = "month";
  type = "-";
  typeList = recordTypeList;

  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: white;
  &.selected {
    background: #dac9c9;
    &::after {
      display: none;
    }
  }
}

::v-deep .interval-tabs-item {
  height: 48px;
}
%item {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 8px 16px;
  line-height: 24px;
}
.tittle {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
  > .notes {
    margin-left: 16px;
    margin-right: auto;
    color: #999;
  }
}
::v-deep .tab {
  position: fixed;
  width: 100%;
  max-width: 500px;
  z-index: 11;
}

.noResult {
  padding: 16px;
  text-align: center;
}

.chart-wrapper {
  padding-top: 48px;
  > .chart_p {
    width: 430%;
  }
  > .chart_p2 {
    width: 100%;
  }
}
.chart-wrapper::-webkit-scrollbar {
  display: none;
}
</style>
