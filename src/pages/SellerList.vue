<template>
  <div class="containerarea bg-page font14 rproductlist">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="s-container scroll-container" style="top:0px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer', 'product')">
        <template v-if="disList">
          <template v-if="!Data || Data.length == 0">
            <div class="scroll_list">
              <div class="emptyitem">
                <div class="t-table" style="padding-top:20%;">
                  <div class="t-cell padding10">
                    <div>分享加盟二维码给卖家，卖家扫码即可帮你销售商品</div>
                    <div class="color-blue"><span @click="disJoinQrcode">点击此处分享加盟二维码</span></div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="scroll_list ">
              <div class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in Data" :key="item.id" style="color:inherit;">
                <div class="t-table bg-white pl10 pr10 pt10 pb10 border-box">
                  <div class="t-cell v_middle w70">
                    <img class="avatarimg3 imgcover" :src="item.avatar" onerror="javascript:this.src='http://vuxlaravel.boka.cn/images/user.jpg';" />
                  </div>
            			<div class="t-cell v_middle">
                    <div class="clamp1 font16 pr10">{{item.title}}</div>
                    <div class="clamp1 pr10 color-lightgray">代理级别: {{ levelName[item.level]}}</div>
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
          </template>
        </template>
      </div>
      <div v-transfer-dom>
        <popup class="menuwrap" v-model="showPopup1">
          <div class="popup0">
            <div class="list" v-if="clickData">
              <div class="item">
                <div class="inner" @click="clickPopup('level')">设置代理级别</div>
              </div>
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
Add factory:
  zh-CN: 添加厂商
</i18n>

<script>
import { TransferDom, Popup, Confirm, CheckIcon, XImg } from 'vux'
import ENV from 'env'
import { User } from '#/storage'
import Sos from '@/components/Sos'

let pageStart1 = 0
const limit = 10
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, Confirm, CheckIcon, XImg, Sos
  },
  data () {
    return {
      showSos: false,
      sosTitle: '抱歉，您暂无权限访问此页面！',
      showContainer: false,
      query: {},
      loginUser: {},
      Data: [],
      showPopup1: false,
      clickData: {},
      clickIndex: 0,
      showQrcode: false,
      disList: false,
      showLevelPopup: false,
      levelData: [],
      levelName: {},
      selectLevel: null
    }
  },
  methods: {
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
    handleScroll: function (refname, index) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.Data.length === (pageStart1 + 1) * limit) {
            pageStart1++
            self.$vux.loading.show()
            self.getData1()
          }
        }
      })
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
        self.$vux.toast.show('请选择提现数据', 'middle')
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
      const self = this
      const params = { params: { fid: self.query.id, pagestart: pageStart1, limit: limit } }
      this.$http.get(`${ENV.BokaApi}/api/factory/retailerList`, params)
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.Data = self.Data.concat(retdata)
        self.disList = true
      })
    },
    init () {
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'factory', action: 'list'
      })
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      if (this.loginUser) {
        this.$vux.loading.show()
        let isAdmin = false
        for (let i = 0; i < self.loginUser.usergroup.length; i++) {
          if (self.loginUser.usergroup[i] === 1) {
            isAdmin = true
            break
          }
        }
        if (!(self.loginUser.fid && parseInt(self.loginUser.fid) === parseInt(self.$route.query.id)) && !isAdmin) {
          this.$vux.loading.hide()
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          this.$vux.loading.hide()
          this.query = this.$route.query
          self.$http.get(`${ENV.BokaApi}/api/factory/info`, {
            params: { fid: self.query.id }
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
            if (self.Data.length < limit) {
              self.disList = false
              self.Data = []
              self.$vux.loading.show()
              pageStart1 = 0
              self.getData1()
            }
          })
        }
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

<style lang="less" scoped>
.rproductlist .scroll_item{overflow:hidden;position:relative;}
.rproductlist .btnicon{
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
.rproductlist .l-line{
  width:100%;
  height:8px;
  background:#fff;
}
</style>
