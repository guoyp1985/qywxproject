import Vue from 'vue'
import Time from './time'
let switcher = true
let time = null
const Voice = {
  wxVoiceRecord: function (callback) {
    if (!switcher) return
    switcher = false
    time = new Time()
    Vue.wechat.startRecord()
    Vue.wechat.onVoiceRecordEnd({
      complete: function (res) {
        switcher = true
        res.time = '60"'
        // const localId = res.localId
        callback && callback(res)
      }
    })
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
      isShowProgressTips: 1,
      success: function (res) {
        const serverId = res.serverId
        callback && callback(serverId)
      }
    })
  },
  wxVoiceDownload: function (id, callback) {
    Vue.wechat.downloadVoice({
      serverId: id,
      isShowProgressTips: 1,
      success: function (res) {
        const localId = res.localId
        callback && callback(localId)
      }
    })
  },
  wxVoicePlay: function (id, callback) {
    Vue.wechat.playVoice({ localId: id })
    Vue.wechat.onVoicePlayEnd({
      success: function (res) {
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
  voiceRecord: function (callback) {
    Voice.wxVoiceRecord(res => {
      Voice.wxVoiceUpload(res, callback)
    })
  },
  voiceRecordStop: function(callback) {
    Voice.wxVoiceRecordStop(res => {
      Voice.wxVoiceUpload(res, callback)
    })
  },
  voicePlay: function (sid) {
    Voice.wxVoiceDownload(sid, lid => {
      Voice.wxVoicePlay(lid)
    })
  },
  voicePlayStop: function (lid) {
    Voice.wxVoiceStop(lid)
  }
}

export default Voice
