import Vue from 'vue'
let switcher = true
const Voice = {
  wxVoiceRecord: function (callback) {
    if (!switcher) return
    switcher = false
    Vue.wechat.startRecord()
    Vue.wechat.onVoiceRecordEnd({
      complete: function (res) {
        switcher = true
        const localId = res.localId
        callback && callback(localId)
      }
    })
  },
  wxVoiceRecordStop: function (callback) {
    Vue.wechat.stopRecord({
      success: function (res) {
        switcher = true
        const localId = res.localId
        callback && callback(localId)
      }
    })
  },
  wxVoiceUpload: function (id, callback) {
    Vue.wechat.uploadVoice({
      localId: id,
      isShowProgressTips: 0,
      success: function (res) {
        const serverId = res.serverId
        callback && callback(serverId)
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
    Voice.wxVoiceRecord(lid => {
      Voice.wxVoiceUpload(lid, callback)
    })
  },
  voiceRecordStop: function() {
    Voice.wxVoiceRecordStop(lid => {
      Voice.wxVoiceUpload(lid)
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
