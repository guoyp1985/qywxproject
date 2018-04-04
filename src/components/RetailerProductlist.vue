<template>
  <div class="containerarea bg-page font14 s-havebottom">
    <div class="s-container" style="top:0px;">
      <template v-if="productdata.length > 0">
        <Productitemplate1 v-for="(item,index) in productdata" class="bg-page">
          <div slot="icon" v-if="item.moderate == 0" class="icon down"></div>
		      <img slot="photo" style="width:80px;height:80px;" :src="item.photo" />
          <div slot="rightcell">
            <div class="clamp2 font15 pr10">{{item.title}}</div>
            <div class="mt5 dishref db">
              <span class="color-red font15 middle-cell">{{ $t('RMB') }} {{ item.price }}</span>
            </div>
            <div class="align_right pr10">
              <div class="qbtn4" style="padding: 1px 8px;" @click="controlpopup1(item,index)">{{ $t('Control text') }}</div>
            </div>
          </div>
        </Productitemplate1>
      </template>
    </div>
    <div class="s-bottom flex_center bg-orange color-white">{{ $t('Add product') }}</div>
    <div v-transfer-dom>
      <popup class="menuwrap" v-model="showpopup1" @on-hide="popupevent('hide')" @on-show="popupevent('show')">
        <div class="popup0">
          <div class="list" v-if="clickdata">
            <template v-for="(row,index1) in controldata1">
              <div class="item flex_center" @click="clickpopup(row.key)" v-if="row.key == 'up' && clickdata.moderate == 0">{{ row.title }}</div>
              <div class="item flex_center" @click="clickpopup(row.key)" v-else-if="row.key == 'down' && clickdata.moderate == 1">{{ row.title }}</div>
              <div class="item flex_center" @click="clickpopup(row.key)" v-else-if="row.key != 'up' && row.key != 'down'">{{ row.title }}</div>
            </template>
            <div class="item flex_center close mt10" @click="clickpopup('row.key')">{{ $t('Cancel txt') }}</div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <confirm v-model="showupconfirm"
      @on-cancel="cancelupConfirm"
      @on-confirm="okupConfirm">
        <p style="text-align:center;">{{ $t('Are you sure up?') }}</p>
      </confirm>
    </div>
    <div v-transfer-dom>
      <confirm v-model="showdownconfirm"
      @on-cancel="canceldownConfirm"
      @on-confirm="okdownConfirm">
        <p style="text-align:center;">{{ $t('Are you sure down?') }}</p>
      </confirm>
    </div>
  </div>
</template>

<i18n>
Are you sure up?:
  zh-CN: 确定要上架吗？
Are you sure down?:
  zh-CN: 确定要下架吗？
</i18n>

<script>
import { TransferDom, Popup, Confirm } from 'vux'
import Productitemplate1 from './Productitemplate1'

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup,
    Productitemplate1,
    Confirm
  },
  data () {
    return {
      productdata: [
        { 'id': 124, isfinished: 1, moderate: 0, 'title': '苹果手机', 'photo': 'http://ossgxs.boka.cn/month_201804/15226700508345.jpg', 'price': '8,000.00' },
        { 'id': 113, isfinished: 0, moderate: 1, 'title': '维生素B族片', 'photo': 'http://ossgxs.boka.cn/month_201803/15223015290656.jpg', 'price': '1.00', 'saled': 1 },
        { 'id': 107, isfinished: 1, moderate: 1, 'title': '大王卡', 'photo': 'http://ossgxs.boka.cn/month_201803/15222378479011.jpg', 'price': '12.00', 'saled': 0 },
        { 'id': 106, isfinished: 0, moderate: 1, 'title': '测试分享商品通知', 'photo': 'http://ossgxs.boka.cn/month_201803/15222375843651.jpg', 'price': '1.00', 'saled': 0 },
        { 'id': 105, isfinished: 1, moderate: 0, 'title': '测试商品分享', 'photo': 'http://ossgxs.boka.cn/month_201803/15222371028755.jpg', 'price': '1.00', 'saled': 0 },
        { 'id': 103, isfinished: 1, moderate: 0, 'title': '测试商品图片', 'photo': 'http://ossgxs.boka.cn/month_201803/15222183428017.jpg?x-oss-process=image/crop,x_-109,y_-103,w_1086,h_1086', 'price': '10.00', 'saled': 2 },
        { 'id': 98, isfinished: 0, moderate: 0, 'title': '111', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15221287780438.jpg', 'price': '222.00', 'saled': 0 },
        { 'id': 92, isfinished: 0, moderate: 0, 'title': '商品2', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15220609241178.png', 'price': '12.00', 'saled': 0 },
        { 'id': 91, isfinished: 0, moderate: 0, 'title': '商品1', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15220608592056.jpg', 'price': '1.00', 'saled': 1 },
        { 'id': 89, isfinished: 0, moderate: 0, 'title': '啊', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15220603289333.jpg', 'price': '1.00', 'saled': 0 }
      ],
      controldata1: [
        { key: 'edit', title: '编辑' },
        { key: 'up', title: '上架' },
        { key: 'down', title: '下架' },
        { key: 'stat', title: '统计' },
        { key: 'createposter', title: '生成海报' }
      ],
      showpopup1: false,
      clickdata: {},
      clickindex: 0,
      showupconfirm: false,
      showdownconfirm: false
    }
  },
  computed: {
  },
  methods: {
    controlpopup1 (item, index) {
      this.showpopup1 = !this.showpopup1
      this.clickdata = item
      this.clickindex = index
    },
    popupevent (status) {

    },
    clickpopup (key) {
      if (key === 'up') {
        this.showupconfirm = true
      } else if (key === 'down') {
        this.showdownconfirm = true
      } else {
        this.showpopup1 = false
      }
    },
    cancelupConfirm () {
      this.showupconfirm = false
    },
    okupConfirm () {
      this.clickdata.moderate = 1
      this.productdata[this.clickindex].moderate = 1
      this.showupconfirm = false
      this.showpopup1 = false
    },
    canceldownConfirm () {
      this.showdownconfirm = false
    },
    okdownConfirm () {
      this.clickdata.moderate = 0
      this.productdata[this.clickindex].moderate = 0
      this.showupconfirm = false
      this.showpopup1 = false
    }
  }
}
</script>

<style lang="less">
@import '../assets/fonts.less';
@import '../assets/global.less';


</style>
