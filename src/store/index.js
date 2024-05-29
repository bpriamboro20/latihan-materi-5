import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["todoList"],
    }),
  ],
  state: {
    todoList: [],
  },
  mutations: {
    ADD_ITEM(state, item) {
      state.todoList.push(item);
    },
    REMOVE_ITEM(state, index) {
      state.todoList.splice(index, 1);
    },
    EDIT_ITEM(state, { index, item }) {
      Vue.set(state.todoList, index, item);
    },
    ADD_DESCRIPTION(state, { index, description }) {
      // Tambahkan deskripsi ke dalam aktivitas
      state.todoList[index].description = description;
    },
  },
  actions: {
    addItem({ commit }, item) {
      commit("ADD_ITEM", item);
    },
    removeItem({ commit }, index) {
      commit("REMOVE_ITEM", index);
    },
    editItem({ commit }, payload) {
      commit("EDIT_ITEM", payload);
    },
    addDescription({ commit }, payload) {
      commit("ADD_DESCRIPTION", payload);
    },
  },
  getters: {
    todoList: (state) => state.todoList,
    isMoreFour: (state) => (state.todoList.length >= 4 ? "Hebat" : ""),
  },
});
