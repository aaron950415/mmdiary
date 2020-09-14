
<template>
  <Layout>
    <div class="tags">
      <router-link class="item" :to="`/labels/edit/${tag.id}`" v-for="tag in tags" :key="tag.id">
        <span>{{tag.name}}</span>
        <Icon name="right"></Icon>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click.native="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Vue, Component, Watch } from "vue-property-decorator";
import tagListModel from "@/models/tagListModel.ts";
tagListModel.fetch();
@Component
export default class Labels extends Vue {
  tags = tagListModel.data;
  
  createTag() {
    const name = window.prompt("标签名是什么？");
    if (name) {
      try{
        tagListModel.create(name);
      }catch(Error){
        if(Error.message ==="duplicated"){
          window.alert('标签名重复')
        }else if(Error.message ==="success"){
          window.alert('创建成功')
        }
      }
    }
  }
}
</script>

<style lang="scss" scope>
.tags {
  background: white;
  font-size: 16px;
  padding: 0 16px;
  > .item {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      color: #666;
      margin-right: 8px;
      width: 24px !important;
      height: 24px !important;
    }
  }
}
.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 28px;
  }
}
</style>