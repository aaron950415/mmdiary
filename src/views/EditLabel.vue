<template>
  <div>
    <div class="navBar">
      <Icon class="leftIcon" name="left"></Icon>
      <span class="tittle">标签编辑</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
    <Notes field-name="标签名" placeholder="请输入标签名"></Notes>
    </div>
        <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </div>
</template>

<script lang="ts">
import tagListModel from "@/models/tagListModel";
import { Vue, Component } from "vue-property-decorator";
import Notes from "@/components/money/Notes.vue";

@Component({
  components: { Notes },
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
.navBar{
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  >.tittle{
    
  }
  >.leftIcon{
width: 24px;
height: 24px;
  }
  >.rightIcon{
width: 24px;
height: 24px;
  }

}
.form-wrapper{
      background-color: white;
      margin-top: 8px;
}
.button-wrapper{
  text-align: center;
  padding: 16px;
  margin-top: 28px;
}
</style>
