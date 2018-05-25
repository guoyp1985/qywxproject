<template>
  <div class="containerarea s-havebottom bg-white font14 addActivity">
    <div class="s-container" style="top:0;">
      <form class="addForm">
        <forminputplate class="required">
          <span slot="title">{{ $t('Activity product') }}</span>
          <div v-if="showselectproduct" class="qbtn flex_center color-orange" style="border:orange 1px solid;width:100%;line-height:1;padding:4px 0;" @click="selectevent">
            <span class="mr5 v_middle db-in" style="margin-top:-3px;">+</span><span class="v_middle db-in">{{ $t('Select product') }}</span>
          </div>
          <div v-if="showproductitem" class="scroll_item border db">
            <div class="t-table">
              <div class="t-cell v_middle" style="width:50px;">
                <x-img class="v_middle imgcover" :src="selectproduct.photo" default-src="../src/assets/images/nopic.jpg" style="width:40px;height:40px;" ></x-img>
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
        </forminputplate>
        <forminputplate class="required">
          <span slot="title">{{ $t('Starttime') }}</span>
          <group class="x-datetime">
            <datetime format="YYYY-MM-DD HH:mm" v-model='submitdata.starttime' :show.sync="visibility1" @on-change="datechange1" @on-cancel="datecancel1" @on-confirm="dateconfirm1"></datetime>
          </group>
          <div @click="showxdate1" class='font14 color-gray align_left' style="position:absolute;left:0;right:0;top:0;height:22px;background-color:transparent;z-index:10;">{{ selectdatetxt1 }}</div>
        </forminputplate>
        <forminputplate class="required">
          <span slot="title">{{ $t('Endtime') }}</span>
          <group class="x-datetime">
            <datetime format="YYYY-MM-DD HH:mm" v-model='submitdata.endtime' :show.sync="visibility2" @on-change="datechange2" @on-cancel="datecancel2" @on-confirm="dateconfirm2"></datetime>
          </group>
          <div @click="showxdate2" class='font14 color-gray align_left' style="position:absolute;left:0;right:0;top:0;height:22px;background-color:transparent;z-index:10;">{{ selectdatetxt2 }}</div>
        </forminputplate>
        <div class="bg-gray6 font16 b_bottom_after padding10" style="padding:10px;">活动设置</div>
        <template v-if="activityType == 'groupbuy'">
          <form-groupbuy :submitdata="submitdata"></form-groupbuy>
        </template>
        <template v-if="activityType == 'bargainbuy'">
          <form-bargainbuy :data="selectproduct" :submitdata="submitdata"></form-bargainbuy>
        </template>
        <template v-if="activityType == 'discount'">
          <form-discount :submitdata="submitdata"></form-discount>
        </template>
      </form>
    </div>
    <div class="s-bottom flex_center bg-orange color-white" @click="saveevent">{{ $t('Go to create') }}</div>
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
              <div v-if="!productdata || productdata.length === 0" class="scroll_item padding10 color-gray align_center">
                <template v-if="searchresult">
                  <div class="flex_center" style="height:80px;">暂无搜索结果</div>
                </template>
                <template v-else>
                  <div class="flex_center" style="height:80px;">暂无商品</div>
                </template>
              </div>
              <check-icon v-else class="x-check-icon scroll_item" v-for="(item,index) in productdata" :key="item.id" :value.sync="item.checked" @click.native.stop="radioclick(item,index)">
                <div class="t-table">
                  <div class="t-cell pic v_middle w50">
                    <x-img class="v_middle imgcover" :src="item.photo" default-src="../src/assets/images/nopic.jpg" style="width:40px;height:40px;" :offset="0" container=".selectpopup-container" ></x-img>
                  </div>
                  <div class="t-cell v_middle" style="color:inherit;">
                    <div class="clamp1">{{item.title}}</div>
                    <div class="mt5 font12 clamp1"><span class="color-orange">¥{{ item.price }}</span><span class="ml10 color-gray">{{ $t('Storage') }} {{ item.storage }}</span></div>
                  </div>
                </div>
              </check-icon>
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
import Forminputplate from '@/components/Forminputplate'
import FormGroupbuy from '@/components/FormGroupbuy'
import FormBargainbuy from '@/components/FormBargainbuy'
import FormDiscount from '@/components/FormDiscount'
import Time from '#/time'
import ENV from 'env'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group, XInput, Popup, Datetime, Search, CheckIcon, Forminputplate, FormGroupbuy, FormBargainbuy, FormDiscount, XImg
  },
  data () {
    return {
      autofixed: false,
      query: {},
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
      pagestart1: 0
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
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    },
    radioclick (data, index) {
      const self = this
      if (data.checked) {
        self.selectpopupdata = data
      } else {
        self.selectpopupdata = null
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
    confirmpopup () {
      const self = this
      if (!this.selectpopupdata || !this.selectpopupdata.id) {
        self.$vux.alert.show({
          title: '',
          content: '请选择商品'
        })
        return false
      }
      this.selectproduct = this.selectpopupdata
      self.submitdata.productid = self.selectproduct.id
      this.showpopup = false
      this.showselectproduct = false
      this.showproductitem = true
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
    saveevent () {
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
        let limitbuy = parseInt(self.submitdata.param_limitbuy)
        if (isNaN(minprice) || minprice < 0) {
          self.$vux.alert.show({
            title: '',
            content: '请输入正确的活动价格'
          })
          return false
        }
        if (minprice > priceval) {
          self.$vux.alert.show({
            title: '',
            content: '活动价格不能大于原价'
          })
          return false
        }
        if (limitbuy > storage) {
          self.$vux.alert.show({
            title: '',
            content: '投放总数不能大于商品库存'
          })
          return false
        }
        if (minval > priceval || maxval > priceval) {
          self.$vux.alert.show({
            title: '',
            content: '可砍金额不能大于活动价格'
          })
          return false
        }
      } else if (self.activityType === 'groupbuy') {
        let groupprice = parseFloat(self.submitdata.param_groupprice)
        let numbers = parseInt(self.submitdata.param_numbers)
        let limitbuy = parseInt(self.submitdata.param_limitbuy)
        let everybuy = parseInt(self.submitdata.param_everybuy)
        if (isNaN(groupprice) || groupprice < 0) {
          self.$vux.alert.show({
            title: '',
            content: '请输入正确的团购价格'
          })
          return false
        }
        if (groupprice > priceval) {
          self.$vux.alert.show({
            title: '',
            content: '团购价不能大于原价'
          })
          return false
        }
        if (numbers <= 1) {
          self.$vux.alert.show({
            title: '',
            content: '成团人数应大于1人'
          })
          return false
        }
        if (limitbuy > storage) {
          self.$vux.alert.show({
            title: '',
            content: '投放商品数量不能大于商品库存'
          })
          return false
        }
        if (limitbuy < numbers * everybuy) {
          self.$vux.alert.show({
            title: '',
            content: '投放商品数量应大于<br/>成团人数×限购件数'
          })
          return false
        }
      }
      self.$vux.confirm.show({
        content: '活动创建成功后，无法更改活动的相关信息，确定创建吗？',
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/retailer/addActivity`, self.submitdata).then(function (res) {
            let data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: self.$util.delay(data.error),
              onHide: function () {
                if (data.flag === 1) {
                  self.$router.push('/retailerActivitylist')
                }
              }
            })
          })
        }
      })
    }
  },
  created: function () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.query = self.$route.query
    self.activityType = self.query.type
    let nowdate = new Date().getTime()
    let startime = self.dateformat(parseInt(nowdate / 1000))
    let endtime = self.dateformat(parseInt((nowdate + 7 * 24 * 60 * 60 * 1000) / 1000))
    self.selectdatetxt1 = ''
    self.selectdatetxt2 = ''
    if (self.activityType === 'groupbuy') {
      self.submitdata = {
        productid: '',
        starttime: startime,
        endtime: endtime,
        param_groupprice: '',
        param_numbers: '',
        param_limitbuy: '',
        param_finishtime: '',
        param_everybuy: ''
      }
    } else if (self.activityType === 'bargainbuy') {
      self.submitdata = {
        productid: '',
        starttime: startime,
        endtime: endtime,
        param_minprice: '',
        param_limitbuy: '',
        param_finishtime: '',
        param_everymin: '',
        param_everymax: ''
      }
    } else if (self.activityType === 'discount') {
      self.submitdata = {
        productid: '',
        starttime: startime,
        endtime: endtime,
        param_price: '',
        param_limitcount: '',
        param_storage: ''
      }
    }
    self.submitdata['type'] = self.query.type
    self.requireddata = self.submitdata
  },
  activated () {
  }
}
</script>

<style lang="less" scoped>
</style>
