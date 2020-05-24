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

  if (!isUserLogged) {
    const token = localStorage.getItem('user-token');
    if (!token && !isAuthRequired) {
      next()
    } else if (token) {
      axios.defaults.headers['Authorization'] = `Bearer ${ token }`
      try {   
        const response = await axios.get('/user')
        store.commit("auth/setUser", response.data.user)
        if (from.path === "/login") {
          next()
        } 
        next({ path: from.path })
      } catch (e) {
        localStorage.removeItem('user-token')
        next('/login')
      }
    } else {
      next('/login')
    }
  } else if (isUserLogged && !isAuthRequired) {
    next({ path: from.path })
  } else {
    next ()
  }

  document.title = to.meta.title || ''
})

export default router
