const Reg = {
  rSpace: /\s/g,
  rNoSpace: /\S/g,
  rHas: /.+/,
  rUserName: /[\u4e00-\u9fa5\w]{2,16}/,
  rEmail: /^\w+@\w+\.\w+$/,
  rPassword: /.{6,18}/,
  rPhone: /(^:13\d{9})|(^:14[57]\d{8})|(^:15[0-35-9]\d{8})|(^:16[6]\d{8})|(^:17[06578]\d{8})|(^:18[012345-9]\d{8})|(^:19[89]\d{8})/,
  rPlatfrom: /(?:Android|iPhone|SymbianOS|Windows Phone|iPad|Pod)/,
  rAndroid: /Android/i
}

export default Reg
