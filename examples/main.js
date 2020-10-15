import Vue from 'vue'
import App from './App.vue'
import componentsUtils from '../packages/index'

Vue.use(componentsUtils);
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
