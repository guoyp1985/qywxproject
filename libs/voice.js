import Vue from 'vue'
import Time from './time'
let switcher = true
let time = null
const Voice = {
  wxVoiceRecord: function (callback) {
    if (!switcher) return
    switcher = false
    time = new Time()
    Vue.wechat.onVoiceRecordEnd({
      complete: function (res) {
        switcher = true
        res.time = '60"'
        // const localId = res.localId
        callback && callback(res)
      }
    })
    Vue.wechat.startRecord()
  },
  wxVoiceRecordStop: function (callback) {
    Vue.wechat.stopRecord({
      success: function (res) {
        switcher = true
        res.time = time.counter(time.time())
        // const localId = res.localId
        callback && callback(res)
      }
    })
  },
  wxVoiceUpload: function (data, callback) {
    Vue.wechat.uploadVoice({
      localId: data.localId,
      isShowProgressTips: 0,
      success: function (res) {
        res.time = data.time
        callback && callback(res)
      }
    })
  },
  wxVoiceDownload: function (id, callback) {
    Vue.wechat.downloadVoice({
      serverId: id,
      isShowProgressTips: 0,
      success: function (res) {
        const localId = res.localId
        callback && callback(localId)
      }
    })
  },
  wxVoicePlay: function (id, callback) {
    Vue.wechat.playVoice({ localId: id })
    Vue.wechat.onVoicePlayEnd({
      complete: function (res) {
        console.log('end')
        const localId = res.localId
        callback && callback(localId)
      }
    })
  },
  wxVoicePause: function (id) {
    Vue.wechat.pauseVoice({ localId: id })
  },
  wxVoiceStop: function (id) {
    Vue.wechat.stopVoice({ localId: id })
  },
  record: function (callback) {
    Voice.wxVoiceRecord(res => {
      Voice.wxVoiceUpload(res, callback)
    })
  },
  recordStop: function(callback) {
    Voice.wxVoiceRecordStop(res => {
      Voice.wxVoiceUpload(res, callback)
    })
  },
  play: function (sid, callback, stop) {
    Voice.wxVoiceDownload(sid, lid => {
      callback && callback(lid)
      Voice.wxVoicePlay(lid, stop)
    })
  },
  playStop: function (lid) {
    Voice.wxVoiceStop(lid)
  }
}

export default Voice
