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
            <div slot="icon" :class="`color-blue12`">
              <span :class="`al ${btn.icon} btn_icon`"></span>
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
      <div v-if="showBtn1" class=" mt10 list-shadow radius5">
        <group class="bg-white radius5">
          <cell>
            <div slot="inline-desc">{{ $t('Service') }}</div>
          </cell>
        </group>
        <grid class="pt10 pb10" :cols="4" :show-lr-borders="false" :show-vertical-dividers="false">
          <grid-item :label="$t(btn.name)" v-for="(btn, index) in btns1" :key="index" @click.native="buttonClick(btn)">
            <div slot="icon" :class="`circle-icon-bg ${btn.color} color-white flex_center mb10`">
              <span :class="`al ${btn.icon} font20`"></span>
            </div>
          </grid-item>
        </grid>
        </div>
      </div>
    </div>
</template>

<i18n>
</i18n>

<script>
import { Grid, GridItem, Group, GroupTitle, Cell } from 'vux'
import CTitle from '@/components/CTitle'
import ENV from 'env'
import Reg from '#/reg'
import { Token, User } from '#/storage'

let manageBtn = [
  {
    name: 'Manage center',
    icon: 'al-fuwu',
    color: 'rgba01',
    link: '/centerSales'
  }
]
let factoryBtn = [
  {
    name: 'Factory center',
    icon: 'al-kehu1',
    color: 'rgba05',
    link: '/centerFactory'
  }
]
let featureBtns = [
  {
    name: 'My Address',
    icon: 'al-wodedizhi',
    color: 'rgba02',
    link: '/address'
  },
  {
    name: 'My Shares',
    icon: 'al-ai-share',
    color: 'rgba03',
    link: '/share'
  },
  {
    name: 'My Favorites',
    icon: 'al-qietu19',
    color: 'rgba04',
    link: '/favorite'
  }
]

if (!Reg.rPlatfrom.test(navigator.userAgent)) {
  featureBtns.push({
    name: 'Exit',
    icon: 'al-tuichu3',
    color: 'rgba05',
    react: function () {
      Token.remove()
      User.remove()
      // if (this.$util.isPC()) {
      this.$router.push({name: 'tLogin'})
      // } else {
      //   this.$router.push({name: 'tUserproducts'})
      // }
    }
  })
}

export default {
  components: {
    Grid, GridItem, CTitle, Group, GroupTitle, Cell
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
          name: 'To Be Delivered',
          icon: 'al-wodedaifahuo3dtouchshangpinxiangqing',
          // color: 'rgba02',
          link: '/orderSearch?flag=2'
        },
        {
          name: 'Shipped',
          icon: 'al-buoumaotubiao39',
          // color: 'rgba05',
          link: '/orderSearch?flag=3'
        },
        {
          name: 'Completed',
          icon: 'al-buoumaotubiao48',
          // color: 'rgba04',
          link: '/orderSearch?flag=4'
        }
      ],
      showBtn1: false,
      btns1: featureBtns,
      avatarHref: 'http://vuxlaravel.boka.cn/images/user.jpg',
      linkMan: '',
      userCredits: 0,
      userLevels: 0,
      profile: {},
      messages: 0,
      direct: '',
      loginUser: {}
    }
  },
  methods: {
    buttonClick (btn) {
      if (btn.link) {
        this.$router.push({path: btn.link})
      } else {
        btn.react.call(this)
      }
    },
    getData () {
      const user = User.get()
      const self = this
      this.loginUser = user
      if (user) {
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
        if (!this.showBtn1) {
          if (this.loginUser.fid > 0) {
            this.btns1 = factoryBtn.concat(this.btns1)
          }
          this.btns1 = manageBtn.concat(this.btns1)
          this.showBtn1 = true
        }
        this.$http.get(`${ENV.BokaApi}/api/message/newMessages`).then(function (res) {
          let data = res.data
          self.messages = data.data
        })
      } else {
        this.$http.get(`${ENV.BokaApi}/api/user/show`).then(function (res) {
          this.loginUser = res.data.data
          User.set(this.loginUser)
          if (!this.showBtn1) {
            if (this.loginUser.fid > 0) {
              this.btns1 = factoryBtn.concat(this.btns1)
            }
            this.btns1 = manageBtn.concat(this.btns1)
            this.showBtn1 = true
          }
        })
      }
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.getData()
    }
  },
  activated () {
    this.refresh()
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
</style>
