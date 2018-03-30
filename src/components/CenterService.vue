<template>
  <!--
  <div>
    <nameplate>
      <span class="demo-icon-22" slot="icon">&#xe633;</span>
      <span slot="title">{{ $t('Service Center') }}</span>
      <x-button mini link="BACK">{{ $t('My tasks') }}</x-button>
      <x-button mini link="BACK">{{ $t('My logs') }}</x-button>
    </nameplate>
    <div class="grid-title">{{ $t('Answer Center') }}</div>
    <grid>
      <grid-item :label="$t('Messages Center')">
        <img slot="icon" src="../assets/images/icon-xxguanli.png">
      </grid-item>
      <grid-item :label="$t('Messages')">
        <img slot="icon" src="../assets/images/icon-xxi.png">
      </grid-item>
      <grid-item :label="$t('Arrival')">
        <img slot="icon" src="../assets/images/icon-arrival3.png">
      </grid-item>
    </grid>
    <div class="grid-title">{{ $t('Consumer Service') }}</div>
    <grid :cols="3">
      <grid-item :label="$t('Consumer List')">
        <img slot="icon" src="../assets/images/icon-holiday01.png">
      </grid-item>
      <grid-item :label="$t('Accurate Push')">
        <img slot="icon" src="../assets/images/icon-holiday02.png">
      </grid-item>
      <grid-item :label="$t('Consumer Show')">
        <img slot="icon" src="../assets/images/icon-holiday05.png">
      </grid-item>
      <grid-item :label="$t('Coin Order')">
        <img slot="icon" src="../assets/images/icon-djgl.png">
      </grid-item>
      <grid-item :label="$t('Sale Records')">
        <img slot="icon" src="../assets/images/icon-xsjl.png">
      </grid-item>
      <grid-item :label="$t('More Features')">
        <img slot="icon" src="../assets/images/icon-share2.png">
      </grid-item>
    </grid>
  </div>
-->
</template>

<i18n>
Service Center:
  zh-CN: 服务中心
My tasks:
  zh-CN: 我的任务
My logs:
  zh-CN: 我的日志
Answer Center:
  zh-CN: 响应中心
Messages Center:
  zh-CN: 消息中心
Messages:
  zh-CN: 消息
Arrival:
  zh-CN: 到店
Consumer Service:
  zh-CN: 客户服务
Consumer List:
  zh-CN: 客户列表
Accurate Push:
  zh-CN: 精准推送
Consumer Show:
  zh-CN: 买家秀
Coin Order:
  zh-CN: 金币订单
Sale Records:
  zh-CN: 销售记录
More Features:
  zh-CN: 更多功能
</i18n>

<script>
import { Group, Cell, XButton, Box, Card, Grid, GridItem } from 'vux'
import Nameplate from './Nameplate'

export default {
  components: {
    Group,
    Cell,
    XButton,
    Box,
    Card,
    Grid,
    GridItem,
    Nameplate
  }
}
</script>

<style>
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
