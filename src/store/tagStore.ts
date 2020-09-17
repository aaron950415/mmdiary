import createId from "@/lib/idCreate.ts";
const localStorageName = "tagList";
const tagStore = {
  tagList: [] as Tag[],
  fetchTags(){
    this.tagList = JSON.parse(localStorage.getItem(localStorageName) || "[]");
    return this.tagList;
  },
  findTag(id: string) {
    return this.tagList.filter((t) => t.id === id)[0];
  },
  createTag(name: string) {
    const names = this.tagList.map((item) => item.name);
    if (names.indexOf(name) >= 0) {
      window.alert("duplicated");
    }
    const id = createId().toString();
    this.tagList.push({ id, name: name });
    this.saveTags();
    return window.alert("success");
  },
  removeTag(id: string){
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    this.tagList.splice(index, 1);
    this.saveTags();
    return true;
  },
  updateTag (id: string, name: string){
    const idList = this.tagList.map((item) => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        return "duplicated";
      } else {
        const tag = this.tagList.filter((item) => item.id === id)[0];
        tag.name = name;
        this.saveTags();
        return "success";
      }
    } else {
      return "Not Found";
    }
  },
  saveTags() {
    window.localStorage.setItem(localStorageName, JSON.stringify(this.tagList));
  },
};

tagStore.fetchTags();
export default tagStore