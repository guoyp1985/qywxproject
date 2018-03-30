<template>
  <div>
    <div class="s-topbanner">
      <div class="row">
      </div>
    </div>
    <div class="grid-title">{{ $t('Content manage') }}</div>
    <grid :cols="3" class="bk-grid">
      <grid-item :label="$t('Activity')">
        <span slot="icon" class="al al-tianmaohaoquan icon-orange db-in" style="margin-top:-6px;"></span>
      </grid-item>
      <grid-item :label="$t('Product')">
        <span slot="icon" class="al al-shangpin icon-red db-in" style="margin-top:-6px;font-size:26px;"></span>
      </grid-item>
      <grid-item :label="$t('News')">
        <span slot="icon" class="al al-wenzhang3 icon-green db-in" style="margin-top:-6px;"></span>
      </grid-item>
    </grid>
    <div class="grid-title">{{ $t('Customer mange') }}</div>
    <grid :cols="3" class="bk-grid">
      <grid-item :label="$t('Rebate customer')"  :link="{path:'/RetailerSales'}">
        <span slot="icon" class="al al-xiaoshou icon-blue db-in font30" style="margin-top:-6px;"></span>
        <span class="al al-hot1 icon-red" style="position:absolute;font-size:34px;top:0;right:-1px;height:31px;line-height:31px;"></span>
      </grid-item>
      <grid-item :label="$t('Sale chance')">
        <span slot="icon" class="al al-yewujihui icon-blue1 db-in" style="margin-top:-6px;"></span>
      </grid-item>
      <grid-item :label="$t('Contact customer')">
        <span slot="icon" class="al al-lianxiren icon-orange db-in" style="margin-top:-6px;"></span>
      </grid-item>
    </grid>
    <div class="grid-title">{{ $t('Order manage') }}</div>
    <grid :cols="3" class="bk-grid">
      <grid-item :label="$t('Order entry')">
        <span slot="icon" class="al al-xinzengdingdan icon-orange db-in" style="margin-top:-6px;"></span>
      </grid-item>
      <grid-item :label="$t('Order list')">
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

export default {
  components: {
    Group,
    Cell,
    XButton,
    Box,
    Card,
    Grid,
    GridItem,
    Marquee,
    MarqueeItem,
    CellBox
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  }
}
</script>

<style lang="less">
@import '../assets/global.less';
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
