import { Vue, Component } from "vue-property-decorator";

@Component
export class TagHelper extends Vue {
    createTag() {
        const name = window.prompt("标签名是什么？");
         if(name===""){
          return window.alert("标签名不能为空");
        }
        this.$store.commit("createTag", name);
      }
}
export default TagHelper