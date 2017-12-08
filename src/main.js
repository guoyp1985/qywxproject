// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import App from './App'
import Home from './components/HelloFromVux'
import List from './components/HelloList'
import Hello from './components/HelloWorld'

Vue.use(Vuex)
Vue.use(VueRouter)

let store = new Vuex.Store()
Vue.use(store)

store.registerModule('vux', {
  state: {
    direction: 'forward'
  },
  mutations: {
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  }
})

const routes = [{
  path: '/',
  component: Home
},
{
  path: '/hw/',
  component: List
},
{
  path: '/hw/de/',
  component: Hello
}
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

sync(store, router)
/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
