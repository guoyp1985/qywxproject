<template>
  <div id="personal-credit">
    <!-- <c-title :link-info="{path:'/profile'}"
            :link-credit="{path:'/credit'}">
    </c-title> -->
    <group>
      <group-title slot="title">{{$t('Sharing Details')}}</group-title>
      <cell v-for="(item, index) in items"
      :key="index"
      class="share-item font14"
      align-items
      :title="item.title"
      :inline-desc="item.dateline | dateFormat"
      :link="{name: 'sharingDetail', params: {id: item.id}}"
      is-link="false">
        <x-img slot="icon" default-src="../assets/_images/nopic.jpg" :src="item.src"></x-img>
        <div>
          <span class="al al-jinbi color-gold"></span>
          <span class="color-red credit-txt">{{ item.credit | valueFormat }}</span>
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
import { Group, GroupTitle, Cell, XImg } from 'vux'
import Time from '../../libs/time'

export default {
  components: {
    Group,
    GroupTitle,
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
          dateline: 1522659301220,
          credit: 50
        },
        {
          src: 'http://somedomain.somdomain/x.jpg',
          title: '分享',
          dateline: 1522659301220,
          credit: -50
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
#personal-credit .credit-txt {
  vertical-align: super;
}

/* weui css hack */
#personal-credit .vux-cell-primary {
  margin-left: 10px;
}
#personal-credit .weui-cell__ft {
  padding-right: 20px;
}
</style>
