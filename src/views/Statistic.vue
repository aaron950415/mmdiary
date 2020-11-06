<template>
  <Layout class="noselect">
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"></Tabs>
    <div class="chart-wrapper" ref="chartWrapper">
      <Charts
        class="chart"
        :options="options"
        @update:value="dataType"
        :chooseType="chooseType"
      ></Charts>
    </div>
    <ol v-if="groupList.length > 0">
      <li v-for="(group, index) in groupList" :key="index">
        <h3 class="tittle">
          {{ beautify(group.tittle) }} <span>总计￥{{ group.total }}</span>
        </h3>
        <ol>
          <li class="record" v-for="item in group.items" :key="item.id">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">目前没有相关记录</div>
  </Layout>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/member-delimiter-style */
import { Vue, Component } from "vue-property-decorator";
import Tabs from "@/components/statistic/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import Charts from "@/components/statistic/Charts.vue";
import dayjs from "dayjs";
import clone from "@/lib/clone";
@Component({
  components: { Tabs, Charts },
})
export default class Statistic2 extends Vue {
  data() {
    return {
      chooseType: "日",
    };
  }
  mounted() {
    (this.$refs.chartWrapper as HTMLDivElement).scrollLeft = 9999;
  }
  dataType(payload: string) {
    this.chooseType = payload.trim();
  }
  tagString(tags: Tag[]) {
    if (tags.length === 0) {
      return "没有标签";
    } else {
      return tags.map((t) => t.name).join(",");
    }
  }
  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("MM月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }
  get options() {
    return {
      grid: {
        left: 0,
        right: 0,
      },
      xAxis: {
        type: "category",
        data: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
        ],
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: "#666",
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
          data: [
            820,
            932,
            901,
            934,
            1290,
            1330,
            1320,
            820,
            932,
            901,
            934,
            1290,
            1330,
            1320,
            820,
            932,
            901,
            934,
            1290,
            1330,
            1320,
            820,
            932,
            901,
            934,
            1290,
            1330,
            1320,
            1,
            1,
          ],
          type: "line",
        },
      ],
          tooltip: { show: true, triggerOn: "click", formatter: "{c}", position:'top' },
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
      .sort(
        (a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()
      );
    if (newList.length === 0) {
      return [];
    }
    type Result = { tittle: string; total?: number; items: RecordItem[] }[];
    const result: Result = [
      {
        tittle: dayjs(newList[0].createAt).format("YYYY-MM-DD"),
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
          tittle: dayjs(current.createAt).format("YYYY-MM-DD"),
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
  chooseType = "周";
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
.noResult {
  padding: 16px;
  text-align: center;
}
.chart {
  width: 430%;
}
.chart-wrapper::-webkit-scrollbar {
  display: none;
}
</style>
