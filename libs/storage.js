const hourMills = 3600000
const Token = {
  set (token) {
    localStorage.setItem('token', token)
    localStorage.setItem('tokenExpried', new Date().getTime() + hourMills)
  },
  get () {
    return localStorage.getItem('token')
  },
  remove () {
    localStorage.removeItem('token')
  },
  isExpried (time) {
    const tokenExpried = localStorage.getItem('tokenExpried')
    return Number(tokenExpried) > new Date().getTime() ? false : true
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
    localStorage.removeItem('user')
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
    localStorage.removeItem('access')
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
    localStorage.removeItem('wxAccess')
  }
}

export { Token, OpenId, WxQrCode, User, Access, WxAccess, Roomid }
