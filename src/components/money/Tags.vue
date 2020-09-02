<template>
  <div class="tags noselect">
    <div class="new">
      <button>新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tags in dataSource" :key="tags"
      :class="{selected: selectedTags.indexOf(tags)>=0}"
      @click="toggle(tags)">{{tags}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue,Component,Prop } from "vue-property-decorator";
@Component
export default class NumberPad extends Vue {
  @Prop() dataSource: string[] |undefined;
  selectedTags: string[] =[];
  toggle(tags: string){
    const index=this.selectedTags.indexOf(tags)
    if(index>=0){
      this.selectedTags.splice(index,1)
    }else{
      this.selectedTags.push(tags)
    }
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
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected{
        background: grey;
        color: white;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>
