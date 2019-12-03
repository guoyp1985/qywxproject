<template>
  <div :class="`containerarea bg-white font14 notop ${((selectedIndex == 1 && !tabData2.length || !showBottom)) ? 'nobottom' : ''}`">
    <div class="s-topbanner">
      <div class="flex_left border-box padding10 color-white" style="height:88px;">
        <div v-if="viewData.photo && viewData.photo != ''" class="w70">
            <img class="imgcover v_middle" style="width:60px;height:60px;" :src="viewData.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
        </div>
        <div class="flex_cell">
          <div class="clamp1">{{ viewData.title }}</div>
          <div class="font12 clamp2" v-if="joinStatus">应打款金额: {{ $t('RMB') }}{{needpaymoney}}</div>
          <div v-if="disJoin && joinStatus">已加盟</div>
        </div>
        <div class="w100 flex_right">
          <div>
            <div v-if="joinStatus" class="flex_center bg-white color-theme" style="width:80px;padding:5px 0;border-radius:20px;" @click="toBill">详细账单</div>
            <template v-if="loginUser.fid != Fid && disJoin">
              <div class="flex_center bg-white color-theme mt5" style="width:80px;padding:5px 0;border-radius:20px;" v-if="!joinStatus" @click="toJoin">加盟厂家</div>
              <div class="flex_center bg-white color-theme mt5" style="width:80px;padding:5px 0;border-radius:20px;" v-else @click="viewInfo">收款信息</div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="pagemiddle" style="top:88px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
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
                <div class="flex_right mt5" v-if="loginUser.fid != Fid">
                  <span v-if="item.haveshelf == 1" class="bg-gray color-white flex_center padding5" style="border-radius:5px;">已代理</span>
                  <span v-else class="bg-theme color-white flex_center padding5" style="border-radius:5px;" @click.stop="upEvent(item, index)">代理销售</span>
                </div>
      				</div>
      			</div>
      		</div>
        </div>
      </div>
    </div>
    <template v-if="showBottom && tabData1 && tabData1.length">
      <div class="s-bottom list-shadow flex_center bg-white pl12 pr12">
        <div class="align_center flex_center flex_cell">
          <div class="flex_center btn-bottom-red" style="width:85%;" @click="upAll('product')">一键代理销售</div>
        </div>
      </div>
    </template>
    <div v-if="showInfo" class="auto-modal flex_center" style="position:fixed;">
      <div class="modal-inner border-box" style="width:80%;">
        <div class="padding20">
          <div class="flex_center font16 bold">收款方信息</div>
          <div class="con">
            <div class="flex_left pt10 pb10">
              <div class="w80 flex_left">开户银行</div>
              <div class="flex_cell flex_left" style="word-break:break-word;">{{viewData.newbankname}}</div>
            </div>
            <div class="flex_left pt10 pb10">
              <div class="w80 flex_left">开户名</div>
              <div class="flex_cell flex_left" style="word-break:break-word;">{{viewData.accountname}}</div>
            </div>
            <div class="flex_left pt10 pb10">
              <div class="w80 flex_left">开户账号</div>
              <div class="flex_cell flex_left" style="word-break:break-word;">{{viewData.newbankcardno}}</div>
            </div>
            <div class="flex_left pt10 pb10">
              <div class="w80 flex_left">联系人</div>
              <div class="flex_cell flex_left" style="word-break:break-word;">{{viewData.newbankuser}}</div>
            </div>
            <div class="flex_left pt10 pb10">
              <div class="w80 flex_left">手机号</div>
              <div class="flex_cell flex_left" style="word-break:break-word;">{{viewData.mobile}}</div>
            </div>
          </div>
        </div>
        <div class="close-area flex_center" @click="closeInfo">
          <i class="al al-close"></i>
        </div>
      </div>
    </div>
    <div v-if="showCheckModal" class="auto-modal flex_center check-modal" style="position:fixed;">
      <div class="modal-inner border-box" style="width:80%;">
        <div class="padding20">
          <div class="flex_center font16 bold">请选择供货方式</div>
          <div class="con">
            <div class="flex_left check-item">
              <div class="flex_left pr10">
                <div class="radius">
                  <span class="al al-weibiaoti509 bold color-theme"></span>
                </div>
              </div>
              <div class="flex_cell flex_left">
                <div class="w_100">
                  <div class="bold">托管运营</div>
                  <div class="color-gray font12">不具备选货能力，自动托管给供货商进行商品运营</div>
                </div>
              </div>
              <div class="flex_right">
                <span class="al al-mjiantou-copy2 font20 bold color-gray"></span>
              </div>
            </div>
            <div class="flex_left check-item" @click="clickSelf">
              <div class="flex_left pr10">
                <div class="radius">
                  <span class="al al-aixin bold color-theme font22"></span>
                </div>
              </div>
              <div class="flex_cell flex_left">
                <div class="w_100">
                  <div class="bold">自由选货</div>
                  <div class="color-gray font12">具备选货能力，自由选货上架到商城</div>
                </div>
              </div>
              <div class="flex_right">
                <div :class="{'checked': checkedSelf}" class="radio-ico"></div>
              </div>
            </div>
            <div class="mt12 flex_center" v-if="checkedSelf">
              <div class="bg-theme color-white flex_center" style="width:80%;height:40px;border-radius:20px;">确定</div>
            </div>
          </div>
        </div>
        <div class="close-area flex_center" @click="closeCheckModal">
          <i class="al al-close"></i>
        </div>
      </div>
    </div>
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
      newsCount: 0,
      Fid: 0,
      joinStatus: 0,
      disJoin: false,
      needpaymoney: '0.00',
      showInfo: false,
      showCheckModal: true,
      checkedSelf: false
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
      this.needpaymoney = '0.00'
    },
    closeCheckModal () {
      this.closeCheckModal = false
    },
    clickSelf () {
      this.checkedSelf = !this.checkedSelf
    },
    closeInfo () {
      this.showInfo = false
    },
    viewInfo () {
      this.showInfo = true
    },
    toBill () {
      this.$router.push({path: '/factoryBill', query: {fid: this.loginUser.fid, fromfid: this.Fid}})
    },
    toProduct (item) {
      let params = this.$util.handleAppParams(this.query, {id: item.id, fid: this.Fid, module: 'fpimport'})
      this.$router.push({path: '/fpimportProduct', query: params})
    },
    toStore () {
      if (this.query.from) {
        this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.store}?wid=${this.loginUser.uid}`})
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
            fid: self.Fid
          }).then(res => {
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
        con = `确定要导入该厂家的商品？`
        ajaxUrl = `${ENV.BokaApi}/api/factory/fastImportFactoryProduct`
      } else if (type === 'factorynews') {
        con = `确定要导入该厂家的文章？`
        ajaxUrl = `${ENV.BokaApi}/api/factory/fastImportFactoryNews`
      }
      self.$vux.confirm.show({
        content: con,
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(ajaxUrl, {
            fid: self.Fid
          }).then(res => {
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
      self.$vux.confirm.show({
        content: '确定要导入该厂家的商品？',
        onConfirm: () => {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/factory/productshelf`, {
            module: 'factoryproduct', type: 'all', fid: self.loginUser.fid, fromfid: self.Fid
          }).then(res => {
            let data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              type: data.flag === 1 ? 'success' : 'warn',
              time: self.$util.delay(data.error)
            })
            if (data.flag) {
              for (let i = 0; i < self.tabData1.length; i++) {
                self.tabData1[i].haveshelf = 1
              }
            }
          })
        }
      })
    },
    upEvent (item, index) {
      const self = this
      let con = '确定导入商品吗？'
      if (!this.joinStatus) {
        con = '确定导入商品并加盟该厂家吗？'
      }
      self.$vux.confirm.show({
        content: con,
        onConfirm: () => {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/factory/productshelf`, {
            fid: self.loginUser.fid, module: 'factoryproduct', moduleid: item.moduleid
          }).then(res => {
            let data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              type: data.flag === 1 ? 'success' : 'warn',
              time: self.$util.delay(data.error)
            })
            if (data.flag) {
              this.tabData1[index].haveshelf = 1
              this.joinStatus = true
            }
          })
        }
      })
    },
    toJoin () {
      const self = this
      self.$vux.confirm.show({
        content: '确定加盟该厂家吗？',
        onConfirm: () => {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/factory/fpimportApply`, {
            fromfid: self.Fid, fid: self.loginUser.fid
          }).then(res => {
            let data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              type: data.flag === 1 ? 'success' : 'warn',
              time: self.$util.delay(data.error)
            })
            if (data.flag) {
              self.joinStatus = 1
            }
          })
        }
      })
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
    getData1 () {
      const self = this
      self.$http.get(`${ENV.BokaApi}/api/list/fpimport`, {
        params: {fid: self.Fid, myfid: this.loginUser.fid, pagestart: pageStart1, limit: limit, shelf: 1}
      }).then(res => {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        this.productCount = data.allcount
        self.tabData1 = self.tabData1.concat(retdata)
        self.disTabData1 = true
        if ((self.tabData1.length > 0 || self.tabData2.length > 0) && this.loginUser.fid !== this.Fid) {
          self.showBottom = true
        }
        self.joinStatus = data.join
        self.disJoin = true
        self.needpaymoney = data.needpaymoney
      })
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      console.log(this.query)
      this.initData()
      this.loginUser = User.get()
      this.query = this.$route.query
      if (this.query.fid) {
        this.Fid = parseInt(this.query.fid)
      } else {
        this.Fid = this.loginUser.fid
      }
      self.$vux.loading.show()
      self.$http.get(`${ENV.BokaApi}/api/factory/info`, {
        params: { fid: self.Fid }
      }).then(res => {
        self.$vux.loading.hide()
        let data = res.data
        let retdata = data.data ? data.data : data
        self.viewData = retdata
        if (this.tabData1.length < limit) {
          self.$vux.loading.show()
          pageStart1 = 0
          this.disTabData1 = false
          this.tabData1 = []
          this.getData1()
        }
      })
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
.check-modal{
  .check-item{
    background-color:#ffe9e6;margin-top:15px;border-radius:5px;padding:10px;width:100%;box-sizing:border-box;
    .radius{
      width:40px;height:40px;background-color:#fff;border-radius:50%;
      display:flex;justify-content:center;align-items:center;
    }
    .radio-ico{
      width:20px;height:20px;border:#ff6a61 1px solid;border-radius:50%;box-sizing:border-box;background-color:#fff;
      display:flex;justify-content:center;align-items:center;
    }
    .radio-ico.checked:after{
      content:"";width:10px;height:10px;background-color:#ff6a61;border-radius:50%;
    }
  }
}
</style>
