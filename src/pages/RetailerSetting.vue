<template>
  <div class="containerarea s-havebottom bg-white font14">
    <div class="s-container" style="top:0;">
      <div class="padding10 font16 bg-gray4">{{ $t('Seller info setting') }}</div>
      <form>
        <forminputplate class="required">
          <span slot="title">{{ $t('Shop name') }}</span>
          <input v-model="submitdata.title" type="text" name="title" class="input border-box" :placeholder="$t('Shop name')" />
        </forminputplate>
        <div class="form-item required">
          <div class="pt10 pb5">{{ $t('Wechat qrcode') }} <span class="al al-xing color-red font12" style="vertical-align: 3px;"></span></div>
          <div>
            <input v-model="submitdata.qrcode" type="hidden" name="qrcode" />
            <div class="q_photolist align_left">
              <template v-if="photoarr.length > 0">
                <div v-for="(item,index) in photoarr" :key="index" class="photoitem">
                  <div class="inner photo imgcover" :photo="item" :style="`background-image: url('${item}');`">
                    <div class="close" @click="deletephoto(item,index)">×</div>
                    <div class="clip"><i class="al al-set"></i></div>
                  </div>
                </div>
              </template>
              <div v-if="photoarr.length < maxnum" class="photoitem add">
                <div class="inner">
                  <form class="fileform" enctype="multipart/form-data">
                    <input class="fileinput" type="file" name="files" @change="filechange" />
                  </form>
                  <div class="t-table">
                    <div class="t-cell">
                      <div class="txt">
                        <i class="al al-zhaopian" style="color:#c6c5c5;line-height:30px;"></i>
                        <div class="mt5">{{ $t('Upload wechat qrcode') }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="font12 color-blue3 mt5" @click="disqrcode">{{ $t('Upload qrcode text') }}</div>
          </div>
        </div>
        <forminputplate class="required">
          <span slot="title">{{ $t('Pay type') }}</span>
          <div>
            <check-icon :value.sync="submitdata.buyonline === 1" @click.native.stop="setbuyonline(1)">在线支付</check-icon>
            <check-icon :value.sync="submitdata.buyonline !== 1" @click.native.stop="setbuyonline(0)">线下支付</check-icon>
          </div>
        </forminputplate>
        <div v-show="showmore">
          <forminputplate>
            <span slot="title">{{ $t('Shop description') }}</span>
            <group class="textarea-outer" style="padding:0;">
              <x-textarea v-model="submitdata.content" style="padding:5px;" class="x-textarea noborder" :placeholder="$t('Shop description')" :show-counter="false" :rows="1" autosize></x-textarea>
            </group>
          </forminputplate>
          <forminputplate>
            <span slot="title">{{ $t('Auto reply') }}</span>
            <group class="textarea-outer" style="padding:0;">
              <x-textarea v-model="submitdata.fastreply" style="padding:5px;" class="x-textarea noborder" :placeholder="$t('Auto reply')" :show-counter="false" :rows="1" autosize></x-textarea>
            </group>
          </forminputplate>
        </div>
        <div v-if="showmore" @click="expandevent" class="padding15 font14 align_center color-gray">{{ $t('Up text') }}<i class="al al-jiantou2-up font14 middle-cell"></i></div>
        <div v-else class="padding15 font14 align_center color-gray"  @click="expandevent">{{ $t('Epand text') }}<i class="al al-jiantouyoushuang- font14"></i></div>
      </form>
    </div>
    <div class="s-bottom flex_center bg-green color-white" @click="submitevent">{{ $t('Save') }}</div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showonline" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">在线支付使用须知</div>
          <div class="popup-middle">
            <div class="padding10">
              <div class="bold">第一条 定义</div>
              <div>在线支付，是指买家查看商品信息时，可通过微信支付在线购买商品，卖家负责审核订单并对订单进行发货。</div>
              <div class="bold mt5">第二条 提现</div>
              <div>买家通过线上支付购买商品，需待买家确认收货后，卖家才可以通过“我的收入”提现收益。</div>
              <div class="bold mt5">第三条 手续费</div>
              <div>共销宝卖家需按订单交易额（含运费）的1%承担交易手续费，最低收费金额0.01元，不足0.01元按照0.01元收取。</div>
              <div class="bold mt5">退款订单处理规则：</div>
              <div>（1）当订单为“待发货”状态时，买家可主动发起交易退款，共销宝将整单全额退款，不收取手续费。</div>
              <div>（2）当订单为“已发货或已收货”状态时，线上无法申请及处理交易退款，买家可通过“申请维权”与卖家互加好友，线下协商解决，手续费不予退还。</div>
              <div class="bold mt5">第四条 交易规则</div>
              <div>（1）除买卖双方协商一致的，共销宝平台卖家需在买家付款后的72小时内操作发货。</div>
              <div>（2）卖家应当将商品通过物流配送至买家订单收货地址，并由收件人本人签收，需买家至指定地点提取的，应当事先予以显著明示或征得买家同意。</div>
              <div>（3）卖家优先选择有签收凭证的物流公司发货，若买卖双方使用当面交易交付货物，交易风险由买卖双方自行承担。</div>
              <div>（4）卖家违反发货规范导致买家未收到商品或拒收商品的，由此产生的相关费用及商品损毁或灭失风险，由卖家自行承担。</div>
              <div class="bold mt5">第五条 交易纠纷</div>
              <div>共销宝平台仅提供商品展示，不做任何担保交易，买卖双方在交易过程中出现的任何问题，由买卖双方协商解决。</div>
              <div class="bold mt5">第六条 信息完善</div>
              <div>开通在线支付后，请及时对已有商品设置“库存”及“运费”，在商品列表中，点击“操作”-->点击“编辑”，即可设置商品的“库存”及“运费”。</div>
            </div>
          </div>
          <div class="popup-bottom flex_center bg-orange color-white" @click="closeOnPopup">知道了</div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showoffline" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">线下支付使用须知</div>
          <div class="popup-middle">
            <div class="padding10">
              <div class="bold">第一条 定义</div>
              <div>线下支付，是指买家可通过商品页面与卖家互加好友，以传统微商（线下聊天转账）的交易方式进行交易。</div>
              <div class="bold mt5">第二条 交易纠纷</div>
              <div>共销宝平台仅提供商品展示，不做任何担保交易，买卖双方在交易过程中出现的任何问题，由买卖双方协商解决。</div>
              <div class="bold mt5">第三条 功能变更</div>
              <div>由“在线支付”模式更改为“线下支付”时，所有正在进行的促销活动将全部失效，再次更改为"在线支付"模式时，原有促销活动需重新创建，请谨慎更改。</div>
            </div>
          </div>
          <div class="popup-bottom flex_center bg-orange color-white" @click="closeOffPopup">知道了</div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showqrcode" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">如何获取二维码</div>
          <div class="popup-middle">
            <div class="padding10">
                <div class="align_center">
                  <img class="v_middle" style="max-width:80%;" src="../assets/images/saveqrcode.png" />
                </div>
                <div class="align_center mt5">
                  <img class="v_middle" style="max-width:80%;" src="../assets/images/saveqrcode1.png" />
                </div>
                <div class="align_center mt5">
                  <img class="v_middle" style="max-width:80%;" src="../assets/images/saveqrcode3.png" />
                </div>
                <div class="align_center mt5">
                  <img class="v_middle" style="max-width:80%;" src="../assets/images/saveqrcode2.png" />
                </div>
            </div>
          </div>
          <div class="popup-bottom flex_center bg-orange color-white" @click="closeQrcodePopup">{{ $t('Close') }}</div>
        </div>
      </popup>
    </div>
  </div>
</template>

<i18n>
Seller info setting:
  zh-CN: 卖家信息设置
Shop name:
  zh-CN: 店铺名称
Wechat qrcode:
  zh-CN: 微信二维码
Upload wechat qrcode:
  zh-CN: 上传个人微信二维码
Upload qrcode text:
  zh-CN: 如何上传个人微信二维码?
Pay type:
  zh-CN: 支付方式
Shop description:
  zh-CN: 店铺介绍
Auto reply:
  zh-CN: 自动回复
Auto reply placeholder:
  zh-CN: 用户在线咨询时自动回复的消息
Epand text:
  zh-CN: 展开更多设置
Up text:
  zh-CN: 收起更多设置
Cancel txt:
  zh-CN: 取消
Confirm txt:
  zh-CN: 提交
</i18n>

<script>
import { Group, XTextarea, XInput, TransferDom, Popup, CheckIcon } from 'vux'
import Forminputplate from '@/components/Forminputplate'
import ENV from 'env'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group, XTextarea, XInput, Popup, CheckIcon, Forminputplate
  },
  data () {
    return {
      isOnline: false,
      isOffline: false,
      showmore: false,
      havenum: 0,
      maxnum: 1,
      photoarr: [],
      submitdata: { title: '', qrcode: '', buyonline: 1, content: '', fastreply: '你好，请稍等，一会为你服务' },
      requireddata: { title: '', 'qrcode': '' },
      showonline: false,
      showoffline: false,
      showqrcode: false
    }
  },
  watch: {
    photoarr: function () {
      this.havenum = this.photoarr.length
      return this.photoarr
    },
    submitdata: function () {
      return this.submitdata
    }
  },
  computed: {
  },
  methods: {
    expandevent () {
      this.showmore = !this.showmore
    },
    filechange (e) {
      const self = this
      let files = e.target.files
      if (files.length > 0) {
        let fileform = document.querySelector('.fileform')
        let filedata = new FormData(fileform)
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          if (data.flag === 1) {
            self.photoarr.push(data.data)
            self.submitdata.qrcode = self.photoarr.join(',')
          } else if (data.error) {
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error)
            })
          }
        })
      }
    },
    deletephoto (item, index) {
      this.photoarr.splice(index, 1)
      this.submitdata.qrcode = this.photoarr.join(',')
    },
    setbuyonline (val) {
      if (val === 1) {
        this.showonline = true
      } else {
        this.showoffline = true
      }
      this.submitdata.buyonline = val
    },
    closeOnPopup () {
      this.showonline = false
    },
    closeOffPopup () {
      this.showoffline = false
    },
    disqrcode () {
      this.showqrcode = true
    },
    closeQrcodePopup () {
      this.showqrcode = false
    },
    submitevent () {
      const self = this
      let validateData = []
      for (let key in self.requireddata) {
        let v = {}
        v[key] = self.submitdata[key]
        validateData.push(v)
      }
      let iscontinue = self.$util.validateQueue(validateData,
        model => {
          switch (model.key) {
            default:
              self.$vux.toast.text('必填项不能为空', 'middle')
          }
        }
      )
      if (!iscontinue) {
        return false
      }
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/retailer/changeInfo`, self.submitdata).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.$router.push('/centerSales')
            }
          }
        })
      })
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.$vux.loading.show()
    self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
      module: 'retailer', action: 'setting'
    }).then(function () {
      return self.$http.get(`${ENV.BokaApi}/api/retailer/home`)
    }).then(function (res) {
      self.$vux.loading.hide()
      let data = res.data
      let retailerInfo = data.data ? data.data : data
      if (retailerInfo.buyonline) {
        self.isOnline = true
        self.isOffline = false
      } else {
        self.isOnline = false
        self.isOffline = true
      }
      for (let key in self.submitdata) {
        self.submitdata[key] = retailerInfo[key]
      }
      let qrcode = self.submitdata.qrcode
      if (qrcode && self.$util.trim(qrcode) !== '') {
        self.photoarr = qrcode.split(',')
      }
      self.havenum = self.photoarr.length
    })
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
