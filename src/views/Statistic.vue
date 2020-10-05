<template>
  <Layout class="noselect">
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"></Tabs>
    <ol v-if="groupList.length>0">
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
    <div v-else class="noResult">
      目前没有相关记录
    </div>
  </Layout>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/member-delimiter-style */
import { Vue, Component } from "vue-property-decorator";
import Tabs from "@/components/statistic/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";
@Component({
  components: { Tabs },
})
export default class Statistic2 extends Vue {
  tagString(tags: Tag[]) {
    if(tags.length===0){
      return "没有标签"
    }else{
    return  tags.map(t=>t.name).join(",")
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
      if(newList.length===0){
return []
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
  type = "-";
  typeList = recordTypeList;

  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: #c4c4c4;
  &.selected {
    background: #dceb11;
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
.noResult{
  padding: 16px;
  text-align:center;
}
</style>
