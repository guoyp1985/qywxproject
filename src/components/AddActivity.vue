<template>
  <div class="containerarea s-havebottom font14">
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
            <datetime :show.sync="visibility1" @on-change="datechange1" @on-cancel="datecancel1" @on-confirm="dateconfirm1" v-model='starttime'></datetime>
          </group>
          <div @click="showxdate1" class='font14 color-gray align_left' style="position:absolute;left:0;right:0;top:0;height:22px;background-color:transparent;z-index:10;">{{ selectdatetxt1 }}</div>
        </Forminputplate>
        <Forminputplate class="required">
          <span slot="title">{{ $t('Endtime') }}</span>
          <group class="x-datetime">
            <datetime :show.sync="visibility2" @on-change="datechange2" @on-cancel="datecancel2" @on-confirm="dateconfirm2" v-model='endtime'></datetime>
          </group>
          <div @click="showxdate2" class='font14 color-gray align_left' style="position:absolute;left:0;right:0;top:0;height:22px;background-color:transparent;z-index:10;">{{ selectdatetxt2 }}</div>
        </Forminputplate>
        <div class="bg-gray6 font16 b_bottom_after padding10" style="padding:10px;">活动设置</div>
        <div class="form-item" v-for="(item,index) in formdata" :key="item.id">
          <div class="t-table" v-if="item.type === 'text'">
            <div class="t-cell title-cell w80 font14 v_middle">{{item.title}}<span v-if="item.required" class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <input type="text" class="input" :name="item.name" :placeholder="item.title" />
            </div>
            <div v-if="item.unit && item.unit != ''" class="t-cell v_middle align_right font12" style="width:40px;">{{ item.unit }}</div>
          </div>
        </div>
      </form>
    </div>
    <div class="s-bottom flex_center bg-orange color-white">{{ $t('Go to create') }}</div>
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
                <input slot="radio" type="radio" name="product" :checked="item.checked" @click="radioclick(item)" />
                <img slot="pic" :src="item.photo" style="width:40px;height:40px;" class="v_middle" />
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
import { Group, XInput, TransferDom, Popup, Alert, Datetime, Search } from 'vux'
import Forminputplate from './Forminputplate'
import Radioitemplate from './Radioitemplate'

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
    Datetime,
    Search
  },
  data () {
    return {
      showalert: false,
      showselectproduct: true,
      showproductitem: false,
      selectproduct: {},
      selectpopupdata: {},
      showpopup: false,
      productdata: [
        { 'id': 124, 'title': '苹果手机', 'photo': 'http://ossgxs.boka.cn/month_201804/15226700508345.jpg', 'price': '8,000.00', storage: 1 },
        { 'id': 113, 'title': '维生素B族片', 'photo': 'http://ossgxs.boka.cn/month_201803/15223015290656.jpg', 'price': '1.00', 'saled': 1, storage: 11 },
        { 'id': 107, 'title': '大王卡', 'photo': 'http://ossgxs.boka.cn/month_201803/15222378479011.jpg', 'price': '12.00', 'saled': 0, storage: 13 },
        { 'id': 106, 'title': '测试分享商品通知', 'photo': 'http://ossgxs.boka.cn/month_201803/15222375843651.jpg', 'price': '1.00', 'saled': 0, storage: 154 },
        { 'id': 105, 'title': '测试商品分享', 'photo': 'http://ossgxs.boka.cn/month_201803/15222371028755.jpg', 'price': '1.00', 'saled': 0, storage: 14 },
        { 'id': 103, 'title': '测试商品图片', 'photo': 'http://ossgxs.boka.cn/month_201803/15222183428017.jpg?x-oss-process=image/crop,x_-109,y_-103,w_1086,h_1086', 'price': '10.00', 'saled': 2, storage: 123 },
        { 'id': 98, 'title': '111', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15221287780438.jpg', 'price': '222.00', 'saled': 0, storage: 113 },
        { 'id': 92, 'title': '商品2', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15220609241178.png', 'price': '12.00', 'saled': 0, storage: 13 },
        { 'id': 91, 'title': '商品1', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15220608592056.jpg', 'price': '1.00', 'saled': 1, storage: 12 },
        { 'id': 89, 'title': '啊', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15220603289333.jpg', 'price': '1.00', 'saled': 0, storage: 11 }
      ],
      radiodata: [],
      starttime: '',
      endtime: '',
      visibility1: false,
      visibility2: false,
      selectdatetxt1: '选择开始时间',
      selectdatetxt2: '选择结束时间',
      formdata: [
        { id: 1, name: 'groupprice', title: '团购价', type: 'text', required: true, unit: '元' },
        { id: 2, name: 'numbers', title: '成团人数', type: 'text', required: true, unit: '人' },
        { id: 3, name: 'limitbuy', title: '投放商品数量', type: 'text', required: true, unit: '件' },
        { id: 4, name: 'finishtime', title: '成团时间', type: 'text', required: true, unit: '小时' },
        { id: 5, name: 'everybuy', title: '限购件数', type: 'text', required: true, unit: '件' }
      ]
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
      this.starttime = val
    },
    datecancel1 () {
      this.starttime = ''
      this.selectdatetxt1 = '选择开始时间'
    },
    dateconfirm1 () {
      this.selectdatetxt1 = ''
    },
    showxdate2 () {
      this.visibility2 = true
    },
    datechange2 (val) {
      this.endtime = val
    },
    datecancel2 () {
      this.endtime = ''
      this.selectdatetxt2 = '选择结束时间'
    },
    dateconfirm2 () {
      this.selectdatetxt2 = ''
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/close.less';
@import '../assets/fonts.less';
@import '../assets/global.less';
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
