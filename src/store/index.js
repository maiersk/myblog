import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      user: null,
    }
  },
  mutations: {
    add(state) {
      state.count++;
    },
  },
})

export default store;