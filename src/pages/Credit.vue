/*
* @description: 金币详情页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="personal-credit">
    <!-- <c-title :link-info="{path:'/profile'}"
            :link-credit="{path:'/credit'}">
    </c-title> -->
    <group :title="$t('Credit Details')">
      <cell v-for="(item, index) in items" :key="index" class="credit-item" align-items :title="item.title" :inline-desc="item.date | dateFormat">
        <img slot="icon" src="../assets/_images/nopic.jpg"/>
        <div slot="child">
          <span class="al al-jinbi color-gold"></span>
          <span class="color-red">{{ item.value | valueFormat }}</span>
        </div>
      </cell>
    </group>
  </div>
</template>
<script>
import { Group, Cell } from 'vux'
import CTitle from '@/components/CTitle'
import Time from '../../libs/time'

export default {
  components: {
    CTitle,
    Group,
    Cell
  },
  data () {
    return {
      type: '1',
      items: [
        {
          src: 'http://somedomain.somdomain/x.jpg',
          title: '注册',
          date: 1522659301220,
          value: 50
        },
        {
          src: 'http://somedomain.somdomain/x.jpg',
          title: '注册',
          date: 1522659301220,
          value: -50
        }
      ]
    }
  },
  filters: {
    dateFormat: function (isoDate) {
      return new Time(isoDate).dateFormat('yyyy-MM-dd hh:mm:ss')
    },
    valueFormat: function (value) {
      return Number(value) < 0 ? `${value}` : `+${value}`
    }
  }
}
</script>

<style lang="less">
#personal-credit .credit-item img {
  width: 60px;
  float: left;
}

/* weui css hack */
#personal-credit .vux-cell-primary {
  margin-left: 10px;
}
</style>
