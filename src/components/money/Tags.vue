<template>
  <div class="tags noselect">
    <div class="new" @click="createTag">
      <button ><Icon class="xinzeng" name='xinzeng'/>新增标签</button>
    </div>
    <ul class="current">
      <li
        v-for="tags in tagList"
        :key="tags.id"
        :class="{selected: selectedTags.indexOf(tags)>=0}"
        @click="toggle(tags)"
      >{{tags.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { TagHelper } from "@/mixins/TagHelper";
import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";
@Component
export default class NumberPad extends mixins(TagHelper) {
  selectedTags: string[] = [];
  get tagList() {
    return this.$store.state.tagList;
  }
  created() {
    this.$store.commit("fetchTags");
  }
  toggle(tags: string) {
    const index = this.selectedTags.indexOf(tags);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tags);
    }
    this.$emit("update:value", this.selectedTags);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      background: #d9d9d9;
      $h: 24px;
      font-weight: bold;
      font-size:20px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: #f5f11b;
        color: black;
      }
    }
  }
  > .new {
    .xinzeng{
      width: 20px;
      height: 20px;
      margin-right: 4px;
    }
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
    border-bottom: 1px solid blue;
      color: rgb(8, 79, 138);
      padding: 0 4px;
    }
  }
}
</style>
