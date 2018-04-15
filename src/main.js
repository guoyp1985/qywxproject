// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
// import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import urlParse from 'url-parse'
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
import Login from '../libs/login'
import { Token, OpenId } from '../libs/storage'
import ENV from '../libs/env'

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

// Vue.http.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbGFyYXZlbC5ib2thLmNuL2FwaS9zY2FubG9naW4vMTUyMzUwNDEwOSIsImlhdCI6MTUyMzUwNDE0NywiZXhwIjoxNTI0MzY4MTQ3LCJuYmYiOjE1MjM1MDQxNDcsImp0aSI6IlFrRFRwOEd2WGlsd1lqR3kiLCJzdWIiOjEsInBydiI6Ijg2NjVhZTk3NzVjZjI2ZjZiOGU0OTZmODZmYTUzNmQ2OGRkNzE4MTgifQ.bRfinjIiBjiFXXCZru1Nhw_0l8RD7Zf7FWOhv1Aw4W8'
const excludeUrls = [
  '*://gongxiaoshe.qiyeplus.com/test.php*',
  `${ENV.BokaApi}/weixin/qrcode/login*`,
  `${ENV.BokaApi}/api/login/*`
]
const rExcludeUrls = excludeUrls.map(url => RegExp(url.replace(/\*/g, '.*').replace(/\?/g, '\\?')))
const matchExclude = url => {
  for (let r in rExcludeUrls) {
    if (r.test(url)) {
      return true
    }
  }
  return false
}
Vue.http.interceptors.push(function (request, next) {
  const rUrl = urlParse(request.url)
  const lUrl = urlParse(location.href, true)
  if (matchExclude(rUrl.href)) {
    return
  }
  if (lUrl.query.code) {
    const code = lUrl.query.code
    // const route = lUrl.hash
    // location.href = `${ENV.BokaCDN}${route}`
    alert(code)
    Vue.http.get(`http://gongxiaoshe.qiyeplus.com/test.php?code=${code}`, {})
    .then(res => res.json())
    .then(data => {
      // alert(JSON.stringify(data))
      const openId = data.data
      OpenId.set(openId)
    })
  } else if (rUrl.origin === ENV.BokaApi) {
    const token = Token.get()
    request.method = 'GET'
    request.headers.set('Authorization', `Bearer ${token}`)
    // continue to next interceptor
    next(function (response) { // 在响应之后传给then之前对response进行修改和逻辑判断。对于token已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
      // response.body = '...'
      Login.access(request, response, isPC => {
        if (isPC) {
          Vue.http.get(`${ENV.BokaApi}/weixin/qrcode/login`, {})
          .then(res => res.json())
          .then(data => {
            router.push({name: 'login', params: {qrCode: data, fromPath: router.currentRoute.path}})
          })
        } else {
          const openId = OpenId.get()
          if (openId) {
            Vue.http.get(`${ENV.BokaApi}/api/login/${openId}`, {})
            .then(res => res.json())
            .then(data => {
              Token.set(data.data.token)
            })
          } else {
            const orginHref = encodeURIComponent(location.href)
            location.href = `${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${orginHref}&response_type=code&scope=snsapi_base&state=fromWx#wechat_redirect`
          }
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
