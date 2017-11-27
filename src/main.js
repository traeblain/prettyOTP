// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'

import 'whatwg-fetch'

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
const currentCode = new Vue({
  data: {
    secret: '000',
    icon: 'times',
    account: 'EXAMPLE: Add New to Start',
    color: 'black',
    shortname: 'Loading'
  }
})
currentCode.install = function () {
  Object.defineProperty(Vue.prototype, '$current', {
    get () { return currentCode }
  })
}
Vue.use(currentCode)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
