import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      user: {},
      isLogged: false,
      bar_open: false,
    }
  },
  mutations: {
    add(state) {
      state.count++;
    },
    navBarOpenOrClose(state) {
      state.bar_open = !state.bar_open
    },
    setUser(state, payload) {
      state.user = payload
    },
    setIsLogged(state, payload) {
      state.isLogged = payload
    }
  },
  actions: {
    oauthUser({commit}, payload) {
      commit('setUser', payload)
    }
  }
})

export default store;