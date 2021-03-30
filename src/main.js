import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/plugins/axios'
import '@/assets/common.less'
import '@/assets/animate.min.css'

import VueTouch from 'vue-touch';

Vue.use(VueTouch, {name: 'v-touch'});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
