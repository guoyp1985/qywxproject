const rPlatfrom = /(?:Android|iPhone|SymbianOS|Windows Phone|iPad|Pod)/
const Login = {
  access: (request, response, authorization, next) => {
    const isPC = Login.decidePC()
    if (response.status === 401) {
      authorization(isPC)
    } else {
      next()
    }
  },
  decidePC: () => {
    const userAgentInfo = navigator.userAgent
    if (rPlatfrom.test(userAgentInfo)) {
      return false
    }
    return true
  }
}

export default Login
