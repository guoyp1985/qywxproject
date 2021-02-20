var ENV = {
  Version: '1.0.0',
  AppId: 'ww1f2b286b9ed5b8c0',
  Agentid: '1000012',
  WxAuthUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?',
  WxQrcodeAuthUrl: 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?',
  Host: 'http://qywx.bsa.cn',
  BokaApi: 'https://qy.boka.cn',
  WeixinName: '博卡授权中心', //vue: 博卡授权中心 // vux: 共销汇
  AdminUrl: 'https://qy.boka.cn/admin/loginFromBsa',
  FactoryApi: 'https://factorydev.boka.cn',
  ApiVersion: 'V2',
  ApiAccept: 'application/vnd.factorydev.v2+json',
  DebugMode: true,
  DebugList: [
    // {uid: 1, name: '党卫东'},
    // {uid: 3821, name: '党大王'},
    // {uid: 4903, name: 'gyp'},
    // {uid: 8, name: 'young'},
    // {uid: 115800, name: '风偏'},
    // {uid: 16, name: '余鹏'},
    // {uid: 27531, name: '戴飞'},
    // {uid: 24675, name: '兰花草'},
    // {uid: 1694},
    // {uid: 65231},
    // {uid: 99756},
    // {uid: 39854},
    // {uid: 25421},
    // {uid: 98466}
  ]
}

ENV.NoAccessUrls = [
  ENV.BokaApi + '/api/visitor/workUserAuth',
  ENV.BokaApi + '/api/content_n/info'
]
