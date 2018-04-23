<template>
  <div class="containerarea s-havebottom bg-white font14">
    <div class="s-container" style="top:0;">
      <form>
        <Forminputplate class="required">
          <span slot="title">{{ $t('Activity product') }}</span>
          <div v-if="showselectproduct" class="qbtn flex_center color-orange" style="border:orange 1px solid;width:100%;line-height:1;padding:4px 0;" @click="selectevent">
            <span class="mr5 v_middle db-in" style="margin-top:-3px;">+</span><span class="v_middle db-in">{{ $t('Select product') }}</span>
          </div>
          <div v-if="showproductitem" class="scroll_item border db">
            <div class="t-table">
              <div class="t-cell v_middle" style="width:50px;">
                <img class="v_middle" :src="selectproduct.photo" style="width:40px;height:40px;" />
              </div>
              <div class="t-cell v_middle">
                <div class="clamp1">{{ selectproduct.title }}</div>
                <div class="mt5 font12 clamp1"><span class="color-orange">{{ $t('RMB') }}{{ selectproduct.price }}</span><span class="ml10 color-gray">{{ $t('Storage') }}{{ selectproduct.storage }}</span></div>
              </div>
              <div class="t-cell align_center v_middle" style="width:60px;">
                <div class="qbtn color-red btnchange" style="border:#ff3b30 1px solid;line-height:1;" @click="selectevent">修改</div>
              </div>
            </div>
          </div>
        </Forminputplate>
        <Forminputplate class="required">
          <span slot="title">{{ $t('Starttime') }}</span>
          <group class="x-datetime">
            <datetime v-model='submitdata.starttime' :show.sync="visibility1" @on-change="datechange1" @on-cancel="datecancel1" @on-confirm="dateconfirm1"></datetime>
          </group>
          <div @click="showxdate1" class='font14 color-gray align_left' style="position:absolute;left:0;right:0;top:0;height:22px;background-color:transparent;z-index:10;">{{ selectdatetxt1 }}</div>
        </Forminputplate>
        <Forminputplate class="required">
          <span slot="title">{{ $t('Endtime') }}</span>
          <group class="x-datetime">
            <datetime v-model='submitdata.endtime' :show.sync="visibility2" @on-change="datechange2" @on-cancel="datecancel2" @on-confirm="dateconfirm2"></datetime>
          </group>
          <div @click="showxdate2" class='font14 color-gray align_left' style="position:absolute;left:0;right:0;top:0;height:22px;background-color:transparent;z-index:10;">{{ selectdatetxt2 }}</div>
        </Forminputplate>
        <div class="bg-gray6 font16 b_bottom_after padding10" style="padding:10px;">活动设置</div>
        <template v-if="query.type == 'groupbuy'">
          <FormGroupbuy :submitdata="submitdata"></FormGroupbuy>
        </template>
        <template v-if="query.type == 'bargainbuy'">
          <FormBargainbuy :submitdata="submitdata"></FormBargainbuy>
        </template>
        <template v-if="query.type == 'discount'">
          <FormDiscount :submitdata="submitdata"></FormDiscount>
        </template>
      </form>
    </div>
    <div class="s-bottom flex_center bg-orange color-white" @click="saveevent">{{ $t('Go to create') }}</div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showpopup" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">{{ $t('Select product') }}</div>
          <div class="popup-middle">
            <search
              class="x-search"
              position="absolute"
              auto-scroll-to-top top="0px"
              @on-focus="onFocus"
              @on-cancel="onCancel"
              @on-submit="onSubmit"
              ref="search">
            </search>
            <div class="scroll_list">
              <Radioitemplate v-for="(item,index) in getRadiodata" :key="item.id" class="pl10 pr10">
                <input v-model="submitdata.productid" :value="item.id" slot="radio" type="radio" name="product" :checked="item.checked" @click="radioclick(item)" />
                <img slot="pic" :src="item.photo" style="width:40px;height:40px;" class="v_middle imgcover" />
                <div slot="title" class="clamp1">{{item.title}}</div>
                <div slot="title" class="mt5 font12 clamp1"><span class="color-orange">¥{{ item.price }}</span><span class="ml10 color-gray">{{ $t('Storage') }} {{ item.storage }}</span></div>
              </Radioitemplate>
            </div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell bg-gray color-white h_100 flex_center" @click="closepopup">{{ $t('Close') }}</div>
            <div class="flex_cell bg-green color-white h_100 flex_center" @click="confirmpopup">{{ $t('Confirm txt') }}</div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <alert v-model="showalert">{{ $t('Please select product') }}</alert>
    </div>
    <div v-transfer-dom>
      <loading :show="isShowLoading" text=""></loading>
    </div>
  </div>
</template>

<i18n>
Select product:
  zh-CN: 选择商品
Activity product:
  zh-CN: 活动商品
Storage:
  zh-CN: 库存
Please select product:
  zh-CN: 请选择商品
Starttime:
  zh-CN: 开始时间
Endtime:
  zh-CN: 结束时间
Cancel txt:
  zh-CN: 取消
Confirm txt:
  zh-CN: 提交
Go to create:
  zh-CN: 立即创建
</i18n>

<script>
import { Group, XInput, TransferDom, Popup, Alert, Datetime, Search, Loading } from 'vux'
import Forminputplate from '@/components/Forminputplate'
import Radioitemplate from '@/components/Radioitemplate'
import FormGroupbuy from '@/components/FormGroupbuy'
import FormBargainbuy from '@/components/FormBargainbuy'
import FormDiscount from '@/components/FormDiscount'
import ENV from '#/env'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    Forminputplate,
    XInput,
    TransferDom,
    Popup,
    Radioitemplate,
    Alert,
    Loading,
    Datetime,
    Search,
    FormGroupbuy,
    FormBargainbuy,
    FormDiscount
  },
  data () {
    return {
      query: {},
      allowsubmit: true,
      showalert: false,
      isShowLoading: false,
      showselectproduct: true,
      showproductitem: false,
      selectproduct: {},
      selectpopupdata: {},
      showpopup: false,
      productdata: [],
      radiodata: [],
      visibility1: false,
      visibility2: false,
      selectdatetxt1: '选择开始时间',
      selectdatetxt2: '选择结束时间',
      submitdata: {},
      requireddata: {}
    }
  },
  created: function () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.$util.share({
      data: {
        link: location.href,
        title: '分享标题',
        desc: '分享描述',
        photo: ''
      }
    })
    self.query = self.$route.query
    self.$http.get(`${ENV.BokaApi}/api/list/product`).then(function (res) {
      return res.json()
    }).then(function (data) {
      data = data.data ? data.data : data
      self.productdata = data
    })
    if (self.query.type === 'groupbuy') {
      self.submitdata = {
        productid: '',
        starttime: '',
        endtime: '',
        param_groupprice: '',
        param_numbers: '',
        param_limitbuy: '',
        param_finishtime: '',
        param_everybuy: ''
      }
    } else if (self.query.type === 'bargainbuy') {
      self.submitdata = {
        productid: '',
        starttime: '',
        endtime: '',
        param_minprice: '',
        param_limitbuy: '',
        param_finishtime: '',
        param_everymin: '',
        param_everymax: ''
      }
    } else if (self.query.type === 'discount') {
      self.submitdata = {
        productid: '',
        starttime: '',
        endtime: '',
        param_price: '',
        param_limitcount: '',
        param_storage: ''
      }
    }
    self.submitdata['type'] = self.query.type
    self.requireddata = self.submitdata
  },
  watch: {
    query: function () {
      return this.query
    },
    productdata: function () {
      return this.productdata
    },
    submitdata: function () {
      return this.submitdata
    },
    requireddata: function () {
      return this.requireddata
    }
  },
  computed: {
    getRadiodata: function () {
      let curdata = this.productdata
      for (var i = 0; i < curdata.length; i++) {
        let d = curdata[i]
        d.checked = false
      }
      this.radiodata = curdata
      return curdata
    }
  },
  methods: {
    onSubmit () {
    },
    onFocus () {
    },
    onCancel () {
    },
    radioclick (d) {
      this.selectpopupdata = d
      d.checked = !d.checked
    },
    radiochange (val) {
      this.checkeduid = val
    },
    confirmpopup () {
      if (!this.selectpopupdata || !this.selectpopupdata.id) {
        this.showalert = true
      } else {
        this.selectproduct = this.selectpopupdata
        this.showpopup = false
        this.showselectproduct = false
        this.showproductitem = true
      }
    },
    selectevent () {
      this.showpopup = true
    },
    closepopup () {
      this.showpopup = false
    },
    showxdate1 () {
      this.visibility1 = true
    },
    datechange1 (val) {
    },
    datecancel1 () {
      this.submitdata.starttime = ''
      this.selectdatetxt1 = '选择开始时间'
    },
    dateconfirm1 () {
      this.selectdatetxt1 = ''
    },
    showxdate2 () {
      this.visibility2 = true
    },
    datechange2 (val) {
    },
    datecancel2 () {
      this.submitdata.endtime = ''
      this.selectdatetxt2 = '选择结束时间'
    },
    dateconfirm2 () {
      this.selectdatetxt2 = ''
    },
    saveevent () {
      const self = this
      for (let key in self.requireddata) {
        self.requireddata[key] = self.submitdata[key]
      }
      self.allowsubmit = self.$util.validateQueue(self.requireddata)
      console.log(self.submitdata)
      if (!self.allowsubmit) {
        self.$vux.alert.show({
          title: '',
          content: '必填项不能为空',
          onShow () {
          },
          onHide () {
            self.allowsubmit = true
          }
        })
        return false
      }
      self.isShowLoading = true
      self.$http.post(`${ENV.BokaApi}/api/retailer/addActivity`, self.submitdata).then(function (res) {
        return res.json()
      }).then(function (data) {
        self.isShowLoading = false
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.$router.push('/retailerActivitylist')
            }
          }
        })
      })
    }
  }
}
</script>

<style lang="less">
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
