import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './router';
import VueRouter from "vue-router";

import store from '@/store'

import axios from '../api/axios'
import VueAxios from 'vue-axios';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')