<template>
  <div id="order-detail" :class="`containerarea notop rorderdetail bg-page color-gray5 font14 ${bottomcss}`">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="pagemiddle scroll-container" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
        <!-- <div v-if="orderData.seller && orderData.seller.username">
          <div class="b_bottom_after padding10 bg-white">
            <div class="t-table">
              <div class="t-cell w100">返点客：</div>
              <div class="t-cell sellername align_right clamp1">
                <div class="clamp1">{{ orderData.seller.username }}</div>
              </div>
            </div>
          </div>
          <div style="height:10px;"></div>
        </div> -->
        <div class="bg-white b_bottom_after padding10">
          <div class="flex_left">
            <router-link class="flex_cell" :to="{path:'/store',query:{wid:orderData.retailer.uid}}">
              <i class="al al-dianpufill v_middle color-red font20"></i>
              <span class="v_middle">{{orderData.retailer.title}}</span>
            </router-link>
            <div class="w80 align_right">
              <router-link class="qbtn bg-red color-white font12" :to="{path:'/chat',query:{uid:orderData.retailer.uid, from: query.from}}">联系卖家</router-link>
            </div>
          </div>
        </div>
        <div class="bg-white b_bottom_after padding10">
          <div class="flex_left">买家：{{ orderData.username }}  累计消费：<span class="color-red">{{ $t('RMB') }}{{ orderData.summoney }}</span></div>
        </div>
        <div class="bg-white b_bottom_after padding10">
          <div v-if="orderData.flag != 1 && orderData.flag != 2" class="t-table mb10">
            <div class="t-cell v_middle">{{ orderData.delivercompanyname }} {{ orderData.delivercode }}</div>
            <div class="t-cell v_middle align_right w60">
              <router-link :to="{path: '/deliverinfo', query: {id: orderData.id}}" class="font12 color-orange5">查看详情</router-link>
            </div>
          </div>
          <div class="t-table">
            <div class="t-cell v_middle">{{ $t('Addressee')}}：{{ orderData.linkman ? orderData.linkman : '无' }}</div>
            <div class="t-cell v_middle align_right" style="width:110px;">{{ orderData.telephone }}</div>
          </div>
          <div class="font12 color-gray mt5">{{ $t('Shipping Address')}}：{{ orderData.address ? orderData.address : '无' }}</div>
          <div class="font12 color-gray mt5">{{ $t('Order Number')}}：{{ orderData.orderno }}</div>
          <div class="color-red mt5 align_right">
            <div class="qbtn color-orange5" @click="copyTxt(orderData)" style="position:relative;">
              <span>复制</span>
              <div class="deliver_txt" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ orderData.linkman ? orderData.linkman + ', ' : '' }}{{ orderData.telephone ? orderData.telephone + ', ' : '' }}{{ orderData.address ? orderData.address : '' }}</div>
            </div>
          </div>
        </div>
        <div class="mt10 bg-white padding10 b_bottom_after">
          <div class="t-table font12">
            <div class="t-cell" style="width:165px;">创建时间: {{ orderData.dateline | dateformat }}</div>
            <div class="t-cell align_right color-orange5">{{ orderData.flagstr }}</div>
          </div>
        </div>
        <div class="bg-white">
          <div class="scroll_list productlist color_gray appendarea" ajaxurl="" template=".template">
            <div v-for="(item,index) in orderData.orderlist" :key="item.id" class="scroll_item db padding10 bg-gray4">
              <div class="t-table">
                <div class="t-cell v_middle w60 algin_left">
                  <template v-if="item.options && item.options.id">
                    <img class="v_middle imgcover" :src="item.options.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" style="width:50px;height:50px;" />
                  </template>
                  <template v-else>
                    <img class="v_middle imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"style="width:50px;height:50px;" />
                  </template>
                </div>
                <div class="t-cell v_top">
                  <div class="clamp2 font12 align_left">{{ item.name }}</div>
                  <div class="clamp1 font12 align_left color-gray" v-if="item.options && item.options.id">{{ item.options.title }}</div>
                </div>
                <div class="t-cell align_right w90">
                  <div>{{ $t('RMB') }}{{ item.special }}</div>
                  <div class="color-gray">× <span class="font12">{{ item.quantity }}</span></div>
                </div>
              </div>
            </div>
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
        <div v-if="orderData && orderData.delivertype ==2"  class="padding10 b_top_after bg-white">
          <div class="flex_right font12 color-gray">到店自提</div>
        </div>
        <div class="align_right">
          <div v-if="!orderData.payorder && orderData.flag != 1" class="b_bottom_after pl10 pr10 pb10 bg-white">
            <div class="t-table">
              <div class="t-cell v_middle align_right cancelarea">
                <div v-if="orderData.flag == 0" class="color-red">交易已关闭</div>
                <div v-else class="db-in color-blue" @click="cancelorder">关闭交易</div>
              </div>
              <router-link v-if="orderData.flag != 0" class="t-cell w80 color-blue" :to="{path: '/retailerAddorder', query: {id: orderData.id}}" >修改订单</router-link>
            </div>
          </div>
          <div v-if="orderData.nexttime" class="align_left padding10 color-gray2 font12">回访时间：{{ orderData.nexttime | dateformat }}</div>
        </div>
        <div class="padding10" v-if="orderData.flag == 2 && orderData.backflag == 20">
          <div class="flex_right font12">
            <div class="flex_center mr10" @click="agreeEvent(0)" style="border:#999 1px solid;height:25px;border-radius:5px;color:#999;width:75px;">拒绝退款</div>
            <div class="flex_center" @click="agreeEvent(1)" style="border:#ff4400 1px solid;height:25px;border-radius:5px;color:#ff4400;width:75px;">同意退款</div>
          </div>
        </div>
        <template v-if="orderData.candealservice">
          <div class="padding10">
            <div class="flex_right font12">
              <div class="flex_center mr10" @click="serviceEvent(1)" style="border:#ff4400 1px solid;height:25px;border-radius:5px;color:#ff4400;width:75px;">全额退款</div>
              <div class="flex_center mr10" @click="serviceEvent(2)" style="border:#ff4400 1px solid;height:25px;border-radius:5px;color:#ff4400;width:75px;">售后反馈</div>
              <div class="flex_center" @click="serviceEvent(3)" style="border:#ff4400 1px solid;height:25px;border-radius:5px;color:#ff4400;width:75px;">部分补偿</div>
            </div>
          </div>
        </template>
        <div class="mt12" v-if="recordData.length">
          <div class="line-area">
            <div class="txt bg-page flex_center">售后记录</div>
          </div>
          <div class="bg-white mb12" v-for="(item, index) in recordData" :key="index">
            <div class="b_top_after flex_left padding10">
              <div class="flex_left flex_cell">
                <span v-if="item.description == '售后反馈'" class="color-theme bold">售后客服</span>
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
                <img :src="item.photo" style="width:100px;height:100px;object-fit:cover;" @click="viewBigImg(item.photo,index)" />
                <div v-transfer-dom>
                  <previewer :list="item.previewerPhoto" :ref="`previewerPhoto-${index}`"></previewer>
                </div>
              </div>
            </div>
            <div class="b_bottom_after"></div>
          </div>
        </div>
      </div>
      <div v-if="orderData.flag == 2 && orderData.candeliver" class="pagebottom flex_center font16 bg-orange5 color-white" @click="uploaddeliver">{{ $t('Deliver goods') }}</div>
      <div v-else-if="orderData.flag == 3" class="pagebottom flex_center font16 bg-orange5 color-white" @click="uploaddeliver">{{ $t('Update deliver info') }}</div>
      <div v-transfer-dom class="x-popup popup-deliver">
        <popup v-model="showpopup" height="100%">
          <div class="popup1 font14">
            <div class="popup-top flex_center">发货</div>
            <div class="popup-middle">
              <div class="scroll_list">
                <div class="scroll_item padding10">
                  <div class="t-table">
                    <div class="t-cell w80">物流<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
                    <div class="t-cell">
                      <select class="qselect" v-model="deliverdata.delivercompany">
                        <option v-for="(item,index) in delivercompany" :key='item.id' :value="item.id">{{ item.name }}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div v-if="deliverdata.delivercompany != '-1'" class="scroll_item padding10 form-item">
                  <div class="t-table">
                    <div class="t-cell w80">运单号<span class="al al-xing color-red font12" style="vertical-align: 3px;"></span></div>
                    <div class="t-cell">
                      <input v-model="deliverdata.delivercode" type="text" class="input"placeholder="运单号" />
                    </div>
                    <div class="t-cell align_right w50" style="position:relative;" @click="scanClick">
                      <i class="al al-scanning color-blue"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="popup-bottom flex_center">
              <div class="flex_cell bg-gray color-white h_100 flex_center" @click="closepopup">{{ $t('Close') }}</div>
              <div class="flex_cell bg-green color-white h_100 flex_center" @click="confirmpopup">{{ $t('Confirm txt') }}</div>
            </div>
          </div>
        </popup>
      </div>
    </template>
    <div v-show="showRefundModal" class="auto-modal refund-modal flex_center">
      <div class="modal-inner border-box" style="width:80%;">
        <div class="align_center font18 bold pb10 b_bottom_after color-theme pt20">拒绝退款</div>
        <div class="align_left txt padding10">
          <group class="textarea-outer" style="padding:0;">
            <x-textarea
              ref="titleTextarea"
              v-model="refundContent"
              name="title" class="x-textarea noborder"
              placeholder="请输入拒绝退款原因"
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
    <div v-show="showServiceModal" class="auto-modal refund-modal flex_center">
      <div class="modal-inner border-box" style="width:80%;">
        <div class="align_center font18 bold pb10 b_bottom_after color-theme pt20">售后反馈</div>
        <div class="align_left txt padding10">
          <group class="textarea-outer" style="padding:0;">
            <x-textarea
              ref="serviceTextarea"
              v-model="serviceContent"
              name="title" class="x-textarea noborder"
              placeholder="请输入售后反馈"
              :show-counter="false"
              :rows="6"
              :max="200"
              @on-change="textareaChange('serviceTextarea')"
              @on-focus="textareaFocus('serviceTextarea')"
              autosize>
            </x-textarea>
          </group>
        </div>
        <div class="flex_center b_top_after" style="height:50px;">
          <div class="flex_cell flex_center h_100 b_right_after" @click="closeService">取消</div>
          <div class="flex_cell flex_center h_100 color-orange" @click="submitService">提交</div>
        </div>
      </div>
    </div>
    <div v-show="showSmoneyModal" class="auto-modal refund-modal flex_center">
      <div class="modal-inner border-box" style="width:80%;">
        <div class="align_center font18 bold pb10 b_bottom_after color-theme pt20">部分补偿</div>
        <div class="scroll_item padding10 form-item">
          <div class="t-table">
            <div class="t-cell w80">补偿金额<span class="al al-xing color-red font12" style="vertical-align: 3px;"></span></div>
            <div class="t-cell" style="vertical-align:middle;">
              <x-input v-model="serviceMoney" type="text" class="input" placeholder="补偿金额"></x-input>
            </div>
          </div>
        </div>
        <div class="flex_center b_top_after" style="height:50px;">
          <div class="flex_cell flex_center h_100 b_right_after" @click="closeMoney">取消</div>
          <div class="flex_cell flex_center h_100 color-orange" @click="submitMoney">提交</div>
        </div>
      </div>
    </div>
    <!-- <div class="bg-theme flex_center color-white fix-home-icon" @click="toHome" v-if="query.from || query.fromapp">
      <i class="al al-home1"></i>
    </div> -->
  </div>
</template>
<script>
import { Group, Cell, Sticky, XDialog, TransferDom, Popup, XImg, XTextarea, Previewer, XInput } from 'vux'
import OrderInfo from '@/components/OrderInfo'
import Sos from '@/components/Sos'
import Time from '#/time'
import ENV from 'env'
import jQuery from 'jquery'
import { User } from '#/storage'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group, Cell, Sticky, XDialog, Popup, OrderInfo, XImg, Sos, XTextarea, Previewer, XInput
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showSos: false,
      sosTitle: '抱歉，您暂无权限访问此页面！',
      showContainer: false,
      query: {},
      loginUser: {},
      orderData: {},
      totalPrice: '0.00',
      bottomcss: '',
      showpopup: false,
      delivercompany: [],
      deliverdata: { delivercompany: '-1', delivercode: '' },
      showRefundModal: false,
      refundContent: '',
      showServiceModal: false,
      serviceContent: '',
      showSmoneyModal: '',
      serviceMoney: '',
      recordData: [],
      recordPageStart: 0,
      limit: 10
    }
  },
  watch: {
    orderData () {
      return this.orderData
    }
  },
  computed: {
  },
  methods: {
    initData () {
      this.recordData = []
      this.recordPageStart = 0
      this.deliverdata = { delivercompany: '-1', delivercode: '' }
    },
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
    viewBigImg (photo, index) {
      const self = this
      if (self.$util.isPC()) {
        let refarea = self.$refs[`previewerPhoto-${index}`][0] ? self.$refs[`previewerPhoto-${index}`][0] : self.$refs[`previewerPhoto-${index}`]
        refarea.show(0)
      } else {
        window.WeixinJSBridge.invoke('imagePreview', {
          current: photo,
          urls: [photo]
        })
      }
    },
    serviceEvent (type) {
      const self = this
      switch (type) {
        case 1:
          self.$vux.confirm.show({
            content: '确定要全额退款给买家吗？',
            onConfirm: () => {
              self.$vux.loading.show()
              self.$http.post(`${ENV.BokaApi}/api/order/dealService`, {
                id: self.orderData.id, agree: 1
              }).then((res) => {
                self.$vux.loading.hide()
                const data = res.data
                let error = data.flag ? '成功' : data.error
                self.$vux.toast.show({
                  text: error,
                  type: (data.flag !== 1 ? 'warn' : 'success'),
                  time: self.$util.delay(error)
                })
                if (data.flag === 1) {
                  self.orderData.candealservice = false
                  self.orderData.flag = 0
                  self.orderData.flagstr = '已退款'
                }
              })
            }
          })
          break
        case 2:
          this.serviceContent = ''
          this.showServiceModal = true
          break
        case 3:
          this.serviceMoney = ''
          this.showSmoneyModal = true
          break
      }
    },
    closeService () {
      this.showServiceModal = false
      this.serviceContent = ''
    },
    submitService () {
      if (this.$util.trim(this.serviceContent) === '') {
        this.$vux.toast.text('请完善信息', 'middle')
        return false
      }
      let newData = {description: '售后反馈'}
      if (this.$util.trim(this.serviceContent) !== '') {
        newData.content = this.serviceContent.replace(/\n/g, '<br/>')
      }
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/order/dealService`, {
        id: this.orderData.id, agree: 2, rejectreason: this.serviceContent
      }).then(res => {
        this.$vux.loading.hide()
        const data = res.data
        this.$vux.toast.show({
          text: data.error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: this.$util.delay(data.error)
        })
        if (data.flag === 1) {
          this.showServiceModal = false
          this.orderData.candealservice = false
          this.orderData.flagstr = '已发货'
          if (this.recordData.length === (this.recordPageStart + 1) * this.limit) {
            this.recordData.splice(this.recordData.length - 1, 1)
          }
          this.recordData = [newData].concat(this.recordData)
        }
      })
    },
    closeMoney () {
      this.showSmoneyModal = false
      this.serviceMoney = ''
    },
    submitMoney () {
      if (this.$util.trim(this.serviceMoney) === '') {
        this.$vux.toast.text('请输入补偿金额', 'middle')
        return false
      }
      if (isNaN(this.serviceMoney) || parseFloat(this.serviceMoney.replace(/,/g, '')) <= 0) {
        this.$vux.toast.text('请输入正确的补偿金额', 'middle')
        return false
      }
      let money = parseFloat(this.serviceMoney.replace(/,/g, ''))
      if (money > parseFloat(this.orderData.paymoney)) {
        this.$vux.toast.text('补偿金额不能超过支付金额', 'middle')
        return false
      }
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/order/dealService`, {
        id: this.orderData.id, agree: 3, payout: this.serviceMoney
      }).then(res => {
        this.$vux.loading.hide()
        const data = res.data
        this.$vux.toast.show({
          text: data.error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: this.$util.delay(data.error)
        })
        if (data.flag === 1) {
          this.showSmoneyModal = false
          this.orderData.candealservice = false
          this.orderData.flag = 4
          this.orderData.flagstr = '已收货'
        }
      })
    },
    toProduct (item) {
      // if (this.query.fromapp === 'factory') {
      //   this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.product}?id=${item.pid}&module=product`})
      // } else if (this.query.from) {
      //   this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.product}?id=${item.pid}&wid=${item.wid}`})
      // } else {
      //   this.$router.push({path: '/product', query: {id: item.pid, wid: item.wid}})
      // }
      if (!this.query.from && !this.query.fromapp) {
        this.$router.push({path: '/product', query: {id: item.pid, wid: item.wid}})
      }
    },
    toHome () {
      if (this.query.fromapp && ENV.AppHomePage[this.query.fromapp]) {
        this.$wechat.miniProgram.reLaunch({url: ENV.AppHomePage[this.query.fromapp]})
      } else {
        this.$wechat.miniProgram.reLaunch({url: ENV.AppHomePage.default})
      }
    },
    evaluate () {
      this.$router.push({name: 'evaluation', params: {order: this.order}})
    },
    wxContact () {
      this.wxCardShow = true
    },
    cancelorder () {
      const self = this
      let content = `确定要关闭交易吗？关闭交易后，将自动删除该订单所产生的所有销售数据！`
      self.$vux.confirm.show({
        content: content,
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/order/cancel`, { id: self.query.id }).then(function (res) {
            let data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error),
              onHide: function () {
                if (data.flag === 1) {
                  self.orderData.flag = 0
                }
              }
            })
          })
        }
      })
    },
    uploaddeliver () {
      const self = this
      if (!self.delivercompany.length) {
        self.$http.post(`${ENV.BokaApi}/api/order/delivercompany`).then(function (res) {
          let data = res.data
          self.delivercompany = data.data ? data.data : data
        })
      }
      this.showpopup = true
    },
    confirmpopup () {
      const self = this
      if (self.deliverdata.delivercompany === '' || self.deliverdata.delivercompany === '-1' || !self.deliverdata.delivercode || self.$util.trim(self.deliverdata.delivercode) === '') {
        self.$vux.toast.text('请输入物流单号', 'middle')
        return false
      }
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/order/deliver`, self.deliverdata).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.showpopup = false
              self.orderData.delivercompany = self.deliverdata.delivercompany
              self.orderData.delivercode = self.deliverdata.delivercode
              self.orderData.flag = 3
              if (self.orderData.delivercompany !== '-1') {
                for (let i = 0; i < self.delivercompany.length; i++) {
                  let d = self.delivercompany[i]
                  if (d.id === self.orderData.delivercompany) {
                    self.orderData.delivercompanyname = d.name
                    break
                  }
                }
              }
            }
          }
        })
      })
    },
    closepopup () {
      this.showpopup = false
    },
    scanClick () {
      const self = this
      self.$wechat.scanQRCode({
        needResult: 1,
        desc: '识别物流信息',
        success: function (res) {
          if (res.errMsg === 'scanQRCode:ok') {
            let result = res.resultStr.split(',')
            if (result[0] === 'CODE_128') {
              self.deliverdata.delivercode = result[1]
            } else {
              self.$vux.toast.show({
                text: '请扫描物流条形码',
                time: 1500
              })
            }
          }
        },
        failed: function () {
          self.$vux.toast.show({
            text: '扫描失败'
          })
        }
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
    agreeEvent (val) {
      const self = this
      console.log('in argerr event')
      console.log(val)
      if (val === 1) {
        this.$vux.confirm.show({
          title: '您确认同意退款？',
          onConfirm: () => {
            self.$vux.loading.show()
            self.$http.post(`${ENV.BokaApi}/api/order/refund`, {id: this.query.id, agree: 1})
            .then(res => {
              self.$vux.loading.hide()
              const data = res.data
              self.$vux.toast.show({
                text: data.error,
                type: (data.flag !== 1 ? 'warn' : 'success'),
                time: self.$util.delay(data.error),
                onHide: () => {
                  if (data.flag === 1) {
                    this.orderData.backflag = 0
                    this.orderData.flag = 0
                    this.orderData.flagstr = '订单取消'
                  }
                }
              })
            })
          }
        })
      } else {
        // this.refresh()
        this.showRefundModal = true
      }
    },
    closeRefund () {
      this.showRefundModal = false
    },
    submitRefund () {
      const self = this
      self.$vux.loading.show()
      this.showRefundModal = false
      self.$http.post(`${ENV.BokaApi}/api/order/refund`, {id: this.query.id, rejectreason: this.refundContent, agree: 0})
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        self.$vux.toast.show({
          text: data.error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: self.$util.delay(data.error),
          onHide: () => {
            if (data.flag === 1) {
              this.refundContent = ''
              this.orderData.backflag = 0
              this.orderData.flagstr = '待发货'
            }
          }
        })
        this.refundContent = ''
        this.refresh()
      })
    },
    getRecordData () {
      this.$http.post(`${ENV.BokaApi}/api/order/recordList`, {
        type: 'service', id: this.query.id, pagestart: this.recordPageStart, limit: 10
      }).then(res => {
        this.$vux.loading.hide()
        const data = res.data
        let retdata = data.data ? data.data : data
        for (let i in retdata) {
          if (retdata[i].photo && retdata[i].photo !== '') {
            retdata[i].previewerPhoto = this.$util.previewerImgdata([retdata[i].photo])
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
      this.deliverdata.id = this.query.id
      const params = { id: this.query.id, from: 'factory' }
      this.$http.get(`${ENV.BokaApi}/api/order/orderDetail`, {
        params: params
      }).then(res => {
        self.$vux.loading.hide()
        const data = res.data
        if (data.flag !== 1) {
          self.sosTitle = data.error
          self.showSos = true
          self.showContainer = false
        } else {
          self.orderData = data.data
          if (self.orderData.length === 0) {
            self.showSos = true
            self.sosTitle = '该订单不存在'
            self.showContainer = false
          } else {
            self.showSos = false
            self.showContainer = true
            this.orderData.content = this.orderData.content.replace(/\n/g, '<br/>')
            if (!(self.orderData.flag === 2 && self.orderData.candeliver) && self.orderData.flag !== 3) {
              self.bottomcss = 'nobottom'
            }
            let total = 0
            for (let i = 0; i < self.orderData.orderlist.length; i++) {
              let o = self.orderData.orderlist[i]
              total += parseFloat(o.special.replace(/,/g, '')) * parseInt(o.quantity)
            }
            if (self.orderData.postage) {
              total += parseFloat(self.orderData.postage)
            }
            self.totalPrice = total.toFixed(2)
            if (self.orderData.delivercompany && self.$util.trim(self.orderData.delivercompany) !== '') {
              self.deliverdata.delivercompany = self.orderData.delivercompany
              self.deliverdata.delivercode = self.orderData.delivercode
            }
            this.getRecordData()
          }
        }
      })
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.initData()
      if (this.loginUser) {
        this.$vux.loading.show()
        let isAdmin = false
        for (let i = 0; i < self.loginUser.usergroup.length; i++) {
          if (self.loginUser.usergroup[i] === 1) {
            isAdmin = true
            break
          }
        }
        if (!self.loginUser.fid && !isAdmin) {
          this.$vux.loading.hide()
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = false
          this.query = this.$route.query
          this.getData()
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
.popup-deliver .fileinput{position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:transparent;opacity:0;}
.fix-home-icon{
  position:absolute;right:20px;bottom:80px;
  width:50px;height:50px;border-radius:50%;
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
