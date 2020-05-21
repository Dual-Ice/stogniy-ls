import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import axios from '../customAxios'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  const isAuthRequired = to.matched.some(record => record.meta.auth)
  const isUserLogged = store.getters["auth/isLogged"]

  if (isAuthRequired && !isUserLogged) {
    const token = localStorage.getItem('user-token')
    axios.defaults.headers['Authorization'] = `Bearer ${ token }`

    try {   
      const response = await axios.get('/user')
      store.commit("auth/setUser", response.data.user)
      next()
    } catch (e) {
      await router.replace('/login')
      localStorage.removeItem('user-token')
    }
  } else {
    next()
  }
  document.title = to.meta.title || ''
})

export default router
