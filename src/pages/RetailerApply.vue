<template>
  <div class="containerarea font14 bg-white retailerapply">
    <div class="pagetop flex_center bg-blue color-white font18">免费申请表</div>
    <div class="pagemiddle">
      <form class="applyform">
        <div class="form-item required">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">真实姓名<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <input v-model="submitdata.truename" required type="text" class="input" name="truename" placeholder="真实姓名" />
            </div>
          </div>
        </div>
        <div class="form-item required">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">手机号<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <group>
                <x-input v-model="submitdata.mobile" required class="font14" name="mobile" placeholder="手机号" mask="999 9999 9999" :max="13" is-type="china-mobile"></x-input>
              </group>
            </div>
            <div class="t-cell align_center w100">
              <div class="qbtn bg-blue3 color-white" style="line-height:25px;" @click="getcode">获取验证码</div>
            </div>
          </div>
        </div>
        <div class="form-item required">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">验证码<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <input v-model="submitdata.verifycode" type="text" class="input" name="verifycode" required placeholder="验证码"/>
            </div>
          </div>
        </div>
        <div class="form-item required" v-if="classdata.length > 0">
          <input v-model="submitdata.productclass" type="hidden" name="productclass" />
          <div class="pt10">经营产品<span class="fong12 color-gray">(最多三项)</span><span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
          <checker
          class="x-checker"
          type="checkbox"
          v-model="submitdata.productclass"
          :max="3"
          default-item-class="ck-item"
          selected-item-class="ck-item-selected">
            <checker-item v-for="(item, index) in classdata" :key="index" :value="index">{{ item.title }}</checker-item>
          </checker>
        </div>
        <div class="form-item padding10 font16">
          <div class="t-table">
            <div class="t-cell align_right v_middle">
              <label class="qcheckbox1 font16 color-gray" style="width:33px;">
                <input type="checkbox" @click="clickagree">同意
                <i class="al"></i>
              </label>
            </div>
            <div class="t-cell align_left v_middle color-blue" @click="showpopup">卖家入驻协议</div>
          </div>
        </div>
      </form>
    </div>
    <div :class="`pagebottom flex_center font18 ${bottomcss}`" @click="submitevent">马上免费入驻</div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="isshowpopup" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">卖家入驻协议</div>
          <div class="popup-middle font14">
            <div class="padding10">
              <h3 class="align_center">共销宝平台服务协议</h3>
            </div>
          </div>
          <div class="popup-bottom flex_center" @click="closepopup">{{ $t('Close') }}</div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <alert v-model="showalert">{{ $t('Please input telphone') }}</alert>
    </div>
    <div v-transfer-dom>
      <loading :show="isShowLoading" text=""></loading>
    </div>
  </div>
</template>

<i18n>
Required item not empty:
  zh-CN: 必填项不能为空
</i18n>

<script>
import { Group, XInput, TransferDomDirective as TransferDom, Alert, Popup, Loading, Checker, CheckerItem } from 'vux'
import ENV from '../../libs/env'
import Util from '../../libs/util'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    XInput,
    Alert,
    Popup,
    Loading,
    Checker,
    CheckerItem
  },
  created: function () {
    let self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.$http.get(`${ENV.BokaApi}/api/list/applyclass?ascdesc=asc`
    ).then(function (res) {
      return res.json()
    }).then(function (data) {
      data = data.data ? data.data : data
      for (let i = 0; i < data.length; i++) {
        let d = data[i]
        d.checked = false
      }
      self.classdata = data
    })
  },
  data () {
    return {
      loginuser: {},
      showalert: false,
      bottomcss: '',
      isagree: false,
      isshowpopup: false,
      classdata: [],
      isShowLoading: false,
      allowsubmit: false,
      submitdata: {
        truename: '',
        mobile: '',
        verifycode: '',
        productclass: ''
      },
      requireddata: { truename: '', 'mobile': '', 'verifycode': '', 'productclass': '' }
    }
  },
  watch: {
    submitdata: function () {
      return this.submitdata
    }
  },
  computed: {
  },
  methods: {
    getcode () {
      event.preventDefault()
      let self = this
      if (!self.isShowLoading) {
        if (Util.isNull(self.submitdata.mobile)) {
          self.$vux.alert.show({
            title: '',
            content: '请输入手机号'
          })
        } else {
          self.showalert = false
          self.isShowLoading = true
          self.$http.get(`${ENV.BokaApi}/api/verifyMobile`, {
            params: { phone: Util.trim(self.submitdata.mobile) }
          }).then(function (res) {
            return res.json()
          }).then(function (data) {
            self.isShowLoading = false
            self.$vux.toast.show({
              text: data.error,
              time: Util.delay(data.error)
            })
            if (data.flag === 1) {
              self.verifyCode = data.data
            }
          })
        }
      }
    },
    clickagree () {
      let self = this
      self.isagree = !self.isagree
      if (self.isagree) {
        self.bottomcss = 'active'
        self.allowsubmit = true
      } else {
        self.bottomcss = ''
        self.allowsubmit = false
      }
    },
    showpopup () {
      this.isshowpopup = true
    },
    closepopup () {
      this.isshowpopup = false
    },
    submitevent () {
      let self = this
      if (self.allowsubmit) {
        for (let key in self.requireddata) {
          self.requireddata[key] = self.submitdata[key]
        }
        self.allowsubmit = Util.validateQueue(self.requireddata)
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
        self.submitdata.mobile = Util.trim(self.submitdata.mobile)
        self.$http.post(`${ENV.BokaApi}/api/retailer/apply`, self.submitdata).then(function (res) {
          return res.json()
        }).then(function (data) {
          self.isShowLoading = false
          self.$vux.toast.show({
            text: data.error,
            time: Util.delay(data.error),
            onHide: function () {
              if (data.flag === 1) {
                self.$router.push('/centerSales')
              }
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="less">
.retailerapply .pagebottom{
  background-color:#f2f2f2;
}
.retailerapply .pagebottom{
  background-color:#f2f2f2;
}
.retailerapply .pagebottom.active{
  background-color: #1c90fe;
  color: #fff;
}
</style>
