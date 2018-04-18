<template>
  <div id="personal-credit">
    <!-- <c-title :link-info="{path:'/profile'}"
            :link-credit="{path:'/credit'}">
    </c-title> -->
    <group>
      <cell v-for="(item, index) in items" :key="index" class="share-item" align-items :title="item.title" :inline-desc="item.date | dateFormat">
        <x-img slot="icon" default-src="../assets/_images/nopic.jpg" :src="item.src"></x-img>
        <div slot="child">
          <span class="al al-jinbi color-gold"></span>
          <span class="color-red">{{ item.value | valueFormat }}</span>
        </div>
      </cell>
    </group>
  </div>
</template>

<i18n>
Sharing Details:
  zh-CN: 分享明细
</i18n>

<script>
import { Group, Cell, XImg } from 'vux'
import CTitle from './CTitle'
import Time from '../../libs/time'

export default {
  components: {
    CTitle,
    Group,
    Cell,
    XImg
  },
  data () {
    return {
      type: '1',
      items: [
        {
          src: 'http://somedomain.somdomain/x.jpg',
          title: '分享',
          date: 1522659301220,
          value: 50
        },
        {
          src: 'http://somedomain.somdomain/x.jpg',
          title: '分享',
          date: 1522659301220,
          value: -50
        }
      ]
    }
  },
  filters: {
    dateFormat: function (isoDate) {
      return `${new Time(isoDate).dateFormat('yyyy-MM-dd hh:mm')} 分享给朋友`
    },
    valueFormat: function (value) {
      return Number(value) < 0 ? `${value}` : `+${value}`
    }
  }
}
</script>

<style lang="less">
#personal-credit .share-item img {
  width: 60px;
  float: left;
}

/* weui css hack */
#personal-credit .vux-cell-primary {
  margin-left: 10px;
}
</style>
