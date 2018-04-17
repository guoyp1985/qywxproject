import Reg from './reg'
const Util = {
  trim: (str) => str.replace(Reg.rSpace, ''),
  isNull: (str) => !Reg.rNoSpace.test(Util.trim(str)),
  delay: (text) => {
    let ret = 1000
    let len = text.length
    if (len > 0) {
      ret = len * 200
      if (ret < 1000) {
        ret = 1000
      } else if (ret > 600000) {
        ret = 600000
      }
    }
    return ret
  }
}

export default Util
