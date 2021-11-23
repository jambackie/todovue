import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const storageUpdate = (str, src) => localStorage.setItem(str, JSON.stringify(src[str]));

export const store = new Vuex.Store({
  state: () => ({
    items: localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [],
    itemsCounter: localStorage.getItem('itemsCounter') !== 1 ? +localStorage.getItem('itemsCounter') : 1,
  }),

  getters: {
    stateItems: state => state.items,
    activeItems: state => state.items.filter((item) => !item.isCompleted),
    completedItems: state => state.items.filter((item) => item.isCompleted),
  },

  mutations: {
    addItem(state, payload) {
      state.items.push(payload.item);
      state.itemsCounter++;
      storageUpdate('items', state);
      storageUpdate('itemsCounter', state);
    },

    deleteItem(state, payload) {
      const index = state.items.indexOf(state.items.find(item => item.id === payload));
      state.items.splice(index, 1);
      storageUpdate('items', state);
      if (state.items.length === 0) state.itemsCounter = 1;
    },

    makeCompleted(state, payload) {
      const index = state.items.indexOf(state.items.find(item => item.id === payload));
      state.items[index].isCompleted = true;
      storageUpdate('items', state);
    },

    clearCompleted(state) {
      state.items = state.items.filter(item => !item.isCompleted);
      storageUpdate('items', state);
      if (state.items.length === 0) state.itemsCounter = 1;
    }
  },
});