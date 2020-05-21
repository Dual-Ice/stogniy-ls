import Vue from 'vue';
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'
import axios from './customAxios'
import store from "./store";

Vue.use(Vuelidate)
Vue.axios = axios

new Vue({
  el: "#app-root",
  render: h => h(App),
  store,
  router
});