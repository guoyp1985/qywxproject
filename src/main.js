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
  if (!matchExclude(config.url)) {
    config.cancelToken = new CancelToken(c => {
      pendings.push({ u: config.url + '&' + config.method, f: c })
    })

    const token = Token.get()
    console.log(`interceptors: ${config.url}`)
    // console.log(`interceptors: ${JSON.stringify(token)}`)
    if (Token.isExpired()) {
      console.log('token 过期')
      // console.log(config.url)
      cancelAllPendings(config)
      access((path) => {
        router.replace({path: path})
      })
    } else {
      console.log('token有效')
      // console.log(`interceptors: Bearer ${token.token}`)
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
  console.log('请求执行后')
  console.log(response)
  return response
}, error => {
  if (error.response) {
    Token.remove()
    vue.$vux.alert.show({
      title: '提示',
      content: `无效token:${Token.get().token} :: 禁止未授权访问`
    })
    if (error.response.status === 401) {
      console.error('未授权请求')
      Vue.access(isPC => {
        if (isPC) {
          router.push('login')
        }
      })
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
  const token = Token.get()
  const expiredAt = lUrl.query.expired_at
  // const code = lUrl.query.code
  // const state = lUrl.query.state
  // const from = lUrl.query.from
  console.log('进入项目后的链接', lUrl)
  console.log('token=', token)
  if (location.href.indexOf('/redirect') < 0) {
    if (token && token !== '' && !Token.isExpired()) {
      Token.set({token: token, expired_at: expiredAt})
      Vue.http.get(`${ENV.BokaApi}/api/user/show`).then(res => {
        if (!res) return
        User.set(res.data)
        // 刷新当前页面，剔除微信授跳转参数，保证数据加载正确
        // location.replace(`https://${lUrl.hostname}/${lUrl.hash}`)
        console.log('进入的页面地址')
        console.log(`${lUrl.hash.replace(/#/, '')}?${query}&from=miniprogram`)
        // router.push(`${lUrl.hash.replace(/#/, '')}?${query}`)
        store.commit('updateMiniInvoke', {miniInvoke: true})
        success && success(`${lUrl.hash.replace(/#/, '')}?${query}`)
      })
    } else {
      console.log('token失效')
      Vue.access(isPC => {
        if (isPC) {
          console.log('进入到了pc端')
          let lastIndex = location.href.lastIndexOf('/')
          const originHref = encodeURIComponent(location.href.substr(lastIndex + 1))
          const ruri = encodeURIComponent(`${ENV.Host}/#/redirect`)
          // pc登录二维码
          location.replace(`${ENV.WxQrcodeAuthUrl}appid=${ENV.AppId}&agentid=${ENV.Agentid}&redirect_uri=${ruri}&state=${originHref}#wechat_redirect`)
        } else {
          let lastIndex = location.href.lastIndexOf('/')
          const originHref = encodeURIComponent(location.href.substr(lastIndex + 1))
          const ruri = encodeURIComponent(`${ENV.Host}/#/redirect`)
          // 微信授权
          location.replace(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${ruri}&response_type=code&scope=snsapi_base&state=${originHref}#wechat_redirect`)
        }
      })
    }
  } else {
    success && success(`${lUrl.hash.replace(/#/, '')}?${query}`)
  }
}

const clearCache = () => {
  const url = location.href
              .replace(/(.+?\/)(#\/\w+)\?(.+)/, (match, p1, p2, p3) => {
                return `${p1}?${p3}${p2}`
              })
              .replace(/(.+\?.+?)(#\/\w+)\?(.+)/, (match, p1, p2, p3) => {
                return `${p1}&${p3}${p2}`
              })
  const lUrl = urlParse(url, true)
  const from = lUrl.query.from
  if (from === 'miniprogram') {
    console.log('mini clear')
    Token.remove()
  }
  if (ENV.Version !== Version.get()) {
    Token.remove()
    User.remove()
    Access.remove()
    Version.remove()
    Version.set(ENV.Version)
    SystemParams.remove()
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

const alertStack = []
let authCount = 0
// 页面入口
try {
  if (!Token.get() || Token.isExpired() || !User.get()) {
    access(path => {
      console.log(`Entry: ${path}`)
      router.replace({path: path})
      let curUser = User.get()
      if (curUser && curUser.uid) {
        for (let i = 0; i < ENV.DebugList.length; i++) {
          if (ENV.DebugList[i].uid === User.get().uid) {
            alertStack.push(
              () => {
                vue.$vux.alert.show({
                  title: '提示',
                  content: `token:${Token.get().token} :: 开始渲染页面`,
                  onShow () {
                    console.log('Plugin: I\'m showing')
                  },
                  onHide () {
                    console.log('Plugin: I\'m hiding')
                  }
                })
              }
            )
          }
        }
      }
      render()
    })
  } else {
    for (let i = 0; i < ENV.DebugList.length; i++) {
      if (ENV.DebugList[i].uid === User.get().uid) {
        vue.$vux.alert.show({
          title: '提示',
          content: `有token:${Token.get().token} :: 开始渲染页面`,
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {
            console.log('Plugin: I\'m hiding')
          }
        })
      }
    }
    render()
  }
} catch (e) {
  if (authCount >= 3) {
    vue.$vux.alert.show({
      title: '提示',
      content: `持续授权3次失败，请联系运营方处理`
    })
  } else {
    authCount++
    vue.$vux.alert.show({
      title: '提示',
      content: `error:${e.toString()} :: 代码异常`,
      onHide () {
        Token.remove()
        User.remove()
        access(path => {
          console.log(`Entry: ${path}`)
          router.replace({path: path})
          render()
        })
      }
    })
  }
}
