import { Vue, Component } from "vue-property-decorator";

@Component
export class TagHelper extends Vue {
    createTag() {
        const name = window.prompt("what is label？");
         if(name===""){
          return window.alert("label not be null");
        }
        this.$store.commit("createTag", name);
      }
}
export default TagHelper