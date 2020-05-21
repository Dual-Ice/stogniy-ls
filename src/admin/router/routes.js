import About from '../components/About/About'
import Reviews from '../components/Reviews/Reviews'
import Works from '../components/Works/Works'
import Login from '../components/Login'

export default [
  {
    path: '/',
    name: 'about',
    component: About,
    meta:
      {
        title: "Блок «Обо мне»",
        auth: true
      }
  },
  {
    path: '/reviews',
    name: 'reviews',
    component: Reviews,
    meta:
      {
        title: "Блок «Работы»",
        auth: true
      }
  },
  {
    path: '/works',
    name: 'works',
    component: Works,
    meta:
      {
        title: "Блок «Отзывы»",
        auth: true
      }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      auth: false
    }
  },
  {
    path: '*',
    redirect: '/',
    meta: {
      auth: true
    }
  }
]