export default {
  namespaced: true,
  state: {
    showed: false,
    message: 'Сообщение успешно отправленно',
    type: 'success'
  },
  mutations: {
    setVisibility (state, value) {
      state.showed = value
    },
    setMessage (state, message) {
      state.message = message
    },
    setType (state, type) {
      state.type = type
    },
    showToast (state, { type, message }) {
      state.showed = true
      state.message = message
      state.type = type
    }
  }
}