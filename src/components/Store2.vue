<template>
  <div class="containerarea font14 s-havebottom store2">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="s-container scroll-container" style="top:0px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
        <div class="adbg" v-if="addata && addata.length == 1">
          <router-link class="inner" :to="addata[0].url">
            <img :src="addata[0].photo" />
          </router-link>
        </div>
        <swiper
          class="pic-swiper notitle"
          v-if="addata && addata.length > 1"
          :list="addata"
          dots-position="center"
          :interval="6000"
          :show-dots="isshowdot"
          :aspect-ratio="500/900"
          auto
          loop>
        </swiper>
        <template v-if="retailerInfo.uid">
          <div v-if="addata.length == 0" style="margin-top:26px;"></div>
          <div class="topbox flex_left b_top_after">
            <div class="pic-cell flex_right">
              <img :src="retailerInfo.avatar" />
            </div>
            <div class="flex_cell h_100 flex_left font14">
              <div class="w_100 clamp1">{{retailerInfo.title}}</div>
            </div>
            <div class="icon-cell flex_center">
              <div class="w_100 h_100 flex_center">
                <div class="w_100 align_center">
                  <div class="al al-fenxiang store2-color font16"></div>
                  <div class="font14 store2-color">分享</div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <!-- 超值优惠 -->
        <template v-if="showSuggest && suggestData.length">
          <div class="bg-white mt5 padding10 b_top_after db-flex suggest-area">
            <div class="flex_left flex_cell pl5 font16 vline"><span>超值优惠</span><i v-if="retailerInfo.uid == loginUser.uid" class="al al-wenhao font20 color-theme ml5" @click="clickHelp"></i></div>
            <div class="w80 flex_right" v-if="retailerInfo.uid == loginUser.uid" @click="clickSuggest">
              <div class="btn flex_center">不再显示</div>
            </div>
      		</div>
          <div class="b_top_after"></div>
          <div class="activitylist">
            <div v-for="(item,index) in suggestData" :key="item.id" class="bg-page">
              <router-link :to="{path:'/product',query:{id:item.id,wid:retailerInfo.uid}}" class="scroll_item mb5 font14 bg-white db">
            		<div class="t-table padding10 border-box">
            			<div class="t-cell v_middle" style="width:90px;">
                    <img slot="photo" class="imgcover" style="width:80px;height:80px;" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
            			</div>
            			<div class="t-cell v_middle">
            				<div class="clamp1">{{ item.title }}</div>
                    <div class="clear">
              				<div class="mt5 db-in">
              					<div class="color-red font14 middle-cell">{{ $t('RMB') }} {{item.price}}</div>
                				<div class="clamp1 font12 color-gray" v-if="loginUser.uid == retailerInfo.uid">佣金: {{ $t('RMB') }} {{ item.disrebate }}</div>
              				</div>
              				<div class="align_right db-in fr">
              					<div class="qbtn5 bg-red color-white">马上购买</div>
              				</div>
                    </div>
            			</div>
            		</div>
              </router-link>
            </div>
          </div>
        </template>
        <!-- 精选促销 -->
        <template v-if="activitydata && activitydata.length > 0">
          <div class="bg-white mt5 padding10 b_top_after">
      			<span class="db-in pl5 font16 vline">{{ $t('Selection promotion') }}</span>
      		</div>
          <div class="b_top_after"></div>
          <div class="activitylist">
            <div v-for="(item,index) in activitydata" :key="item.id" class="bg-page">
              <groupbuyitemplate :data="item" v-if="item.type == 'groupbuy'">
                <img slot="photo" class="imgcover" style="width:80px;height:80px;" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                <span slot="title">{{ item.title }}</span>
                <span slot="numbers">{{ item.numbers }}</span>
                <span slot="havetuan">{{ item.havetuan }}</span>
                <span slot="groupprice">{{ item.groupprice }}</span>
                <span slot="price">{{ item.price }}</span>
              </groupbuyitemplate>
              <bargainbuyitemplate :data="item" v-if="item.type == 'bargainbuy'">
                <img slot="photo" class="imgcover" style="width:80px;height:80px;" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                <span slot="title">{{ item.title }}</span>
                <span slot="saveprice">{{ item.saveprice }}</span>
                <span slot="minprice">{{ item.minprice }}</span>
                <span slot="price">{{ item.price }}</span>
              </bargainbuyitemplate>
            </div>
          </div>
        </template>
        <!-- 全部商品 -->
        <div class="bg-white mt5 padding10 b_top_after">
    			<span class="db-in pl5 font16 vline">{{ $t('All products') }}</span>
    		</div>
        <div class="b_top_after"></div>
        <div class="product-list" v-if="disproductdata">
          <div v-if="productdata.length == 0" class="emptyitem flex_center">暂无商品</div>
          <div class="fginner" v-for="(item,index) in productdata">
            <router-link class="list-item" :to="{path: '/product', query: {id: item.id, wid: item.uploader}}">
              <div class="inner">
                <img :src="item.photo" style="object-fit:cover;" />
                <div class="txt-area flex_left">
                  <div class="flex_left" style="width:70%;">
                    <div class="w_100 clamp1">{{item.title}}</div>
                  </div>
                  <div class="flex_right bold align_right" style="width:30%;">
                    <div class="w_100 clamp1">￥{{item.price}}</div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <template v-if="toplinedata.length > 0">
          <div class="bg-white mt5 pl12 pr12 pt10 pb10 b_top_after">
            <div class="t-table">
              <div class="t-cell v_middle align_left">
        			     <span class="db-in pl5 font16 vline">{{ $t('Shop topline') }}</span>
              </div>
              <div class="t-cell v_middle align_right">
                <div class="qbtn4" style="padding: 3px 8px;line-height: 1;" @click="changeNews">
      						<i class="al al-shuaxin4 font12 mr3"></i><span>{{ $t('Another batch') }}</span>
      					</div>
              </div>
            </div>
      		</div>
          <div class="b_top_after"></div>
          <div class="productlist">
            <newsitemplate :data="item" v-for="(item,index) in toplinedata" :key="item.id">
              <img slot="photo" class="v_middle imgcover" style="width: 70px; height: 50px;" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
              <span slot="title">{{ item.title }}</span>
              <span slot="date">{{ item.dateline | dateformat }}</span>
            </newsitemplate>
          </div>
        </template>
        <div v-if="query.wid && query.wid != loginUser.uid" class="pb10 pl10 pr10">
          <router-link to="/centerSales" class="btn-open db" style="background-color: #e10c00">我也要开店</router-link>
        </div>
        <div style="text-align: center;color:#999;height: 30px;line-height:30px;font-size: 14px;" v-if="scrollEnd">没有更多商品了！</div>
      </div>
      <div class="s-bottom flex_center list-shadow">
        <div @click="toChat" class="flex_cell color-white h_100 flex_center" style="background:#f9f9f9;">
          <i class="al al-zixun color-red font18 v_middle" style="padding-right:3px;"></i>
          <span class="v_middle" style="color:#323232">{{ $t('Online consulting') }}</span>
        </div>
        <div @click="favoriteevent" class="flex_cell color-white h_100 flex_center" style="background:#f9f9f9;">
          <i :class="`store2-color font18 v_middle al ${isfavorite ? 'al-shoucang3' : 'al-zan8' }`" style="margin-top:-1px;"></i>
        </div>
        <div class="flex_cell color-white h_100 flex_center" style="background:#f9f9f9" @click="clickWetchat"><i class="al al-weixin  font18" style="padding-right:3px;color:#36ab60;"></i><span style="color:#323232">{{ $t('Wechat contact') }}</span></div>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showqrcode" height="100%">
          <div class="popup1 h_100 flex_center font14 bg-black">
            <div class="flex_center" style="width:82%;height:82%;">
              <div class="align_center">
                <template v-if="!retailerInfo.qrcode || retailerInfo.qrcode == ''">
                  <router-link v-if="loginUser.uid == retailerInfo.uid" to="/retailerSetting" class="color-white bg-blue padding5 border-box" style="background-color: #0f96e8;border-radius:4px;">上传二维码</router-link>
                  <div v-else class="color-white bg-blue padding5 border-box" style="background-color: #0f96e8;border-radius:4px;">卖家没有上传二维码</div>
                </template>
                <template v-else>
                  <img :src="retailerInfo.qrcode" class="db" style="max-width:100%;max-height:100%;margin:0 auto 15px;">
          				<div class="color-white bg-blue padding5 border-box" style="background-color: #0f96e8;border-radius:4px;">长按识别二维码成为微信好友</div>
                </template>
        				<div style="margin-top:30px;">
        					<span class="db-in" @click="closepopup">
        						<i class="al al-close color-white font36"></i>
        					</span>
        				</div>
              </div>
            </div>
          </div>
        </popup>
      </div>
      <share-success
        v-show="showShareSuccess"
        v-if="retailerInfo.uploader == loginUser.uid || retailerInfo.identity != 'user'"
        :data="retailerInfo"
        :loginUser="loginUser"
        module="store"
        :on-close="closeShareSuccess">
      </share-success>
      <template v-if="showHelpModal">
        <tip-layer
          @clickClose="closeHelpModal"
          title="超值优惠"
          content="超值优惠商品是官方为你提供的爆款低价商品，帮助你转化客户，促进用户购买，用户购买完成后，你还可以获得商品的佣金奖励哦！">
        </tip-layer>
      </template>
    </template>
  </div>
</template>

<i18n>
Decoration shop:
  zh-CN: 装修店铺
Selection promotion:
  zh-CN: 精选促销
All products:
  zh-CN: 全部商品
Online consulting:
  zh-CN: 在线联系
Wechat contact:
  zh-CN: 微信联系
Shop topline:
  zh-CN: 店铺头条
Another batch:
  zh-CN: 换一批
</i18n>

<script>
import { Swiper, TransferDom, Popup, XImg } from 'vux'
import Groupbuyitemplate from '@/components/Groupbuyitemplate'
import Bargainbuyitemplate from '@/components/Bargainbuyitemplate'
import Productitemplate from '@/components/Productitemplate'
import Newsitemplate from '@/components/Newsitemplate'
import ShareSuccess from '@/components/ShareSuccess'
import TipLayer from '@/components/TipLayer'
import Sos from '@/components/Sos'

export default {
  name: 'Store1',
  props: {
    showSos: {
      type: Boolean,
      default: ''
    },
    sosTitle: {
      type: String,
      default: ''
    },
    showContainer: {
      type: Boolean,
      default: ''
    },
    module: {
      type: String,
      default: ''
    },
    query: {
      type: Object,
      default: {}
    },
    loginUser: {
      type: Object,
      default: {}
    },
    showShareSuccess: {
      type: Boolean,
      default: ''
    },
    retailerInfo: {
      type: Object,
      default: { avatar: 'https://tossharingsales.boka.cn/images/user.jpg' }
    },
    showqrcode: {
      type: Boolean,
      default: ''
    },
    showdot: {
      type: Boolean,
      default: ''
    },
    addata: {
      type: Array,
      default: []
    },
    activitydata: {
      type: Array,
      default: []
    },
    disproductdata: {
      type: Boolean,
      default: ''
    },
    productdata: {
      type: Array,
      default: []
    },
    toplinedata: {
      type: Array,
      default: []
    },
    favoritecss: {
      type: String,
      default: ''
    },
    isfavorite: {
      type: Boolean,
      default: ''
    },
    hideloading: {
      type: Boolean,
      default: ''
    },
    isNextNews: {
      type: Boolean,
      default: ''
    },
    haveMoreNews: {
      type: Boolean,
      default: ''
    },
    scrollEnd: {
      type: Boolean,
      default: ''
    },
    showSuggest: {
      type: Boolean,
      default: ''
    },
    suggestData: {
      type: Array,
      default: []
    },
    showHelpModal: {
      type: Boolean,
      default: ''
    },
    pageStart: {
      type: Number,
      default: 0
    },
    newPageStart: {
      type: Number,
      default: 0
    },
    fPageStart: {
      type: Number,
      default: 0
    },
    isGetProduct: {
      type: Boolean,
      default: ''
    },
    fProductLen: {
      type: Number,
      default: 0
    }
  },
  directives: {
    TransferDom
  },
  components: {
    Swiper, Popup, Groupbuyitemplate, Bargainbuyitemplate, Productitemplate, Newsitemplate, ShareSuccess, XImg, Sos, TipLayer
  },
  methods: {
    handleScroll (refname) {
      const scrollarea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      this.$emit('handleScroll', scrollarea)
    },
    favoriteevent () {
      this.$emit('favoriteevent')
    },
    closeHelpModal () {
      this.$emit('closeHelpModal')
    },
    toCenterSales () {
      this.$emit('toCenterSales')
    },
    toChat () {
      this.$emit('toChat')
    },
    clickWetchat () {
      this.$emit('clickWetchat')
    },
    closepopup () {
      this.$emit('closepopup')
    },
    closeShareSuccess () {
      this.$emit('closeShareSuccess')
    },
    clickHelp () {
      this.$emit('clickHelp')
    },
    clickSuggest () {
      this.$emit('clickSuggest')
    }
  }
}
</script>

<style lang="less" scoped>
.store2{
  background-color:#f2f3f2;
  .suggest-area{
    .btn{border:#ff6a61 1px solid;color:#ff6a61;width:70px;height:25px;border-radius:30px;font-size:12px;}
  }
}
.store2 .notop{margin-top:26px !important;}
.store2-color{color:#f9382c;}
.store2 .adbg{position:relative;padding-bottom: 55.555%;}
.store2 .adbg .inner{position:absolute;left:0;top:0;right:0;bottom:0;}
.store2 .adbg .inner img{vertical-align:middle;width:100%;height:100%;object-fit: cover;}
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

.store2 .collect{
  display:inline-block;vertical-align:middle;width:80px;box-sizing: border-box;font-size:13px;
  padding: 2px 0; background: #8e8e8e;color: #fff;border-radius: 50px;text-align: center;
}
.store2 .collect.have{background: #67cccc;}
.store2store2 .collect .txt:after{content:"收藏";}
.store2 .collect.have .txt:after{content:"已收藏"}
.store2 .staricon{margin-top:-2px;display:inline-block;}
.store2 .btn-open{
  background-color: #e10c00;
  color: #fff;
  font-size: 14px;
  text-align: center;
  border-radius: 4px;
  padding:8px;
  letter-spacing: 2px;
}
.store2 .topbox{
  width:100%;height:45px;position:relative;z-index:1;background:#fff;
  .pic-cell{
    width:80px;height:100%;padding-right:5px;
    img{width:60px;height:60px;border-radius:50%;margin-top:-30px;border:3px solid #fff;z-index:10;}
  }
  .icon-cell{width:50px;height:100%;}
}
.store2 .product-list{
  padding:10px;box-sizing:border-box;
  .list-item{
    width:100%;padding-bottom:100%;position:relative;display:block;
    .inner{
      position:absolute;left:0;top:0;right:0;bottom:0;
      img{width:100%;height:100%;border-radius:10px;}
    }
    .txt-area{
      position:absolute;left:0;bottom:0;right:0;
      padding:0 10px;height:45px;font-size:14px;
      box-sizing:border-box;background-color:rgba(0,0,0,0.5);color:white;
      border-bottom-left-radius:10px;border-bottom-right-radius:10px;
    }
  }
  .fginner:not(:first-child){margin-top:10px;}
}
</style>
