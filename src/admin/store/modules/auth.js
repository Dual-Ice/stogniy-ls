import axios from '../../customAxios'

export default {
  namespaced: true,
  
  state: {
    user: {}
  },

  getters: {
    isLogged (state) {
      return Boolean(state.user instanceof Object && Object.keys(state.user).length)
    }
  },

  mutations: {
    setUser (state, user) {
      state.user = user
    }
  },

  actions: {
    async logoutUser ({ commit }) {
      await axios.post('/logout')
      commit('setUser', {})
      localStorage.removeItem('user-token')
    }
  }
}