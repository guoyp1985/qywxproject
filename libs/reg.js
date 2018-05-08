const Reg = {
  rSpace: /\s/g,
  rNoSpace: /\S/g,
  rHas: /.+/,
  rUserName: /[\u4e00-\u9fa5\w]{2,16}/,
  rEmail: /^\w+@\w+\.\w+$/,
  rPassword: /.{6,18}/,
  rPlatfrom: /(?:Android|iPhone|SymbianOS|Windows Phone|iPad|Pod)/,
  rAndroid: /Android/i
}

export default Reg
