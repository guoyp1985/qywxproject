var ENV = {
  AppId: 'wxd50f3623bec2f5b5', // vux:'wx1e72f0c45242a94e' // vue: 'wxd50f3623bec2f5b5'
  // AppSecret: 'f22214afc8a01ec9a769bd0ba8551c48',
  FeedChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  WxAuthUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?',
  WxOAuthUrl: 'https://api.weixin.qq.com/sns/oauth2/access_token?',
  Host: 'http://vue.boka.cn', // vue: http://vue.boka.cn // vux: http://vux.boka.cn
  BokaApi: 'https://laravel.boka.cn',//'http://laravel.boka.cn', // test: http://124.207.246.107 // vux: http://vuxserver.boka.cn
  SocketBokaApi: 'laravel.boka.cn',//'laravel.boka.cn', // test: 124.207.246.107 // vux: vuxserver.boka.cn
  BokaCDN: 'http://vue.boka.cn',
  WeixinQrcode: 'http://osslaravel.boka.cn/weixin_qrcode.jpg',//vue 博卡授权中心: 博卡授权中心 // vux 共销宝: 共销宝
  WeixinName: '博卡授权中心', //vue: 博卡授权中心 // vux: 共销宝
  OrderStatus: [
    {id: 0, status: '订单取消'},
    {id: 1, status: '已确认订单'},
    {id: 2, status: '待发货'},
    {id: 3, status: '已发货'},
    {id: 4, status: '已确认收货'},
    {id: 100, status: '已完成'}
  ],
  SocketApi: 'ws://124.207.246.109:7272'
}
