<template>
  <div class="bg-gray1">
    <card :header="{title: $t('Data text')}" class="x-card">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <div class="">{{ $t('View number') }}</div>
          <div class="color-blue4 font17 mt5">1130</div>
        </div>
        <div class="vux-1px-r">
          <div class="">{{ $t('Share number') }}</div>
          <div class="color-blue4 font17 mt5">15</div>
        </div>
        <div class="vux-1px-r">
          <div class="">{{ $t('Sale number') }}</div>
          <div class="color-blue4 font17 mt5">￥0.00</div>
        </div>
      </div>
    </card>
  </div>
</template>

<i18n>
Data text:
  zh-CN: 数据
View number:
  zh-CN: 访问量
Share number:
  zh-CN: 分享数
Sale number:
  zh-CN: 销售额
</i18n>

<script>
import { Card } from 'vux'

export default {
  components: {
    Card
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import '../assets/global.less';
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
  color: #f74c31;
}
.x-card.weui-panel:after{display:none;}
.x-card .vux-1px-r:after{display:none;}
.x-card .weui-panel__hd:after{display:none;}

</style>
