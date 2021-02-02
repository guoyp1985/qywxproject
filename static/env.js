var ENV = {
  Version: '2.0.0.21',
  AppId: 'ww1f2b286b9ed5b8c0',
  Agentid: '1000012',
  FeedChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  WxAuthUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?',
  WxQrcodeAuthUrl: 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?',
  Host: 'http://qywx.bsa.cn',
  BokaApi: 'https://qy.boka.cn',
  WeixinQrcode: 'https://osslaravel.boka.cn/weixin_qrcode.jpg',//vue 博卡授权中心: http://osslaravel.boka.cn/weixin_qrcode.jpg // vux 共销汇: http://vuxlaravel.boka.cn/weixin_qrcode.jpg
  WeixinName: '博卡授权中心', //vue: 博卡授权中心 // vux: 共销汇
  SocketBokaRoom: 'laravel.boka.cn',
  SocketServer: 'wss://chat.boka.cn/wss', //'wss://chat.boka.cn/wss', // vux: 'ws://123.206.77.217:7272', // vue: 'ws://124.207.246.109:7272'
  AdminUrl: 'http://laravelcms.boka.cn/admin/login/unionIdLogin',
  FactoryApi: 'https://factorydev.boka.cn',
  ApiVersion: 'V2',
  ApiAccept: 'application/vnd.factorydev.v2+json',
  showTestManager: true, //正式平台不需要添加 ,控制测试管理功能按钮
  OrderStatus: [
    {id: 0, status: '订单取消'},
    {id: 1, status: '已确认订单'},
    {id: 2, status: '待发货'},
    {id: 3, status: '已发货'},
    {id: 4, status: '已确认收货'},
    {id: 100, status: '已完成'}
  ],
  MiniRouter: {
    activity: '/packageB/pages/activity',
    contentsNews: '/package/pages/contentsNews',
    knowledgeList: '/package/pages/contentsKnowledge',
    news: '/packageB/pages/news',
    pay: '/packageB/pages/pay',
    product: '/packageB/pages/product',
    store: '/packageB/pages/store',
    addCard: '/packageA/pages/addCard',
    factoryAppProduct: '/pages/product',
    chat: '/pages/chat'
  },
  Emots: [
    '微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴',
    '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过',
    '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼',
    '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗',
    '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打',
    '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼',
    '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓',
    '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭',
    '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕',
    '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳',
    '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引',
    '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻',
    '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手',
    '激动', '街舞', '献吻', '左太极', '右太极'
  ],
  vipProduct: '免费版只能上传5件商品，开通VIP即可无限制上传更多商品哦！',
  vipNews: '免费版只能创建5篇文章，开通VIP即可无限制创建更多文章哦！',
  vipActivity: '免费版只能创建两个活动，开通VIP即可无限制创建更多活动哦！',
  vipSales: '免费版只能邀请两位返点客，开通VIP即可无限制邀请更多的返点客哦！',
  vipMemberView: '免费版不支持查看客户的浏览数据，开通VIP即可立即查看客户的浏览数据哦！',
  vipMemberShare: '免费版不支持查看客户的分享数据，开通VIP即可立即查看客户的分享数据哦！',
  vipMemberSale: '免费版不支持查看客户的订单数据，开通VIP即可立即查看客户的订单数据哦！',
  vipChat: '免费版不支持与客户联系，开通vip即可立即与客户联系哦！',
  openVipText: '立即开通',
  giveUpVipText: '放弃=错失良机',
  allowVipFee: true,
  UidArr: [1, 2, 9, 139, 1406],
  FactoryManagerUid: 9,
  SuggestFid: 2,
  AppHomePage: {
    default: '/pages/wymh',
    factory: '/pages/index',
    qxb: '/pages/wymh',
    wl: '/pages/index'
  },
  FactoryLoginUrl: 'http://laravelcms.boka.cn/admin/login/login?role=factory',
  RetailerLoginUrl: 'http://laravelcms.boka.cn/admin/login/login?role=retailer',
  AdminLoginUrl: 'http://laravelcms.boka.cn/admin/login/login?role=admin',
  AdminFactoryImg1: 'https://tossharingsales.boka.cn/images/vue_admin_factory1.png',
  AdminFactoryImg2: 'https://tossharingsales.boka.cn/images/vue_admin_factory2.png',
  CommissionFid: 97,
  KefuQrcode: 'https://tossharingsales.boka.cn/images/kefu_qrcode.jpg',
  KefuWxNo: 'sharingsales',
  AllowQuickService: true, // 控制显示【完成售后按钮】，正式平台不需要
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
  ],
  SourceFid: 39, // 货源商品的厂家ID
  IsKaifa: true
}

ENV.NoAccessUrls = [
  ENV.BokaApi + '/api/login/*',
  ENV.BokaApi + '/api/visitor/workUserAuth',
  ENV.BokaApi + '/api/qrcode/login*',
  ENV.BokaApi + '/api/scanlogin',
  ENV.BokaApi + '/api/withMiniLogin*'
]
