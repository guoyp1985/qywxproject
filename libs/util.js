import Reg from './reg'
const Util = {
  trim: (str) => str.replace(Reg.rSpace, ''),
  isNull: (str) => !Reg.rNoSpace.test(Util.trim(str)),
  validate: (model, reg, failHandle) => {
    let re = null
    let stop = null
    reg = typeof reg === 'string' ? new RegExp(reg) : reg
    if (reg && model) {
      re = reg.test(model.value)
    }
    return re ? re : (stop = failHandle(model))
  },
  validateQueue: (maps, failHandle) => {
    let re = true
    failHandle = failHandle ? failHandle : () => false
    for(let i in maps) {
      const k = i
      const v = maps[i]
      let rs = Util.validate({key: k, value: v}, Reg.rHas, failHandle)
      !rs && (re = false)
      if (rs === false) return false
    }
    return re;
<<<<<<< HEAD
  },
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
=======
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
  }
}
export default Util
