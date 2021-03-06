import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import works from './modules/works'
import reviews from './modules/reviews'
import categories from './modules/categories'
import toast from './modules/toast'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    works,
    toast,
    reviews,
    categories
  }
})