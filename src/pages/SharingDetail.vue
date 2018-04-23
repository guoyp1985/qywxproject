/*
* @description: 分享详情页面
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="sharing-detail">
    <group>
      <group-title slot="title">{{$t('Credit Details')}}</group-title>
      <cell class="font13" v-for="(item, index) in list" :key="index" :title="item.linkman">
        <x-img slot="icon" class="avatar" :src="item.avatar"></x-img>
        <span slot="inline-desc" class="font13">
          {{item.dateline | dateFormat}}
        </span>
        <div>
          <span class="al al-jinbi color-gold"></span>
          <span class="color-red credit-txt">{{ item.credit | valueFormat }}</span>
        </div>
      </cell>
    </group>
  </div>
</template>
<script>
import { Group, GroupTitle, Cell, XImg } from 'vux'
import Time from '#/time'
import ENV from '#/env'
export default {
  components: {
    Group,
    GroupTitle,
    Cell,
    XImg
  },
  data () {
    return {
      list: [
        {
          avatar: '',
          linkman: 'simon',
          dateline: 1522659301220,
          credit: 50
        }
      ]
    }
  },
  filters: {
    dateFormat (value) {
      return new Time(value).dateFormat('yyyy-MM-dd hh:mm')
    },
    valueFormat: function (value) {
      return Number(value) < 0 ? `${value}` : `+${value}`
    }
  },
  methods: {
    getData () {
      this.$http.get(`${ENV.BokaApi}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
    }
  }
}
</script>
<style lang="less">
#sharing-detail .credit-txt {
  vertical-align: super;
}
#sharing-detail .avatar {
  width: 40px;
  height: 40px;
}
</style>
