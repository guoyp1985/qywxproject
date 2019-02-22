<template>
  <div class="containerarea bg-page font14 recommend-factory-page nobottom">
    <div class="pagetop db-flex b_bottom_after">
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
      <div class="bg-white b_bottom_after padding10">
        <div class="line-area">
          <div class="lineone line"></div>
          <div class="line-txt">如何推荐</div>
        </div>
        <div class="mt5 mb10">
          <div><span class="color-theme">第1步: </span><span>点击【厂家推荐码】，生成厂家海报，长按保存至手机后，发送给微信好友。</span></div>
          <div class="mt10"><span class="color-theme">第2步: </span><span>微信好友扫码并加盟该厂家后，你即可成为该微信好友的推荐人，微信好友自己购买以及推荐他人购买，你都可以获得推荐人佣金。</span></div>
        </div>
      </div>
      <div class="bg-white b_bottom_after padding10 mt10">
        <div class="line-area">
          <div class="lineone line"></div>
          <div class="line-txt">推荐记录</div>
        </div>
        <div class="mt5">
          <template v-if="disTabData1">
            <div v-if="!tabData1.length" class="emptyitem flex_center">
              <div>暂无推荐</div>
            </div>
            <template v-else>
              <div class="flex_left color-gray font12">我的推荐（共<span class="color-theme">{{count}}</span>人）</div>
              <div class="scroll_list ">
                <div v-for="(item,index) in tabData1" :key="item.id" class="scroll_item pl10 pr10 border-box font14 bg-white db b_bottom_after " style="color:inherit;">
                  <div class="t-table bg-white pt10 pb10">
            				<div class="t-cell v_middle w70" v-if="item.photo && item.photo != ''">
                      <img class="v_middle imgcover" style="width:60px;height:60px;" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                    </div>
              			<div class="t-cell v_middle">
                      <div class="clamp1 font16 pr10 color-lightgray">{{item.linkman}}</div>
                      <div class="color-gray font12 mt5">{{item.dateline | dateFormat}}</div>
              			</div>
              		</div>
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>
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
import {TransferDom, Popup} from 'vux'
import ENV from 'env'
import Time from '#/time'
import { User } from '#/storage'

const limit = 10

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup
  },
  filters: {
    dateFormat (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showApply: false,
      showContainer: false,
      query: {},
      loginUser: {},
      factoryInfo: {},
      pageStart1: 0,
      tabData1: [],
      disTabData1: false,
      showQrcode: false,
      recommendQrcode: null,
      count: 0
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
        }).then(res => {
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
          if (self.tabData1.length === (this.pageStart1 + 1) * limit) {
            self.pageStart1++
            self.$vux.loading.show()
            self.getData1()
          }
        }
      })
    },
    getData1 () {
      const self = this
      const params = { pagestart: this.pageStart1, limit: limit }
      this.$http.post(`${ENV.BokaApi}/api/retailer/factoryList`, params)
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabData1 = self.tabData1.concat(retdata)
        self.disTabData1 = true
      })
    },
    initData () {
      this.recommendQrcode = null
      this.disTabData1 = false
      this.pageStart1 = 0
      this.tabData1 = []
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
      this.initData()
      this.getData1()
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
  .line-area{
    width:100%;padding-top:10px;padding-bottom:10px;font-size:16px;position:relative;
    display:flex !important;justify-content: center; align-items: center;
    .line{width:80%;height:2px;background-color:#FF6B63;position:absolute;}
    .line-txt{width:100px;background-color:#fff;color:#FF6B63;position:relative;z-index:1;text-align:center}
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
