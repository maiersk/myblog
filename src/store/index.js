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
    setUser(state, payload) {
      state.user = payload
    },
    setIsLogged(state, payload) {
      state.isLogged = payload
    },
    navBarOpenOrClose(state) {
      state.bar_open = !state.bar_open
    },
  },
  actions: {
    oauthUser({commit}, payload) {
      commit('setUser', payload)
    }
  }
})

export default store;