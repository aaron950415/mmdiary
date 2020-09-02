<template>
  <Layout class-prefix="layout">
    <NumberPad></NumberPad>
    <Types></Types>
    <Notes></Notes>
    <Tags :data-source="tags"></Tags>
  </Layout>
</template>

<script lang="ts">
import Tags from "@/components/money/Tags.vue"
import NumberPad from "@/components/money/NumberPad.vue"
import Notes from "@/components/money/Notes.vue"
import Types from "@/components/money/Types.vue"
import { Vue,Component } from "vue-property-decorator";
@Component({
  components: {NumberPad,Notes,Tags,Types}
})
export default class Money extends Vue {
  tags= ['衣','食','住','行'];
}
</script>


<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
  height: 100vh;
}
</style>
