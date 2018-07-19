const Token = {
  set (token) {
    if (!token) return
    localStorage.setItem('token', JSON.stringify(token))
  },
  get () {
    return JSON.parse(localStorage.getItem('token'))
  },
  remove () {
    const token = Token.get()
    if (token) {
      localStorage.removeItem('token')
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

export { Token, OpenId, WxQrCode, User, Access, WxAccess, Roomid, Version }
