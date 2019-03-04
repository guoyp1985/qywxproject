<template>
  <div class="containerarea s-havebottom bg-white">
    <div class="s-container" style="top:0;">
      <form>
        <forminputplate class="required">
          <span slot="title">{{ $t('Buy user') }}</span>
          <input type="text" class="input border-box" required :placeholder="$t('Select user')" @click="getpopup" :value="checkedusername" />
          <div v-transfer-dom class="x-popup">
            <popup v-model="showpopup" height="100%">
              <div class="popup1">
                <div class="popup-top flex_center">{{ $t('Buy user') }}</div>
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
                  <group class="x-radio">
                    <radio :options="getradiodata" @on-change="radiochange"></radio>
                  </group>
                </div>
                <div class="popup-bottom flex_center">
                  <div class="flex_cell bg-red color-white h_100 flex_center" @click="closepopup">{{ $t('Cancel txt') }}</div>
                  <div class="flex_cell bg-green color-white h_100 flex_center" @click="confirmpopup">{{ $t('Confirm txt') }}</div>
                </div>
              </div>
            </popup>
          </div>
        </forminputplate>
        <forminputplate class="required">
          <span slot="title">{{ $t('Buy product') }}</span>
          <div>
            <div class="db-flex mb12" v-for="(row1,index1) in rowdata" :key="index1">
              <select v-model="row1.productdata" class="w_100 flex_cell" @change="selectchange" value="-1">
                <option value="-1" selected>请选择商品</option>
                <option v-for="(item,index) in productdata" :key="index" :value="`${item.id}`">{{ item.title }}</option>
              </select>
              <group class="x-number">
                <x-number v-model="row1.value" :min="0" @on-change="changenumber"></x-number>
              </group>
            </div>
            <div class="align_center db-flex">
              <div class="qbtn2 flex_cell" @click="addrow">增加更多商品</div>
            </div>
          </div>
        </forminputplate>
        <forminputplate>
          <span slot="title">{{ $t('Order price') }}</span>
          <div class="color-orange">{{ $t('RMB') }}{{ totalprice }}</div>
        </forminputplate>
        <forminputplate>
          <span slot="title">{{ $t('Visit date') }}</span>
          <group class="x-datetime">
            <datetime :show.sync="visibility" @on-change="datechange" @on-cancel="datecancel" @on-confirm="dateconfirm" v-model='nexttime'></datetime>
          </group>
          <div @click="showxdate" class='font14 color-gray align_left' style="position:absolute;left:0;right:0;top:0;height:22px;background-color:transparent;z-index:10;">{{ selectdatetxt }}</div>
        </forminputplate>
        <div v-show="showmore">
          <div class="padding10 font16 bg-gray4">{{ $t('Receiver info') }}</div>
          <forminputplate>
            <span slot="title">{{ $t('Receiver') }}</span>
            <input type="text" name="linkman" class="input border-box" :placeholder="$t('Receiver placeholder')" />
          </forminputplate>
          <forminputplate>
            <span slot="title">{{ $t('Mobile') }}</span>
            <group>
              <x-input class="font14" :placeholder="$t('Mobile placeholder')" mask="999 9999 9999" :max="11" is-type="china-mobile"></x-input>
            </group>
          </forminputplate>
          <forminputplate>
            <span slot="title">{{ $t('Buyer address') }}</span>
            <group>
              <x-address
                class="x-address font14"
                @on-hide="addressHide"
                @on-show="addressShow"
                :title="defaultaddress"
                v-model="addressvalue"
                :list="addressData"
                @on-shadow-change="onShadowChange"
                :placeholder="$t('Buyer address placeholder')"
                value-text-align="left"
                :show.sync="showAddress">
              </x-address>
            </group>
          </forminputplate>
          <forminputplate>
            <span slot="title">{{ $t('Detail address') }}</span>
            <group class="textarea-outer" style="padding:0;">
              <x-textarea
                ref="txtTextarea"
                style="padding:5px;"
                class="x-textarea"
                :placeholder="$t('Detail address placeholder')"
                :show-counter="false"
                :rows="1"
                @on-change="textareaChange('txtTextarea')"
                @on-focus="textareaFocus('txtTextarea')"
                autosize>
              </x-textarea>
            </group>
          </forminputplate>
          <div class="padding10 font16 bg-gray4">{{ $t('Deliver info') }}</div>
          <forminputplate>
            <span slot="title">{{ $t('Deliver commpany') }}</span>
            <select class="w_100" style="height:27px;">
              <option v-for="(item,index) in deliverdata" :key="index" value="item.id">{{ item.value }}</option>
            </select>
          </forminputplate>
        </div>
        <div v-if="showmore" @click="expandevent" class="padding15 font14 align_center color-gray">收起<i class="al al-jiantou2-up font14 middle-cell"></i></div>
        <div v-else class="padding15 font14 align_center color-red"  @click="expandevent"><i class="al al-yijianfankui font16"></i>点击填写快递信息，买家可以在线查询订单状态</div>
      </form>
    </div>
    <div class="s-bottom flex_center bg-green color-white">{{ $t('Submit order') }}</div>
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
</i18n>

<script>
import { Group, XNumber, Datetime, XButton, XTextarea, XInput, TransferDom, Popup, Search, Radio, XAddress, ChinaAddressV4Data, Value2nameFilter as value2name } from 'vux'
import Forminputplate from '@/components/Forminputplate'
import ENV from 'env'
export default {
  directives: {
    TransferDom
  },
  components: {
    Group, XNumber, Datetime, XButton, XTextarea, XInput, Popup, Search, Radio, XAddress, Forminputplate
  },
  data () {
    return {
      showpopup: false,
      checkeduid: 0,
      checkedusername: '',
      userdata: [
        {
          uid: '51', title: '贪吃小松鼠', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/51.jpg'
        },
        {
          uid: '272', title: 'zxj', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/272.jpg'
        },
        {
          uid: '29', title: '网络影响力', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/29.jpg'
        },
        {
          uid: '4', title: '楚风越韵  🏠', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/4.jpg'
        },
        {
          uid: '2', title: '仇红波', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/2.jpg'
        }
      ],
      radiodata () {
        let curdata = this.userdata
        for (var i = 0; i < curdata.length; i++) {
          let d = curdata[i]
          d['icon'] = d.avatar
          d['key'] = d.uid
          d['value'] = d.title
        }
        return curdata
      },
      productdata: [
        { id: 113, title: '维生素B族片', price: '1.00' },
        { id: 39, title: '欧美宽松潮牌国潮复古加绒卫衣男连帽韩版外套男女oversize青少年', price: '1.00' },
        { id: 107, title: '大王卡', price: '12.00' },
        { id: 74, title: '你会给我买名牌包包吗？', price: '10.00' },
        { id: 38, title: '欧美简约假两件无袖背心男休闲嘻哈ulzzang青少年学生坎肩打底衫打底衫打底衫', price: '1.00' }
      ],
      rowdata: [
        { id: 1, value: 0, productdata: this.productdata }
      ],
      selectdata: [],
      totalprice: '0.00',
      nexttime: '',
      visibility: false,
      selectdatetxt: '选择回访时间',
      showmore: false,
      deliverdata: [
        { id: '-1', value: '无需物流' },
        { id: 'ZTO', value: '中通快递' },
        { id: 'YTO', value: '圆通快递' },
        { id: 'SFEXPRESS', value: '顺丰速运' },
        { id: 'STO', value: '申通快递' },
        { id: 'EMS', value: '邮政EMS' },
        { id: 'YUNDA', value: '韵达快递' },
        { id: 'TTKDEX', value: '天天快递' },
        { id: 'HTKY', value: '汇通快运' },
        { id: 'JD', value: '京东快递' },
        { id: 'DEPPON', value: '德邦物流' }
      ],
      defaultaddress: '',
      addressvalue: [ '110000', '110100', '110107' ],
      addressData: ChinaAddressV4Data,
      showAddress: false
    }
  },
  computed: {
    getradiodata () {
      let curdata = this.userdata
      for (var i = 0; i < curdata.length; i++) {
        let d = curdata[i]
        d['icon'] = d.avatar
        d['key'] = d.uid
        d['value'] = d.title
      }
      return curdata
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
    onSubmit () {
    },
    onFocus () {
    },
    onCancel () {
    },
    radiochange (val) {
      this.checkeduid = val
    },
    changenumber (val) {
      console.log('change', val)
    },
    addrow () {
      let adddata = {
        id: this.rowdata.length + 1,
        value: 0,
        productdata: this.productdata
      }
      this.rowdata.push(adddata)
    },
    selectchange (e) {
      let target = e.target
      let selectedIndex = target.selectedIndex
      let dataindex = selectedIndex - 1
      let curprice
      if (dataindex > -1) {
        let curdata = this.productdata[dataindex]
        curprice = parseFloat(curdata.price)
      } else {
        curprice = 0
      }
      this.totalprice = (parseFloat(this.totalprice) + curprice).toFixed(2)
    },
    showxdate () {
      this.visibility = true
    },
    datechange (val) {
      this.nexttime = val
    },
    datecancel () {
      this.nexttime = ''
      this.selectdatetxt = '选择回访时间'
    },
    dateconfirm () {
      this.selectdatetxt = ''
    },
    expandevent () {
      this.showmore = !this.showmore
    },
    getpopup () {
      this.showpopup = true
    },
    closepopup () {
      this.showpopup = false
    },
    confirmpopup () {
      for (var i = 0; i < this.userdata.length; i++) {
        let d = this.userdata[i]
        if (d.uid === this.checkeduid) {
          this.checkedusername = d.title
          break
        }
      }
      this.showpopup = false
    },
    onShadowChange (ids, names) {
      console.log('onShadowChange')
    },
    getName (value) {
      return value2name(value, ChinaAddressV4Data)
    },
    addressHide (str) {
      console.log('on-hide', str)
    },
    addressShow (str) {
      console.log('on-show')
    },
    getData () {
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'addorder'
      })
    },
    init () {
      this.getData()
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.form-item{
  position:relative;padding:10px;
  .title-cell{width:80px;}
}
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
