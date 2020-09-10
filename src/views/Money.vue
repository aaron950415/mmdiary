<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"></NumberPad>
    <Types :value.sync="record.type"></Types>
    <Notes @update:value="onUpdateNotes"></Notes>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"></Tags>
  </Layout>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import Tags from "@/components/money/Tags.vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Notes from "@/components/money/Notes.vue";
import Types from "@/components/money/Types.vue";
import { Vue, Component, Watch } from "vue-property-decorator";
import model from '@/model.ts';
const recordList=model.fetch()

@Component({
  components: { NumberPad, Notes, Tags, Types },
})
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];
  recordList: RecordItem[]=[]
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  onUpdateTags(value: string[]) {this.record.tags=value}
  onUpdateNotes(value: string) {this.record.notes=value}
  onUpdateTypes(value: string) {this.record.type=value}
  onUpdateAmount(value: number) {this.record.amount=value}
  saveRecord(){
    const record2: RecordItem=model.clone(this.record)
    record2.createAt= new Date();
    this.recordList.push(record2)
  }
  @Watch('recordList')
  onRecordListChange(){
    model.save(this.recordList)
    console.log(this.recordList)
  }
}
</script>


<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
  height: 100vh;
}
</style>
