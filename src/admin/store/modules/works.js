import axios from '../../customAxios'
import formData from '../../utils/formData';

export default {
  namespaced: true,
  
  state: {
    works: []
  },

  mutations: {
    setWorks (state, works) {
      state.works = works
    },

    addWork (state, work) {
      state.works = [...works, work]
    },

    setWork (state, work) {
      state.works = state.works.map(item => item.id === work.id ? work : item)
    },

    removeWork (state, workId) {
      state.works = state.works.filter(work => work.id !== workId)
    }
  },

  actions: {
    async loadWorks ({ commit }, userId) {
      try {
        const { data } = await axios.get(`/works/${userId}`)
        commit('setWorks', data)
      } catch (error) {
        console.log(error)
      }
    },

    async saveWork ({ commit }, work) {
      try {
        const { data } = await axios.post(
          '/works',
          formData(work),
          { headers: { 'Content-Type': 'multipart/form-data' }
        })

        commit('addWork', data)
      } catch (error) {
        throw new Error(error)
      }
    },
    async updateWork ({ commit }, payload) {
      try {
        const { data } = await axios.post(`/works/${payload.id}`, formData(payload), { headers: { 'Content-Type': 'multipart/form-data' } })
        commit('setWork', data)
      } catch (error) {
        console.log(error)
      }
    },
    async deleteWork ({ commit }, workId) {
      try {
        await axios.delete(`/works/${workId}`)
        commit('removeWork', workId)
      } catch (error) {
        console.log(error)
      }
    }
  }
}