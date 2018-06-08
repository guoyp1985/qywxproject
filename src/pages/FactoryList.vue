<template>
  <div class="containerarea bg-page font14 s-havebottom rproductlist">
    <div class="s-container scroll-container" style="top:0px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer', 'product')">
      <template v-if="disproductdata">
        <template v-if="!productdata || productdata.length == 0">
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
            <router-link :to="{path:'/factory',query:{id:item.id, wid: loginUser.uid}}" class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in productdata" :key="item.id" style="color:inherit;">
              <div v-if="item.moderate == 0" class="icon down"></div>
          		<div class="t-table bg-white pt10 pb10">
          			<div class="t-cell v_middle pl12">
                  <div class="clamp1 font16 pr10 color-lightgray">{{item.title}}</div>
                  <div class="t-table pr12 border-box mt15">
                    <div class="t-cell color-999 font14">
                      <div class="clamp1">{{ item.summary }}</span></div>
                    </div>
                    <div class="align_right t-cell v_bottom w80">
                      <div class="btnicon bg-red color-white font12" @click="controlpopup1(item,index)">
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
      <router-link class="addproduct flex_cell flex_center btn-bottom-red" to="/addProduct">{{ $t('Add factory') }}</router-link>
    </div>
    <div v-transfer-dom>
      <popup class="menuwrap" v-model="showpopup1">
        <div class="popup0">
          <div class="list" v-if="clickdata">
            <div class="item">
              <div class="inner" @click="clickpopup('push')">设置管理员</div>
            </div>
            <div class="item close mt10" @click="clickpopup('row.key')">
              <div class="inner">{{ $t('Cancel txt') }}</div>
            </div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom class="x-popup popupCustomer">
      <popup v-model="showpush" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">设置管理员</div>
          <div class="popup-middle font14">
            <div class=" pt10 pb10 pl12 pr12">
  					</div>
          </div>
          <div class="flex_left border-box pl10 pr10" style="position:absolute;left:0;right:0;bottom:46px;height:40px;">
            <div class="w_100">
              <div class="align_left color-red font12 w_100">提示：只有48小时内互动过的返点客才可以收到通知！</div>
            </div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closepush">{{ $t('Close') }}</div>
            <div class="flex_cell h_100 flex_center bg-green color-white" @click="submitpush">提交</div>
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
let pageStart2 = 0
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
      loginUser: {},
      productdata: [],
      showpopup1: false,
      clickdata: {},
      clickindex: 0,
      showpush: false
    }
  },
  methods: {
    getPhoto (src) {
      return this.$util.getPhoto(src)
    },
    controlpopup1 (item, index) {
      event.preventDefault()
      this.showpopup1 = !this.showpopup1
      this.clickdata = item
      this.clickindex = index
    },
    clickpopup (key) {
      const self = this
      if (key === 'push') {
        self.showpopup1 = false
        self.showpush = true
        if (self.customerdata.length === 0) {
          self.getCustomerdata()
        }
      } else {
        self.showpopup1 = false
      }
    },
    closepush () {
      this.showpush = false
    },
    submitpush () {
      const self = this
      if (self.pushdata.length === 0) {
        self.$vux.toast.show({
          text: '请选择返点客'
        })
        return false
      }
      self.showpush = false
      self.$vux.loading.show()
      let subdata = { id: self.clickdata.id, sendmodule: 'product', uid: self.pushdata }
      self.$http.post(`${ENV.BokaApi}/api/retailer/sendGroupNews`, subdata).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error)
        })
      })
    },
    getData1 () {
      const self = this
      const params = { params: { pagestart: pageStart1, limit: limit } }
      this.$http.get(`${ENV.BokaApi}/api/factory/list`, params)
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.productdata = self.productdata.concat(retdata)
        self.disproductdata = true
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
      if (this.productdata.length < limit) {
        this.disproductdata = false
        this.productdata = []
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
