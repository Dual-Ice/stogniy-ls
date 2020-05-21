import axios from '../../customAxios'
import formData from '../../utils/formData'

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
      state.works = [...state.works, work]
    },

    editWork (state, work) {
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
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        commit('addWork', data)
      } catch (error) {
        throw new Error(error)
        console.log(error)
      }
    },

    async updateWork ({ commit }, work) {
      try {
        const { data } = await axios.post(
          `/works/${work.id}`,
          formData(work),
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        commit('editWork', data.work)
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