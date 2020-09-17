const localStorageName='recordList'
import clone from '@/lib/clone';
const recordStore={
    fetchRecords(){
        this.recordList =JSON.parse(localStorage.getItem(localStorageName)||'[]') as RecordItem[]
        return this.recordList
    },
    saveRecords (){
        window.localStorage.setItem(localStorageName,JSON.stringify(this.recordList))
    },
    recordList:[] as RecordItem[],
  createRecord(record: RecordItem) {
    const record2: RecordItem=clone(record)
    record2.createAt= new Date();
    this.recordList&&this.recordList.push(record2)
    recordStore.saveRecords();
  },
}
recordStore.fetchRecords();
export default recordStore
