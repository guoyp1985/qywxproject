<!-- /* -->
* @description: 订单详情页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="order-detail" :class="`containerarea font14 bg-page ${query.fromapp == 'factory' ? 'nobottom' : ''}`">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="pagemiddle" style="top:0;" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
        <sticky scroll-box="order-detail">
          <div class="order-service">
            <div class="seller-cell flex_left">
              <div class="font14 clamp1">卖家: {{retailerInfo.title}}</div>
            </div>
            <div class="flex_right" @click="toChat(orderData)" style="width:80px;padding-right:10px;box-sizing:border-box;">
              <span class="bg-theme color-white font12" style="padding:5px 10px;border-radius:30px;">联系客服</span>
              <!-- <span class="al al-pinglun3 color-order-detail font14"></span>
              <span class="font13 ml5">客服</span> -->
              <div class="orderinfo_txt" style="opacity:0;height:0px;width:0px;">
                <template v-if="isIOS">订单编号：{{orderData.orderno}}<br/>商品：{{orders[0].name}}<br/>数量：{{orders[0].quantity}}<br/>卖家：{{retailerInfo.title}}<br/>状态：{{orderData.flagstr}}</template>
                <template v-else>
订单编号：{{orderData.orderno}}
商品：{{orders[0].name}}
数量：{{orders[0].quantity}}
卖家：{{retailerInfo.title}}
状态：{{orderData.flagstr}}
                </template>
              </div>
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
        <div class="bg-white b_bottom_after padding10">
          <div v-if="orderData.flag != 1 && orderData.flag != 2" class="t-table mb10">
            <div class="t-cell v_middle">{{ orderData.delivercompanyname }} {{ orderData.delivercode }}</div>
            <div class="t-cell v_middle align_right w60">
              <router-link v-if="query.fromapp != 'factory'" :to="{path: '/deliverinfo', query: {id: orderData.id}}" class="font12 color-orange5">查看物流</router-link>
              <router-link v-if="query.fromapp == 'factory'" :to="{path: '/deliverinfo', query: {id: orderData.id, fromapp: 'factory'}}" class="font12 color-orange5">查看物流</router-link>
            </div>
          </div>
          <div class="t-table">
            <div class="t-cell v_middle">{{ $t('Addressee')}}：{{ orderData.linkman ? orderData.linkman : '无' }}</div>
            <div class="t-cell v_middle align_right" style="width:110px;">{{ orderData.telephone }}</div>
          </div>
          <div class="font12 color-gray mt5">{{ $t('Shipping Address')}}：{{ orderData.address ? orderData.address : '无' }}</div>
          <div class="font12 color-gray mt5">{{ $t('Order Number')}}：{{ orderData.orderno }}</div>
          <!--
          <div class="color-red mt5 align_right">
            <div class="qbtn color-orange5" @click="copyTxt(orderData)" style="position:relative;">
              <span>复制</span>
              <div class="deliver_txt" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ orderData.linkman ? orderData.linkman + ', ' : '' }}{{ orderData.telephone ? orderData.telephone + ', ' : '' }}{{ orderData.address ? orderData.address : '' }}</div>
            </div>
          </div>
        -->
        </div>
        <div class="mt10 b_top_after bg-white font12">
          <div class="flex_left padding10" v-for="(order, index) in orders" :key="index">
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
            <!-- <div class="w30 flex_right">
              <span class="al al-mjiantou-copy color-gray font14 bold"></span>
            </div> -->
          </div>
        </div>
        <div class="b_top_after padding10 bg-white">
          <div class="flex_left font12 color-gray">
            <div class="flex_left w80">运费</div>
            <div class="flex_right flex_cell">
              <span v-if="orderData.postage == 0">包邮</span>
              <span v-else>{{ $t('RMB') }}{{ orderData.postage }}</span>
            </div>
          </div>
          <div class="flex_left font12 color-gray mt10" v-if="orderData.carddeduct > 0">
            <div class="flex_left w100">优惠券抵扣</div>
            <div class="flex_right flex_cell">{{ $t('RMB') }}{{orderData.carddeduct}}</div>
          </div>
        </div>
        <div class="b_top_after padding10 bg-white flex_right">
          <span class="v_middle font12">实际支付: </span><span class="v_middle font16 color-orange">{{ $t('RMB') }}{{orderData.needpaymoney}}</span>
        </div>
        <div class="b_top_after padding10 bg-white">
          <div class="font12 color-gray flex_left">
            <div class="flex_left" style="width:160px;">创建时间: {{ orderData.dateline | dateformat }}</div>
            <div class="flex_cell flex_right color-orange5">{{orderData.flagstr}}</div>
            <div class="flex_right w60" v-if="orderData.delivertype == 2">到店自提</div>
          </div>
          <div class="font12 color-gray" v-if="orderData.flag == 3">发货时间: {{ orderData.delivertime | dateformat }}</div>
          <div v-if="orderData && orderData.content != ''"  class="pl10 pr10 pb10 color-gray">
            <div class="flex_left font12">
              <div class="w40">留言: </div>
              <div class="flex_cell" v-html="orderData.content"></div>
            </div>
          </div>
        </div>
        <div class="b_bottom_after"></div>
        <div class="padding10 align_right">
          <x-button v-if="orderData.flag == 1" mini @click.native="cancel" class="font12">取消订单</x-button>
          <x-button v-if="orderData.flag == 1 && orderData.payorder == '' && query.fromapp != 'factory'" :link="{path: '/pay', query: {id: orderData.id}}" mini class="font12">去支付</x-button>
          <x-button v-if="orderData.flag == 2 && orderData.canback && orderData.backflag != 20" mini @click.native="refund" class="font12">申请退款</x-button>
          <x-button v-if="orderData.backflag == 120" mini @click.native="afterSale" class="font12">回复</x-button>
          <x-button v-else-if="orderData.canservice && query.fromapp != 'wl'" mini @click.native="afterSale" class="font12">申请售后</x-button>
          <x-button v-if="orderData.flag == 3" mini @click.native="confirm" class="font12">确认收货</x-button>
          <x-button v-if="orderData.flag == 4 && orderData.comment == 0" mini @click.native="evaluate" class="font12">评价</x-button>
        </div>
        <div class="mt12" v-if="recordData.length">
          <div class="line-area">
            <div class="txt bg-page flex_center">售后记录</div>
          </div>
          <div class="bg-white mb12" v-for="(item, index) in recordData" :key="index">
            <div class="b_top_after flex_left padding10">
              <div class="flex_left flex_cell">
                <span v-if="item.isadmin" class="color-theme bold">售后客服</span>
                <template v-else>
                  <img :src="orderData.avatar" style="width:30px;height:30px;border-radius:50%;object-fit:cover;"/>
                  <span class="bold ml5">{{orderData.username}}</span>
                </template>
              </div>
              <div class="flex_right color-gray" style="width:130px;">{{item.dateline | dateformat}}</div>
            </div>
            <div class="b_top_after">
              <div class="color-gray padding10" v-html="item.content"></div>
              <div class="padding10" v-if="item.photo && item.photo != ''">
                <div style="width:110px;display:inline-block;" v-for="(photo,index1) in item.photoarr">
                  <img :src="photo" style="width:100px;height:100px;object-fit:cover;" @click="viewBigImg(photo,index,index1)" />
                </div>
                <div v-transfer-dom>
                  <previewer :list="item.previewerPhoto" :ref="`previewerPhoto-${index}`"></previewer>
                </div>
              </div>
            </div>
            <div class="b_bottom_after"></div>
          </div>
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
      </div>
      <div v-if="query.fromapp != 'factory'" class="s-bottom flex_center pl12 pr12 list-shadow02 bg-white" style="height:50px;">
        <div @click="toCenter" class="flex_cell flex_center color-white btn-bottom-red">进入个人中心</div>
      </div>
      <!-- <div class="bg-theme flex_center color-white fix-home-icon" @click="toHome" v-if="query.from || query.fromapp">
        <i class="al al-home1"></i>
      </div> -->
    </template>
    <div v-show="showRefundModal" class="auto-modal refund-modal flex_center">
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
    <div v-if="showServiceModal" class="auto-modal refund-modal flex_center">
      <div class="modal-inner border-box" style="width:80%;">
        <div v-if="orderData.backflag == 120" class="align_center font18 bold pb10 b_bottom_after color-theme pt20">回复</div>
        <div v-else class="align_center font18 bold pb10 b_bottom_after color-theme pt20">申请售后</div>
        <div class="align_left txt padding10 b_bottom_after">
          <group class="textarea-outer" style="padding:0;">
            <x-textarea
              v-if="orderData.backflag == 120"
              ref="serviceTextarea"
              v-model="serviceContent"
              name="title" class="x-textarea noborder"
              placeholder="回复内容"
              :show-counter="false"
              :rows="6"
              :max="200"
              @on-change="textareaChange('serviceTextarea')"
              @on-focus="textareaFocus('serviceTextarea')"
              autosize>
            </x-textarea>
            <x-textarea
              v-else
              ref="serviceTextarea"
              v-model="serviceContent"
              name="title" class="x-textarea noborder"
              placeholder="请输入售后原因，并上传1张快递面单+2张商品照片"
              :show-counter="false"
              :rows="6"
              :max="200"
              @on-change="textareaChange('serviceTextarea')"
              @on-focus="textareaFocus('serviceTextarea')"
              autosize>
            </x-textarea>
          </group>
        </div>
        <form enctype="multipart/form-data">
          <input ref="fileInput" class="hide" type="file" name="files" @change="fileChange" />
        </form>
        <div class="q_photolist align_left bg-white">
          <div class="photoitem" style="width:100px;" v-for="(photo,index) in servicePhotoArr" :key="index">
            <div class="inner photo imgcover">
              <img :src="photo" class="pic" @click="uploadPhoto('fileInput',index)" />
              <div class="close" @click.stop="deletephoto(index)">×</div>
            </div>
          </div>
          <div  v-if="servicePhotoArr.length < maxnum" class="photoitem add" @click="uploadPhoto('fileInput')" style="width:100px;">
            <div class="inner">
              <div class="innerlist">
                <div class="flex_center h_100">
                  <div>
                    <i class="al al-zhaopian" style="color:#bbb;line-height:30px;"></i>
                    <div><span>{{ servicePhotoArr.length }}</span><span class="ml5 mr5">/</span><span>{{ maxnum }}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex_center b_top_after" style="height:50px;">
          <div class="flex_cell flex_center h_100 b_right_after" @click="closeService">取消</div>
          <div class="flex_cell flex_center h_100 color-orange" @click="submitService('reply')" v-if="orderData.backflag == 120">提交</div>
          <div class="flex_cell flex_center h_100 color-orange" @click="submitService" v-else>提交</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Group, Cell, Sticky, XDialog, CellFormPreview, TransferDom, XImg, XButton, XTextarea, Previewer, XInput } from 'vux'
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
    Group, Cell, Sticky, XDialog, CellFormPreview, OrderInfo, XImg, XButton, Sos, XTextarea, Previewer, XInput
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
      orderData: {},
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
      clickTxt: '',
      showServiceModal: false,
      serviceContent: '',
      servicePhoto: '',
      servicePhotoArr: [],
      clickPhotoIndex: undefined,
      maxnum: 4,
      recordData: [],
      recordPageStart: 0,
      limit: 10,
      screenHeight: document.body.clientHeight,
      isIOS: false
    }
  },
  computed: {
    expressInfo () {
      return `${this.expressCompany} ${this.expressNumber}`
    }
  },
  watch: {
    screenHeight (val, oldval) {
      if (val < oldval) {
        document.body.clientHeight = oldval
      }
    }
  },
  methods: {
    handleScroll (refname, type) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.recordData.length === (self.recordPageStart + 1) * self.limit) {
            self.recordPageStart++
            self.$vux.loading.show()
            self.getRecordData()
          }
        }
      })
    },
    toHome () {
      if (this.query.fromapp && ENV.AppHomePage[this.query.fromapp]) {
        this.$wechat.miniProgram.reLaunch({url: ENV.AppHomePage[this.query.fromapp]})
      } else {
        this.$wechat.miniProgram.reLaunch({url: ENV.AppHomePage.default})
      }
    },
    deletephoto (index) {
      this.servicePhotoArr.splice(index, 1)
    },
    viewBigImg (photo, index, index1) {
      const self = this
      if (self.$util.isPC()) {
        let refarea = self.$refs[`previewerPhoto-${index}`][0] ? self.$refs[`previewerPhoto-${index}`][0] : self.$refs[`previewerPhoto-${index}`]
        refarea.show(index1)
      } else {
        window.WeixinJSBridge.invoke('imagePreview', {
          current: photo,
          urls: [photo]
        })
      }
    },
    photoCallback (data) {
      const self = this
      let index = this.clickPhotoIndex
      if (data.flag === 1) {
        if (index !== undefined && index !== 'undefined') {
          self.servicePhotoArr.splice(index, 1, data.data)
        } else {
          self.servicePhotoArr.push(data.data)
        }
      } else if (data.error) {
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error)
        })
      }
    },
    uploadPhoto (refname, index) {
      const self = this
      this.clickPhotoIndex = index
      const fileInput = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      if (self.$util.isPC()) {
        fileInput.click()
      } else {
        self.$wechat.ready(function () {
          self.$util.wxUploadImage({
            maxnum: self.maxnum,
            handleCallback: function (data) {
              self.photoCallback(data)
            }
          })
        })
      }
    },
    fileChange (refname, index) {
      const self = this
      const target = event.target
      const files = target.files
      if (files.length > 0) {
        let fileForm = target.parentNode
        const filedata = new FormData(fileForm)
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(res => {
          self.$vux.loading.hide()
          let data = res.data
          self.photoCallback(data)
        })
      }
    },
    closeService () {
      this.showServiceModal = false
      this.serviceContent = ''
    },
    submitService (type) {
      if (this.$util.trim(this.serviceContent) === '' && this.$util.trim(this.servicePhoto) === '') {
        this.$vux.toast.text('请完善售后信息', 'middle')
        return false
      }
      let newData = {description: '申请售后'}
      if (this.$util.trim(this.serviceContent) !== '') {
        newData.content = this.serviceContent.replace(/\n/g, '<br/>')
      }
      let sphoto = ''
      if (this.servicePhotoArr.length) {
        sphoto = this.servicePhotoArr.join(',')
        newData.previewerPhoto = this.$util.previewerImgdata(this.servicePhotoArr)
      }
      newData.photo = sphoto
      newData.photoarr = this.servicePhotoArr
      this.$vux.loading.show()
      let ajaxurl = `${ENV.BokaApi}/api/order/applyService`
      let postData = {id: this.orderData.id, reasonreturn: this.serviceContent, proofphoto: sphoto}
      if (type === 'reply') {
        ajaxurl = `${ENV.BokaApi}/api/order/replyService`
        postData = {orderid: this.orderData.id, content: this.serviceContent, photo: sphoto}
      }
      this.$http.post(ajaxurl, postData).then(res => {
        this.$vux.loading.hide()
        const data = res.data
        this.$vux.toast.text(data.error)
        if (data.flag) {
          this.showServiceModal = false
          this.orderData.canservice = false
          if (this.recordData.length === (this.recordPageStart + 1) * this.limit) {
            this.recordData.splice(this.recordData.length - 1, 1)
          }
          this.recordData = [newData].concat(this.recordData)
        }
      })
    },
    afterSale (order) {
      // 售后
      this.serviceContent = ''
      this.servicePhoto = ''
      this.servicePhotoArr = []
      this.showServiceModal = true
    },
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
      // if (this.query.from) {
      //   this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.product}?id=${item.pid}&wid=${item.wid}&module=product`})
      // } else {
      //   this.$router.push({path: '/product', query: {id: item.pid, wid: item.wid}})
      // }
      if (!this.query.from && !this.query.fromapp) {
        this.$router.push({path: '/product', query: {id: item.pid, wid: item.wid}})
      }
    },
    toChat () {
      const self = this
      let eleobj = jQuery('#order-detail .orderinfo_txt')[0]
      let range = null
      let save = function (e) {
        e.clipboardData.setData('text/plain', eleobj.innerHTML)
        e.preventDefault()
      }
      if (self.$util.isIOS()) { // ios设备
        this.isIOS = true
        console.log('in iOS')
        window.getSelection().removeAllRanges()
        range = document.createRange()
        range.selectNode(eleobj)
        window.getSelection().addRange(range)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
      } else { // 安卓设备
        console.log('in android')
        this.isIOS = false
        document.addEventListener('copy', save)
        document.execCommand('copy')
        document.removeEventListener('copy', save)
      }
      if (this.query.fromapp === 'factory') {
        this.$wechat.miniProgram.reLaunch({url: ENV.MiniRouter.chat})
      } else {
        let params = this.$util.handleAppParams(this.query, {uid: this.retailerInfo.uid, fromModule: 'order'})
        this.$router.push({path: '/chat', query: params})
      }
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
      this.$router.push({path: '/evaluation', query: {id: this.orderData.id}})
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
          self.$http.post(`${ENV.BokaApi}/api/order/receive`, {id: self.orderData.id})
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
          self.$http.post(`${ENV.BokaApi}/api/order/cancel`, {id: self.orderData.id})
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
      self.$http.post(`${ENV.BokaApi}/api/order/applyRefund`, {id: this.orderData.id, reasonreturn: this.refundContent})
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        self.$vux.toast.show({
          text: data.error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: self.$util.delay(data.error),
          onHide: () => {
            if (data.flag) {
              self.orderData.backflag = 20
              self.getData()
            }
          }
        })
      })
    },
    // copyTxt () {
    //   const self = this
    //   let eleobj = jQuery('#order-detail .deliver_txt')[0]
    //   let range = null
    //   let save = function (e) {
    //     e.clipboardData.setData('text/plain', eleobj.innerHTML)
    //     e.preventDefault()
    //   }
    //   if (self.$util.isIOS()) { // ios设备
    //     window.getSelection().removeAllRanges()
    //     range = document.createRange()
    //     range.selectNode(eleobj)
    //     window.getSelection().addRange(range)
    //     document.execCommand('copy')
    //     window.getSelection().removeAllRanges()
    //   } else { // 安卓设备
    //     console.log('in android')
    //     document.addEventListener('copy', save)
    //     document.execCommand('copy')
    //     document.removeEventListener('copy', save)
    //   }
    //   setTimeout(function () {
    //     self.$vux.toast.show({
    //       text: '复制成功',
    //       time: 1500
    //     })
    //   }, 200)
    // },
    getRecordData () {
      this.$http.post(`${ENV.BokaApi}/api/order/getServiceInfo`, {
        type: 'service', id: this.query.id, pagestart: this.recordPageStart, limit: 10
      }).then(res => {
        this.$vux.loading.hide()
        const data = res.data
        let retdata = data.data ? data.data : data
        for (let i in retdata) {
          if (retdata[i].photo && retdata[i].photo !== '') {
            let parr = retdata[i].photo.split(',')
            retdata[i].photoarr = parr
            retdata[i].previewerPhoto = this.$util.previewerImgdata(parr)
          }
          if (retdata[i].content && retdata[i].content !== '') {
            retdata[i].content = retdata[i].content.replace(/\n/g, '<br/>')
          }
        }
        this.recordData = this.recordData.concat(retdata)
      })
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
            self.orderData = retdata
            this.orderData.content = this.orderData.content.replace(/\n/g, '<br/>')
            self.orders = retdata.orderlist
            self.special = retdata.special
            self.retailerInfo = retdata.retailer
            self.shippingAddress = retdata.address
            self.shippingOrderon = retdata.orderno
            self.receiver = retdata.linkman
            self.receiverPhone = retdata.telephone
            self.expressCompany = retdata.delivercompanyname
            self.expressNumber = retdata.delivercode
            this.recordData = []
            this.recordPageStart = 0
            self.getRecordData()
          }
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      if (this.$util.isIOS()) {
        this.isIOS = true
      } else {
        this.isIOS = false
      }
      if (this.id !== this.$route.query.id) {
        this.recordData = []
        this.recordPageStart = 0
        this.getData()
      }
    }
  },
  activated () {
    this.refresh()
  },
  mounted () {
    const self = this
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight
        self.screenHeight = window.screenHeight
      })()
    }
  }
}
</script>

<style lang="less">
#order-detail .pagemiddle{bottom:50px;}
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
.fix-home-icon{
  position:absolute;right:20px;bottom:80px;
  width:50px;height:50px;border-radius:50%;
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
  margin-top: 0px !important;
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
#order-detail{
  .line-area:after{
    content:"";display:block;position:absolute;left:50%;;top:50%;
    width:160px;height:1px;margin-left:-80px;
    background-color:#000;
  }
  .line-area{
    position:relative;width:100%;height:50px;text-align:center;
    .txt{margin:0 auto;width:90px;height:50px;position:relative;z-index:1;}
  }
}
</style>
