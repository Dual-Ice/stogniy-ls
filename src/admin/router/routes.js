import About from '../components/About/About'
import Reviews from '../components/Reviews/Reviews'
import Works from '../components/Works/Works'
import Login from '../components/Login'
import Navigation from '../components/Navigation'
import Header from '../components/Header'

export default [
  {
    path: '/',
    name: 'about',
    components: {
        default: About,
        nav: Navigation,
        header: Header
    },
    meta:
      {
        title: "Блок «Обо мне»",
        auth: true
      }
  },
  {
    path: '/reviews',
    name: 'reviews',
    components: {
      default: Reviews,
      nav: Navigation,
      header: Header
  },
    meta:
      {
        title: "Блок «Отзывы»",
        auth: true
      }
  },
  {
    path: '/works',
    name: 'works',
    components: {
      default: Works,
      nav: Navigation,
      header: Header
  },
    meta:
      {
        title: "Блок «Работы»",
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