<template>
  <div>
    <nameplate>
      <span class="demo-icon-22" slot="icon">&#xe633;</span>
      <span slot="title">{{ $t('Sales center') }}</span>
      <x-button mini link="BACK">{{ $t('My tasks') }}</x-button>
      <x-button mini link="BACK">{{ $t('My logs') }}</x-button>
    </nameplate>
    <card style="margin-top: 0px">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span>1130</span>
          <br/>
          {{ $t('Month Sharing Goal') }}
        </div>
        <div class="vux-1px-r">
          <span>15</span>
          <br/>
          {{ $t('Had Shared') }}
        </div>
        <div class="vux-1px-r">
          <span>0</span>
          <br/>
          {{ $t('Had Contacted') }}
        </div>
      </div>
    </card>
    <div class="grid-title">{{ $t('Gain Consumers') }}</div>
    <grid>
      <grid-item :label="$t('Sharing Material')">
        <img slot="icon" src="../assets/icon-share1.png">
      </grid-item>
      <grid-item :label="$t('Sharing Qrcode')">
        <img slot="icon" src="../assets/icon-qrcode.png">
      </grid-item>
      <grid-item :label="$t('Grab Consumers')">
        <img slot="icon" src="../assets/icon-pool.png">
      </grid-item>
    </grid>
    <div class="grid-title">{{ $t('Contact Consumers') }}</div>
    <grid>
      <grid-item :label="$t('Sales opportunity')">
        <img slot="icon" src="../assets/icon-acre.png">
      </grid-item>
      <grid-item :label="$t('Contact Consumers')">
        <img slot="icon" src="../assets/icon-contact3.png">
      </grid-item>
      <grid-item :label="$t('More Features')">
        <img slot="icon" src="../assets/icon-share2.png">
      </grid-item>
    </grid>
  </div>
</template>

<i18n>
Sales center:
  zh-CN: 销售中心
My tasks:
  zh-CN: 我的任务
My logs:
  zh-CN: 我的日志
Month Sharing Goal:
  zh-CN: 月分享目标
Had Shared:
  zh-CN: 已分享
Had Contacted:
  zh-CN: 已联系
Sharing Material:
  zh-CN: 分享素材
Sharing Qrcode:
  zh-CN: 分享二维码
Gain Consumers:
  zh-CN: 获取客户
Grab Consumers:
  zh-CN: 抢客户
Contact Consumers:
  zh-CN: 联系客户
Sales opportunity:
  zh-CN: 销售机会
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
