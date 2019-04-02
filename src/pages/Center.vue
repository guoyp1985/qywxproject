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
import { Grid, GridItem, Group, Cell } from 'vux'
import CTitle from '@/components/CTitle'
import ENV from 'env'
import Reg from '#/reg'
import { Token, User } from '#/storage'
let self = {}
let sellerBtn = [
  // {
  //   name: 'Seller center',
  //   icon: 'al-fuwu',
  //   color: 'rgba01',
  //   link: '/centerSales'
  // }
  {
    name: 'Friend Customer',
    icon: 'al-pengyouquan',
    color: 'rgba09',
    link: '/friendRecommend'
  }
]
let factoryBtn = [
  {
    name: 'Factory center',
    icon: 'al-kehu1',
    color: 'rgba05',
    react: () => {
      if (this.loginUser) {
        
      }
    }
  }
]
let manageBtn = [
  {
    name: 'Manage center',
    icon: 'al-guanlizhongxin1',
    color: 'rgba06',
    link: '/factoryManage'
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
  },
  {
    name: 'My CardList',
    icon: 'al-tubiaozhizuomoban',
    color: 'rgba07',
    link: '/cardList'
  },
  {
    name: 'Qun Qun Tui',
    icon: 'al-banjiqunliao',
    color: 'rgba08',
    link: '/roomList'
  },
  {
    name: 'Qun Tui Guang',
    icon: 'al-shouhouwuyou',
    color: 'rgba07',
    link: '/rooms'
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
    Grid, GridItem, CTitle, Group, Cell
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
      showBtn1: false,
      btns1: featureBtns,
      avatarHref: 'https://tossharingsales.boka.cn/images/user.jpg',
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
      if (!this.showBtn1) {
        let isAdmin = false
        for (let i = 0; i < user.usergroup.length; i++) {
          if (user.usergroup[i] === 1) {
            isAdmin = true
            break
          }
        }
        if (isAdmin) {
          this.btns1 = manageBtn.concat(this.btns1)
        }
        if (this.loginUser.fid > 0) {
          this.btns1 = factoryBtn.concat(this.btns1)
        }
        if (this.loginUser.isretailer) {
          for (let i = 0; i < ENV.UidArr.length; i++) {
            if (ENV.UidArr[i] === this.loginUser.uid) {
              let arr = [
                {
                  name: 'Seller center',
                  icon: 'al-fuwu',
                  color: 'rgba01',
                  link: '/centerSales'
                }
              ]
              this.btns1 = arr.concat(this.btns1)
            }
          }
          this.btns1 = sellerBtn.concat(this.btns1)
        }
        this.showBtn1 = true
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
      self.$http.get(`${ENV.BokaApi}/api/user/show`).then(function (res) {
        if (!res) return
        self.loginUser = res.data
        User.set(self.loginUser)
        self.setUserInfo()
        let isAdmin = false
        for (let i = 0; i < self.loginUser.usergroup.length; i++) {
          if (self.loginUser.usergroup[i] === 1) {
            isAdmin = true
            break
          }
        }
        if (isAdmin) {
          let btnData = {
            name: 'Admin Manage',
            icon: 'al-set',
            color: 'rgba06',
            react: function () {
              window.open(`${ENV.AdminUrl}?unionid=${self.loginUser.unionid}`)
            }
          }
          let isAdd = true
          for (let i = 0; i < self.btns1.length; i++) {
            if (self.btns1[i].name === 'Admin Manage') {
              isAdd = false
              break
            }
          }
          if (isAdd) {
            if (!Reg.rPlatfrom.test(navigator.userAgent)) {
              let insertIndex = self.btns1.length - 1
              self.btns1.splice(insertIndex, 0, btnData)
            } else {
              self.btns1.push(btnData)
            }
          }
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
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
