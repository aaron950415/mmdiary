const localStorageName='recordList'
const recorderListModel={
    clone(data: RecordItem[] |RecordItem){
        return JSON.parse(JSON.stringify(data))
    },
    fetch(){
        return JSON.parse(localStorage.getItem(localStorageName)||'[]') as RecordItem[]
    },
    save(data: RecordItem[]) {
     window.localStorage.setItem(localStorageName,JSON.stringify(data))
    }
}

export default recorderListModel 