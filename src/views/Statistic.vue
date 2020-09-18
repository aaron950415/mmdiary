<template>
  <Layout class="noselect">
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"></Tabs>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"></Tabs>
    <ol>
      <li v-for="(group,index) in result" :key="index">
        <h3 class="tittle">{{group.tittle}}</h3>
        <ol>
          <li class="record" v-for="item in group" :key="item.id">
            <span>{{tagString(item.tags)}}</span>
            <span class="notes">{{item.notes}}</span>
            <span>￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Vue, Component } from "vue-property-decorator";
import Tabs from "@/components/statistic/Tabs.vue";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";
@Component({
  components: { Tabs },
})
export default class Statistic2 extends Vue {
  tagString(tags: Tag[]) {
    return tags.length===0 ? 'none' : tags.join(",");
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get result() {
    const { recordList } = this;
    type HashTableValue = { tittle: string; items: RecordItem[] };

    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createAt!.split("T");
      hashTable[date] = hashTable[date] || { tittle: date, items: [] };
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }
  type = "-";
  interval = "day";
  typeList = recordTypeList;
  intervalList = intervalList;

  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: white;
  &.selected {
    background: #c4c4c4;
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
  >.notes{
    margin-left: 16px;
    margin-right: auto;
    color: #999;
  }
}
</style>
