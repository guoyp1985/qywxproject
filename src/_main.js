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
import { User, Version, Token, Access } from '#/storage'
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

const CancelToken = AjaxPlugin.$http.CancelToken

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

// Token.remove()
// let bkAccessFlag = true
// let wxAccessFlag = true
// WxAccess.remove()
/*
const handleUserInfo = () => {
  const lUrl = urlParse(location.href, true)
  const token = lUrl.query.token
  const expiredAt = lUrl.query.expired_at
  const code = lUrl.query.code
  const state = lUrl.query.state
  if (token && token !== '') {
    Token.set({token: token, expired_at: expiredAt})
    console.log(Token.get())
    Vue.http.get(`${ENV.BokaApi}/api/user/show`)
    .then(
      res => {
        if (!res) return
        User.set(res.data)
        // 刷新当前页面，剔除微信授跳转参数，保证数据加载正确
        // location.replace(`https://${lUrl.hostname}/${lUrl.hash}`)
      }
    )
  } else if (state === 'defaultAccess' && code) {
    // 401授权，取得token
    Vue.http.get(`${ENV.BokaApi}/api/authLogin/${code}`)
    .then(
      res => {
        if (!res || !res.data || res.data.errcode) return
        Token.set(res.data.data)
        // 取用户信息
        return Vue.http.get(`${ENV.BokaApi}/api/user/show`)
      }
    )
    .then(
      res => {
        if (!res) return
        User.set(res.data)
        // 刷新当前页面，剔除微信授跳转参数，保证数据加载正确
        // location.replace(`https://${lUrl.hostname}/${lUrl.hash}`)
      }
    )
  } else {
    Vue.access(isPC => {
      if (isPC) {
        router.push({name: 'tLogin'})
      } else {
        const originHref = encodeURIComponent(location.href)
        // 微信授权
        location.replace(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${originHref}&response_type=code&scope=snsapi_base&state=defaultAccess#wechat_redirect`)
      }
    })
  }
  return { data: { } }
}
*/

let pendings = []
let cancelAllPendings = () => {
  for (let p of pendings) {
    console.info(`canceled request: ${p.u}`)
    p.f()
  }
  pendings = []
}
// let cancelSpecPending = (config) => {
//   for (let p = 0; p < pendings.length; p++) {
//     if (pendings[p].u === `${config.url}&${config.method}`) {
//       console.info(`canceled request: ${config.url}`)
//       pendings[p].f()
//       pendings.splice(p, 1)
//     }
//   }
// }

// const excludeUrls = [
//   `${ENV.BokaApi}/api/authLogin/*`,
//   `${ENV.BokaApi}/api/qrcode/login*`,
//   `${ENV.BokaApi}/api/scanlogin`
// ]

// 排除全局请求过滤器中的请求url
const rExcludeUrls = ENV.NoAccessUrls.map(url => RegExp(url.replace(/\*/g, '.*').replace(/\?/g, '\\?')))
const matchExclude = url => {
  for (let i = 0; i < rExcludeUrls.length; i++) {
    if (rExcludeUrls[i].test(url)) {
      return true
    }
  }
  return false
}

// 请求拦截器
Vue.http.interceptors.request.use(config => {
  if (!matchExclude(config.url)) {
    config.cancelToken = new CancelToken(c => {
      pendings.push({ u: config.url + '&' + config.method, f: c })
    })

    const token = Token.get()
    if (Token.isExpired()) {
      // console.log(config.url)
      cancelAllPendings(config)
      // handleUserInfo()
      access((path) => {
        router.push({path: path})
      })
    } else {
      config.headers['Authorization'] = `Bearer ${token.token}`
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
Vue.http.interceptors.response.use(response => {
  // removePending(response.config)
  // if (response.status === 200) {
  //   const user = User.get()
  //   if (!user || !user.uid) {
  //     handleUserInfo(response)
  //   }
  // }
  return response
}, error => {
  // handleUserInfo(error.response)
  if (error.response) {
    if (error.response.status === 401) {
      console.error('未授权请求')
    }
  }
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

const access = success => {
  const lUrl = urlParse(location.href, true)
  const token = lUrl.query.token
  const expiredAt = lUrl.query.expired_at
  const code = lUrl.query.code
  const state = lUrl.query.state
  if (token && token !== '') {
    Token.set({token: token, expired_at: expiredAt})
    Vue.http.get(`${ENV.BokaApi}/api/user/show`)
    .then(
      res => {
        if (!res) return
        User.set(res.data)
        // 刷新当前页面，剔除微信授跳转参数，保证数据加载正确
        // location.replace(`https://${lUrl.hostname}/${lUrl.hash}`)
        router.push(lUrl.hash.replace(/#/, ''))
      }
    )
  } else if (state === 'defaultAccess' && code) {
    // 401授权，取得token
    Vue.http.get(`${ENV.BokaApi}/api/authLogin/${code}`)
    .then(
      res => {
        if (!res || !res.data || res.data.errcode) return
        Token.set(res.data.data)
        // 取用户信息
        return Vue.http.get(`${ENV.BokaApi}/api/user/show`)
      }
    )
    .then(
      res => {
        if (!res) return
        User.set(res.data)
        // 刷新当前页面，剔除微信授跳转参数，保证数据加载正确
        // location.replace(`https://${lUrl.hostname}/${lUrl.hash}`)
        success && success(lUrl.hash.replace(/#/, ''))
      }
    )
  } else {
    Vue.access(isPC => {
      if (isPC) {
        success && success()
        router.push({name: 'tLogin'})
      } else {
        const originHref = encodeURIComponent(location.href)
        // 微信授权
        location.replace(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${originHref}&response_type=code&scope=snsapi_base&state=defaultAccess#wechat_redirect`)
      }
    })
  }
}

const clearCache = () => {
  if (ENV.Version !== Version.get()) {
    Token.remove()
    User.remove()
    Access.remove()
    Version.remove()
    Version.set(ENV.Version)
  }
}

const render = () => {
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app-box')
}

clearCache()

if (!Token.get() || Token.isExpired()) {
  access(() => {
    render()
  })
} else {
  render()
}
