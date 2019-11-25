<template>
  <div class="containerarea font14">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <div v-if="showContainer && bargainbuyType" class="h_100">
      <template v-if="showBargainbuy">
        <bargainbuy :data="data" :product="product" :user="loginUser" :on-join="joinSuccess"></bargainbuy>
      </template>
      <template v-if="showBargainbuyView">
        <bargainbuy-view
          :data="data"
          :product="product"
          :crowduser="crowduser"
          :cutdown-end="cutdownCallback"
          :user="loginUser"
          :cut-data="cutData">
        </bargainbuy-view>
      </template>
      <template v-if="showBargianbuyDetail">
        <bargainbuy-detail
          :data="data"
          :product="product"
          :crowduser="crowduser"
          :user="loginUser"
          :cut-data="cutData"
          :on-cut="cutSuccess"
          :on-join="joinSuccess"
          @access="access">
        </bargainbuy-detail>
      </template>
      <share-success
        v-show="showShareSuccess"
        v-if="data.uploader == loginUser.uid || query.wid == loginUser.uid || data.identity != 'user'"
        :data="data"
        :loginUser="loginUser"
        :module="module"
        :on-close="closeShareSuccess">
      </share-success>
    </div>
  </div>
</template>

<script>
import Bargainbuy from '@/components/Bargainbuy'
import BargainbuyView from '@/components/BargainbuyView'
import BargainbuyDetail from '@/components/BargainbuyDetail'
import ShareSuccess from '@/components/ShareSuccess'
import Sos from '@/components/Sos'
import ENV from 'env'
import { User } from '#/storage'
import Socket from '#/socket'

let room = ''
export default {
  components: {
    Bargainbuy, BargainbuyView, BargainbuyDetail, ShareSuccess, Sos
  },
  data () {
    return {
      showSos: false,
      sosTitle: '',
      showContainer: false,
      module: 'activity',
      bargainbuyType: false,
      showShareSuccess: false,
      showBargainbuy: false,
      showBargainbuyView: false,
      showBargianbuyDetail: false,
      query: {},
      loginUser: {},
      data: {},
      product: {},
      crowduserid: null,
      crowduser: null,
      cutData: []
    }
  },
  watch: {
    data () {
      return this.data
    },
    crowduser () {
      return this.crowduser
    },
    crowduserid () {
      return this.crowduserid
    }
  },
  methods: {
    initData () {
      this.showSos = false
      this.sosTitle = ''
      this.showContainer = false
      this.bargainbuyType = false
      this.showShareSuccess = false
      this.showBargainbuy = false
      this.showBargainbuyView = false
      this.showBargianbuyDetail = false
      this.query = {}
      this.data = {}
      this.product = {}
      this.crowduserid = null
      this.crowduser = null
      this.cutData = []
    },
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
    access () {
      this.$util.wxAccess()
    },
    getData () {
      const self = this
      this.$vux.loading.show()
      let infoparams = { id: this.query.id }
      if (this.crowduserid) {
        infoparams.crowduserid = this.crowduserid
      }
      if (this.query.share_uid) {
        infoparams.share_uid = this.query.share_uid
      }
      if (this.query.lastshareuid) {
        infoparams.lastshareuid = this.query.lastshareuid
      }
      this.$http.get(`${ENV.BokaApi}/api/activity/info`, {
        params: infoparams
      }).then(function (res) {
        self.$vux.loading.hide()
        let data = res.data
        if (data.flag !== 1) {
          self.showSos = true
          self.sosTitle = data.error
          self.showContainer = false
        } else {
          self.showSos = false
          self.sosTitle = ''
          self.showContainer = true
          self.data = data.data ? data.data : data
          self.createSocket()
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
            let curp = self.data.product
            if (!curp.wid) {
              curp.wid = self.data.retailer.uid
            }
            self.product = curp
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
            let sharephoto = self.loginUser.avatar
            if (inpage === 'view' || inpage === 'detail') {
              self.getCudata()
              if (self.data.havecreate) {
                sharetitle = `${self.loginUser.linkman}向你抛了一个媚眼，并诚恳的邀请你帮TA砍一刀！`
              } else {
                sharetitle = `${self.crowduser.linkman}向你抛了一个媚眼，并诚恳的邀请你帮TA砍一刀！`
                sharephoto = self.$util.getPhoto(self.data.photo)
              }
              sharedesc = '好友帮帮忙，优惠享更多！'
            } else {
              if (!self.data.havecreate) {
                sharephoto = self.$util.getPhoto(self.data.photo)
              }
            }
            let shareParams = {
              module: self.module,
              moduleid: self.data.id,
              title: sharetitle,
              desc: sharedesc,
              photo: sharephoto,
              link: sharelink,
              successCallback: function () {
                self.showShareSuccess = true
              }
            }
            if (self.query.share_uid) {
              shareParams.link = `${shareParams.link}&lastshareuid=${self.query.share_uid}`
              shareParams.lastshareuid = self.query.share_uid
            }
            self.$util.handleWxShare(shareParams)
          }
        }
      })
    },
    joinSuccess (crowduserid) {
      this.crowduserid = crowduserid
      this.getData()
    },
    cutSuccess () {
      this.getData()
      this.getCudata()
    },
    getCudata () {
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/activity/bargainUsers`, { id: this.crowduser.id }).then(function (res) {
        const data = res.data
        self.cutData = data.data ? data.data : data
      })
    },
    cutdownCallback () {
      this.getData()
    },
    createSocket () {
      const uid = this.loginUser.uid
      const linkman = this.loginUser.linkman
      // const fromId = this.query.fromId
      room = `${this.module}-${this.query.id}-${this.data.wid}`
      Socket.listening({room: room, uid: uid, linkman: linkman, fromModule: this.module, fromId: this.query.id})
    },
    init () {
      this.$util.wxAccessListening()
    },
    refresh (query) {
      this.loginUser = User.get()
      this.initData()
      this.query = query
      if (this.query.crowduserid) {
        this.crowduserid = this.query.crowduserid
      }
      this.loginUser = User.get()
      this.$vux.loading.show()
      this.getData()
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.$util.miniPost()
    this.refresh(this.$route.query)
  },
  beforeRouteUpdate (to, from, next) {
    this.refresh(to.query)
    next && next()
  }
  // beforeRouteLeave (to, from, next) {
  //   Socket.destory(room)
  //   next()
  // }
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
