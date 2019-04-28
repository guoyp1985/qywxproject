<template>
  <div class="containerarea s-havebottom bg-white font14 addActivity">
    <subscribe v-if="showSubscribe"></subscribe>
    <apply-tip v-if="showApply"></apply-tip>
    <template v-if="showContainer">
      <div class="s-container">
        <form class="addForm">
          <div class="form-item required">
            <div class="t-table">
              <div class="t-cell title-cell font14 v_middle w80">
                <span>{{ $t('Activity product') }}</span><span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span>
              </div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <template v-if="showProductArea">
                  <div v-if="showselectproduct && !query.id" class="qbtn flex_center color-orange" style="border:orange 1px solid;width:100%;line-height:1;padding:4px 0;" @click="selectevent">
                    <span class="mr5 v_middle db-in" style="margin-top:-3px;">+</span><span class="v_middle db-in">{{ $t('Select product') }}</span>
                  </div>
                  <div v-if="showproductitem || query.id" class="scroll_item border db">
                    <div class="t-table">
                      <div class="t-cell v_middle" style="width:50px;">
                        <img class="v_middle imgcover" style="width:40px;height:40px;" :src="selectproduct.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                      </div>
                      <div class="t-cell v_middle">
                        <div class="clamp1">{{ selectproduct.title }}</div>
                        <div class="mt5 font12 clamp1"><span class="color-orange">{{ $t('RMB') }}{{ selectproduct.price }}</span><span class="ml10 color-gray">{{ $t('Storage') }}{{ selectproduct.storage }}</span></div>
                      </div>
                      <div class="t-cell align_center v_middle" style="width:60px;" v-if="!query.id">
                        <div class="qbtn color-red btnchange" style="border:#ff3b30 1px solid;line-height:1;" @click="selectevent">修改</div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div class="form-item required">
            <div class="t-table">
              <div class="t-cell title-cell font14 v_middle w80">
                <span>{{ $t('Starttime') }}</span><span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span>
              </div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <group class="x-datetime">
                  <datetime format="YYYY-MM-DD HH:mm" v-model='submitdata.starttime' :show.sync="visibility1" @on-change="datechange1" @on-cancel="datecancel1" @on-confirm="dateconfirm1"></datetime>
                </group>
                <div @click="showxdate1" class='font14 color-gray align_left' style="position:absolute;left:0;right:0;top:0;height:22px;background-color:transparent;z-index:10;">{{ selectdatetxt1 }}</div>
              </div>
            </div>
          </div>
          <div class="form-item required">
            <div class="t-table">
              <div class="t-cell title-cell font14 v_middle w80">
                <span>{{ $t('Endtime') }}</span><span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span>
              </div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <group class="x-datetime">
                  <datetime format="YYYY-MM-DD HH:mm" v-model='submitdata.endtime' :show.sync="visibility2" @on-change="datechange2" @on-cancel="datecancel2" @on-confirm="dateconfirm2"></datetime>
                </group>
                <div @click="showxdate2" class='font14 color-gray align_left' style="position:absolute;left:0;right:0;top:0;height:22px;background-color:transparent;z-index:10;">{{ selectdatetxt2 }}</div>
              </div>
            </div>
          </div>
          <div class="bg-gray6 font16 b_bottom_after padding10" style="padding:10px;">活动设置</div>
          <template v-if="activityType == 'groupbuy'">
            <form-groupbuy :submitdata="submitdata"></form-groupbuy>
          </template>
          <template v-if="activityType == 'bargainbuy'">
            <form-bargainbuy ref="formBargainbuy" :data="selectproduct" :submitdata="submitdata"></form-bargainbuy>
          </template>
          <template v-if="activityType == 'discount'">
            <form-discount :submitdata="submitdata"></form-discount>
          </template>
        </form>
      </div>
      <div class="s-bottom pl20 pr20 border-box flex_center color-white list-shadow02">
        <div class="flex_cell flex_center color-white btn-bottom-orange" @click="saveevent">{{ $t('Go to create') }}</div>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showpopup" height="100%">
          <div class="popup1">
            <div class="popup-top flex_center">{{ $t('Select product') }}</div>
            <div ref="scrollProduct" @scroll="handleScroll('scrollProduct')" class="popup-middle">
              <search
                class="x-search"
                v-model="searchword"
                :auto-fixed="autofixed"
                @on-submit="onSubmit"
                @on-change="onChange"
                @on-cancel="onCancel"
                ref="search">
              </search>
              <div class="scroll_list">
                <div v-if="!productdata || !productdata.length" class="scroll_item padding10 color-gray align_center">
                  <template v-if="searchresult">
                    <div class="flex_center" style="height:80px;">暂无搜索结果</div>
                  </template>
                  <template v-else>
                    <div class="flex_center" style="height:80px;">暂无商品</div>
                  </template>
                </div>
                <template v-else>
                  <check-icon class="x-check-icon scroll_item" v-for="(item,index) in productdata" :key="item.id" :value.sync="item.checked" @click.native.stop="radioclick(item,index)">
                    <div class="t-table">
                      <div class="t-cell pic v_middle w50">
                        <img class="v_middle imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" style="width:40px;height:40px;" />
                      </div>
                      <div class="t-cell v_middle" style="color:inherit;">
                        <div class="clamp1">{{item.title}}</div>
                        <div class="font12 clamp1"><span class="color-orange">¥{{ item.price }}</span><span class="ml10 color-gray">{{ $t('Storage') }} {{ item.storage }}</span></div>
                        <div class="font12 clamp1 color-orange" v-if="item.allowcard">允许使用优惠券</div>
                        <div class="font12 clamp1 color-orange" v-if="item.fid">厂家佣金: ¥{{ item.rebatein }}</div>
                      </div>
                    </div>
                  </check-icon>
                </template>
              </div>
            </div>
            <div class="popup-bottom flex_center">
              <div class="flex_cell bg-gray color-white h_100 flex_center" @click="closepopup">{{ $t('Close') }}</div>
              <div class="flex_cell bg-green color-white h_100 flex_center" @click="confirmpopup">{{ $t('Confirm txt') }}</div>
            </div>
          </div>
        </popup>
      </div>
      <template v-if="showFirst">
        <firstTip @submitFirstTip="submitFirstTip">
          <div class="font15 bold txt">
            <div class="flex_center" v-if="query.type == 'groupbuy'">创建团购活动都可促进用户购买哦</div>
            <div class="flex_center" v-if="query.type == 'bargainbuy'">创建砍价活动都可促进用户购买哦</div>
          </div>
        </firstTip>
      </template>
      <template v-if="showHb">
        <firstHb :action="action" @closeFirstHb="closeFirstHb"></firstHb>
      </template>
    </template>
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
import { Group, XInput, TransferDom, Popup, Datetime, Search, CheckIcon, XImg } from 'vux'
import FormGroupbuy from '@/components/FormGroupbuy'
import FormBargainbuy from '@/components/FormBargainbuy'
import FormDiscount from '@/components/FormDiscount'
import Sos from '@/components/Sos'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'
import FirstTip from '@/components/FirstTip'
import FirstHb from '@/components/FirstHb'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group, XInput, Popup, Datetime, Search, CheckIcon, FormGroupbuy, FormBargainbuy, FormDiscount, XImg, Sos, Subscribe, ApplyTip, FirstTip, FirstHb
  },
  data () {
    return {
      showApply: false,
      showContainer: false,
      autofixed: false,
      query: {},
      loginUser: {},
      activityType: null,
      allowsubmit: true,
      showselectproduct: true,
      showproductitem: false,
      selectproduct: {},
      selectpopupdata: null,
      showpopup: false,
      productdata: [],
      radiodata: [],
      visibility1: false,
      visibility2: false,
      selectdatetxt1: '选择开始时间',
      selectdatetxt2: '选择结束时间',
      submitdata: {},
      requireddata: {},
      searchword: '',
      searchresult: false,
      limit: 20,
      pagestart1: 0,
      selectProductIndex: -1,
      showProductArea: false,
      showSubscribe: false,
      showFirst: false,
      isFirst: false,
      showHb: false,
      newData: {},
      action: ''
    }
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
    },
    selectproduct: function () {
      return this.selectproduct
    }
  },
  computed: {
  },
  methods: {
    initData () {
      this.allowsubmit = true
      this.showselectproduct = true
      this.showproductitem = false
      this.selectproduct = {}
      this.selectpopupdata = null
      this.showpopup = false
      this.productdata = []
      this.radiodata = []
      this.visibility1 = false
      this.visibility2 = false
      this.selectdatetxt1 = '选择开始时间'
      this.selectdatetxt2 = '选择结束时间'
      this.submitdata = {}
      this.requireddata = {}
      this.searchword = ''
      this.searchresult = false
      this.pagestart1 = 0
      this.showContainer = false
      this.showApply = false
      this.showFirst = false
      this.isFirst = false
      this.showHb = false
      this.newData = {}
      this.action = ''
    },
    submitFirstTip () {
      this.showFirst = false
    },
    closeFirstHb () {
      this.isFirst = false
      this.showHb = false
      this.afterSave(this.newData)
    },
    dateformat (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    },
    radioclick (data, index) {
      const self = this
      if (data.checked) {
        self.selectpopupdata = data
        self.selectProductIndex = index
      } else {
        self.selectpopupdata = null
        self.selectProductIndex = -1
      }
      for (let d of self.productdata) {
        if (d.id !== data.id && d.checked) {
          delete d.checked
          break
        }
      }
    },
    radiochange (val) {
      this.checkeduid = val
    },
    afterSelectProduct () {
      const self = this
      self.selectproduct = self.selectpopupdata
      self.submitdata.productid = self.selectproduct.id
      self.showpopup = false
      self.showselectproduct = false
      self.showproductitem = true
    },
    confirmpopup () {
      const self = this
      if (!this.selectpopupdata || !this.selectpopupdata.id) {
        self.$vux.alert.show({
          title: '',
          content: '请选择商品'
        })
        return false
      }
      if (this.selectpopupdata.allowcard) {
        self.$vux.confirm.show({
          content: '该商品是可使用优惠券的商品，继续选择该商品将会导致两种优惠叠加使用',
          confirmText: '继续创建',
          cancelText: '停用优惠券',
          onCancel: () => {
            self.$vux.loading.show()
            self.$http.post(`${ENV.BokaApi}/api/setModulePara/product`, {
              module: 'product', id: self.selectpopupdata.id, param: 'allowcard', paramvalue: 0
            }).then(function (res) {
              self.$vux.loading.hide()
              self.selectpopupdata.allowcard = 0
              self.productdata[self.selectProductIndex].allowcard = 0
              self.afterSelectProduct()
            })
          },
          onConfirm: () => {
            self.afterSelectProduct()
          }
        })
      } else {
        self.afterSelectProduct()
      }
    },
    onChange (val) {
      this.searchword = val
    },
    onCancel () {
      const self = this
      self.searchword = ''
      self.$vux.loading.show()
      self.productdata = []
      self.pagestart1 = 0
      self.getProductData()
    },
    onSubmit () {
      const self = this
      self.$vux.loading.show()
      self.productdata = []
      self.pagestart1 = 0
      self.getProductData()
    },
    handleScroll (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      this.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          if (self.productdata.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getProductData()
          }
        }
      })
    },
    getProductData () {
      const self = this
      let params = { params: { from: 'activity', pagestart: self.pagestart1, limit: self.limit } }
      let keyword = self.searchword
      if (typeof keyword !== 'undefined' && self.$util.trim(keyword) !== '') {
        params.params.keyword = keyword
      }
      self.$http.get(`${ENV.BokaApi}/api/list/product`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        if (typeof keyword !== 'undefined' && self.$util.trim(keyword) !== '') {
          self.searchresult = true
        } else {
          self.searchresult = false
        }
        let retdata = data.data ? data.data : data
        self.productdata = self.productdata.concat(retdata)
      })
    },
    selectevent () {
      const self = this
      self.showpopup = true
      if (self.productdata.length === 0) {
        self.getProductData()
      }
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
    afterSave (data) {
      const self = this
      if (self.query.minibackurl) {
        let minibackurl = decodeURIComponent(self.query.minibackurl)
        if (minibackurl.indexOf('?') > -1) {
          minibackurl = `${minibackurl}&id=${data.data}&type=${self.query.type}&productid=${self.submitdata.productid}`
        } else {
          minibackurl = `${minibackurl}?id=${data.data}&type=${self.query.type}&productid=${self.submitdata.productid}`
        }
        self.$wechat.miniProgram.redirectTo({url: `${minibackurl}`})
      } else if (self.query.from) {
        if (self.activityType === 'groupbuy') {
          self.$wechat.miniProgram.redirectTo({url: `${ENV.MiniRouter.product}?id=${self.submitdata.productid}&wid=${self.loginUser.uid}`})
        } else {
          self.$wechat.miniProgram.redirectTo({url: `${ENV.MiniRouter.activity}?id=${data.data}`})
        }
      } else {
        if (self.query.id) {
          if (self.activityType === 'groupbuy') {
            self.$router.push({path: '/product', query: {id: self.query.id, wid: self.loginUser.uid}})
          } else {
            self.$router.push({path: '/activity', query: {id: data.data}})
          }
        } else {
          self.$router.push({path: '/retailerActivitylist', query: {add: 1}})
        }
        if (self.query.type === 'bargainbuy') {
          self.$refs.formBargainbuy.minprice = ''
          self.$refs.formBargainbuy.everymin = ''
          self.$refs.formBargainbuy.everymax = ''
        }
      }
    },
    saveAjax () {
      const self = this
      self.$http.post(`${ENV.BokaApi}/api/retailer/addActivity`, self.submitdata).then((res) => {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: self.$util.delay(data.error),
          onHide: () => {
            if (data.flag === 1) {
              if (this.isFirst) {
                this.showHb = true
                this.newData = data
              } else {
                this.afterSave(data)
              }
            }
          }
        })
      })
    },
    saveData () {
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
      const priceval = parseFloat(self.selectproduct.price.replace(/,/g, ''))
      const storage = parseInt(self.selectproduct.storage)
      if (self.activityType === 'bargainbuy') {
        let minprice = parseFloat(self.submitdata.param_minprice)
        let minval = parseFloat(self.submitdata.param_everymin)
        let maxval = parseFloat(self.submitdata.param_everymax)
        let finishtime = parseInt(self.submitdata.param_finishtime)
        if (isNaN(self.submitdata.param_minprice) || isNaN(self.submitdata.param_finishtime) || isNaN(self.submitdata.param_everymin) || isNaN(self.submitdata.param_everymax)) {
          self.$vux.toast.show({
            text: '请输入正确的数字',
            type: 'warn',
            time: 1500
          })
          return false
        }
        if (isNaN(self.submitdata.param_minprice) || minprice < 0) {
          self.$vux.toast.show({
            text: '请输入正确的活动价格',
            type: 'warn',
            time: 1500
          })
          return false
        }
        if (minprice >= priceval) {
          self.$vux.toast.show({
            text: '活动价格应低于原价',
            type: 'warn',
            time: 1500
          })
          return false
        }
        if (self.selectproduct.fid > 0) {
          let minprice1 = (priceval - parseFloat(self.selectproduct.rebatein)).toFixed(2)
          if (minprice < minprice1) {
            self.$vux.toast.show({
              text: `活动价格不能低于${minprice1}`,
              type: 'warn',
              time: 1500
            })
            return false
          }
        }
        if (isNaN(self.submitdata.param_finishtime) || finishtime <= 0) {
          self.$vux.toast.show({
            text: '请输入正确的砍价周期',
            type: 'warn',
            time: 1500
          })
          return false
        }
        if (minval > priceval || maxval > priceval) {
          self.$vux.toast.show({
            text: '可砍金额不能大于活动价格',
            type: 'warn',
            time: 2000
          })
          return false
        }
      } else if (self.activityType === 'groupbuy') {
        let groupprice = parseFloat(self.submitdata.param_groupprice)
        let numbers = parseInt(self.submitdata.param_numbers)
        let everybuy = parseInt(self.submitdata.param_everybuy)
        let finishtime = parseFloat(self.submitdata.param_finishtime)
        if (isNaN(self.submitdata.param_groupprice) || isNaN(self.submitdata.param_numbers) || isNaN(self.submitdata.param_everybuy) || isNaN(self.submitdata.param_finishtime)) {
          self.$vux.toast.show({
            text: '请输入正确的数字',
            type: 'warn',
            time: 1500
          })
          return false
        }
        if (isNaN(self.submitdata.param_groupprice) || groupprice <= 0) {
          self.$vux.toast.show({
            text: '请输入正确的团购价格',
            type: 'warn',
            time: 1500
          })
          return false
        }
        if (groupprice > priceval) {
          self.$vux.toast.show({
            text: '团购价不能大于原价',
            type: 'warn',
            time: 1500
          })
          return false
        }
        if (self.selectproduct.fid > 0) {
          let minprice = (priceval - parseFloat(self.selectproduct.rebatein)).toFixed(2)
          console.log('in fid > 0')
          console.log(`grouprice=${groupprice}`)
          console.log(`minprice=${minprice}`)
          if (groupprice < minprice) {
            self.$vux.toast.show({
              text: `团购价不能低于${minprice}`,
              type: 'warn',
              time: 1500
            })
            return false
          }
        }
        if (isNaN(self.submitdata.param_numbers) || numbers <= 1 || self.submitdata.param_numbers.indexOf('.') > -1) {
          self.$vux.toast.show({
            text: '成团人数应大于1人',
            type: 'warn',
            time: 1500
          })
          return false
        }
        if (isNaN(self.submitdata.param_finishtime) || finishtime <= 0) {
          self.$vux.toast.show({
            text: '请输入正确的成团时间',
            type: 'warn',
            time: 1500
          })
          return false
        }
        if (isNaN(self.submitdata.param_everybuy) || everybuy <= 0 || self.submitdata.param_everybuy.indexOf('.') > -1) {
          self.$vux.toast.show({
            text: '请输入正确的限购件数',
            type: 'warn',
            time: 1500
          })
          return false
        }
      }
      self.$vux.confirm.show({
        content: '活动创建成功后，无法更改活动的相关信息，确定创建吗？',
        onConfirm () {
          self.$vux.loading.show()
          self.saveAjax()
        }
      })
    },
    saveevent () {
      const self = this
      if (self.loginUser.isretailer === 1) {
        self.saveData()
      } else if (self.loginUser.isretailer === 2) {
        self.$http.get(`${ENV.BokaApi}/api/retailer/listActivity`, {
          params: {pagestart: 0, limit: 6}
        })
        .then(res => {
          const data = res.data
          const retdata = data.data ? data.data : data
          if (retdata.length >= 2 && !self.query.id) {
            self.openVip()
          } else {
            self.saveData()
          }
        })
      }
    },
    openVip () {
      const self = this
      self.$vux.confirm.show({
        content: ENV.vipActivity,
        cancelText: ENV.giveUpVipText,
        confirmText: ENV.openVipText,
        onConfirm () {
          location.replace(`${ENV.Host}/#/pay?id=${self.loginUser.payorderid}&module=payorders`)
        }
      })
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.initData()
      this.loginUser = User.get()
      if (this.loginUser.subscribe !== 1 && !this.loginUser.isretailer) {
        this.showSubscribe = true
        return false
      }
      if (this.loginUser && (this.loginUser.subscribe === 1 || this.loginUser.isretailer)) {
        if (((`${this.loginUser.retailerinfo.firstinfo.groupbuy}` === '0' && this.$route.query.type === 'groupbuy') || (`${this.loginUser.retailerinfo.firstinfo.bargainbuy}` === '0' && this.$route.query.type === 'bargainbuy')) && this.$route.query.from) {
          this.$http.get(`${ENV.BokaApi}/api/user/show`).then(res => {
            const data = res.data
            this.loginUser = data
            User.set(this.loginUser)
            if (((`${this.loginUser.retailerinfo.firstinfo.groupbuy}` === '0' && this.$route.query.type === 'groupbuy') || (`${this.loginUser.retailerinfo.firstinfo.bargainbuy}` === '0' && this.$route.query.type === 'bargainbuy')) && this.$route.query.from) {
              this.isFirst = true
              // if (!(`${this.loginUser.retailerinfo.firstinfo.groupbuy}` === '0' && `${this.loginUser.retailerinfo.firstinfo.bargainbuy}` === '0')) {
              //   this.showFirst = true
              // }
            }
          })
        }
        let isAdmin = false
        for (let i = 0; i < self.loginUser.usergroup.length; i++) {
          if (self.loginUser.usergroup[i] === 1) {
            isAdmin = true
            break
          }
        }
        if (!self.loginUser.isretailer && !isAdmin) {
          this.$vux.loading.hide()
          self.initData()
          self.showApply = true
        } else {
          self.showContainer = true
          this.query = this.$route.query
          this.activityType = this.query.type
          this.action = this.query.type
          const nowdate = new Date().getTime()
          const startime = this.dateformat(parseInt(nowdate / 1000))
          const endtime = this.dateformat(parseInt((nowdate + 7 * 24 * 60 * 60 * 1000) / 1000))
          this.selectdatetxt1 = ''
          this.selectdatetxt2 = ''
          this.showselectproduct = true
          this.showproductitem = false
          this.selectproduct = {}
          this.productdata = []
          this.radiodata = []
          const submitdata = {
            productid: '',
            starttime: startime,
            endtime: endtime
          }
          if (this.activityType === 'groupbuy') {
            this.submitdata = {
              ...submitdata,
              param_groupprice: '',
              param_numbers: '',
              param_finishtime: '',
              param_everybuy: ''
            }
          } else if (this.activityType === 'bargainbuy') {
            this.submitdata = {
              ...submitdata,
              param_minprice: '',
              param_finishtime: '',
              param_everymin: '',
              param_everymax: ''
            }
          } else if (this.activityType === 'discount') {
            this.submitdata = {
              ...submitdata,
              param_price: '',
              param_limitcount: '',
              param_storage: ''
            }
          }
          this.submitdata.type = this.query.type
          this.requireddata = this.submitdata
          if (this.query.id) {
            this.submitdata.productid = this.query.id
            this.$http.get(`${ENV.BokaApi}/api/moduleInfo`, {
              params: {id: this.query.id, module: 'product'}
            }).then(res => {
              let data = res.data
              let retdata = data.data ? data.data : data
              if (retdata.photo && retdata.photo !== '') {
                retdata.photo = retdata.photo.split(',')[0]
              }
              this.selectproduct = retdata
            })
          }
          this.showProductArea = true
        }
      }
    }
  },
  activated () {
    this.$util.miniPost()
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.addActivity .s-container{top:0;}
</style>
