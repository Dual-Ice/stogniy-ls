import axios from '../../customAxios'

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
      state.categories = state.categories.map(item => item.id === category.id ? category : item)
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
        console.log(error)
      }
    },

    async saveCategory ({ commit }, title) {
      try {
        const { data } = await axios.post('/categories', { title })
        commit('addCategory', data)
      } catch (error) {
        throw new Error(error)
        console.log(error)
      }
    },

    async updateCategory ({ commit }, category) {
      try {
        const { data } = await axios.post(`/categories/${category.id}`, { title: category.category })
        commit('editCategory', data.category)
      } catch (error) {
        console.log(error)
      }
    },

    async deleteCategory ({ commit }, categoryId) {
      try {
        await axios.delete(`/categories/${categoryId}`)
        commit('removeCategory', categoryId)
      } catch (error) {
        console.log(error)
      }
    },

    async saveSkill ({ commit }, skill) {
      try {
        const { data } = await axios.post('/skills', skill);
        commit('addSkill', data);
      } catch (error) {
        console.log(error)
      }
    },

    async deleteSkill ({ commit }, skill) {
      try {
        await axios.delete(`/skills/${ skill.id }`);
        commit('removeSkill', skill);
      } catch (error) {
        console.log(error)
      }
    },

    async updateSkill ({ commit }, skill) {
      try {
        const { data } = await axios.post(`/skills/${ skill.id }`, skill);
        commit('editSkill', data.skill);
      } catch (error) {
        console.log(error)
      }
    }
  }
}