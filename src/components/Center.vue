<template>
  <div id="personal-center">
    <c-title :link-info="{path:'/profile'}"
            :link-credit="{path:'/credit'}">
    </c-title>
    <div class="grid-title">{{ $t('Service') }}</div>
    <grid :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item :label="$t('My Address')" link="/address">
        <span slot="icon" class="al al-wodedizhi" style="color:#8c93ff"></span>
      </grid-item>
      <grid-item :label="$t('My Shares')" link="/share">
        <span slot="icon" class="al al-ai-share" style="color:#00d1a4;"></span>
      </grid-item>
      <grid-item :label="$t('My Favorites')" link="/favorite">
        <span slot="icon" class="al al-qietu19" style="color:#fbb266;"></span>
      </grid-item>
      <grid-item :label="$t('Exit')">
        <span slot="icon" class="al al-tuichu3" style="color:#f05e4b"></span>
      </grid-item>
    </grid>
  </div>
</template>

<i18n>
Personal Center:
  zh-CN: 个人中心
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

<style lang="less">
/* weui css hack */
#personal-center .weui-grid__icon {
  height: auto;
  width: auto;
  text-align: center;
}

#personal-center .weui-grids::before {
  border-top: none;
  height: 0;
}

/* css extension */
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
