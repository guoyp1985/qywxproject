<template>
  <div class="containerarea bg-page font14 s-havebottom rproductlist">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
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
              <div @click="toFactoryProduct(item)" class="scroll_item mb10 font14 bg-white db list-shadow " v-for="(item,index) in productdata" :key="index" style="color:inherit;">
                <div v-if="item.moderate == 0" class="ico down"></div>
            		<div class="t-table bg-white pt10 pb10">
            			<div class="t-cell pl12 v_middle" style="width:110px;">
                    <img class="imgcover v_middle" :src="getPhoto(item.photo)" style="width:100px;height:100px;" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                  </div>
            			<div class="t-cell v_middle">
                    <div class="clamp1 font16 pr10 color-lightgray">{{item.title}}</div>
                    <div class="t-table pr12 border-box mt15">
                      <div class="t-cell color-999 font14">
                        <div class="clamp1">售价:<span class="color-red"> {{ $t('RMB') }}{{ item.price }}</span></div>
                        <div class="clamp1 mt5">
                            <span class="v_middle db-in">库存: {{ item.storage }}{{item.unit}}</span>
                            <span class="v_middle db-in ml5">已售: {{ item.truesaled }}{{item.unit}}</span>
                        </div>
                        <div class="clamp1 mt5">
                            <span class="v_middle db-in">销售佣金: {{ item.salesrebate }}</span>
                            <span class="v_middle db-in ml5">推荐佣金: {{ item.superrebate }}</span>
                        </div>
                      </div>
                      <div class="align_right t-cell v_bottom w80">
                        <div class="btnicon bg-red color-white font12" @click.stop="controlpopup1(item,index)">
                          <i class="al al-asmkticon0165 v_middle"></i>
                        </div>
                      </div>
                    </div>
            			</div>
            		</div>
              </div>
            </div>
          </template>
        </template>
      </div>
      <div class="s-bottom flex_center pl12 pr12 list-shadow02 bg-white">
        <div class="flex_center flex_cell">
          <router-link class="flex_center bg-orange color-white" style="width:85%;border-radius:50px;height:35px;" to="/sourceList">货源</router-link>
        </div>
        <div class="flex_cell flex_center">
          <div class="bg-red flex_center color-white" style="width:85%;border-radius:50px;height:35px;" @click="toAdd">{{ $t('Add product') }}</div>
        </div>
      </div>
      <div v-transfer-dom>
        <popup class="menuwrap" v-model="showpopup1">
          <div class="popup0">
            <div class="list" v-if="clickdata">
              <template v-if="!clickdata.fromfid">
                <div class="item">
                  <div class="inner" @click="clickpopup('copy')">复制商品信息</div>
                </div>
                <div class="item">
                  <router-link class="inner" :to="{path: '/agentProduct', query: {pid: clickdata.id}}">经销商价格</router-link>
                </div>
                <div class="item">
                  <router-link class="inner" :to="{path: '/materialbank', query: {pid: clickdata.id}}">素材库</router-link>
                </div>
                <div class="item" v-if="clickdata.moderate == 1">
                  <div class="inner" @click="clickpopup('recommend')" v-if="clickdata.recommend == 0">商品推荐</div>
                  <div class="inner" @click="clickpopup('recommend')" v-else>取消推荐</div>
                </div>
                <div class="item">
                  <router-link class="inner" :to="{path: '/postageArea', query: {type: 'factoryproduct',id: clickdata.id}}">偏远地区运费</router-link>
                </div>
                <div class="item" v-if="!clickdata.activityid || clickdata.activityid == 0">
                  <router-link class="inner" :to="{path: '/addFpimportProduct', query: {id: clickdata.id, fid: Fid}}">编辑</router-link>
                </div>
              </template>
              <div class="item" v-if="clickdata.moderate == 0">
                <div class="inner" @click="clickpopup('up')">上架</div>
              </div>
              <div class="item" v-else-if="clickdata.moderate == 1">
                <div class="inner" @click="clickpopup('down')">下架</div>
              </div>
              <div class="item" v-if="clickdata.shelf == 0">
                <div class="inner" @click="clickpopup('upShelf')">推荐到货源</div>
              </div>
              <div class="item" v-else-if="clickdata.shelf == 1">
                <div class="inner" @click="clickpopup('downShelf')">从货源移出</div>
              </div>
              <div class="item">
                <div class="inner" @click="clickpopup('fee')">设置佣金</div>
              </div>
              <div class="item">
                <router-link class="inner" :to="{path: '/stat', query: {id: clickdata.id, module: 'factoryproduct'}}">统计</router-link>
              </div>
              <!-- <div class="item">
                <router-link class="inner" :to="{ path: '/factoryAgentFee', query: { id: clickdata.id, fid: Fid } }">设置佣金</router-link>
              </div> -->
              <div class="item close mt10" @click="clickpopup">
                <div class="inner">{{ $t('Cancel txt') }}</div>
              </div>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showFeePopup" height="100%">
          <div class="popup1">
            <div class="popup-top flex_center">设置佣金</div>
            <div class="popup-middle font14">
              <div class="pt10 pb10 pl12 pr12">
                <div class="t-table bg-white pt10 pb10">
            			<div class="t-cell pl12 v_middle" style="width:110px;">
                    <img class="imgcover v_middle" :src="getPhoto(feeData.photo)" style="width:100px;height:100px;" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                  </div>
            			<div class="t-cell v_middle">
                    <div class="clamp1 font16 pr10 color-lightgray">{{feeData.title}}</div>
                    <div class="t-table pr12 border-box mt15">
                      <div class="t-cell color-999 font14">
                        <div class="clamp1">售价:<span class="color-red"> {{ $t('RMB') }}{{ feeData.price }}</span></div>
                        <div class="clamp1 mt5" v-if="feeData.fpid > 0">厂家佣金:<span class="color-red"> {{ $t('RMB') }}{{ feeData.rebatein }}</span></div>
                        <div class="clamp1 mt5">
                            <span class="v_middle db-in">已售: {{ feeData.saled }}{{feeData.unit}}</span>
                        </div>
                      </div>
                    </div>
            			</div>
            		</div>
                <div class="form-item">
                  <div class="t-table">
                    <div class="t-cell title-cell w80 font14 v_middle">销售佣金<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
                    <div class="t-cell input-cell v_middle" style="position:relative;">
                      <x-input v-model="postSalesRebate" type="text" class="input" placeholder="销售佣金"></x-input>
                    </div>
                  </div>
                </div>
                <div class="form-item">
                  <div class="t-table">
                    <div class="t-cell title-cell w80 font14 v_middle">推荐佣金<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
                    <div class="t-cell input-cell v_middle" style="position:relative;">
                      <x-input v-model="postSuperRebate" type="text" class="input" placeholder="推荐佣金"></x-input>
                    </div>
                  </div>
                </div>
    					</div>
            </div>
            <div class="popup-bottom flex_center">
              <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeFeePopup">{{ $t('Close') }}</div>
              <div class="flex_cell h_100 flex_center bg-green color-white" @click="submitFee">提交</div>
            </div>
          </div>
        </popup>
      </div>
      <template v-if="showTip">
        <tip-layer
          @clickButton="recommendSubmit"
          @clickClose="closeTipModal"
          title="商品推荐优势"
          content="推荐商品审核通过后，将自动推荐给平台所有卖家，帮助您卖货，快速提高销售额。"
          buttonTxt="立即推荐">
        </tip-layer>
      </template>
    </template>
  </div>
</template>

<i18n>
</i18n>

<script>
import { TransferDom, Popup, Confirm, CheckIcon, XImg, XInput } from 'vux'
import ENV from 'env'
import { User } from '#/storage'
import Sos from '@/components/Sos'
import TipLayer from '@/components/TipLayer'

let pageStart1 = 0
const limit = 10

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, Confirm, CheckIcon, XImg, Sos, TipLayer, XInput
  },
  data () {
    return {
      showSos: false,
      sosTitle: '抱歉，您暂无权限访问此页面！',
      showContainer: false,
      query: {},
      loginUser: {},
      productdata: [],
      showpopup1: false,
      clickdata: {},
      clickindex: 0,
      disproductdata: false,
      showTip: false,
      Fid: 0,
      showFeePopup: false,
      feeData: {},
      postSalesRebate: '',
      postSuperRebate: ''
    }
  },
  watch: {
    productdata: function () {
      return this.productdata
    }
  },
  methods: {
    toFactoryProduct (item) {
      let params = this.$util.handleAppParams(this.query, {id: item.id, fid: this.Fid, module: 'fpimport'})
      this.$router.push({path: '/factoryProduct', query: params})
    },
    toAdd () {
      let params = this.$util.handleAppParams(this.query, {fid: this.Fid})
      this.$router.push({path: '/addFactoryProduct', query: params})
    },
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
            self.$http.post(`${ENV.BokaApi}/api/moderate/fpimport`, params).then(function (res) {
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
            self.$http.post(`${ENV.BokaApi}/api/moderate/fpimport`, params).then(function (res) {
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
      } else if (key === 'recommend') {
        self.showpopup1 = false
        if (this.clickdata.recommend) {
          self.recommendSubmit()
        } else {
          self.showTip = true
        }
      } else if (key === 'copy') {
        self.showpopup1 = false
        self.$vux.confirm.show({
          title: '复制成功将会重新生成与当前商品信息完全一致的新商品',
          confirmText: '复制',
          onConfirm: () => {
            self.$vux.loading.show()
            self.$http.post(`${ENV.BokaApi}/api/copy/factoryproduct`, {
              id: this.clickdata.id
            }).then(res => {
              let data = res.data
              self.$vux.loading.hide()
              let error = data.flag ? '成功' : data.error
              self.$vux.toast.show({
                text: error,
                type: data.flag !== 1 ? 'warn' : 'success',
                time: self.$util.delay(error),
                onHide: () => {
                  if (data.flag === 1) {
                    this.$router.push({path: '/addFactoryProduct', query: {id: data.data.id}})
                    // if (self.productdata.length === (pageStart1 + 1) * limit) {
                    //   self.productdata.splice(self.productdata.length - 1, 1)
                    // }
                    // self.productdata = [data.data].concat(self.productdata)
                  }
                }
              })
            })
          }
        })
      } else if (key === 'upShelf') {
        self.showpopup1 = false
        if (!this.loginUser.bankcardno || this.loginUser.bankcardno === '' || !this.loginUser.bankname || this.loginUser.bankname === '') {
          self.$vux.confirm.show({
            title: '您还没有绑定银行卡，请先绑定银行卡信息，其他厂家出售商品后，将会把订单金额直接打款到您的银行卡账户上。',
            confirmText: '去绑定',
            onConfirm: () => {
              let fromPage = ''
              if (this.query.appid) {
                fromPage = encodeURIComponent(`/factoryProductlist?fid=${this.Fid}&appid=${this.query.appid}`)
              } else {
                fromPage = encodeURIComponent(`/factoryProductlist?fid=${this.Fid}`)
              }
              this.$router.push({path: '/factoryBank', query: {fid: this.Fid, fromPage: fromPage}})
            }
          })
          return false
        }
        self.$vux.confirm.show({
          title: '确定要将该商品移至货源吗？',
          onConfirm: () => {
            self.$vux.loading.show()
            let params = { id: self.clickdata.id, shelf: 1 }
            self.$http.post(`${ENV.BokaApi}/api/factory/productset`, params).then(function (res) {
              let data = res.data
              self.$vux.loading.hide()
              self.$vux.toast.show({
                text: data.error,
                type: (data.flag !== 1 ? 'warn' : 'success'),
                time: self.$util.delay(data.error),
                onHide: function () {
                  if (data.flag === 1) {
                    self.clickdata.shelf = 1
                    self.productdata[self.clickindex].shelf = 1
                    self.showpopup1 = false
                  }
                }
              })
            })
          }
        })
      } else if (key === 'downShelf') {
        self.showpopup1 = false
        self.$vux.confirm.show({
          title: '确定要将该商品从货源移出吗？',
          onConfirm () {
            self.$vux.loading.show()
            let params = { id: self.clickdata.id, shelf: 0 }
            self.$http.post(`${ENV.BokaApi}/api/factory/productset`, params).then(function (res) {
              let data = res.data
              self.$vux.loading.hide()
              self.$vux.toast.show({
                text: data.error,
                type: (data.flag !== 1 ? 'warn' : 'success'),
                time: self.$util.delay(data.error),
                onHide: function () {
                  if (data.flag === 1) {
                    self.clickdata.shelf = 0
                    self.productdata[self.clickindex].shelf = 0
                    self.showpopup1 = false
                  }
                }
              })
            })
          }
        })
      } else if (key === 'fee') {
        self.showpopup1 = false
        self.showFeePopup = true
        self.feeData = self.clickdata
      } else {
        self.showpopup1 = false
      }
    },
    closeFeePopup () {
      this.showFeePopup = false
      this.postSalesRebate = ''
      this.postSuperRebate = ''
    },
    submitFee () {
      const self = this
      let salesRebate = self.postSalesRebate
      let superRebate = self.postSuperRebate
      if (self.$util.trim(salesRebate) === '' || self.$util.trim(superRebate) === '') {
        self.$vux.toast.show({
          text: '请输入销售佣金和推荐佣金'
        })
        return false
      }
      if (isNaN(salesRebate) || parseFloat(salesRebate) < 0 || isNaN(superRebate) || parseFloat(superRebate) < 0) {
        self.$vux.toast.show({
          text: '请输入正确的佣金'
        })
        return false
      }
      self.$http.post(`${ENV.BokaApi}/api/factory/productset`, {
        id: self.clickdata.id, salesrebate: salesRebate, superrebate: superRebate
      }).then(function (res) {
        let data = res.data
        const retdata = data.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          type: data.flag !== 1 ? 'warn' : 'success',
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.showFeePopup = false
              switch (self.selectedIndex) {
                case 0:
                  self.tabData1[self.clickindex] = retdata
                  break
                case 1:
                  self.tabData2[self.clickindex] = retdata
                  break
              }
            }
          }
        })
      })
    },
    closeTipModal () {
      this.showTip = false
    },
    recommendSubmit () {
      this.showTip = false
      this.$vux.loading.show()
      let oldValue = this.clickdata.recommend
      let params = {param: 'recommend', paramvalue: 1, id: this.clickdata.id, module: 'factoryproduct'}
      if (this.clickdata.recommend) {
        params.paramvalue = 0
      }
      this.$http.post(`${ENV.BokaApi}/api/setModulePara/factoryproduct`, params).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        let error = data.error
        if (data.flag === 1) {
          if (oldValue) {
            error = '取消成功'
          } else {
            error = '推荐成功'
          }
        }
        this.$vux.toast.show({
          text: error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: this.$util.delay(error),
          onHide: () => {
            if (data.flag === 1) {
              if (oldValue) {
                this.productdata[this.clickindex].recommend = 0
              } else {
                this.productdata[this.clickindex].recommend = 1
              }
            }
          }
        })
      })
    },
    getData1 () {
      const self = this
      const params = { fid: self.Fid, pagestart: pageStart1, limit: limit }
      this.$http.get(`${ENV.BokaApi}/api/list/fpimport`, {
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
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      const self = this
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
        if (!(self.loginUser.fid && parseInt(self.loginUser.fid) === parseInt(self.$route.query.fid)) && !isAdmin && self.$route.query.fromapp !== 'factory') {
          this.$vux.loading.hide()
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          this.$vux.loading.hide()
          this.query = this.$route.query
          if (this.query.fid) {
            this.Fid = this.query.fid
          } else {
            this.Fid = this.loginUser.fid
          }
          this.disproductdata = false
          this.productdata = []
          this.$vux.loading.show()
          pageStart1 = 0
          this.getData1()
        }
      }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.rproductlist .scroll_item{overflow:hidden;position:relative;}
.rproductlist .scroll_item .ico{display:none;}
.rproductlist .scroll_item .down.ico{
  display:block;
  position:absolute;right:0;top:0;width:96px;height:25px;line-height:25px;
  background-color:#8a8a8a;color:#fff;text-align:center;font-size: 12px;
  -webkit-transform: translate(30px,5px) rotate(45deg);
  transform: translate(30px,5px) rotate(45deg);
}
.rproductlist .scroll_item .down.ico:after{content:"已下架";}
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
