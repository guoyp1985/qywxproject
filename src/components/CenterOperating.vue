<template>
  <div>
    <nameplate>
      <span class="demo-icon-22" slot="icon">&#xe633;</span>
      <span slot="title">{{ $t('Operating Center') }}</span>
      <x-button mini link="BACK">{{ $t('My tasks') }}</x-button>
      <x-button mini link="BACK">{{ $t('My logs') }}</x-button>
    </nameplate>
    <card style="margin-top: 0px">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span>1130</span>
          <br/>
          {{ $t('Monthly Activities') }}
        </div>
        <div class="vux-1px-r">
          <span>15</span>
          <br/>
          {{ $t('Monthly Articles') }}
        </div>
        <div class="vux-1px-r">
          <span>0</span>
          <br/>
          {{ $t('Monthly Follows') }}
        </div>
      </div>
    </card>
    <div class="grid-title">{{ $t('Operating Tools') }}</div>
    <grid :cols="3">
      <grid-item :label="$t('Activity Management')">
        <img slot="icon" src="../assets/icon-holiday04.png">
      </grid-item>
      <grid-item :label="$t('Article Management')">
        <img slot="icon" src="../assets/icon-newseon.png">
      </grid-item>
      <grid-item :label="$t('Approval Management')">
        <img slot="icon" src="../assets/icon-shenpi.png">
      </grid-item>
      <grid-item :label="$t('Easy Gathering')">
        <img slot="icon" src="../assets/news.png">
      </grid-item>
      <grid-item :label="$t('Shake')">
        <img slot="icon" src="../assets/icon-yaoyiyao01.png">
      </grid-item>
      <grid-item :label="$t('More Features')">
        <img slot="icon" src="../assets/icon-share2.png">
      </grid-item>
    </grid>
  </div>
</template>

<i18n>
Operating Center:
  zh-CN: 运营中心
My tasks:
  zh-CN: 我的任务
My logs:
  zh-CN: 我的日志
Operating Tools:
  zh-CN: 运营工具
Monthly Activities:
  zh-CN: 本月活动
Monthly Articles:
  zh-CN: 本月文章
Monthly Follows:
  zh-CN: 本月关注
Activity Management:
  zh-CN: 活动管理
Article Management:
  zh-CN: 文章管理
Approval Management:
  zh-CN: 审批管理
Easy Gathering:
  zh-CN: 易采集
Shake:
  zh-CN: 摇一摇
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
