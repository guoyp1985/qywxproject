<<<<<<< HEAD
=======
// expired_at: "2018-04-24 11:09:03"
// refresh_expired_at: "2018-06-23 11:09:03"
// token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbGFyYXZlbC5ib2thLmNuL2FwaS9zY2FubG9naW4vMTUyMzY3NTMzMCIsImlhdCI6MTUyMzY3NTM0MywiZXhwIjoxNTI0NTM5MzQzLCJuYmYiOjE1MjM2NzUzNDMsImp0aSI6ImNPaHVlM0hzZkJsa245dFIiLCJzdWIiOjQsInBydiI6Ijg2NjVhZTk3NzVjZjI2ZjZiOGU0OTZmODZmYTUzNmQ2OGRkNzE4MTgifQ.WRmg0lR5egNmGToUNhVhq7GP_ozuJNXgoH8Z9zZ_p3Y"
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
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
<<<<<<< HEAD
const WxQrCode = {
  set (wxQrCode) {
    localStorage.setItem('wxQrCode', wxQrCode)
  },
  get () {
    return localStorage.getItem('wxQrCode')
  }
}
export { Token, OpenId, WxQrCode }
=======
const AppId = 'wx1e72f0c45242a94e'
export { Token, OpenId }
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
