import axios from '../../customAxios'
import formData from '../../utils/formData'

export default {
  namespaced: true,
  
  state: {
    works: []
  },

  getters: {
    modifiedWorks (state) {
      return state.works.map(work => {
        if (!work.photo.includes('https://webdev-api.loftschool.com/')) {
          work.photo = `https://webdev-api.loftschool.com/${work.photo}`
        }
        return work
      })
    }
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
        generateError(error)
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
        commit('toast/showToast',
          { type: 'success', message: 'Работа успешно добавлена' },
          { root: true }
        )
      } catch (error) {
        generateError(error)
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
        commit('toast/showToast',
          { type: 'success', message: 'Работа успешно обновлена' },
          { root: true }
        )
      } catch (error) {
        generateError(error)
      }
    },

    async deleteWork ({ commit }, workId) {
      try {
        await axios.delete(`/works/${workId}`)
        commit('removeWork', workId)
        commit('toast/showToast',
          { type: 'success', message: 'Работа успешно удалена' },
          { root: true }
        )
      } catch (error) {
        generateError(error)
      }
    }
  }
}