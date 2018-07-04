// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import urlParse from 'url-parse'
// import router from './router'
import store from './store'
// import './coms'
import App from './App'
import objectAssign from 'object-assign'
import { Token, User } from '#/storage'
import ENV from 'env'
import Util from '#/util'
import { AjaxPlugin, WechatPlugin, BusPlugin, LoadingPlugin, ToastPlugin, AlertPlugin, ConfirmPlugin } from 'vux'
// import VueScroller from 'vue-scroller'
//
// Vue.use(VueScroller)
Vue.use(VueRouter)
Vue.use(Util)
Vue.use(AjaxPlugin)
Vue.use(WechatPlugin)
Vue.use(BusPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)

require('es6-promise').polyfill()

// const CancelToken = AjaxPlugin.$http.CancelToken

// const headers = new Headers();
// headers.set('Origin', 'https://vux.boka.cn')
// headers.set('Accept', 'application/json')
// headers.set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2xhcmF2ZWwuYm9rYS5jbi9hcGkvYXV0aExvZ2luLzAwMWdkQ0hsMU1WS1RsMGo1d0ZsMWpEVkhsMWdkQ0hsIiwiaWF0IjoxNTI1NzQ5NzQ1LCJleHAiOjE1MjY2MTM3NDUsIm5iZiI6MTUyNTc0OTc0NSwianRpIjoiR0xNbFVEekhSVGNHc2ZleCIsInN1YiI6MTA4LCJwcnYiOiI4NjY1YWU5Nzc1Y2YyNmY2YjhlNDk2Zjg2ZmE1MzZkNjhkZDcxODE4In0.5vUDv3gTyGhY_kMf0DVezf-8rHunFBMhwJ_YzWp6az8')
// const reqInit = {
//   method: "GET",
//   headers: headers,
//   mode: "cors",
//   cache: "default"
// };
// fetch(new Request(`${ENV.BokaApi}/api/user/show`, { ...reqInit }))
// .then(res => res.json())
// .then(data => {
//   alert(data)
// })
// Vue.http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Vue.http.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
// Vue.http.defaults.withCredentials = true;
// Vue.http.defaults.headers.common['Authorization'] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2xhcmF2ZWwuYm9rYS5jbi9hcGkvYXV0aExvZ2luLzAwMWdkQ0hsMU1WS1RsMGo1d0ZsMWpEVkhsMWdkQ0hsIiwiaWF0IjoxNTI1NzQ5NzQ1LCJleHAiOjE1MjY2MTM3NDUsIm5iZiI6MTUyNTc0OTc0NSwianRpIjoiR0xNbFVEekhSVGNHc2ZleCIsInN1YiI6MTA4LCJwcnYiOiI4NjY1YWU5Nzc1Y2YyNmY2YjhlNDk2Zjg2ZmE1MzZkNjhkZDcxODE4In0.5vUDv3gTyGhY_kMf0DVezf-8rHunFBMhwJ_YzWp6az8`

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

FastClick.attach(document.body)

Vue.config.productionTip = false

// The following line will be replaced with by vux-loader with routes in ./page_list.json
const routes = []

routes.push({
  path: '/',
  name: 'tIndex',
  component: () => import('./pages/Center').then(m => m.default)
})

const router = new VueRouter({
  routes
})

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

// let excludeUrls = [
//   `${ENV.BokaApi}/api/authLogin/*`
  // `${ENV.BokaApi}/api/qrcode/login*`,
  // `${ENV.BokaApi}/api/login/*`,
  // `${ENV.BokaApi}/api/scanlogin`
  // `${ENV.BokaApi}/api/weixin/token`
// ]

// 排除全局请求过滤器中的请求url
// const rExcludeUrls = excludeUrls.map(url => RegExp(url.replace(/\*/g, '.*').replace(/\?/g, '\\?')))
// const matchExclude = url => {
//   for (let i = 0; i < rExcludeUrls.length; i++) {
//     // alert(`${item.url} ${item.reqMax}`)
//     if (rExcludeUrls[i].test(url)) {
//       return true
//     }
//   }
//   return false
// }
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

// let pending = []
// let removePending = (config) => {
//   for (let p in pending) {
//     if (pending[p].u === config.url + '&' + config.method) {
//       pending[p].f()
//       pending.splice(p, 1)
//     }
//   }
// }

// Token.remove()
// 请求拦截器
Vue.http.interceptors.request.use(config => {
  // removePending(config)
  // config.cancelToken = new CancelToken(c => {
  //   pending.push({ u: config.url + '&' + config.method, f: c })
  // })
  const token = Token.get()
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, error => {
  return Promise.reject(error)
})

const handleUserInfo = (response) => {
  const lUrl = urlParse(location.href, true)
  const code = lUrl.query.code
  const state = lUrl.query.state
  if (state === 'defaultAccess' && code) {
    alert('in defaultAccess && code')
    // Access.set(true)
    Vue.http.get(`${ENV.BokaApi}/api/authLogin/${code}`)
    .then(
      res => {
        Token.set(res.data.data.token)
        // getAddress(res.data.data.weixin_token)
        return Vue.http.get(`${ENV.BokaApi}/api/user/show`)
      }
    )
    .then(
      res => {
        if (res.status === 200) {
          User.set(res.data)
          // location.href = `http://${lUrl.hostname}/${lUrl.hash}`
          location.replace(`http://${lUrl.hostname}/${lUrl.hash}`)
        }
      }
    )
  } else {
    alert('in !(defaultAccess && code)')
    $vue.$util.access(response, isPC => {
      if (isPC) {
        router.push({name: 'tLogin'})
      } else {
        const originHref = encodeURIComponent(location.href)
        location.replace(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${originHref}&response_type=code&scope=snsapi_base&state=defaultAccess#wechat_redirect`)
      }
    })
  }
  return { data: { } }
}

// 响应拦截器
Vue.http.interceptors.response.use(response => {
  // removePending(response.config)
  if (response.status === 200) {
    const user = User.get()
    if (!user || !user.uid) {
      handleUserInfo(response)
    }
  }
  return response
}, error => {
  handleUserInfo(error.response)
})

// const getAddress = (wxToken) => {
//   const accessToken = wxToken
//   const nonceStr = $vue.$util.randomStr(6)
//   const timeStamp = $vue.$util.timeStamp()
//   const currentUrl = urlParse(location.href, true)
//   const url = currentUrl.href.replace(/#\/\w*/g, '')
//   alert(`${accessToken}, ${ENV.AppId}, ${nonceStr}, ${timeStamp}, ${url}`)
//   const addrSign = $vue.$util.wxSign(accessToken, ENV.AppId, nonceStr, timeStamp, url)
//   window.WeixinJSBridge.invoke('editAddress', {
//     appId: ENV.AppId,
//     scope: 'jsapi_address',
//     signType: 'sha1',
//     addrSign: addrSign,
//     timeStamp: timeStamp,
//     nonceStr: nonceStr
//   },
//   res => {
//     alert(res.err_msg)
//     if (res.err_msg === 'edit_address:ok') {
//       const param = {
//         linkman: res.userName,
//         telephone: res.telNumber,
//         province: res.proviceFirstStageName,
//         city: res.addressCitySecondStageName,
//         counties: res.addressCountiesThirdStageName,
//         address: res.addressDetailInfo
//       }
//       alert(param)
//     }
//   })
// }

const $vue = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
