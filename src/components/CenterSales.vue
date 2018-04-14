<template>
  <div>
    <Salestopplate>
      <img src="http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg" slot="img" />
      <div slot="txtarea" class="font18 color-white">YOUNG</div>
      <router-link slot="txtarea" class="font14 color-white" style="padding-top:8px;" to="/retailerShop">{{$t('My shop')}}</router-link>
      <div style="position:absolute;top:10px;right:20px;height:35px;">
        <router-link class="color-white" style="padding-top:8px;" to="/retailerSetting"><span class="al al-set font20"></span></router-link>
        <router-link  style="position:reltaive;color:#fff;margin-left:5px;" to="/retailerMessagelist">
          <span class="al al-pinglun font20"></span>
          <span class="numicon">0</span>
        </router-link>
      </div>
      <div class="flex_center" style="position:absolute;right:20px;bottom:10px;color:#fff;font-size:14px;">
        <span class="al al-trade-assurance font18"></span>
        <router-link class="ml3" to="/retailerRevenue">{{$t('Myrevenue')}}</router-link>
      </div>
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
    <a class="align_center pb20 pt20 db">
      <div>
        <span class="al al-kefu1 font24 color-blue3"></span>
      </div>
      <div class="font12 color-blue2">{{ $t('Divider text') }}</div>
    </a>
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
</i18n>

<script>
import { Group, Cell, XButton, Box, Card, Grid, GridItem, Marquee, MarqueeItem, CellBox } from 'vux'
import Salestopplate from './Salestopplate'
import Time from '../../libs/time'

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
  created () {
    this.$store.commit('updateToggleTabbar', { toggleBar: false })
  },
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
</style>
