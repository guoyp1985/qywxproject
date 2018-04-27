<template>
  <div class="containerarea bg-white font14 uproducts">
    <div class="s-container" style="top:0px;">
      <swiper
        :list="addata"
        dots-position="center"
        :interval=6000
        :show-dots="isshowdot"
        :aspect-ratio="500/900"
        auto
        loop>
      </swiper>
      <template v-if="activitydata.length > 0">
        <div class="padding5 align_center color-red bold font16 bg-white" style="line-height: 37px;"><i class="al al-tagfill font18 mr10"></i>{{ $t('Selection promotion') }}</div>
        <div class="activitylist">
          <div v-for="(item,index) in activitydata" :key="item.id" class="bg-page">
            <Groupbuyitemplate v-if="item.type == 'groupbuy'" style="background-color:#efeff4 !important;">
				      <img slot="photo" style="width:80px;height:80px;" :src="item.photo" />
              <span slot="title">{{ item.title }}</span>
              <span slot="numbers">{{ item.numbers }}</span>
              <span slot="havetuan">{{ item.havetuan }}</span>
              <span slot="groupprice">{{ item.groupprice }}</span>
              <span slot="price">{{ item.price }}</span>
            </Groupbuyitemplate>
            <Bargainbuyitemplate v-if="item.type == 'bargainbuy'" style="background-color:#efeff4 !important;">
				      <img slot="photo" style="width:80px;height:80px;" :src="item.photo" />
              <span slot="title">{{ item.title }}</span>
              <span slot="saveprice">{{ item.saveprice }}</span>
              <span slot="minprice">{{ item.minprice }}</span>
              <span slot="price">{{ item.price }}</span>
            </Bargainbuyitemplate>
          </div>
        </div>
        <a class="padding10 flex_center color-gray" href="user.php?module=user&amp;action=saleproducts">{{ $t('View more promotion') }}</a>
      </template>
      <div class="bg-page" style="height:12px;"></div>
      <template v-if="productdata.length > 0">
        <div class="padding5 align_center color-red bold font16 bg-white" style="line-height: 37px;"><i class="al al-goodsnewfill font18 mr10"></i>{{ $t('New products') }}</div>
        <div class="b_top_after"></div>
        <div class="productlist squarepic mb12">
          <Productitemplate v-for="(item,index) in productdata" :key="item.id">
            <img slot="photo" :src="item.photo" />
            <span slot="title">{{ item.title }}</span>
            <span slot="price" style="margin-left:1px;">{{ item.price }}</span>
            <span slot="saled" style="margin-left:1px;">{{ item.saled }}</span>
          </Productitemplate>
        </div>
      </template>
    </div>
  </div>
</template>

<i18n>
Selection promotion:
  zh-CN: 精选促销
New products:
  zh-CN: 精选新品
Online consulting:
  zh-CN: 在线咨询
Wechat contact:
  zh-CN: 微信联系
Shop topline:
  zh-CN: 店铺头条
Another batch:
  zh-CN: 换一批
View more promotion:
  zh-CN: 查看更多促销
</i18n>

<script>
import { Swiper } from 'vux'
import Groupbuyitemplate from '@/components/Groupbuyitemplate'
import Bargainbuyitemplate from '@/components/Bargainbuyitemplate'
import Productitemplate from '@/components/Productitemplate'
import Newsitemplate from '@/components/Newsitemplate'
import Time from '../../libs/time'

export default {
  components: {
    Swiper,
    Groupbuyitemplate,
    Bargainbuyitemplate,
    Productitemplate,
    Newsitemplate
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showdot: true,
      addata: [{
        url: 'javascript:',
        img: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204043604042.jpg?x-oss-process=image/crop||x_78||y_-36||w_736||h_408',
        title: '欧美宽松潮牌国潮复古加绒卫衣男连帽韩版外套男女oversize青少年'
      }, {
        url: 'javascript:',
        img: 'http://ossgxs.boka.cn/month_201804/15226700508345.jpg',
        title: '苹果手机'
      }, {
        url: 'javascript:',
        img: 'http://ossgxs.boka.cn/month_201803/15223015290656.jpg',
        title: '维生素B族片'
      }],
      activitydata: [
        { 'id': 227, 'title': '团购:商品1', 'type': 'groupbuy', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15220608592056.jpg', 'groupprice': '0.50', 'numbers': '3', 'groupnumbers': '10', 'price': '1.00', 'havetuan': 0 },
        { 'id': 226, 'title': '砍价:你会给我买名牌包包吗？', 'type': 'bargainbuy', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15217043944267.jpg', 'minprice': '5.00', 'price': '10.00', 'saveprice': '5.00' },
        { 'id': 217, 'title': '团购:测试商品分享', 'type': 'groupbuy', 'photo': 'http://ossgxs.boka.cn/month_201803/15222371028755.jpg', 'groupprice': '0.50', 'numbers': '3', 'groupnumbers': '10', 'price': '1.00', 'saveprice': '0.50', 'havetuan': 0 },
        { 'id': 216, 'title': '团购:欧美宽松潮牌国潮复古加绒卫衣男连帽韩版外套男女oversize青少年', 'type': 'groupbuy', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204034569409.png', 'groupprice': '0.50', 'numbers': '3', 'groupnumbers': '10', 'limitbuy': '1', 'price': '1.00', 'saveprice': '0.50', 'havetuan': 0 },
        { 'id': 215, 'title': '团购:欧美简约假两件无袖背心男休闲嘻哈ulzzang青少年学生坎肩打底衫打底衫打底衫', 'type': 'groupbuy', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204032649156.png', 'groupprice': '0.01', 'numbers': '2', 'groupnumbers': '2', 'price': '1.00', 'saveprice': '0.99', 'havetuan': 2 }
      ],
      productdata: [
        { 'id': 124, 'title': '苹果手机', 'photo': 'http://ossgxs.boka.cn/month_201804/15226700508345.jpg', 'price': '8,000.00' },
        { 'id': 113, 'title': '维生素B族片', 'photo': 'http://ossgxs.boka.cn/month_201803/15223015290656.jpg', 'price': '1.00', 'saled': 1 },
        { 'id': 107, 'title': '大王卡', 'photo': 'http://ossgxs.boka.cn/month_201803/15222378479011.jpg', 'price': '12.00', 'saled': 0 },
        { 'id': 106, 'title': '测试分享商品通知', 'photo': 'http://ossgxs.boka.cn/month_201803/15222375843651.jpg', 'price': '1.00', 'saled': 0 },
        { 'id': 105, 'title': '测试商品分享', 'photo': 'http://ossgxs.boka.cn/month_201803/15222371028755.jpg', 'price': '1.00', 'saled': 0 },
        { 'id': 103, 'title': '测试商品图片', 'photo': 'http://ossgxs.boka.cn/month_201803/15222183428017.jpg?x-oss-process=image/crop,x_-109,y_-103,w_1086,h_1086', 'price': '10.00', 'saled': 2 },
        { 'id': 98, 'title': '111', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15221287780438.jpg', 'price': '222.00', 'saled': 0 },
        { 'id': 92, 'title': '商品2', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15220609241178.png', 'price': '12.00', 'saled': 0 },
        { 'id': 91, 'title': '商品1', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15220608592056.jpg', 'price': '1.00', 'saled': 1 },
        { 'id': 89, 'title': '啊', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15220603289333.jpg', 'price': '1.00', 'saled': 0 }
      ]
    }
  },
  computed: {
    isshowdot: function () {
      if (this.addata.length > 1) {
        this.showdot = true
      } else {
        this.showdot = false
      }
      return this.showdot
    }
  },
  methods: {
  },
  created () {
    this.$store.commit('updateToggleTabbar', {toggleTabbar: true})
  }
}
</script>

<style lang="less">
.vline{position:relative;}
.vline:after {
  content: " ";
  display: block;
  position: absolute;
  width: 2px;
  top: 4px;
  bottom: 4px;
  margin: auto 0;
  left: -1px;
  background-color: #ff6600;
}
.uproducts .squarepic .desbox{
  background-color:#f6f6f6;
}

</style>
