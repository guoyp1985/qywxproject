<template>
  <div class="containerarea bg-page font14 sellersearch-page">
    <subscribe v-if="loginUser.subscribe != 1 && !loginUser.isretailer"></subscribe>
    <apply-tip v-if="showApply"></apply-tip>
    <template v-if="showContainer">
      <div class="s-topbanner s-topbanner1">
        <div class="row">
          <search
            class="v-search bg-white"
            v-model='searchword1'
            :auto-fixed="autofixed"
            @on-submit="onSubmit1"
            @on-change="onChange1"
            @on-cancel="onCancel1"
            ref="search">
          </search>
        </div>
      </div>
      <div class="s-container s-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1')">
        <div v-if="distabdata1" class="scroll_list">
          <div v-if="!tabdata1 || tabdata1.length === 0" class="scroll_item padding10 align_center color-gray">
            <div><i class="al al-wushuju font60 pt20"></i></div>
            <div class="mt5">未搜索到相关数据</div>
          </div>
          <div class="scroll_list " v-else>
            <div class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in tabdata1" :key="item.id" style="color:inherit;">
              <div class="t-table bg-white pl10 pr10 pt10 pb10 border-box">
                <div class="t-cell v_middle w70">
                  <img class="avatarimg3 imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                </div>
                <div class="t-cell v_middle">
                  <div class="clamp1 font16 pr10">{{item.title}}</div>
                  <div class="clamp1 pr10 color-lightgray">推荐人: {{item.uploadname}}</div>
                  <div class="clamp1 pr10 color-lightgray">销售额: {{ $t('RMB') }}{{item.salesmoney}}</div>
                </div>
                <div class="align_right t-cell v_bottom w80">
                  <div class="btnicon bg-red color-white font12" @click="controlPopup1(item,index)">
                    <i class="al al-asmkticon0165 v_middle"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-transfer-dom>
        <popup class="menuwrap" v-model="showPopup1">
          <div class="popup0">
            <div class="list" v-if="clickData">
              <div class="item">
                <div class="inner" @click="clickPopup('level')">设置代理级别</div>
              </div>
              <router-link class="item" :to="{path:'/store',query:{wid:clickData.wid}}">
                <div class="inner">进入店铺</div>
              </router-link>
              <router-link class="item" :to="{path:'/factoryOrders',query:{wid:clickData.wid}}">
                <div class="inner">相关订单</div>
              </router-link>
              <router-link class="item" :to="{path:'/stat',query:{module:'factoryretailer',id:query.id,wid:clickData.wid}}">
                <div class="inner">统计</div>
              </router-link>
              <div class="item close mt10" @click="clickPopup">
                <div class="inner">{{ $t('Cancel txt') }}</div>
              </div>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showQrcode" height="100%">
          <div class="popup1 font14">
            <div class="popup-top flex_center">{{$t('Join qrcode')}}</div>
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
      <div v-transfer-dom class="x-popup">
        <popup v-model="showLevelPopup" height="100%">
          <div class="popup1">
            <div class="popup-top flex_center">设置代理级别</div>
            <div class="popup-middle font14">
              <div class="pt10 pb10 scroll_list">
                <div v-for="(item,index) in levelData" :key="index" class="scroll_item">
                  <check-icon class="x-check-icon pl12 pr12 pt10 pb10" :value.sync="item.checked" @click.native.stop="radioclick(item,index)">
                    <div class="t-table">
                      <div class="t-cell v_middle" style="color:inherit;">
                        <div class="clamp1 font14 color-999">等级名称: {{item.levelname}}</div>
                        <div class="clamp1 font14 color-999">销售额: {{ $t('RMB') }}{{item.money}}</div>
                      </div>
                    </div>
                  </check-icon>
                </div>
    					</div>
            </div>
            <div class="popup-bottom flex_center">
              <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeLevelPopup">{{ $t('Close') }}</div>
              <div class="flex_cell h_100 flex_center bg-green color-white" @click="submitLevel">提交</div>
            </div>
          </div>
        </popup>
      </div>
    </template>
  </div>
</template>
<i18n>
Add order1:
  zh-CN: 返点客
My orders:
  zh-CN: 我的订单
</i18n>
<script>
import { XTextarea, Group, XButton, Popup, TransferDom, XImg, Search, CheckIcon } from 'vux'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'

export default {
  directives: {
    TransferDom
  },
  components: {
    XTextarea, Group, XButton, Popup, XImg, Subscribe, ApplyTip, Search, CheckIcon
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showApply: false,
      showContainer: false,
      query: {},
      loginUser: {},
      distabdata1: false,
      tabdata1: [],
      limit: 10,
      pageStart1: 0,
      autofixed: false,
      searchword1: '',
      showPopup1: false,
      clickData: {},
      clickIndex: 0,
      showQrcode: false,
      showLevelPopup: false,
      levelData: [],
      levelName: {},
      selectLevel: null
    }
  },
  methods: {
    handleScroll: function (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.tabdata1.length === self.pageStart1 * self.limit) {
            self.pageStart1++
            self.getData1()
          }
        }
      })
    },
    onChange1 (val) {
      this.searchword1 = val
    },
    onCancel1 () {
      const self = this
      self.searchword1 = ''
      self.$vux.loading.show()
      self.distabdata1 = false
      self.tabdata1 = []
      self.pageStart1 = 0
      self.getData1()
    },
    onSubmit1 () {
      const self = this
      self.$vux.loading.show()
      self.distabdata1 = false
      self.tabdata1 = []
      self.pageStart1 = 0
      self.getData1()
    },
    getPhoto (src) {
      return this.$util.getPhoto(src)
    },
    disJoinQrcode () {
      const self = this
      self.showQrcode = true
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/factory/joinQRCode`, {
        fid: self.loginUser.fid
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        if (data.flag === 1) {
          let img = self.$refs.joinQrcode[0] ? self.$refs.joinQrcode[0] : self.$refs.joinQrcode
          img.src = data.data
        } else {
          self.$vux.toast.show({
            text: data.error,
            time: self.$util.delay(data.error)
          })
        }
      })
    },
    closeQrcode () {
      this.showQrcode = false
    },
    controlPopup1 (item, index) {
      event.preventDefault()
      this.showPopup1 = !this.showPopup1
      this.clickData = item
      this.clickIndex = index
    },
    clickPopup (key) {
      const self = this
      if (key === 'level') {
        self.showLevelPopup = true
        self.showPopup1 = false
        for (let i = 0; i < self.levelData.length; i++) {
          if (self.clickData.level.toString() === self.levelData[i].id.toString()) {
            self.selectLevel = self.levelData[i]
            self.levelData[i].checked = true
          } else {
            delete self.levelData[i].checked
          }
        }
      } else {
        self.showPopup1 = false
      }
    },
    closeLevelPopup () {
      this.showLevelPopup = false
    },
    radioclick (data, index) {
      const self = this
      if (data.checked) {
        self.selectLevel = data
      } else {
        self.selectLevel = null
      }
      for (let d of self.levelData) {
        if (d.id !== data.id && d.checked) {
          delete d.checked
          break
        }
      }
    },
    submitLevel () {
      const self = this
      if (!self.selectLevel) {
        self.$vux.toast.show('请选择代理级别', 'middle')
        return false
      }
      self.$vux.loading.show()
      const params = { fid: self.query.id, wid: self.clickData.wid, level: self.selectLevel.id }
      this.$http.post(`${ENV.BokaApi}/api/factory/changeRetailerLevel`, params)
      .then(res => {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.Data[self.clickIndex].level = self.selectLevel.id
              self.showLevelPopup = false
            }
          }
        })
      })
    },
    getData1 () {
      this.$vux.loading.show()
      const self = this
      const params = {fid: self.query.fid, pagestart: self.pageStart1, limit: self.limit}
      let keyword = self.searchword1
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        params.keyword = keyword
      }
      self.$http.get(`${ENV.BokaApi}/api/factory/retailerList`, {
        params: params
      }).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
      })
    },
    getData () {
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'orders'
      })
    },
    init () {
      this.loginUser = User.get()
      this.getData()
    },
    initContainer () {
      const self = this
      self.showApply = false
      self.showContainer = false
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.$vux.loading.show()
      this.loginUser = User.get()
      if (this.loginUser && (this.loginUser.subscribe === 1 || this.loginUser.isretailer)) {
        if (!this.loginUser.isretailer) {
          this.$vux.loading.hide()
          self.initContainer()
          this.showSos = true
        } else {
          self.initContainer()
          this.$vux.loading.hide()
          this.showContainer = true
          this.query = this.$route.query
          self.$http.get(`${ENV.BokaApi}/api/factory/info`, {
            params: { fid: self.query.fid }
          }).then(function (res) {
            self.$vux.loading.hide()
            let data = res.data
            let retdata = data.data ? data.data : data
            let levelpolicy = retdata.levelpolicy
            self.levelName = retdata.levelname
            self.levelData = []
            for (let key in levelpolicy) {
              self.levelData.push({id: key, money: levelpolicy[key], levelname: self.levelName[key]})
            }
          })
          if (self.query.keyword) {
            self.searchword1 = self.query.keyword
          }
          self.distabdata1 = false
          self.tabdata1 = []
          self.getData1()
        }
      }
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less" scoped>
.popup-deliver .fileinput{position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:transparent;opacity:0;}
.sellersearch-page{
  .scroll_item{overflow:hidden;position:relative;}
  .btnicon{
    display: inline-block;
    color: #ea3a3a;
    border: 1px solid #ea3a3a;
    text-align: center;
    border-radius: 30px;
    letter-spacing: 0px;
    height: 21px;
    width: 41px;
    line-height: 21px;
  }
}
</style>
