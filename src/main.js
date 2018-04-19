// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
<<<<<<< HEAD
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
import { BusPlugin, LoadingPlugin, ToastPlugin, AlertPlugin } from 'vux'
=======
import { sync } from 'vuex-router-sync'
import urlParse from 'url-parse'
import App from './App'
import router from './router'
import objectAssign from 'object-assign'
import vuexI18n from 'vuex-i18n'
import { BusPlugin, LoadingPlugin } from 'vux'
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
import VueResource from 'vue-resource'
import Login from '../libs/login'
import { Token } from '../libs/storage'
import ENV from '../libs/env'

Vue.use(VueResource)
Vue.use(Vuex)
<<<<<<< HEAD
// Vue.use(VueRouter)
=======
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827

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
<<<<<<< HEAD
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
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
=======
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827

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

const excludeUrls = [
  `${ENV.BokaApi}/weixin/userAuth/*`,
<<<<<<< HEAD
  `${ENV.BokaApi}/weixin/qrcode/login*`,
  `${ENV.BokaApi}/api/login/*`,
  `${ENV.BokaApi}/api/scanlogin`
=======
  `${ENV.BokaApi}/api/qrcode/login`,
  `${ENV.BokaApi}/api/login`,
  `${ENV.BokaApi}/api/scanlogin/*`
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
]

// 排除全局请求过滤器中的请求url
const rExcludeUrls = excludeUrls.map(url => RegExp(url.replace(/\*/g, '.*').replace(/\?/g, '\\?')))
const matchExclude = url => {
  for (let r = 0; r < rExcludeUrls.length; r++) {
    if (rExcludeUrls[r].test(url)) {
      return true
    }
  }
  return false
}

<<<<<<< HEAD
=======
// localStorage.clear()

>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
// 全局请求过滤器
Vue.http.interceptors.push(function (request, next) {
  const rUrl = urlParse(request.url)
  const lUrl = urlParse(location.href, true)
  console.log(matchExclude(rUrl.href))
  if (matchExclude(rUrl.href)) {
    return
  }
  if (lUrl.query.code) {
    const code = lUrl.query.code
    Vue.http.get(`${ENV.BokaApi}/weixin/userAuth/${code}`, {})
    .then(res => res.json())
    .then(
<<<<<<< HEAD
      (data) => {
        Token.set(data.data.token)
        location.href = `http://${lUrl.hostname}/${lUrl.hash}`
      },
      (error) => {
        // alert(JSON.stringify(error))
      }
    )
  } else if (rUrl.origin === ENV.BokaApi) {
    // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbGFyYXZlbC5ib2thLmNuL2FwaS9zY2FubG9naW4vMTUyMzY3Nzk0MyIsImlhdCI6MTUyMzY3Nzk1MSwiZXhwIjoxNTI0NTQxOTUxLCJuYmYiOjE1MjM2Nzc5NTEsImp0aSI6IkI1QUJPOGpEdlVGQ3BhQngiLCJzdWIiOjQsInBydiI6Ijg2NjVhZTk3NzVjZjI2ZjZiOGU0OTZmODZmYTUzNmQ2OGRkNzE4MTgifQ.LS7L_lYqNkWofYvc_F2dpbbSb_vatkbvTViROZlD9T4'
=======
      data => {
        Token.set(data.data.token)
        location.href = `http://${lUrl.hostname}/${lUrl.hash}`
      }
    )
  } else if (rUrl.origin === ENV.BokaApi) {
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
    const token = Token.get()
    // request.method = 'GET'
    request.headers.set('Authorization', `Bearer ${token}`)
    // continue to next interceptor
    next(function (response) {
      Login.access(request, response, isPC => {
        if (isPC) {
<<<<<<< HEAD
          console.log('isPC')
          Vue.http.get(`${ENV.BokaApi}/api/qrcode/login`, {})
          .then(res => res.json())
          .then(data => {
            console.log(data)
            router.push({name: 'login', params: {qrCode: data, fromPath: router.currentRoute.path}})
          })
=======
          Vue.http.get(`${ENV.BokaApi}/api/qrcode/login`, {})
          .then(res => res.json())
          .then(
            data => {
              router.push({name: 'login', params: {qrCode: data, fromPath: router.currentRoute.path}})
            },
            error => {
              console.log(error)
            }
          )
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
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
