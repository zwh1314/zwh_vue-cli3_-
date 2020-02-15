import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from "axios"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false


Axios.defaults.baseURL = "url/lessonOperation";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
