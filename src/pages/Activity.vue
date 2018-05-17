<template>
  <div class="containerarea font14">
    <div v-show="bargainbuyType" class="h_100">
      <template v-if="showBargainbuy">
        <bargainbuy :data="data" :user="loginUser" :on-join="joinSuccess"></bargainbuy>
      </template>
      <template v-if="showBargainbuyView">
        <bargainbuy-view :data="data" :crowduser="crowduser" :cutdown-end="cutdownCallback" :user="loginUser" :cut-data="cutData"></bargainbuy-view>
      </template>
      <template v-if="showBargianbuyDetail">
        <bargainbuy-detail :data="data" :crowduser="crowduser" :user="loginUser":cut-data="cutData" :on-cut="cutSuccess" :on-join="joinSuccess"></bargainbuy-detail>
      </template>
      <share-success
        v-show="showShareSuccess"
        v-if="data.uploader == loginUser.uid || query.wid == loginUser.uid || data.identity != 'user'"
        :data="data"
        :loginUser="loginUser"
        module="activity"
        :on-close="closeShareSuccess">
      </share-success>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import Bargainbuy from '@/components/Bargainbuy'
import BargainbuyView from '@/components/BargainbuyView'
import BargainbuyDetail from '@/components/BargainbuyDetail'
import ShareSuccess from '@/components/ShareSuccess'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'

export default {
  components: {
    Bargainbuy, BargainbuyView, BargainbuyDetail, ShareSuccess
  },
  data () {
    return {
      bargainbuyType: false,
      showShareSuccess: false,
      showBargainbuy: false,
      showBargainbuyView: false,
      showBargianbuyDetail: false,
      query: {},
      loginUser: {},
      data: {},
      product: Object,
      crowduserid: null,
      crowduser: null,
      cutData: []
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
    },
    crowduser: function () {
      return this.crowduser
    },
    crowduserid: function () {
      return this.crowduserid
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
    closeShareSuccess () {
      this.showShareSuccess = false
    },
    getInfo () {
      const self = this
      self.$vux.loading.show()
      let infoparams = { id: self.query.id }
      if (self.crowduserid) {
        infoparams.crowduserid = self.crowduserid
      }
      if (self.query.share_uid) {
        infoparams.share_uid = self.query.share_uid
      }
      if (self.query.lastshareuid) {
        infoparams.lastshareuid = self.query.lastshareuid
      }
      self.$http.get(`${ENV.BokaApi}/api/activity/info`, {
        params: infoparams
      }).then(function (res) {
        self.$vux.loading.hide()
        let data = res.data
        self.data = data.data ? data.data : data
        if (self.data.title) {
          document.title = self.data.title
        }
        if (self.data.type === 'bargainbuy') {
          self.bargainbuyType = true
          let sharelink = `${ENV.Host}/#/activity?id=${self.data.id}&share_uid=${self.loginUser.uid}`
          if (self.data.crowduser && self.data.crowduser.id) {
            self.crowduser = self.data.crowduser
            sharelink = `${sharelink}&crowduserid=${self.crowduser.id}`
          }
          self.product = self.data.product
          let inpage = ''
          if (self.crowduserid && self.crowduser) {
            if (self.loginUser.uid === self.crowduser.crowdowner) {
              self.showView()
              inpage = 'view'
            } else {
              self.showDetail()
              inpage = 'detail'
            }
          } else {
            if (self.crowduser) {
              self.showView()
              inpage = 'view'
            } else {
              self.showMain()
              inpage = 'main'
            }
          }
          let sharetitle = self.data.title
          let sharedesc = self.data.title
          if (inpage === 'view' || inpage === 'detail') {
            self.getCudata()
            sharetitle = `${self.loginUser.linkman}向你抛了一个媚眼，并诚恳的邀请你帮TA砍一刀！`
            sharedesc = '好友帮帮忙，优惠享更多！'
          }
          self.$util.handleWxShare({
            module: 'activity',
            moduleid: self.data.id,
            lastshareuid: self.query.share_uid,
            title: sharetitle,
            desc: sharedesc,
            photo: self.loginUser.avatar,
            link: sharelink,
            successCallback: function () {
              self.showShareSuccess = true
            }
          })
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
      self.getCudata()
    },
    getCudata () {
      const self = this
      self.$http.post(`${ENV.BokaApi}/api/activity/bargainUsers`, { id: self.crowduser.id }).then(function (res) {
        let data = res.data
        self.cutData = data.data ? data.data : data
      })
    },
    cutdownCallback () {
      const self = this
      self.getInfo()
    },
    createdFun (to, from, next) {
      const user = User.get()
      if (user && !user.subscribe) {
        const originHref = encodeURIComponent(location.href)
        location.replace(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${originHref}&response_type=code&scope=snsapi_userinfo&state=fromWx#wechat_redirect`)
      } else {
        this.$http.get(`${ENV.BokaApi}/api/user/show`)
      }
      this.$vux.loading.show()
      this.$store.commit('updateToggleTabbar', {toggleBar: false})
      this.query = to.query
      if (this.query.crowduserid) {
        this.crowduserid = this.query.crowduserid
      }
      this.loginUser = User.get()
      this.getInfo()
      next()
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.createdFun(to, from, next)
  },
  created () {
    this.createdFun(this.$route)
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
