/*
* @description: 订单详情页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="order-detail" class="containerarea font14 bg-page">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <sticky scroll-box="order-detail">
        <div class="order-service">
          <div class="seller-cell flex_left">
            <div class="font14 clamp1">卖家: {{retailerInfo.title}}</div>
          </div>
          <!-- <div class="contact-cell">
            <div class="ol-contact flex_center">
              <div @click="toChat" :to="{path: '/chat', query: {uid: retailerInfo.uploader,fromModule: 'order', from: query.from}}">
                <span class="al al-pinglun3 color-order-detail font14"></span>
                <span class="font13">{{$t('Contact Seller')}}</span>
              </div>
            </div>
            <div class="wx-contact flex_center">
              <a @click="wxContact">
                <span class="al al-liaotian color-order-detail font18"></span>
                <span class="font13">{{$t('Weixin Contact')}}</span>
              </a>
            </div>
          </div> -->
        </div>
      </sticky>
      <!--
      <group class="shipping-card">
        <cell v-if="expressNumber" class="express-info font14 pb5" :title="expressInfo" :value="$t('View Details')" is-link :link="{path: '/deliverinfo', query: {id: id}}"></cell>
        <cell class="font14" :title="`${$t('Receiver')}: ${receiver}`" :value="receiverPhone"></cell>
        <cell class="shipping-address font12 color-gray" :title="`${$t('Shipping Address')}: ${shippingAddress}`"></cell>
        <cell class="shipping-address font12 color-gray" :title="`${$t('Order Number')}: ${shippingOrderon}`"></cell>
      </group>
    -->
      <div v-if="data.flag != 0" class="bg-white b_bottom_after padding10">
        <div v-if="data.flag != 0 && data.flag != 1 && data.flag != 2" class="t-table mb10">
          <div class="t-cell v_middle">{{ data.delivercompanyname }} {{ data.delivercode }}</div>
          <div class="t-cell v_middle align_right w60">
            <router-link :to="{path: '/deliverinfo', query: {id: data.id}}" class="font12 color-orange5">查看详情</router-link>
          </div>
        </div>
        <div class="t-table">
          <div class="t-cell v_middle">{{ $t('Addressee')}}：{{ data.linkman ? data.linkman : '无' }}</div>
          <div class="t-cell v_middle align_right" style="width:110px;">{{ data.telephone }}</div>
        </div>
        <div class="font12 color-gray mt5">{{ $t('Shipping Address')}}：{{ data.address ? data.address : '无' }}</div>
        <div class="font12 color-gray mt5">{{ $t('Order Number')}}：{{ data.orderno }}</div>
        <!--
        <div class="color-red mt5 align_right">
          <div class="qbtn color-orange5" @click="copyTxt(data)" style="position:relative;">
            <span>复制</span>
            <div class="deliver_txt" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ data.linkman ? data.linkman + ', ' : '' }}{{ data.telephone ? data.telephone + ', ' : '' }}{{ data.address ? data.address : '' }}</div>
          </div>
        </div>
      -->
      </div>
      <div class="mt10 b_top_after bg-white font12">
        <div class="flex_left b_bottom_after padding10" v-for="(order, index) in orders" :key="index" @click="toProduct(order)">
          <div class="flex_left w70">
            <img v-if="order.options && order.options.id" style="width:60px;height:60px;border: 1px solid #f7f7f7;" class="imgcover" :src="order.options.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
            <img v-else style="width:60px;height:60px;border: 1px solid #f7f7f7;" class="imgcover" :src="order.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
          </div>
          <div class="flex_left flex_cell">
            <div class="w_100">
              <div>{{order.name}}</div>
              <div class="color-gray" v-if="order.options && order.options.id">{{order.options.title}}</div>
              <div><span>¥{{order.special}}</span><span class="color-gray ml5 font12">× {{order.quantity}}</span></div>
            </div>
          </div>
          <div class="w30 flex_right">
            <span class="al al-mjiantou-copy color-gray font14 bold"></span>
          </div>
        </div>
      </div>
      <group>
        <cell-form-preview v-if="priceInfos.length" :list="priceInfos"></cell-form-preview>
        <cell>
          <div class="color-orange">
            <span class="v_middle font12">商品: </span><span class="v_middle font14">{{ $t('RMB') }}{{data.special}}</span>
            <template v-if="!data.delivertype && data.postage && data.postage != ''">
              <span class="v_middle font12 color-gray" v-if="data.postage == 0">( {{ $t('Postage') }}: 包邮 )</span>
              <span class="v_middle font12 color-gray" v-else>( {{ $t('Postage') }}: {{ $t('RMB') }}{{ data.postage }} )</span>
            </template>
          </div>
        </cell>
      </group>
      <group>
        <cell>
          <div>
            <span class="v_middle font12 color-orange">实际支付: </span><span class="v_middle font14 color-orange">{{ $t('RMB') }}{{data.needpaymoney}}</span>
            <template v-if="data.carddeduct > 0">
              <span class="v_middle font12 ml10 color-gray">优惠券抵扣: </span><span class="v_middle font14 color-gray">{{ $t('RMB') }}{{data.carddeduct}}</span>
            </template>
          </div>
        </cell>
      </group>
      <group>
        <div class="padding10 font12 color-gray flex_left">
          <div class="flex_cell flex_left">创建时间: {{ data.dateline | dateformat }}</div>
          <div class="flex_right w60" v-if="data.delivertype == 2">到店自提</div>
        </div>
        <div class="pl10 pr10 pb10 font12 color-gray" v-if="data.flag == 3">发货时间: {{ data.delivertime | dateformat }}</div>
        <div v-if="data && data.content != ''"  class="pl10 pr10 pb10 color-gray">
          <div class="flex_left font12">
            <div class="w40">留言: </div>
            <div class="flex_cell">{{data.content}}</div>
          </div>
        </div>
      </group>
      <div class="padding10 align_right">
        <x-button v-if="data.flag == 1" mini @click.native="cancel" class="font12">取消订单</x-button>
        <x-button v-if="data.flag == 1 && data.payorder == '' && query.fromapp != 'factory'" :link="{path: '/pay', query: {id: data.id}}" mini class="font12">去支付</x-button>
        <x-button v-if="data.flag == 2 && data.canback && data.backflag != 20" mini @click.native="refund" class="font12">申请退款</x-button>
        <x-button v-if="data.flag == 3" mini @click.native="confirm" class="font12">确认收货</x-button>
        <x-button v-if="data.flag == 4" mini @click.native="evaluate" class="font12">评价</x-button>
      </div>
      <div v-transfer-dom class="qrcode-dialog">
        <x-dialog v-model="wxCardShow" class="dialog-demo">
          <template v-if="!retailerInfo || !retailerInfo.qrcode || retailerInfo.qrcode == ''">
            <div class="img-box flex_center">卖家未上传二维码</div>
          </template>
          <template v-else>
            <div class="img-box">
              <img :src="retailerInfo.qrcode" style="max-width:100%">
            </div>
            <div>
              <span>{{$t('Add To Contacts With Scan Qrcode')}}</span>
            </div>
          </template>
          <div @click="wxCardShow=false">
            <span class="vux-close"></span>
          </div>
        </x-dialog>
      </div>
      <div v-if="query.fromapp != 'factory'" class="s-bottom flex_center pl12 pr12 list-shadow02 bg-white" style="height:50px;">
        <div @click="toCenter" class="flex_cell flex_center color-white btn-bottom-red">进入个人中心</div>
      </div>
    </template>
    <div v-if="showRefundModal" class="auto-modal refund-modal flex_center">
      <div class="modal-inner border-box" style="width:80%;">
        <div class="align_center font18 bold pb10 b_bottom_after color-theme pt20">申请退款</div>
        <div class="align_left txt padding10">
          <group class="textarea-outer" style="padding:0;">
            <x-textarea
              ref="titleTextarea"
              v-model="refundContent"
              name="title" class="x-textarea noborder"
              placeholder="请输入退款原因"
              :show-counter="false"
              :rows="6"
              :max="200"
              @on-change="textareaChange('titleTextarea')"
              @on-focus="textareaFocus('titleTextarea')"
              autosize>
            </x-textarea>
          </group>
        </div>
        <div class="flex_center b_top_after" style="height:50px;">
          <div class="flex_cell flex_center h_100 b_right_after" @click="closeRefund">取消</div>
          <div class="flex_cell flex_center h_100 color-orange" @click="submitRefund">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Group, Cell, Sticky, XDialog, CellFormPreview, TransferDom, XImg, XButton, XTextarea } from 'vux'
import OrderInfo from '@/components/OrderInfo'
import Sos from '@/components/Sos'
import Time from '#/time'
import ENV from 'env'
import jQuery from 'jquery'
export default {
  directives: {
    TransferDom
  },
  components: {
    Group, Cell, Sticky, XDialog, CellFormPreview, OrderInfo, XImg, XButton, Sos, XTextarea
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showSos: false,
      sosTitle: '该订单不存在',
      showContainer: false,
      id: 0,
      data: {},
      retailerInfo: {},
      receiver: 'unkown',
      receiverPhone: '13500000000',
      expressCompany: '未知快递',
      expressNumber: '100000000000',
      shippingAddress: '北京市市辖区',
      shippingOrderon: 'unkown',
      special: 0,
      orders: [],
      priceInfos: [],
      userQrCode: '',
      wxCardShow: false,
      query: {},
      showRefundModal: false,
      refundContent: '',
      clickTxt: ''
    }
  },
  computed: {
    expressInfo () {
      return `${this.expressCompany} ${this.expressNumber}`
    }
  },
  methods: {
    toCenter () {
      if (this.query.from) {
        console.log('in click wechate')
        console.log(this.$wechat.miniProgram)
        this.clickTxt = '正在点击中'
        this.$wechat.miniProgram.reLaunch({url: `/pages/user`})
      } else {
        this.$router.push({path: '/center'})
      }
    },
    toProduct (item) {
      if (this.query.from) {
        this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.product}?id=${item.pid}&wid=${item.wid}&module=product`})
      } else {
        this.$router.push({path: '/product', query: {id: item.pid, wid: item.wid}})
      }
    },
    toChat () {
      let params = this.$util.handleAppParams(this.query, {uid: this.retailerInfo.uid, fromModule: 'order'})
      this.$router.push({path: '/chat', query: params})
    },
    textareaChange (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
      setTimeout(function () {
        curArea.updateAutosize()
      }, 50)
    },
    textareaFocus (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    evaluate () {
      this.$router.push({path: '/evaluation', query: {id: this.data.id}})
    },
    wxContact () {
      if (!this.retailerInfo.qrcode || this.retailerInfo.qrcode === '') {
        this.$util.remindQrcode(this.retailerInfo.uid)
      }
      this.wxCardShow = true
    },
    confirm (order) {
      const self = this
      this.$vux.confirm.show({
        title: '您是否确认收货？',
        content: '请确认货物已收到',
        onConfirm () {
          self.$http.post(`${ENV.BokaApi}/api/order/receive`, {id: self.data.id})
          .then(res => {
            let data = res.data
            self.$vux.toast.show({
              text: data.error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: self.$util.delay(data.error),
              onHide: function () {
                if (data.flag === 1) {
                  self.getData()
                }
              }
            })
          })
        }
      })
    },
    cancel (order) {
      const self = this
      this.$vux.confirm.show({
        title: '您确认取消订单？',
        onConfirm () {
          self.$http.post(`${ENV.BokaApi}/api/order/cancel`, {id: self.data.id})
          .then(res => {
            let data = res.data
            self.$vux.toast.show({
              text: data.error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: self.$util.delay(data.error),
              onHide: function () {
                if (data.flag === 1) {
                  self.getData()
                }
              }
            })
          })
        }
      })
    },
    refund () {
      this.showRefundModal = true
    },
    closeRefund () {
      this.showRefundModal = false
    },
    submitRefund () {
      const self = this
      self.$vux.loading.show()
      this.showRefundModal = false
      self.$http.post(`${ENV.BokaApi}/api/order/applyRefund`, {id: this.data.id, reasonreturn: this.refundContent})
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        self.$vux.toast.show({
          text: data.error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: self.$util.delay(data.error),
          onHide: () => {
            if (data.flag) {
              self.data.backflag = 20
            }
          }
        })
      })
    },
    copyTxt () {
      const self = this
      let eleobj = jQuery('#order-detail .deliver_txt')[0]
      let range = null
      let save = function (e) {
        e.clipboardData.setData('text/plain', eleobj.innerHTML)
        e.preventDefault()
      }
      if (self.$util.isIOS()) { // ios设备
        window.getSelection().removeAllRanges()
        range = document.createRange()
        range.selectNode(eleobj)
        window.getSelection().addRange(range)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
      } else { // 安卓设备
        console.log('in android')
        document.addEventListener('copy', save)
        document.execCommand('copy')
        document.removeEventListener('copy', save)
      }
      setTimeout(function () {
        self.$vux.toast.show({
          text: '复制成功',
          time: 1500
        })
      }, 200)
    },
    getData () {
      const self = this
      this.id = this.$route.query.id
      this.$http.get(`${ENV.BokaApi}/api/order/orderDetail?id=${this.id}&from=user`)
      .then(res => {
        const data = res.data
        if (data.flag !== 1) {
          self.sosTitle = data.error
          self.showSos = true
          self.showContainer = false
        } else {
          let retdata = data.data
          if (retdata.length === 0) {
            self.showSos = true
            self.showContainer = false
          } else {
            self.showSos = false
            self.showContainer = true
            const retdata = data.data
            self.data = retdata
            self.orders = retdata.orderlist
            self.special = retdata.special
            self.retailerInfo = retdata.retailer
            self.shippingAddress = retdata.address
            self.shippingOrderon = retdata.orderno
            self.receiver = retdata.linkman
            self.receiverPhone = retdata.telephone
            self.expressCompany = retdata.delivercompanyname
            self.expressNumber = retdata.delivercode
          }
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      if (this.id !== this.$route.query.id) {
        this.getData()
      }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
/* css extension */
#order-detail .order-service {
  display: flex;
  background-color: #ffffff;
  padding: 10px 2px 10px 10px;
}
#order-detail .order-service:after {
  content: ' ';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  border-bottom: 1px solid #dfdfdf;
  color: #c7c7c7;
}
#order-detail .seller-cell {
  overflow: hidden;
}
#order-detail .contact-cell {
  width : 180px;
  display: flex;
}
#order-detail .order-service,
#order-detail .ol-contact,
#order-detail .wx-contact {
  position: relative;
}
#order-detail .seller-cell,
#order-detail .ol-contact,
#order-detail .wx-contact {
  flex: 1;
}
#order-detail .ol-contact,
#order-detail .wx-contact {
  text-align: center;
}
#order-detail .seller-cell span,
#order-detail .contact-cell span {
  vertical-align: middle;
}
#order-detail .ol-contact:after {
  content: ' ';
  position: absolute;
  right: 0;
  top: 0;
  width: 1px;
  bottom: 0;
  border-right: 1px solid #dfdfdf;
  color: #dfdfdf;
}
.qrcode-dialog .img-box {
  height: 350px;
  overflow: hidden;
}
.qrcode-dialog .vux-close {
  margin-top: 8px;
  margin-bottom: 8px;
}

/* vui css hack */
#order-detail .shipping-address:before {
  height: 0;
  border-top: none;
}
#order-detail .shipping-card .weui-cell {
  padding: 5px 10px 0px 0px
}
#order-detail .shipping-card .weui-cells{
  padding:5px 0 10px 0
}
#order-detail .express-info .weui-cell__ft{
  font-size: 12px;
}
#order-detail .weui-cells {
  margin-top: 10px !important;
}
#order-detail .vux-cell-primary {
  padding-left: 10px;
}
#order-detail .vux-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80%;
}
</style>
