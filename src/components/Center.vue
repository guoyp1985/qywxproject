<template>
  <div id="personal-center">
    <c-title :link-info="{path:'/profile'}"
            :link-credit="{path:'/credit'}">
    </c-title>
    <grid :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item :label="$t(btn.name)" v-for="(btn, index) in btns" :key="index" :link="btn.link">
        <div slot="icon" :class="`circle-icon-bg ${btn.color} color-white`">
          <span :class="`fa ${btn.icon}`"></span>
        </div>
      </grid-item>
    </grid>
    <div class="grid-title">{{ $t('Service') }}</div>
    <grid :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item :label="$t(btn.name)" v-for="(btn, index) in btns1" :key="index" :link="btn.link">
        <div slot="icon" :class="btn.color">
          <span :class="`al ${btn.icon}`"></span>
        </div>
      </grid-item>
    </grid>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Grid, GridItem } from 'vux'
import CTitle from './CTitle'

export default {
  components: {
    Grid,
    GridItem,
    CTitle
  },
  data () {
    return {
      btns: [
        {
          name: 'Search Orders',
          icon: 'fa-file-text-o',
          color: 'rgba02',
          link: '/orderSearch'
        },
        {
          name: 'View Productions',
          icon: 'fa-shopping-bag',
          color: 'rgba05',
          link: '/orderSearch'
        },
        {
          name: 'View Articles',
          icon: 'fa-newspaper-o',
          color: 'rgba04',
          link: '/articles'
        }
      ],
      btns1: [
        {
          name: 'My Address',
          icon: 'al-wodedizhi',
          color: 'color-address',
          link: '/address'
        },
        {
          name: 'My Shares',
          icon: 'al-ai-share',
          color: 'color-share',
          link: '/share'
        },
        {
          name: 'My Favorites',
          icon: 'al-qietu19',
          color: 'color-favorite',
          link: '/favorite'
        },
        {
          name: 'Exit',
          icon: 'al-tuichu3',
          color: 'color-exit',
          link: '/exit'
        }
      ]
    }
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

#personal-center .weui-grids {
  background-color: #ffffff;
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
