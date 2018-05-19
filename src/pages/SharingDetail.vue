/*
* @description: 分享详情页面
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="sharing-detail">
    <group>
      <group-title slot="title">{{$t('Share view user')}}</group-title>
      <template v-if="disList">
        <div v-if="!list || list.length == 0" class="emptyitem flex_center">暂无用户查看</div>
        <cell v-else class="font13" v-for="(item, index) in list" :key="index">
          <x-img slot="icon" class="avatarimg2 imgcover" :src="item.avatar"></x-img>
          <div slot="inline-desc" class="pl10 pr10">
            <div class="clamp1"><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{item.linkman}}</div>
            <div class="mt5 clamp1 font12 color-gray">{{item.dateline | dateFormat}}</div>
          </div>
        </cell>
      </template>
    </group>
  </div>
</template>
<script>
import { Group, GroupTitle, Cell, XImg } from 'vux'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'
export default {
  components: {
    Group, GroupTitle, Cell, XImg
  },
  data () {
    return {
      loginUser: Object,
      query: Object,
      disList: false,
      list: [],
      pagestart: 0,
      limit: 10,
      isBindScroll: false,
      scrollContainer: document.querySelector('#vux_view_box_body')
    }
  },
  filters: {
    dateFormat (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    },
    valueFormat: function (value) {
      return Number(value) < 0 ? `${value}` : `+${value}`
    }
  },
  methods: {
    scroll: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollContainer,
        callback: function () {
          if (self.list.length === (self.pagestart + 1) * self.limit) {
            self.pagestart++
            self.$vux.loading.show()
            self.getData()
          }
        }
      })
    },
    getData () {
      const self = this
      let params = { uid: self.loginUser.uid, moduleid: self.query.id, pagestart: self.pagestart, limit: self.limit }
      this.$http.get(`${ENV.BokaApi}/api/list/shareview`, {
        params: params
      })
      .then(res => {
        self.$vux.loading.hide()
        let data = res.data
        let retdata = data.data ? data.data : data
        self.list = self.list.concat(retdata)
        self.disList = true
        if (!self.isBindScroll) {
          self.isBindScroll = true
          self.scrollContainer.removeEventListener('scroll', self.scroll)
          self.scrollContainer.addEventListener('scroll', self.scroll)
        }
      })
    },
    getDateState: function (dt) {
      return this.$util.getDateState(dt)
    },
    getDateClass: function (dt) {
      let ret = this.$util.getDateClass(dt)
      ret = `${ret} mr5`
      return ret
    }
  },
  created () {
    const self = this
    self.query = self.$route.query
    self.loginUser = User.get()
    self.$vux.loading.show()
    self.getData()
  }
}
</script>
<style lang="less" scoped>
#sharing-detail .credit-txt {
  vertical-align: super;
}
#sharing-detail .avatar {
  width: 40px;
  height: 40px;
}
</style>
