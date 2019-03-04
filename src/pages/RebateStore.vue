/*
* @description: 返点商铺页面
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="rebate-store" class="containerarea font14 scroll-container" ref="scrollContainer" @scroll="handleScroll">
    <div class="bg-white">
      <div class="sharing-title">{{$t('Current Store')}}</div>
      <div class="pt5 pb5 pl15 pr15 flex_table">
        <div class="store-photo">
          <img class="imgcover" :src="rebateInfo.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
        </div>
        <div class="store-details flex_cell pl10">
          <span class="db font14">{{rebateInfo.title}}</span>
          <span class="db color-gray font12 clamp1">店主说：勤分享，勤推荐，好友购买立返佣金！</span>
        </div>
      </div>
      <div class="rebate-store-title flex_table">
        <div class="flex_cell align_right pr20">
          <a @click="onShareCard" class="qbtn4"><i class="al al-a166 font12" style="line-height:12px"></i> {{$t('To Recommend Store')}}</a>
        </div>
        <div class="flex_cell align_left pl20">
          <div @click="toCustomer" class="qbtn4">{{$t('Bring Customer')}}：{{rebateInfo.bringCustomers}}</div>
        </div>
      </div>
    </div>
    <div class="mt10 bg-white">
      <div class="sharing-title">{{$t('I Am In The Store')}}</div>
      <card>
        <div slot="content" class="card-flex card-content">
          <div class="vux-1px-r">
            <span class="font18 db color-black">{{rebateInfo.income}}</span>
            <span class="font14 db color-gray">{{$t('Income Of Our Shop')}}</span>
          </div>
          <div class="vux-1px-r">
            <span class="font18 db color-black">{{rebateInfo.torebate}}</span>
            <span class="font14 db color-gray">{{$t('Waiting To Rebate')}}</span>
          </div>
          <div>
            <span class="font18 db color-black">{{rebateInfo.towithdraw}}</span>
            <span class="font14 db color-gray">{{$t('Waiting To Return Money')}}</span>
          </div>
        </div>
      </card>
    </div>
    <div class="mt10 bg-white">
      <div class="sharing-title color-red b_bottom_after">{{$t('Immediately Make Money By Sharing')}}</div>
      <tab v-model="selectedIndex" class="v-tab">
        <tab-item selected @on-item-click="onItemClick">{{$t('Product')}}</tab-item>
        <tab-item @on-item-click="onItemClick">{{$t('Activity')}}</tab-item>
        <tab-item @on-item-click="onItemClick">{{$t('Article')}}</tab-item>
      </tab>
      <view-box v-show="selectedIndex===0">
        <template v-if="distabdata1">
          <template v-if="tabdata1.length">
            <group v-for="(item, index) in tabdata1" :key="index">
              <cell :title="item.title" class="list-item font14 clamp2" @click.native="toProduct(item)">
                <img slot="icon" class="product-img imgcover" :src="getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                <div slot="inline-desc" class="inline-desc font12 color-gray">
                  <span class="info-cell">
                    零售价：{{$t('RMB')}}{{item.price}}
                  </span>
                  <span class="date-cell color-red">
                    佣金：{{$t('RMB')}}{{item.rebate}}
                  </span>
                </div>
              </cell>
            </group>
          </template>
          <template v-else>
            <div class="no-related-x color-gray">
              <span>{{$t('No relevant data')}}</span>
            </div>
          </template>
        </template>
      </view-box>
      <view-box v-show="selectedIndex===1">
        <template v-if="distabdata2">
          <template v-if="tabdata2.length">
            <group v-for="(item, index) in tabdata2" :key="index">
              <cell :title="item.title" class="list-item font14 clamp2" @click.native="toProduct1(item)">
                <img slot="icon" class="product-img imgcover" :src="getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                <div slot="inline-desc" class="inline-desc font12 color-gray">
                  <div class="clamp1">{{item.starttime | dateFormat}} 至 {{item.endtime | dateFormat}}</div>
                </div>
              </cell>
            </group>
          </template>
          <template v-else>
            <div class="no-related-x color-gray">
              <span>{{$t('No relevant data')}}</span>
            </div>
          </template>
        </template>
      </view-box>
      <view-box v-show="selectedIndex===2">
        <template v-if="distabdata3">
          <template v-if="tabdata3.length">
            <group v-for="(item, index) in tabdata3" :key="index">
              <cell :title="item.title" class="list-item font14 clamp2" @click.native="toNews(item)">
                <img slot="icon" class="product-img imgcover" :src="getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                <div slot="inline-desc" class="inline-desc font12 color-gray">
                  <div class="clamp1">
                      <span class="v_middle">{{ item.dateline | dateFormat }}</span>
                      <span class="v_middle"><i class="al al-chakan font18 middle-cell pl5 pr5 color-b8b8b8"></i>{{item.views}}</span>
                      <span class="v_middle"><i class="al al-ai-share font13 middle-cell pl5 pr5 color-b8b8b8"></i>{{item.shares}}</span>
                  </div>
                </div>
              </cell>
            </group>
          </template>
          <template v-else>
            <div class="no-related-x color-gray">
              <span>{{$t('No relevant data')}}</span>
            </div>
          </template>
        </template>
      </view-box>
    </div>
    <div v-transfer-dom class="qrcode-dialog">
      <x-dialog v-model="storeCardShow">
        <div class="img-box">
          <img :src="storeQrcode" style="max-width:100%;max-height:100%;">
        </div>
        <div class="padding10 color-white">{{$t('Save Picture To Sharing')}}</div>
        <div @click="storeCardShow=false">
          <span class="vux-close color-white"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import { Group, Cell, Card, Tab, TabItem, ViewBox, XImg, Sticky, XDialog, TransferDom } from 'vux'
import Time from '#/time'
import ENV from 'env'

let pageStart1 = 0
let pageStart2 = 0
let pageStart3 = 0
export default {
  directives: {
    TransferDom
  },
  components: {
    Group, Cell, Card, Tab, TabItem, ViewBox, XImg, Sticky, XDialog
  },
  data () {
    return {
      query: {},
      rebateInfo: {},
      selectedIndex: 0,
      storeCardShow: false,
      distabdata1: false,
      distabdata2: false,
      distabdata3: false,
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
      limit: 10,
      storeQrcode: null
    }
  },
  filters: {
    dateFormat (date) {
      return new Time(date * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    initData: function () {
      this.query = this.$route.query
      this.selectedIndex = 0
      this.distabdata1 = false
      this.distabdata2 = false
      this.distabdata3 = false
      this.tabdata1 = []
      this.tabdata2 = []
      this.tabdata3 = []
      pageStart1 = 0
      pageStart2 = 0
      pageStart3 = 0
      this.storeQrcode = null
    },
    getPhoto: function (photo) {
      return this.$util.getPhoto(photo)
    },
    toCustomer () {
      let params = {wid: this.query.wid}
      if (this.query.appid) {
        params.appid = this.query.appid
      }
      if (this.query.from) {
        params.from = this.query.from
      }
      this.$router.push({path: '/bringCustomer', query: params})
    },
    toProduct (item) {
      let params = {id: item.id, wid: item.uploader}
      if (this.query.from) {
        params.from = this.query.from
        this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.product}?id=${item.id}&wid=${item.uploader}`})
      } else {
        this.$router.push({path: '/product', query: params})
      }
    },
    toProduct1 (item) {
      if (this.query.from) {
        params.from = this.query.from
        if (item.type === 'groupbuy') {
          this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.product}?id=${item.productid}&wid=${item.uploader}`})
        } else {
          this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.activity}?id=${item.id}&wid=${item.uploader}`})
        }
      } else {
        if (item.type === 'groupbuy') {
          let params = {id: item.productid, wid: item.uploader}
          this.$router.push({path: '/product', query: params})
        } else {
          let params = {id: item.id, wid: item.uploader}
          this.$router.push({path: '/activity', query: params})
        }
      }
    },
    toActivity (item) {
      let params = {id: item.id}
      if (this.query.from) {
        params.from = this.query.from
        this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.activity}?id=${item.id}&wid=${item.uploader}`})
      } else {
        this.$router.push({path: '/activity', query: params})
      }
    },
    toNews (item) {
      let params = {id: item.id, wid: item.uploader}
      if (this.query.from) {
        params.from = this.query.from
        this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.news}?id=${item.id}&wid=${item.uploader}`})
      } else {
        this.$router.push({path: '/news', query: params})
      }
    },
    handleScroll: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer,
        callback: function () {
          switch (self.selectedIndex) {
            case 0:
              if (self.tabdata1.length === (pageStart1 + 1) * self.limit) {
                pageStart1++
                self.$vux.loading.show()
                self.getData1()
              }
              break
            case 1:
              if (self.tabdata2.length === (pageStart2 + 1) * self.limit) {
                pageStart2++
                self.$vux.loading.show()
                self.getData2()
              }
              break
            case 2:
              if (self.tabdata3.length === (pageStart3 + 1) * self.limit) {
                pageStart3++
                self.$vux.loading.show()
                self.getData3()
              }
              break
          }
        }
      })
    },
    getData1 () {
      const self = this
      let params = { wid: self.query.wid, pagestart: pageStart1, limit: self.limit }
      this.$http.post(`${ENV.BokaApi}/api/seller/shareList/product`, params)
      .then(res => {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
      })
    },
    getData2 () {
      const self = this
      let params = { wid: self.query.wid, pagestart: pageStart2, limit: self.limit }
      this.$http.post(`${ENV.BokaApi}/api/seller/shareList/activity`, params)
      .then(res => {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        self.distabdata2 = true
      })
    },
    getData3 () {
      const self = this
      let params = { wid: self.query.wid, pagestart: pageStart3, limit: self.limit }
      this.$http.post(`${ENV.BokaApi}/api/seller/shareList/news`, params)
      .then(res => {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata3 = self.tabdata3.concat(retdata)
        self.distabdata3 = true
      })
    },
    onItemClick () {
      switch (this.selectedIndex) {
        case 0:
          !this.tabdata1.length && this.getData1()
          break
        case 1:
          !this.tabdata2.length && this.getData2()
          break
        case 2:
          !this.tabdata3.length && this.getData3()
          break
      }
    },
    onShareCard () {
      const self = this
      if (self.storeQrcode) {
        self.storeCardShow = true
      } else {
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/seller/recommend_qrcode`, {wid: self.query.wid})
        .then(res => {
          self.$vux.loading.hide()
          let data = res.data
          if (data.flag === 1) {
            self.storeQrcode = data.data
            self.storeCardShow = true
          } else {
            self.$vux.toast.show({
              text: data.error,
              type: 'warn',
              time: self.$util.delay(data.error)
            })
          }
        })
      }
    },
    getData () {
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/seller/rebateinfo`, {wid: this.query.wid})
      .then(res => {
        self.rebateInfo = res.data
        self.income = res.data.income
        self.torebate = res.data.torebate
        self.towithdraw = res.data.towithdraw
        self.customers = res.data.customers
        self.title = res.data.title
        self.onItemClick()
      })
    },
    init () {
      this.$vux.loading.show()
      this.query = this.$route.query
      this.getData()
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      if (this.query.wid !== this.$route.query.wid) {
        this.initData()
        this.getData()
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
<style lang="less">
#rebate-store .rebate-store-title {
  padding:10px 15px 20px 15px;
}
#rebate-store .rebate-store-title .qbtn4{
  color:red;
  font-size:12px;
  border:1px solid red;
  width:100px;
  text-align:center;
  display:inline-block;
  box-sizing:border-box;
  line-height:1.4;
}
#rebate-store .card-flex {
  display: flex;
}
#rebate-store .card-content {
  padding: 0px 0 20px 0;
}
#rebate-store .card-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
#rebate-store .card-flex span {
  color: #67b8e1;
}
#rebate-store .sharing-title {
  padding: 10px 15px 10px 22px;
  font-size: 16px;
  position: relative;
  color:inherit;
}
#rebate-store .sharing-title:before{
  content: " ";
  position: absolute;
  left: 0px;
  top: 13px;
  bottom: 13px;
  width: 0px;
  border-left: 2px solid red;
  color: #D9D9D9;
  left: 15px;
}
#rebate-store .list-item .inline-desc {
  margin-top: 8px;
}
#rebate-store .list-item .product-img {
  width: 60px;
  height: 60px;
}
#rebate-store .list-item .date-cell {
  float: right;
  margin-right: 10px
}
#rebate-store .info-cell span{
  display: inline-block;
  width: 28px;
  padding-left: 4px;
}
.qrcode-dialog .img-box {
  height: 350px;
  overflow: hidden;
}
.qrcode-dialog .vux-close {
  margin-top: 8px;
  margin-bottom: 8px;
}
/* vux css hack */
#rebate-store .weui-cell__hd {
  display: flex;
}
#rebate-store .vux-cell-primary {
  padding-left: 10px;
}
#rebate-store .weui-cells {
  margin-top: 0;
}
#rebate-store .weui-cells:before {
  height: 0;
  border-top: none;
}
#rebate-store .weui-panel{margin-top:0px}
#rebate-store .weui-panel:before{display:none}
#rebate-store .vux-1px-r:after{top:10%;bottom:10%;}
#rebate-store .store-photo{width:50px;}
#rebate-store .store-photo img{width:50px;height:50px;object-fit:cover;display:block;}
#rebate-store .store-details{align-self:center;}
#rebate-store .weui-cell__ft{display:none;}
#rebate-store .vux-cell-primary p{
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  -webkit-line-clamp: 2;
}
#rebate-store .weui-tab__panel {
  padding-bottom: 0;
}
.qrcode-dialog .weui-dialog{background-color:transparent}
</style>
