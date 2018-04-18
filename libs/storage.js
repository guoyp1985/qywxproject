const hourMills = 3600000
const Token = {
  set (token) {
    localStorage.setItem('token', token)
    localStorage.setItem('tokenExpried', new Date().getTime() + hourMills)
  },
  get () {
    return localStorage.getItem('token')
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
export { Token, OpenId, WxQrCode }
