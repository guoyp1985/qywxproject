<template>
  <div class="containerarea bg-page font14 s-havebottom rproductlist">
    <div class="s-container scroll-containe" style="top:0px;">
      <template v-if="disproductdata">
        <template v-if="!productdata || productdata.length == 0">
          <div class="scroll_list">
            <div class="emptyitem">
              <div class="t-table" style="padding-top:20%;">
                <div class="t-cell padding10">
                  <i class="al al-chuangjianxiangmu" style="font-size:60px;"></i>
                  <div>还没有添加商品哦，及时添加商品可以：</div>
                  <div>1.创建促销活动 </div>
                  <div>2.分享商品获得客户</div>
                  <div>3.邀请返点客帮你赚钱</div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="pro_box bg-white list_shadow">
            <div class="bg-white color-lightgray pt10 pb10 pl12 pr12">悄悄告诉你，立即分享新发布的商品可以：</div>
            <div class="rule  pt10 pb10 pl12 pr12 border color-lightgray b_bottom_after">
              <div>1. 接收好友查看商品的通知；</div>
              <div>2. 监控谁看过、分享过以及多次浏览过你的商品；</div>
              <div>3. 获得到更多潜在客户及销售机会。</div>
            </div>
            <div class="l-line"></div>
          </div>

          <div class="scroll_list ">
            <router-link :to="{path:'/product',query:{id:item.id}}" class="scroll_item mt10 font14 bg-white db list-shadow " v-for="(item,index) in productdata" :key="item.id" style="color:inherit;">
              <div v-if="item.moderate == 0" class="icon down"></div>
          		<div class="t-table bg-white pt10 pb10">
          			<div class="t-cell pl12 v_middle" style="width:110px;">
                  <x-img class="imgcover" :src="item.photo" default-src="../src/assets/images/nopic.jpg" style="width:100px;height:100px; vertical-align: middle;" :offset="0" container=".scroll-container"></x-img>
          			</div>
          			<div class="t-cell v_middle">
                  <div class="clamp1 font16 pr10 color-lightgray">{{item.title}}</div>
                  <div class="t-table pr12 border-box mt15">
                    <div class="t-cell color-999 font14">
                      <div class="clamp1">售价:<span class="color-red"> {{ $t('RMB') }}{{ item.price }}</span></div>
                      <div class="clamp1 mt5">
                          <span class="v_middle db-in">库存: {{ item.storage }}{{item.unit}}</span>
                          <span class="v_middle db-in ml5">已售: {{ item.saled }}{{item.unit}}</span>
                      </div>
                    </div>
                    <div class="align_right t-cell v_bottom w80">
                      <div class="btnicon bg-red color-white" @click="controlpopup1(item,index)">●●●</div>
                    </div>
                  </div>
          			</div>
          		</div>
            </router-link>
          </div>
        </template>
      </template>
    </div>
    <div class="bg-white pl12 pr12 s-bottom flex_center list-shadow">
      <router-link class="addproduct flex_center bg-red color-white" to="/addProduct">{{ $t('Add product') }}</router-link>
    </div>
    <div v-transfer-dom>
      <popup class="menuwrap" v-model="showpopup1">
        <div class="popup0">
          <div class="list" v-if="clickdata">
            <div class="item">
              <router-link class="inner" :to="{path: '/addProduct', query: {id: clickdata.id}}">编辑</router-link>
            </div>
            <div class="item" v-if="clickdata.moderate == 0">
              <div class="inner" @click="clickpopup('up')">上架</div>
            </div>
            <div class="item" v-else-if="clickdata.moderate == 1">
              <div class="inner" @click="clickpopup('down')">下架</div>
            </div>
            <div class="item">
              <router-link class="inner" :to="{path: '/stat', query: {id: clickdata.id, module: 'product'}}">统计</router-link>
            </div>
            <div class="item">
              <router-link class="inner" :to="{path: '/poster', query: {id: clickdata.id, module: 'product'}}">生成海报</router-link>
            </div>
            <div class="item">
              <div class="inner" @click="clickpopup('push')">推送给返点客</div>
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
          <div class="popup-top flex_center">选择返点客</div>
          <div class="flex_left border-box pl10 pr10" style="position:absolute;left:0;right:0;top:46px;height:40px;">
            <div class="w_100">
              <check-icon class="x-check-icon w_100" :value.sync="checkAll" @click.native.stop="checkAllEvent">
                <div class="flex_left">全选</div>
              </check-icon>
            </div>
          </div>
          <div class="popup-middle font14 customer-popup-container" style="top:85px;bottom:86px;">
            <div class=" pt10 pb10 pl12 pr12">
              <div v-show="discustomerdata" class="scroll_list">
                <template v-if="customerdata.length == 0">
                  <div class="scroll_item emptyitem">
          					<div class="t-table">
          						<div class="t-cell" style="padding:10px;">暂无返点客</div>
          					</div>
          				</div>
                </template>
                <check-icon v-else class="x-check-icon scroll_item pt10 pb10" v-for="(item,index) in customerdata" :key="item.uid" :value.sync="item.checked" @click.native.stop="radioclick(item,index)">
                  <div class="t-table">
                    <div class="t-cell v_middle w50">
                      <x-img class="avatarimg imgcover" :src="item.avatar" default-src="../src/assets/images/user.jpg" :offset="0" container=".customer-popup-container"></x-img>
                    </div>
                    <div class="t-cell v_middle" style="color:inherit;">
                      <div class="clamp1">{{ item.linkman }}</div>
                    </div>
                  </div>
                </check-icon>
              </div>
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
Add product:
  zh-CN: 添加商品
Back go shop:
  zh-CN: 返回店铺
</i18n>

<script>
import { TransferDom, Popup, Confirm, CheckIcon, XImg } from 'vux'
import ENV from 'env'

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, Confirm, CheckIcon, XImg
  },
  data () {
    return {
      loginuser: { uid: 187 },
      productdata: [],
      controldata1: [
        { key: 'edit', title: '编辑' },
        { key: 'up', title: '上架' },
        { key: 'down', title: '下架' },
        { key: 'stat', title: '统计' },
        { key: 'createposter', title: '生成海报' }
      ],
      showpopup1: false,
      clickdata: {},
      clickindex: 0,
      limit: 20,
      pagestart1: 0,
      isBindScroll1: false,
      scrollArea1: null,
      showpush: false,
      customerdata: [],
      pushdata: [],
      checkAll: false,
      customerPagestart: 0,
      isBindCustomerScroll: false,
      scrollCustomerArea: null,
      disproductdata: false,
      discustomerdata: false
    }
  },
  created: function () {
    let self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
      module: 'retailer', action: 'productlist'
    })
    self.$vux.loading.show()
    self.getdata1()
  },
  watch: {
    productdata: function () {
      return this.productdata
    }
  },
  computed: {
    getquery: function () {
      return this.$route.query
    }
  },
  methods: {
    scroll1: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea1,
        callback: function () {
          if (self.productdata.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getdata1()
          }
        }
      })
    },
    getdata1 () {
      const self = this
      let params = { params: { pagestart: self.pagestart1, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/list/product?from=retailer`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.productdata = self.productdata.concat(retdata)
        self.disproductdata = true
        if (!self.isBindScroll1) {
          self.scrollArea1 = document.querySelector('.rproductlist .s-container')
          self.isBindScroll1 = true
          self.scrollArea1.removeEventListener('scroll', self.scroll1)
          self.scrollArea1.addEventListener('scroll', self.scroll1)
        }
      })
    },
    controlpopup1 (item, index) {
      event.preventDefault()
      this.showpopup1 = !this.showpopup1
      this.clickdata = item
      this.clickindex = index
    },
    clickpopup (key) {
      const self = this
      if (key === 'up') {
        self.$vux.confirm.show({
          title: '确定要上架该商品吗？',
          onConfirm () {
            self.$vux.loading.show()
            let params = { id: self.clickdata.id, moderate: 1 }
            self.$http.post(`${ENV.BokaApi}/api/moderate/product`, params).then(function (res) {
              let data = res.data
              self.$vux.loading.hide()
              self.$vux.toast.show({
                text: data.error,
                type: (data.flag !== 1 ? 'warn' : 'success'),
                time: self.$util.delay(data.error),
                onHide: function () {
                  if (data.flag === 1) {
                    self.clickdata.moderate = 1
                    self.productdata[self.clickindex].moderate = 1
                    self.showpopup1 = false
                  }
                }
              })
            })
          }
        })
      } else if (key === 'down') {
        self.$vux.confirm.show({
          title: '确定要下架该商品吗？',
          onConfirm () {
            self.$vux.loading.show()
            let params = { id: self.clickdata.id, moderate: 0 }
            self.$http.post(`${ENV.BokaApi}/api/moderate/product`, params).then(function (res) {
              let data = res.data
              self.$vux.loading.hide()
              self.$vux.toast.show({
                text: data.error,
                type: (data.flag !== 1 ? 'warn' : 'success'),
                time: self.$util.delay(data.error),
                onHide: function () {
                  if (data.flag === 1) {
                    self.clickdata.moderate = 0
                    self.productdata[self.clickindex].moderate = 0
                    self.showpopup1 = false
                  }
                }
              })
            })
          }
        })
      } else if (key === 'edit') {
        self.showpopup1 = false
        self.$router.push({ path: '/addProduct', query: { id: self.clickdata.id } })
      } else if (key === 'push') {
        self.showpopup1 = false
        self.showpush = true
        if (self.customerdata.length === 0) {
          self.getCustomerdata()
        } else {
          self.scrollCustomerArea = document.querySelector('.popupCustomer .popup-middle')
          self.isBindCustomerScroll = true
          self.scrollCustomerArea.removeEventListener('scroll', self.scrollCustomer)
          self.scrollCustomerArea.addEventListener('scroll', self.scrollCustomer)
        }
      } else {
        self.showpopup1 = false
      }
    },
    scrollCustomer: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollCustomerArea,
        callback: function () {
          if (self.customerdata.length === (self.customerPagestart + 1) * self.limit) {
            self.customerPagestart++
            self.$vux.loading.show()
            self.getCustomerdata()
          }
        }
      })
    },
    getCustomerdata () {
      const self = this
      self.$vux.loading.show()
      let params = { params: { pagestart: self.customerPagestart, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/retailer/sellersList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.customerdata = self.customerdata.concat(retdata)
        self.discustomerdata = true
        if (!self.isBindCustomerScroll) {
          self.scrollCustomerArea = document.querySelector('.popupCustomer .popup-middle')
          self.isBindCustomerScroll = true
          self.scrollCustomerArea.removeEventListener('scroll', self.scrollCustomer)
          self.scrollCustomerArea.addEventListener('scroll', self.scrollCustomer)
        }
      })
    },
    closepush () {
      this.showpush = false
      self.isBindCustomerScroll = false
    },
    submitpush () {
      const self = this
      if (self.pushdata.length === 0) {
        self.$vux.toast.show({
          text: '请选择返点客'
        })
        return false
      }
      self.$vux.loading.show()
      let subdata = { id: self.clickdata.id, sendmodule: 'product', uid: self.pushdata }
      self.$http.post(`${ENV.BokaApi}/api/retailer/sendGroupNews`, subdata).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.showpush = false
            }
          }
        })
      })
      self.isBindCustomerScroll = false
    },
    radioclick (data, index) {
      const self = this
      if (data.checked) {
        self.pushdata.push(data.uid)
      } else {
        self.checkAll = false
        for (let i = 0; i < self.pushdata.length; i++) {
          if (self.pushdata[i] === data.uid) {
            self.pushdata.splice(i, 1)
            break
          }
        }
      }
    },
    checkAllEvent () {
      const self = this
      for (let i = 0; i < self.customerdata.length; i++) {
        if (self.checkAll) {
          self.customerdata[i].checked = true
        } else {
          delete self.customerdata[i].checked
        }
      }
    }
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
  display:inline-block;
  color: #ea3a3a;
  font-size: 12px;
  border: 1px solid #ea3a3a;
  text-align: center;
  border-radius: 30px;
  padding: 1px 8px;
  letter-spacing: 0px;
}
.rproductlist .rule{
  background: #f2f7f8;
}
.rproductlist .l-line{
  width:100%;
  height:8px;
  background:#fff;
}


.rproductlist .s-bottom{
  height: 50px;}
.rproductlist .addproduct{
  border-radius: 50px;
  height: 36px;
  width: 100%;
}

</style>
