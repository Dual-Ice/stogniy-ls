import axios from '../../customAxios'
import formData from '../../utils/formData'

export default {
  namespaced: true,
  
  state: {
    reviews: []
  },

  getters: {
    modifiedReviews (state) {
      return state.reviews.map(review => {
        if (!review.photo.includes('https://webdev-api.loftschool.com/')) {
          review.photo = `https://webdev-api.loftschool.com/${review.photo}`
        }
        return review
      })
    }
  },

  mutations: {
    setReviews (state, reviews) {
      state.reviews = reviews
    },

    addReview (state, reviews) {
      state.reviews = [...state.reviews, reviews]
    },

    editReview (state, review) {
      state.reviews = state.reviews.map(item => item.id === review.id ? review : item)
    },

    removeReview (state, reviewId) {
      state.reviews = state.reviews.filter(review => review.id !== reviewId)
    }
  },

  actions: {
    async loadReviews ({ commit }, userId) {
      try {
        const { data } = await axios.get(`/reviews/${userId}`)
        commit('setReviews', data)
      } catch (error) {
        console.log(error)
      }
    },

    async saveReview ({ commit }, review) {
      try {
        const { data } = await axios.post(
          '/reviews',
          formData(review),
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        commit('addReview', data)
      } catch (error) {
        throw new Error(error)
        console.log(error)
      }
    },

    async updateReview ({ commit }, review) {
      try {
        const { data } = await axios.post(
          `/reviews/${review.id}`,
          formData(review),
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
        commit('editReview', data.review)
      } catch (error) {
        console.log(error)
      }
    },

    async deleteReview ({ commit }, reviewId) {
      try {
        await axios.delete(`/reviews/${reviewId}`)
        commit('removeReview', reviewId)
      } catch (error) {
        console.log(error)
      }
    }
  }
}