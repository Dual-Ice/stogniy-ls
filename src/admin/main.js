import Vue from 'vue';
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './routes'


Vue.use(VueRouter)
Vue.router = router

new Vue({
  el: "#app-root",
  render: h => h(App),
  router
});