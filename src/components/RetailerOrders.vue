<template>
  <div class="containerarea s-havebottom bg-page">
    <div class="s-topbanner">
      <div class="row">
        <div class="bg"></div>
        <div class="flex_center h_100 toprow">
          <div class="flex_cell font18 pl20">{{$t('Order list')}}</div>
          <div class="pr10 align_right" style="width:100px;">
            <router-link class="qbtn color-white" style="border:#fff 1px solid;" to="/retailerAddorder">{{$t('Add order')}}</router-link>
          </div>
        </div>
      </div>
      <div class="row">
        <tab v-model="tabmodel" class="x-tab" active-color="#fff" default-color="#fff">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container">
      <swiper v-model="tabmodel" class="x-swiper no-indicator">
        <swiper-item v-for="(tabitem, index) in tabtxts" :key="index">
          <div v-if="(index == 0)">
            <div class="scroll_list">
              <Orderitemplate v-for="(item,index1) in orderdataall" :key="item.id">
                <span slot="createdate">{{ item.dateline | dateformat }}</span>
                <span slot="flagstr">{{ item.flagstr }}</span>
                <Orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id">
                  <img slot="photo" :src="product.photo" style="width:50px;height:50px;" />
                  <span slot="name">{{ product.name }}</span>
                  <span slot="special">{{ product.special }}</span>
                  <span slot="quantity" class="font12">{{ product.quantity }}</span>
                </Orderproductplate>
                <img slot="avatar" :src="item.avatar" class="avatarimg" />
                <span slot="username">{{ item.username }}</span>
                <div v-if="(item.seller && item.seller.length > 0)" slot="seller">
                  <div class="fr sellerarea">{{ $t('Rebate customer') }} <span>{{ item.seller.username }}</span></div>
                </div>
                <div slot="receivearea">
                  <div class="t-table pt5 color-gray font12 deliverarea">
                    <div class="t-cell middle-cell">
                      <div><span class="middle-cell mr10">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span><span class="ml10 v_middle">{{ item.telephone }}</span></div>
                      <div class="mt3">{{ item.address }}</div>
                    </div>
                    <div class="t-cell middle-cell appendcontrol align_right w80" v-if="item.flag == 2">
                      <div class="qbtn4 font12" style="padding:1px 8px;">{{ $t('Deliver goods') }}</div>
                    </div>
                    <div class="t-cell middle-cell appendcontrol align_right w80" v-if="item.flag == 3">
                      <a class="qbtn3 font12 " style="padding:1px 8px;">{{ $t('View deliver') }}</a>
                    </div>
                  </div>
                </div>
              </Orderitemplate>
            </div>
          </div>
          <div v-if="(index == 1)">
            <div class="scroll_list">
              <Orderitemplate v-for="(item,index1) in orderdata1" :key="item.id">
                <span slot="createdate">{{ item.dateline | dateformat }}</span>
                <span slot="flagstr">{{ item.flagstr }}</span>
                <Orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id">
                  <img slot="photo" :src="product.photo" style="width:50px;height:50px;" />
                  <span slot="name">{{ product.name }}</span>
                  <span slot="special">{{ product.special }}</span>
                  <span slot="quantity" class="font12">{{ product.quantity }}</span>
                </Orderproductplate>
                <img slot="avatar" :src="item.avatar" class="avatarimg" />
                <span slot="username">{{ item.username }}</span>
                <div v-if="(item.seller && item.seller.length > 0)" slot="seller">
                  <div class="fr sellerarea">{{ $t('Rebate customer') }} <span>{{ item.seller.username }}</span></div>
                </div>
                <div slot="receivearea">
                  <div class="t-table pt5 color-gray font12 deliverarea">
                    <div class="t-cell middle-cell">
                      <div><span class="middle-cell mr10">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span><span class="ml10 v_middle">{{ item.telephone }}</span></div>
                      <div class="mt3">{{ item.address }}</div>
                    </div>
                  </div>
                </div>
              </Orderitemplate>
            </div>
          </div>
          <div v-if="(index == 2)">
            <div class="scroll_list">
              <Orderitemplate v-for="(item,index1) in orderdata2" :key="item.id">
                <span slot="createdate">{{ item.dateline | dateformat }}</span>
                <span slot="flagstr">{{ item.flagstr }}</span>
                <Orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id">
                  <img slot="photo" :src="product.photo" style="width:50px;height:50px;" />
                  <span slot="name">{{ product.name }}</span>
                  <span slot="special">{{ product.special }}</span>
                  <span slot="quantity" class="font12">{{ product.quantity }}</span>
                </Orderproductplate>
                <img slot="avatar" :src="item.avatar" class="avatarimg" />
                <span slot="username">{{ item.username }}</span>
                <div v-if="(item.seller && item.seller.length > 0)" slot="seller">
                  <div class="fr sellerarea">{{ $t('Rebate customer') }} <span>{{ item.seller.username }}</span></div>
                </div>
                <div slot="receivearea">
                  <div class="t-table pt5 color-gray font12 deliverarea">
                    <div class="t-cell middle-cell">
                      <div><span class="middle-cell mr10">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span><span class="ml10 v_middle">{{ item.telephone }}</span></div>
                      <div class="mt3">{{ item.address }}</div>
                    </div>
                    <div class="t-cell middle-cell appendcontrol align_right w80">
                      <div class="qbtn4 font12" style="padding:1px 8px;">{{ $t('Deliver goods') }}</div>
                    </div>
                  </div>
                </div>
              </Orderitemplate>
            </div>
          </div>
          <div v-if="(index == 3)">
            <div class="scroll_list">
              <Orderitemplate v-for="(item,index1) in orderdata3" :key="item.id">
                <span slot="createdate">{{ item.dateline | dateformat }}</span>
                <span slot="flagstr">{{ item.flagstr }}</span>
                <Orderproductplate slot="productlist" v-for="(product,pindex) in item.orderlist" :key="product.id">
                  <img slot="photo" :src="product.photo" style="width:50px;height:50px;" />
                  <span slot="name">{{ product.name }}</span>
                  <span slot="special">{{ product.special }}</span>
                  <span slot="quantity" class="font12">{{ product.quantity }}</span>
                </Orderproductplate>
                <img slot="avatar" :src="item.avatar" class="avatarimg" />
                <span slot="username">{{ item.username }}</span>
                <div v-if="(item.seller && item.seller.length > 0)" slot="seller">
                  <div class="fr sellerarea">{{ $t('Rebate customer') }} <span>{{ item.seller.username }}</span></div>
                </div>
                <div slot="receivearea">
                  <div class="t-table pt5 color-gray font12 deliverarea">
                    <div class="t-cell middle-cell">
                      <div><span class="middle-cell mr10">{{ $t('Receiver') }}:</span><span class="v_middle">{{ item.linkman }}</span><span class="ml10 v_middle">{{ item.telephone }}</span></div>
                      <div class="mt3">{{ item.address }}</div>
                    </div>
                    <div class="t-cell middle-cell appendcontrol align_right w80">
                      <a class="qbtn3 font12 " style="padding:1px 8px;">{{ $t('View deliver') }}</a>
                    </div>
                  </div>
                </div>
              </Orderitemplate>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div class="s-bottom bottomnaviarea b_top_after">
      <div class="t-table bottomnavi">
        <router-link class="t-cell item" to="/retailerShop">{{ $t('My shop') }}</router-link>
        <router-link class="t-cell item" to="/centerSales">{{ $t('Sales center') }}</router-link>
        <div class="t-cell item active">{{ $t('My orders') }}</div>
      </div>
    </div>
  </div>
</template>

<i18n>
Add order1:
  zh-CN: 返点客户
My orders:
  zh-CN: 我的订单
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, XTextarea, Group, XButton } from 'vux'
import Orderitemplate from './Orderitemplate'
import Orderproductplate from './Orderproductplate'
import Time from '../../libs/time'

export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    XTextarea,
    Group,
    XButton,
    Orderitemplate,
    Orderproductplate
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      tabtxts: [ '全部', '待付款', '待发货', '已发货' ],
      tabmodel: 0,
      orderdataall: [
        {
          id: 315,
          uid: '187',
          dateline: 1522724948,
          flagstr: '待付款',
          flag: 1,
          username: 'YOUNG',
          linkman: '于国旺',
          telephone: '13051687651',
          address: '北京市东城区金家村',
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg',
          orderlist: [
            {
              id: 327, photo: 'http://ossgxs.boka.cn/month_201804/15226700508345.jpg', name: '苹果手机', special: '8,000.00', quantity: 1
            }
          ]
        },
        {
          id: 308,
          uid: '31',
          dateline: 1522664603,
          flagstr: '订单取消',
          flag: 0,
          username: '๓妖怪吧！',
          linkman: '余鹏',
          telephone: '13777777777',
          address: '北京市石景山区博卡先锋',
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/31.jpg',
          orderlist: [
            {
              id: 319, photo: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204032649156.png', name: '欧美简约假两件无袖背心男休闲嘻哈ulzzang青少年学生坎肩打底衫打底衫打底衫', special: '0.01', quantity: 1
            }
          ]
        },
        {
          id: 307,
          uid: '187',
          dateline: 1522663437,
          flagstr: '正在拼团',
          flag: 2,
          username: 'YOUNG',
          linkman: '于国旺',
          telephone: '13051687651',
          address: '北京市东城区金家村',
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg',
          orderlist: [
            {
              id: 320, photo: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204032649156.png', name: '欧美简约假两件无袖背心男休闲嘻哈ulzzang青少年学生坎肩打底衫打底衫打底衫', special: '0.01', quantity: 1
            }
          ]
        },
        {
          id: 304,
          uid: '281',
          dateline: 1522662385,
          flagstr: '组团成功,待发货',
          flag: 2,
          username: 'SMART',
          linkman: '于',
          telephone: '13051687951',
          address: '北京市东城区于',
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/281.jpg',
          orderlist: [
            {
              id: 316, photo: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15214216879480.jpg', name: '商品1', special: '0.01', quantity: 1
            }
          ],
          seller: { dateline: 1522221270, id: 223, linkman: '艳绝天下', username: '贪吃小松鼠', wid: 187 }
        },
        {
          id: 262,
          uid: 281,
          dateline: 1522224522,
          flagstr: '待发货',
          flag: 2,
          username: 'SMART',
          linkman: '于',
          telephone: '13051687951',
          address: '北京市东城区于',
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/281.jpg',
          orderlist: [
            {
              id: 274, photo: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204032649156.jpg', name: '欧美简约假两件无袖背心男休闲嘻哈ulzzang青少年学生坎肩打底衫打底衫打底衫', special: '0.01', quantity: 1
            }
          ]
        },
        {
          id: 288,
          uid: '16',
          dateline: 1522304138,
          flagstr: '已发货',
          flag: 3,
          username: 'gyp',
          linkman: '暂无',
          telephone: '13051687951',
          address: '北京市东城区于',
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/16.jpg',
          orderlist: [
            {
              id: 300, photo: 'http://ossgxs.boka.cn/month_201803/15223015399153.jpg?x-oss-process=image/crop||x_352||y_532||w_315||h_315', name: '维生素B族片', special: '1.00', quantity: 1
            }
          ]
        }
      ],
      orderdata1: [
        {
          id: 315,
          uid: '187',
          dateline: 1522724948,
          flagstr: '待付款',
          flag: 1,
          username: 'YOUNG',
          linkman: '于国旺',
          telephone: '13051687651',
          address: '北京市东城区金家村',
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg',
          orderlist: [
            {
              id: 327, photo: 'http://ossgxs.boka.cn/month_201804/15226700508345.jpg', name: '苹果手机', special: '8,000.00', quantity: 1
            }
          ]
        },
        {
          id: 308,
          uid: '31',
          dateline: 1522664603,
          flagstr: '待付款',
          flag: 1,
          username: '๓妖怪吧！',
          linkman: '余鹏',
          telephone: '13777777777',
          address: '北京市石景山区博卡先锋',
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/31.jpg',
          orderlist: [
            {
              id: 319, photo: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204032649156.png', name: '欧美简约假两件无袖背心男休闲嘻哈ulzzang青少年学生坎肩打底衫打底衫打底衫', special: '0.01', quantity: 1
            }
          ]
        }
      ],
      orderdata2: [
        {
          id: 315,
          uid: '187',
          dateline: 1522724948,
          flagstr: '待发货',
          flag: 2,
          username: 'YOUNG',
          linkman: '于国旺',
          telephone: '13051687651',
          address: '北京市东城区金家村',
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg',
          orderlist: [
            {
              id: 327, photo: 'http://ossgxs.boka.cn/month_201804/15226700508345.jpg', name: '苹果手机', special: '8,000.00', quantity: 1
            }
          ]
        },
        {
          id: 307,
          uid: '187',
          dateline: 1522663437,
          flagstr: '正在拼团',
          flag: 2,
          username: 'YOUNG',
          linkman: '于国旺',
          telephone: '13051687651',
          address: '北京市东城区金家村',
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg',
          orderlist: [
            {
              id: 320, photo: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204032649156.png', name: '欧美简约假两件无袖背心男休闲嘻哈ulzzang青少年学生坎肩打底衫打底衫打底衫', special: '0.01', quantity: 1
            }
          ]
        },
        {
          id: 304,
          uid: '281',
          dateline: 1522662385,
          flagstr: '组团成功,待发货',
          flag: 2,
          username: 'SMART',
          linkman: '于',
          telephone: '13051687951',
          address: '北京市东城区于',
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/281.jpg',
          orderlist: [
            {
              id: 316, photo: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15214216879480.jpg', name: '商品1', special: '0.01', quantity: 1
            }
          ],
          seller: { dateline: 1522221270, id: 223, linkman: '艳绝天下', username: '贪吃小松鼠', wid: 187 }
        },
        {
          id: 262,
          uid: 281,
          dateline: 1522224522,
          flagstr: '待发货',
          flag: 2,
          username: 'SMART',
          linkman: '于',
          telephone: '13051687951',
          address: '北京市东城区于',
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/281.jpg',
          orderlist: [
            {
              id: 274, photo: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204032649156.jpg', name: '欧美简约假两件无袖背心男休闲嘻哈ulzzang青少年学生坎肩打底衫打底衫打底衫', special: '0.01', quantity: 1
            }
          ]
        }
      ],
      orderdata3: [
        {
          id: 315,
          uid: '187',
          dateline: 1522724948,
          flagstr: '已发货',
          flag: 3,
          username: 'YOUNG',
          linkman: '于国旺',
          telephone: '13051687651',
          address: '北京市东城区金家村',
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg',
          orderlist: [
            {
              id: 327, photo: 'http://ossgxs.boka.cn/month_201804/15226700508345.jpg', name: '苹果手机', special: '8,000.00', quantity: 1
            }
          ]
        },
        {
          id: 288,
          uid: '16',
          dateline: 1522304138,
          flagstr: '已发货',
          flag: 3,
          username: 'gyp',
          linkman: '暂无',
          telephone: '13051687951',
          address: '北京市东城区于',
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/16.jpg',
          orderlist: [
            {
              id: 300, photo: 'http://ossgxs.boka.cn/month_201803/15223015399153.jpg?x-oss-process=image/crop||x_352||y_532||w_315||h_315', name: '维生素B族片', special: '1.00', quantity: 1
            }
          ]
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/center.less';
@import '../assets/global.less';
</style>
