<template>
  <div class="containerarea font14 centersales">
    <div class="bk-salestop">
      <div class="flex_left" style="height:108px;">
        <div class="img-cell" v-if="factoryInfo.photo && factoryInfo.photo != ''">
          <img
            class="imgcover"
            :src="factoryInfo.photo"
            onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"
            @click="showBigimg(0)" />
          <div v-transfer-dom>
            <previewer :list="factoryInfo.photoArr" ref="previewer"></previewer>
          </div>
        </div>
        <div class="txt-cell pl10" style="padding-right:50px;">
          <div class="font17 color-white">{{ factoryInfo.company }}旗舰店</div>
          <div class="font13 color-white mt5">{{ factoryInfo.summary }}</div>
          <div class="font13 mt5" style="color:#f1f78f;" @click="showToast">厂家使用期至：{{endTime}}</div>
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
        <div class="flex_cell flex_center color-gray2" @click="disJoinQrcode">
          <span class="nav_icon bg-blue11 al al-a166 font16"></span>
          <span class="ml10 font15">全职加盟码</span>
        </div>
        <div class="flex_cell flex_center color-gray2" to="/factoryRevenue" @click="toRevenue">
          <span class="nav_icon bg-red al al-qitashouru font16"></span>
          <span class="ml10 font15">{{$t('Myrevenue')}}</span>
        </div>
      </div>
    </div>
    <div class="bg-white" style="height:40px;"></div>
    <div class="list-shadow01">
      <grid :cols="3" class="bk-grid bg-white">
        <div class="gridlist">
          <grid-item :label="$t('Product')" :link="{path:'/factoryProductlist', query: {fid: factoryInfo.id}}">
              <div slot="icon" style="position:relative;">
                <i class="al al-guanlizhongxin1"></i>
                <div class="numicon" v-if="factoryInfo.newproduct > 0 && factoryInfo.newproduct < 100">{{ factoryInfo.newproduct }}</div>
                <div class="numicon" v-if="factoryInfo.newproduct >= 100">···</div>
              </div>
          </grid-item>
        </div>
        <div class="gridlist" v-if="query.from">
          <grid-item :label="$t('Activity')" :link="{path:'/factoryActivitylist'}">
              <div slot="icon" style="position:relative;">
                <i class="al al-huodong"></i>
                <div class="numicon" v-if="factoryInfo.newactivity > 0 && factoryInfo.newactivity < 100">{{ factoryInfo.newactivity }}</div>
                <div class="numicon" v-if="factoryInfo.newactivity >= 100">···</div>
              </div>
          </grid-item>
        </div>
        <div class="gridlist">
          <grid-item :label="$t('News')" :link="{path:'/factoryNewsList', query: {fid: factoryInfo.id}}">
            <div slot="icon" style="position:relative;">
              <i class="al al-xiangji-"></i>
              <div class="numicon" v-if="factoryInfo.newnews > 0 && factoryInfo.newnews < 100">{{ factoryInfo.newnews }}</div>
              <div class="numicon" v-if="factoryInfo.newnews >= 100">···</div>
            </div>
          </grid-item>
        </div>
        <div class="gridlist">
          <grid-item :label="$t('Seller')" :link="{path:`/sellerList?id=${factoryInfo.id}`}" style="position:relative;">
            <div slot="icon">
              <i class="al al-kehu1"></i>
            </div>
          </grid-item>
        </div>
        <div class="gridlist">
          <grid-item label="经销商等级" :link="{path:`/agentLevel?id=${factoryInfo.id}`}" style="position:relative;">
            <div slot="icon">
              <i class="al al-dengji"></i>
            </div>
          </grid-item>
        </div>
        <!--
        <div class="gridlist">
          <grid-item :label="$t('Stat')" :link="{path:`/stat?module=factory&id=${factoryInfo.id}`}" style="position:relative;">
            <div slot="icon">
              <i class="al al-zongshuju"></i>
            </div>
          </grid-item>
        </div>
      -->
        <div class="gridlist">
          <grid-item :label="$t('Business school')" :link="{path: '/businessSchool', query: {fid: factoryInfo.id}}" style="position:relative;">
            <div slot="icon">
              <i class="al al-address"></i>
            </div>
          </grid-item>
        </div>
        <div class="gridlist">
          <grid-item label="优惠码" :link="{path:`/concession?id=${factoryInfo.id}`}" style="position:relative;">
            <div slot="icon">
              <i class="al al-youhuima" style="font-size:30px;"></i>
            </div>
          </grid-item>
        </div>
        <!-- <div class="gridlist">
          <grid-item label="权限管理" :link="{path:`/factoryUser?id=${factoryInfo.id}`}" style="position:relative;">
            <div slot="icon">
              <i class="al al-icon12345" style="font-size:30px;"></i>
            </div>
          </grid-item>
        </div> -->
        <div class="gridlist">
          <grid-item label="厂家电脑后台" :link="{path:'/FactoryLink'}" style="position:relative;">
            <div slot="icon">
              <i class="al al-guanlifill" style="font-size:30px;"></i>
            </div>
          </grid-item>
        </div>
        <div class="gridlist">
          <grid-item label="客户管理" :link="{path:'/factoryCustomer'}" style="position:relative;">
            <div slot="icon">
              <i class="al al-lianxiren"></i>
            </div>
          </grid-item>
        </div>
        <div class="gridlist">
          <grid-item label="厂家管理" :link="{path:'/factoryManagerList', query: {fid: loginUser.fid}}" style="position:relative;">
            <div slot="icon">
              <i class="al al-peoplefill"></i>
            </div>
          </grid-item>
        </div>
      </grid>
    </div>
    <group class="list-shadow02 order_list_show posi_r">
      <cell :link="{path:'/factoryOrders'}" style="position:relative">
        <div slot="icon" class="pr10"><i class="al al-dingdan color-blue11 db-in font18"></i></div>
        <div slot="inline-desc">
          <span class="font15">{{$t('Order list')}}</span>
        </div>
        <div slot="child">
          <div class="numicon" v-if="factoryInfo.neworders > 0 && factoryInfo.neworders < 100">{{ factoryInfo.neworders }}</div>
          <div class="numicon" v-if="factoryInfo.neworders >= 100">···</div>
        </div>
      </cell>
      <cell :link="{path:'/factoryDetail'}" style="position:relative">
        <div slot="icon" class="pr10"><i class="al al-shouye1 color-red db-in font18"></i></div>
        <div slot="inline-desc">
          <span class="font15">{{$t('Factory introduction')}}</span>
        </div>
      </cell>
      <cell :link="{path:'/sellerDetail'}" style="position:relative">
        <div slot="icon" class="pr10"><i class="al al-kehu1 color-blue db-in font18"></i></div>
        <div slot="inline-desc">
          <span class="font15">经销商介绍</span>
        </div>
      </cell>
      <cell :link="{path:'/factoryReport', query:{fid: factoryInfo.id}}" style="position:relative">
        <div slot="icon" class="pr10"><i class="al al-zongshuju db-in font18" style="color:#efa42e;"></i></div>
        <div slot="inline-desc">
          <span class="font15">{{$t('Business report')}}</span>
        </div>
      </cell>
      <cell :link="{path:'/addFactory', query:{id: factoryInfo.id}}" style="position:relative">
        <div slot="icon" class="pr10"><i class="al al-guanlizhongxin color-red4 db-in font18"></i></div>
        <div slot="inline-desc">
          <span class="font15">{{$t('Setting')}}</span>
        </div>
      </cell>
    </group>
    <div v-transfer-dom class="x-popup">
      <popup v-model="showQrcode" height="100%">
        <div class="popup1 font14">
          <div class="popup-top flex_center">全职加盟码</div>
          <div class="popup-middle padding10 border-box flex_center" style="bottom:86px;">
            <img ref="joinQrcode" class="qrcode" style="max-width:100%;max-height:100%;" />
          </div>
          <div class="flex_center border-box pl10 pr10 color-red font12" style="position:absolute;left:0;right:0;bottom:46px;height:40px;">
            <div>保存图片发送给好友，邀请加盟</div>
          </div>
          <div class="popup-bottom flex_center">
            <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeQrcode">{{ $t('Close') }}</div>
          </div>
        </div>
      </popup>
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
import { Previewer, TransferDom, Group, GroupTitle, Cell, XButton, Box, Card, Grid, GridItem, Marquee, MarqueeItem, CellBox, XImg, Popup } from 'vux'
import Time from '#/time'
import ENV from 'env'

export default {
  name: 'CenterFactory',
  props: {
    query: {
      type: Object,
      default: {}
    },
    loginUser: {
      type: Object,
      default: {}
    },
    factoryInfo: {
      type: Object,
      default: {}
    },
    endTime: {
      type: String,
      default: ''
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
    Previewer, Group, GroupTitle, Cell, XButton, Box, Card, Grid, GridItem, Marquee, MarqueeItem, CellBox, XImg, Popup
  },
  filters: {
    dateFormat (date) {
      return new Time(date * 1000).format()
    }
  },
  data () {
    return {
      showQrcode: false
    }
  },
  watch: {
  },
  methods: {
    showToast () {
      let _this = this
      _this.$vux.toast.show({
        text: '请联系管理员进行续费',
        type: 'text',
        width: '220px'
      })
    },
    disJoinQrcode () {
      const self = this
      self.showQrcode = true
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/factory/joinQRCode`, {
        fid: self.loginUser.fid
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        if (data.flag === 1) {
          let img = self.$refs.joinQrcode[0] ? self.$refs.joinQrcode[0] : self.$refs.joinQrcode
          img.src = data.data
        } else {
          self.$vux.toast.show({
            text: data.error,
            time: self.$util.delay(data.error)
          })
        }
      })
    },
    closeQrcode () {
      this.showQrcode = false
    },
    showBigimg (index) {
      const self = this
      if (self.$util.isPC()) {
        self.$refs.previewer.show(index)
      } else {
        window.WeixinJSBridge.invoke('imagePreview', {
          current: self.factoryInfo.photo,
          urls: [self.factoryInfo.photo]
        })
      }
    },
    toRevenue () {
      this.$router.push({path: 'factoryRevenue', query: {fid: this.loginUser.fid}})
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
.centersales .weui-grids .gridlist:nth-child(7) .weui-grid{background: linear-gradient(#9364f2, #694ba6);}
.centersales .weui-grids .gridlist:nth-child(8) .weui-grid{background: linear-gradient(#fac45b, #efac2c);}
.centersales .weui-grids .gridlist:nth-child(9) .weui-grid{background: linear-gradient(#3f9ccc, #3480a8);}
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
</style>
