// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import { sync } from 'vuex-router-sync'
import urlParse from 'url-parse'
import App from './App'
import router from './router'
import objectAssign from 'object-assign'
import vuexI18n from 'vuex-i18n'
import { WechatPlugin, BusPlugin, LoadingPlugin, ToastPlugin, AlertPlugin } from 'vux'
import VueResource from 'vue-resource'
import Login from '#/login'
import { Token } from '#/storage'
import ENV from '#/env'
import Util from '#/util'

Vue.use(VueResource)
Vue.use(Vuex)

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
    direction: 'forward',
    toggleTabbar: true
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
    },
    updateToggleTabbar (state, payload) {
      state.toggleTabbar = payload.toggleTabbar
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
})

Vue.use(vuexI18n.plugin, store)
Vue.use(WechatPlugin)
Vue.use(Util)
Vue.use(BusPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)

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

let excludeUrls = [
  { url: `${ENV.BokaApi}/api/authLogin/*`, reqMax: 1 },
  { url: `${ENV.BokaApi}/api/qrcode/login*`, reqMax: 1 },
  { url: `${ENV.BokaApi}/api/login/*`, reqMax: 1 },
  { url: `${ENV.BokaApi}/api/scanlogin`, reqMax: 1 },
  { url: `${ENV.BokaApi}/api/user/address/list`, reqMax: 2 }
]

// 排除全局请求过滤器中的请求url
const rExcludeUrls = excludeUrls.map(item => {
  item.url = RegExp(item.url.replace(/\*/g, '.*').replace(/\?/g, '\\?'))
  return item
})

const matchExclude = url => {
  for (let item of rExcludeUrls) {
    item.reqMax--
    if (item.url.test(url) && !item.reqMax) {
      return true
    }
  }
  return false
}
// localStorage.clear()
// 全局请求过滤器
Vue.http.interceptors.push(function (request, next) {
  const rUrl = urlParse(request.url)
  const lUrl = urlParse(location.href, true)
  // console.log(matchExclude(rUrl.href))
  if (matchExclude(rUrl.href)) {
    return
  }
  if (lUrl.query.code) {
    // alert(lUrl.query.code)
    const code = lUrl.query.code
    Vue.http.get(`${ENV.BokaApi}/api/authLogin/${code}`, {})
    .then(res => res.json())
    .then(
      data => {
        Token.set(data.data.token)
        location.href = `http://${lUrl.hostname}/${lUrl.hash}`
      },
      error => {
        alert(JSON.stringify(error))
      }
    )
  } else if (rUrl.origin === ENV.BokaApi) {
    const token = Token.get()
    // request.method = 'GET'
    // alert(token)
    request.headers.set('Authorization', `Bearer ${token}`)
    // request.headers.set('X-CSRF-Token', 'plugin')
    // continue to next interceptor
    next(function (response) {
      Login.access(request, response, isPC => {
        if (isPC) {
          Vue.http.get(`${ENV.BokaApi}/api/qrcode/login`, {})
          .then(res => res.json())
          .then(
            data => {
              router.push({name: 'tLogin', params: {qrCode: data, fromPath: router.currentRoute.path}})
            },
            error => {
              console.error(error)
            }
          )
        } else {
          const orginHref = encodeURIComponent(location.href)
          location.href = `${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${orginHref}&response_type=code&scope=snsapi_base&state=fromWx#wechat_redirect`
        }
      },
      () => {
        // console.log('okokokok')
      })
      return response
    })
  }
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
