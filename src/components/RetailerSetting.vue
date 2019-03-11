<template>
  <div class="containerarea bg-white font14 retailersetting">
    <div class="pagetop">
      <tab v-model="selectedIndex" class="v-tab">
        <tab-item v-if="query.from == 'miniprogram'">卖家信息设置</tab-item>
        <tab-item
          v-else
          v-for="(item,index) in tabtxts"
          :selected="query.from == 'seller' && index == 1"
          :key="index">{{item}}</tab-item>
        <!--
        <tab-item
          v-else
          v-for="(item,index) in tabtxts"
          :selected="(!query.from && index == selectedIndex) || (query.from == 'seller' && index == 1) || (query.from == 'miniprogram' && query.from_type != 'activity' && index == 1) || (query.from == 'miniprogram' && query.from_type == 'activity' && index == 0)"
          :key="index">{{item}}</tab-item>
        -->
      </tab>
    </div>
    <div class="s-container" style="top:44px;">
      <form enctype="multipart/form-data">
        <input ref="fileInput" class="hide" type="file" name="files" @change="fileChange('qrcode','fileInput')" />
      </form>
      <form enctype="multipart/form-data">
        <input ref="fileInput1" class="hide" type="file" name="files" @change="fileChange('showphoto','fileInput1')" />
      </form>
      <swiper v-model="selectedIndex" class="x-swiper no-indicator">
        <swiper-item v-if="selectedIndex === 0">
          <div class="swiper-inner" style="bottom:50px;">
            <form>
              <forminputplate class="required">
                <span slot="title">{{ $t('Shop name') }}</span>
                <input v-model="submitdata.title" type="text" name="title" class="input border-box" :placeholder="$t('Shop name')" />
              </forminputplate>
              <div class="form-item required">
                <div class="pb5">{{ $t('Wechat qrcode') }} <span class="al al-xing color-red font12" style="vertical-align: 3px;"></span><span class="color-gray">({{ $t('Upload wechat qrcode') }})</span></div>
                <div>
                  <input v-model="submitdata.qrcode" type="hidden" name="qrcode" />
                  <div class="q_photolist align_left">
                    <template v-if="photoarr.length > 0">
                      <div v-for="(item,index) in photoarr" :key="index" class="photoitem">
                        <div class="inner photo imgcover" :photo="item" :style="`background-image: url('${item}');`">
                          <div class="close" @click="deletephoto(item,index,'qrcode')">×</div>
                          <div class="clip"><i class="al al-set"></i></div>
                        </div>
                      </div>
                    </template>
                    <div v-if="photoarr.length < maxnum" class="photoitem add" @click="uploadPhoto('fileInput','qrcode')">
                      <div class="inner">
                        <div class="innerlist">
                          <div class="flex_center h_100">
                            <div class="txt">
                              <i class="al al-zhaopian" style="color:#c6c5c5;line-height:30px;"></i>
                              <div>点击上传</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="font12 color-blue3 mt5" @click="disqrcode">{{ $t('Upload qrcode text') }}</div>
                </div>
              </div>
              <forminputplate class="required" v-if="query.from != 'miniprogram'">
                <span slot="title">{{ $t('Pay type') }}</span>
                <div>
                  <!-- <check-icon class="red-check" :value.sync="submitdata.buyonline === 1" @click.native.stop="setbuyonline(1)">在线支付</check-icon>
                  <check-icon class="red-check" :value.sync="submitdata.buyonline !== 1" @click.native.stop="setbuyonline(0)">线下支付</check-icon> -->
                  <check-icon class="red-check" :value.sync="online" @click.native.stop="setbuyonline(1)">在线支付</check-icon>
                  <check-icon class="red-check" :value.sync="offline" @click.native.stop="setbuyonline(0)">线下支付</check-icon>
                </div>
              </forminputplate>
              <forminputplate class="required">
                <span slot="title">超值优惠</span>
                <div>
                  <!-- <check-icon class="red-check" :value.sync="suggestOpen" @click.native.stop="clickSuggest(1)">开启</check-icon>
                  <check-icon class="red-check" :value.sync="suggestClose" @click.native.stop="clickSuggest(0)">关闭</check-icon> -->
                  <check-icon class="red-check" :value.sync="suggestOpen" @click.native.stop="clickSuggest(1)">开启</check-icon>
                  <check-icon class="red-check" :value.sync="suggestClose" @click.native.stop="clickSuggest(0)">关闭</check-icon>
                </div>
              </forminputplate>
              <div v-show="showmore">
                <forminputplate>
                  <span slot="title">{{ $t('Shop description') }}</span>
                  <group class="textarea-outer" style="padding:0;">
                    <x-textarea
                      name="text1"
                      ref="contentTextarea"
                      v-model="submitdata.content"
                      style="padding:5px;"
                      class="x-textarea noborder"
                      :placeholder="$t('Shop description')"
                      :show-counter="false"
                      :rows="1"
                      @on-change="textareaChange('contentTextarea')"
                      @on-focus="textareaFocus('contentTextarea')"
                      autosize>
                    </x-textarea>
                  </group>
                </forminputplate>
                <forminputplate v-if="query.from != 'miniprogram'">
                  <span slot="title">{{ $t('Auto reply') }}</span>
                  <group class="textarea-outer" style="padding:0;">
                    <x-textarea
                      name="text2"
                      ref="fastreplyTextarea"
                      v-model="submitdata.fastreply"
                      style="padding:5px;"
                      class="x-textarea noborder"
                      :placeholder="$t('Auto reply')"
                      :show-counter="false"
                      :rows="1"
                      @on-change="textareaChange('fastreplyTextarea')"
                      @on-focus="textareaFocus('fastreplyTextarea')"
                      autosize>
                    </x-textarea>
                  </group>
                </forminputplate>
                <div class="form-item required padding10" v-if="classData.length > 0"> <!-- //v-if="classData.length > 0 && classDataShow" -->
                  <input v-model="productClass" type="hidden" name="productclass" />
                  <div class="pb10">经营产品或服务<span class="color-gray">(最多三项)</span><span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
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
              </div>
              <div v-if="showmore" @click="expandevent" class="padding15 font14 align_center color-gray">{{ $t('Up text') }}<i class="al al-jiantou2-up font14 middle-cell"></i></div>
              <div v-else class="padding15 font14 align_center color-gray"  @click="expandevent">{{ $t('Epand text') }}<i class="al al-jiantouyoushuang- font14"></i></div>
            </form>
          </div>
          <div class="s-bottom flex_center pl12 pr12 list-shadow02 bg-white" @click="submitevent">
            <div class="flex_cell flex_center btn-bottom-red">{{ $t('Save') }}</div>
          </div>
        </swiper-item>
        <swiper-item v-if="selectedIndex === 1 && query.from != 'miniprogram'">
          <div class="swiper-inner" style="bottom:50px;">
            <form>
              <div class="form-item required">
                <div class="pb5">{{ $t('Personal image') }} <span class="al al-xing color-red font12" style="vertical-align: 3px;"></span></div>
                <div>
                  <div class="q_photolist align_left">
                    <template v-if="showphotoArr.length > 0">
                      <div v-for="(item,index) in showphotoArr" :key="index" class="photoitem">
                        <div class="inner photo imgcover" :photo="item" :style="`background-image: url('${item}');`">
                          <div class="close" @click="deletephoto(item,index,'showphoto')">×</div>
                          <div class="clip"><i class="al al-set"></i></div>
                        </div>
                      </div>
                    </template>
                    <div v-if="showphotoArr.length < maxnum1" class="photoitem add" @click="uploadPhoto('fileInput1','showphoto')">
                      <div class="inner">
                        <div class="innerlist">
                          <div class="flex_center h_100">
                            <div class="txt">
                              <i class="al al-zhaopian" style="color:#c6c5c5;line-height:30px;"></i>
                              <div><span class="havenum">{{ showphotoArr.length }}</span><span class="ml5 mr5">/</span><span class="maxnum">{{ maxnum1 }}</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <forminputplate>
                <span slot="title">{{ $t('Seller said') }} <span class="al al-xing color-red font12" style="vertical-align: 3px;"></span></span>
                <group class="textarea-outer" style="padding:0;">
                  <x-textarea
                    ref="sloganTextarea"
                    v-model="submitdata1.slogan"
                    style="padding:5px;"
                    class="x-textarea noborder"
                    :placeholder="$t('Seller said')"
                    :show-counter="false"
                    :rows="1"
                    @on-change="textareaChange('sloganTextarea')"
                    @on-focus="textareaFocus('sloganTextarea')"
                    :autosize="true">
                  </x-textarea>
                </group>
              </forminputplate>
              <div class="form-item bg-white">
                <div class="pt10 pb5">
                  <div class="flex_left">
                    <span class="v_middle">{{ $t('My tags') }}</span>
                    <span class="font12 color-gray v_middle">(一次可添加多个标签，用英文逗号隔开)</span>
                  </div>
                </div>
                <div class="taglist">
                  <div class="tagitem" v-for="(item,index) in retailerInfo.tags">
                    <div class="inner">
                      <span class="v_middle">{{item.title}}</span>
                      <div class="del" @click="deleteTag(item,index)">×</div>
                      <div class="edit" @click="addTag(item,index)"><i class="al al-bianji1 font14"></i></div>
                    </div>
                  </div>
                  <div class="tagitem add" @click="addTag">
                    <div class="inner">添加</div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="s-bottom flex_center pl12 pr12 list-shadow02 bg-white" @click="submitevent1">
            <div class="flex_cell flex_center btn-bottom-red">{{ $t('Save') }}</div>
          </div>
        </swiper-item>
      </swiper>
    </div>
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
              <div>聚客365卖家需按订单交易额（含运费）的1%承担交易手续费，最低收费金额0.01元，不足0.01元按照0.01元收取。</div>
              <div class="bold mt5">退款订单处理规则：</div>
              <div>（1）当订单为“待发货”状态时，买家可主动发起交易退款，聚客365将整单全额退款，不收取手续费。</div>
              <div>（2）当订单为“已发货或已收货”状态时，线上无法申请及处理交易退款，买家可通过“申请维权”与卖家互加好友，线下协商解决，手续费不予退还。</div>
              <div class="bold mt5">第四条 交易规则</div>
              <div>（1）除买卖双方协商一致的，聚客365平台卖家需在买家付款后的72小时内操作发货。</div>
              <div>（2）卖家应当将商品通过物流配送至买家订单收货地址，并由收件人本人签收，需买家至指定地点提取的，应当事先予以显著明示或征得买家同意。</div>
              <div>（3）卖家优先选择有签收凭证的物流公司发货，若买卖双方使用当面交易交付货物，交易风险由买卖双方自行承担。</div>
              <div>（4）卖家违反发货规范导致买家未收到商品或拒收商品的，由此产生的相关费用及商品损毁或灭失风险，由卖家自行承担。</div>
              <div class="bold mt5">第五条 交易纠纷</div>
              <div>聚客365平台仅提供商品展示，不做任何担保交易，买卖双方在交易过程中出现的任何问题，由买卖双方协商解决。</div>
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
              <div>聚客365平台仅提供商品展示，不做任何担保交易，买卖双方在交易过程中出现的任何问题，由买卖双方协商解决。</div>
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
                  <img class="v_middle" style="max-width:80%;" src="https://tossharingsales.boka.cn/images/saveqrcode.png" />
                </div>
                <div class="align_center mt5">
                  <img class="v_middle" style="max-width:80%;" src="https://tossharingsales.boka.cn/images/saveqrcode1.png" />
                </div>
                <div class="align_center mt5">
                  <img class="v_middle" style="max-width:80%;" src="https://tossharingsales.boka.cn/images/saveqrcode3.png" />
                </div>
                <div class="align_center mt5">
                  <img class="v_middle" style="max-width:80%;" src="https://tossharingsales.boka.cn/images/saveqrcode2.png" />
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
import { Tab, TabItem, Swiper, SwiperItem, Group, XTextarea, XInput, TransferDom, Popup, CheckIcon, Checker, CheckerItem } from 'vux'
import Forminputplate from '@/components/Forminputplate'
import ENV from 'env'

export default {
  name: 'RetailerSetting',
  props: {
    classData: {
      type: Array,
      default: []
    },
    query: {
      type: Object,
      default: {}
    },
    loginUser: {
      type: Object,
      default: {}
    },
    retailerInfo: {
      type: Object,
      default: {}
    },
    submitdata: {
      type: Object,
      default: { title: '', qrcode: '', buyonline: 1, content: '', fastreply: '你好，请稍等，一会为你服务' }
    },
    submitdata1: {
      type: Object,
      default: { showphoto: '', slogan: '', tags: '' }
    },
    photoarr: {
      type: Array,
      default: []
    },
    showphotoArr: {
      type: Array,
      default: []
    },
    productClass: {
      type: Array,
      default: []
    },
    buyonline: {
      type: Boolean,
      default: true
    },
    buyoffline: {
      type: Boolean,
      default: false
    },
    submitSuggest: {
      type: Boolean,
      default: true
    }
  },
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, Group, XTextarea, XInput, Popup, CheckIcon, Forminputplate, Checker, CheckerItem
  },
  data () {
    return {
      maxnum: 1,
      maxnum1: 9,
      showmore: false,
      requireddata: {title: '', 'qrcode': ''},
      requireddata1: {showphoto: '', slogan: ''},
      showonline: false,
      showoffline: false,
      showqrcode: false,
      selectedIndex: 0,
      tabtxts: [ '基本设置', '卖家秀设置' ],
      classDataShow: false,
      online: true,
      offline: false,
      isFirst: true,
      isFirst1: true,
      suggestOpen: true,
      suggestClose: false,
      isFirst2: true,
      isFirst3: true
    }
  },
  watch: {
    photoarr: function () {
      return this.photoarr
    },
    submitdata: function () {
      console.log('in watch sumitdata')
      if (this.submitdata.buyonline) {
        this.online = true
        this.offline = false
      } else {
        this.online = false
        this.offline = true
      }
      return this.submitdata
    },
    buyonline: function () {
      if (this.isFirst) {
        this.online = this.buyonline
        this.isFirst = false
      }
      return this.buyonline
    },
    buyoffline: function () {
      if (this.isFirst1) {
        this.offline = this.buyoffline
        this.isFirst1 = false
      }
      return this.buyoffline
    },
    submitSuggest: function () {
      console.log('in watch submitSuggest')
      if (this.submitSuggest) {
        this.suggestOpen = true
        this.suggestClose = false
      } else {
        this.suggestOpen = false
        this.suggestClose = true
      }
      return this.submitSuggest
    }
  },
  methods: {
    textareaChange (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    textareaFocus (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    expandevent () {
      this.showmore = !this.showmore
    },
    photoCallback (data, type) {
      const self = this
      if (data.flag === 1) {
        if (type === 'qrcode') {
          self.photoarr.push(data.data)
          self.submitdata.qrcode = self.photoarr.join(',')
        } else if (type === 'showphoto') {
          self.showphotoArr.push(data.data)
          self.submitdata1.showphoto = self.showphotoArr.join(',')
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
        let curmax = 1
        if (type === 'showphoto') {
          curmax = 9 - self.showphotoArr.length
        }
        self.$wechat.ready(function () {
          self.$util.wxUploadImage({
            maxnum: curmax,
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
      let files = target.files
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
    deletephoto (item, index, type) {
      if (type === 'qrcode') {
        this.photoarr.splice(index, 1)
        this.submitdata.qrcode = this.photoarr.join(',')
      } else if (type === 'showphoto') {
        this.showphotoArr.splice(index, 1)
        this.submitdata1.showphoto = this.showphotoArr.join(',')
      }
    },
    setbuyonline (val) {
      if (val === 1) {
        this.showonline = true
        this.submitdata.buyonline = 1
        // this.buyonline = true
        // this.buyoffline = false
        this.online = true
        this.offline = false
      } else {
        this.showoffline = true
        this.submitdata.buyonline = 0
        // this.buyonline = false
        // this.buyoffline = true
        this.online = false
        this.offline = true
      }
    },
    clickSuggest (val) {
      console.log(val)
      let con = (val === 1 ? '确认要展示超值优惠商品？' : '确认要取消展示超值优惠商品？')
      if (val === 1) {
        this.suggestOpen = true
        this.suggestClose = false
      } else {
        this.suggestOpen = false
        this.suggestClose = true
      }
      this.$vux.confirm.show({
        content: con,
        onCancel: () => {
          if (val === 1) {
            this.suggestOpen = false
            this.suggestClose = true
          } else {
            this.suggestOpen = true
            this.suggestClose = false
          }
        },
        onConfirm: () => {
          this.$emit('clickSuggest', val)
        }
      })
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
      self.submitdata.productclass = self.productClass
      let validateData = []
      for (let key in self.requireddata) {
        let v = {}
        v[key] = self.submitdata[key] ? self.submitdata[key] : ''
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
              if (self.query.minibackurl) {
                let minibackurl = decodeURIComponent(self.query.minibackurl)
                if (self.query.backtype === 'relaunch') {
                  self.$wechat.miniProgram.reLaunch({url: `${minibackurl}`})
                } else if (self.query.backtype === 'redirect') {
                  self.$wechat.miniProgram.redirectTo({url: `${minibackurl}`})
                } else {
                  self.$wechat.miniProgram.navigateTo({url: `${minibackurl}`})
                }
              } else {
                self.$router.push('/centerSales')
              }
            }
          }
        })
      })
    },
    submitevent1 () {
      const self = this
      let validateData = []
      for (let key in self.requireddata1) {
        let v = {}
        v[key] = self.submitdata1[key] ? self.submitdata1[key] : ''
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
      self.$http.post(`${ENV.BokaApi}/api/retailer/changeInfo`, self.submitdata1).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              if (self.query.minibackurl) {
                let minibackurl = decodeURIComponent(self.query.minibackurl)
                if (self.query.backtype === 'relaunch') {
                  self.$wechat.miniProgram.reLaunch({url: `${minibackurl}`})
                } else if (self.query.backtype === 'redirect') {
                  self.$wechat.miniProgram.redirectTo({url: `${minibackurl}`})
                } else {
                  self.$wechat.miniProgram.navigateTo({url: `${minibackurl}`})
                }
              } else {
                self.$router.push({path: '/centerSeller', query: {uid: self.loginUser.uid}})
              }
            }
          }
        })
      })
    },
    addTag (item, index) {
      const self = this
      let type = 'add'
      let inputVal = ''
      let postParams = { action: 'add' }
      if (item && item.id) {
        type = 'edit'
        inputVal = item.title
        postParams.action = 'edit'
        postParams.id = item.id
      }
      self.$vux.confirm.prompt(inputVal, {
        title: '请输入标签名称',
        onShow () {
          self.$vux.confirm.setInputValue(inputVal)
        },
        onConfirm (val) {
          if (self.$util.trim(val) === '') {
            self.$vux.toast.text('标签名称不能为空', 'middle')
            return false
          }
          let isContinue = true
          if (val.search(/,/g) > -1) {
            let arr = val.split(',')
            for (let i = 0; i < arr.length; i++) {
              if (self.$util.trim(arr[i]) === '') {
                isContinue = false
                break
              }
            }
          }
          if (isContinue) {
            if (val.search(/，/g) > -1) {
              let arr = val.split('，')
              for (let i = 0; i < arr.length; i++) {
                if (self.$util.trim(arr[i]) === '') {
                  isContinue = false
                  break
                }
              }
            }
          }
          if (!isContinue) {
            self.$vux.toast.text('标签名称不能为空', 'middle')
            return false
          }
          postParams.tags = val
          self.$http.post(`${ENV.BokaApi}/api/retailer/tags`, postParams).then(function (res) {
            let data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: self.$util.delay(data.error),
              onHide: function () {
                if (data.flag === 1) {
                  if (type === 'add') {
                    self.retailerInfo.tags = data.data
                  } else if (type === 'edit') {
                    self.retailerInfo.tags[index].title = val
                  }
                }
              }
            })
          })
        }
      })
    },
    deleteTag (item, index) {
      const self = this
      self.$vux.confirm.show({
        title: '确定要删除该标签吗？',
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/retailer/tags`, {
            action: 'delete', id: item.id
          }).then(function (res) {
            let data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: self.$util.delay(data.error),
              onHide: function () {
                if (data.flag === 1) {
                  self.retailerInfo.tags.splice(index, 1)
                }
              }
            })
          })
        }
      })
    }
  },
  mounted () {
    console.log('in mounted')
    if (this.submitSuggest) {
      this.suggestOpen = true
      this.suggestClose = false
    } else {
      this.suggestOpen = false
      this.suggestClose = true
    }
  }
}
</script>

<style lang="less">
.retailersetting{
  .title-cell{width:80px;}
}
.retailersetting .x-checker .ck-item{
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
.retailersetting .x-checker .border1px.ck-item-selected:after{border:1px solid #ea3a3a;}
.retailersetting .form-item{position:relative;padding:10px;}
.retailersetting .form-item:after{
  content:"";display:block;
	background-color:@list-border-color;height:1px;overflow:hidden;
	position: absolute;left: 0;right: 0;bottom:1px;
	-webkit-transform: scaleY(0.5) translateY(0.5px);
	transform: scaleY(0.5) translateY(0.5px);
	-webkit-transform-origin: 0% 0%;
	transform-origin: 0% 0%;
}
.retailersetting .s-havebottom .s-container{bottom:50px;}
.retailersetting .s-bottom{height:50px;}

.retailersetting .taglist{}
.retailersetting .taglist .tagitem{
  padding:5px 10px;box-sizing: border-box;display: inline-block;
}
.retailersetting .taglist .tagitem.add .inner{
  border-color:rgb(229, 28, 35);color:rgb(229, 28, 35);
}
.retailersetting .taglist .tagitem .inner{
  position:relative;
  font-size:13px;
  padding: 0 15px;height: 30px;line-height: 30px;
  text-align: center;
  border-radius: 3px;background-color: #fff;box-sizing: border-box;
  border:1px solid #ddd;color:#999;
}
.retailersetting .taglist .tagitem .del{
	position:absolute;top:-8px;right:-8px;
	width:20px;height:20px;border-radius:50%;background-color:rgba(229, 28, 35,0.8);color:#fff;
	display:flex;justify-content: center;align-items: center;
}
.retailersetting .taglist .tagitem .edit{
	position:absolute;top:-8px;left:-8px;
	width:20px;height:20px;border-radius:50%;background-color:rgba(229, 28, 35,0.8);color:#fff;
	display:flex;justify-content: center;align-items: center;
}
</style>
