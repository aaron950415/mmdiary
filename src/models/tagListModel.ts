const localStorageName='tagList'
type Tag={
  id: string;
  name: string;
}
type  TagListModel={
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => string;
  save: () => void;
}
const tagListModel: TagListModel={
  data:[],
    fetch(){
        this.data=JSON.parse(localStorage.getItem(localStorageName)||'[]') 
      return this.data
    },
    save() {
     window.localStorage.setItem(localStorageName,JSON.stringify(this.data))
    },
    create(name: string){
      const names=this.data.map(item=>item.name)
      if(names.indexOf(name) >=0){
        throw new Error("duplicated");
      }
      this.data.push({id:name,name:name})
      this.save()
      return 'success'
    }
}

export default tagListModel 