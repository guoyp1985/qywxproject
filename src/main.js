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
import { User, Version, Token, Access, SystemParams } from '#/storage'
import ENV from 'env'
import Util from '#/util'
import { AjaxPlugin, WechatPlugin, BusPlugin, LoadingPlugin, ToastPlugin, AlertPlugin, ConfirmPlugin } from 'vux'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)

Vue.use(VueRouter)
Vue.use(Util)
Vue.use(AjaxPlugin)
Vue.use(WechatPlugin)
Vue.use(BusPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
console.log(Vue.wechat)
require('es6-promise').polyfill()

if (ENV.DebugMode) {
  const VConsole = require('vconsole')
  const vConsole = new VConsole()
  vConsole.setOption({maxLogNumber: 5000})
}

const CancelToken = AjaxPlugin.$http.CancelToken
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
  component: () => import('./pages/Index').then(m => m.default)
})

const router = new VueRouter({
  routes
})
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

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

let pendings = []
let cancelAllPendings = () => {
  for (let p of pendings) {
    console.info(`canceled request: ${p.u}`)
    p.f()
  }
  pendings = []
}

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

// let responseFail = false
// 请求拦截器
Vue.http.interceptors.request.use(config => {
  console.log('进入到了请求拦截器, config.url=', config.url)
  if (!matchExclude(config.url)) {
    config.cancelToken = new CancelToken(c => {
      pendings.push({ u: config.url + '&' + config.method, f: c })
    })
    const token = Token.get()
    console.log(`interceptors: ${config.url}`)
    if (Token.isExpired()) {
      console.log('token 过期')
      cancelAllPendings(config)
      access((path) => {
        router.replace({path: path})
      })
    } else {
      console.log('token有效')
      config.headers['Authorization'] = `Bearer ${token.token}`
      if (config.url.indexOf(ENV.FactoryApi) > -1 && ENV.ApiVersion === 'V2') {
        config.headers['Accept'] = ENV.ApiAccept
      }
    }
  }
  console.log('request config', config)
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
Vue.http.interceptors.response.use(response => {
  console.log('请求执行后，url=', response.config.url)
  console.log('请求传参，data=', response.config.data)
  console.log('请求传参，params=', response.config.params)
  console.log('请求执行后返回的数据，data=', response.data)
  return response
}, error => {
  if (error.response) {
    Token.remove()
    if (error.response.status === 401) {
      console.error('未授权请求')
      toAuth()
    }
  }
})

const access = success => {
  let query = ''
  const url = location.href
              .replace(/(.+?\/)(#\/\w+)\?(.+)/, (match, p1, p2, p3) => {
                query = p3
                return `${p1}?${p3}${p2}` // '$1?$3$2'
              })
              .replace(/(.+\?.+?)(#\/\w+)\?(.+)/, (match, p1, p2, p3) => {
                query = p3
                return `${p1}&${p3}${p2}` // '$1&$3$2'
              })
  const lUrl = urlParse(url, true)
  let token = Token.get()
  console.log('进入项目后的链接', lUrl)
  console.log('token=', token)
  console.log('query=', query)
  // gyp的token
  // token = {
  //   expired_at: 1615386907287,
  //   refresh_expired_at: 1615386907287,
  //   token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcXkuYm9rYS5jblwvYXBpXC92aXNpdG9yXC93b3JrVXNlckF1dGhcL0lNMnVSWkllZXRvQ1NBZ2lEZXJGMjNQMEcxeVZQS2RjQ1lkUHV1M0FGUFEiLCJpYXQiOjE2MTQ1MjI5MDcsImV4cCI6MTYxNTM4NjkwNywibmJmIjoxNjE0NTIyOTA3LCJqdGkiOiIya0hjbTdDZlh4SXVyRXdPIiwic3ViIjoxLCJwcnYiOiI4NjY1YWU5Nzc1Y2YyNmY2YjhlNDk2Zjg2ZmE1MzZkNjhkZDcxODE4In0.KYyp5UPejPJDgb5oNSprGfR9B6RB6yCDI2ViQur-qjk'
  // }
  // Token.set(token)

  // gyp的客户
  // token = {
  //   expired_at: 1615386907287,
  //   refresh_expired_at: 1615386907287,
  //   token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9xeS5ib2thLmNuXC9hZG1pblwvdGVzdCIsImlhdCI6MTYxMzk2MTg4MywiZXhwIjoxNjE0ODI1ODgzLCJuYmYiOjE2MTM5NjE4ODMsImp0aSI6IkY1WWZCV3I2SXp1RzlwTTUiLCJzdWIiOjYsInBydiI6Ijg2NjVhZTk3NzVjZjI2ZjZiOGU0OTZmODZmYTUzNmQ2OGRkNzE4MTgifQ.Kbs9qE2elD9l5WOCROi-54xQ5j3LH2NfLzmHjijsKCg'
  // }
  // Token.set(token)

  // 仇总token
  // token = {
  //   expired_at: 1615386907287,
  //   refresh_expired_at: 1615386907287,
  //   token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcXkuYm9rYS5jblwvYXBpXC92aXNpdG9yXC93b3JrVXNlckF1dGhcL0JoMTZzUE1xRkdLQzBmNVdKTTVMVi1jSFZvb3Zra0N4cFBfWUZ5XzlMelUiLCJpYXQiOjE2MTQxMzAzNTMsImV4cCI6MTYxNDk5NDM1MywibmJmIjoxNjE0MTMwMzUzLCJqdGkiOiJMUDlWcEk4NkQyUkRLOUw2Iiwic3ViIjozLCJwcnYiOiI4NjY1YWU5Nzc1Y2YyNmY2YjhlNDk2Zjg2ZmE1MzZkNjhkZDcxODE4In0.V0GN3CU2Ehm2h03Ba-UU4yom8hvB5IgMa6HW4F8Jh9w'
  // }
  // Token.set(token)
  if (location.href.indexOf('/redirect') < 0) {
    if (token && token !== '' && !Token.isExpired()) {
      console.log('进入到了请求用户信息')
      let user = User.get()
      let routerUrl = `${lUrl.hash.replace(/#/, '')}`
      if (query && query !== '') {
        routerUrl = `${routerUrl}?${query}`
      }
      if (!user || !user.uid) {
        Vue.http.get(`${ENV.BokaApi}/api/user/show`).then(res => {
          if (!res) return
          const data = res.data
          let retUser = data.data ? data.data : data
          User.set(retUser)
          console.log('进入的页面地址', routerUrl)
          store.commit('updateMiniInvoke', {miniInvoke: true})
          success && success(routerUrl)
        })
      } else {
        console.log('进入的页面地址', routerUrl)
        store.commit('updateMiniInvoke', {miniInvoke: true})
        success && success(routerUrl)
      }
    } else {
      console.log('token失效')
      Vue.access(isPC => {
        toAuth()
      })
    }
  } else {
    success && success(`${lUrl.hash.replace(/#/, '')}?${query}`)
  }
}

const clearCache = () => {
  if (ENV.Version !== Version.get()) {
    Token.remove()
    User.remove()
    Access.remove()
    Version.remove()
    Version.set(ENV.Version)
    SystemParams.remove()
  }
}

const toAuth = () => {
  let lastIndex = location.href.lastIndexOf('/')
  const originHref = encodeURIComponent(location.href.substr(lastIndex + 1))
  const ruri = encodeURIComponent(`${ENV.Host}/#/redirect`)
  const userAgentInfo = navigator.userAgent
  let ua = userAgentInfo.toLowerCase()
  let isWx = false
  if (/wxwork/i.test(ua) || /MicroMessenger/i.test(ua)) {
    isWx = true
  }
  if (isWx) {
    // 微信授权
    location.replace(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${ruri}&response_type=code&scope=snsapi_base&state=${originHref}#wechat_redirect`)
  } else {
    console.log('进入到了pc端')
    // pc登录二维码
    location.replace(`${ENV.WxQrcodeAuthUrl}appid=${ENV.AppId}&agentid=${ENV.Agentid}&redirect_uri=${ruri}&state=${originHref}#wechat_redirect`)
  }
}

const vue = new Vue({
  store,
  router,
  render: h => h(App)
})

const render = () => {
  vue.$mount('#app-box')
}

clearCache()

// 页面入口
try {
  render()
  if (!Token.get() || Token.isExpired() || !User.get()) {
    access(path => {
      console.log(`Entry: ${path}`)
      router.replace({path: path})
      render()
    })
  } else {
    render()
  }
} catch (e) {
}
