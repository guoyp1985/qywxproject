import Vue from 'vue'
import Reg from './reg'
import ENV from 'env'
import SHA1 from 'js-sha1'
import Time from './time'
import urlParse from 'url-parse'
import jQuery from 'jquery'
import { User, Roomid, Token, SystemParams } from './storage'
const jweixin = require('../static/jweixin')
const jwxwork = require('../static/jwxwork-1.0.0')
const Util = {}

Util.install = function (Vue, options) {
  Vue.isPC = function () {
    const userAgentInfo = navigator.userAgent
    return !Reg.rPlatfrom.test(userAgentInfo)
  }

  Vue.access = function (/*response, */authorization) {
    const isPC = Vue.isPC()
    // if (response && response.status === 401) {
    authorization(isPC)
    // }
  }

  Vue.prototype.$util = {
    // 去空格
    trim: (str) => str ? str.toString().replace(Reg.rSpace, '') : '',
    // 判空
    isNull: function (str) {
      if (!str) {
        return true
      }
      return !Reg.rNoSpace.test(this.trim(str))
    },
    // 判终端
    isPC: function () {
      const userAgentInfo = navigator.userAgent
      return !Reg.rPlatfrom.test(userAgentInfo)
    },
    isAndroid: function() {
      const userAgentInfo = navigator.userAgent
      return Reg.rAndroid.test(userAgentInfo)
    },
    isIOS: function() {
      const userAgentInfo = navigator.userAgent
      return Reg.rIOS.test(userAgentInfo)
    },
    // 判授权
    access: function (/*response, */authorization) {
      const isPC = this.isPC()
      // if (response && response.status === 401) {
      authorization(isPC)
      // }
    },
    validate: (model, reg, failHandle) => {
      let re = null
      let stop = null
      reg = typeof reg === 'string' ? new RegExp(reg) : reg
      if (!model.value || model.value == undefined || model.value == null) {
        re = false
      } else if (reg && model) {
        re = reg.test(model.value)
      }
      return re ? re : (stop = failHandle(model))
    },
    validateQueue: function (items, failHandle) {
      let re = true
      failHandle = failHandle ? failHandle : () => false
      for (let item of items) {
        let rs = null
        for (let n in item) {
          if (!/^r|required$/.test(n)) {
            const k = n
            const v = item[n]
            if (item.required == undefined || item.required || ( item.required === false && (this.trim(v) !== '') )) {
              rs = this.validate({key: k, value: v}, Reg[`r${item.r}`] || Reg.rHas, failHandle)
            } else if (!item.required && (this.trim(v) == '')) {
              rs = true
            }
          }
        }
        !rs && (re = false)
        if (rs === false) return false
      }
      return re;
    },
    getItem: function(list, id) {
      for (let item of list) {
        if (item.id === id) {
          return item
        }
      }
    },
    deleteItem: function (list, id) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          list.splice(i, 1)
          break
        }
      }
    },
    changeItem: function (list, id, callback) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          let item = callback(list[i])
          list.splice(i, 1, item)
          break
        }
      }
      return list
    },
    emotPrase: function(text) {
      if(!Reg.rEmot.test(text)) return text
      text = text.replace(Reg.rEmot, (match, p1, offset, string) => {
        const emotStr = p1.match(/\[([^\]]+)\]/)[1]
        let eIndex = 0
        for (let i = 0; i < ENV.Emots.length; i++) {
          if (ENV.Emots[i] === emotStr) {
            eIndex = i
            break
          }
        }
        return `<img style="vertical-align:middle;" src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${eIndex}.gif"/>`
      })
      return this.emotPrase(text)
    },
    // checkMobile: function (mobile) {
    //   if (isNaN(mobile)) return false;
    //   if (!mobile || mobile=="" || mobile.length!=11) {
    //   	return false;
    //   }
    //   if (/^13\d{9}$/g.test(mobile) || (/^15[0-35-9]\d{8}$/g.test(mobile)) || (/^18[012345-9]\d{8}$/g.test(mobile)) || (/^17[06578]\d{8}$/g.test(mobile)) || (/^16[6]\d{8}$/g.test(mobile)) || (/^19[89]\d{8}$/g.test(mobile)) || (/^14[57]\d{8}$/g.test(mobile))) {
    //   	return true;
    //   }
    //   return false;
    // },
    wxAccess: function () {
      const user = User.get()
      if (user && user.subscribe === 0) {
        const originHref = encodeURIComponent(location.href)
        const callbackHref = encodeURIComponent(`${ENV.Host}/#/redirect`)
        location.replace(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${callbackHref}&response_type=code&scope=snsapi_userinfo&state=${originHref}#wechat_redirect`)
      } else {
        Vue.http.get(`${ENV.BokaApi}/api/user/show`)
        .then(res => {
          User.set(res.data)
        })
      }
    },
    wxAccessListening: function () {
      const lUrl = urlParse(location.href, true)
      const code = lUrl.query.code
      const state = lUrl.query.state
      if (state === 'userAccess' && code) {
        Vue.http.get(`${ENV.BokaApi}/api/authUser/${code}`)
        .then(
          res => {
            alert(JSON.stringify(res.data))
            if (res.data.flag) {
              User.set({
                ...user,
                ...res.data.data
              })
              location.replace(`http://${lUrl.hostname}/${lUrl.hash}`)
            }
          },
          error => {
            Vue.$vux.toast.show({
              text: '服务器错误',
              type: 'warn',
            })
          }
        )
      }
    },
    delay: (text) => {
      let ret = 1000
      let len = text.length
      if (len > 0) {
        ret = len * 200
        if (ret < 1000) {
          ret = 1000
        } else if (ret > 600000) {
          ret = 600000
        }
      }
      return ret
    },
    timeStamp : () => Math.floor(new Date().getTime()/1000).toString(),
    randomStr: (len) => {
      if (!len) {
        len = 16
      }
      const strLen = ENV.FeedChars.length;
      let ret = '';
      for (let i = 0; i < len; i++) {
        ret += ENV.FeedChars.charAt(Math.floor(Math.random() * strLen));
      }
      return ret;
    },
    wxSign: (accessToken, appId, nonceStr, timeStamp, url) => {
      alert(`accesstoken=${accessToken}&appid=${appId}&noncestr=${nonceStr}&timestamp=${timeStamp}&url=${url}`)
      SHA1(`accesstoken=${accessToken}&appid=${appId}&noncestr=${nonceStr}&timestamp=${timeStamp}&url=${url}`)
    },
    query: (url) => {
      if (!url) {
        url = location.href
      }
      let query = {}
      let lastindex = url.lastIndexOf('?')
      if (lastindex >= 0) {
        url = url.substr(lastindex + 1)
      } else {
        return query
      }
      let params = url.split('&')
      for (let i = 0; i < params.length; i++ ) {
        let p = params[i].split('=')
        query[p[0]] = p[1]
      }
      return query
    },
    wxShareSuccess: function (params) {
      let self = this
      let wxData = params.data
      let postparams = {
        id: wxData.moduleid,
        type: params.type
      }
      if (wxData.lastshareuid) {
        postparams.lastshareuid = wxData.lastshareuid
      }
      Vue.http.post(`${ENV.BokaApi}/api/share/${wxData.module}`, postparams).then(function (res) {
        let data = res.data
        params.successCallback && params.successCallback(data)
      })
    },
    wxConfig: function (callback) {
      Vue.http.get(`${ENV.BokaApi}/api/common/jsconfig`,
        { params: { url: encodeURIComponent(location.href.split('#')[0]) } }
      ).then(res => {
        if (!res) return
        // jweixin.config(res.data)
        // jweixin.error(function () {
        //   // Vue.$vux.toast.show({
        //   //   text: '微信还没有准备好，请刷新页面',
        //   //   type: 'warn',
        //   // })
        // })
        let data = res.data
        data.jsApiList.push('shareToExternalContact')
        data.jsApiList.push('shareToExternalChat')
        jweixin.config(data)
        jweixin.error(function () {
          // Vue.$vux.toast.show({
          //   text: '微信还没有准备好，请刷新页面',
          //   type: 'warn',
          // })
        })
        callback && callback()
      })
      Vue.http.get(`${ENV.BokaApi}/api/common/agentConfig`,
        { params: { url: encodeURIComponent(location.href.split('#')[0]) } }
      ).then(res => {
        if (!res) return
        // jweixin.config(res.data)
        // jweixin.error(function () {
        //   // Vue.$vux.toast.show({
        //   //   text: '微信还没有准备好，请刷新页面',
        //   //   type: 'warn',
        //   // })
        // })
        let data = res.data
        data.jsApiList.push('shareToExternalContact')
        data.jsApiList.push('shareToExternalChat')
        wx.agentConfig(data)
        jweixin.error(function () {
          // Vue.$vux.toast.show({
          //   text: '微信还没有准备好，请刷新页面',
          //   type: 'warn',
          // })
        })
        callback && callback()
      })
    },
    wxShare: function (params) {
      const self = this
      let wxData = params.data
      let isUpdate = false
      jweixin.ready(function () {
        params.readyCallback && params.readyCallback()
        console.log('微信准备好了')
        jweixin.showMenuItems({
          menuList: [
            'menuItem:profile',
            'menuItem:addContact'
          ]
        })
        jweixin.hideMenuItems({
          menuList: [
            'menuItem:exposeArticle',
            'menuItem:setFont',
            'menuItem:readMode',
            'menuItem:share:qq',
            'menuItem:share:QZone',
            'menuItem:share:weiboApp',
            'menuItem:share:facebook'
          ]
        })
        let wxshareurl = wxData.link
        let query = self.query(wxshareurl)
        if (query.openid) {
            wxshareurl = wxshareurl.replace(`&openid=${query.openid}`, '').replace(`openid=${query.openid}`, '')
        }
        jweixin.checkJsApi({
          jsApiList: ['onMenuShareAppMessage', 'shareToExternalChat', 'shareToExternalContact'],
          success: function(res) {
            if (!res.checkResult.onMenuShareAppMessage) {
              isUpdate = true
            }
          }
        })
        jweixin.onMenuShareAppMessage({
          title: wxData.title,
          desc: wxData.desc,
          link: wxshareurl,
          imgUrl: wxData.photo,
          type: wxData.type,
          dataUrl:wxData.dataUrl,
          trigger: function (res) {
            //分享之前执行
            //	alert('用户点击发送给朋友');
            params.beforeShare && params.beforeShare()
            // if (wxData.desc == "undefined" || wxData.desc == undefined) {
            //   alert("微信还没准备好分享，请稍后再试");
            // }
            if (res.shareTo == "favorite") {
              self.wxShareSuccess({
                data: wxData,
                type: 'favorite',
                successCallback: params.successCallback
              })
            }
          },
          success: function (resp) {
            if (isUpdate) {
              alert("微信版本太低，请先升级微信客户端!")
            }
            self.wxShareSuccess({
              data: wxData,
              type: 'friend',
              successCallback: params.successCallback
            })
          },
          cancel: function (resp) {
          }
        })
        jweixin.onMenuShareTimeline({
          title: wxData.title,
          link: wxshareurl,
          imgUrl: wxData.photo,
          trigger: function (res) {
            //分享之前执行
            //	alert('用户点击发送给朋友');
            params.beforeShare && params.beforeShare()
            // if (wxData.desc === "undefined" || wxData.desc === undefined) {
            //   alert("微信还没准备好分享，请稍后再试");
            // }
          },
          success: function (resp) {
            self.wxShareSuccess({
              data: wxData,
              type: 'timeline',
              successCallback: params.successCallback
            })
          },
          cancel: function (resp) {
          }
        })
        jweixin.onMenuShareQQ({
          title: wxData.title,
          desc: wxData.desc,
          link: wxshareurl,
          imgUrl: wxData.photo,
          trigger: function (res) {
            //分享之前执行
            //	alert('用户点击发送给朋友');
            params.beforeShare && params.beforeShare()
            // if (wxData.desc === "undefined" || wxData.desc === undefined) {
            //   alert("微信还没准备好分享，请稍后再试");
            // }
          },
          success: function (resp) {
            self.wxShareSuccess({
              data: wxData,
              type: 'qq',
              successCallback: params.successCallback
            })
          },
          cancel: function (resp) {
          }
        })
        // wx.invoke('shareToExternalChat', {
        //   title: wxData.title,
        //   desc: wxData.desc,
        //   link: wxshareurl,
        //   imgUrl: wxData.photo,
        //   success: function (res) {
        //   }
        // }, function (res) {
        //   if (res.err_msg == "shareToExternalChat:ok") {
        //     self.wxShareSuccess({
        //       data: wxData,
        //       type: 'friend',
        //       successCallback: params.successCallback
        //     })
        //   }
        // })
        // wx.invoke('shareToExternalContact', {
        //   title: wxData.title,
        //   desc: wxData.desc,
        //   link: wxshareurl,
        //   imgUrl: wxData.photo,
        //   success: function (res) {
        //   }
        // }, function (res) {
        //   if (res.err_msg == "shareToExternalContact:ok") {
        //     self.wxShareSuccess({
        //       data: wxData,
        //       type: 'friend',
        //       successCallback: params.successCallback
        //     })
        //   }
        // })
        wx.shareToExternalChat({
          title: wxData.title,
          desc: wxData.desc,
          link: wxshareurl,
          imgUrl: wxData.photo,
          success: function (res) {
            if (res.err_msg == "shareToExternalChat:ok") {
              self.wxShareSuccess({
                data: wxData,
                type: 'friend',
                successCallback: params.successCallback
              })
            }
          }
        })
        wx.shareToExternalContact({
          title: wxData.title,
          desc: wxData.desc,
          link: wxshareurl,
          imgUrl: wxData.photo,
          success: function (res) {
            if (res.err_msg == "shareToExternalContact:ok") {
              self.wxShareSuccess({
                data: wxData,
                type: 'friend',
                successCallback: params.successCallback
              })
            }
          }
        })
      })
    },
    handleWxShare: function (os) {
      const self = this
      let data = os.data
      let sharetitle = os.title
      let sharedesc = os.desc
      let sharephoto = os.photo
      if (data) {
        sharetitle = (data.seotitle && self.trim(data.seotitle) !== '') ? data.seotitle : data.title
        sharedesc = data.title
        if (data.seodescription && self.trim(data.seodescription) !== '') {
          sharedesc = data.seodescription
        } else if (data.summary && self.trim(data.summary) !== '') {
          sharedesc = data.summary
        } else if (data.seotitle && self.trim(data.seotitle) !== '') {
          sharedesc = data.seotitle
        }
        sharephoto = data.photo
        let photoarr = []
        if (data.photo && self.trim(data.photo) !== '') {
          photoarr = data.photo.split(',')
        } else if (data.contentphoto && self.trim(data.contentphoto) !== '') {
          photoarr = data.contentphoto.split(',')
        }
        if (photoarr.length > 0) {
          sharephoto = photoarr[0]
        }
      }
      sharephoto = self.getPhoto(sharephoto)
      let wxData = {
        module: os.module,
        moduleid: os.moduleid,
        title: sharetitle,
        desc: sharedesc,
        link: os.link,
        photo: sharephoto
      }
      if (os.lastshareuid) {
        wxData.lastshareuid = os.lastshareuid
      }
      self.wxShare({
        data: wxData,
        successCallback: function (data) {
          if (data.flag === 1) {
            os.successCallback && os.successCallback(data)
          } else {
            Vue.$vux.toast.show({
              text: data.error,
              type: 'warn',
              time: self.delay(data.error)
            })
          }
        }
      })
    },
    wxPreviewImage: function(viewId, texture) {
      const self = this
      const triggerView = document.querySelector(viewId)
      if (!triggerView) {
        console.error('node mounted error')
        return
      }
      triggerView.addEventListener('click', function(event) {
        let images
        if (texture) {
          images = document.querySelectorAll(`${viewId} ${texture}`)
        } else {
          images = document.querySelectorAll(`${viewId} .wx__img-preview`)
        }
        if (!images.length) return
        let urls = []
        for (let img of images) {
          urls.push(img.src)
        }
        const target = event.target
        if (target.nodeName.toLowerCase() === 'img') {
          for (let i = 0; i < images.length; i++) {
            const img = images[i]
            if (target.src === img.src) {
              let params = {current: target.src}
              if (!self.isAndroid()) {
                const current = urls.splice(i, 1)[0]
                urls.unshift(current)
                params.urls = urls
              }
              jweixin.previewImage(params)
              break
            }
          }
        }
        return false
      }, false)
    },
    taskData: function (os) {
      let data = os.data
      const handleFunction = os.handleFunction
      if(data && data.length > 0) {
        const ascdesc = os.ascdesc ? os.ascdesc : "asc"
        const callback = os.callback
        let tasks = []
        const _serial = function () {
          if (tasks.length === 0) {
            callback && callback()
            return
          }
          const task = tasks[0]
          tasks.splice(0, 1)
          task(_serial)
        }
        if (ascdesc === 'asc') {
          for (let i = 0; i < data.length; i++) {
            tasks.push(handleFunction(data[i], i))
          }
        } else {
          for (let i = data.length - 1; i >= 0; i++) {
            tasks.push(handleFunction(data[i], i))
          }
        }
        _serial()
      }
    },
    wxUploadImage: function (os) {
      const self = this
      let maxnum = os.maxnum ? os.maxnum : 9
      jweixin.chooseImage({
        count: maxnum,
        success: function (res) {
          let localIds = res.localIds
          if(localIds.length > maxnum){
            localIds = localIds.slice(0, maxnum)
          }
          Vue.$vux.loading.show()
          let arr = localIds
          if (maxnum === 1) {
            arr = [ localIds ]
          }
          self.taskData({
            data: arr,
            callback: function () {
              Vue.$vux.loading.hide()
            },
            handleFunction: function (d) {
              return function (done) {
                jweixin.uploadImage({
                  localId: d.toString(),
                  isShowProgressTips: 0,
                  success: function (res1) {
                    Vue.http.post(`${ENV.BokaApi}/api/weixinUpload`, {
                      imgid: res1.serverId
                    }).then(function (res) {
                      if (res) {
                        let data = res.data
                        os.handleCallback && os.handleCallback(data)
                        done()
                      } else {
                        Vue.$vux.loading.hide()
                        Vue.$vux.toast.show({
                          text: '请求超时，请刷新重试'
                        })
                      }
                    })
                  },
                  fail: function (res2) {
                    Vue.$vux.toast.show({
                      text: '上传失败'
                    })
                    Vue.$vux.loading.hide()
                    done()
                  }
                })
              }
            }
          })
        },
        fail: function (r) {
        }
      })
    },
    deleteItem: function (list, id) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          list.splice(i, 1)
          break
        }
      }
    },
    deleteValue: function (list, val) {
      for (let i = 0; i < list.length; i++) {
        if (list[i] === val) {
          list.splice(i, 1)
          break
        }
      }
    },
    scrollEvent: (() => {
      let oScrollHeight = 0
      return (os) => {
        let _ele = os.element
        let scrollTop = _ele.scrollTop
        let scrollHeight = _ele.scrollHeight
        let height = _ele.offsetHeight;
        let distance = os.distance ? os.distance : 50
        if (typeof distance === 'string' && distance.indexOf('%') >= 0) {
          distance = parseInt(distance, 10) / 100 * height
        }
        if (distance > height) {
          distance = height
        }
        // if ((scrollTop + height >= scrollHeight - distance) && (oScrollHeight != scrollHeight)) { // 后退到页面，滚动事件不执行了，oScrollHeight和scrollHeight值一直相同
        if ((scrollTop + height >= scrollHeight - distance)) {
          os.callback && os.callback()
          oScrollHeight = scrollHeight
        }
      }
		})(),
    getDateState: function (dt) {
      let newtime = new Time(dt * 1000)
      let year = newtime.year()
      let month = newtime.month()
      let date = newtime.date()
      let nowtime = new Time(new Date())
      let nowyear = nowtime.year()
      let nowmonth = nowtime.month()
      let nowdate = nowtime.date()
      let state = ''
      if (year === nowyear && month === nowmonth) {
        if (date === nowdate) {
          state = '今'
        } else if (date + 1 === nowdate) {
          state = '昨'
        } else if (date + 2 === nowdate) {
          state = '前'
        }
      }
      return state
    },
    getDateClass: function (dt) {
      const self = this
      let state = self.getDateState(dt)
      let ret = 'datestate '
      if (state !== '') {
        if (state === '今') {
          ret += 'today'
        } else if (state === '昨') {
          ret += 'yesterday'
        } else if (state === '前') {
          ret += ''
        } else {
          ret += 'hide'
        }
      } else {
        ret += 'hide'
      }
      return ret
    },
    getHost: function (url) {
      if (!url) {
        url = location.href
      }
      url = url.replace(/\?from=singlemessage&isappinstalled=0/g,'')
      let index = url.indexOf('/#/')
      let ret = url.substr(0, index)
      return ret
    },
    previewerImgdata: function (arr) {
      let ret = []
      for (let i = 0; i < arr.length; i++) {
        let p = arr[i]
        ret.push({
          msrc: p,
          src: p,
          w: 300,
          h: 300
        })
      }
      return ret
    },
    setPhoto: function (src) {
      return src.replace(/,/g, '||')
    },
    getPhoto: function (src) {
      if (!src) {
        return ''
      }
      let arr = src.split(',')
      if (arr.length > 0) {
        src = arr[0]
      }
      return src.replace(/\|\|/g, ',')
    },
    miniPost: function (pageData) {
      jweixin.miniProgram.getEnv(res => {
        if (res.miniprogram) {
          jweixin.miniProgram.postMessage({data: {token: Token.get(), pageData: pageData}})
        }
      })
    },
    handleFrame: function (area) {
      const self = this
      area.each(function () {
        const curFrame = jQuery(this)
        let dataSrc = curFrame.attr('data-src')
        const clientWidth = document.body.clientWidth - 30
        if (!dataSrc) {
          dataSrc = curFrame.attr('src')
        }
        if (dataSrc) {
          let srcQuery = self.query(dataSrc)
          let frameWidth = srcQuery.width
          let frameHeight = srcQuery.height
          if (!frameWidth) {
            frameWidth = curFrame.attr('width')
          }
          if (!frameHeight) {
            frameHeight = curFrame.attr('height')
          }
          if (frameWidth && frameHeight && frameWidth > clientWidth) {
            const disWidth = clientWidth
            const disHeight = clientWidth * frameHeight / frameWidth
            curFrame.removeAttr('width')
            curFrame.removeAttr('height')
            srcQuery.width = disWidth
            srcQuery.height = disHeight
            let arr = []
            for (let key in srcQuery) {
              arr.push(`${key}=${srcQuery[key]}`)
            }
            const arrStr = arr.join('&')
            let url = dataSrc.substr(0, dataSrc.indexOf('?'))
            dataSrc = `${url}?${arrStr}`
            curFrame.removeAttr('data-src')
            curFrame.css({
              width: disWidth,
              height: disHeight
            })
          }
          curFrame.attr('src', dataSrc)
        }
      })
    },
    handleAppParams: function (query, params) {
      let arr = ['from', 'appid', 'minibackurl', 'backtype', 'control', 'miniconfig', 'fromapp', 'allowfirst', 'share_uid']
      for (let i = 0; i < arr.length; i++) {
        let pname = arr[i]
        if (query[pname]) {
          params[pname] = query[pname]
        }
      }
      return params
    },
    getSystemParams: (callback) => {
      // Vue.http.post(`${ENV.BokaApi}/api/common/getSysParas`).then(res => {
      //   const data = res.data
      //   const retdata = data.data ? data.data : data
      //   SystemParams.set(retdata)
      //   callback && callback()
      // })
    },
    remindQrcode: (wid) => {
      Vue.http.post(`${ENV.BokaApi}/api/retailer/remindQrCode`, {
        wid: wid
      })
    },
    wxAddress: (callback) => {
      jweixin.openAddress({
        success: res => {
          // alert('22' + JSON.stringify(res))
          if (res.errMsg === 'openAddress:ok') {
            let postData = {isdefault: 1}
            postData.province = res.provinceName
            postData.city = (res.provinceName !== res.cityName) ? res.cityName : ''
            postData.counties = res.countryName
            postData.address = res.detailInfo
            postData.linkman = res.userName
            postData.telephone = res.telNumber
            Vue.http.post(`${ENV.BokaApi}/api/user/address/add`, postData).then(res1 => {
              const data1 = res1.data
              if (callback) {
                let newData = postData
                if (data1.flag) {
                  newData = data1.data
                }
                newData.fulladdress = `${postData.province}${postData.city}${postData.counties}${postData.address}`
                callback(res1.data, newData)
              }
            })
          }
        },
        fail: res => {
          // alert('11' + JSON.stringify(res))
          Vue.toast.show({
            text: '微信地址获取失败'
          })
        }
      })
    },
    routerMiniUrl: (query) => {
      let minibackurl = decodeURIComponent(query.minibackurl)
      if (query.backtype === 'relaunch') {
        jweixin.miniProgram.reLaunch({url: `${minibackurl}`})
      } else if (query.backtype === 'redirect') {
        jweixin.miniProgram.redirectTo({url: `${minibackurl}`})
      } else {
        jweixin.miniProgram.navigateTo({url: `${minibackurl}`})
      }
    }
  }
}

export default Util
