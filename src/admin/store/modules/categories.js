import axios from '../../customAxios'
import generateError from '../../utils/generateError'

export default {
  namespaced: true,
  
  state: {
    categories: []
  },

  mutations: {
    setCategories (state, categories) {
      state.categories = categories
    },

    addCategory (state, categories) {
      state.categories = [categories, ...state.categories]
    },

    editCategory (state, category) {
      state.categories = state.categories.map(item => {
        if (item.id === category.id) {
          item.title = category.title
        } 
        return item
      })
    },

    removeCategory (state, categoryId) {
      state.categories = state.categories.filter(category => category.id !== categoryId)
    },

    addSkill (state, skill) {
      state.categories = state.categories.map(category => {
        if (category.id === skill.category) {
          const skills = category.skills || []
          category.skills = [...skills, skill]
        }

        return category
      })
    },

    editSkill (state, skill) {
      const category = state.categories.find(category => category.id === skill.category)
      if (category) {
        const skills = category.skills
        category.skills = skills.map(el => el.id === skill.id ? skill : el)
      }
    },

    removeSkill (state, skill) {
      const category = state.categories.find(category => category.id === skill.category)
      if (category) {
        const skills = category.skills
        category.skills = skills.filter(el => el.id !== skill.id)
      }
    }
  },

  actions: {
    async loadCategories ({ commit }, userId) {
      try {
        const { data } = await axios.get(`/categories/${userId}`)
        commit('setCategories', data)
      } catch (error) {
        generateError(error)
      }
    },

    async saveCategory ({ commit }, title) {
      try {
        const { data } = await axios.post('/categories', { title })
        commit('addCategory', data)
        commit('toast/showToast',
          { type: 'success', message: 'Категория успешно добавлена' },
          { root: true }
        )
      } catch (error) {
        generateError(error)
      }
    },

    async updateCategory ({ commit }, category) {
      try {
        const { data } = await axios.post(`/categories/${category.id}`, { title: category.category })
        commit('editCategory', data.category)
        commit('toast/showToast',
          { type: 'success', message: 'Категория успешно обновлена' },
          { root: true }
        )
      } catch (error) {
        generateError(error)
      }
    },

    async deleteCategory ({ commit }, categoryId) {
      try {
        await axios.delete(`/categories/${categoryId}`)
        commit('removeCategory', categoryId)
        commit('toast/showToast',
          { type: 'success', message: 'Категория успешно удалена' },
          { root: true }
        )
      } catch (error) {
        generateError(error)
      }
    },

    async saveSkill ({ commit }, skill) {
      try {
        const { data } = await axios.post('/skills', skill);
        commit('addSkill', data);
        commit('toast/showToast',
          { type: 'success', message: 'Скилл успешно добавлен' },
          { root: true }
        )
      } catch (error) {
        generateError(error)
      }
    },

    async updateSkill ({ commit }, skill) {
      try {
        const { data } = await axios.post(`/skills/${ skill.id }`, skill);
        commit('editSkill', data.skill);
        commit('toast/showToast',
          { type: 'success', message: 'Скилл успешно обновлен' },
          { root: true }
        )
      } catch (error) {
        generateError(error)
      }
    },

    async deleteSkill ({ commit }, skill) {
      try {
        await axios.delete(`/skills/${ skill.id }`);
        commit('removeSkill', skill);
        commit('toast/showToast',
          { type: 'success', message: 'Скилл успешно удален' },
          { root: true }
        )
      } catch (error) {
        generateError(error)
      }
    }
  }
}