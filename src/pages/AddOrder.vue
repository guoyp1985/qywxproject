<template>
  <div class="containerarea s-havebottom font14">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="s-container" style="top:0;">
        <form>
          <template v-if="onlineVal">
    				<div class="padding10 b_bottom_after bg-white" @click="showaddress">
    					<div class="t-table">
    						<div v-if="selectaddress" class="t-cell v_middle">
    							<div>收货人：{{ selectaddress.linkman }} {{ selectaddress.telephone}}</div>
    							<div>收货地址：{{ selectaddress.fulladdress }}</div>
    						</div>
    						<div v-else class="t-cell v_middle color-red">请选择地址</div>
    						<div class="t-cell v_middle" style="width:30px;">
    							<i class="al al-mjiantou-copy2"></i>
    						</div>
    					</div>
    				</div>
            <div style="height:12px;"></div>
          </template>
          <div v-for="(item,index) in orderdata" :key="item.id" class="orderitem bg-white">
            <div v-for="(product,index1) in item.info" :key="product.id" class="productitem">
    					<div class="b_bottom_after padding10">
    						<div class="t-table">
    							<div class="t-cell v_middle" style="width:65px;">
                    <img v-if="item.options && item.options.id" class="v_middle imgcover" style="width:45px;height:45px;" :src="item.options.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                    <img v-else class="v_middle imgcover" style="width:45px;height:45px;" :src="product.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                  </div>
    							<div class="t-cell v_middle">
    								<div class="name color-black font15">{{ product.name }}</div>
    								<div class="clamp1 color-gray font12" v-if="item.options && item.options.id">{{ item.options.title }}</div>
    							</div>
    							<div class="t-cell v_middle w100 align_right">¥{{ product.special }}×{{ submitdata.quantity }}</div>
    						</div>
    					</div>
    					<div class="b_bottom_after padding10 form-item">
    						<div class="t-table">
    							<div class="t-cell v_middle" style="width:80px;">购买数量</div>
    							<div class="t-cell v_middle align_right">
                    <group class="x-number db-in">
                      <template v-if="product.crowdtype == 'bargainbuy'">
                        <x-number v-model="submitdata.quantity" :min="1" :max="1" @on-change="changenumber()"></x-number>
                      </template>
                      <template v-else>
                        <x-number v-model="submitdata.quantity" :min="1" :max="maxQuantity" @on-change="changenumber()"></x-number>
                      </template>
                    </group>
    							</div>
    						</div>
    					</div>
            </div>
            <template v-if="item.allowcard">
              <div class="b_bottom_after pl10 pr10 color-orange" v-if="cardList && cardList.length">
                <div class="t-table">
                  <div class="t-cell v_middle" style="width:60px;">{{ $t('Card') }}</div>
                  <div class="t-cell v_middle align_right" @click="checkCard">
                    <template v-if="!selectedCard">
                      <span class="v_middle">请选择</span><i class="al al-mjiantou-copy2 v_middle"></i>
                    </template>
                    <template v-else>
                      <span class="v_middle">满{{selectedCard.ordermoney}}减{{selectedCard.money}}</span><i class="al al-mjiantou-copy2 v_middle"></i>
                    </template>
                  </div>
                </div>
              </div>
              <div class="b_bottom_after padding10" v-else>
                <div class="t-table">
                  <div class="t-cell v_middle color-orange w60">{{ $t('Card') }}</div>
                  <div class="t-cell v_middle align_right color-gray">暂无可用优惠券</div>
                </div>
              </div>
            </template>
            <div class="b_bottom_after padding10">
              <div class="t-table">
                <div class="t-cell v_middle w100">收货方式</div>
                <div class="t-cell v_middle align_right">
                  <check-icon class="red-check" :value.sync="onlineVal"  @click.native.stop="setBuy(1)">卖家发货</check-icon>
                  <check-icon class="red-check" :value.sync="offlineVal" @click.native.stop="setBuy(0)">到店自提</check-icon>
                </div>
              </div>
            </div>
            <div class="b_bottom_after padding10" v-if="onlineVal && item.postage && item.postage != ''">
              <div class="t-table">
                <div class="t-cell v_middle" style="width:40px;">{{ $t('Postage') }}</div>
                <div class="t-cell v_middle">
                  <span v-if="item.postage == 0">包邮</span>
                  <span>{{ $t('RMB') }}{{ item.postage }}</span>
                </div>
              </div>
            </div>
            <div class="b_bottom_after padding10">
              <div class="t-table">
                <div class="t-cell v_middle" style="width:40px;">留言</div>
                <div class="t-cell v_middle">
                  <group class="textarea-outer" style="padding:0;">
                    <x-textarea
                      ref="contentTextarea"
                      v-model="submitdata.content"
                      style="padding:5px;"
                      class="x-textarea"
                      :placeholder="$t('To seller message')"
                      :show-counter="false"
                      :rows="1"
                      @on-change="textareaChange('contentTextarea')"
                      @on-focus="textareaFocus('contentTextarea')"
                      autosize>
                    </x-textarea>
                  </group>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="s-bottom toolbar_bg">
        <div class="t-table h_100 align_center">
  				<div class="t-cell h_100 v_middle">需付：<span class="color-orange1">{{ $t('RMB') }}{{ payPrice }}</span></div>
  				<div class="t-cell h_100 v_middle w100 bg-orange1 color-white" @click="submitOrder">确认订单</div>
  			</div>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showpopup" height="100%">
          <div class="popup1">
            <div class="popup-top flex_center">选择地址</div>
            <div class="popup-middle font14">
              <div class="scroll_list">
                <template v-if="addressdata.length == 0">
                  <div class="scroll_item emptyitem">
          					<div class="t-table">
          						<div class="t-cell" style="padding:10px;">暂无地址信息</div>
          					</div>
          				</div>
                </template>
                <check-icon v-else class="x-check-icon scroll_item" v-for="(item,index) in addressdata" :key="item.id" :value.sync="item.checked" @click.native.stop="radioclick(item,index)">
                  <div class="t-table">
                    <div class="t-cell v_middle" style="color:inherit;">
                      <div class="clamp1">{{ item.linkman }} {{ item.telephone}}</div>
                      <div class="clamp1">{{ item.fulladdress }}</div>
                    </div>
                  </div>
                </check-icon>
              </div>
            </div>
            <div class="popup-bottom flex_center">
              <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closepopup">{{ $t('Close') }}</div>
              <router-link :to="{ path: '/newAddress', query: {lasturl: `/addOrder?id=${query.id}`} }" class="flex_cell h_100 flex_center bg-red color-white">新建地址</router-link>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showCard" height="100%">
          <div class="popup1">
            <div class="popup-top flex_center">选择{{$t('Card')}}</div>
            <div class="popup-middle font14">
              <div class="scroll_list">
                <template v-for="(item,index) in cardList">
                  <template v-if="(cardPrice >= item.ordermoney) && ((cardPrice - item.money - curOrder.rebate >= 0) || (item.money > cardPrice && curOrder.rebate <= 0))">
                    <check-icon class="x-check-icon scroll_item padding10" :value.sync="item.checked" @click.native.stop="cardClick(item,index)">
                      <div class="t-table">
                        <div class="t-cell v_middle" style="color:inherit;">
                          <div class="clamp1">满{{item.ordermoney}}减{{item.money}}</div>
                        </div>
                      </div>
                    </check-icon>
                  </template>
                  <template v-else>
                    <div class="x-check-icon scroll_item padding10 color-gray">
                      <div class="t-table">
                        <div class="t-cell v_middle w80">【不可用】</div>
                        <div class="t-cell v_middle">
                          <div class="clamp1">满{{item.ordermoney}}减{{item.money}}</div>
                        </div>
                      </div>
                    </div>
                  </template>
                </template>
              </div>
            </div>
            <div class="popup-bottom flex_center">
              <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeCard">{{$t('Close')}}</div>
            </div>
          </div>
        </popup>
      </div>
      <div class="auto-modal flex_center" v-if="showModal">
        <div class="modal-inner border-box" style="width:85%;">
          <div class="flex_center padding10 b_bottom_after font16">免责说明</div>
          <div class="middle-con flex_center">
            <div class="w_100 padding10">
              <div>当前交易非平台担保模式，交易完成后，店主发货成功即可对订单收入提现，是否继续购买？</div>
              <div class="color-theme mt10">*注意: 当前交易所产生的纠纷与{{WeixinName}}平台无关</div>
              <div class="mt20 flex_center">
                <div class="flex_left flex_cell">
                  <div class="flex_center" style="width:80%;border:#ccc 1px solid;border-radius:20px;height:35px;" @click="closeModal">取消</div>
                </div>
                <div class="flex_right flex_cell">
                  <div class="flex_center bg-theme color-white" style="width:80%;border-radius:20px;height:35px;" @click="clickPay">确认购买</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<i18n>
Buy user:
  zh-CN: 购买用户
Select user:
  zh-CN: 选择用户
Buy product:
  zh-CN: 购买商品
Order price:
  zh-CN: 订单金额
Visit date:
  zh-CN: 回访时间
Submit order:
  zh-CN: 提交订单
Receiver info:
  zh-CN: 收货人信息
Receiver:
  zh-CN: 收货人
Receiver placeholder:
  zh-CN: 收货人姓名
Mobile:
  zh-CN: 手机号
Mobile placeholder:
  zh-CN: 收货人手机号
Buyer address:
  zh-CN: 买家地址
Buyer address placeholder:
  zh-CN: 买家地址
Detail address:
  zh-CN: 详细地址
Detail address placeholder:
  zh-CN: 详细地址
Deliver info:
  zh-CN: 物流信息
Deliver commpany:
  zh-CN: 物流公司
Cancel txt:
  zh-CN: 取消
Confirm txt:
  zh-CN: 提交
To seller message:
  zh-CN: 给卖家留言
Please select address:
  zh-CN: 请选择地址
</i18n>

<script>
import { Group, XNumber, XTextarea, TransferDom, Popup, CheckIcon, XImg } from 'vux'
import { mapState } from 'vuex'
import Sos from '@/components/Sos'
import ENV from 'env'
import { User } from '#/storage'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group, XNumber, XTextarea, Popup, CheckIcon, XImg, Sos
  },
  data () {
    return {
      loginUser: {},
      retailerInfo: {},
      showSos: false,
      sosTitle: '无效订单',
      showContainer: false,
      query: {},
      payPrice: '0.00',
      orderPrice: '0.00',
      cardPrice: '0.00',
      postage: 0,
      selectaddress: null,
      orderdata: [],
      showpopup: false,
      addressdata: [],
      submitdata: {
        addressid: '',
        quantity: 1,
        shopid: 0,
        content: ''
      },
      submiting: false,
      showCard: false,
      cardList: [],
      selectedCard: null,
      curOrder: {postageNumber: 0, rebate: 0},
      buyType: 'online',
      onlineVal: true,
      offlineVal: false,
      maxQuantity: 1,
      WeixinName: ENV.WeixinName,
      showModal: false,
      payData: {}
    }
  },
  watch: {
    query: function () {
      return this.query
    },
    orderdata: function () {
      return this.orderdata
    },
    submitdata: function () {
      return this.submitdata
    },
    payPrice: function () {
      return this.payPrice
    },
    selectaddress: function () {
      return this.selectaddress
    }
  },
  computed: {
    ...mapState({
      isMiniInvoke: state => state.vux.miniInvoke
    })
  },
  methods: {
    initData () {
      this.showSos = false
      this.sosTitle = '无效订单'
      this.showContainer = false
      this.query = {}
      this.payPrice = '0.00'
      this.cardPrice = '0.00'
      this.selectaddress = null
      this.orderdata = []
      this.showpopup = false
      this.addressdata = []
      this.submitdata = {
        addressid: '',
        quantity: 1,
        shopid: 0,
        content: ''
      }
      this.submiting = false
      this.showCard = false
      this.cardList = []
      this.selectedCard = null
      this.buyType = 'online'
      this.onlineVal = true
      this.offlineVal = false
    },
    setBuy (val) {
      let total = parseFloat(this.payPrice)
      let curpostage = this.orderdata[0].postage
      if (curpostage) {
        curpostage = parseFloat(curpostage.replace(/,/g, ''))
      }
      if (val === 1) {
        this.buyType = 'online'
        this.onlineVal = true
        this.offlineVal = false
        this.payPrice = (total + curpostage).toFixed(2)
      } else {
        this.buyType = 'offline'
        this.onlineVal = false
        this.offlineVal = true
        this.payPrice = (total - curpostage).toFixed(2)
      }
    },
    textareaChange (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    textareaFocus (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    changenumber () {
      const self = this
      let total = 0
      for (let i = 0; i < self.orderdata.length; i++) {
        let order = self.orderdata[i]
        let productinfos = order.info
        for (let j = 0; j < productinfos.length; j++) {
          let pd = productinfos[j]
          total += parseFloat(pd.special) * self.submitdata.quantity
        }
      }
      self.cardPrice = total
      if (self.orderdata[0].postage) {
        let curpostage = self.orderdata[0].postage.replace(/,/g, '')
        total += parseFloat(curpostage)
      }
      self.payPrice = total.toFixed(2)
      self.orderPrice = self.payPrice
      self.selectedCard = null
      for (let d of self.cardList) {
        if (d.checked) {
          delete d.checked
          break
        }
      }
    },
    showaddress () {
      this.showpopup = true
    },
    closepopup () {
      this.showpopup = false
    },
    radioclick (data, index) {
      const self = this
      if (data.checked) {
        self.selectaddress = data
      } else {
        self.selectaddress = null
      }
      for (let d of self.addressdata) {
        if (d.id !== data.id && d.checked) {
          delete d.checked
          break
        }
      }
      self.showpopup = false
    },
    cardClick (data, index) {
      const self = this
      if (data.checked) {
        self.selectedCard = data
        let cha = parseFloat(self.orderPrice) - parseFloat(self.postage) - parseFloat(data.money)
        cha = cha < 0 ? 0 : cha
        self.payPrice = (cha + parseFloat(self.postage)).toFixed(2)
      } else {
        self.selectedCard = null
        self.payPrice = self.orderPrice
      }
      for (let d of self.cardList) {
        if (d.id !== data.id && d.checked) {
          delete d.checked
          break
        }
      }
      self.showCard = false
    },
    closeCard () {
      this.showCard = false
    },
    ajaxOrder (postData) {
      const self = this
      self.submiting = true
      if (self.selectedCard) {
        postData.cardid = self.selectedCard.id
      }
      self.$http.post(`${ENV.BokaApi}/api/order/addOrder`, postData).then(function (res) {
        let data = res.data
        self.isShowLoading = false
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              if (self.isMiniInvoke) {
                self.$wechat.miniProgram.redirectTo({url: `${ENV.MiniRouter.pay}?id=${data.id}`})
              } else {
                if (data.id) {
                  location.replace(`${ENV.Host}/#/pay?id=${data.id}`)
                } else {
                  self.$router.push({path: `/payment?wid=${self.curOrder.wid}`})
                }
              }
            } else {
              self.submiting = false
            }
          }
        })
      })
    },
    submitOrder () {
      const self = this
      if (!self.submiting) {
        if (self.offlineVal) {
          self.$vux.confirm.show({
            content: '你当前选择的收货方式是到店自提，需自己去卖家实体店进行提货！',
            confirmText: '立即购买',
            cancelText: '更换收货方式',
            onConfirm: () => {
              let postData = self.submitdata
              postData.delivertype = 2
              this.payData = postData
              if (this.curOrder.accounttype === 1 && !this.curOrder.info[0].fid) {
                this.showModal = true
              } else {
                this.clickPay()
              }
            }
          })
        } else {
          if (!self.submitdata.addressid) {
            self.$vux.toast.show({
              text: '请选择地址'
            })
            return false
          }
          self.submitdata.addressid = self.selectaddress.id
          this.payData = this.submitdata
          if (this.curOrder.accounttype === 1 && !this.curOrder.info[0].fid) {
            this.showModal = true
          } else {
            this.clickPay()
          }
        }
      }
    },
    clickPay () {
      this.isShowLoading = true
      this.ajaxOrder(this.payData)
    },
    closeModal () {
      this.showModal = false
      this.payData = {}
    },
    handleAddress () {
      const self = this
      for (let i = 0; i < self.addressdata.length; i++) {
        let a = self.addressdata[i]
        if (a.isdefault) {
          self.selectaddress = a
          self.addressdata[i].checked = true
          break
        }
      }
      if (!self.selectaddress && self.addressdata.length > 0) {
        self.selectaddress = self.addressdata[0]
        self.addressdata[0].checked = true
      }
      if (self.selectaddress) {
        self.submitdata.addressid = self.selectaddress.id
      }
    },
    getData () {
      const self = this
      self.$http.get(`${ENV.BokaApi}/api/order/shopShow`).then((res) => {
        let data = res.data
        if (data.length === 0) {
          self.showContainer = false
          self.showSos = true
        } else {
          self.showContainer = true
          let retdata = data.data ? data.data : data
          self.orderdata = retdata
          self.curOrder = self.orderdata[0]
          let curstorage = self.curOrder.storage
          if (self.curOrder.activityinfo && curstorage > self.curOrder.activityinfo.everybuy) {
            curstorage = self.curOrder.activityinfo.everybuy
          }
          self.maxQuantity = curstorage
          let curpostage = self.curOrder.postage.replace(/,/g, '')
          self.curOrder.postageNumber = parseFloat(curpostage).toFixed(2)
          self.curOrder.rebate = parseFloat(self.curOrder.rebate).toFixed(2)
          let total = 0
          let total1 = 0
          for (let i = 0; i < self.orderdata.length; i++) {
            let order = self.orderdata[i]
            let postd = { shopinfo: [], content: '' }
            let productinfos = order.info
            for (let j = 0; j < productinfos.length; j++) {
              let info = productinfos[j]
              let p = { shopid: info.id, quantity: info.quantity }
              postd.shopinfo.push(p)
              total += parseFloat(info.special) * info.quantity
              total1 += parseFloat(info.special) * info.quantity
            }
            if (order.postage) {
              total += parseFloat(order.postage.replace(/,/g, ''))
            }
            self.postage = parseFloat(order.postage.replace(/,/g, ''))
          }
          self.cardPrice = total1
          self.payPrice = total.toFixed(2)
          self.orderPrice = self.payPrice
          return self.$http.get(`${ENV.BokaApi}/api/user/address/list`)
        }
      }).then(res => {
        if (res) {
          let data = res.data
          let retdata = data.data ? data.data : data
          if (retdata) {
            if (retdata.length) {
              self.addressdata = retdata
              self.handleAddress()
            } else {
              this.$wechat.ready(() => {
                this.$vux.confirm.show({
                  content: '是否使用微信地址？',
                  onConfirm: () => {
                    this.$util.wxAddress((data1, newData) => {
                      if (data1.flag) {
                        this.addressdata = newData
                        this.handleAddress()
                      }
                    })
                  }
                })
              })
            }
          }
          return self.$http.post(`${ENV.BokaApi}/api/card/canUse`, {
            wid: self.orderdata[0].wid, ordermoney: self.payPrice, productid: self.orderdata[0].info[0].pid
          })
        }
      }).then(res => {
        if (res) {
          self.cardList = res.data.data
          for (let i = 0; i < self.cardList.length; i++) {
            const item = self.cardList[i]
            if (self.cardPrice >= item.ordermoney && ((self.cardPrice - item.money - self.curOrder.rebate) >= 0 || (item.money > self.cardPrice && self.curOrder.rebate <= 0))) {
              self.selectedCard = item
              self.cardList[i].checked = true
              let cha = parseFloat(self.orderPrice) - parseFloat(self.postage.replace(/,/g, '')) - parseFloat(item.money)
              cha = cha < 0 ? 0 : cha
              self.payPrice = (cha + parseFloat(self.postage.replace(/,/g, ''))).toFixed(2)
              break
            }
          }
        }
      })
    },
    checkCard () {
      this.showCard = true
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.initData()
      this.query = this.$route.query
      this.submitdata.shopid = this.query.id
      this.getData()
    }
  },
  activated () {
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less" scoped>
.form-item{position:relative;padding:10px;}
.form-item:after{
  content:"";display:block;
	background-color:@list-border-color;height:1px;overflow:hidden;
	position: absolute;left: 0;right: 0;bottom:1px;
	-webkit-transform: scaleY(0.5) translateY(0.5px);
	transform: scaleY(0.5) translateY(0.5px);
	-webkit-transform-origin: 0% 0%;
	transform-origin: 0% 0%;
}
</style>
