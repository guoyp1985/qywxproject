<template>
  <div id="order-detail" class="containerarea notop simple-order-detail-page bg-page font14">
    <div class="pagemiddle scroll-container">
      <div class="bg-white b_bottom_after padding10">
        <div class="db-flex">
          <div class="w100">买家</div>
          <div class="flex_cell flex_right">{{orderData.linkman}}</div>
        </div>
      </div>
      <div class="bg-white b_bottom_after padding10">
        <div class="db-flex">
          <div class="w100">购买商品</div>
          <div class="flex_cell flex_right">
            <img :src="orderData.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" style="width:50px;height:50px;object-fit:cover;"/>
          </div>
        </div>
      </div>
      <div class="bg-white b_bottom_after padding10" v-if="orderData.price && orderData.price > 0">
        <div class="db-flex">
          <div class="w100">支付金额</div>
          <div class="flex_cell flex_right">{{$t('RMB')}}{{orderData.price}}</div>
        </div>
      </div>
      <div class="bg-white b_bottom_after padding10">
        <div class="db-flex">
          <div class="w100">收货地址</div>
          <div class="flex_cell flex_right">{{orderData.address}}</div>
        </div>
      </div>
      <div class="bg-white b_bottom_after padding10">
        <div class="db-flex">
          <div class="w100">手机号码</div>
          <div class="flex_cell flex_right">{{orderData.telephone}}</div>
        </div>
      </div>
      <div class="bg-white b_bottom_after padding10">
        <div class="db-flex">
          <div class="w100">
            <div>
              <div>购买件数</div>
              <div>型号/颜色</div>
            </div>
          </div>
          <div class="flex_cell flex_right">{{orderData.options}}</div>
        </div>
      </div>
      <div class="bg-white b_bottom_after padding10">
        <div class="db-flex">
          <div class="w100">备注</div>
          <div class="flex_cell flex_right">{{orderData.content}}</div>
        </div>
      </div>
      <div class="bg-white b_bottom_after padding10">
        <div class="db-flex">
          <div class="w100">创建时间</div>
          <div class="flex_cell flex_right">{{ orderData.dateline | dateFormat }}</div>
        </div>
      </div>
      <template v-if="orderData.delivercode && orderData.delivercode != '' && orderData.delivercompany && orderData.delivercompany != ''">
        <div class="bg-white b_bottom_after padding10 mt10">
          <div class="db-flex">
            <div class="w100">物流单号</div>
            <div class="flex_cell flex_right">{{orderData.delivercode}}</div>
          </div>
        </div>
        <div class="bg-white b_bottom_after padding10">
          <div class="db-flex">
            <div class="w100">物流公司</div>
            <div class="flex_cell flex_right">{{orderData.delivercompanyname}}</div>
          </div>
        </div>
        <div class="bg-white b_bottom_after padding10">
          <div class="db-flex">
            <div class="w100">发货日期</div>
            <div class="flex_cell flex_right">{{ orderData.delivertime | dateFormat }}</div>
          </div>
        </div>
      </template>
      <template v-if="loginUser.uid == orderData.wid">
        <div class="mt10 flex_right padding10" v-if="orderData.flag == 1">
          <div class="qbtn2 font12" @click="cancelOrder">取消订单</div>
          <div class="qbtn2 font12 ml10 color-theme" style="border:#ff6a61 1px solid;" @click="clickConfirm">确认订单</div>
        </div>
        <div class="mt10 flex_right padding10" v-if="orderData.flag == 2">
          <div class="qbtn2 font12 ml10 color-theme" style="border:#ff6a61 1px solid;" @click="clickDeliver">去发货</div>
        </div>
      </template>
    </div>
    <div class="modalarea flex_center" v-if="showConfirm">
      <div class="modalSure font14">
        <div class="align_center font16">请确认是否收到买家的付款</div>
        <div class="flex_table flex_center" style="margin-top:50px;">
          <div class="flex_left">
            <div style="width:100px;">备注付款金额</div>
            <x-input v-model="price" class="input" type="text" placeholder="输入金额" maxlength="10" size="10"></x-input>
            <div class="flex_right" style="width:30px;">元</div>
          </div>
        </div>
        <div class="flex_table flex_center" style="margin-top:50px;">
          <div @click="closeModal" class="btns canle align_center mr10">取消</div>
          <div class="btns sure align_center ml10" @click="confirmOrder">确认收款</div>
        </div>
      </div>
    </div>
    <div v-transfer-dom class="x-popup popup-deliver">
      <popup v-model="showDeliver" height="100%">
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
            <div class="flex_cell bg-gray color-white h_100 flex_center" @click="closeDeliver">{{ $t('Close') }}</div>
            <div class="flex_cell bg-green color-white h_100 flex_center" @click="toDeliver">{{ $t('Confirm txt') }}</div>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
import { TransferDom, Popup, XInput } from 'vux'
import ENV from 'env'
import Time from '#/time'
import { User } from '#/storage'

const BokaApi = ENV.BokaApi

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, XInput
  },
  filters: {
    dateFormat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      loginUser: {},
      query: {},
      orderData: {},
      showConfirm: false,
      price: '',
      showDeliver: false,
      delivercompany: [],
      deliverdata: { delivercompany: '-1', delivercode: '' }
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
    cancelOrder () {
      this.$vux.confirm.show({
        content: '确定要取消该订单吗？',
        onConfirm: () => {
          this.$vux.loading.show()
          this.$http.post(`${ENV.BokaApi}/api/ordersoffline/state`, {
            id: this.query.id, type: 'cancel'
          }).then(res => {
            const data = res.data
            this.$vux.loading.hide()
            this.$vux.toast.show({
              text: data.error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: this.$util.delay(data.error),
              onHide: () => {
                if (data.flag === 1) {
                  this.orderData = data.data
                }
              }
            })
          })
        }
      })
    },
    confirmOrder () {
      let inputMoney = `${this.price}`
      if (inputMoney.indexOf(',') > -1) {
        inputMoney = inputMoney.replace(/,/g, '')
      }
      if (inputMoney === '' || isNaN(inputMoney) || parseFloat(inputMoney) < 0) {
        this.$vux.toast.show({
          text: '请输入正确的付款金额',
          width: '200px',
          type: 'text'
        })
        return false
      }
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/ordersoffline/state`, {
        id: this.query.id, type: 'confirm', price: inputMoney
      }).then(res => {
        const data = res.data
        this.$vux.loading.hide()
        this.$vux.toast.show({
          text: data.error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: this.$util.delay(data.error),
          onHide: () => {
            if (data.flag === 1) {
              this.orderData = data.data
              this.showConfirm = false
            }
          }
        })
      })
    },
    clickConfirm () {
      this.showConfirm = true
    },
    closeModal () {
      this.showConfirm = false
    },
    clickDeliver () {
      if (!this.delivercompany.length) {
        this.$http.post(`${ENV.BokaApi}/api/order/delivercompany`).then(res => {
          let data = res.data
          this.delivercompany = data.data ? data.data : data
        })
      }
      this.showDeliver = true
    },
    closeDeliver () {
      this.showDeliver = false
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
    toDeliver () {
      const self = this
      if (self.deliverdata.delivercompany.toString() === '' || self.deliverdata.delivercompany.toString() === '-1' || !self.deliverdata.delivercode || self.$util.trim(self.deliverdata.delivercode) === '') {
        self.$vux.toast.text('请输入物流单号', 'middle')
        return false
      }
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/ordersoffline/state`, {
        ...self.deliverdata, id: this.query.id, type: 'deliver'
      }).then(res => {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.orderData = data.data
              self.showDeliver = false
            }
          }
        })
      })
    },
    getData () {
      this.$http.get(`${BokaApi}/api/ordersoffline/info`, {
        params: {id: this.query.id}
      }).then(res => {
        const data = res.data
        const retdata = data.data ? data.data : data
        this.orderData = retdata
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
      this.getData()
    }
  },
  activated () {
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less">
.popup-deliver .fileinput{position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:transparent;opacity:0;}
.simple-order-detail-page{
  .modalSure{
    width:70%;background-color:#ffffff;padding:20px 10px;box-sizing:border-box;border-radius:10px;
    input{border:1px solid #e5e5e5;width:100%;height:30px;line-height:30px;padding:0 5px;}
    .btns{width:100px;height:35px;line-height:35px;border-radius:5px;}
    .canle{background-color:#e0e0e0;}
    .sure{background-color:#fc6863;color:#ffffff;}
    .weui-cell{padding:0;}
  }
}
</style>
