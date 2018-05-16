<template>
  <div id="order-detail" :class="`containerarea notop rorderdetail bg-page color-gray5 font14 ${bottomcss}`">
    <div class="pagemiddle">
      <div v-if="data.seller && data.seller.username">
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
        <div class="flex_left">买家：{{ data.username }}  累计消费：<span class="color-red">{{ $t('RMB') }}{{ data.summoney }}</span></div>
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
      </div>
      <div class="mt10 bg-white padding10 b_bottom_after">
        <div class="t-table">
          <div class="t-cell">创建时间：{{ data.dateline | dateformat }}</div>
          <div class="t-cell w60 align_right color-orange5">{{ data.flagstr }}</div>
        </div>
      </div>
      <div class="bg-white">
        <div class="scroll_list productlist color_gray appendarea" ajaxurl="" template=".template">
          <router-link v-for="(item,index) in data.orderlist" :key="item.id" :to="{path: '/product', query: {id: item.id, wid: item.wid}}" class="scroll_item db padding10 bg-gray4">
            <div class="t-table">
              <div class="t-cell v_middle w60 algin_left">
                <img style="width:50px;height:50px;" class="v_middle imgcover" :src="item.photo" />
              </div>
              <div class="t-cell v_top">
                <div class="clamp2 font12 align_left">{{ item.name }}</div>
              </div>
              <div class="t-cell align_right w90">
                <div>{{ $t('RMB') }}{{ item.special }}</div>
                <div class="color-gray">× <span class="font12">{{ item.quantity }}</span></div>
              </div>
            </div>
          </router-link>
        </div>
        <div class="align_right padding10 flex_right">
          <div>合计:{{ $t('RMB') }} <span class="font16">{{ totalPrice }}</span></div>
        </div>
      </div>
      <div class="align_right">
        <div v-if="!data.payorder && data.flag != 1" class="b_bottom_after pl10 pr10 pb10 bg-white">
          <div class="t-table">
            <div class="t-cell v_middle align_right cancelarea">
              <div v-if="data.flag == 0" class="color-red">交易已关闭</div>
              <div v-else class="db-in color-blue" @click="cancelorder">关闭交易</div>
            </div>
            <router-link v-if="data.flag != 0" class="t-cell w80 color-blue" :to="{path: '/retailerAddorder', query: {id: data.id}}" >修改订单</router-link>
          </div>
        </div>
        <div v-if="data.nexttime" class="align_left padding10 color-gray2 font12">回访时间：{{ data.nexttime | dateformat }}</div>
      </div>
    </div>
    <div v-if="data.flag == 2" class="pagebottom flex_center font16 bg-orange5 color-white" @click="uploaddeliver">上传物流信息</div>
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
                  <div class="t-cell align_right w50" style="position:relative;">
                    <i class="al al-scanning color-blue"></i>
                    <form class="fileform1" enctype="multipart/form-data">
                      <input class="fileinput" type="file" name="files" @change="filechange" />
                    </form>
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
  </div>
</template>
<script>
import { Group, Cell, Sticky, XDialog, TransferDom, Popup } from 'vux'
import OrderInfo from '@/components/OrderInfo'
import Time from '#/time'
import ENV from 'env'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group, Cell, Sticky, XDialog, Popup, OrderInfo
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      query: {},
      data: {},
      totalPrice: '0.00',
      bottomcss: '',
      showpopup: false,
      delivercompany: [],
      deliverdata: { delivercompany: '-1', delivercode: '' }
    }
  },
  created: function () {
    let self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.query = self.$route.query
    if (self.query.id) {
      self.$vux.loading.show()
      self.deliverdata.id = self.query.id
      let params = { params: { id: self.query.id } }
      self.$http.get(`${ENV.BokaApi}/api/order/orderDetail`, params).then(function (res) {
        self.$vux.loading.hide()
        self.data = res.data.data ? res.data.data : res.data
        if (self.data.flag !== 2) {
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
      })
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
      if (self.deliverdata.delivercompany !== '-1' && (!self.deliverdata.delivercode || self.$util.trim(self.deliverdata.delivercode) === '')) {
        self.$vux.alert.show({
          title: '',
          content: '请输入物流单号'
        })
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
            }
          }
        })
      })
    },
    closepopup () {
      this.showpopup = false
    },
    filechange (e) {
      const self = this
      let files = e.target.files
      if (files.length > 0) {
        let fileform = document.querySelector('.popup-deliver .fileform1')
        let filedata = new FormData(fileform)
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(function (res) {
          let data = res.data
          if (data.flag === 1) {
            let picurl = data.data
            return self.$http.post(`${ENV.BokaApi}/api/retailer/qrcodeDecode`, { picurl: encodeURIComponent(picurl) })
          } else if (data.error) {
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error)
            })
          }
        }).then(function (res) {
          self.$vux.loading.hide()
          let data = res.data
          self.deliverdata.delivercode = data.data
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.popup-deliver .fileinput{position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:transparent;opacity:0;}
</style>
