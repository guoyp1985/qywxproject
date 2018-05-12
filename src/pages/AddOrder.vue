<template>
  <div class="containerarea s-havebottom font14">
    <div class="s-container" style="top:0;">
      <form>
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
        <div v-if="!orderdata || orderdata.length === 0" class="padding10 bg-white align_center color-orange font18">无效订单</div>
        <div v-else v-for="(item,index) in orderdata" :key="item.id" class="orderitem bg-white">
          <div v-for="(product,index1) in item.info" :key="product.id" class="productitem">
    					<div class="b_bottom_after padding10">
    						<div class="t-table">
    							<div class="t-cell v_middle" style="width:65px;">
    								<img class="imgcover" style="width:45px;height:45px;" :src="product.photo">
    							</div>
    							<div class="t-cell v_middle">
    								<div class="name color-black font15">{{ product.name }}</div>
    							</div>
    							<div class="t-cell v_middle w100 align_right">¥{{ product.special }}×{{ submitdata.postdata[index].shopinfo[index1].quantity }}</div>
    						</div>
    					</div>
    					<div class="b_bottom_after padding10 form-item">
    						<div class="t-table">
    							<div class="t-cell v_middle" style="width:80px;">购买数量</div>
    							<div class="t-cell v_middle align_right">
                    <group class="x-number db-in">
                      <x-number v-model="submitdata.postdata[index].shopinfo[index1].quantity" :min="1" @on-change="changenumber()"></x-number>
                    </group>
    							</div>
    						</div>
    					</div>
          </div>
          <div class="b_bottom_after padding10">
            <div class="t-table">
              <div class="t-cell v_middle" style="width:40px;">留言</div>
              <div class="t-cell v_middle">
                <group class="textarea-outer" style="padding:0;">
                  <x-textarea v-model="submitdata.postdata[index].content" style="padding:5px;" class="x-textarea" :placeholder="$t('To seller message')" :show-counter="false" :rows="1" autosize></x-textarea>
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
            <div class="flex_cell h_100 flex_center bg-green color-white" @click="submitaddress">提交</div>
            <router-link :to="{ path: '/address/0', query: {lasturl: 'addOrder'} }" class="flex_cell h_100 flex_center bg-red color-white">新建地址</router-link>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <alert v-model="showalert">{{ $t('Please select address') }}</alert>
    </div>
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
import { Group, XNumber, XTextarea, XInput, TransferDom, Popup, Alert, CheckIcon } from 'vux'
import ENV from 'env'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group, XNumber, XTextarea, XInput, Popup, Alert, CheckIcon
  },
  data () {
    return {
      checkvalue: ['b'],
      checkarr: [ 'a', 'b', 'c' ],
      query: {},
      payPrice: '0.00',
      selectaddress: null,
      orderdata: [],
      payprice: '0.00',
      showpopup: false,
      showalert: false,
      addressdata: [],
      submitdata: {
        addressid: '',
        postdata: []
      }
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.query = self.$route.query
    self.$http.get(`${ENV.BokaApi}/api/user/address/list`).then(function (res) {
      let data = res.data
      let retdata = data.data ? data.data : data
      if (retdata) {
        self.addressdata = retdata
        for (let i = 0; i < self.addressdata.length; i++) {
          let a = self.addressdata[i]
          if (a.isdefault) {
            self.selectaddress = a
            break
          }
        }
        if (!self.selectaddress && self.addressdata.length > 0) {
          self.selectaddress = self.addressdata[0]
        }
        if (self.selectaddress) {
          self.submitdata.addressid = self.selectaddress.id
        }
      }
    })
    self.$http.get(`${ENV.BokaApi}/api/order/shopShow`).then(function (res) {
      let data = res.data
      self.orderdata = data
      let total = 0
      for (let i = 0; i < self.orderdata.length; i++) {
        let order = self.orderdata[i]
        let postd = { shopinfo: [], content: '' }
        let productinfos = order.info
        for (let j = 0; j < productinfos.length; j++) {
          let info = productinfos[j]
          let p = { shopid: info.id, quantity: info.quantity }
          postd.shopinfo.push(p)
          total += parseFloat(info.special) * info.quantity
        }
        self.submitdata.postdata.push(postd)
      }
      self.payPrice = total.toFixed(2)
    })
  },
  watch: {
    query: function () {
      return this.query
    },
    payprice: function () {
      return this.payprice
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
  },
  methods: {
    changenumber () {
      const self = this
      let total = 0
      for (let i = 0; i < self.orderdata.length; i++) {
        let order = self.orderdata[i]
        let productinfos = order.info
        for (let j = 0; j < productinfos.length; j++) {
          let pd = productinfos[j]
          total += parseFloat(pd.special) * self.submitdata.postdata[i].shopinfo[j].quantity
        }
      }
      self.payPrice = total.toFixed(2)
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
    },
    submitaddress () {
      if (!this.selectaddress.id) {
        this.showalert = true
      } else {
        this.showpopup = false
      }
    },
    submitOrder () {
      const self = this
      if (!self.submitdata.addressid) {
        self.$vux.toast.show({
          text: '请选择地址'
        })
        return false
      }
      self.isShowLoading = true
      self.$http.post(`${ENV.BokaApi}/api/order/addOrder`, self.submitdata).then(function (res) {
        let data = res.data
        self.isShowLoading = false
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.$router.push({path: '/pay', query: {id: data.id}})
            }
          }
        })
      })
    }
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
