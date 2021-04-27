var ENV = {
  Version: '1.0.2',
  AppId: 'ww1f2b286b9ed5b8c0',
  Agentid: '1000012',
  AppGhId: 'gh_b5532144f48c', // 小程序原始id
  WxAuthUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?',
  WxQrcodeAuthUrl: 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?',
  Host: 'http://qywx.bsa.cn',
  BokaApi: 'https://qy.boka.cn',
  WeixinName: '博卡供销社',
  AdminUrl: 'https://qy.boka.cn/admin/loginFromBsa',
  DebugMode: true,
  DebugList: [
  ],
  isKaifa: true,
  MiniPage: {
    store: '/pages/qyshop',
    order: '/packageD/pages/userOrders',
    center: '/pages/own',
    storeActivity: '/package/pages/storeActivity',
    gift: '/packageD/pages/cardList'
  },
  MiniStorePage: '/pages/qyshop',
  MiniOrderPage: '/packageD/pages/userOrders',
  MiniCenterPage: '/pages/own'
}

ENV.NoAccessUrls = [
  ENV.BokaApi + '/api/visitor/workUserAuth',
  ENV.BokaApi + '/api/content_n/info'
]
