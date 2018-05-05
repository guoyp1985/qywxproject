<template>
  <div class="h_100">
    <template v-if="showBargainbuy">
      <Bargainbuy :data="data" :user="loginUser" :on-join="joinSuccess"></Bargainbuy>
    </template>
    <template v-if="showBargainbuyView">
      <BargainbuyView :data="data" :crowduser="crowduser" :user="loginUser"></BargainbuyView>
    </template>
    <template v-if="showBargianbuyDetail">
      <BargainbuyDetail :data="data" :crowduser="crowduser" :user="loginUser" :on-cut="cutSuccess" :on-join="joinSuccess"></BargainbuyDetail>
    </template>
  </div>
</template>

<i18n>
</i18n>

<script>
import Bargainbuy from '@/components/Bargainbuy'
import BargainbuyView from '@/components/BargainbuyView'
import BargainbuyDetail from '@/components/BargainbuyDetail'
import Time from '#/time'
import ENV from '#/env'
import { User } from '#/storage'

export default {
  components: {
    Bargainbuy,
    BargainbuyView,
    BargainbuyDetail
  },
  data () {
    return {
      showBargainbuy: false,
      showBargainbuyView: false,
      showBargianbuyDetail: false,
      query: {},
      loginUser: {},
      data: {},
      product: Object,
      crowduserid: null,
      crowduser: null
    }
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  watch: {
    data: function () {
      return this.data
    }
  },
  methods: {
    showMain () {
      const self = this
      self.showBargainbuy = true
      self.showBargainbuyView = false
      self.showBargianbuyDetail = false
    },
    showView () {
      const self = this
      self.showBargainbuy = false
      self.showBargainbuyView = true
      self.showBargianbuyDetail = false
    },
    showDetail () {
      const self = this
      self.showBargainbuy = false
      self.showBargainbuyView = false
      self.showBargianbuyDetail = true
    },
    getInfo () {
      const self = this
      let params = { params: { id: self.query.id } }
      if (self.crowduserid) {
        params.params.crowduserid = self.crowduserid
      }
      self.$http.get(`${ENV.BokaApi}/api/activity/info`, params).then(function (res) {
        let data = res.data
        self.data = data.data ? data.data : data
        if (self.data.crowduser && self.data.crowduser.length !== 0) {
          self.crowduser = self.data.crowduser
        }
        document.title = self.data.title
        let host = self.$util.getHost()
        self.$util.wxShare({
          data: {
            title: `${self.loginUser.linkman}向你抛了一个媚眼，并诚恳的邀请你帮TA砍一刀！`,
            desc: '好友帮帮忙，优惠享更多！',
            link: `${host}/bargainbuy?id=${self.data.id}&crowduserid=${self.crowduser.crowdowner}&share_uid=${self.loginUser.uid}`,
            imgUrl: self.data.photo
          }
        })
        self.product = self.data.product
        if (self.crowduserid && self.crowduser) {
          if (self.loginUser.uid === self.crowduser.crowdowner) {
            self.showView()
          } else {
            self.showDetail()
          }
        } else {
          if (self.crowduser) {
            self.showView()
          } else {
            self.showMain()
          }
        }
      })
    },
    joinSuccess (crowduserid) {
      const self = this
      self.crowduserid = crowduserid
      self.getInfo()
    },
    cutSuccess () {
      const self = this
      self.getInfo()
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.query = self.$route.query
    if (self.query.crowduserid) {
      self.crowduserid = self.query.crowduserid
    }
    self.loginUser = User.get()
    self.getInfo()
  }
}
</script>

<style lang="less" scoped>
.bargainbuy {
    background-image: linear-gradient(-180deg, #f32a3d 0%, #FF8048 100%);
}
.bargainbuy .topimg img {
    width: 100%;
    vertical-align: middle;
}
.bargainbuy .boxarea {
  box-sizing: border-box;
  width: 94%;
  margin: 0 auto;
  background-color: #eee;
  padding: 5px;
  border-radius: 50px;
  border: 6px solid #fff;
}
.bargainbuy .productarea .pic{width:80px;text-align:left;}
.bargainbuy .productarea .pic img{
  width:70px;height:70px;border-radius:50%;
  vertical-align:middle;
}
.bargainbuy .btn{
  width: 90%;
  background-image: linear-gradient(90deg, #EC3F57 0%, #FF8147 99%);
  box-shadow: 0 5px 8px 0 #C13123;
  border-radius: 100px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  color: white;
  font-size: 18px;
  margin: 16px auto 10px auto;
  cursor: pointer;
  letter-spacing: 2px;
}
</style>
