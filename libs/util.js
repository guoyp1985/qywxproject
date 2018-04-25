import Vue from 'vue'
import Reg from './reg'
import ENV from './env'
import SHA1 from 'js-sha1'
import Base64 from './base64'
const Util = {}
Util.install = function (Vue, options) {
  Vue.prototype.$util = {
    // 去空格
    trim: (str) => str.replace(Reg.rSpace, ''),
    // 判空
    isNull: function (str) {
      return !Reg.rNoSpace.test(this.trim(str))
    },
    // 判终端
    isPC: function () {
      const userAgentInfo = navigator.userAgent
      if (Reg.rPlatfrom.test(userAgentInfo)) {
        return false
      }
      return true
    },
    // 判授权
    access: function (request, response, authorization, next) {
      const isPC = this.isPC()
      if (response.status === 401) {
        authorization(isPC)
      } else {
        next()
      }
    },
    validate: (model, reg, failHandle) => {
      let re = null
      let stop = null
      reg = typeof reg === 'string' ? new RegExp(reg) : reg
      if (reg && model) {
        re = reg.test(model.value)
      }
      return re ? re : (stop = failHandle(model))
    },
    validateQueue: function (maps, failHandle) {
      let re = true
      failHandle = failHandle ? failHandle : () => false
      for(let i in maps) {
        const k = i
        const v = maps[i]
        let rs = this.validate({key: k, value: v}, Reg.rHas, failHandle)
        !rs && (re = false)
        if (rs === false) return false
      }
      return re;
    },
    deleteItem: function (list, id) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          list.splice(i, 1)
          break
        }
      }
    },
    checkMobile : function(mobile) {
      if (isNaN(mobile)) return false;
      if (!mobile || mobile=="" || mobile.length!=11) {
      	return false;
      }
      if (/^13\d{9}$/g.test(mobile) || (/^15[0-35-9]\d{8}$/g.test(mobile)) || (/^18[012345-9]\d{8}$/g.test(mobile)) || (/^17[06578]\d{8}$/g.test(mobile)) || (/^16[6]\d{8}$/g.test(mobile)) || (/^19[89]\d{8}$/g.test(mobile)) || (/^14[57]\d{8}$/g.test(mobile))) {
      	return true;
      }
      return false;
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
    wxShare: function() {
      console.log(this)
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
    query : (url) => {
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
    shareSuccess: (options) => {
      let wxData = options.data
      Vue.http.get(`${ENV.BokaApi}/api/credit`,{
        params: {
          do: 'add',
          type: options.type,
          shareurl:wxData.link,
          title:Base64.encode(wxData.title)
        }
      }).then(function (res) {
        return res.json()
      }).then(function (data) {
        options.wxData.successCallback && options.wxData.successCallback(data);
      })
    },
    share: function (options) {
      const self = this
      let wxData = options.data
      let isUpdate = false
      Vue.http.get(`${ENV.BokaApi}/api/jsconfig`,
        { params: { url: encodeURIComponent(location.href) } }
      ).then(function (res) {
        return res.json()
      }).then(function (data) {
        Vue.wechat.config(data)
        Vue.wechat.error(function () {
          //alert("微信还没有准备好，请刷新页面");
        });
        Vue.wechat.ready(function () {
          options.readyCallback && options.readyCallback()
          Vue.wechat.showMenuItems({
            menuList: [
              'menuItem:profile',
              'menuItem:addContact'
            ]
          });
          Vue.wechat.hideMenuItems({
            menuList: [
              'menuItem:exposeArticle',
              'menuItem:setFont',
              'menuItem:readMode',
              'menuItem:share:qq',
              'menuItem:share:QZone',
              'menuItem:share:weiboApp',
              'menuItem:share:facebook'
            ]
          });
          let wxshareurl = wxData.link
          let query = self.query(wxshareurl)
          if (query.openid) {
              wxshareurl = wxshareurl.replace(`&openid=${query.openid}`, '').replace(`openid=${query.openid}`, '')
          }
          Vue.wechat.checkJsApi({
            jsApiList: ['onMenuShareAppMessage'],
            success: function(res) {
              if (!res.checkResult.onMenuShareAppMessage) {
                isUpdate = true
              }
            }
          })
          Vue.wechat.onMenuShareAppMessage({
            title: wxData.title,
            desc: wxData.desc,
            link: wxshareurl,
            imgUrl: wxData.photo,
            type: wxData.type,
            dataUrl:wxData.dataUrl,
            trigger: function (res) {
              //分享之前执行
              //	alert('用户点击发送给朋友');
              options.beforeShare && options.beforeShare()
              if (wxData.desc == "undefined" || wxData.desc == undefined) {
                alert("微信还没准备好分享，请稍后再试");
              }
              if (res.shareTo == "favorite") {
                Util.shareSuccess({
                  data: wxData,
                  type: 'favorite'
                })
              }
            },
            success: function (resp) {
              if (isUpdate) {
                alert("微信版本太低，请先升级微信客户端!")
              }
              Util.shareSuccess({
                data: wxData,
                type: 'friend'
              })
            },
            cancel: function (resp) {
              Util.shareSuccess({
                data: wxData,
                type: 'friend'
              })
            }
          })
          Vue.wechat.onMenuShareTimeline({
            title: wxData.timelineTitle,
            link: wxshareurl,
            imgUrl: wxData.photo,
            trigger: function (res) {
              //分享之前执行
              //	alert('用户点击发送给朋友');
              options.beforeShare && options.beforeShare()
              if (wxData.desc === "undefined" || wxData.desc === undefined) {
                alert("微信还没准备好分享，请稍后再试");
              }
            },
            success: function (resp) {
              Util.shareSuccess({
                data: wxData,
                type: 'timeline'
              })
            },
            cancel: function (resp) {
              Util.shareSuccess({
                data: wxData,
                type: 'timeline'
              })
            }
          })
          Vue.wechat.onMenuShareQQ({
            title: wxData.title,
            desc: wxData.desc,
            link: wxshareurl,
            imgUrl: wxData.photo,
            trigger: function (res) {
              //分享之前执行
              //	alert('用户点击发送给朋友');
              options.beforeShare && options.beforeShare()
              if (wxData.desc === "undefined" || wxData.desc === undefined) {
                alert("微信还没准备好分享，请稍后再试");
              }
            },
            success: function (resp) {
              Util.shareSuccess({
                data: wxData,
                type: 'qq'
              })
            },
            cancel: function (resp) {
              Util.shareSuccess({
                data: wxData,
                type: 'qq'
              })
            }
          })
        })
      })
    },
    wxShare: function () {
    },
    deleteItem: function (list, id) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          list.splice(i, 1)
          break
        }
      }
    },
    scrollEvent : function(os){
      let _ele = os.element
      let scrollTop = _ele.scrollTop
      let scrollHeight = _ele.scrollHeight
			let height = _ele.offsetHeight;
      let distance = os.distance ? os.distance : 50
      if (typeof distance === 'string' && distance.indexOf('%') >= 0) {
				distance = parseInt(distance, 10) / 100 * height;
			}
			if (distance > height){
        distance = height
      }
			if (scrollTop + height >= scrollHeight - distance) {
				os.callback && os.callback()
			}
		}
  }
}

export default Util
