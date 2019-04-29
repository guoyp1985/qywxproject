/*
* @description: 个人中心页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="personal-center" class="bg-page font14" v-cloak>
    <c-title :avatar-href="avatarHref"
            :user-name="linkMan"
            :user-credits="userCredits"
            :user-level="userLevels"
            :profile="profile"
            :messages="messages">
    </c-title>
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
      <template v-if="loginUser.whoseseller && loginUser.whoseseller.length > 0">
        <group class="list-shadow radius5 no-after">
          <cell :link="{path:'/recommend'}" class="pl12 pr12 pt10 pb10 border-box t-table bg-white list-shadow">
            <div slot="inline-desc" class="color-orange2"><span>推荐购买赚佣金</span></div>
          </cell>
        </group>
      </template>
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
import CTitle from '@/components/CTitle'
import TipLayer from '@/components/TipLayer'
import ENV from 'env'
import Time from '#/time'
import Reg from '#/reg'
import { Token, User, FirstInfo, SystemParams } from '#/storage'
let self = {}
export default {
  components: {
    Grid, GridItem, CTitle, Group, Cell, TipLayer
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
      linkMan: '',
      userCredits: 0,
      userLevels: 0,
      profile: {},
      messages: 0,
      direct: '',
      loginUser: {},
      showCenter: false,
      showFactory: false,
      showManager: false,
      showQuit: false,
      showTip: false
    }
  },
  methods: {
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
    setUserInfo () {
      const user = User.get()
      this.avatarHref = user.avatar
      this.linkMan = user.linkman
      this.userCredits = user.credit
      this.userLevels = user.levels
      this.profile = {
        linkman: user.linkman,
        avatar: user.avatar,
        sex: user.sex,
        mobile: user.mobile,
        company: user.company
      }
      this.$http.get(`${ENV.BokaApi}/api/message/newMessages`).then(function (res) {
        if (!res) return
        let data = res.data
        self.messages = data.data
        for (let i = 0; i < self.btns.length; i++) {
          const keyValue = data[`count_${self.btns[i].type}`]
          if (keyValue) {
            self.btns[i].count = keyValue
          }
        }
      })
    },
    getData () {
      self.$http.get(`${ENV.BokaApi}/api/user/show`).then(res => {
        if (!res) return
        self.loginUser = res.data
        User.set(self.loginUser)
        self.setUserInfo()
        if (this.loginUser.fid > 0) {
          this.showFactory = true
        }
        for (let i = 0; i < self.loginUser.usergroup.length; i++) {
          if (this.loginUser.usergroup[i] === 1) {
            this.showManager = true
            break
          }
        }
        if (this.loginUser.isretailer) {
          for (let i = 0; i < ENV.UidArr.length; i++) {
            if (ENV.UidArr[i] === this.loginUser.uid) {
              this.showCenter = true
              break
            }
          }
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.initData()
      if (!Reg.rPlatfrom.test(navigator.userAgent)) {
        this.showQuit = true
      }
      if (!SystemParams.get()) {
        this.$util.getSystermParams()
      }
      this.getData()
    }
  },
  activated () {
    self = this
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less">
/* css extension */
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
