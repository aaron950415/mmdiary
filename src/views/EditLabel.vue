<template>
  <Layout class="noselect">
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click.native="goBack"></Icon>
      <span class="tittle">label edit</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <Notes :value="tag.name" @update:value="update" field-name="标签名" placeholder="please entry label"></Notes>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">label delete</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Notes from "@/components/money/Notes.vue";

@Component({
  components: { Notes },
})
export default class Editlabel extends Vue {
  get tag() {
    return this.$store.state.currentTag;
  }
  created() {
    this.$store.commit("fetchTags");
    const id = this.$route.params.id;
    this.$store.commit("setCurrentTag", id);
    if (!this.tag) {
      this.$router.replace("/404");
    }
  }
  update(name: string) {
    if (this.tag) {
      this.$store.commit("updateTag", { id: this.tag.id, name });
    }
  }

  remove() {
    if (this.tag) {
      this.$store.commit("removeTag", this.tag.id);
    }
  }

  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;

  > .leftIcon {
    width: 24px;
    height: 24px;
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.form-wrapper {
  background-color: white;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
}
</style>
