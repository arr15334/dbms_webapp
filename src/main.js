// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAnalytics from 'vue-analytics'
import VueIntro from 'vue-introjs'
// import miniToastr from 'mini-toastr'

import App from '@/App'
import router from '@/router'
import store from '@/store'
import '@/theme/theme.scss'
import config from '@/settings/config'

const env = config.env
const analytics = config[env].analytics || null
if (analytics !== null && analytics.length > 0) {
  Vue.use(VueAnalytics, {
    id: analytics,
    router
  })
}

Vue.use(VueIntro)
/*
miniToastr.init()
function toast ({ title, message, type, timeout, cb }) {
  return miniToastr[type](message, title, timeout, cb)
}
const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
}
*/
Vue.http = Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue(
  {
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
  }
)
