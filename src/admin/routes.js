import VueRouter from 'vue-router'
import About from './components/About/About'
import Reviews from './components/Reviews/Reviews'
import Works from './components/Works/Works'
import Login from './components/Login'

const routes = [
  {
    path: '/',
    name: 'about',
    component: About,
    meta:
      {
        title: "Блок «Обо мне»"
      }
  },
  {
    path: '/reviews',
    component: Reviews,
    meta:
      {
        title: "Блок «Работы»"
      }
  },
  {
    path: '/works',
    component: Works,
    meta:
      {
        title: "Блок «Отзывы»"
      }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '*',
    redirect: 'about'
  }
]

const router = new VueRouter({
  routes
})

router.afterEach((to, from) => {
  document.title = to.meta.title || ''
})

export default router
