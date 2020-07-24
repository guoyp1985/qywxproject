<template>
  <div :class="`containerarea bg-white font14 notop ${((selectedIndex == 1 && !tabData2.length) || (loginUser.retailerinfo && loginUser.retailerinfo.fid && loginUser.retailerinfo.fid != query.id)) ? 'nobottom' : ''}`">
    <div class="s-topbanner">
      <div class="flex_left border-box padding10 color-white" style="height:88px;">
        <div v-if="viewData.photo && viewData.photo != ''" class="w70">
            <img class="imgcover v_middle" style="width:60px;height:60px;" :src="viewData.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
        </div>
        <div class="flex_cell">
          <div class="clamp1">{{ viewData.title }}</div>
          <div class="font12 clamp2">{{ viewData.summary }}</div>
        </div>
        <!--
        <router-link :to="{path: '/chat', query: {uid: viewData.uploader,from:query.from}}" class="qbtn7 font14 bg-white color-red5">联系</router-link>
      -->
      </div>
      <tab v-model="selectedIndex" class="v-tab" v-if="(loginUser.factoryinfo && loginUser.factoryinfo.supplymode) || !query.fromsupply">
        <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index" @on-item-click="swiperChange">{{item}}</tab-item>
      </tab>
    </div>
    <div class="pagemiddle" :style="`top:${((!loginUser.factoryinfo || !loginUser.factoryinfo.supplymode) && query.fromsupply) ? '88' : '132'}px;`" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
      <template v-if="selectedIndex == 0">
        <div v-if="disTabData1" class="productlist squarepic pb10">
          <div v-if="tabData1.length == 0" class="emptyitem flex_center flex_cell">暂无商品</div>
          <div v-else v-for="(item,index) in tabData1" :key="index" @click="toProduct(item)"  class="bk-productitem scroll_item font14 db ">
        		<div class="inner list-shadow">
        			<div class="picarea">
        				<div class="pic">
                  <img class="imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                </div>
        			</div>
        			<div class="desbox" style="overflow:hidden;">
        				<div class="align_left pl5 pr5 clamp2 distitle" style="line-height:18px;height:36px;">{{ item.title }}</div>
        				<div class="clamp1">
        					<div class="flex_table padding5">
        						<span class="color-red font14 flex_cell" style="overflow: hidden;margin-right: 10px;white-space: nowrap;text-overflow: ellipsis;">{{ $t('RMB') }} <span style="margin-left:1px;">{{ item.price }}</span></span>
        						<span class="color-gray">{{ $t('Saled txt') }}:<span style="margin-left:1px;">{{ item.saled }}</span></span>
        					</div>
        				</div>
        			</div>
        		</div>
          </div>
        </div>
      </template>
      <template v-if="selectedIndex == 1">
        <div v-if="disTabData2" class="scroll_list">
          <div v-if="tabData2.length == 0" class="emptyitem flex_center">暂无文章</div>
          <router-link :to="{path: '/factoryNews', query: {id: item.id, fid: query.id}}" v-else v-for="(item,index1) in tabData2" :key="item.id" class="list-shadow scroll_item db pt10 pb10 pl12 pr12 bg-white mb10">
            <div class="t-table">
              <div class="t-cell v_middle w70">
                <img class="imgcover" style="width:60px;height:60px;" :src="$util.getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
              </div>
              <div class="t-cell v_middle">
                <div class="clamp1 font14 color-lightgray">{{item.title}}</div>
                <div class="clamp1 font14 color-gray v_middle mt5">
                    <span class="v_middle color-999">{{ item.dateline | dateformat }}</span>
                    <span class="v_middle"><i class="al al-chakan font18 middle-cell pl5 pr5" style="color: #bbbbbb"></i>{{item.views}}</span>
                    <span class="v_middle"><i class="al al-ai-share font14 middle-cell pl5 pr5" style="color: #bbbbbb"></i>{{item.shares}}</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </template>
    </div>
    <template v-if="showBottom">
      <template v-if="loginUser.isretailer">
        <template v-if="selectedIndex == 0">
          <div class="s-bottom list-shadow flex_center bg-white pl12 pr12">
            <template v-if="!loginUser.factoryinfo.supplymode && query.fromsupply">
              <div class="flex_center flex_cell">
                <div class="flex_center btn-bottom-red" style="width:85%;" @click="toJoinSupply">我要托管</div>
              </div>
            </template>
            <template v-else>
              <div v-if="tabData1 && tabData1.length > 0 && (!loginUser.retailerinfo || !loginUser.retailerinfo.fid || loginUser.retailerinfo.fid == query.id)" class="align_center flex_center flex_cell">
                <div class="flex_center btn-bottom-red" style="width:85%;" @click="upAll('product')">一键上架商品</div>
              </div>
              <div class="align_center flex_center flex_cell">
                <div class="flex_center btn-bottom-orange" style="width:85%;" @click="toStore">我的店铺</div>
              </div>
            </template>
          </div>
        </template>
        <template v-else>
          <div v-if="tabData2 && tabData2.length > 0 && (!loginUser.retailerinfo || !loginUser.retailerinfo.fid || loginUser.retailerinfo.fid == query.id)" class="s-bottom list-shadow flex_center bg-white pl12 pr12">
            <div class="align_center flex_center flex_cell">
              <div class="flex_center btn-bottom-red" style="width:85%;" @click="upAll('factorynews')">导入文章</div>
            </div>
          </div>
        </template>
      </template>
      <div v-else class="s-bottom list-shadow flex_center bg-white pl12 pr12">
        <div class="align_center flex_center flex_cell">
          <router-link class="flex_center btn-bottom-red" style="width:85%;" to="/centerSales">入驻共销客</router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<i18n>
Apply join:
  zh-CN: 申请加入
</i18n>

<script>
import { Tab, TabItem } from 'vux'
import ENV from 'env'
import Time from '#/time'
import { User } from '#/storage'
const jweixin = require('../../static/jweixin')

const limit = 10
let pageStart1 = 0
let pageStart2 = 0

export default {
  components: {
    Tab, TabItem
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      loginUser: {},
      query: {},
      viewData: {},
      selectedIndex: 0,
      disProductData: false,
      productData: [],
      tabtxts: [ '商品', '文章' ],
      tabData1: [],
      tabData2: [],
      disTabData1: false,
      disTabData2: false,
      showBottom: false,
      productCount: 0,
      newsCount: 0
    }
  },
  watch: {
    query: function () {
      return this.query
    }
  },
  methods: {
    initData () {
      pageStart1 = 0
      pageStart2 = 0
      this.selectedIndex = 0
      this.disProductData = false
      this.productData = []
      this.tabData1 = []
      this.tabData2 = []
      this.disTabData1 = false
      this.disTabData2 = false
      this.showBottom = false
      this.productCount = 0
      this.newsCount = 0
    },
    toJoinSupply () {
      this.$vux.confirm.show({
        content: '确定要托管给该供应商',
        onConfirm: () => {
          this.$vux.loading.show()
          this.$http.post(`${ENV.BokaApi}/api/factory/fpimportApply`, {
            trustmode: 1, fid: this.loginUser.fid, fromfid: this.query.id
          }).then(res => {
            this.isIng = false
            let data = res.data
            this.$vux.loading.hide()
            this.$vux.toast.show({
              text: data.error,
              type: data.flag === 1 ? 'success' : 'warn',
              time: this.$util.delay(data.error)
            })
            if (data.flag) {
              this.loginUser.factoryinfo.supplymode = 1
              User.set(this.loginUser)
            }
          })
        }
      })
    },
    toProduct (item) {
      let params = this.$util.handleAppParams(this.query, {id: item.id, fid: this.query.id})
      this.$router.push({path: '/factoryProduct', query: params})
    },
    toStore () {
      if (this.query.from) {
        jweixin.miniProgram.navigateTo({url: `${ENV.MiniRouter.store}?wid=${this.loginUser.uid}`})
      } else {
        this.$router.push({path: '/store', query: {wid: this.loginUser.uid}})
      }
    },
    joinEvent () {
      const self = this
      self.$vux.confirm.show({
        content: '确定要申请加入该厂家吗？',
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/factory/join`, {
            fid: self.query.id
          }).then(function (res) {
            let data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              type: data.flag === 1 ? 'success' : 'warn',
              time: self.$util.delay(data.error)
            })
          })
        }
      })
    },
    upAllData (type) {
      const self = this
      let con = ''
      let ajaxUrl = ''
      if (type === 'product') {
        con = `确定要上架该厂家的${this.productCount}件商品？`
        ajaxUrl = `${ENV.BokaApi}/api/factory/fastImportFactoryProduct`
      } else if (type === 'factorynews') {
        con = `确定要导入该厂家的${this.newsCount}篇文章？`
        ajaxUrl = `${ENV.BokaApi}/api/factory/fastImportFactoryNews`
      }
      self.$vux.confirm.show({
        content: con,
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(ajaxUrl, {
            fid: self.query.id
          }).then(function (res) {
            let data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              type: data.flag === 1 ? 'success' : 'warn',
              time: self.$util.delay(data.error)
            })
          })
        }
      })
    },
    upAll (type) {
      const self = this
      if (self.loginUser.isretailer === 2) {
        self.$vux.loading.show()
        let ajaxurl = `${ENV.BokaApi}/api/list/product?from=retailer`
        if (type === 'factorynews') {
          ajaxurl = `${ENV.BokaApi}/api/list/news?from=retailer`
        }
        this.$http.get(ajaxurl, {
          params: { pagestart: 0, limit: 5 }
        }).then(res => {
          self.$vux.loading.hide()
          const data = res.data
          const retdata = data.data ? data.data : data
          const retlen = retdata.length
          if (type === 'product') {
            if (retlen + self.tabData1.length <= 5) {
              self.upAllData(type)
            } else {
              self.openVip(type)
            }
          } else if (type === 'factorynews') {
            if (retlen + self.tabData2.length <= 5) {
              self.upAllData(type)
            } else {
              self.openVip(type)
            }
          }
        })
      } else if (self.loginUser.isretailer === 1) {
        self.upAllData(type)
      }
    },
    openVip (type) {
      const self = this
      let con = ENV.vipProduct
      if (type === 'factorynews') {
        con = ENV.vipNews
      }
      self.$vux.confirm.show({
        content: con,
        cancelText: ENV.giveUpVipText,
        confirmText: ENV.openVipText,
        onConfirm () {
          location.replace(`${ENV.Host}/#/pay?id=${self.loginUser.payorderid}&module=payorders`)
        }
      })
    },
    handleScroll (refname) {
      const self = this
      let scrollArea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollArea,
        callback: function () {
          console.log('in handlescroll')
          console.log(pageStart1)
          console.log(self.selectedIndex)
          switch (self.selectedIndex) {
            case 0:
              console.log('in case 0 zhuangtai')
              if (self.tabData1.length === (pageStart1 + 1) * limit) {
                pageStart1++
                self.$vux.loading.show()
                self.getData1()
              }
              break
            case 1:
              console.log('in case 1 zhuangtai')
              if (self.tabData2.length === (pageStart2 + 1) * limit) {
                pageStart2++
                self.$vux.loading.show()
                self.getData2()
              }
              break
          }
        }
      })
    },
    swiperChange (index) {
      const self = this
      if (index !== undefined) {
        this.selectedIndex = index
      }
      switch (this.selectedIndex) {
        case 0:
          if (this.tabData1.length < limit) {
            self.$vux.loading.show()
            pageStart1 = 0
            this.disTabData1 = false
            this.tabData1 = []
            this.getData1()
          }
          break
        case 1:
          if (this.tabData2.length < limit) {
            self.$vux.loading.show()
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
      self.$http.get(`${ENV.BokaApi}/api/list/factoryproduct`, {
        params: { fid: self.query.id, pagestart: pageStart1, limit: limit, wid: this.loginUser.uid }
      }).then(res => {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        this.productCount = data.allcount
        self.tabData1 = self.tabData1.concat(retdata)
        self.disTabData1 = true
        if (self.loginUser.isretailer && (self.tabData1.length > 0 || self.tabData2.length > 0)) {
          self.showBottom = true
        }
      })
    },
    getData2 () {
      const self = this
      self.$http.get(`${ENV.BokaApi}/api/list/factorynews`, {
        params: { fid: self.query.id, pagestart: pageStart2, limit: limit, wid: this.loginUser.uid }
      }).then(res => {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        this.newsCount = data.allcount
        self.tabData2 = self.tabData2.concat(retdata)
        self.disTabData2 = true
        if (self.loginUser.isretailer && (self.tabData1.length > 0 || self.tabData2.length > 0)) {
          self.showBottom = true
        }
      })
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      console.log(this.query)
      if (!this.query.id || this.query.id !== parseInt(this.$route.query.id)) {
        this.initData()
        this.loginUser = User.get()
        console.log('用户信息')
        console.log(this.loginUser)
        if (!self.loginUser.isretailer) {
          self.showBottom = true
        } else {
          self.showBottom = false
        }
        this.query = this.$route.query
        self.$vux.loading.show()
        self.$http.get(`${ENV.BokaApi}/api/factory/info`, {
          params: { fid: self.query.id }
        }).then(function (res) {
          self.$vux.loading.hide()
          let data = res.data
          let retdata = data.data ? data.data : data
          self.viewData = retdata
          self.swiperChange()
        })
      }
    }
  },
  created () {
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.addFactory .x-checker .ck-item{
  font-size:13px;
  display: inline-block;
  padding: 0 15px;
  height: 30px;
  line-height: 30px;
  border:0px;
  text-align: center;
  border-radius: 3px;
  background-color: #fff;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  box-sizing: border-box;
}
.x-checker .border1px.ck-item-selected:after{border:1px solid #ea3a3a;}
.addFactory .vux-check-icon > span{color:#666;display: inline-block;vertical-align: bottom;line-height: 19px;}
</style>
