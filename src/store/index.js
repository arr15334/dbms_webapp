import Vue from 'vue'
import VueCookie from 'vue-cookie'
import Vuex from 'vuex'

import modules from './modules'

Vue.use(VueCookie)
Vue.use(Vuex)

export default new Vuex.Store(
  {
    modules,
    strict: process.env.NODE_ENV !== 'production'
  }
)
