<template>
  <div class="containerarea bg-page font14 s-havebottom rproductlist">
    <div class="s-container scroll-container" style="top:0px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer', 'product')">
      <template v-if="disproductdata">
        <template v-if="!productdata || productdata.length == 0">
          <div class="scroll_list">
            <div class="emptyitem">
              <div class="t-table" style="padding-top:20%;">
                <div class="t-cell padding10">
                  <i class="al al-chuangjianxiangmu" style="font-size:60px;"></i>
                  <div class="align_center">竟然一个商品也没有！</div>
                  <div class="align_center">及时添加商品卖家才可以帮你带来更多销量哦</div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="scroll_list ">
            <router-link :to="{path:'/factoryProduct',query:{id:item.id}}" class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in productdata" :key="item.id" style="color:inherit;">
              <div v-if="item.moderate == 0" class="icon down"></div>
          		<div class="t-table bg-white pt10 pb10">
          			<div class="t-cell pl12 v_middle" style="width:110px;">
                  <img class="imgcover v_middle" :src="getPhoto(item.photo)" style="width:100px;height:100px;" onerror="javascript:this.src='http://vuxlaravel.boka.cn/images/nopic.jpg';"/>
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
      <router-link class="addproduct flex_cell flex_center btn-bottom-red" :to="{path: '/addFactoryProduct', query: {fid: query.fid}}">{{ $t('Add product') }}</router-link>
    </div>
    <div v-transfer-dom>
      <popup class="menuwrap" v-model="showpopup1">
        <div class="popup0">
          <div class="list" v-if="clickdata">
            <div class="item" v-if="clickdata.activityid == 0">
              <router-link class="inner" :to="{path: '/addFactoryProduct', query: {id: clickdata.id}}">编辑</router-link>
            </div>
            <div class="item" v-if="clickdata.moderate == 0">
              <div class="inner" @click="clickpopup('up')">上架</div>
            </div>
            <div class="item" v-else-if="clickdata.moderate == 1">
              <div class="inner" @click="clickpopup('down')">下架</div>
            </div>
            <div class="item">
              <router-link class="inner" :to="{path: '/stat', query: {id: clickdata.id, module: 'factoryproduct'}}">统计</router-link>
            </div>
            <div class="item">
              <div class="inner" @click="clickpopup('fee')">设置佣金</div>
            </div>
            <div class="item close mt10" @click="clickpopup('row.key')">
              <div class="inner">{{ $t('Cancel txt') }}</div>
            </div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { TransferDom, Popup, Confirm, CheckIcon, XImg } from 'vux'
import ENV from 'env'
import { User } from '#/storage'

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
      loginUser: {},
      query: {},
      productdata: [],
      showpopup1: false,
      clickdata: {},
      clickindex: 0,
      disproductdata: false
    }
  },
  watch: {
    productdata: function () {
      return this.productdata
    }
  },
  methods: {
    getPhoto (src) {
      return this.$util.getPhoto(src)
    },
    handleScroll: function (refname, type) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (type === 'product') {
            if (self.productdata.length === (pageStart1 + 1) * limit) {
              pageStart1++
              self.$vux.loading.show()
              self.getData1()
            }
          }
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
            self.$http.post(`${ENV.BokaApi}/api/moderate/factoryproduct`, params).then(function (res) {
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
            self.$http.post(`${ENV.BokaApi}/api/moderate/factoryproduct`, params).then(function (res) {
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
        self.$router.push({ path: '/addFactoryProduct', query: { id: self.clickdata.id } })
      } else if (key === 'fee') {
        self.showpopup1 = false
        self.$router.push({ path: '/factoryAgentFee', query: { id: self.clickdata.id } })
      } else {
        self.showpopup1 = false
      }
    },
    getData1 () {
      const self = this
      const params = { fid: self.query.fid, from: 'factory', pagestart: pageStart1, limit: limit }
      this.$http.get(`${ENV.BokaApi}/api/list/factoryproduct`, {
        params: params
      })
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
      this.loginUser = User.get()
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'factory', action: 'productlist'
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
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
