<template>
  <div class="containerarea bg-page font14 recommend-factory-page nobottom">
    <div class="pagetop db-flex">
      <div class="pic flex_left">
        <img :src="factoryInfo.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
      </div>
      <div class="flex_cell flex_left">
        <div class="clamp1 w_100">{{factoryInfo.title}}</div>
      </div>
      <div class="w80 flex_right">
        <div class="btn bg-theme color-white flex_center" @click="createQrcode">厂家推荐码</div>
      </div>
    </div>
    <div class="pagemiddle" ref="scrollContainer" @scroll="handleScroll('scrollContainer', 0)">
      <template v-if="disTabData1">
        <div v-if="!tabData1 || tabData1.length == 0" class="emptyitem flex_center">
          <div>暂无加盟厂家</div>
        </div>
        <div v-else class="scroll_list ">
          <router-link v-for="(item,index) in tabData1" :key="item.id" :to="{path:'/factory',query:{id:item.id, wid: loginUser.uid}}" class="scroll_item pl10 pr10 border-box mb10 font14 bg-white db list-shadow " style="color:inherit;">
            <div class="t-table bg-white pt10 pb10">
      				<div class="t-cell v_middle w70" v-if="item.photo && item.photo != ''">
                <img class="v_middle imgcover" style="width:60px;height:60px;" :src="$util.getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
              </div>
        			<div class="t-cell v_middle">
                <div class="clamp1 font16 pr10 color-lightgray">{{item.title}}</div>
                <!-- <div class="clamp1 color-999">当前等级: {{ item.levelname }}</span></div> -->
        			</div>
              <div class="t-cell v_middle w100">
                <div class="btnicon bg-theme color-white font12">推荐好友加盟</div>
              </div>
        		</div>
          </router-link>
        </div>
      </template>
    </div>
    <div v-transfer-dom>
      <popup class="menuwrap" v-model="showPopup1">
        <div class="popup0">
          <div class="list" v-if="clickData">
            <div class="item">
              <div class="inner" @click="clickPopup('push')">设置管理员</div>
            </div>
            <div class="item">
              <div class="inner" @click="clickPopup('set')">设置</div>
            </div>
            <div class="item">
              <div class="inner" @click="clickPopup('edit')">编辑</div>
            </div>
            <div class="item">
              <div class="inner" @click="clickPopup('retailer')">卖家</div>
            </div>
            <div class="item close mt10" @click="clickPopup('row.key')">
              <div class="inner">{{ $t('Cancel txt') }}</div>
            </div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showQrcode" height="100%">
        <div class="popup1 font14">
          <div class="popup-top flex_center">厂家推荐码</div>
          <div class="popup-middle padding10 border-box flex_center" style="bottom:86px;">
            <img ref="joinQrcode" class="qrcode" style="max-width:100%;max-height:100%;" />
          </div>
          <div class="flex_center border-box pl10 pr10 color-red font12" style="position:absolute;left:0;right:0;bottom:46px;height:40px;">
            <div>保存图片发送给好友，邀请加盟</div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeQrcode">{{ $t('Close') }}</div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<i18n>
Add factory:
  zh-CN: 添加厂家
</i18n>

<script>
import { TransferDom, Popup, Confirm, CheckIcon, XImg, Tab, TabItem, Swiper, SwiperItem } from 'vux'
import ENV from 'env'
import { User } from '#/storage'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'

let pageStart1 = 0
let pageStart2 = 0
const limit = 10

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, Confirm, CheckIcon, XImg, Tab, TabItem, Swiper, SwiperItem, Subscribe, ApplyTip
  },
  data () {
    return {
      showApply: false,
      showContainer: false,
      query: {},
      loginUser: {},
      factoryInfo: {},
      tabtxts: [ '已分销', '未分销' ],
      selectedIndex: 0,
      tabData1: [],
      tabData2: [],
      disTabData1: false,
      disTabData2: false,
      showPopup1: false,
      clickData: {},
      clickIndex: 0,
      showQrcode: false,
      recommendQrcode: null
    }
  },
  methods: {
    getPhoto (src) {
      return this.$util.getPhoto(src)
    },
    createQrcode () {
      const self = this
      self.showQrcode = true
      if (!this.recommendQrcode) {
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/retailer/createFactoryPoster`, {
          fid: self.query.id
        }).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          if (data.flag === 1) {
            this.recommendQrcode = data.data
            let img = self.$refs.joinQrcode[0] ? self.$refs.joinQrcode[0] : self.$refs.joinQrcode
            img.src = this.recommendQrcode
          } else {
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error)
            })
          }
        })
      }
    },
    closeQrcode () {
      this.showQrcode = false
    },
    handleScroll: function (refname, index) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (index === 0) {
            if (self.tabData1.length === (pageStart1 + 1) * limit) {
              pageStart1++
              self.$vux.loading.show()
              self.getData1()
            }
          } else if (index === 1) {
            if (self.tabData2.length === (pageStart2 + 1) * limit) {
              pageStart2++
              self.$vux.loading.show()
              self.getData2()
            }
          }
        }
      })
    },
    swiperChange (index) {
      if (index !== undefined) {
        this.selectedIndex = index
      }
      switch (this.selectedIndex) {
        case 0:
          if (this.tabData1.length < limit) {
            pageStart1 = 0
            this.disTabData1 = false
            this.tabData1 = []
            this.getData1()
          }
          break
        case 1:
          if (this.tabData2.length < limit) {
            pageStart2 = 0
            this.disTabData2 = false
            this.tabData2 = []
            this.getData2()
          }
          break
      }
    },
    getData1 () {
      const self = this
      const params = { pagestart: pageStart1, limit: limit }
      this.$http.post(`${ENV.BokaApi}/api/retailer/factoryList`, params)
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabData1 = self.tabData1.concat(retdata)
        self.disTabData1 = true
      })
    },
    getData2 () {
      const self = this
      const params = { params: { pagestart: pageStart2, limit: limit } }
      this.$http.get(`${ENV.BokaApi}/api/factory/list`, params)
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabData2 = self.tabData2.concat(retdata)
        self.disTabData2 = true
      })
    },
    initContainer () {
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
      this.recommendQrcode = null
      self.$http.get(`${ENV.BokaApi}/api/factory/info`, {
        params: { fid: self.query.id }
      }).then(res => {
        self.$vux.loading.hide()
        let data = res.data
        let retdata = data.data ? data.data : data
        self.factoryInfo = retdata
      })
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.recommend-factory-page{
  .pagetop{
    padding-left:10px;padding-right:10px;box-sizing: border-box;
    .pic{
      width:40px;height:100%;
      img{width:30px;height:30px;border-radius:50%;}
    }
    .btn{width:75px;height:25px;border-radius:30px;font-size:12px;}
  }
  .scroll_item{overflow:hidden;position:relative;}
  .btnicon{
    display: inline-block;
    text-align: center;
    border-radius: 30px;
    letter-spacing: 0px;
    height: 25px;
    line-height: 25px;
    padding:0 10px;
  }
}

</style>
