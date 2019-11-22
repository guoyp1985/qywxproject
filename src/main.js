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
    console.log(`interceptors: ${JSON.stringify(token)}`)
    if (Token.isExpired()) {
      // console.log(config.url)
      cancelAllPendings(config)
      access((path) => {
        router.replace({path: path})
      })
    } else {
      console.log(`interceptors: Bearer ${token.token}`)
      config.headers['Authorization'] = `Bearer ${token.token}`
      if (config.url.indexOf(ENV.FactoryApi) > -1 && ENV.ApiVersion === 'V2') {
        config.headers['Accept'] = ENV.ApiAccept
      }
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
Vue.http.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response) {
    Token.remove()
    alert('禁止未授权访问')
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

let bugList = [{uid: 25465, name: '黄一萌'}, {uid: 8, name: 'young'}, {uid: 27531, name: '戴飞'}, {uid: 24675, name: '兰花草'}]
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
  const token = lUrl.query.token
  const expiredAt = lUrl.query.expired_at
  const code = lUrl.query.code
  const state = lUrl.query.state
  const from = lUrl.query.from
  // const miniHeight = parseInt(lUrl.query.miniHeight)
  // const miniAppId = lUrl.query.miniappid
  // const miniOpenId = lUrl.query.miniopenid
  console.log(lUrl)
  console.log(from)
  // if (state === 'miniAccess' && code) {
  //   console.log(`${lUrl.hash.replace(/#/, '')}?${query}`)
  //   const params = {code: code, miniopenid: miniOpenId, appid: miniAppId}
  //   Vue.http.get(`${ENV.BokaApi}/api/withMiniLogin`, {params: params})
  //   .then(
  //     res => {
  //       console.log(res)
  //       if (!res || !res.data || res.data.errcode) {
  //         if (res.data.flag === 0) console.error(res.data.error)
  //         else console.error(res)
  //         return
  //       }
  //       Token.set(res.data.data)
  //       // 取用户信息
  //       // console.log(`miniAccess: /user/show`)
  //       return Vue.http.get(`${ENV.BokaApi}/api/user/show`)
  //     },
  //     res => {
  //       console.error(res)
  //     }
  //   )
  //   .then(
  //     res => {
  //       if (!res) return
  //       User.set(res.data)
  //       // 刷新当前页面，剔除微信授跳转参数，保证数据加载正确
  //       // location.replace(`https://${lUrl.hostname}/${lUrl.hash}`)
  //       console.log(`${lUrl.hash.replace(/#/, '')}?${query}&from=miniprogram`)
  //       // router.push(`${lUrl.hash.replace(/#/, '')}?${query}`)
  //       store.commit('updateMiniInvoke', {miniInvoke: true})
  //       success && success(`${lUrl.hash.replace(/#/, '')}?${query}`)
  //       // if (MiniApp.getOpenId() && MiniApp.getAppId()) {
  //       //   MiniApp.removeOpenId()
  //       //   MiniApp.removeAppId()
  //       //   let dt = new Date().getTime()
  //       //   router.push({path: `/centerSales?from=miniprogram&_dt=${dt}`})
  //       // }
  //     }
  //   )
  // } else
  if (from === 'miniprogram') {
    // if (miniAppId && miniAppId !== '') {
    //   const redirectUri = location.href.replace(/(?:&from=miniprogram)|(?:from=miniprogram&)/g, '')
    //   const originHref = encodeURIComponent(redirectUri)
    //   console.log(originHref)
    //   // 小程序web-view内授权
    //   // location.replace(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${originHref}&response_type=code&scope=snsapi_base&state=miniAccess&miniappid=${miniAppId}&miniopenid=${miniOpenId}#wechat_redirect`)
    //   location.replace(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${originHref}&response_type=code&scope=snsapi_base&state=miniAccess#wechat_redirect`)
    // } else
    // if (miniHeight) { // 适配小程序web-view高度上的bug
    //   AdapterHeight.set(miniHeight)
    // }
    if (token && token !== '') {
      Token.set({token: token, expired_at: expiredAt})
      // console.log(`miniprogram: /user/show`)
      Vue.http.get(`${ENV.BokaApi}/api/user/show`)
      .then(
       res => {
         if (!res) return
         User.set(res.data)
         // 刷新当前页面，剔除微信授跳转参数，保证数据加载正确
         // location.replace(`https://${lUrl.hostname}/${lUrl.hash}`)
         console.log(`${lUrl.hash.replace(/#/, '')}?${query}&from=miniprogram`)
         // router.push(`${lUrl.hash.replace(/#/, '')}?${query}`)
         store.commit('updateMiniInvoke', {miniInvoke: true})
         success && success(`${lUrl.hash.replace(/#/, '')}?${query}`)
       }
      )
    }
  } else if (state === 'defaultAccess' && code) {
    console.log('进入到了defaultAccess code 的判断内')
    // 401授权，取得token
    Vue.http.get(`${ENV.BokaApi}/api/authUser/${code}`)
    .then(
      res => {
        console.log('weinxin/authUser success')
        console.log(res)
        if (!res || !res.data || res.data.errcode) {
          alert('清空缓存重试')
          console.log('进入到了authUser请求未返回数据')
          Token.remove()
          return
        }
        Token.set(res.data.data)
        // 取用户信息
        // console.log(`defaultAccess: /user/show`)
        return Vue.http.get(`${ENV.BokaApi}/api/user/show`)
      }, res => {
        alert('刷新试试')
        console.log('进入到了authUser请求失败')
        console.log(res)
        Token.remove()
      }
    )
    .then(
      res => {
        console.log('weinxin/authUser error')
        console.log(res)
        if (!res) return
        const rData = res.data
        for (let i = 0; i < bugList.length; i++) {
          console.log(`${rData.uid} === ${rData.uid}`)
          if (bugList[i].uid === rData.uid) {
            alert('已获取用户信息')
          }
        }
        User.set(res.data)
        // 刷新当前页面，剔除微信授跳转参数，保证数据加载正确
        // location.replace(`https://${lUrl.hostname}/${lUrl.hash}`)
        console.log(`${lUrl.hash.replace(/#/, '')}?${query}`)
        success && success(`${lUrl.hash.replace(/#/, '')}?${query}`)
      }
    )
  } else {
    console.log('已经授权过了')
    Vue.access(isPC => {
      if (isPC) {
        success && success()
        router.push({name: 'tLogin'})
      } else {
        const originHref = encodeURIComponent(location.href)
        // 微信授权
        location.replace(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${originHref}&response_type=code&scope=snsapi_userinfo&state=defaultAccess#wechat_redirect`)
      }
    })
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

const render = () => {
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app-box')
}

clearCache()

// 页面入口
if (!Token.get() || Token.isExpired()) {
  access(path => {
    console.log(`Entry: ${path}`)
    router.replace({path: path})
    for (let i = 0; i < bugList.length; i++) {
      console.log(bugList[i])
      if (bugList[i].uid === User.get().uid) {
        alert('准备渲染页面')
      }
    }
    render()
  })
} else {
  render()
}
