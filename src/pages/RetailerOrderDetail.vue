<template>
  <div id="order-detail" :class="`containerarea notop rorderdetail bg-page color-gray5 font14 ${bottomcss}`">
    <subscribe v-if="loginUser.subscribe != 1 && !loginUser.isretailer"></subscribe>
    <apply-tip v-if="showApply"></apply-tip>
    <Sos v-if="showSos" :title="sosTitle"></Sos>
    <template v-if="showContainer">
      <div class="pagemiddle scroll-container">
        <div v-if="data.seller && data.seller.username && (!data.frommin || data.frommin == '')">
          <div class="b_bottom_after padding10 bg-white">
            <div class="t-table">
              <div class="t-cell w100">返点客：</div>
              <div class="t-cell sellername align_right clamp1">
                <div class="clamp1">{{ data.seller.username }}</div>
              </div>
            </div>
          </div>
          <div style="height:10px;"></div>
        </div>
        <div class="bg-white b_bottom_after padding10">
          <template v-if="query.from && query.fromapp != 'factory' && query.fromapp != 'qxb'">
            <div class="flex_left" @click="toMemberView">买家：{{ data.username }}</div>
            <div class="flex_left">
              <div class="flex_cell flex_left" @click="toMemberView">累计消费：<span class="color-red">{{ $t('RMB') }}{{ data.summoney }}</span></div>
              <div class="flex_right" style="width:120px;" v-if="" @click="toCard">
                <div class="bg-theme color-white align_center" style="width:110px;padding:5px 0;border-radius:30px;">生成专属优惠券</div>
              </div>
            </div>
          </template>
          <div v-else class="flex_left" @click="toMemberView">买家：{{ data.username }} 累计消费：<span class="color-red">{{ $t('RMB') }}{{ data.summoney }}</span></div>
        </div>
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
          <div class="color-red mt5 align_right">
            <div class="qbtn color-orange5" @click="copyTxt(data)" style="position:relative;">
              <span>复制</span>
              <template v-if="data.flag != 0 && data.flag != 1 && data.flag != 2">
                <div class="deliver_txt" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ data.delivercompanyname }} {{ data.delivercode }} {{ data.address ? data.address + ', ' : '' }}{{ data.linkman ? data.linkman + ', ' : '' }}{{ data.telephone ? data.telephone : '' }}</div>
              </template>
              <template v-else>
                <div class="deliver_txt" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ data.address ? data.address + ', ' : '' }}{{ data.linkman ? data.linkman + ', ' : '' }}{{ data.telephone ? data.telephone : '' }}</div>
              </template>
            </div>
          </div>
        </div>
        <div class="mt10 bg-white padding10 b_bottom_after">
          <div class="t-table font12">
            <div class="t-cell" style="width:165px;">创建时间: {{ data.dateline | dateformat }}</div>
            <div class="t-cell align_right color-orange5">{{ data.flagstr }}</div>
          </div>
        </div>
        <div class="bg-white">
          <div class="scroll_list productlist color_gray appendarea">
            <div v-on:click="toProduct(item)" v-for="(item,index) in data.orderlist" :key="item.id" :data-product-url="{path: '/product', query: {id: item.pid, wid: data.wid}}" class="scroll_item db padding10 bg-gray4">
              <div class="t-table">
                <div class="t-cell v_middle w60 algin_left">
                  <template v-if="item.options && item.options.id">
                    <img class="v_middle imgcover" :src="item.options.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" style="width:50px;height:50px;" />
                  </template>
                  <template v-else>
                    <img class="v_middle imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" style="width:50px;height:50px;" />
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
          <div class="align_right padding10 flex_right">
            <div>
              <span class="v_middle">商品: {{ $t('RMB') }}</span><span class="font16 v_middle">{{ data.special }}</span>
              <template v-if="!data.delivertype && data.postage && data.postage != ''">
                <span class="v_middle font12 color-gray" v-if="data.postage == 0">( {{ $t('Postage') }}: 包邮 )</span>
                <span class="v_middle font12 color-gray" v-else>( {{ $t('Postage') }}: {{ $t('RMB') }}{{ data.postage }} )</span>
              </template>
            </div>
          </div>
          <div class="align_right padding10 flex_right">
            <div>
              <span class="v_middle">实际支付: {{ $t('RMB') }}</span><span class="font16 v_middle">{{ data.needpaymoney }}</span>
              <span class="v_middle font12 color-gray" v-if="data.carddeduct > 0">( 优惠券抵扣: {{ $t('RMB') }} {{ data.carddeduct }} )</span>
            </div>
          </div>
        </div>
        <div v-if="data && data.delivertype ==2"  class="padding10 b_top_after bg-white">
          <div class="flex_right font12 color-gray">到店自提</div>
        </div>
        <div v-if="data"  class="padding10 b_top_after bg-white">
          <div class="flex_left font12">
            <div class="w40">留言: </div>
            <div class="flex_cell" v-if="data.content && data.content != ''">{{data.content}}</div>
            <div class="flex_cell" v-else>无</div>
            <div class="w40 color-theme flex_right" @click="changeContent">修改</div>
          </div>
        </div>
        <div class="align_right">
          <!-- <div v-if="!data.payorder && data.flag != 1" class="b_bottom_after pl10 pr10 pb10 bg-white">
            <div class="t-table">
              <router-link v-if="data.flag != 0" class="t-cell w80 color-blue" :to="{path: '/retailerAddorder', query: {id: data.id}}" >修改订单</router-link>
            </div>
          </div> -->
          <div v-if="data.nexttime" class="align_left padding10 color-gray2 font12">回访时间：{{ data.nexttime | dateformat }}</div>
        </div>
        <div class="padding10" v-if="data.cancensorback == 1">
          <div class="flex_right font12">
            <div class="flex_center mr10" @click="agreeEvent(0)" style="border:#999 1px solid;height:25px;border-radius:5px;color:#999;width:75px;">拒绝退款</div>
            <div class="flex_center" @click="agreeEvent(1)" style="border:#ff4400 1px solid;height:25px;border-radius:5px;color:#ff4400;width:75px;">同意退款</div>
          </div>
        </div>
      </div>
      <template v-if="data.flag == 1 && data.fid == 0 && data.crowdid == 0">
        <div v-if="data.retailer.orderonline == 0 && data.frommin && data.frommin != ''" class="pagebottom flex_center font16 bg-orange5 color-white" @click="confirmPrice">确认收款</div>
        <div v-else class="pagebottom flex_center font16 bg-orange5 color-white" @click="changePrice">{{ $t('Change price') }}</div>
      </template>
      <div v-if="data.flag == 2 && data.candeliver" class="pagebottom flex_center font16 bg-orange5 color-white" @click="uploaddeliver">{{ $t('Deliver goods') }}</div>
      <div v-else-if="data.flag == 3 && (!data.fid || data.fid == loginUser.fid)" class="pagebottom flex_center font16 bg-orange5 color-white" @click="uploaddeliver">{{ $t('Update deliver info') }}</div>
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
      <div v-transfer-dom class="x-popup popup-deliver">
        <popup v-model="showStatus" height="100%">
          <div class="popup1 font14">
            <div class="popup-top flex_center">备注</div>
            <div class="popup-middle">
              <div class="scroll_list">
                <div class="scroll_item padding10 form-item">
                  <group class="textarea-outer" style="padding:0;">
                    <x-textarea
                      ref="contentTextarea"
                      v-model="postContent"
                      class="x-textarea noborder"
                      placeholder="请输入备注信息"
                      :show-counter="false"
                      :rows="6"
                      :max="200"
                      @on-change="textareaChange('contentTextarea')"
                      @on-focus="textareaFocus('contentTextarea')"
                      autosize>
                    </x-textarea>
                  </group>
                </div>
              </div>
            </div>
            <div class="popup-bottom flex_center">
              <div class="flex_cell bg-gray color-white h_100 flex_center" @click="closeStatus">{{ $t('Close') }}</div>
              <div class="flex_cell bg-green color-white h_100 flex_center" @click="submitStatus">{{ $t('Confirm txt') }}</div>
            </div>
          </div>
        </popup>
      </div>
    </template>
    <div v-if="showRefundModal" class="auto-modal refund-modal flex_center">
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
    <template v-if="data.flag == 2 && data.backflag != 20 && data.candeliver">
      <template v-if="showFirst">
        <firstTip @submitFirstTip="submitFirstTip">
          <div class="font15 bold txt">
            <div class="flex_center">{{sysParams.advance_orderdeliver}}</div>
          </div>
        </firstTip>
      </template>
      <template v-if="showHb">
        <firstHb action="orderdeliver"></firstHb>
      </template>
    </template>
    <div class="auto-modal flex_center confirm-tip-modal" v-if="showConfirmModal">
      <div class="modal-inner border-box">
        <div class="align_center font18 bold pb10 b_bottom_after color-theme pt20">确认收到买家转账了吗？</div>
        <div class="padding20 font16">
          <div class="flex_left pt20">备注订单金额（不必填）</div>
          <div class="db w_100 pt20">
            <div class="flex_left w_100 pb20">
              <x-input v-model="priceVal" class="input flex_left" type="text" placeholder="请输入订单金额" maxlength="10"></x-input>
              <div class="flex_right small-cell">元</div>
            </div>
            <div class="btns flex_center w_100 mt20">
              <div class="flex_cell flex_center">
                <div class="btn btn-cancel flex_center" @click="closeConfirm">取消</div>
              </div>
              <div class="flex_cell flex_center">
                <div class="btn btn-save flex_center" @click="confirmEvent">确认收款</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Group, Cell, Sticky, XDialog, TransferDom, Popup, XImg, XTextarea, XButton, XInput } from 'vux'
import OrderInfo from '@/components/OrderInfo'
import Sos from '@/components/Sos'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'
import FirstTip from '@/components/FirstTip'
import FirstHb from '@/components/FirstHb'
import Time from '#/time'
import ENV from 'env'
import jQuery from 'jquery'
import { User, SystemParams } from '#/storage'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group, Cell, Sticky, XDialog, Popup, OrderInfo, XImg, Sos, Subscribe, ApplyTip, XTextarea, XButton, FirstTip, FirstHb, XInput
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showApply: false,
      showContainer: false,
      showSos: false,
      sosTitle: '该订单不存在',
      loginUser: {},
      retailerInfo: {},
      query: {},
      data: {},
      totalPrice: '0.00',
      payPrice: '0.00',
      bottomcss: '',
      showpopup: false,
      delivercompany: [],
      deliverdata: { delivercompany: '-1', delivercode: '' },
      showRefundModal: false,
      refundContent: '',
      showFirst: false,
      isFirst: false,
      showHb: false,
      sysParams: {},
      showConfirmModal: false,
      priceVal: '',
      postContent: '',
      showStatus: false
    }
  },
  watch: {
    data () {
      return this.data
    }
  },
  computed: {
  },
  methods: {
    initData () {
      this.isFirst = false
      this.showFirst = false
      this.showHb = false
      this.deliverdata = { delivercompany: '-1', delivercode: '' }
    },
    submitFirstTip () {
      this.showFirst = false
    },
    toProduct (item) {
      if (this.query.fromapp === 'factory') {
        this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.product}?id=${item.pid}&module=product`})
      } else if (this.query.from) {
        this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.product}?id=${item.pid}&wid=${item.wid}&module=product`})
      } else {
        this.$router.push({path: '/product', query: {id: item.pid, wid: item.wid}})
      }
    },
    toMemberView () {
      let params = this.$util.handleAppParams(this.query, {uid: this.data.uid})
      this.$router.push({path: '/membersView', query: params})
    },
    toCard (item) {
      if (this.query.from) {
        this.$wechat.miniProgram.navigateTo({url: `${ENV.MiniRouter.addCard}?uid=${this.data.uid}`})
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
    changeContent () {
      this.postContent = ''
      this.showStatus = true
    },
    closeStatus () {
      this.showStatus = false
    },
    submitStatus () {
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/order/changeContent`,
        {orderid: this.data.id, content: this.postContent}
      ).then(res => {
        if (res) {
          this.$vux.loading.hide()
          const data = res.data
          this.$vux.toast.show({
            text: data.error,
            time: this.$util.delay(data.error)
          })
          if (data.flag) {
            this.showStatus = false
            this.data.content = data.data
          }
        }
      })
    },
    handleListData (data) {
      let retdata = data
      retdata.dateline_str = new Time(retdata.dateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
      if (retdata.pid && retdata.pid !== '') {
        retdata.pid_arr = retdata.pid.split(',')
      }
      if (retdata.flag !== 1) {
        let curprice = retdata.price
        if (curprice && curprice !== '') {
          curprice = curprice.replace(/,/g, '')
          retdata.price_num = curprice
        }
      }
      return retdata
    },
    closeConfirm () {
      this.showConfirmModal = false
      this.clickData = null
      this.clickIndex = 0
    },
    confirmPrice (item, index) {
      this.showConfirmModal = true
    },
    confirmEvent () {
      const self = this
      let postPrice = this.priceVal
      if (this.$util.trim(postPrice) === '') {
        postPrice = 0
      }
      if (isNaN(postPrice) || postPrice < 0) {
        self.$vux.toast.text('请输入正确的价格', 'middle')
        return false
      }
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/order/orderState`,
        {id: this.data.id, type: 'confirm', price: postPrice}
      ).then(res => {
        if (res) {
          self.$vux.loading.hide()
          const data = res.data
          self.$vux.toast.show({
            text: data.error,
            time: self.$util.delay(data.error)
          })
          if (data.flag) {
            this.showConfirmModal = false
            this.getData()
          }
        }
      })
    },
    agreeEvent (val) {
      const self = this
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
                    this.data.cancensorback = 0
                    this.data.backflag = 0
                    this.data.flag = 0
                    this.data.flagstr = '已退款'
                    this.getData()
                  }
                }
              })
            })
          }
        })
      } else {
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
              this.data.backflag = 0
              this.getData()
            }
          }
        })
      })
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
                  self.data.flag = 0
                }
              }
            })
          })
        }
      })
    },
    changePrice () {
      event.preventDefault()
      const self = this
      let showtitle = '修改价格'
      let inputval = self.data.special
      self.$vux.confirm.prompt(inputval, {
        title: showtitle,
        onShow () {
          self.$vux.confirm.setInputValue(inputval)
        },
        onConfirm (val) {
          if (val === undefined || self.$util.trim(val) === '' || isNaN(val) || parseFloat(val) < 0) {
            self.$vux.toast.text('请输入正确的价格', 'middle')
            return false
          }
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/order/changePrice`,
            { id: self.data.id, price: val }
          ).then(res => {
            const data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error),
              onHide: () => {
                if (data.flag === 1) {
                  self.data.special = parseFloat(val).toFixed(2)
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
        self.$http.post(`${ENV.BokaApi}/api/order/delivercompany`).then(res => {
          let data = res.data
          self.delivercompany = data.data ? data.data : data
        })
      }
      this.deliverdata = { delivercompany: '-1', delivercode: '' }
      this.showpopup = true
    },
    confirmpopup () {
      const self = this
      if (self.deliverdata.delivercompany.toString() === '' || self.deliverdata.delivercompany.toString() === '-1' || !self.deliverdata.delivercode || self.$util.trim(self.deliverdata.delivercode) === '') {
        self.$vux.toast.text('请输入物流单号', 'middle')
        return false
      }
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/order/deliver`, {...self.deliverdata, id: this.query.id}).then((res) => {
        let data = res.data
        self.$vux.loading.hide()
        let error = data.error
        if (self.data.flag === 3 && data.flag) {
          error = '修改成功'
        }
        self.$vux.toast.show({
          text: error,
          time: self.$util.delay(error),
          onHide: () => {
            if (data.flag === 1) {
              self.showpopup = false
              self.data.delivercompany = self.deliverdata.delivercompany
              self.data.delivercode = self.deliverdata.delivercode
              self.data.flag = 3
              if (self.data.delivercompany !== '-1') {
                for (let i = 0; i < self.delivercompany.length; i++) {
                  let d = self.delivercompany[i]
                  if (d.id === self.data.delivercompany) {
                    self.data.delivercompanyname = d.name
                    break
                  }
                }
              }
              // if (this.isFirst) {
              //   this.showHb = true
              // }
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
    getData () {
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'orderdetail', id: this.query.id
      })
      this.deliverdata.id = this.query.id
      const params = { id: this.query.id, from: 'retailer' }
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
          self.data = data.data
          if (self.data.length === 0) {
            self.showSos = true
            self.showContainer = false
          } else {
            self.showSos = false
            self.showContainer = true
            if (self.data.flag !== 2 || (self.data.flag === 2 && !self.data.candeliver)) {
              self.bottomcss = 'nobottom'
            }
            let total = 0
            for (let i = 0; i < self.data.orderlist.length; i++) {
              let o = self.data.orderlist[i]
              total += parseFloat(o.special.replace(/,/g, '')) * parseInt(o.quantity)
            }
            self.totalPrice = total.toFixed(2)
            if (self.data.delivercompany && self.$util.trim(self.data.delivercompany) !== '') {
              self.deliverdata.delivercompany = self.data.delivercompany
              self.deliverdata.delivercode = self.data.delivercode
            }
            return this.$http.get(`${ENV.BokaApi}/api/retailer/info`)
          }
        }
      }).then(res => {
        if (res) {
          const data = res.data
          if (data.flag) {
            this.retailerInfo = data.data
            this.loginUser.retailerinfo = this.retailerInfo
            User.set(this.loginUser)
            // if (`${this.retailerInfo.firstinfo.orderdeliver}` === '0' && this.query.from && this.data.flag === 2 && this.data.candeliver) {
            //   this.isFirst = true
            // }
          }
        }
      })
    },
    initContainer () {
      const self = this
      self.showApply = false
      self.showSos = false
      self.showContainer = false
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.$vux.loading.show()
      this.loginUser = User.get()
      this.initData()
      if (this.loginUser && (this.loginUser.subscribe === 1 || this.loginUser.isretailer)) {
        if (!this.loginUser.isretailer) {
          this.$vux.loading.hide()
          self.initContainer()
          this.showApply = true
        } else {
          this.$vux.loading.hide()
          document.title = this.loginUser.retailerinfo.title
          if (this.query.id !== this.$route.query.id) {
            self.initContainer()
            this.query = this.$route.query
            this.$vux.loading.show()
            this.getData()
          }
        }
      }
    }
  },
  activated () {
    this.refresh()
    this.$util.getSystemParams(() => {
      this.sysParams = SystemParams.get()
    })
    this.$util.miniPost()
  }
}
</script>

<style lang="less" scoped>
.popup-deliver .fileinput{position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:transparent;opacity:0;}
.confirm-tip-modal{
  .modal-inner{width:80%;}
  .input{
    flex:1;height:35px;border: 1px solid #eee;box-sizing: border-box;
    border-radius:5px;padding-left:5px;padding-right:5px;
  }
  .small-cell{width:20px;}
  .btns{
    width:100%;
    .btn{width:80%;height:40px;border-radius:5px;color:#fff;font-size:16px !important;}
    .btn-cancel{background-color:#bdbdbd !important;}
    .btn-save{background-color:#ff6a61 !important;}
  }
}
</style>
