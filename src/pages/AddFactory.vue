<template>
  <div class="containerarea s-havebottom font14 addFactory">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="s-topbanner s-topbanner1">
        <tab class="v-tab" v-model="selectedIndex">
          <tab-item :selected="selectedIndex==0" @on-item-click="clickTab">基本信息</tab-item>
          <tab-item :selected="selectedIndex==1" @on-item-click="clickTab">收款信息</tab-item>
        </tab>
      </div>
      <div class="s-container" style="top:45px;">
        <div v-show="selectedIndex==0">
          <form enctype="multipart/form-data">
            <input ref="fileInput1" class="hide" type="file" name="files" @change="fileChange('photo')" />
          </form>
          <form enctype="multipart/form-data">
            <input ref="fileInput2" class="hide" type="file" name="files" @change="fileChange('qrcode')" />
          </form>
          <form enctype="multipart/form-data">
            <input ref="fileInput3" class="hide" type="file" name="files" @change="fileChange('shoukuanma')" />
          </form>
          <form class="addForm">
            <div class="form-item fg bg-white b-top b-bottom">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Fatory name') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
                <div class="t-cell input-cell v_middle flex_right" style="position:relative;">
                  <x-input style="width:80%;padding-right:5px;" v-model="submitData.company" type="text" class="input" :placeholder="$t('Fatory name')" ></x-input>
                </div>
                <div class="t-cell v_middle font14 w50 align_right">旗舰店</div>
              </div>
            </div>
            <div class="form-item bg-white fg b-top">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Product summary') }}</div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <group class="textarea-outer" style="padding:0;">
                    <x-textarea
                      ref="summaryTextarea"
                      v-model="submitData.summary"
                      class="x-textarea noborder"
                      :placeholder="$t('Product summary')"
                      :show-counter="false"
                      :rows="1"
                      :max="30"
                      @on-change="textareaChange('summaryTextarea')"
                      @on-focus="textareaFocus('summaryTextarea')"
                      autosize>
                    </x-textarea>
                  </group>
                </div>
              </div>
            </div>
            <!-- 合作模式 -->
            <div class="form-item fg bg-white b-top b-bottom">
              <div class="t-table">
                <div class="t-cell title-cell font14 v_middle" style="width:100px;">合作模式<span @click="clickCommission"><i class="al al-wenhao color-red ml5 font24" style="vertical-align:-4px;"></i></span></div>
                <div class="t-cell v_middle flex_right" style="position:relative;top:6px;">每月分佣模式</div>
              </div>
            </div>
            <div class="form-item bg-white fg b-top">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">缩写码<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <x-input v-model="submitData.shortcode" type="text" class="input font14 align_right" :max="3" placeholder="必须为三位大写字母"></x-input>
                </div>
                <!-- <div class="t-cell title-cell color-red v_middle font12 align_right" style="width:130px;">(必须为三位大写字母)</div> -->
              </div>
            </div>
            <div v-if="tradeData.length" class="form-item required bg-white">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">行业<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <select v-model="submitData.trade" class="w_100" style="height:35px;">
                    <option v-for="(item,index) in tradeData" :value="item.id" :selected="submitData.trade == item.id">{{ item.value }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-item bg-white fg b-top">
              <div class="t-table">
                <div class="t-cell title-cell w100 font14 v_middle">公众号二维码</div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <div class="q_photolist align_left bg-white">
                    <template v-if="qrcodearr.length > 0">
                      <div v-for="(item,index) in qrcodearr" :key="index" class="photoitem">
                        <div class="inner photo imgcover" :photo="item" :style="`background-image: url('${item}');`">
                          <div class="close" @click="deletephoto(item,index,'qrcode')">×</div>
                        </div>
                      </div>
                    </template>
                    <div v-if="qrcodearr.length < maxnum" @click="uploadPhoto('fileInput2', 'qrcode')" class="align_right">
                      <span class="color-red">公众号二维码 ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-item bg-white fg b-top">
              <div class="t-table">
                <div class="t-cell title-cell w100 font14 v_middle">客服</div>
                <div class="t-cell input-cell v_middle" style="position:relative;text-align:right;" @click="clickUserEvent">
                  <template v-if="serviceUser && serviceUser.uid"><img class="v_middle" :src="serviceUser.avatar" style="width:30px;height:30px;object-fit:cover;border-radius:50%;" /><span class="ml5 v_middle">{{serviceUser.linkman}}</span></template>
                  <span v-else class="color-red">去选择 ></span>
                </div>
              </div>
            </div>
            <div class="form-item bg-white fg b-top">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">logo</div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <div class="q_photolist align_left bg-white">
                    <template v-if="photoarr.length > 0">
                      <div v-for="(item,index) in photoarr" :key="index" class="photoitem">
                        <div class="inner photo imgcover" :photo="item" :style="`background-image: url('${item}');`">
                          <div class="close" @click="deletephoto(item,index,'photo')">×</div>
                        </div>
                      </div>
                    </template>
                    <div v-if="photoarr.length < maxnum" @click="uploadPhoto('fileInput1', 'photo')" class="align_right">
                      <span class="color-red">添加logo ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-item bg-white fg b-top">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">商城模板</div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <check-icon class="red-check" :value.sync="template1" @click.native.stop="clickTemplate(1)">通用版</check-icon>
                  <check-icon class="red-check" :value.sync="template2" @click.native.stop="clickTemplate(2)">大图版</check-icon>
                  <check-icon class="red-check" :value.sync="template3" @click.native.stop="clickTemplate(3)">列表版</check-icon>
                </div>
              </div>
            </div>

            <!-- 分润比例设置 -->
            <!-- <div class="form-item bg-white fg b-top">
              <div class=""><span>分润比例设置</span><span @click="clickTip"><i class="al al-wenhao color-red ml5 font24" style="vertical-align:-4px;"></i></span></div>
              <div class="flex_left padding10 b_bottom_after">
                <div class="flex_left title-cell w90">推荐人佣金</div>
                <div class="flex_cell input-cell flex_right" style="position:relative;">
                  <x-input class="input" type="tel" v-model="submitData.superiorrate" placeholder="输入百分比，例如10%则填写10"></x-input>
                </div>
                <div class="flex_right color-gray" style="width:20px;">%</div>
              </div>
              <div class="flex_left padding10">
                <div class="flex_left title-cell w90">销售佣金</div>
                <div class="flex_cell input-cell flex_right" style="position:relative;">
                  <x-input class="input" type="tel" v-model="submitData.salesrate" placeholder="输入百分比，例如10%则填写10"></x-input>
                </div>
                <div class="flex_right color-gray" style="width:20px;">%</div>
              </div>
            </div> -->
            <template v-if="disClassData">
              <div class="form-item required border-box bg-white padding10 fg b-top" v-if="classData.length > 0">
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
        <div v-show="selectedIndex == 1">
          <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">开户银行</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <select v-model="collectData.newbankcode" class="w_100" style="height:35px;">
                  <option value='0'>请选择银行</option>
                  <option v-for="(item,index) in cardList" :value="item.id">{{ item.name }}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">开户名</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <input v-model="collectData.accountname" type="text" class="input priceInput" name="username" placeholder="开户名" />
              </div>
            </div>
          </div>
          <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">开户账号</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <input v-model="collectData.newbankcardno" type="text" class="input priceInput" name="username" placeholder="开户账号" />
              </div>
            </div>
          </div>
          <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">联系人</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <input v-model="collectData.newbankuser" type="text" class="input priceInput" name="username" placeholder="联系人" />
              </div>
            </div>
          </div>
          <div class="form-item required bg-white">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">手机号</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <input v-model="collectData.mobile" type="text" class="input priceInput" name="username" placeholder="手机号" />
              </div>
            </div>
          </div>
          <div class="form-item bg-white fg b-top">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">收款码</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <div class="q_photolist align_left bg-white">
                  <template v-if="skmarr.length > 0">
                    <div v-for="(item,index) in skmarr" :key="index" class="photoitem">
                      <div class="inner photo imgcover" :photo="item" :style="`background-image: url('${item}');`">
                        <div class="close" @click="deletephoto(item,index,'shoukuanma')">×</div>
                      </div>
                    </div>
                  </template>
                  <div v-if="skmarr.length < maxnum" @click="uploadPhoto('fileInput3', 'shoukuanma')" class="align_right">
                    <span class="color-red">上传收款码 ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="s-bottom flex_center pl12 pr12 list-shadow02 bg-white" v-if="selectedIndex == 0">
        <div class="flex_cell flex_center btn-bottom-red" @click="saveEvent">提交基本信息</div>
      </div>
      <div class="s-bottom flex_center pl12 pr12 list-shadow02 bg-white" v-else>
        <div class="flex_cell flex_center btn-bottom-red" @click="saveCollect">提交收款信息</div>
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
      <div v-transfer-dom class="x-popup">
        <popup v-model="showUserPopup" height="100%">
          <div class="popup1">
            <div class="popup-top flex_center">选择客服</div>
            <div ref="scrollProduct" @scroll="handleScroll('scrollProduct','product')" class="popup-middle">
              <div class="scroll_list">
                <div v-if="!userData || userData.length === 0" class="scroll_item padding10 color-gray align_center">
                  <div class="flex_center" style="height:80px;">暂无用户</div>
                </div>
                <check-icon v-else class="x-check-icon scroll_item" v-for="(item,index) in userData" :key="item.id" :value.sync="item.checked" @click.native.stop="radioclick(item,index)">
                  <div class="t-table">
                    <div class="t-cell pic v_middle w50">
                      <img :src="item.avatar" style="width:40px;height:40px;border-radius:50%;" class="v_middle imgcover" />
                    </div>
                    <div class="t-cell v_middle" style="color:inherit;">
                      <div class="clamp1">{{item.linkman}}</div>
                    </div>
                  </div>
                </check-icon>
              </div>
            </div>
            <div class="popup-bottom flex_center">
              <div class="flex_cell bg-gray color-white h_100 flex_center" @click="closeUserPopup">{{ $t('Close') }}</div>
              <div class="flex_cell bg-green color-white h_100 flex_center" @click="submitUser">{{ $t('Confirm txt') }}</div>
            </div>
          </div>
        </popup>
      </div>
    </template>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Tab, TabItem, Group, XInput, TransferDom, Popup, Checker, Datetime, CheckerItem, CheckIcon, XTextarea } from 'vux'
import ENV from 'env'
import Reg from '#/reg'
import { User } from '#/storage'
import Sos from '@/components/Sos'
const jweixin = require('../../static/jweixin')

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Group, XInput, Popup, Checker, Datetime, CheckerItem, CheckIcon, XTextarea, Sos
  },
  data () {
    return {
      showSos: false,
      sosTitle: '抱歉，您暂无权限访问此页面！',
      showContainer: false,
      query: {},
      loginUser: {},
      infoData: {},
      allowsubmit: true,
      submitData: { company: '', summary: '', shortcode: '', publicqrcode: '', services: '', photo: '', superiorrate: '20', salesrate: '80', trade: 1, shopmodel: '2' },
      requireddata: { company: '' },
      classData: [],
      tradeData: [],
      productClass: [],
      disClassData: false,
      photoarr: [],
      maxnum: 1,
      showTip: false,
      fid: 0,
      qrcodearr: [],
      template1: false,
      template2: false,
      template3: false,
      serviceUser: {},
      showUserPopup: false,
      userData: [],
      pageStart: 0,
      limit: 20,
      clickUser: null,
      showMonthlyCommission: false,
      selectedIndex: 0,
      collectData: {newbankcode: '', accountname: '', newbankcardno: '', newbankuser: '', mobile: ''},
      cardList: [],
      skmarr: []
    }
  },
  watch: {
    query: function () {
      return this.query
    },
    submitData: function () {
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
    clickTab () {

    },
    clearChecked () {
      for (let i = 0; i < this.userData.length; i++) {
        delete this.userData[i].checked
      }
    },
    getUsers () {
      const self = this
      const params = {fid: self.query.fid, pagestart: self.pageStart, limit: self.limit}
      self.$http.post(`${ENV.BokaApi}/api/factory/adminList`, params).then(function (res) {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.userData = self.userData.concat(retdata)
      })
    },
    clickUserEvent () {
      this.showUserPopup = true
      if (!this.userData.length) {
        this.getUsers()
      }
    },
    closeUserPopup () {
      this.showUserPopup = false
      this.clickUser = false
      this.clearChecked()
    },
    radioclick (item, index) {
      this.clickUser = item
      for (let i = 0; i < this.userData.length; i++) {
        if (this.userData[i].uid === item.uid) {
          this.userData[i].checked = true
        } else {
          delete this.userData[i].checked
        }
      }
    },
    submitUser () {
      if (!this.clickUser) {
        this.$vux.toast.text('请选择用户', 'middle')
      } else {
        this.showUserPopup = false
        this.serviceUser = this.clickUser
        this.clickUser = null
        this.clearChecked()
      }
    },
    clickTemplate (val) {
      let curval = parseInt(val)
      if (curval === 1) {
        this.template1 = true
        this.template2 = false
        this.template3 = false
        this.submitData.shopmodel = 1
      } else if (curval === 2) {
        this.template1 = false
        this.template2 = true
        this.template3 = false
        this.submitData.shopmodel = 2
      } else if (curval === 3) {
        this.template1 = false
        this.template2 = false
        this.template3 = true
        this.submitData.shopmodel = 3
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
    deletephoto (item, index, type) {
      const self = this
      if (type === 'qrcode') {
        self.qrcodearr.splice(index, 1)
        self.submitData.photo = self.qrcodearr.join(',')
      } else if (type === 'shoukuanma') {
        self.skmarr.splice(index, 1)
        self.submitData.shoukuanma = self.skmarr.join(',')
      } else {
        self.photoarr.splice(index, 1)
        self.submitData.publicqrcode = self.photoarr.join(',')
      }
    },
    photoCallback (data, type) {
      const self = this
      if (data.flag === 1) {
        if (type === 'qrcode') {
          if (self.qrcodearr.length < self.maxnum) {
            self.qrcodearr.push(data.data)
            self.submitData.publicqrcode = self.qrcodearr.join(',')
          }
        } else if (type === 'shoukuanma') {
          if (self.skmarr.length < self.maxnum) {
            self.skmarr.push(data.data)
            self.submitData.shoukuanma = self.skmarr.join(',')
          }
        } else {
          if (self.photoarr.length < self.maxnum) {
            self.photoarr.push(data.data)
            self.submitData.photo = self.photoarr.join(',')
          }
        }
      } else if (data.error) {
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error)
        })
      }
    },
    uploadPhoto (refname, type) {
      const self = this
      const fileInput = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      if (self.$util.isPC()) {
        fileInput.click()
      } else {
        jweixin.ready(function () {
          self.$util.wxUploadImage({
            maxnum: self.maxnum - self.photoarr.length,
            handleCallback: function (data) {
              self.photoCallback(data, type)
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
    saveEvent () {
      const self = this
      let postData = self.submitData
      console.log(postData)
      if (self.productClass) {
        postData.productclass = self.productClass
      } else {
        postData.productclass = self.infoData.productclass
      }
      let validateData = []
      for (let key in self.requireddata) {
        let v = {}
        v[key] = postData[key]
        validateData.push(v)
      }
      console.log('validateData')
      console.log(validateData)
      let iscontinue = self.$util.validateQueue(validateData,
        model => {
          switch (model.key) {
            default:
              self.$vux.toast.text('必填项不能为空', 'middle')
          }
        }
      )
      let charReg = /^[A-Z]+$/
      if (!charReg.test(postData.shortcode) || postData.shortcode.length < 3) {
        self.$vux.toast.text('缩写码必需为三个大写字母', 'middle')
        return false
      }
      postData.shortcode = postData.shortcode.toUpperCase()
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
      let con = '确认添加该厂家吗？'
      if (self.fid) {
        con = '确认更新该厂家信息吗？'
        postData.id = self.fid
        if (!self.infoData.title || self.infoData.title !== '') {
          postData.title = postData.company
        }
      } else {
        postData.title = postData.company
      }
      if (this.serviceUser && this.serviceUser.uid) {
        postData.services = this.serviceUser.uid
      }
      self.$vux.confirm.show({
        content: con,
        onConfirm: () => {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/factory/add`, postData).then(function (res) {
            let data = res.data
            self.$vux.loading.hide()
            let error = data.flag ? '设置成功' : data.error
            let timeout = self.$util.delay(error)
            self.$vux.toast.show({
              text: error,
              type: data.flag ? 'success' : 'warn',
              time: timeout
            })
            if (data.flag === 1) {
              if (self.query.fromapp === 'factory') {
                jweixin.miniProgram.navigateTo({url: '/pages/own'})
              }
              console.log('= self.query.minibackurl =')
              console.log(self.query.minibackurl)
              setTimeout(() => {
                if (self.query.minibackurl) {
                  let minibackurl = decodeURIComponent(self.query.minibackurl)
                  if (self.query.backtype === 'relaunch') {
                    jweixin.miniProgram.reLaunch({url: `${minibackurl}`})
                  } else if (self.query.backtype === 'redirect') {
                    jweixin.miniProgram.redirectTo({url: `${minibackurl}`})
                  } else {
                    jweixin.miniProgram.navigateTo({url: `${minibackurl}`})
                  }
                } else if (self.query.backurl) {
                  let backurl = decodeURIComponent(self.query.backurl)
                  this.$router.push({path: backurl})
                } else {
                  self.$router.go(-1)
                }
              }, timeout)
            }
          })
        }
      })
    },
    saveCollect () {
      let iscontinue = true
      for (let key in this.collectData) {
        if (this.collectData[key] === '') {
          this.$vux.toast.text('请输入收款信息', 'middle')
          iscontinue = false
          return false
        }
      }
      if (!Reg.rPhone.test(this.collectData.mobile)) {
        this.$vux.toast.text('请输入正确的手机号', 'middle')
        iscontinue = false
        return false
      }
      if (!iscontinue) return false
      this.$vux.loading.show()
      let params = {...this.collectData, id: this.fid, shoukuanma: this.skmarr.join(',')}
      this.$http.post(`${ENV.BokaApi}/api/factory/add`, params).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        let error = data.flag ? '成功' : data.error
        this.$vux.toast.show({
          text: error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: this.$util.delay(error)
        })
      })
    },
    getData () {
      const self = this
      self.$vux.loading.show()
      if (self.fid) {
        self.$http.get(`${ENV.BokaApi}/api/factory/info`,
          { params: { fid: self.fid } }
        ).then((res) => {
          let data = res.data
          let retdata = data.data ? data.data : data
          console.log('in getData')
          console.log(retdata)
          self.infoData = retdata
          for (let key in self.collectData) {
            self.collectData[key] = self.infoData[key]
          }
          self.skmarr = []
          if (retdata.shoukuanma && self.$util.trim(retdata.shoukuanma) !== '') {
            self.skmarr.push(retdata.shoukuanma)
          }
          if (retdata.services && retdata.services !== '') {
            let suid = retdata.services.split(',')[0]
            for (let i = 0; i < retdata.services_data.length; i++) {
              if (suid === retdata.services_data[i].uid) {
                this.serviceUser = retdata.services_data[i]
              }
            }
          }
          self.photoarr = []
          if (retdata.photo && self.$util.trim(retdata.photo) !== '') {
            self.photoarr.push(retdata.photo)
          }
          self.qrcodearr = []
          if (retdata.publicqrcode && self.$util.trim(retdata.publicqrcode) !== '') {
            self.qrcodearr.push(retdata.publicqrcode)
          }
          for (let key in self.submitData) {
            self.submitData[key] = retdata[key]
          }

          if (retdata.shopmodel === '' || !retdata.shopmodel) {
            this.template1 = true
            this.submitData.shopmodel = '2'
          } else {
            if (retdata.shopmodel === '2') {
              this.template2 = true
            } else if (retdata.shopmodel === '3') {
              this.template3 = true
            } else {
              this.template1 = true
            }
          }
          if (self.disClassData) {
            return self.$http.get(`${ENV.BokaApi}/api/list/applyclass?ascdesc=asc`,
              { params: { limit: 100 } }
            )
          }
        }).then(function (res) {
          if (res) {
            let data = res.data
            data = data.data ? data.data : data
            self.classData = data
            self.productClass = []
            if (self.infoData.productclass && self.$util.trim(self.infoData.productclass) !== '') {
              let idarr = self.infoData.productclass.split(',')
              for (let i = 0; i < idarr.length; i++) {
                self.productClass.push(parseInt(idarr[i]))
              }
            }
          }
        })
      } else {
        this.template2 = true
        self.$http.get(`${ENV.BokaApi}/api/list/applyclass?ascdesc=asc`,
          { params: { limit: 100 } }
        ).then(function (res) {
          if (res) {
            let data = res.data
            data = data.data ? data.data : data
            self.classData = data
            self.productClass = []
          }
        })
      }
      self.$vux.loading.hide()
      self.$http.get(`${ENV.BokaApi}/api/factory/modulefield`,
        { params: {module: 'factory', field: 'trade'} }
      ).then(function (res) {
        if (res) {
          let data = res.data
          data = data.data ? data.data : data
          self.tradeData = data
        }
      })
    },
    init () {
    },
    initData () {
      const self = this
      self.submitData = { company: '', summary: '', shortcode: '', photo: '', superiorrate: '20', salesrate: '80', trade: 0, shopmodel: '2' }
      self.requireddata = { company: '' }
      self.disClassData = false
    },
    refresh () {
      const self = this
      this.$vux.loading.show()
      this.loginUser = User.get()
      self.query = self.$route.query
      self.initData()
      let ismanager = false
      for (let i = 0; i < this.loginUser.usergroup.length; i++) {
        if (this.loginUser.usergroup[i] === 1) {
          ismanager = true
          break
        }
      }
      if (ismanager) {
        self.disClassData = true
        self.requireddata.productclass = ''
      }
      let isEdit = false
      if (this.query.id) {
        isEdit = true
        this.fid = parseInt(this.query.id)
      } else if (this.query.fid) {
        isEdit = true
        this.fid = parseInt(this.query.fid)
      }
      if (ismanager || (isEdit && this.fid === this.loginUser.fid)) {
        self.showSos = false
        self.showContainer = true
        this.$vux.loading.hide()
        this.$http.post(`${ENV.BokaApi}/api/common/getBankNames`).then(res => {
          const data = res.data
          this.cardList = data.data ? data.data : data
          self.getData()
        })
      } else {
        this.$vux.loading.hide()
        self.showSos = true
        self.showContainer = false
      }
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    this.refresh()
  }
};
</script>

<style lang="less">
.photoitem{float:right !important;}
.weui-input{text-align:right;}
.weui-textarea{text-align:right;}
.profit-level{
  box-sizing: border-box;
  padding: 20px 10px 20px 10px;
  display: flex;
  span{
    flex: 0 0 80px;
  }
  input{
    padding-left: 10px;
    flex: 1;
    text-align:left;
  }
  .weui-cell:before{display:none;}
}
.addFactory{
  background-color:#EFF2F3;
  .fg{margin-top:5px;}
  .b-border{border-bottom:1px solid #e5e5e5;}
  .b-top{border-top:1px solid #e5e5e5;}
}
.addFactory .x-checker .ck-item{
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
.addFactory .vux-check-icon > span{color:#666;display: inline-block;vertical-align: bottom;line-height: 19px;}
</style>
