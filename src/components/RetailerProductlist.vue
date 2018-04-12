<template>
  <div class="containerarea bg-page font14 s-havebottom rproductlist">
    <div class="s-container" style="top:0px;">
      <div class="scroll_list bg-page">
        <template v-if="!productdata || productdata.length == 0">
          <div class="emptyitem">
            <div class="t-table" style="padding-top:20%;">
              <div class="t-cell padding10">
                <i class="al al-chuangjianxiangmu" style="font-size:60px;"></i>
                <div>还没有添加商品哦，及时添加商品可以：</div>
                <div>1.创建促销活动 </div>
                <div>2.分享商品获得客户</div>
                <div>3.邀请返点客帮你赚钱</div>
              </div>
            </div>
          </div>
        </template>
        <router-link :to="{path:'/product',query:{id:item.id,wid:187}}" v-else class="scroll_item mb5 font14 bg-white db" v-for="(item,index) in productdata" :key="item.id" style="color:inherit;">
          <div v-if="item.moderate == 0" class="icon down"></div>
      		<div class="t-table bg-white pt10 pb10">
      			<div class="t-cell pl10 v_middle" style="width:90px;">
  		          <img style="width:80px;height:80px;" :src="item.photo" />
      			</div>
      			<div class="t-cell v_middle">
              <div class="clamp2 font15 pr10">{{item.title}}</div>
              <div class="mt5 dishref db">
                <span class="color-red font15 middle-cell">{{ $t('RMB') }} {{ item.price }}</span>
              </div>
              <div class="align_right pr10">
                <div class="btnicon" style="padding: 1px 8px;" @click="controlpopup1(item,index)">{{ $t('Control text') }}</div>
              </div>
      			</div>
      		</div>
        </router-link>
      </div>
    </div>
    <router-link class="s-bottom flex_center bg-orange color-white" to="/addProduct">{{ $t('Add product') }}</router-link>
    <div v-transfer-dom>
      <popup class="menuwrap" v-model="showpopup1" @on-hide="popupevent('hide')" @on-show="popupevent('show')">
        <div class="popup0">
          <div class="list" v-if="clickdata">
            <div class="item" v-for="(row,index1) in controldata1" :key="index1">
              <div class="inner" @click="clickpopup(row.key)" v-if="row.key == 'up' && clickdata.moderate == 0">{{ row.title }}</div>
              <div class="inner" @click="clickpopup(row.key)" v-else-if="row.key == 'down' && clickdata.moderate == 1">{{ row.title }}</div>
              <router-link class="inner" to="/productStat" v-else-if="row.key == 'stat'">{{ row.title }}</router-link>
              <div class="inner" @click="clickpopup(row.key)" v-else-if="row.key != 'up' && row.key != 'down' && row.key != 'stat'">{{ row.title }}</div>
            </div>
            <div class="item close mt10" @click="clickpopup('row.key')">
              <div class="inner">{{ $t('Cancel txt') }}</div>
            </div>
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
      event.preventDefault()
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

.rproductlist .scroll_item{overflow:hidden;position:relative;}
.rproductlist .scroll_item .icon{display:none;}
.rproductlist .scroll_item .down.icon{
        display:block;
        position:absolute;right:0;top:0;width:96px;height:25px;line-height:25px;
        background-color:#8a8a8a;color:#fff;text-align:center;font-size: 12px;
        -webkit-transform: translate(30px,5px) rotate(45deg);
        transform: translate(30px,5px) rotate(45deg);
}
.rproductlist .scroll_item .down.icon:after{content:"已下架";}
.rproductlist .btnicon{
  display: inline-block;
    color: #9c9c9c;
    font-size: 14px;
    border: 1px solid #9c9c9c;
    text-align: center;
    border-radius: 30px;
    padding: 1px 8px;
}
</style>
