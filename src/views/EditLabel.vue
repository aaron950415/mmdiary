<template>
  <div>
    <div>    <Icon name="left"></Icon>
    <span>标签编辑</span></div>
    <Notes field-name="标签名" placeholder="请输出标签名"></Notes>
<div><button>删除标签</button></div>
  </div>


</template>

<script lang="ts">
import tagListModel from "@/models/tagListModel";
import { Vue, Component } from "vue-property-decorator";
import Notes from "@/components/money/Notes.vue"

@Component({
  components:{Notes}
})
export default class Editlabel extends Vue {
  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter((t) => t.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace("/404");
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
