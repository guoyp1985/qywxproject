const Token = {
  set (token) {
    if (!token) return
    localStorage.setItem('utoken', JSON.stringify(token))
  },
  get () {
    return JSON.parse(localStorage.getItem('utoken'))
  },
  remove () {
    const token = Token.get()
    if (token) {
      localStorage.removeItem('utoken')
    }
  },
  isExpired () {
    const token = Token.get()
    if (token) {
      const expired = new Date(token.expired_at).getTime()
      const now = new Date().getTime()
      return now > expired
    }
    return false
  }
}
const OpenId = {
  set (openId) {
    localStorage.setItem('openId', openId)
  },
  get () {
    return localStorage.getItem('openId')
  }
}
const WxQrCode = {
  set (wxQrCode) {
    localStorage.setItem('wxQrCode', wxQrCode)
  },
  get () {
    return localStorage.getItem('wxQrCode')
  }
}
const User = {
  set (user) {
    localStorage.setItem('user', JSON.stringify(user))
  },
  get () {
    if (localStorage.getItem('user') === 'undefined') {
      return null
    }
    return JSON.parse(localStorage.getItem('user'))
  },
  remove () {
    const user = User.get()
    if (user) {
      localStorage.removeItem('user')
    }
  }
}
const Access = {
  set (access) {
    localStorage.setItem('access', access)
  },
  get () {
    return localStorage.getItem('access')
  },
  remove () {
    const access = Access.get()
    if (access) {
      localStorage.removeItem('access')
    }
  }
}
const Roomid = {
  set (roomid) {
    localStorage.setItem('roomid', roomid)
  },
  get () {
    return localStorage.getItem('roomid')
  }
}
const WxAccess = {
  set (access) {
    localStorage.setItem('wxAccess', access)
  },
  get () {
    const res = localStorage.getItem('wxAccess')
    return (res === null || res === 'false') ? false : true
  },
  remove () {
    const access = WxAccess.get()
    if (access) {
      localStorage.removeItem('wxAccess')
    }
  }
}
const Version = {
  set (version) {
    localStorage.setItem('version', version)
  },
  get () {
    return localStorage.getItem('version')
  },
  remove () {
    const version = Version.get()
    if (version) {
      localStorage.removeItem('version')
    }
  }
}
const VoiceAccess = {
  set (access) {
    localStorage.setItem('voiceAccess', access)
  },
  get () {
    const res = localStorage.getItem('voiceAccess')
    return (res === null || res === 'false') ? false : true
  },
  remove () {
    const access = VoiceAccess.get()
    if (access) {
      localStorage.removeItem('voiceAccess')
    }
  }
}
const MiniApp = {
  setAppId (val) {
    localStorage.setItem('miniAppId', val)
  },
  getAppId () {
    return localStorage.getItem('miniAppId')
  },
  removeAppId () {
    const data = MiniApp.getAppId()
    if (data) {
      localStorage.removeItem('miniAppId')
    }
  },
  setOpenId (val) {
    localStorage.setItem('miniOpenId', val)
  },
  getOpenId (val) {
    return localStorage.getItem('miniOpenId')
  },
  removeOpenId () {
    const data = MiniApp.getOpenId()
    if (data) {
      localStorage.removeItem('miniOpenId')
    }
  }
}
const FirstInfo = {
  set (info) {
    localStorage.setItem('FirstInfo', JSON.stringify(info))
  },
  get () {
    if (localStorage.getItem('FirstInfo') === 'undefined') {
      return null
    }
    return JSON.parse(localStorage.getItem('FirstInfo'))
  },
  remove () {
    const info = FirstInfo.get()
    if (info) {
      localStorage.removeItem('FirstInfo')
    }
  }
}
const SystemParams = {
  set (info) {
    localStorage.setItem('SystemParams', JSON.stringify(info))
  },
  get () {
    if (localStorage.getItem('SystemParams') === 'undefined') {
      return null
    }
    return JSON.parse(localStorage.getItem('SystemParams'))
  },
  remove () {
    const info = SystemParams.get()
    if (info) {
      localStorage.removeItem('SystemParams')
    }
  }
}

let __height = 0
const AdapterHeight = {
  set (height) {
    __height = height
  },
  get () {
    return __height
  }
}

export { Token, OpenId, WxQrCode, User, Access, WxAccess, Roomid, Version, VoiceAccess, MiniApp, AdapterHeight, FirstInfo, SystemParams }
