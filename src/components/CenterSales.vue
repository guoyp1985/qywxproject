<template>
<<<<<<< HEAD
  <div class="containerarea font14">
    <Salestopplate>
      <img :src="retailerInfo.avatar" slot="img" />
      <div slot="txtarea" class="font16 color-white">{{ retailerInfo.linkman }}</div>
      <div slot="txtarea" class="font16 color-white">{{ $t('With the customer rebate money together!') }}</div>
=======
  <div>
    <Salestopplate>
      <img src="http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg" slot="img" />
      <div slot="txtarea" class="font18 color-white">YOUNG</div>
      <router-link slot="txtarea" class="font14 color-white" style="padding-top:8px;" to="/retailerShop">{{$t('My shop')}}</router-link>
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
      <div style="position:absolute;top:10px;right:20px;height:35px;">
        <router-link class="color-white" style="padding-top:8px;" to="/retailerSetting"><span class="al al-set font20"></span></router-link>
        <router-link  style="position:reltaive;color:#fff;margin-left:5px;" to="/retailerMessagelist">
          <span class="al al-pinglun font20"></span>
<<<<<<< HEAD
          <span class="numicon" v-if="retailerInfo.newmessage > 0">{{ retailerInfo.newmessage }}</span>
        </router-link>
      </div>
      <router-link class="flex_center color-white" :to="{path: '/retailerShop', query: {wid:retailerInfo.uid}}" style="position:absolute;right:110px;bottom:10px;">
        <span class="al al-weidian1 font18"></span>
        <span class="ml3" to="/retailerRevenue">{{$t('My shop')}}</span>
      </router-link>
      <router-link class="flex_center color-white" to="/retailerRevenue" style="position:absolute;right:20px;bottom:10px;">
        <span class="al al-qitashouru font18"></span>
        <span class="ml3">{{$t('Myrevenue')}}</span>
      </router-link>
=======
          <span class="numicon">0</span>
        </router-link>
      </div>
      <div class="flex_center" style="position:absolute;right:20px;bottom:10px;color:#fff;font-size:14px;">
        <span class="al al-trade-assurance font18"></span>
        <router-link class="ml3" to="/retailerRevenue">{{$t('Myrevenue')}}</router-link>
      </div>
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
    </Salestopplate>
    <div class="vux-marquee" item-height=40 duration=2000>
      <marquee>
        <marquee-item v-for="(item,index) in marquedata" :key="item.id">
          <group class="marqueeitem">
            <CellBox align-items="left" class="font12 db-flex">
              <span class="clamp1">
                <span class="color-blue mr3">{{item.username}}</span>
                <span class="color-gray1">查看了《{{item.title}}》</span>
              </span>
              <span class="w80 align_right color-gray1">{{ item.dateline | dateformat }}</span>
            </CellBox>
          </group>
        </marquee-item>
      </marquee>
    </div>
    <div class="grid-title">{{ $t('Content manage') }}</div>
    <grid :cols="3" class="bk-grid">
<<<<<<< HEAD
      <grid-item :label="$t('Product')" :link="{path:'/retailerProductlist'}">
        <div slot="icon" style="position:relative;">
          <i class="al al-guanlizhongxin1 icon-red db-in" style="margin-top:-6px;font-size:26px;"></i>
          <div class="numicon flex_center" v-if="retailerInfo.newproduct > 0">{{ retailerInfo.newproduct }}</div>
        </div>
      </grid-item>
      <grid-item :label="$t('Activity')" :link="{path:'/retailerActivitylist'}">
          <div slot="icon" style="position:relative;">
            <i class="al al-tianmaohaoquan icon-orange db-in" style="margin-top:-6px;"></i>
            <div class="numicon flex_center" v-if="retailerInfo.newactivity > 0">{{ retailerInfo.newactivity }}</div>
          </div>
      </grid-item>
      <grid-item :label="$t('News')" :link="{path:'/retailerNews'}">
        <div slot="icon" style="position:relative;">
          <i class="al al-wenzhang3 icon-green db-in" style="margin-top:-6px;"></i>
          <div class="numicon flex_center" v-if="retailerInfo.newnews > 0">{{ retailerInfo.newnews }}</div>
        </div>
      </grid-item>
    </grid>
    <div class="grid-title">{{ $t('Customer mange') }}</div>
    <template v-if="retailerInfo.products > 0">
      <grid :cols="3" class="bk-grid">
        <grid-item :label="$t('Rebate customer')" :link="{path:'/retailerSales'}">
          <div slot="icon" style="position:relative;">
            <i class="al al-xiaoshou icon-blue db-in font30" style="margin-top:-6px;"></i>
            <div class="numicon flex_center" v-if="retailerInfo.newsellers > 0">{{ retailerInfo.newsellers }}</div>
          </div>
          <span class="al al-hot1 icon-red" style="position:absolute;font-size:34px;top:0;right:-1px;height:31px;line-height:31px;"></span>
        </grid-item>
        <grid-item :label="$t('Sale chance')" :link="{path:'/retailerSalechance'}">
          <div slot="icon" style="position:relative;">
            <i class="al al-yewujihui icon-blue1 db-in" style="margin-top:-6px;"></i>
            <div class="numicon flex_center" v-if="retailerInfo.newopportunity > 0">{{ retailerInfo.newopportunity }}</div>
          </div>
        </grid-item>
        <grid-item :label="$t('Contact customer')" :link="{path:'/retailerCustomerlist'}">
          <div slot="icon" style="position:relative;">
            <i class="al al-lianxiren icon-orange db-in" style="margin-top:-6px;"></i>
            <div class="numicon flex_center" v-if="retailerInfo.newcustomers > 0">{{ retailerInfo.newcustomers }}</div>
          </div>
        </grid-item>
      </grid>
    </template>
    <template v-else >
      <grid :cols="3" class="bk-grid disable">
        <grid-item :label="$t('Rebate customer')">
          <div slot="icon" style="position:relative;">
            <i class="al al-xiaoshou db-in font30" style="margin-top:-6px;"></i>
          </div>
          <span class="al al-hot1" style="position:absolute;font-size:34px;top:0;right:-1px;height:31px;line-height:31px;"></span>
        </grid-item>
        <grid-item :label="$t('Sale chance')">
          <div slot="icon" style="position:relative;">
            <i class="al al-yewujihui db-in" style="margin-top:-6px;"></i>
          </div>
        </grid-item>
        <grid-item :label="$t('Contact customer')">
          <div slot="icon" style="position:relative;">
            <i class="al al-lianxiren db-in" style="margin-top:-6px;"></i>
          </div>
        </grid-item>
      </grid>
    </template>
    <div class="grid-title">{{ $t('Order manage') }}</div>
    <template v-if="retailerInfo.products > 0">
      <grid :cols="3" class="bk-grid">
        <grid-item :label="$t('Order list')" :link="{path:'/retailerOrders'}">
          <div slot="icon" style="position:relative;">
            <i class="al al-dingdan icon-blue2 db-in" style="margin-top:-6px;"></i>
            <div class="numicon flex_center" v-if="retailerInfo.newcustomers > 0">{{ retailerInfo.newcustomers }}</div>
          </div>
        </grid-item>
      </grid>
    </template>
    <template v-else >
      <grid :cols="3" class="bk-grid disable">
        <grid-item :label="$t('Order list')">
          <div slot="icon" style="position:relative;">
            <i class="al al-dingdan db-in" style="margin-top:-6px;"></i>
          </div>
        </grid-item>
      </grid>
    </template>
    <!--
=======
      <grid-item :label="$t('Activity')" :link="{path:'/retailerActivitylist'}">
        <span slot="icon" class="al al-tianmaohaoquan icon-orange db-in" style="margin-top:-6px;"></span>
      </grid-item>
      <grid-item :label="$t('Product')" :link="{path:'/retailerProductlist'}">
        <span slot="icon" class="al al-shangpin icon-red db-in" style="margin-top:-6px;font-size:26px;"></span>
      </grid-item>
      <grid-item :label="$t('News')" :link="{path:'/retailerNews'}">
        <span slot="icon" class="al al-wenzhang3 icon-green db-in" style="margin-top:-6px;"></span>
      </grid-item>
    </grid>
    <div class="grid-title">{{ $t('Customer mange') }}</div>
    <grid :cols="3" class="bk-grid">
      <grid-item :label="$t('Rebate customer')" :link="{path:'/retailerSales'}">
        <span slot="icon" class="al al-xiaoshou icon-blue db-in font30" style="margin-top:-6px;"></span>
        <span class="al al-hot1 icon-red" style="position:absolute;font-size:34px;top:0;right:-1px;height:31px;line-height:31px;"></span>
      </grid-item>
      <grid-item :label="$t('Sale chance')" :link="{path:'/retailerSalechance'}">
        <span slot="icon" class="al al-yewujihui icon-blue1 db-in" style="margin-top:-6px;"></span>
      </grid-item>
      <grid-item :label="$t('Contact customer')" :link="{path:'/retailerCustomerlist'}">
        <span slot="icon" class="al al-lianxiren icon-orange db-in" style="margin-top:-6px;"></span>
      </grid-item>
    </grid>
    <div class="grid-title">{{ $t('Order manage') }}</div>
    <grid :cols="3" class="bk-grid">
      <grid-item :label="$t('Order entry')" :link="{path:'/retailerAddorder'}">
        <span slot="icon" class="al al-xinzengdingdan icon-orange db-in" style="margin-top:-6px;"></span>
      </grid-item>
      <grid-item :label="$t('Order list')" :link="{path:'/retailerOrders'}">
        <span slot="icon" class="al al-dingdan icon-blue2 db-in" style="margin-top:-6px;"></span>
      </grid-item>
    </grid>
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
    <a class="align_center pb20 pt20 db">
      <div>
        <span class="al al-kefu1 font24 color-blue3"></span>
      </div>
      <div class="font12 color-blue2">{{ $t('Divider text') }}</div>
    </a>
<<<<<<< HEAD
  -->
=======
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
  </div>
</template>

<i18n>
Sales center:
  zh-CN: 销售中心
Content manage:
  zh-CN: 内容管理
Activity:
  zh-CN: 活动
Product:
  zh-CN: 商品
News:
  zh-CN: 文章
Customer mange:
  zh-CN: 客户管理
Rebate customer:
  zh-CN: 返点客户
Sale chance:
  zh-CN: 销售机会
Contact customer:
  zh-CN: 联系客户
Order manage:
  zh-CN: 订单管理
Order entry:
  zh-CN: 订单录入
Order list:
  zh-CN: 订单列表
Divider text:
  zh-CN: 如有其他疑问或建议，可联系客服
<<<<<<< HEAD
With the customer rebate money together!:
  zh-CN: 与返点客一起赚钱!
=======
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
</i18n>

<script>
import { Group, Cell, XButton, Box, Card, Grid, GridItem, Marquee, MarqueeItem, CellBox } from 'vux'
import Salestopplate from './Salestopplate'
import Time from '../../libs/time'
<<<<<<< HEAD
import ENV from '../../libs/env'
=======
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827

export default {
  components: {
    Group,
    Cell,
    XButton,
    Box,
    Card,
    Grid,
    GridItem,
    Salestopplate,
    Marquee,
    MarqueeItem,
    CellBox
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd')
    }
  },
<<<<<<< HEAD
  created () {
    let self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.$http.get(`${ENV.BokaApi}/api/retailer/home`).then(function (res) {
      return res.json()
    }).then(function (data) {
      self.retailerInfo = data.data ? data.data : data
    })
    self.$http.get(`${ENV.BokaApi}/api/retailer/shareview`).then(function (res) {
      return res.json()
    }).then(function (data) {
      self.marquedata = data.data ? data.data : data
    })
  },
  data () {
    return {
      retailerInfo: {},
      marquedata: []
    }
  },
  watch: {
    retailerInfo () {
      return this.retailerInfo
    },
    marquedata () {
      return this.marquedata
=======
  data () {
    return {
      marquedata: [
        {
          'id': 510,
          'uid': 51,
          'moduleid': 66,
          'username': '贪吃小松鼠',
          'dateline': 1522051625,
          'title': '固始首家爱心粥屋揭牌运营',
          'wid': 187,
          'module': 'news'
        }, {
          'id': 503,
          'uid': 51,
          'moduleid': 74,
          'username': '贪吃小松鼠',
          'dateline': 1522041015,
          'title': '你会给我买名牌包包吗？',
          'wid': 187,
          'module': 'product'
        }, {
          'id': 504,
          'uid': 31,
          'moduleid': 74,
          'username': '๓妖怪吧！',
          'dateline': 1522041162,
          'title': '你会给我买名牌包包吗？',
          'wid': 187,
          'module': 'product'
        }, {
          'id': 511,
          'uid': 16,
          'moduleid': 66,
          'username': 'gyp',
          'dateline': 1522051633,
          'title': '固始首家爱心粥屋揭牌运营',
          'wid': 187,
          'module': 'news'
        }, {
          'id': 512,
          'uid': 49,
          'moduleid': 66,
          'username': 'butจุ๊บ',
          'dateline': 1522052013,
          'title': '固始首家爱心粥屋揭牌运营',
          'wid': 187,
          'module': 'news'
        }
      ]
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
    }
  }
}
</script>

<style lang="less">
.bk-salestopplate .numicon{
  position: absolute;
  top: 0;
  right: -15px;
  background: #f06825;
  padding: 0 1px;
  border-radius: 16%;
  color: #fff;
  font-size: 10px;
  min-width: 18px;
  text-align: center;
}
.marqueeitem .weui-cells{margin-top:0;}
.grid-title {
  background-color: #efeff4;
  color: #716f76;
  padding: 10px 15px;
  font-size: 14px;
}
.bk-grid .weui-grid__label{
  color:#666;
}
<<<<<<< HEAD
.bk-grid .numicon{
  position: absolute;
  top: -12px;
  right: -12px;
  background: #f06825;
  padding: 0 1px;
  border-radius: 16%;
  color: #fff;
  font-size: 10px;
  min-width: 18px;
  text-align: center;
}
.bk-grid.disable{color:#a6a6a6 !important;}
=======
>>>>>>> 25ba8f0938d571307dda639b762880ec13c7c827
</style>
