/*
* @description: 分享详情页面
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="sharing-detail" class="containerarea font14 bg-page nobottom">
    <div class="s-topbanner s-topbanner1 flex_left font16 pl10 border-box b_bottom_after">{{$t('Share view user')}}</div>
    <div class="s-container s-container1 bg-white scroll-container" ref="scrollContainer" @scroll="handleScroll">
      <group>
        <template v-if="disList">
          <div v-if="!list || list.length == 0" class="emptyitem flex_center font14 color-gray">暂无用户查看</div>
          <cell v-else class="font13" v-for="(item, index) in list" :key="index">
            <img slot="icon" class="avatarimg2 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
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

const limit = 10
let pageStart = 0
export default {
  components: {
    Group, GroupTitle, Cell, XImg
  },
  data () {
    return {
      loginUser: {},
      query: {},
      disList: false,
      list: []
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
          if (self.list.length === (pageStart + 1) * limit) {
            pageStart++
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
      let params = { uid: self.loginUser.uid, moduleid: self.query.id, pagestart: pageStart, limit: limit }
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
    },
    refresh () {
      this.query = this.$route.query
      if (this.list.length < limit) {
        pageStart = 0
        this.disList = false
        this.list = []
        this.getData()
      }
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
<style lang="less">
#sharing-detail .credit-txt {
  vertical-align: super;
}
#sharing-detail .avatar {
  width: 40px;
  height: 40px;
}
#sharing-detail .s-topbanner{background:transparent;}
#sharing-detail .weui-cells{margin-top:0;}
#sharing-detail .weui-cells:before{display: none;}
#sharing-detail .weui-cells:last-child::after{display: none;}
</style>
