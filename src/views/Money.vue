<template>
  <Layout class-prefix="layout">
    {{record}}
    <NumberPad :value.sync="record.amount"></NumberPad>
    <Types :value.sync="record.type"></Types>
    <Notes @update:value="onUpdateNotes"></Notes>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"></Tags>
  </Layout>
</template>

<script lang="ts">
import Tags from "@/components/money/Tags.vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Notes from "@/components/money/Notes.vue";
import Types from "@/components/money/Types.vue";
import { Vue, Component } from "vue-property-decorator";
type Record = {
  tags: string[] | undefined;
  notes: string | undefined;
  type: string | undefined;
  amount: number | undefined;
};
@Component({
  components: { NumberPad, Notes, Tags, Types },
})
export default class Money extends Vue {
  tags = ["衣", "食", "住", "行"];
  record: Record = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  onUpdateTags(value: string[]) {this.record.tags=value}
  onUpdateNotes(value: string) {this.record.notes=value}
  onUpdateTypes(value: string) {this.record.type=value}
  onUpdateAmount(value: number) {this.record.amount=value}
}
</script>


<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
  height: 100vh;
}
</style>
