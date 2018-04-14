<template>
  <div :class="`containerarea bg-white font14 product ${showtopcss}`">
    <template v-if="currentuser.subscribe == 1 || currentuser.subscribe == 2">
      <div v-if="isshowtop" class="pagetop">
        <div class="t-table h_100">
          <router-link class="t-cell v_middle pl10" style="width:46px;" :to="{path:'centerService'}">
            <img class="v_middle" style="width:36px;height:36px;border-radius:50%" :src="currentuser.avatar" />
          </router-link>
          <router-link class="t-cell v_middle color-black" :to="{path:'centerService'}">
            <div>{{ currentuser.linkman }}</div>
            <div class="font12 color-orange">金币：{{ currentuser.credits }}</div>
          </router-link>
          <div class="t-cell v_middle align_center" style="width:65px;">
            <router-link class="db-in" style="position:relative;" :to="{path:'retailerMessagelist'}">
              <i class="al al-pinglun color-black" style="font-size:24px;"></i>
              <span v-if="messagecount > 0" class="numicon">{{ messagecount }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <router-link v-if="isshowtop" class="pagetop flex_center color-blue" :to="{path:'centerService'}">您有{{ waitgetcredit }}个金币，点击领取 ></router-link>
    </template>
    <div class="pagemiddle">
      <swiper
        :list="productflash"
        dots-position="center"
        :interval=6000
        :show-dots="isshowdot"
        :aspect-ratio="1/1"
        auto
        loop>
      </swiper>
      <div class="grouptitle flex_left" v-if="productdata.crowdtype == 'groupbuy'">
				<div class="col1"><span>￥</span><span class="font20 bold">{{ productdata.groupprice }}</span></div>
				<div class="col2"><div class="colicon">{{ productdata.numbers }}人团</div></div>
				<div class="col3">已团{{ productdata.havetuan }}件</div>
			</div>
      <div class="pt12 pb12 bg-white pl10 pr10 b_bottom_after">
    		<div class="clamp2">
          <span class="v_middle db-in bold"><span v-if="productdata.moderate != 1" class="color-gray bold">【已下架】</span>{{ productdata.title }}</span>
          <span v-if="isadmin" class="v_middle db-in color-gray font12">分享次数:{{ productdata.shares }}</span>
        </div>
        <div class="font24 color-red"><span class="font18 mr5">{{ $t('RMB') }}</span>{{ productdata.special }}</div>
        <div class="t-table font12 mt5 color-gray2">
					<div class="t-cell">快递: {{ productdata.postage }}元</div>
					<div class="t-cell pl10 align_right">销量: {{ productdata.saled }}件</div>
					<div v-if="productdata.buyonline != 1" class="t-cell align_right " @click="popupbuy">
						<span class="help-icon">?</span>了解购买流程
					</div>
				</div>
  		</div>
			<div class="groupbuarea" v-if="productdata.crowdtype == 'groupbuy'">
				<div class="bg-page" style="height:10px;"></div>
				<div class="bg-white">
					<div class="b_bottom_after padding10">正在开团，可直接参与</div>
          <div class="vux-marquee" item-height=110 duration=2000>
            <marquee>
              <marquee-item v-for="(item,index) in activitydata" :key="item.id">
                <Groupbuyitemplate style="margin-bottom:0 !important;">
                  <img slot="photo" style="width:80px;height:80px;" :src="item.photo" />
                  <span slot="title">{{ item.title }}</span>
                  <span slot="numbers">{{ item.numbers }}</span>
                  <span slot="havetuan">{{ item.havetuan }}</span>
                  <span slot="groupprice">{{ item.groupprice }}</span>
                  <span slot="price">{{ item.price }}</span>
                </Groupbuyitemplate>
              </marquee-item>
            </marquee>
          </div>
				</div>
			</div>
			<div class="evluatearea" v-if="productdata.buyonline >= 1 && evluatedata.length > 0">
				<div class="bg-page" style="height:10px;"></div>
				<div class="bg-white">
					<div class="b_bottom_after pl10 pr10 pt5 pb5">
						<div class="t-table">
							<div class="t-cell">宝贝评价</div>
							<div class="t-cell align_right">
								<div class="font12 color-red padding5" @click="popupevluate">查看更多></div>
							</div>
						</div>
					</div>
          <div class="scroll_list">
            <template v-if="evluatedata.length == 0">
              <div class="scroll_item emptyitem">
      					<div class="t-table">
      						<div class="t-cell" style="padding:10px;">暂无评价</div>
      					</div>
      				</div>
            </template>
            <div v-else v-for="(item,index) in evluatedata" :key="item.id" class="scroll_item padding10">
    					<div class="t-table">
    						<div class="t-cell pic" style="width:40px;">
    							<img class="avatarimg" :src="item.avatar" />
    						</div>
    						<div class="t-cell">{{ item.username }}</div>
    						<div class="t-cell color-gray font12 align_right" style="width:70px;">{{ item.dateline | dateformat }}</div>
    					</div>
    					<div class="mt5">{{ item.message }}</div>
    					<div class="mt5 align_right">
                <router-link class="bg-orange color-white qbtn" to="/retailerShop" style="width:50px;padding:0px;line-height:25px;">回复</router-link>
    					</div>
    					<div class="mt5" v-if="item.comment && item.comment.length > 0">
        				<div v-for="(citem,index1) in item.comment" :key="citem.id" class="border-box p0" style="background-color:#f7f7f7;">
        					<div class="title clear pt5 pb5">
        						<div class="color-gray font12" style="padding-left:6px;position:relative;">
        							<div class="bg-green" style="position: absolute;left: 0;top: 0px;bottom: 0px;width: 2px;"></div>
        							<span class="color-orange">{{ citem.username }}</span> 回复 :<span>{{ citem.message }}</span>
        						</div>
        					</div>
        				</div>
        			</div>
    				</div>
          </div>
				</div>
			</div>
      <template v-if="buyuserdata.length > 0">
        <div class="bg-page" style="height:10px;"></div>
        <div class="bg-white b_bottom_after">
          <div class="pt10 pl10 pr10">购买过本店商品的好友</div>
          <div class="buylist pt10 pb15 pl10 pr10">
            <router-link class="item" :to="{path:'/product',query:{id:item.uid}}" v-for="(item,index) in buyuserdata" :key="item.uid">
              <div class="align_center">
    						<img class="avatarimg" :src="item.avatar">
    					</div>
    					<div class="clamp1 mt5 font12 color-gray2">{{ item.username }}</div>
            </router-link>
          </div>
        </div>
      </template>
      <div class="flex_center pt10 pb10" style="background-color:#f6f6f6;color:#a5a5a5;">------ 详情 ------</div>
      <div class="b_top_after"></div>
      <router-link class="db b_bottom_after" style="padding:8px 15px;" :to="{path:'/retailerShop',query:{wid:retailerinfo.wid}}">
        <div class="flex_left">
          <i class="al al-dianpu1 icon-red" style="font-size:22px;"></i>
          <div class="pl10 bold">{{ retailerinfo.title }}</div>
        </div>
      </router-link>
      <div class="productcontent">
        <template v-if="productdata.content == ''">
          <img v-for="(item,index) in productflash" :key="index" :src="item.photo" />
        </template>
        <div v-else v-html="productdata.content"></div>
      </div>
      <div class="productarea scrollendarea scrollend" style="background-color:#f6f6f6;"></div>
    </div>
		<div class="pagebottom b_top_after" v-if="productdata.moderate != 1">
			<div class="t-table h_100">
				<div :class="`t-cell h_100 v_middle align_center btnfavorite ${favoritecss}`" style="width:100px;" @click="favoriteevent">
					<i class="al font12 mr3"></i>
        </div>
        <router-link class="t-cell bg-orange1 color-white h_100 v_middle align_center" to="/centerSales">我要咨询</router-link>
			</div>
		</div>
    <template v-else>
  		<div v-if="productdata.crowdtype == 'groupbuy'" class="pagebottom b_top_after groupbybottom">
  			<div class="t-table h_100">
          <router-link class="t-cell h_100 v_middle align_center" to="/centerSales" style="width:50px;">
            <div><i class="al al-buoumaotubiao10 font16 color-red"></i></div>
            <div class="font12">咨询</div>
          </router-link>
  				<div :class="`t-cell h_100 btnfavorite ${favoritecss} v_middle align_center font12`" style="width:50px;" @click="favoriteevent">
  					<i class="al font18 mr3"></i>
  				</div>
  				<div v-if="productdata.storage > 0" class="t-cell color-white h_100 v_middle align_center bg-orange1" @click="buyevent">
  					<div>{{ $t('RMB') }} {{ productdata.special }}</div>
  					<div>原价购买</div>
  				</div>
  				<div class="t-cell color-white h_100 v_middle align_center bg-red2" @click="buyevent">
  					<div>{{ $t('RMB') }} {{ productdata.groupprice }}</div>
  					<div>一键拼团</div>
  				</div>
  			</div>
  		</div>
      <template v-else>
    		<div v-if="productdata.buyonline >= 1" class="pagebottom b_top_after">
    			<div class="t-table h_100">
    				<div :class="`t-cell h_100 btnfavorite ${favoritecss} v_middle align_center`" style="width:100px;" @click="favoriteevent">
    					<i class="al font12 mr3"></i>
    				</div>
            <router-link class="t-cell bg-orange1 color-white h_100 v_middle align_center" to="/centerSales">我要咨询</router-link>
    				<div v-if="productdata.storage <= 0" class="t-cell color-white h_100 v_middle align_center bg-gray">已售罄</div>
    				<div v-else class="t-cell color-white h_100 v_middle align_center bg-red2" @click="buyevent">立即购买</div>
    			</div>
    		</div>
        <div v-else class="pagebottom b_top_after">
    			<div class="t-table h_100">
    				<div :class="`t-cell h_100 btnfavorite ${favoritecss} v_middle align_center`" style="width:100px;" @click="favoriteevent">
    					<i class="al font12 mr3"></i>
    				</div>
            <router-link class="t-cell bg-orange1 color-white h_100 v_middle align_center" to="/centerSales">我要咨询</router-link>
    			</div>
    		</div>
      </template>
    </template>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showpopup" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">购买流程</div>
          <div class="popup-middle font14">
            <div class="padding10">
  						<div class="mt12 color-gray2">您可以点击下方《我要咨询》，与卖家互加微信好友，以传统类似微商交易模式通过微信沟通咨询下单支付即可。</div>
  						<div class="mt12 color-gray2">温馨提示：</div>
  						<div class="mt12 color-gray2">1. 长按下方二维码关注公众号即可查询订单物流信息。</div>
  						<div class="mt12 color-gray2">2. 平台仅提供商品展示，线下交易出现任何纠纷平台概不负责。</div>
  						<div class="align_center">
  							<img style="max-width:50%;" :src="weixin_qrcode" />
  						</div>
  					</div>
          </div>
          <div class="popup-bottom flex_center bg-orange color-white" @click="closepopup">{{ $t('Know txt') }}</div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showevluate" height="100%">
        <div class="popup1">
          <div class="popup-top flex_center">评价</div>
          <div class="popup-middle font14">
            <div class="scroll_list">
              <template v-if="evluatedata.length == 0">
                <div class="scroll_item emptyitem">
        					<div class="t-table">
        						<div class="t-cell" style="padding:10px;">暂无评价</div>
        					</div>
        				</div>
              </template>
              <div v-else v-for="(item,index) in evluatedata" :key="item.id" class="scroll_item padding10">
      					<div class="t-table">
      						<div class="t-cell pic" style="width:40px;">
      							<img class="avatarimg" :src="item.avatar" />
      						</div>
      						<div class="t-cell">{{ item.username }}</div>
      						<div class="t-cell color-gray font12 align_right" style="width:70px;">{{ item.dateline | dateformat }}</div>
      					</div>
      					<div class="mt5">{{ item.message }}</div>
      					<div class="mt5 align_right">
                  <router-link class="bg-orange color-white qbtn" to="/retailerShop" style="width:50px;padding:0px;line-height:25px;">回复</router-link>
      					</div>
      					<div class="mt5" v-if="item.comment && item.comment.length > 0">
          				<div v-for="(citem,index1) in item.comment" :key="citem.id" class="border-box p0" style="background-color:#f7f7f7;">
          					<div class="title clear pt5 pb5">
          						<div class="color-gray font12" style="padding-left:6px;position:relative;">
          							<div class="bg-green" style="position: absolute;left: 0;top: 0px;bottom: 0px;width: 2px;"></div>
          							<span class="color-orange">{{ citem.username }}</span> 回复 :<span>{{ citem.message }}</span>
          						</div>
          					</div>
          				</div>
          			</div>
      				</div>
            </div>
          </div>
          <div class="popup-bottom flex_center bg-gray color-white" @click="closepopup1">{{ $t('Close') }}</div>
        </div>
      </popup>
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
import { Swiper, TransferDom, Popup, Marquee, MarqueeItem } from 'vux'
import Groupbuyitemplate from './Groupbuyitemplate'
import Bargainbuyitemplate from './Bargainbuyitemplate'
import Time from '../../libs/time'

export default {
  directives: {
    TransferDom
  },
  components: {
    Swiper,
    Groupbuyitemplate,
    Bargainbuyitemplate,
    Popup,
    Marquee,
    MarqueeItem
  },
  created () {
    let self = this
    this.$store.commit('updateToggleTabbar', {toggleBar: false})
    setTimeout(function () {
      self.isshowtop = false
      self.showtopcss = 'notop'
    }, 5000)
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd')
    }
  },
  data () {
    return {
      isadmin: true,
      showtopcss: '',
      currentuser: {
        uid: 187,
        avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg',
        subscribe: 0,
        linkman: 'YOUNG',
        credits: 350
      },
      messagecount: 5,
      isshowtop: true,
      waitgetcredit: 100,
      retailerinfo: { wid: 187, title: '潮优小铺' },
      showdot: true,
      showpopup: false,
      showevluate: false,
      weixin_qrcode: 'http://gongxiaoshe.qiyeplus.com/data/upload/qrcode.jpg',
      favoritecss: 'none',
      isfavorite: false,
      productflash: [{
        url: 'javascript:',
        img: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204043604042.jpg?x-oss-process=image/crop||x_78||y_-36||w_736||h_408',
        photo: 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204043604042.jpg?x-oss-process=image/crop||x_78||y_-36||w_736||h_408',
        title1: '欧美宽松潮牌国潮复古加绒卫衣男连帽韩版外套男女oversize青少年'
      }, {
        url: 'javascript:',
        img: 'http://ossgxs.boka.cn/month_201804/15226700508345.jpg',
        photo: 'http://ossgxs.boka.cn/month_201804/15226700508345.jpg',
        title1: '苹果手机'
      }, {
        url: 'javascript:',
        img: 'http://ossgxs.boka.cn/month_201803/15223015290656.jpg',
        photo: 'http://ossgxs.boka.cn/month_201803/15223015290656.jpg',
        title1: '维生素B族片'
      }],
      productdata: {
        id: 124,
        title: '苹果手机',
        photo: 'http://ossgxs.boka.cn/month_201804/15226700508345.jpg',
        price: '8,000.00',
        special: '8,000.00',
        shares: 7,
        saled: 1000,
        crowdtype: 'groupbuy',
        groupprice: '0.01',
        numbers: 2,
        havetuan: 3,
        postage: '0.00',
        moderate: 1,
        buyonline: 0,
        storage: 10,
        content: '维生素<img src="http://ossgxs.boka.cn/month_201803/15223015586456.jpg"><img src="http://ossgxs.boka.cn/month_201803/15223016278181.jpg"><img src="http://ossgxs.boka.cn/month_201803/15223016299171.jpg"><img src="http://ossgxs.boka.cn/month_201803/15223016329830.jpg"><img src="http://ossgxs.boka.cn/month_201803/15223016952520.jpg"><img src="http://ossgxs.boka.cn/month_201803/15223016975422.jpg">'
      },
      buyuserdata: [
        { uid: 2, username: '仇红波', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/2.jpg' },
        { uid: 16, username: 'gyp', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/16.jpg' },
        { uid: 31, username: '๓妖怪吧！', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/31.jpg' },
        { uid: 32, username: '有点小坏i', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/32.jpg' },
        { uid: 51, username: '贪吃小松鼠', avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/51.jpg' }
      ],
      activitydata: [
        { 'id': 227, 'title': '团购:商品1', 'type': 'groupbuy', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15220608592056.jpg', 'groupprice': '0.50', 'numbers': '3', 'groupnumbers': '10', 'price': '1.00', 'havetuan': 0 },
        { 'id': 217, 'title': '团购:测试商品分享', 'type': 'groupbuy', 'photo': 'http://ossgxs.boka.cn/month_201803/15222371028755.jpg', 'groupprice': '0.50', 'numbers': '3', 'groupnumbers': '10', 'price': '1.00', 'saveprice': '0.50', 'havetuan': 0 },
        { 'id': 216, 'title': '团购:欧美宽松潮牌国潮复古加绒卫衣男连帽韩版外套男女oversize青少年', 'type': 'groupbuy', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204034569409.png', 'groupprice': '0.50', 'numbers': '3', 'groupnumbers': '10', 'limitbuy': '1', 'price': '1.00', 'saveprice': '0.50', 'havetuan': 0 },
        { 'id': 215, 'title': '团购:欧美简约假两件无袖背心男休闲嘻哈ulzzang青少年学生坎肩打底衫打底衫打底衫', 'type': 'groupbuy', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204032649156.png', 'groupprice': '0.01', 'numbers': '2', 'groupnumbers': '2', 'price': '1.00', 'saveprice': '0.99', 'havetuan': 2 },
        { 'id': 212, 'title': '团购:商品1', 'type': 'groupbuy', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15214217886785.jpg', 'groupprice': '0.50', 'numbers': '3', 'groupnumbers': '10', 'limitbuy': '1', 'price': '1.00', 'saveprice': '0.50', 'havetuan': 0 },
        { 'id': 211, 'title': '团购:商品1', 'type': 'groupbuy', 'photo': 'http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15214216879480.jpg', 'groupprice': '0.01', 'numbers': '2', 'groupnumbers': '2', 'limitbuy': '1', 'price': '1.00', 'saveprice': '0.99', 'havetuan': 3 }
      ],
      evluatedata: [
        {
          id: 1,
          avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/1/187.jpg',
          username: 'YOUNG',
          dateline: 1522223051,
          message: '商品还行，还会打算买，还是会打算买的，你们看到了吗？？？？？',
          comment: [
            { id: 1, username: 'YOUNG', message: '感谢你的评论' }
          ]
        }
      ]
    }
  },
  watch: {
    showtopcss: function () {
      return this.showtopcss
    },
    isshowtop: function () {
      return this.isshowtop
    },
    favoritecss: function () {
      if (this.isfavorite) {
        this.favoritecss = 'have'
      } else {
        this.favoritecss = 'none'
      }
      return this.favoritecss
    },
    isfavorite: function () {
      if (this.isfavorite) {
        this.favoritecss = 'have'
      } else {
        this.favoritecss = 'none'
      }
      return this.isfavorite
    }
  },
  computed: {
    isshowdot: function () {
      if (this.productflash.length > 1) {
        this.showdot = true
      } else {
        this.showdot = false
      }
      return this.showdot
    },
    showtop: function () {
      let css = 'notop'
      if (this.isshowtop) {
        css = ''
      }
      return css
    }
  },
  methods: {
    popupbuy () {
      this.showpopup = true
    },
    closepopup () {
      this.showpopup = false
    },
    popupevluate () {
      this.showevluate = true
    },
    closepopup1 () {
      this.showevluate = false
    },
    favoriteevent () {
      this.isfavorite = !this.isfavorite
    },
    buyevent () {
      let self = this
      self.$router.push('/addOrder')
    }
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
.product .buylist:after{
  content:'';
  display:block;
  clear:both;
}
.product .buylist .item{
  float: left;
  width: 50px;
  text-align: center;
  display:block;
  color:inherit;;
}
.productcontent{
  padding:20px 15px;
}
.product .productcontent img{
  max-width:100%;
  vertical-align: middle;
}
.product .productarea.scrollend:after {
    background-color: #f6f6f6;
}

.product .pagetop{
  box-shadow: 0px 0px 10px 3px #d0d0d0;
}
.product .pagemiddle{top:50px;}
.product.notop .pagemiddle{top:0px;}
.product .numicon {
    position: absolute;
    top: 0;
    right: -15px;
    background: #f06825;
    padding: 0 1px;
    border-radius: 16%;
    color: #fff;
    font-size: 10px;
    min-width: 18px;
    text-align: center;
}
.product .vux-swiper-desc{display:none !important;}
.product .grouptitle{
  width:100%;
  height: 45px;
  color: #fff;
  font-size: 12px;
  background-image: url('../assets/images/productbg.png');
  background-repeat: no-repeat;
  background-position: left top;
  background-size: cover;
  position:relative;
}
.product .grouptitle .t-table{height:100%;}
.product .grouptitle .t-cell{height:100%;vertical-align:middle;}
.product .grouptitle .col1{padding-left:10px;padding-right:10px;display:inline-block;}
.product .grouptitle .col2{display:inline-block;margin-top:2px;}
.product .grouptitle .col3{
	display:inline-block;border-radius:10px;padding:1px 10px;text-align:center;background-color:rgba(0,0,0,0.1);
	position:absolute;right:10px;top:50%;margin-top:-9px;
}
.product .grouptitle .col2 .colicon{display:inline-block;border-radius:10px;border:#fff 1px solid;padding:1px 10px;text-align:center;}
.product .help-icon{
  color:#ff3b30;
  border:#ff3b30 1px solid;
  border-radius:50%;
  display:inline-block;
  width:13px;height:13px;
  font-size:10px;
  text-align:center;
  line-height:14px;
}

.product .btnfavorite.have .al:before{content:"\e68c";color:red;}
.product .btnfavorite.none .al:before{content:"\e68b";}
.product .groupbybottom .btnfavorite:after{display:block;}
.product .btnfavorite.none:after{content:"收藏";}
.product .btnfavorite.have:after{content:"已收藏";}
</style>
