<template>
  <div>
    <c-title>
    </c-title>
    <grid :cols="3">
      <grid-item :label="$t('Search Orders')">
        <img slot="icon" src="../assets/icon-holiday04.png">
      </grid-item>
      <grid-item :label="$t('View Productions')">
        <img slot="icon" src="../assets/icon-newseon.png">
      </grid-item>
      <grid-item :label="$t('View Articles')">
        <img slot="icon" src="../assets/icon-shenpi.png">
      </grid-item>
    </grid>
    <div class="grid-title">{{ $t('Service') }}</div>
    <grid :cols="4">
      <grid-item :label="$t('My Address')">
        <img slot="icon" src="../assets/icon-holiday04.png">
      </grid-item>
      <grid-item :label="$t('My Shares')">
        <img slot="icon" src="../assets/icon-newseon.png">
      </grid-item>
      <grid-item :label="$t('My Favorites')">
        <img slot="icon" src="../assets/icon-shenpi.png">
      </grid-item>
      <grid-item :label="$t('Exit')">
        <img slot="icon" src="../assets/news.png">
      </grid-item>
    </grid>
  </div>
</template>

<i18n>
Personal Center:
  zh-CN: 个人中心
Search Orders:
  zh-CN: 查订单
View Productions:
  zh-CN: 挑商品
View Articles:
  zh-CN: 看文章
Service:
  zh-CN: 服务
My Address:
  zh-CN: 我的地址
My Shares:
  zh-CN: 我的分享
My Favorites:
  zh-CN: 我的收藏
Exit:
  zh-CN: 退出
</i18n>

<script>
import { Grid, GridItem } from 'vux'
import CTitle from './CTitle'

export default {
  components: {
    Grid,
    GridItem,
    CTitle
  }
}
</script>

<style>
@import '~vux/src/styles/1px.less'

.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #67b8e1;
}
.grid-center {
  display: block;
  text-align: center;
  color: #666;
}
.grid-title {
  background-color: #efeff4;
  color: #716f76;
  padding: 5px 15px;
  font-size: 14px;
}
</style>
