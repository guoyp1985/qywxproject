<template>
  <div class="containerarea s-havebottom font14 apply-factory-page">
    <div v-if="showTop && factoryInfo.moderate == 0" class="pagetop border-box db-flex top-subscribe-tip">
      <div class="flex_cell h_100 flex_left">
        <i class="al al-gantanhaozhong font20"></i><span>关注公众号，及时收到审核通知</span>
      </div>
      <div class="w80 h_100 flex_right">
        <div class="btn flex_center" @click="toSubscribe">立即关注</div>
      </div>
    </div>
    <div class="s-container" :style="`top:${(showTop && factoryInfo.moderate == 0) ? '50' : 0}px;`">
      <form enctype="multipart/form-data">
        <input ref="fileInput1" class="hide" type="file" name="files" @change="fileChange('photo')" />
      </form>
      <form class="addForm">
        <div class="form-item fg bg-white b-top b-bottom" v-if="shareUser && shareUser.uid">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">推荐人</div>
            <div class="t-cell input-cell v_middle flex_right" style="position:relative;">{{ shareUser.linkman }}</div>
          </div>
        </div>
        <div class="form-item fg bg-white b-top b-bottom">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">公司名称<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
            <div class="t-cell input-cell v_middle flex_right" style="position:relative;">
              <template v-if="factoryInfo && factoryInfo.moderate == 0">{{factoryInfo.title}}</template>
              <x-input v-else style="padding-right:5px;" v-model="submitData.title" type="text" class="input" placeholder="请输入公司名称" ></x-input>
            </div>
          </div>
        </div>
        <div class="form-item fg bg-white b-top b-bottom">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">公司简称<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
            <div class="t-cell input-cell v_middle flex_right" style="position:relative;">
              <template v-if="factoryInfo && factoryInfo.moderate == 0">{{factoryInfo.company}}</template>
              <x-input v-else style="padding-right:5px;" v-model="submitData.company" type="text" class="input" placeholder="请输入公司简称" ></x-input>
            </div>
            <div class="t-cell v_middle font14 w50 align_right">旗舰店</div>
          </div>
        </div>
        <div class="form-item fg bg-white b-top b-bottom">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">手机号<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
            <div class="t-cell input-cell v_middle flex_right" style="position:relative;">
              <template v-if="factoryInfo && factoryInfo.moderate == 0">{{factoryInfo.mobile}}</template>
              <x-input v-else style="padding-right:5px;" v-model="submitData.mobile" type="text" class="input" placeholder="请输入手机号" ></x-input>
            </div>
          </div>
        </div>
        <div class="form-item fg bg-white b-top b-bottom" v-if="!factoryInfo || factoryInfo.moderate != 0">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">验证码<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
            <div class="t-cell input-cell v_middle flex_right" style="position:relative;">
              <x-input style="padding-right:5px;" v-model="yzmcode" type="text" class="input" placeholder="请输入验证码" ></x-input>
              <div class="font14 yzmcode disabled" v-if="count !== countNum" @click="getXcode" :disabled="count !== countNum">{{message}}</div>
              <div class="font14 yzmcode" v-else @click="getXcode" :disabled="count !== countNum">{{message}}</div>
            </div>
          </div>
        </div>
        <div class="form-item bg-white fg b-top">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">营业执照<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
            <div class="t-cell input-cell v_middle align_right" style="position:relative;">
              <template v-if="factoryInfo && factoryInfo.moderate == 0">
                <div class="q_photolist align_left bg-white">
                  <div class="photoitem">
                    <div class="inner photo imgcover" :photo="factoryInfo.licensephoto" :style="`background-image: url('${factoryInfo.licensephoto}');`"></div>
                  </div>
                </div>
              </template>
              <div v-else class="q_photolist align_left bg-white">
                <template v-if="photoarr.length > 0">
                  <div v-for="(item,index) in photoarr" :key="index" class="photoitem">
                    <div class="inner photo imgcover" :photo="item" :style="`background-image: url('${item}');`">
                      <div class="close" @click="deletephoto(item,index,'photo')">×</div>
                    </div>
                  </div>
                </template>
                <div v-if="photoarr.length < maxnum" @click="uploadPhoto('fileInput1')" class="align_right">
                  <span class="color-red">上传营业执照 ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="tradeData.length" class="form-item required bg-white">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">行业<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <select v-model="submitData.trade" class="w_100" style="height:35px;">
                <option v-for="(item,index) in tradeData" :value="item.skey">{{ item.value }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-item fg bg-white b-top b-bottom">
          <div class="t-table">
            <div class="t-cell title-cell font14 v_middle" style="width:100px;">社会信用代码<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
            <div class="t-cell input-cell v_middle flex_right" style="position:relative;">
              <template v-if="factoryInfo && factoryInfo.moderate == 0">{{factoryInfo.licensecode}}</template>
              <x-input v-else style="padding-right:5px;" v-model="submitData.licensecode" type="text" class="input" placeholder="请输入营业执照上的信用代码" ></x-input>
            </div>
          </div>
        </div>
        <!--
        <div class="form-item fg bg-white b-top b-bottom">
          <div class="t-table">
            <div class="t-cell title-cell font14 v_middle" style="width:100px;">公众号名称<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
            <div class="t-cell input-cell v_middle flex_right" style="position:relative;">
              <template v-if="factoryInfo && factoryInfo.moderate == 0">{{factoryInfo.licensecode}}</template>
              <x-input v-else style="padding-right:5px;" v-model="submitData.licensecode" type="text" class="input" placeholder="请填写公众号名称，若无则填无" ></x-input>
            </div>
          </div>
        </div>
        <div class="form-item fg bg-white b-top b-bottom">
          <div class="t-table">
            <div class="t-cell title-cell font14 v_middle" style="width:100px;">有无供应链资源<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
            <div class="t-cell input-cell v_middle flex_right" style="position:relative;">
              <template v-if="factoryInfo && factoryInfo.moderate == 0">{{factoryInfo.licensecode}}</template>
              <select>
                <option value="有">有</option>
                <option value="无">无</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-item fg bg-white b-top b-bottom">
          <div class="t-table">
            <div class="t-cell title-cell font14 v_middle" style="width:100px;">企业粉丝人数<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
            <div class="t-cell input-cell v_middle flex_right" style="position:relative;">
              <template v-if="factoryInfo && factoryInfo.moderate == 0">{{factoryInfo.licensecode}}</template>
              <x-input v-else style="padding-right:5px;" v-model="submitData.licensecode" type="text" class="input" placeholder="请填写企业粉丝人数或代理人数" ></x-input>
            </div>
          </div>
        </div>
      -->
        <!-- 合作模式 -->
        <div class="form-item fg bg-white b-top b-bottom">
          <div class="t-table">
            <div class="t-cell title-cell font14 v_middle" style="width:100px;">合作模式<span @click="clickCommission"><i class="al al-wenhao color-red ml5 font24" style="vertical-align:-4px;"></i></span></div>
            <div class="t-cell v_middle flex_right" style="position:relative;top:6px;">每月分佣模式</div>
          </div>
        </div>
        <!-- 分润比例设置 -->
        <div class="form-item bg-white fg b-top">
          <div class="">
            <span>分润比例设置</span><span @click="clickTip"><i class="al al-wenhao color-red ml5 font24" style="vertical-align:-4px;"></i></span>
          </div>
          <div class="flex_left padding10 b_bottom_after">
            <div class="flex_left title-cell w90">推荐人佣金</div>
            <div class="flex_cell input-cell flex_right" style="position:relative;">
              <template v-if="factoryInfo && factoryInfo.moderate == 0">{{factoryInfo.superiorrate}}</template>
              <x-input v-else class="input" type="tel" v-model="submitData.superiorrate" placeholder="输入百分比，例如10%则填写10"></x-input>
            </div>
            <div class="flex_right color-gray" style="width:20px;">%</div>
          </div>
          <div class="flex_left padding10">
            <div class="flex_left title-cell w90">销售佣金</div>
            <div class="flex_cell input-cell flex_right" style="position:relative;">
              <template v-if="factoryInfo && factoryInfo.moderate == 0">{{factoryInfo.salesrate}}</template>
              <x-input v-else class="input" type="tel" v-model="submitData.salesrate" placeholder="输入百分比，例如10%则填写10"></x-input>
            </div>
            <div class="flex_right color-gray" style="width:20px;">%</div>
          </div>
        </div>
        <template v-if="factoryInfo && factoryInfo.moderate == 0">
          <div class="form-item fg bg-white b-top b-bottom mb5">
            <div class="t-table">
              <div class="t-cell title-cell font14 v_middle" style="width:100px;">经营产品<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
              <div class="t-cell input-cell v_middle flex_table" style="position:relative;">{{classTitle}}</div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="form-item required border-box bg-white padding10 fg b-top mb5" v-if="classData.length > 0">
            <div class="pb10">经营产品<span class="color-gray">(最多三项)</span><span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
            <checker
            class="x-checker"
            type="checkbox"
            v-model="productClass"
            :max="3"
            default-item-class="ck-item"
            selected-item-class="ck-item-selected">
              <checker-item class="border1px color-gray" v-for="(item, index) in classData" :key="index" :value="item.id">{{ item.title }}</checker-item>
            </checker>
          </div>
        </template>
      </form>
    </div>
    <!-- <div class="s-bottom flex_center bg-orange color-white" @click="saveEvent">{{ $t('Submit') }}</div> -->
    <div class="s-bottom flex_center pl12 pr12 list-shadow02 bg-white">
      <div v-if="factoryInfo && factoryInfo.id && factoryInfo.moderate == 0" class="flex_cell flex_center btn-bottom-red disable">审核中...</div>
      <template v-else>
        <div :class="`flex_cell flex_center btn-bottom-red ${this.flags ? 'disable' : ''}`" @click="saveEvent">提交申请</div>
        <div :class="`flex_cell flex_center btn-bottom-green ${this.flags ? 'disable' : ''}`" @click="fastEvent">快速注册</div>
      </template>
    </div>
    <div v-if="showTip" class="auto-modal flex_center">
      <div class="modal-inner border-box" style="width:80%;">
        <div class="align_center font18 bold pb10 b_bottom_after color-theme pt20">分润比例设置</div>
        <div class="align_left txt padding10">
          <div>销售佣金：是指销售该商品的卖家所得佣金。</div>
          <div class="mt10">推荐人佣金：是指销售该商品的上级推荐人所得佣金。</div>
          <div class="mt10">佣金比例根据商品所设置的商品利润进行计算，例如商品利润为<span class="color-red">20元</span>，销售佣金比例为<span class="color-red">20%</span>，则销售该商品的卖家可得佣金为<span class="color-red">20 x 20%=4元</span>，推荐人佣金比例计算方式同理。</div>
          <div class="mt10">注意：销售佣金比例+推荐人佣金比例需小于100%，否则厂家将没有收入。</div>
        </div>
        <div class="close-area flex_center" @click="closeTip">
          <i class="al al-close"></i>
        </div>
      </div>
    </div>
    <div v-if="showMonthlyCommission" class="auto-modal flex_center">
      <div class="modal-inner border-box" style="width:80%;">
        <div class="align_center font18 bold pb10 b_bottom_after color-theme pt20">每月分佣模式</div>
        <div class="align_left txt padding10">
          <div>每月分佣合作模式：厂家需根据使用"共销客企业小程序"每月产生的交易额中,拿出2%的费用给予平台。如果本月没有销售额时,则无需支付使用费用</div>
          <div class="mt10 color-red">注意：共销客企业小程序使用达到一个月后,如未进行缴费时,则平台有权关闭厂家的使用权限!</div>
        </div>
        <div class="close-area flex_center" @click="closeCommission">
          <i class="al al-close"></i>
        </div>
      </div>
    </div>
    <div v-if="showPay" class="auto-modal flex_center">
      <div class="modal-inner border-box" style="width:80%;">
        <div class="align_center font18 bold pb10 b_bottom_after color-theme pt20">快速注册</div>
        <div class="align_left txt padding10">
          <div>支付 1000 元，添加客服微信，客服人员将单独为 您提供技术客服，并可立即开通厂家身份，无需进行审核</div>
        </div>
        <div class="padding10">
          <div class="flex_center">
            <div class="flex_cell flex_center">
              <div @click="closeTip" class="bg-gray color-white" style="width:80%;height:35px;border-radius:10px;">取消</div>
            </div>
            <div class="flex_cell flex_center">
              <div @click="toPay" class="bg-green color-white" style="width:80%;height:35px;border-radius:10px;">去支付</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div @click="clickChat" class="fixed-chat flex_center bg-theme color-white">客服</div>
    <div v-if="showQrcode" class="auto-modal flex_center">
      <div class="modal-inner border-box" style="width:80%;">
        <div class="align_center font18 bold pb10 b_bottom_after color-theme pt20">客服</div>
        <div class="flex_center">
          <img style="max-width:90%;" src="https://tossharingsales.boka.cn/minigxk/gxkKeFu.jpg" />
        </div>
        <div class="align_left txt padding10">
          <div class="align_center mt10">长按识别二维码</div>
        </div>
        <div class="close-area flex_center" @click="closeQrcode">
          <i class="al al-close"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Group, XInput, TransferDom, Popup, Checker, Datetime, CheckerItem, CheckIcon, XTextarea } from 'vux'
import ENV from 'env'
import Reg from '#/reg'
const TimeCount = 60

export default {
  name: 'ApplyFactory',
  props: {
    loginUser: {
      type: Object,
      default: {}
    },
    factoryInfo: Object,
    classData: {
      type: Array,
      default: []
    },
    submitData: {
      type: Object,
      default: {}
    },
    productClass: {
      type: Array,
      default: []
    },
    classTitle: {
      type: String,
      default: ''
    },
    tradeData: {
      type: Array,
      default: []
    }
  },
  directives: {
    TransferDom
  },
  components: {
    Group, XInput, Popup, Checker, Datetime, CheckerItem, CheckIcon, XTextarea
  },
  data () {
    return {
      query: {},
      flags: null,
      btnSubmit: '提交申请',
      message: '获取验证码',
      count: 60,
      countNum: 60,
      intervalId: null,
      allowsubmit: true,
      yzmcode: '',
      hqyzm: '',
      photoarr: [],
      maxnum: 1,
      showTip: false,
      fid: 0,
      getCodeIng: false,
      requireddata: { title: '', company: '', licensephoto: '', licensecode: '' },
      isLoadPhoto: false,
      showTop: false,
      showMonthlyCommission: false,
      shareUser: {},
      showPay: false,
      showQrcode: false
    }
  },
  watch: {
    factoryInfo: function () {
      return this.factoryInfo
    },
    submitData: function () {
      console.log('in submitData watch')
      this.watchTop()
      this.watchPhoto()
      return this.submitData
    },
    requireddata: function () {
      return this.requireddata
    },
    productClass: function () {
      return this.productClass
    }
  },
  methods: {
    toSubscribe () {
      this.$wechat.miniProgram.navigateTo({url: '/pages/subscribe'})
    },
    watchTop () {
      if (this.loginUser.subscribe !== 1 && this.$route.query.from && !this.showTop) {
        this.showTop = true
      }
    },
    watchPhoto () {
      if (this.factoryInfo.licensephoto && this.factoryInfo.licensephoto !== '' && !this.isLoadPhoto) {
        this.isLoadPhoto = true
        this.photoarr = this.factoryInfo.licensephoto.split(',')
      }
    },
    clickTip () {
      this.showTip = true
    },
    closeTip () {
      this.showTip = false
    },
    clickCommission () {
      this.showMonthlyCommission = true
    },
    closeCommission () {
      this.showMonthlyCommission = false
    },
    textareaChange (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    textareaFocus (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    deletephoto (item, index) {
      const self = this
      self.photoarr.splice(index, 1)
      self.$emit('clickPhoto', self.photoarr)
    },
    photoCallback (data) {
      const self = this
      if (data.flag === 1) {
        if (self.photoarr.length < self.maxnum) {
          self.photoarr.push(data.data)
          self.$emit('clickPhoto', self.photoarr)
        }
      } else if (data.error) {
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error)
        })
      }
    },
    uploadPhoto (refname) {
      const self = this
      const fileInput = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      if (self.$util.isPC()) {
        fileInput.click()
      } else {
        self.$wechat.ready(function () {
          self.$util.wxUploadImage({
            maxnum: self.maxnum - self.photoarr.length,
            handleCallback: function (data) {
              self.photoCallback(data)
            }
          })
        })
      }
    },
    fileChange (type) {
      const self = this
      const target = event.target
      const files = target.files
      if (files.length > 0) {
        const fileForm = target.parentNode
        const filedata = new FormData(fileForm)
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          self.photoCallback(data, type)
        })
      }
    },
    fastEvent () {
      this.showPay = true
    },
    toPay () {
      if (this.query.fromapp === 'factory') {
        this.$wechat.miniProgram.redirectTo({url: `/pages/pay`})
      } else {
        this.$router.push('/pay')
      }
    },
    closeQrcode () {
      this.showQrcode = false
    },
    clickChat () {
      this.showQrcode = true
    },
    saveEvent () {
      const self = this
      let postData = self.submitData
      console.log(this.yzmcode)
      console.log(postData)
      if (self.productClass) {
        postData.productclass = self.productClass
      } else {
        postData.productclass = self.factoryInfo.productclass
      }
      let validateData = []
      for (let key in self.requireddata) {
        let v = {}
        v[key] = postData[key]
        validateData.push(v)
      }
      if (postData.productclass.length === 0 || !postData.productclass) {
        self.$vux.toast.text('必填项不能为空', 'middle')
        return false
      }
      let iscontinue = self.$util.validateQueue(validateData,
        model => {
          switch (model.key) {
            default:
              self.$vux.toast.text('必填项不能为空', 'middle')
          }
        }
      )
      if (postData.mobile === '') {
        this.$vux.toast.text('手机号码不能为空！')
        return false
      }
      if (this.yzmcode === '') {
        this.$vux.toast.text('请填写验证码！')
        return false
      }
      if (this.yzmcode !== this.hqyzm) {
        this.$vux.toast.text('验证码错误！')
        return false
      }
      let superiorrate = postData.superiorrate
      let salesrate = postData.salesrate
      let reg = /^[1-9]\.?[0-9]*$/
      console.log('推荐卖家' + postData.superiorrate)
      console.log('卖家' + postData.salesrate)
      if (superiorrate !== 0 && !reg.test(superiorrate)) {
        self.$vux.toast.text('请输入正确的分润比例', 'middle')
        return
      }
      if (salesrate !== 0 && !reg.test(salesrate)) {
        self.$vux.toast.text('请输入正确的分润比例', 'middle')
        return
      }
      if (parseFloat(superiorrate) + parseFloat(salesrate) !== 100) {
        self.$vux.toast.text('推荐佣金+销售佣金必须等于100%', 'middle')
        return
      }
      if (!iscontinue) {
        return false
      }
      if (this.factoryInfo.id) {
        postData.id = this.factoryInfo.id
      }
      self.$vux.loading.show()
      if (self.shareUser && self.shareUser.uid) {
        postData.inviter = self.shareUser.uid
      }
      if (self.query.share_fid) {
        postData.fid = self.query.share_fid
      }
      self.$http.post(`${ENV.BokaApi}/api/factory/applyFactory`, postData).then(res => {
        let data = res.data
        let error = data.flag === 1 ? '申请成功' : data.error
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: self.$util.delay(error),
          onHide: () => {
            if (data.flag === 1) {
              self.initCode()
              self.$emit('afterApply', data.data)
            }
          }
        })
      })
    },
    getXcode () {
      if (!this.getCodeIng) {
        if (this.submitData.mobile === '') {
          this.$vux.toast.text('手机号码不能为空！')
          return false
        }
        if (!Reg.rPhone.test(this.submitData.mobile)) {
          this.$vux.toast.text('手机号码格式错误', 'middle')
          return false
        }
        if (Reg.rPhone.test(this.submitData.mobile)) {
          this.getCodeIng = true
          this.$http.get(`${ENV.BokaApi}/api/verifyMobile`, { params: { phone: this.submitData.mobile } }).then(res => {
            const data = res.data
            if (data.flag) {
              this.$vux.toast.text('验证码发送成功！')
              const yzm = data
              this.hqyzm = data.data
              console.log('验证码')
              console.log(yzm)
              this.intervalId = setInterval(() => {
                console.log('进入到了倒计时方法')
                this.count--
                if (!this.count) {
                  this.count = TimeCount
                  this.message = '获取验证码'
                  this.getCodeIng = false
                  clearInterval(this.intervalId)
                } else {
                  this.message = `${this.count}秒`
                }
              }, 1000)
            } else {
              this.getCodeIng = false
              this.$vux.toast.text(data.error)
            }
          })
        }
      }
    },
    handleProductClass () {
      const self = this
      self.productClass = []
      if (self.factoryInfo.productclass && self.$util.trim(self.factoryInfo.productclass) !== '') {
        let classStr = []
        let idarr = self.factoryInfo.productclass.split(',')
        for (let i = 0; i < idarr.length; i++) {
          self.productClass.push(parseInt(idarr[i]))
          for (let j = 0; j < self.classData.length; j++) {
            if (parseInt(idarr[i]) === self.classData[j].id) {
              classStr.push(self.classData[j].title)
              break
            }
          }
        }
        if (classStr.length) {
          self.classTitle = classStr.join(',')
        }
      }
    },
    getData () {
      const self = this
      self.$vux.loading.show()
      self.$http.get(`${ENV.BokaApi}/api/factory/info`,
        { params: { } }
      ).then(function (res) {
        self.$vux.loading.hide()
        let data = res.data
        if (data.flag) {
          let retdata = data.data ? data.data : data
          console.log('in getData')
          console.log(retdata)
          self.factoryInfo = retdata
          self.photoarr = []
          if (retdata.licensephoto && self.$util.trim(retdata.licensephoto) !== '') {
            self.photoarr = retdata.licensephoto.split(',')
          }
          for (let key in self.submitData) {
            self.submitData[key] = retdata[key]
          }
        }
        return self.$http.get(`${ENV.BokaApi}/api/list/applyclass?ascdesc=asc`,
          { params: { limit: 100 } }
        )
      }).then(function (res) {
        if (res) {
          let data = res.data
          data = data.data ? data.data : data
          self.classData = data
          self.handleProductClass()
        }
      })
    },
    initCode () {
      this.count = TimeCount
      this.message = '获取验证码'
      this.yzmcode = ''
      this.getCodeIng = false
      clearInterval(this.intervalId)
      this.intervalId = null
    },
    initData () {
      this.initCode()
    }
  },
  mounted () {
    console.log('in mounted')
    this.initData()
    this.watchPhoto()
    this.watchTop()
  },
  created () {
    this.query = this.$route.query
    if (this.query.share_uid) {
      this.$http.get(`${ENV.BokaApi}/api/getUser/${this.query.share_uid}`).then(res => {
        this.shareUser = res.data
      })
    }
  }
};
</script>

<style lang="less">
.apply-factory-page{
  background-color:#EFF2F3;
  .fg{margin-top:5px;}
  .b-border{border-bottom:1px solid #e5e5e5;}
  .b-top{border-top:1px solid #e5e5e5;}
  .yzmcode{
    background-color:#ff6a61;border:0;color:#fff;border-radius:5px;width:120px;
    height:30px;text-align:center;line-height:30px;outline:none;
  }
  .disabled{background-color:#ccc;color:#000;pointer-events:none;}
  .disable{pointer-events:none;}
  .photoitem{float:right !important;}
  .weui-input{text-align:right;}
  .weui-textarea{text-align:right;}
  .x-checker .ck-item{
    font-size:13px;
    display: inline-block;
    padding: 0 15px;
    height: 30px;
    line-height: 30px;
    border:0px;
    text-align: center;
    border-radius: 3px;
    background-color: #fff;
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    box-sizing: border-box;
  }
  .x-checker .border1px.ck-item-selected:after{border:1px solid #ea3a3a;}
  .vux-check-icon > span{color:#666;display: inline-block;vertical-align: bottom;line-height: 19px;}
  .fixed-chat{width:50px;height:50px;border-radius:50%;}
}
</style>
