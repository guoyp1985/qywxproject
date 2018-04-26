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
import { AjaxPlugin, WechatPlugin, BusPlugin, LoadingPlugin, ToastPlugin, AlertPlugin, ConfirmPlugin } from 'vux'
// import VueResource from 'vue-resource'
// import Login from '#/login'
import { Token } from '#/storage'
import ENV from '#/env'
import Util from '#/util'

// Vue.use(VueResource)
const CancelToken = AjaxPlugin.$http.CancelToken
// console.log(AjaxPlugin)
Vue.use(AjaxPlugin)
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
Vue.use(ConfirmPlugin)

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
  `${ENV.BokaApi}/api/authLogin/*`,
  `${ENV.BokaApi}/api/qrcode/login*`,
  `${ENV.BokaApi}/api/login/*`,
  `${ENV.BokaApi}/api/scanlogin`
  // `${ENV.BokaApi}/api/weixin/token`
]

// 排除全局请求过滤器中的请求url
const rExcludeUrls = excludeUrls.map(url => RegExp(url.replace(/\*/g, '.*').replace(/\?/g, '\\?')))
const matchExclude = url => {
  for (let i = 0; i < rExcludeUrls.length; i++) {
    // alert(`${item.url} ${item.reqMax}`)
    if (rExcludeUrls[i].test(url)) {
      return true
    }
  }
  return false
}
// localStorage.removeItem('token')
// let token = null // test
// 全局请求过滤器
// Vue.http.interceptors.request.use(function (config) {
//   const rUrl = urlParse(config.url)
//   const lUrl = urlParse(location.href, true)
//   // if (matchExclude(rUrl.href)) {
//     // alert(matchExclude(rUrl.href))
//   //   return new Error()
//   // }
//   const token = Token.get()
//   if (!token) {
//     alert(token)
//     if (lUrl.query.code) {
//       const code = lUrl.query.code
//       Vue.http.get(`${ENV.BokaApi}/api/authLogin/${code}`)
//       .then(
//         res => {
//           alert(res)
//           // const token = res.data.token
//           Token.set(res.data.token)
//           // token = data.data.token // test
//           location.href = `http://${lUrl.hostname}/${lUrl.hash}`
//           // alert(data.data.weixin_token)
//           // const accessToken = data.data.weixin_token
//           // const nonceStr = $vue.$util.randomStr(6)
//           // const timeStamp = $vue.$util.timeStamp()
//           // const currentUrl = urlParse(location.href, true)
//           // const url = currentUrl.href.replace(/#\/\w*/g, '')
//           // alert(`${accessToken}, ${ENV.AppId}, ${nonceStr}, ${timeStamp}, ${url}`)
//           // const addrSign = $vue.$util.wxSign(accessToken, ENV.AppId, nonceStr, timeStamp, url)
//           // WeixinJSBridge.invoke('editAddress', {
//           //   appId: ENV.AppId,
//           //   scope: 'jsapi_address',
//           //   signType: 'sha1',
//           //   addrSign: addrSign,
//           //   timeStamp: timeStamp,
//           //   nonceStr: nonceStr
//           // },
//           // res => {
//           //   alert(res.err_msg)
//           //   if (res.err_msg === 'edit_address:ok') {
//           //     const param = {
//           //       linkman: res.userName,
//           //       telephone: res.telNumber,
//           //       province: res.proviceFirstStageName,
//           //       city: res.addressCitySecondStageName,
//           //       counties: res.addressCountiesThirdStageName,
//           //       address: res.addressDetailInfo
//           //     }
//           //     alert(param)
//           //   }
//           // })
//         }
//       )
//       // alert('ok')
//     }
//     // else if (rUrl.origin === ENV.BokaApi) {
//       // const token = Token.get()
//       // request.method = 'GET'
//       // request.headers.set('Authorization', `Bearer ${token}`)
//       // config.headers['Authorization'] = `Bearer ${token}`
//       // request.headers.set('X-CSRF-Token', 'plugin')
//       // continue to next interceptor
//       // next(function (response) {
//
//       //   return response
//       // })
//     // }
//     return Promise.reject()
//   }
//   else {
//     config.headers['Authorization'] = `Bearer ${token}`
//     return config
//   }
// },
// function (error) {
//   return Promise.reject(error)
// })

// Vue.http.interceptors.response.use(function (response) {
//   return response
// }, function (error) {
//   // alert(error.config.url)
//   $vue.$util.access(error.response, isPC => {
//     if (isPC) {
//       // Vue.http.get(`${ENV.BokaApi}/api/qrcode/login`)
//       // .then(
//       //   res => {
//         // router.push({name: 'tLogin', params: {qrCode: res.data, fromPath: router.currentRoute.path}})
//         // },
//         // error => {
//         //   console.error(error)
//         // }
//       router.push({name: 'tLogin'})
//       // )
//     } else {
//       const orginHref = encodeURIComponent(location.href)
//       location.href = `${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${orginHref}&response_type=code&scope=snsapi_base&state=fromWx#wechat_redirect`
//     }
//   })
//   return Promise.reject(error)
// })

let pending = []
// let cancelToken = axios.CancelToken
let removePending = (config) => {
  for (let p in pending) {
    if (pending[p].u === config.url + '&' + config.method) {
      pending[p].f()
      pending.splice(p, 1)
    }
  }
}
// console.log(new CancelToken(c => {}))
// localStorage.removeItem('token')
let token = null
// 请求拦截器
Vue.http.interceptors.request.use(config => {
  // removePending(config)
  // config.cancelToken = new CancelToken(c => {
  //   pending.push({ u: config.url + '&' + config.method, f: c })
  // })
  // const token = Token.get()
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
Vue.http.interceptors.response.use(response => {
  // removePending(response.config)
  return response
}, error => {
  const lUrl = urlParse(location.href, true)
  if (lUrl.query.code) {
    const code = lUrl.query.code
    Vue.http.get(`${ENV.BokaApi}/api/authLogin/${code}`)
    .then(
      res => {
        token = res.data.data.token
        // Token.set(res.data.data.token)
        // alert(JSON.stringify(res.data))
        location.href = `http://${lUrl.hostname}/${lUrl.hash}`
      }
    )
  } else {
    $vue.$util.access(error.response, isPC => {
      if (isPC) {
        router.push({name: 'tLogin'})
      } else {
        // alert('lUrl.query.code')
        const orginHref = encodeURIComponent(location.href)
        location.href = `${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${orginHref}&response_type=code&scope=snsapi_base&state=fromWx#wechat_redirect`
      }
    })
  }
  return { data: { } }
})

const $vue = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
