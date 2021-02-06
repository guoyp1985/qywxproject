import Vue from 'vue'
import Time from './time'
import { VoiceAccess } from './storage'

let switcher = true
let time = null
const Voice = {
  wxTestRecord: function() {
    jweixin.startRecord()
    jweixin.stopRecord()
  },
  wxVoiceRecord: function (callback) {
    if (!switcher) return
    switcher = false
    time = new Time()
    jweixin.startRecord()
    jweixin.onVoiceRecordEnd({
      complete: function (res) {
        switcher = true
        res.time = 60
        // const localId = res.localId
        callback && callback(res)
      }
    })
  },
  wxVoiceRecordStop: function (success, fail) {
    const seconds = time.secondsCounter(time.time())
    console.log(seconds)
    if (seconds < 1) {
      fail && fail()
      jweixin.stopRecord()
      return
    }
    jweixin.stopRecord({
      success: function (res) {
        switcher = true
        res.time = seconds
        // const localId = res.localId
        success && success(res)
      }
    })
  },
  wxVoiceUpload: function (data, callback) {
    jweixin.uploadVoice({
      localId: data.localId,
      isShowProgressTips: 0,
      success: function (res) {
        res.time = data.time
        callback && callback(res)
      }
    })
  },
  wxVoiceDownload: function (id, callback) {
    jweixin.downloadVoice({
      serverId: id,
      isShowProgressTips: 0,
      success: function (res) {
        const localId = res.localId
        callback && callback(localId)
      }
    })
  },
  wxVoicePlay: function (id, callback) {
    jweixin.playVoice({ localId: id })
    jweixin.onVoicePlayEnd({
      success: function (res) {
        const localId = res.localId
        callback && callback(localId)
      }
    })
  },
  wxVoicePause: function (id) {
    jweixin.pauseVoice({ localId: id })
  },
  wxVoiceStop: function (id) {
    jweixin.stopVoice({ localId: id })
  },
  record: function (callback) {
    Voice.wxVoiceRecord(res => {
      Voice.wxVoiceUpload(res, callback)
    })
  },
  recordStop: function(success, fail) {
    Voice.wxVoiceRecordStop(res => {
      Voice.wxVoiceUpload(res, success)
    }, fail)
  },
  play: function (sid, callback, stop) {
    Voice.wxVoiceDownload(sid, lid => {
      callback && callback(lid)
      Voice.wxVoicePlay(lid, stop)
    })
  },
  playStop: function (lid) {
    Voice.wxVoiceStop(lid)
  },
  recordCheck: function (success, fail) {
    jweixin.checkJsApi({
      jsApiList: ['startRecord'],
      success: (res) => {
        // alert(res.checkResult.startRecord)
        // const checkResult = JSON.parse(res.checkResult)
        if (res.checkResult.startRecord) {
          const access = VoiceAccess.get()
          if (!access) {
            Voice.wxTestRecord()
            VoiceAccess.set(true)
          }
          success && success(res.checkResult.startRecord)
        } else {
          VoiceAccess.remove()
          fail && fail()
        }
      }
    })
  }
}

export default Voice
