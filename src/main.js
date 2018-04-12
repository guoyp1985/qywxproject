// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
// import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import App from './App'
// import CenterSales from './components/CenterSales'
// import CenterOperating from './components/CenterOperating'
// import CenterService from './components/CenterService'
// import List from './components/DemoList'
// import Hello from './components/HelloWorld'
import router from './router'
// import DemoList from './demo_list'
import objectAssign from 'object-assign'
import vuexI18n from 'vuex-i18n'
import { BusPlugin, LoadingPlugin } from 'vux'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(Vuex)
// Vue.use(VueRouter)

require('es6-promise').polyfill()
let store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  }
})

store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
})

Vue.use(vuexI18n.plugin, store)
Vue.use(BusPlugin)
Vue.use(LoadingPlugin)

// let routes = [{
//   path: '/centerSales',
//   component: CenterSales
// },
// {
//   path: '/centerOperating',
//   component: CenterOperating
// },
// {
//   path: '/centerService',
//   component: CenterService
// },
// {
//   path: '/components/',
//   component: List
// }
// ]

// const demos = DemoList.map((com) => {
//   return {
//     path: `/components/${com.toLowerCase()}`,
//     component: Vue.component(
//     com,
//     // 该 `import` 函数返回一个 `Promise` 对象。
//     () => import('./demos/' + com))
//   }
// })

const vuxLocales = require('./locales/all.yml')
const componentsLocales = require('./locales/components.yml')
// const globalLocales = require('./locales/global_locales.yml') || {en: {}, 'zh-CN': {}}

const finalLocales = {
  'en': objectAssign(vuxLocales['en'], componentsLocales['en']),
  'zh-CN': objectAssign(vuxLocales['zh-CN'], componentsLocales['zh-CN'])
}

for (let i in finalLocales) {
  Vue.i18n.add(i, finalLocales[i])
}
Vue.i18n.set('zh-CN')

// routes = routes.concat(demos)

// const router = new VueRouter({
//   routes
// })

FastClick.attach(document.body)

Vue.config.productionTip = false

sync(store, router)

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']

document.addEventListener('touchend', () => {
  endTime = Date.now()
})
methods.forEach(key => {
  let method = router[key].bind(router)
  router[key] = function (...args) {
    isPush = true
    method.apply(null, args)
  }
})

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      // 判断是否是ios左滑返回
      if (!isPush && (Date.now() - endTime) < 377) {
        store.commit('updateDirection', {direction: ''})
      } else {
        store.commit('updateDirection', { direction: 'reverse' })
      }
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  isPush = false
  store.commit('updateLoadingStatus', {isLoading: false})
})

Vue.http.options.root = 'https://laravel.boka.cn/api/'
// Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk'
Vue.http.interceptors.push((request, next) => {
  console.log(request)
  // modify method
  // request.method = 'POST'
  // modify headers
  request.headers.set('X-CSRF-TOKEN', 'TOKEN')
  request.headers.set('Authorization', 'Bearer TOKEN')
  // continue to next interceptor
  next(response => { // 在响应之后传给then之前对response进行修改和逻辑判断。对于token已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
    response.body = '...'
    return response
  })
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
