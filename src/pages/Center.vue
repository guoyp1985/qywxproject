/*
* @description: 个人中心页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="personal-center" class="bg-page font14" v-cloak>
    <div class="ctitle bg-page">
      <div class="info-area">
        <div class="bg"></div>
        <div class="card_box">
          <div class="card bg-white list-shadow02">
            <div class="content-box">
                <div class="user-info pt10 pb5">
                    <div class="c_pic">
                      <img :src="loginUser.avatar" class="v_middle" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                    </div>
                </div>
                <div class="flex_center">
                  <div class="user-info pr5" style="color:#323232;">
                    <div class="user-name" >
                      <span class="font16 u-name">{{ loginUser.linkman }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="head_banner mt5"></div>
          </div>
        </div>
        <div class="message-btn">
          <span class="al al-xiaoxi1 color-white font22"></span>
          <span class="msg-badge">0</span>
        </div>
      </div>
    </div>
    <div class="pl12 pr12 posi_r pb10" style="top:65px;z-index:2;">
      <div class="list-shadow border-box bg-white mb10 radius5">
        <group>
          <cell class="pl12 pr12 pt10 pb10 ">
            <div slot="inline-desc">{{ $t('My orders') }}</div>
          </cell>
        </group>
        <grid class="pt10 pb10" :cols="4" :show-lr-borders="false" :show-vertical-dividers="false">
          <grid-item :label="$t(btn.name)" v-for="(btn, index) in btns" :key="index" @click.native="buttonClick(btn)">
            <div slot="icon" class="color-blue12 align_center" style="width:50px;position:relative;margin:0 auto;">
              <span :class="`al ${btn.icon} btn_icon`"></span>
              <template v-if="btn.count && btn.count > 0">
                <span class="icon_num" v-if="btn.count < 100">{{btn.count}}</span>
                <span class="icon_num" v-else>..</span>
              </template>
            </div>
          </grid-item>
        </grid>
      </div>
      <div class=" mt10 list-shadow radius5">
        <group class="bg-white radius5">
          <cell>
            <div slot="inline-desc">{{ $t('Service') }}</div>
          </cell>
        </group>
        <grid class="pt10 pb10" :cols="4" :show-lr-borders="false" :show-vertical-dividers="false">
          <grid-item label="朋友圈获客" @click.native="toLink('/friendRecommend')">
            <div slot="icon" class="circle-icon-bg rgba09 color-white flex_center mb10">
              <span class="al al-pengyouquan font20"></span>
            </div>
          </grid-item>
          <grid-item v-if="showCenter" label="卖家中心" @click.native="toLink('/centerSales')">
            <div slot="icon" class="circle-icon-bg rgba01 color-white flex_center mb10">
              <span class="al al-fuwu font20"></span>
            </div>
          </grid-item>
          <grid-item v-if="showFactory" label="厂家中心" @click.native="clickFactoryCenter">
            <div slot="icon" class="circle-icon-bg rgba05 color-white flex_center mb10">
              <span class="al al-kehu1 font20"></span>
            </div>
          </grid-item>
          <grid-item v-if="showManager" label="厂家管理" @click.native="toLink('/factoryManage')">
            <div slot="icon" class="circle-icon-bg rgba06 color-white flex_center mb10">
              <span class="al al-guanlizhongxin1 font20"></span>
            </div>
          </grid-item>
          <grid-item label="我的地址" @click.native="toLink('/address')">
            <div slot="icon" class="circle-icon-bg rgba02 color-white flex_center mb10">
              <span class="al al-wodedizhi font20"></span>
            </div>
          </grid-item>
          <grid-item label="我的分享" @click.native="toLink('/share')">
            <div slot="icon" class="circle-icon-bg rgba03 color-white flex_center mb10">
              <span class="al al-ai-share font20"></span>
            </div>
          </grid-item>
          <grid-item label="我的收藏" @click.native="toLink('/favorite')">
            <div slot="icon" class="circle-icon-bg rgba04 color-white flex_center mb10">
              <span class="al al-qietu19 font20"></span>
            </div>
          </grid-item>
          <grid-item label="我的优惠券" @click.native="toLink('/cardList')">
            <div slot="icon" class="circle-icon-bg rgba07 color-white flex_center mb10">
              <span class="al al-tubiaozhizuomoban font20"></span>
            </div>
          </grid-item>
          <grid-item label="群群推" @click.native="toLink('/roomList')">
            <div slot="icon" class="circle-icon-bg rgba08 color-white flex_center mb10">
              <span class="al al-banjiqunliao font20"></span>
            </div>
          </grid-item>
          <grid-item label="找群推广" @click.native="toLink('/rooms')">
            <div slot="icon" class="circle-icon-bg rgba07 color-white flex_center mb10">
              <span class="al al-shouhouwuyou font20"></span>
            </div>
          </grid-item>
          <grid-item v-if="showTestManager && showManager" label="测试管理" @click.native="toLink('/testClassList')">
            <div slot="icon" class="circle-icon-bg rgba07 color-white flex_center mb10">
              <span class="al al-shouhouwuyou font20"></span>
            </div>
          </grid-item>
          <grid-item v-if="showApply && (!loginUser.fid || (loginUser.factoryinfo && loginUser.factoryinfo.moderate != 1))" label="申请厂家" @click.native="toLink('/centerFactory')">
            <div slot="icon" class="circle-icon-bg rgba07 color-white flex_center mb10">
              <span class="al al-shouhouwuyou font20"></span>
            </div>
          </grid-item>
          <grid-item v-if="showManager" label="管理后台" @click.native="clickManager">
            <div slot="icon" class="circle-icon-bg rgba06 color-white flex_center mb10">
              <span class="al al-set font20"></span>
            </div>
          </grid-item>
          <grid-item v-if="showQuit" label="退出" @click.native="clickQuit">
            <div slot="icon" class="circle-icon-bg rgba05 color-white flex_center mb10">
              <span class="al al-tuichu3 font20"></span>
            </div>
          </grid-item>
        </grid>
      </div>
    </div>
    <template v-if="showTip">
      <tip-layer buttonTxt="点击此处联系管理员" content="请联系管理员续费后，再来使用厂家功能哦！" @clickClose="closeTip" @clickButton="toApply"></tip-layer>
    </template>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Grid, GridItem, Group, Cell } from 'vux'
import TipLayer from '@/components/TipLayer'
import ENV from 'env'
import Time from '#/time'
import Reg from '#/reg'
import { Token, User, FirstInfo } from '#/storage'
let self = {}
export default {
  components: {
    Grid, GridItem, Group, Cell, TipLayer
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    // const self = this
    return {
      btns: [
        {
          name: 'All orders',
          icon: 'al-daifukuan',
          // color: 'rgba01',
          link: '/orderSearch'
        },
        {
          type: 'deliver',
          name: 'To Be Delivered',
          icon: 'al-wodedaifahuo3dtouchshangpinxiangqing',
          // color: 'rgba02',
          link: '/orderSearch?flag=2',
          count: 0
        },
        {
          type: 'receive',
          name: 'Shipped',
          icon: 'al-buoumaotubiao39',
          // color: 'rgba05',
          link: '/orderSearch?flag=3',
          count: 0
        },
        {
          name: 'Completed',
          icon: 'al-buoumaotubiao48',
          // color: 'rgba04',
          link: '/orderSearch?flag=4'
        }
      ],
      avatarHref: 'https://tossharingsales.boka.cn/images/user.jpg',
      query: {},
      loginUser: {},
      showCenter: false,
      showFactory: false,
      showManager: false,
      showQuit: false,
      showTip: false,
      showApply: false,
      showTestManager: ENV.showTestManager,
      showWeapp: false,
      weappHTML: '',
      isKaifa: ENV.IsKaifa
    }
  },
  methods: {
    handleLaunchFn (e) {
      console.log(e)
    },
    handleErrorFn (e) {
      console.log('fail', e.detail)
    },
    closeTip () {
      this.showTip = false
    },
    toApply () {
      let params = this.$util.handleAppParams(this.query, {uid: ENV.FactoryManagerUid, fromModule: 'retailer'})
      this.$router.push({path: '/chat', query: params})
    },
    initData () {
      this.showCenter = false
      this.showFactory = false
      this.showManager = false
      this.showQuit = false
    },
    buttonClick (btn) {
      if (btn.link) {
        this.$router.push({path: btn.link})
      } else {
        btn.react.call(this)
      }
    },
    toLink (link) {
      this.$router.push({path: link})
    },
    clickManager () {
      window.open(`${ENV.AdminUrl}?unionid=${self.loginUser.unionid}`)
    },
    clickQuit () {
      Token.remove()
      User.remove()
      FirstInfo.remove()
      this.$router.push({name: 'tLogin'})
    },
    clickFactoryCenter () {
      if (this.loginUser.factory_expired === 1) {
        this.showTip = true
      } else {
        this.$router.push('/centerFactory')
      }
    },
    getData () {
      this.$http.get(`${ENV.BokaApi}/api/user/show`).then(res => {
        if (!res) return
        const retdata = res.data
        if (retdata.flag) {
          this.loginUser = retdata.data
          User.set(this.loginUser)
          console.log('当前用户信息', this.loginUser)
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.initData()
      if (!Reg.rPlatfrom.test(navigator.userAgent)) {
        this.showQuit = true
      }
      this.$util.getSystemParams()
      this.getData()
    }
  },
  activated () {
    self = this
    this.refresh()
  }
}
</script>

<style lang="less">
/* css extension */
.ctitle .head_banner{
  height:30px;
  background: url(../assets/images/v_yinying.png);
  background-size: cover;
  background-position: top;
}
.ctitle .bg{
  height: 140px;
  background: url(../assets/images/v_centerbg.png);
  background-size: cover;
  background-position: bottom;
}
.ctitle .info-area {
  position: relative;
  width: 100%;
  height: auto;
  border-radius: 0;
}
.ctitle .card_box{
  width: 100%;
  padding:0 12px;
  box-sizing:  border-box;
  position: absolute;
  top: 45px;
  z-index: 1;
}
.ctitle .card{
  width:100%;
  border-radius:5px;
  position: relative;
  overflow: hidden;
}
.ctitle .card .c_pic img{
  width: 71px;
  height: 71px;
  border-radius: 50%;
  vertical-align: middle;
  border: 2px solid #fff;
}

.ctitle .content .content-box {
  max-width: 375px;
  margin: 0 auto;
  text-align: center;
}

.ctitle .content .content-box .user-info{
  position: relative;
  text-align: center !important;
  text-align: center;
}
.ctitle .user-info {
  position: relative;
  text-align: center !important;
  text-align: center;
}
.ctitle .content .user-info .u-name {
  vertical-align: middle;
}
.ctitle .content .user-info .u-star {
  color: yellow;
}
.ctitle .content .user-name,
.ctitle .content .user-credits {
  margin-top: 4px;
}
.ctitle .content .user-credits img {
  width: 25px;
}
.ctitle .content .user-credits .u-credits {
  vertical-align: top;
}
.ctitle .message-btn {
  position: absolute;
  right: 15px;
  top: 10px;
  z-index: 3
}
.ctitle .message-btn .msg-badge {
  position: absolute;
  top: -2px;
  right: -8px;
  z-index: 3
}

/* weui css hack */
.ctitle .weui-grid__icon {
  height: auto;
  width: auto;
  text-align: center;
}

.ctitle .weui-grids:before {
  border-top: none;
  height: 0;
}
.ctitle .msg-badge{
  background-color: #ea3a3a;
  text-align:center;
  color:#fff;
  font-size:8pt;
  width: 20px;
  height: 20px;
  line-height: 18px;
  border-radius: 50%;
  display: block;
  padding: 0px;
}
.grid-center {
  display: block;
  text-align: center;
  color: #666;
}
.grid-title {
  background-color: #efeff4;
  color: #716f76;
  padding: 5px 15px;
  font-size: 14px;
}

/* vux css hack */
#personal-center .weui-grid__icon {
  height: auto;
  width: auto;
  text-align: center;
}

#personal-center .weui-grids::before {
  border-top: none;
  height: 0;
}

#personal-center .weui-grids {
  background-color: #ffffff;
}

#personal-center .weui-grid:after {
  height: 0px;
  border-bottom: none;
}
#personal-center .v_tit{
  border-bottom:1px solid #efeff4;
  color:#323232;
}
#personal-center .v_order{
  color: #323232;
  border-bottom: 1px solid #efeff4;
}
#personal-center .al-buoumaotubiao48:before{
  font-size: 24px;
}
#personal-center .weui-grid{padding: 5px;}

#personal-center .weui-grid__label{font-size:12px !important;}
#personal-center .weui-cells:before,#personal-center .no-after .weui-cells:after{display: none;}
#personal-center .weui-cells{margin-top:0px !important;}
#personal-center .radius5, #personal-center .weui-cells, #personal-center .weui-grids{
  border-radius:@list-border-radius5;
}
#personal-center .weui-grid__icon + .weui-grid__label{margin-top:0;}
#personal-center .weui-grid__label{color:#333;}
#personal-center .btn_icon{line-height:32px;display: block;height:32px;margin-bottom: 3px;}

#personal-center .icon_num{
  position: absolute;top: -2px;right:0px;z-index:1;
  text-align:center;background-color: #ea3a3a;color:#fff;font-size:8pt;
  width: 20px;height: 20px;line-height:20px;border-radius: 50%;
  display: block;padding: 0px;
}
</style>
