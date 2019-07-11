<template>
  <div class="containerarea font14 centersales">
    <div class="bk-salestop">
      <div class="flex_left" style="height:108px;">
        <div class="img-cell">
          <img class="imgcover" :src="loginUser.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" @click="showBigimg(0)" />
          <div v-transfer-dom>
            <previewer :list="imgarr" ref="previewer"></previewer>
          </div>
        </div>
        <div class="txt-cell">
          <div class="font17 color-white">
            <span class="v_middle">{{ loginUser.linkman }}</span>
            <span class="vip-icon bg-gray color-white" v-if="retailerInfo.isretailer == 2" @click="onVip">VIP</span>
            <span class="vip-icon bg-orange color-white" v-if="retailerInfo.isretailer == 1" @click="onVip">VIP</span>
          </div>
          <div class="font13 color-white mt5">共销客—{{ $t('Business tool') }}</div>
        </div>
      </div>
      <div class="font0" style="position:absolute;top:20px;right:14px;height:35px;">
        <router-link class="db-in posi_r" style="color:#fff;" to="/messageList">
          <span class="al al-xiaoxi1 font24"></span>
          <span class="numicon" v-if="messages > 0 && messages < 100">{{ messages }}</span>
          <span class="numicon" v-if="messages >= 100">···</span>
        </router-link>
      </div>
      <div class="header-nav flex_table list-shadow02">
        <div class="flex_cell flex_center color-gray2" @click="toMiniGxk">
          <span class="nav_icon bg-orange al al-xiaochengxu font17"></span>
          <span class="ml10 font15">{{$t('Mini gxk')}}</span>
        </div>
        <div class="flex_cell flex_center color-gray2" @click="clickStore">
          <span class="nav_icon bg-blue11 al al-weidian1 font16"></span>
          <span class="ml10 font15">{{$t('My shop')}}</span>
        </div>
        <router-link class="flex_cell flex_center color-gray2" to="/retailerRevenue">
          <span class="nav_icon bg-red al al-qitashouru font16"></span>
          <span class="ml10 font15">{{$t('Myrevenue')}}</span>
        </router-link>
      </div>
    </div>
    <div v-if="!marqueeData || marqueeData.length == 0" class="bg-white" style="height:40px;"></div>
    <div v-else class="center-marquee">
      <marquee :item-height="30" :interval="5000" :duration="1000">
        <marquee-item v-for="(item,index) in marqueeData" :key="item.id">
          <group class="marqueeitem">
            <router-link :to="{path: '/stat', query: {id: item.moduleid, module: item.module}}" class="t-table font14 pl20 pr20 border-box" style="height:40px;">
              <div class="t-cell v_middle h_100">
                <div class="clamp1">
                  <span class="v_middle color-blue11 mr3">{{item.linkman}}</span>
                  <span class="v_middle color-gray">查看了《{{item.title}}》</span>
                </div>
              </div>
              <div class="t-cell v_middle h_100 font12 w100 align_right color-gray">{{ item.dateline | dateFormat }}</div>
            </router-link>
          </group>
        </marquee-item>
      </marquee>
    </div>
    <div class="list-shadow01">
      <grid :cols="3" class="bk-grid bg-white">
        <div class="gridlist">
          <grid-item :label="$t('Product')" :link="{path:'/retailerProductlist'}">
              <div slot="icon" style="position:relative;">
                <i class="al al-guanlizhongxin1"></i>
                <div class="numicon" v-if="retailerInfo.newproduct > 0 && retailerInfo.newproduct < 100">{{ retailerInfo.newproduct }}</div>
                <div class="numicon" v-if="retailerInfo.newproduct >= 100">···</div>
              </div>
          </grid-item>
        </div>
        <div class="gridlist">
          <grid-item :label="$t('Activity')" :link="{path:'/retailerActivitylist'}">
              <div slot="icon" style="position:relative;">
                <i class="al al-huodong"></i>
                <div class="numicon" v-if="retailerInfo.newactivity > 0 && retailerInfo.newactivity < 100">{{ retailerInfo.newactivity }}</div>
                <div class="numicon" v-if="retailerInfo.newactivity >= 100">···</div>
              </div>
          </grid-item>
        </div>
        <div class="gridlist">
          <grid-item :label="$t('News')" :link="{path:'/retailerNews'}">
            <div slot="icon" style="position:relative;">
              <i class="al al-xiangji-"></i>
              <div class="numicon" v-if="retailerInfo.newnews > 0 && retailerInfo.newnews < 100">{{ retailerInfo.newnews }}</div>
              <div class="numicon" v-if="retailerInfo.newnews >= 100">···</div>
            </div>
          </grid-item>
        </div>
        <template v-if="retailerInfo.products > 0">
          <div class="gridlist">
            <grid-item :label="$t('Rebate customer')" :link="{path:'/retailerSales'}" style="position:relative;">
              <div slot="icon">
                <i class="al al-kehu1"></i>
              </div>
              <span class="icon_hot"></span>
            </grid-item>
          </div>
          <div class="gridlist">
            <grid-item :label="$t('Sale chance')" :link="{path:'/retailerSalechance'}" style="position:relative;">
              <div slot="icon">
                <i class="al al-12shangpincuxiao"></i>
              </div>
              <div class="numicon" v-if="retailerInfo.newopportunity > 0 && retailerInfo.newopportunity < 100">{{ retailerInfo.newopportunity }}</div>
              <div class="numicon" v-if="retailerInfo.newopportunity >= 100">···</div>
            </grid-item>
          </div>
          <div class="gridlist">
            <grid-item :label="$t('Contact customer')" :link="{path:'/retailerCustomerlist'}" style="position:relative;">
              <div slot="icon">
                <i class="al al-lianxiren"></i>
              </div>
              <div class="numicon" v-if="retailerInfo.newcustomers > 0 && retailerInfo.newcustomers < 100">{{ retailerInfo.newcustomers }}</div>
              <div class="numicon" v-if="retailerInfo.newcustomers >= 100">···</div>
            </grid-item>
          </div>
        </template>
        <template v-else>
          <div class="gridlist disabled" @click="clickDisabled">
            <grid-item :label="$t('Rebate customer')" style="position:relative;">
              <div slot="icon">
                <i class="al al-xiaoshou db-in"></i>
              </div>
              <span class="icon_hot"></span>
            </grid-item>
          </div>
          <div class="gridlist disabled" @click="clickDisabled">
            <grid-item :label="$t('Sale chance')">
              <div slot="icon">
                <i class="al al-yewujihui db-in"></i>
              </div>
            </grid-item>
          </div>
          <div class="gridlist disabled" @click="clickDisabled">
            <grid-item :label="$t('Contact customer')">
              <div slot="icon">
                <i class="al al-lianxiren db-in"></i>
              </div>
            </grid-item>
          </div>
        </template>
      </grid>
    </div>
    <group class="list-shadow02 order_list_show posi_r">
      <cell :link="{path:'/subCommission'}" style="position:relative">
        <div slot="icon" class="pr10" style="width:18px;overflow:hidden;"><i class="al al-maijiaxiu21 color-orange db-in bold font20" style="margin-left:-4px;"></i></div>
        <div slot="inline-desc">
          <span class="font15">每月分佣</span>
        </div>
      </cell>
      <cell :link="{path:'/centerSeller',query: {uid:retailerInfo.uid,wid:retailerInfo.uid}}" style="position:relative">
        <div slot="icon" class="pr10" style="width:18px;overflow:hidden;"><i class="al al-maijiaxiu21 color-orange db-in bold font20" style="margin-left:-4px;"></i></div>
        <div slot="inline-desc">
          <span class="font15">{{$t('Seller show')}}</span>
        </div>
      </cell>
      <template v-if="retailerInfo.products > 0">
        <cell :link="{path:'/retailerOrders'}" style="position:relative">
          <div slot="icon" class="pr10"><i class="al al-dingdan color-red4 db-in font16"></i></div>
          <div slot="inline-desc">
            <span class="font15">{{$t('Order list')}}</span>
          </div>
          <div slot="child">
            <div class="numicon" v-if="retailerInfo.neworders > 0 && retailerInfo.neworders < 100">{{ retailerInfo.neworders }}</div>
            <div class="numicon" v-if="retailerInfo.neworders >= 100">···</div>
          </div>
        </cell>
      </template>
      <template v-else >
        <cell class="listitem disabled" @click.native.stop="clickDisabled">
          <div slot="icon" class="pr10"><i class="al al-dingdan color-red4 db-in font16"></i></div>
          <div slot="inline-desc">
            <span class="font15">{{$t('Order list')}}</span>
          </div>
        </cell>
      </template>
      <cell :link="{path:'/retailerReport', query:{wid: retailerInfo.uid}}" style="position:relative">
        <div slot="icon" class="pr10"><i class="al al-zongshuju db-in font18" style="color:#efa42e;"></i></div>
        <div slot="inline-desc">
          <span class="font15">{{$t('Business report')}}</span>
        </div>
      </cell>

      <!-- 我的推荐 -->
      <!-- <cell :link="{path:'/retailerRecommands', query:{wid: retailerInfo.uid}}" style="position:relative">
        <div slot="icon" class="pr10"><i class="al al-kehu1 db-in font18 color-red4"></i></div>
        <div slot="inline-desc">
          <span class="font15">{{$t('Retailer recommand')}}</span>
        </div>
      </cell> -->

      <template>
        <cell :link="{path:'/retailerSetting'}" style="position:relative">
          <div slot="icon" class="pr10"><i class="al al-guanlizhongxin db-in font18" style="color:#efa42e;"></i></div>
          <div slot="inline-desc">
            <span class="font15">{{$t('Setting')}}</span>
          </div>
        </cell>
        <cell :link="{path:'/factoryList'}" v-if="loginUser.whoseagent && loginUser.whoseagent.length > 0" style="position:relative">
          <div slot="icon" class="pr10"><i class="al al-yaoqing1 color-red4 db-in font20"></i></div>
          <div slot="inline-desc">
            <span class="font15">{{$t('I want to distribute')}}</span>
          </div>
        </cell>
        <!--
        <cell style="position:relative" @click.native.stop="inviteEvent">
          <div slot="icon" class="pr10"><i class="al al-zan7 color-red4 db-in font14"></i></div>
          <div slot="inline-desc">
            <span class="font15">邀请入驻赚奖励</span>
          </div>
        </cell>
      -->
        <!-- <cell style="position:relative" @click.native.stop="downPhoto">
          <div slot="icon" class="pr10"><i class="al al-zan7 color-red4 db-in font14"></i></div>
          <div slot="inline-desc">
            <span class="font15">开店证明</span>
          </div>
        </cell> -->
      </template>
    </group>
    <router-link class="bottom_propaganda db" to="/retailerAcademic" v-if="loginUser.whoseagent && loginUser.whoseagent.length > 0">
      <img src="../assets/images/business.png" width="100%" class="db"/>
    </router-link>
    <div class="modalarea modalarea1 flex_center store-modal" style="position:fixed;" v-if="showPopupStore">
      <div class="modal">
        <div class="pagetop flex_left font16 pl10 pr10">
          <div class="close flex_center" @click="closeStoreModal"><i class="al al-guanbi"></i></div>
        </div>
        <div class="pagemiddle flex_center" style="bottom:0px;">
          <div class="w_100">
            <div class="btn bg-green color-white" @click="toStore(0)">公众号店铺</div>
            <div class="btn bg-blue color-white" @click="toStore(1)" style="margin-top:20px;">小程序店铺</div>
          </div>
        </div>
      </div>
    </div>
    <div class="modalarea modalarea1 flex_center" style="position:fixed;" v-if="showGxh">
      <div class="modal">
        <div class="pagetop flex_left font16 pl10 pr10">
          <span>识别二维码进入店铺</span>
          <div class="close flex_center" @click="closeQrcodeModal"><i class="al al-guanbi"></i></div>
        </div>
        <div class="pagemiddle flex_center" style="bottom:0px;">
          <img src="https://tossharingsales.boka.cn/minigxk/miniGxhQrcode.jpg" style="width:55%;"/>
        </div>
      </div>
    </div>
    <div class="modalarea modalarea1 flex_center" style="position:fixed;" v-if="showGxk">
      <div class="modal">
        <div class="pagetop flex_left font16 pl10 pr10">
          <span>识别二维码进入小程序</span>
          <div class="close flex_center" @click="closeGxk"><i class="al al-guanbi"></i></div>
        </div>
        <div class="pagemiddle flex_center" style="bottom:0px;">
          <img src="https://tossharingsales.boka.cn/minigxk/miniGxkQrcode.png" style="width:55%;"/>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
Sales center:
  zh-CN: 卖家中心
Content manage:
  zh-CN: 内容管理
Activity:
  zh-CN: 活动
Product:
  zh-CN: 商品
News:
  zh-CN: 文章
Customer mange:
  zh-CN: 客户管理
Rebate customer:
  zh-CN: 返点客
Sale chance:
  zh-CN: 销售机会
Contact customer:
  zh-CN: 联系客户
Order manage:
  zh-CN: 订单管理
Order entry:
  zh-CN: 订单录入
Order list:
  zh-CN: 订单列表
Divider text:
  zh-CN: 如有其他疑问或建议，可联系客服
With the customer rebate money together!:
  zh-CN: 与返点客一起赚钱!
</i18n>

<script>
import { Previewer, TransferDom, Group, GroupTitle, Cell, XButton, Box, Card, Grid, GridItem, Marquee, MarqueeItem, CellBox, XImg } from 'vux'
import Time from '#/time'
import ENV from 'env'

export default {
  name: 'CenterSales',
  props: {
    loginUser: {
      type: Object,
      default: {}
    },
    retailerInfo: {
      type: Object,
      default: {}
    },
    marqueeData: {
      type: Array,
      default: []
    },
    messages: {
      type: Number,
      default: 0
    }
  },
  directives: {
    TransferDom
  },
  components: {
    Previewer, Group, GroupTitle, Cell, XButton, Box, Card, Grid, GridItem, Marquee, MarqueeItem, CellBox, XImg
  },
  filters: {
    dateFormat (date) {
      return new Time(date * 1000).format()
    }
  },
  data () {
    return {
      imgarr: [],
      wximgarr: [],
      showPopupStore: false,
      storeKey: null,
      storeArr: [
        { key: 0, value: '公众号店铺' },
        { key: 1, value: '小程序店铺' }
      ],
      showGxh: false,
      showGxk: false
    }
  },
  watch: {
    retailerInfo () {
      return this.imgarr
    },
    marqueeData () {
      return this.wximgarr
    }
  },
  methods: {
    onVip () {
      this.$emit('vip-event')
    },
    showBigimg (index) {
      const self = this
      if (self.imgarr.length === 0) {
        self.imgarr.push({
          msrc: self.retailerInfo.avatar,
          src: self.retailerInfo.avatar
        })
        self.wximgarr.push(self.retailerInfo.avatar)
      }
      if (self.$util.isPC()) {
        self.$refs.previewer.show(index)
      } else {
        window.WeixinJSBridge.invoke('imagePreview', {
          current: self.wximgarr[index],
          urls: self.wximgarr
        })
      }
    },
    clickDisabled () {
      const self = this
      self.$vux.confirm.show({
        content: '请先添加商品再使用该功能哦！',
        confirmText: '添加商品',
        onConfirm () {
          self.$router.push({path: '/addProduct'})
        }
      })
    },
    inviteEvent () {
      this.$vux.alert.show({
        title: '',
        content: '点击右上角“···”分享当前页面给好友，每成功邀请一位卖家入驻共销客，即可获得30元推荐奖励金，推荐奖励金将发放到“我的收入”中，卖家入驻成功即可立即提现！'
      })
    },
    clickStore () {
      this.showPopupStore = true
    },
    closeQrcodeModal () {
      this.showGxh = false
    },
    closeStoreModal () {
      this.showPopupStore = false
    },
    toStore (val) {
      if (val === 0) {
        this.showPopupStore = false
        this.$router.push({path: '/store', query: {wid: this.retailerInfo.uid}})
      } else if (val === 1) {
        this.showPopupStore = false
        this.showGxh = true
      }
    },
    toMiniGxk () {
      this.showGxk = true
    },
    closeGxk () {
      this.showGxk = false
    },
    downPhoto () {
      this.$http.post(`${ENV.BokaApi}/api/retailer/createProof`, {from: 'gxk'})
    }
  }
}
</script>

<style lang="less">
.bk-salestop {
  width: 100%;
  height: 130px;
  background-image: url(../assets/images/bannerbg1.png);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
}

.bk-salestop .img-cell{
  padding-left:14px;
  padding-right:14px;
  width:68px;
  height:68px;
}

.bk-salestop .img-cell img{
  display: block;
  width: 68px;
  height: 68px;
  border-radius: 50%;
}
.bk-salestop .header-nav{
  position: relative;
  margin: 0 14px;
  height: 45px;
  background-color: #fff;
  z-index: 2;
  border-radius: 45px;
}
.bk-salestop .nav_icon{
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  text-align: center;
  color:white;
}
.bk-salestop .nav_icon01{
  background-color: #ea3a3a
}
.centersales .center-marquee{
  height:30px;
  position:relative;
  padding: 25px 0 15px 0;
  background-color:#fff;
}
.centersales .center-marquee .vux-marquee li{height:30px;}
.centersales .weui-cells:before,.centersales .weui-cells:after{display: none;}
.centersales .weui-cells{margin-top:10px;}
.centersales .weui-cell{padding:10px 18px;}
.centersales .weui-grids{padding: 0px 7px 3px 7px;}
.centersales .weui-grids .weui-grid{border-radius:10px;box-shadow: 0 0 4px 1px rgba(0,0,0,0.15);}
.centersales .weui-grids .gridlist:nth-child(1) .weui-grid{background: linear-gradient(#f2ad3d, #ed9a1e);}
.centersales .weui-grids .gridlist:nth-child(2) .weui-grid{background: linear-gradient(#f25a5c, #ed3939);}
.centersales .weui-grids .gridlist:nth-child(3) .weui-grid{background: linear-gradient(#3fcc86, #34a86c);}
.centersales .weui-grids .gridlist:nth-child(4) .weui-grid{background: linear-gradient(#3eb4f1, #099ded);}
.centersales .weui-grids .gridlist:nth-child(5) .weui-grid{background: linear-gradient(#f25c7d, #ed2d5a);}
.centersales .weui-grids .gridlist:nth-child(6) .weui-grid{background: linear-gradient(#7974f6, #615aec);}
.centersales .weui-grids .gridlist.disabled .weui-grid{background: linear-gradient(#b9b9b9, #afafaf);}
.listitem.disabled {position:relative;background-color:#d8d8d8;}

.icon_hot{
  position: absolute;
  height:40px;
  width:40px;
  right:0px;
  top:0px;
  text-align: center;
  background: linear-gradient(45deg, transparent 50%, #ea3a3a 0%);
  background-size: 100% 100%;
  border-top-right-radius: 10px;
}
.icon_hot:before{
  content:"HOT";
  display:block;
  font-size: 12px;
  color:#fff;
  transform: rotate(45deg);
  position: absolute;
  top: 5px;
  right: 1px;
}
.centersales .weui-grid__icon{width:35px;height:35px;padding-top: 22%;text-shadow: 0px 0px 10px rgba(0,0,0,0.15);}
.centersales .weui-grid__icon i{height:35px;font-size: 34px;display:inline-block;color:#fff;width: 35px;text-align: center;}
.centersales .weui-grid__icon i::before{display: block;height: 35px;line-height: 35px;}
.centersales .bk-grid .weui-grid__label{color:#fff;}
.centersales .weui-grid:before,.centersales .weui-grid:after,.centersales .weui-grids:before,.centersales .weui-grids:after{display: none;}
.centersales  .gridlist{
  width:33.3333%;
  position: relative;
  float: left;
  padding: 0px 5px;
  margin-bottom:20px;
  box-sizing: border-box;
}
.centersales .weui-grid{
  width: 90%;
  height: 0;
  padding-bottom: 90%;
  display: block;
  margin: 0 auto;
  float: none;
  padding-left:0;
  padding-right: 0;
  padding-top: 0;
}
.centersales .weui-grid__icon + .weui-grid__label{margin-top:10%;font-size: 15px;}
@media (max-width:361px) {
  .centersales .weui-grid__icon{padding-top:20%;}
  .centersales .weui-grid__icon + .weui-grid__label{margin-top:5%;font-size: 14px;}
  .centersales .weui-grid__icon i{font-size: 30px;}
}

.bk-salestop .right-cell {
  flex: 1;
  height: 100%;
  position: relative;
}

.bk-salestop .right-cell .right-content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 0;
}

.bk-salestop .right-cell .title-area {
  font-size: 18px !important;
  color: #fff;
}

.bk-salestop .right-cell .nav-area{
  position: relative;
}

.bk-salestop .right-cell .btns-area{
  position: absolute;
  right: 20px;
}

.bk-salestop .numicon{
  position: absolute;
  top: -5px;
  right: -8px;
  background: #eb3a3b;
  border-radius: 50%;
  color: #fff;
  font-size: 8pt;
  min-width: 18px;
  min-height:18px;
  line-height: 16px;
  border:1px solid #fff;
  text-align: center;
}
.grid-title {
  background-color: #efeff4;
  color: #716f76;
  padding: 10px 15px;
  font-size: 14px;
}
.bk-grid .weui-grid__label{color:#666;}
.bk-grid .numicon{
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ea3a3a;
  padding:1px;
  border-radius: 50%;
  color: #fff;
  font-size: 8pt;
  min-width: 18px;
  min-height:18px;
  line-height: 16px;
  border:1px solid #fff;
  text-align: center;
}
.bk-grid.disable{color:#a6a6a6 !important;}
.order_list_show .numicon{
  position: absolute;
  top: 11px;
  right: 32px;
  background: #ea3a3a;
  padding:1px;
  border-radius: 50%;
  color: #fff;
  font-size: 8pt;
  min-width: 18px;
  min-height:18px;
  line-height: 16px;
  border:1px solid #fff;
  text-align: center;
}
.vip-icon{display:inline-block;border-radius:5px;width:28px;height:20px;line-height:20px;text-align:center;font-size:13px !important;vertical-align:middle;}
.store-modal .btn{width:80%;margin: 0 auto;border-radius:10px;height:45px;line-height:45px;text-align:center;font-size:16px;}
</style>
