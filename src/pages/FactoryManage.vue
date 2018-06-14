<template>
  <div class="containerarea bg-page font14 s-havebottom rproductlist">
    <div class="s-container scroll-container" style="top:0px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer', 'product')">
      <template v-if="disList">
        <template v-if="!Data || Data.length == 0">
          <div class="scroll_list">
            <div class="emptyitem">
              <div class="t-table" style="padding-top:20%;">
                <div class="t-cell padding10">暂无厂商数据</div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="scroll_list ">
            <router-link :to="{path:'/factory',query:{id:item.id, wid: loginUser.uid}}" class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in Data" :key="item.id" style="color:inherit;">
              <div v-if="item.moderate == 0" class="icon down"></div>
          		<div class="t-table bg-white pt10 pb10">
          			<div class="t-cell v_middle pl12">
                  <div class="clamp1 font16 pr10 color-lightgray">{{item.title}}</div>
                  <div class="t-table pr12 border-box mt15">
                    <div class="t-cell color-999 font14">
                      <div class="clamp1">{{ item.summary }}</span></div>
                    </div>
                    <div class="align_right t-cell v_bottom w80">
                      <div class="btnicon bg-red color-white font12" @click="controlPopup1(item,index)">
                        <i class="al al-asmkticon0165 v_middle"></i>
                      </div>
                    </div>
                  </div>
          			</div>
          		</div>
            </router-link>
          </div>
        </template>
      </template>
    </div>
    <div class="s-bottom flex_center pl12 pr12 list-shadow02 bg-white">
      <router-link class="addproduct flex_cell flex_center btn-bottom-red" to="/addFactory">{{ $t('Add factory') }}</router-link>
    </div>
    <div v-transfer-dom>
      <popup class="menuwrap" v-model="showPopup1">
        <div class="popup0">
          <div class="list" v-if="clickData">
            <div class="item">
              <div class="inner" @click="clickPopup('push')">设置管理员</div>
            </div>
            <div class="item">
              <div class="inner" @click="clickPopup('set')">设置佣金</div>
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
          <div class="popup-top flex_center">设置管理员</div>
          <div class="popup-middle padding10 border-box flex_center" style="bottom:86px;">
            <img ref="adminQrcode" class="qrcode" style="max-width:100%;max-height:100%;" />
          </div>
          <div class="flex_center border-box pl10 pr10 color-red font12" style="position:absolute;left:0;right:0;bottom:46px;height:40px;">
            <div>扫描二维码设置管理员</div>
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
  zh-CN: 添加厂商
</i18n>

<script>
import { TransferDom, Popup, Confirm, CheckIcon, XImg } from 'vux'
import ENV from 'env'

let pageStart1 = 0
const limit = 10
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, Confirm, CheckIcon, XImg
  },
  data () {
    return {
      query: {},
      loginUser: {},
      Data: [],
      showPopup1: false,
      clickData: {},
      clickIndex: 0,
      showQrcode: false,
      disList: false
    }
  },
  methods: {
    getPhoto (src) {
      return this.$util.getPhoto(src)
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
      if (key === 'push') {
        self.showPopup1 = false
        self.showQrcode = true
        self.$vux.loading.show()
        self.$http.get(`${ENV.BokaApi}/api/factory/adminQRCode`, {
          params: {fid: self.clickData.id}
        }).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          if (data.flag === 1) {
            let img = self.$refs.adminQrcode[0] ? self.$refs.adminQrcode[0] : self.$refs.adminQrcode
            img.src = data.data
          } else {
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error)
            })
          }
        })
      } else if (key === 'edit') {
        self.$router.push(`/addFactory?id=${self.clickData.id}`)
      } else if (key === 'set') {
        self.$router.push(`/factoryAgentFee?id=${self.clickData.id}`)
      } else if (key === 'retailer') {
        self.$router.push(`/retailerList?id=${self.clickData.id}`)
      } else {
        self.showPopup1 = false
      }
    },
    closeQrcode () {
      this.showQrcode = false
    },
    getData1 () {
      const self = this
      const params = { params: { pagestart: pageStart1, limit: limit } }
      this.$http.get(`${ENV.BokaApi}/api/factory/list`, params)
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
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      if (this.Data.length < limit) {
        this.disList = false
        this.Data = []
        this.$vux.loading.show()
        pageStart1 = 0
        this.getData1()
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
.rproductlist .scroll_item .icon{display:none;}
.rproductlist .scroll_item .down.icon{
  display:block;
  position:absolute;right:0;top:0;width:96px;height:25px;line-height:25px;
  background-color:#8a8a8a;color:#fff;text-align:center;font-size: 12px;
  -webkit-transform: translate(30px,5px) rotate(45deg);
  transform: translate(30px,5px) rotate(45deg);
}
.rproductlist .scroll_item .down.icon:after{content:"已下架";}
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
.rproductlist .s-container{bottom:50px;}
.rproductlist .s-bottom{height: 50px;}
.rproductlist .addproduct{border-radius: 50px;height: 36px;width: 100%;}
.rproductlist .pro_list_top{
  background: url(../assets/images/product_list_top.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-size: 100%;
  height: 20px;
}

</style>
