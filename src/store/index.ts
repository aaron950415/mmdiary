import clone from "@/lib/clone";
import Vue from "vue";
import Vuex from "vuex";
import createId from "@/lib/idCreate.ts";
import router from "@/router";
import dayjs from "dayjs";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //data
    recordList: [],
    createRecordError: null,
    tagList: [],
    currentTag: undefined,
  } as RootState,
  mutations: {
    //method
    fetchRecords(state) {
      state.recordList = JSON.parse(localStorage.getItem("recordList") || "[]");
    },
    createRecord(state, record: RecordItem) {
      const record2 = clone(record);
      record2.createAt = record2.createAt || new Date().toISOString();
      dayjs(record2.createAt).format("DD-MMM-YYYY");
      state.recordList.push(record2);
      store.commit("saveRecords");
    },
    saveRecords(state) {
      window.localStorage.setItem(
        "recordList",
        JSON.stringify(state.recordList)
      );
    },
    fetchTags(state) {
      state.tagList = JSON.parse(localStorage.getItem("tagList") || "[]");
      if (!state.tagList || state.tagList.length === 0) {
        store.commit("createTag", "cloth");
        store.commit("createTag", "eating");
        store.commit("createTag", "occupancy");
        store.commit("createTag", "travel");
      }
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((t) => t.id === id)[0];
    },
    createTag(state, name: string) {
      const names = state.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert("duplicated");
        return;
      }
      const id = createId().toString();
      state.tagList.push({ id, name: name });
      store.commit("saveTags");
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit("saveTags");
        window.alert("deleted sucessful");
        router.back();
      } else {
        window.alert("deleted fall");
      }
    },
    updateTag(state, payload: { id: string; name: string }) {
      const { id, name } = payload;
      const idList = state.tagList.map((item) => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map((item) => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert("duplicated");
        } else {
          const tag = state.tagList.filter((item) => item.id === id)[0];
          tag.name = name;
          store.commit("saveTags");
        }
      }
    },
    saveTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
  },
});

export default store;
