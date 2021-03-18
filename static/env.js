var ENV = {
  Version: '1.0.2',
  AppId: 'ww1f2b286b9ed5b8c0',
  Agentid: '1000012',
  WxAuthUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?',
  WxQrcodeAuthUrl: 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?',
  Host: 'http://qywx.bsa.cn',
  BokaApi: 'https://qy.boka.cn',
  WeixinName: '博卡供销社',
  AdminUrl: 'https://qy.boka.cn/admin/loginFromBsa',
  DebugMode: true,
  DebugList: [
  ],
  isKaifa: false
}

ENV.NoAccessUrls = [
  ENV.BokaApi + '/api/visitor/workUserAuth',
  ENV.BokaApi + '/api/content_n/info'
]
