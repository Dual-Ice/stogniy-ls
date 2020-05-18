import Vue from 'vue';
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './routes'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.router = router

new Vue({
  el: "#app-root",
  render: h => h(App),
  router
});