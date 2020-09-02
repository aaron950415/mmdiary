<template>
  <Layout class-prefix="layout">
    <Notes></Notes>
    <Tags></Tags>
    <Types></Types>
    <NumberPad></NumberPad>
  </Layout>
</template>

<script lang="ts">

import Tags from "@/components/money/Tags.vue"
import NumberPad from "@/components/money/NumberPad.vue"
import Notes from "@/components/money/Notes.vue"
import Types from "@/components/money/Types.vue"

export default {
  name: "Money",
  components: { NumberPad, Notes, Tags, Types },
};
</script>
<style lang="scss" scoped>
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
