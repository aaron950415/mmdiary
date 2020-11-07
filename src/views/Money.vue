<template>
  <Layout class-prefix="layout" class="noselect">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"></NumberPad>
    <Tabs :value.sync="record.type" :data-source="recordTypeList"></Tabs>
    <Notes
      :value.sync="record.createAt"
      class="Notes"
      placeholder="日期"
      type="date"
    ></Notes>
    <Notes
      :value.sync="record.notes"
      class="Notes"
      placeholder="在这输入备注"
    ></Notes>
    <Tags :value.sync="record.tags"></Tags>
  </Layout>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import Tags from "@/components/money/Tags.vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Notes from "@/components/money/Notes.vue";
import Tabs from "@/components/statistic/Tabs.vue";
import { Vue, Component } from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";

@Component({
  components: { NumberPad, Notes, Tags, Tabs },
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }
  recordTypeList = recordTypeList;
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
    createAt: new Date().toISOString(),
  };
  created() {
    this.$store.commit("fetchRecords");
  }
  mounted() {
        const div = this.$refs.pageLoad as HTMLDivElement;
 
        window.scrollTo(0, 100);
  }
  saveRecord() {
    if (this.record.amount === 0) {
      return;
    }
    if (this.record.tags.length === 0 || !this.record.tags) {
      return window.alert("请至少选择一个标签");
    }

    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert("已保存");
      this.record.notes = "";
    }
  }
}
</script>


<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
  max-height: 100vh;
}
::v-deep .Notes {
  background-color: #f5f5f5;
  padding: 12px 0;
}
</style>
