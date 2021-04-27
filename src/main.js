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
import { User, Version, Token, Access, SystemParams, GlobalData, AuthCount } from '#/storage'
import ENV from 'env'
import Util from '#/util'
import { AjaxPlugin, WechatPlugin, BusPlugin, LoadingPlugin, ToastPlugin, AlertPlugin, ConfirmPlugin } from 'vux'
import LuckDraw from 'vue-luck-draw'
Vue.use(LuckDraw)

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
Vue.config.ignoredElements = ['wx-open-launch-app', 'wx-open-launch-weapp']

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
    const token = Token.get()
    config.cancelToken = new CancelToken(c => {
      pendings.push({ u: config.url + '&' + config.method, f: c })
    })
    config.headers['Authorization'] = `Bearer ${token.token}`
  }
  console.log('request config', config)
  return config
}, error => {
  console.log('请求拦截器 进入到了error')
  console.log(error)
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
  console.log('response 请求进入到了error, error=', error)
  console.log('输出了erro.response')
  console.log(error.response)
  if (error.response) {
    console.log('error.response 进入了')
    console.log(error.response.status)
    console.log(error.response.status === 401)
    if (error.response.status === 401) {
      console.error('未授权请求')
      if (Vue.isPC) {
        clearCache()
        toAuth()
      }
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
  const urlQuery = lUrl.query
  let code = urlQuery.code
  let state = urlQuery.state
  if (lUrl.hash.indexOf('code=') > -1 && !code) {
    let hashUrl = lUrl.hash
    let uquery = {}
    let lastindex = hashUrl.lastIndexOf('?')
    if (lastindex >= 0) {
      hashUrl = hashUrl.substr(lastindex + 1)
    }
    let params = hashUrl.split('&')
    for (let i = 0; i < params.length; i++) {
      let p = params[i].split('=')
      uquery[p[0]] = p[1]
    }
    code = uquery.code
    state = uquery.state
    console.log('获取hashUrl里的参数')
    console.log(uquery)
  }
  if (state === 'defaultAccess' && code) {
    const jumpUrl = `${lUrl.hash.replace(/#/, '')}?${query}`
    console.log('授权成功后要跳转的页面')
    console.log(jumpUrl)
    Vue.http.get(`${ENV.BokaApi}/api/visitor/workUserAuth/${code}`).then(res => {
      console.log('main.js页面workUserAuth成功了', res)
      const ret = res.data
      if (!res) {
        Token.remove()
        location.replace(lUrl.href)
        return
      }
      console.log('main.js页面设置token')
      console.log(ret.data)
      Token.set(ret.data)
      console.log('设置后的token=', Token.get())
      return Vue.http.get(`${ENV.BokaApi}/api/user/show`, {
        params: {init: 1}
      })
    }, res => {
      console.log('main.js页面workUserAuth请求失败', res)
      Token.remove()
      success && success(jumpUrl)
    }).then(res => {
      console.log('main.js页面user/show成功了', res)
      if (!res) return
      const data = res.data
      if (data.code === 0) {
        User.set(data.data)
        SystemParams.set(data.paras)
        GlobalData.set(data)
        Vue.wxConfig()
      }
      success && success(jumpUrl)
    }, res => {
      console.log('redirect页面user/show失败了', res)
      Token.remove()
      success && success(jumpUrl)
    })
  } else {
    if (token && token !== '' && !Token.isExpired()) {
      console.log('进入到了请求用户信息')
      let user = User.get()
      let routerUrl = `${lUrl.hash.replace(/#/, '')}`
      if (query && query !== '') {
        routerUrl = `${routerUrl}?${query}`
      }
      if (!user || !user.uid) {
        Vue.http.get(`${ENV.BokaApi}/api/user/show`, {
          params: {init: 1}
        }).then(res => {
          if (!res) return
          const data = res.data
          if (data.code === 0) {
            User.set(data.data)
            SystemParams.set(data.paras)
            GlobalData.set(data)
            Vue.wxConfig()
          }
          console.log('进入的页面地址', routerUrl)
          store.commit('updateMiniInvoke', {miniInvoke: true})
          success && success(routerUrl)
        }, error => {
          console.log('main.js页面的user/show出错了')
          console.log(error)
        })
      } else {
        Vue.wxConfig()
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
  }
}

const clearCache = () => {
  console.log('清理了缓存')
  Token.remove()
  User.remove()
  Access.remove()
  Version.remove()
  Version.set(ENV.Version)
  SystemParams.remove()
  GlobalData.remove()
  AuthCount.remove()
}

const toAuth = () => {
  const ruri = encodeURIComponent(location.href)
  const userAgentInfo = navigator.userAgent
  let ua = userAgentInfo.toLowerCase()
  let isWx = false
  if (/wxwork/i.test(ua) || /MicroMessenger/i.test(ua)) {
    isWx = true
  }
  console.log('进入到了授权页面')
  console.log(location.href)
  if (isWx) {
    // 微信授权
    location.replace(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${ruri}&response_type=code&scope=snsapi_base&state=defaultAccess#wechat_redirect`)
  } else {
    console.log('进入到了pc端')
    // pc登录二维码
    location.replace(`${ENV.WxQrcodeAuthUrl}appid=${ENV.AppId}&agentid=${ENV.Agentid}&redirect_uri=${ruri}&state=defaultAccess#wechat_redirect`)
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

console.log('进入到了main.js')
console.log(ENV.Version)
console.log(Version.get())
console.log(ENV.Version === Version.get())
if (ENV.Version !== Version.get()) {
  clearCache()
}
// 页面入口
try {
  // render()
  console.log('=========页面入口===========')
  console.log(location.href)
  console.log('缓存里的token=', Token.get())
  console.log('token是否过期 ', Token.isExpired())
  console.log('缓存里的user=', User.get())
  if (location.href.indexOf('/clear') > -1) {
    render()
  } else {
    if (!Token.get() || Token.isExpired() || !User.get()) {
      console.log('页面入口，token失效')
      access(path => {
        console.log(`Entry: ${path}`)
        router.replace({path: path})
        render()
      })
    } else {
      console.log('页面入口，有token')
      render()
    }
  }
} catch (e) {
  console.log('页面入口catch到了错误')
  console.log(e)
}
