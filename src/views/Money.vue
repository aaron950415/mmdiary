<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"></NumberPad>
    <Types :value.sync="record.type"></Types>
    <Notes class="Notes" field-name="备注" @update:value="onUpdateNotes" placeholder="在这输入备注"></Notes>
    <Tags></Tags>
  </Layout>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import Tags from "@/components/money/Tags.vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Notes from "@/components/money/Notes.vue";
import Types from "@/components/money/Types.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: { NumberPad, Notes, Tags, Types },
})
export default class Money extends Vue {
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  get recordList() {
    return this.$store.state.recordList;
  }
  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  onUpdateTypes(value: string) {
    this.record.type = value;
  }
  onUpdateAmount(value: number) {
    this.record.amount = value;
  }
  saveRecord() {
    this.$store.commit("createRecord", this.record);
  }
}
</script>


<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
  height: 100vh;
}
.Notes {
  background-color: #f5f5f5;
  padding: 12px 0;
}
</style>
