/*
* @description: 分享详情页面
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="sharing-detail" class="containerarea font14 bg-page nobottom">
    <div class="pagetop flex_left font18 pl10 border-box">{{$t('Share view user')}}</div>
    <div class="pagemiddle bg-white scroll-container" ref="scrollContainer" @scroll="handleScroll">
      <group>
        <template v-if="disList">
          <div v-if="!list || list.length == 0" class="emptyitem flex_center">暂无用户查看</div>
          <cell v-else class="font13" v-for="(item, index) in list" :key="index">
            <x-img slot="icon" class="avatarimg2 imgcover" :src="item.avatar" container=".scroll-container"></x-img>
            <div slot="inline-desc" class="pl10 pr10">
              <div class="clamp1"><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{item.linkman}}</div>
              <div class="mt5 clamp1 font12 color-gray">{{item.dateline | dateFormat}}</div>
            </div>
          </cell>
        </template>
      </group>
    </div>
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
      loginUser: {},
      query: {},
      disList: false,
      list: [],
      pagestart: 0,
      limit: 20
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
    handleScroll: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer,
        callback: function () {
          if (self.list.length === (self.pagestart + 1) * self.limit) {
            self.pagestart++
            self.$vux.loading.show()
            self.getData()
          }
        }
      })
    },
    getDateState (dt) {
      return this.$util.getDateState(dt)
    },
    getDateClass (dt) {
      let ret = this.$util.getDateClass(dt)
      ret = `${ret} mr5`
      return ret
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
      })
    },
    init () {
      this.loginUser = User.get()
      this.$vux.loading.show()
      this.getData()
    },
    refresh () {
      this.query = this.$route.query
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
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
