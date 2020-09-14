const localStorageName = "tagList";
type Tag = {
  id: string;
  name: string;
};
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => string;
  update: (id: string, name: string) => "success" | "Not Found" | string;
  save: () => void;
};
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(localStorage.getItem(localStorageName) || "[]");
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
  },
  create(name: string) {
    const names = this.data.map((item) => item.name);
    if (names.indexOf(name) >= 0) {
      throw new Error("duplicated");
    }
    this.data.push({ id: name, name: name });
    this.save();
    return "success";
  },
  update(id, name) {
    const idList = this.data.map((item) => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.data.map((item) => item.name);
      if (names.indexOf(name)>=0 ) {
        return "duplicated";
      } else {
        const tag = this.data.filter((item) => item.id === id)[0];
        tag.name = name;
        this.save();
        return "success"
      }
    } else {
      return "Not Found";
    }
  },
};

export default tagListModel;
