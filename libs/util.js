import Reg from './reg'
import ENV from './env'
import SHA1 from 'js-sha1'
const Util = {}
Util.install = function (Vue, options) {
  Vue.prototype.$util = {
    trim: (str) => str.replace(Reg.rSpace, ''),
    isNull: (str) => !Reg.rNoSpace.test(Util.trim(str)),
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
    }
  }
}

export default Util
