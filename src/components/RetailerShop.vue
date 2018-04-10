<template>
  <div class="containerarea bg-page font14 s-havebottom">
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
      <div class="pt12 pb12 bg-white pl10 pr10 b_bottom_after">
    		<div class="t-table">
    			<div class="t-cell v_middle w50">
    				<img class="avatarimg1" src="http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg" onerror="javascript:this.src='/mobile/data/images/nopic.jpg';">
    			</div>
    			<div class="t-cell v_middle shopkeeper_txt">
    				<div class="clamp1 font16">{{ shopname }}</div>
    			</div>
  				<div class="t-cell v_middle align_right" style="width:160px;">
            <router-link class="font12 color-gray5 mr5 v_middle" :to="{path:'/retailerProductlist',query:{store:1}}"><i class="al al-dianpu font18 color-red"></i>{{$t('Decoration shop')}}</router-link>
            <router-link class="font12 color-gray5 v_middle" to="/centerSales"><i class="al al-xiaoshou font18 color-red"></i>{{$t('Sales center')}}</router-link>
  				</div>
  			</div>
  		</div>
      <template v-if="activitydata.length > 0">
        <div class="bg-white mt5 padding10 b_top_after">
    			<span class="db-in pl5 font16 vline">{{ $t('Selection promotion') }}</span>
    		</div>
        <div class="b_top_after"></div>
        <div class="activitylist">
          <div v-for="(item,index) in activitydata" :key="item.id" class="bg-page">
            <Groupbuyitemplate v-if="item.type == 'groupbuy'">
				      <img slot="photo" style="width:80px;height:80px;" :src="item.photo" />
              <span slot="title">{{ item.title }}</span>
              <span slot="numbers">{{ item.numbers }}</span>
              <span slot="havetuan">{{ item.havetuan }}</span>
              <span slot="groupprice">{{ item.groupprice }}</span>
              <span slot="price">{{ item.price }}</span>
            </Groupbuyitemplate>
            <Bargainbuyitemplate v-if="item.type == 'bargainbuy'">
				      <img slot="photo" style="width:80px;height:80px;" :src="item.photo" />
              <span slot="title">{{ item.title }}</span>
              <span slot="saveprice">{{ item.saveprice }}</span>
              <span slot="minprice">{{ item.minprice }}</span>
              <span slot="price">{{ item.price }}</span>
            </Bargainbuyitemplate>
          </div>
        </div>
      </template>
      <template v-if="productdata.length > 0">
        <div class="bg-white mt5 padding10 b_top_after">
    			<span class="db-in pl5 font16 vline">{{ $t('All products') }}</span>
    		</div>
        <div class="b_top_after"></div>
        <div class="productlist squarepic">
          <Productitemplate v-for="(item,index) in productdata" :key="item.id">
            <img slot="photo" :src="item.photo" />
            <span slot="title">{{ item.title }}</span>
            <span slot="price" style="margin-left:1px;">{{ item.price }}</span>
            <span slot="saled" style="margin-left:1px;">{{ item.saled }}</span>
          </Productitemplate>
        </div>
      </template>
      <template v-if="toplinedata.length > 0">
        <div class="bg-white mt5 padding10 b_top_after">
          <div class="t-table">
            <div class="t-cell v_middle align_left">
      			     <span class="db-in pl5 font16 vline">{{ $t('Shop topline') }}</span>
            </div>
            <div class="t-cell v_middle align_right">
              <div class="qbtn4" style="padding: 3px 8px;line-height: 1;">
    						<i class="al al-shuaxin4 font12 mr3"></i><span>{{ $t('Another batch') }}</span>
    					</div>
            </div>
          </div>
    		</div>
        <div class="b_top_after"></div>
        <div class="productlist">
          <Newsitemplate v-for="(item,index) in toplinedata" :key="item.id">
            <img slot="photo" :src="item.photo" class="v_middle" style="width: 70px; height: 50px;" />
            <span slot="title">{{ item.title }}</span>
            <span slot="date">{{ item.dateline | dateformat }}</span>
          </Newsitemplate>
        </div>
      </template>
    </div>
    <div class="s-bottom flex_center">
      <div class="flex_cell bg-orange1 color-white h_100 flex_center" style="border-right:#fff 1px solid;"><i class="al al-pinglun color-fff font18" style="padding-right:3px;"></i>{{ $t('Online consulting') }}</div>
      <div class="flex_cell bg-red color-white h_100 flex_center"><i class="al al-weixin2 color-fff font18" style="padding-right:3px;"></i>{{ $t('Wechat contact') }}</div>
    </div>
  </div>
</template>

<i18n>
Selection promotion:
  zh-CN: 精选促销
All products:
  zh-CN: 全部商品
Online consulting:
  zh-CN: 在线咨询
Wechat contact:
  zh-CN: 微信联系
Shop topline:
  zh-CN: 店铺头条
Another batch:
  zh-CN: 换一批
</i18n>

<script>
import { Swiper } from 'vux'
import Groupbuyitemplate from './Groupbuyitemplate'
import Bargainbuyitemplate from './Bargainbuyitemplate'
import Productitemplate from './Productitemplate'
import Newsitemplate from './Newsitemplate'
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
      shopname: '潮优小铺',
      showdot: true,
      addata: [{
        url: 'javascript:',
        img: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204043604042.jpg?x-oss-process=image/crop||x_78||y_-36||w_736||h_408',
        title1: '欧美宽松潮牌国潮复古加绒卫衣男连帽韩版外套男女oversize青少年'
      }, {
        url: 'javascript:',
        img: 'http://ossgxs.boka.cn/month_201804/15226700508345.jpg',
        title1: '苹果手机'
      }, {
        url: 'javascript:',
        img: 'http://ossgxs.boka.cn/month_201803/15223015290656.jpg',
        title1: '维生素B族片'
      }],
      activitydata: [
        { 'id': 227, 'title': '团购:商品1', 'type': 'groupbuy', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15220608592056.jpg', 'groupprice': '0.50', 'numbers': '3', 'groupnumbers': '10', 'price': '1.00', 'havetuan': 0 },
        { 'id': 226, 'title': '砍价:你会给我买名牌包包吗？', 'type': 'bargainbuy', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15217043944267.jpg', 'minprice': '5.00', 'price': '10.00', 'saveprice': '5.00' },
        { 'id': 217, 'title': '团购:测试商品分享', 'type': 'groupbuy', 'photo': 'http://ossgxs.boka.cn/month_201803/15222371028755.jpg', 'groupprice': '0.50', 'numbers': '3', 'groupnumbers': '10', 'price': '1.00', 'saveprice': '0.50', 'havetuan': 0 },
        { 'id': 216, 'title': '团购:欧美宽松潮牌国潮复古加绒卫衣男连帽韩版外套男女oversize青少年', 'type': 'groupbuy', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204034569409.png', 'groupprice': '0.50', 'numbers': '3', 'groupnumbers': '10', 'limitbuy': '1', 'price': '1.00', 'saveprice': '0.50', 'havetuan': 0 },
        { 'id': 215, 'title': '团购:欧美简约假两件无袖背心男休闲嘻哈ulzzang青少年学生坎肩打底衫打底衫打底衫', 'type': 'groupbuy', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204032649156.png', 'groupprice': '0.01', 'numbers': '2', 'groupnumbers': '2', 'price': '1.00', 'saveprice': '0.99', 'havetuan': 2 },
        { 'id': 212, 'title': '团购:商品1', 'type': 'groupbuy', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15214217886785.jpg', 'groupprice': '0.50', 'numbers': '3', 'groupnumbers': '10', 'limitbuy': '1', 'price': '1.00', 'saveprice': '0.50', 'havetuan': 0 },
        { 'id': 211, 'title': '团购:商品1', 'type': 'groupbuy', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15214216879480.jpg', 'groupprice': '0.01', 'numbers': '2', 'groupnumbers': '2', 'limitbuy': '1', 'price': '1.00', 'saveprice': '0.99', 'havetuan': 3 }
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
      ],
      toplinedata: [
        { 'id': 96, 'title': '沈阳市毽球协会经验介绍 | 专题', 'dateline': 1522299789, 'photo': 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15222997918736' },
        { 'id': 93, 'title': '『销售电子商务』最新职位推荐', 'dateline': 1522237185, 'photo': 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15222371898745' },
        { 'id': 90, 'title': '【渠道运营】销售≠只说话！80％的销售员都错了', 'dateline': 1522218127, 'photo': 'http://gongxiaoshe.qiyeplus.com/data/upload//month_201713/15222181292017' }
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
  }
}
</script>

<style lang="less">
@import '../assets/fonts.less';
@import '../assets/global.less';

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

</style>
