/*
* @description: 个人中心页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="personal-center" class="page-padding-bottom  bg-page" v-cloak>
    <c-title :avatar-href="avatarHref"
            :user-name="linkMan"
            :user-credits="userCredits"
            :user-level="userLevels"
            :profile="profile"
            :messages="messages">
    </c-title>

    <div class="pt10 pb10 pl12 pr12">
      <!-- <grid :cols="4" :show-lr-borders="false" :show-vertical-dividers="false">
        <grid-item :label="$t(btn.name)" v-for="(btn, index) in btns" :key="index" @click.native="buttonClick(btn)">
          <div slot="icon" :class="`circle-icon-bg ${btn.color} color-white`">
            <span :class="`fa ${btn.icon}`"></span>
          </div>
        </grid-item>
      </grid> -->
      <div class="v_order bg-white font13 list-shadow">
        <div class="t-table v_tit pt5 pb5 pl15 pr15 border-box" style="l-line">
          <div class="t-cell align_left">{{ $t('My orders') }}</div>
          <div class="t-cell align_right">{{ $t('All orders') }}</div>
        </div>
        <div class="weui-grids vux-grid-no-lr-borders pl12 pr12">
          <a href="" class="weui-grid vux-grid-item-no-border align_center" style="width:25%">
            <i class="al al-daifukuan color-blue5"></i>
            <p class="weui-grid__label">{{ $t('Pending payment') }}</p>
          </a>
          <a href="" class="weui-grid vux-grid-item-no-border align_center" style="width:25%">
            <i class="al al-wodedaifahuo3dtouchshangpinxiangqing color-blue5"></i>
            <p class="weui-grid__label">{{ $t('To Be Delivered') }}</p>
          </a>
          <a href="" class="weui-grid vux-grid-item-no-border align_center" style="width:25%">
            <i class="al al-buoumaotubiao39 color-blue5"></i>
            <p class="weui-grid__label">{{ $t('Shipped') }}</p>
          </a>
          <a href="" class="weui-grid vux-grid-item-no-border align_center" style="width:25%">
            <i class="al al-buoumaotubiao48 color-blue5"></i>
            <p class="weui-grid__label">{{ $t('To be evaluated') }}</p>
          </a>
        </div>
      </div>
      <a class="pl12 pr12 pt10 pb10 mt10 border-box t-table bg-white list-shadow">
        <div class="t-cell color-orange2 align_left">  推荐购买赚佣金 </div>
        <div class="t-cell color-orange2 align_right">  > </div>
      </a>
      <div class=" mt10 list-shadow">
        <div class="grid-title bg-white v_tit" style="">{{ $t('Service') }}</div>
          <grid :cols="4" :show-lr-borders="false" :show-vertical-dividers="false">
            <grid-item :label="$t(btn.name)" v-for="(btn, index) in btns1" :key="index" @click.native="buttonClick(btn)">
              <div slot="icon" :class="btn.color">
                <span :class="`al ${btn.icon}`"></span>
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
import { Grid, GridItem } from 'vux'
import CTitle from '@/components/CTitle'
import ENV from 'env'
import { Token, User } from '#/storage'

export default {
  components: {
    Grid, GridItem, CTitle
  },
  data () {
    const self = this
    return {
      btns: [
        {
          name: 'To Recommend',
          icon: 'fa-users',
          color: 'rgba01',
          link: '/recommend'
        },
        {
          name: 'Search Orders',
          icon: 'fa-file-text-o',
          color: 'rgba02',
          link: '/orderSearch'
        },
        {
          name: 'View Productions',
          icon: 'fa-shopping-bag',
          color: 'rgba05',
          link: '/userproducts'
        },
        {
          name: 'View Articles',
          icon: 'fa-newspaper-o',
          color: 'rgba04',
          link: '/articles'
        }
      ],
      btns1: [
        {
          name: 'Manage center',
          icon: 'al-fuwu',
          color: 'color-sales',
          link: '/centerSales'
        },
        {
          name: 'My Address',
          icon: 'al-wodedizhi',
          color: 'color-address',
          link: '/address'
        },
        {
          name: 'My Shares',
          icon: 'al-ai-share',
          color: 'color-share',
          link: '/share'
        },
        {
          name: 'My Favorites',
          icon: 'al-qietu19',
          color: 'color-favorite',
          link: '/favorite'
        },
        {
          name: 'Exit',
          icon: 'al-tuichu3',
          color: 'color-exit',
          react: function () {
            Token.remove()
            User.remove()
            // if (self.$util.isAndroid()) {
            // }
            if (self.$util.isPC()) {
              self.$router.push({name: 'tLogin'})
            } else {
              self.$router.push({name: 'tUserproducts'})
            }
          }
        }
      ],
      avatarHref: '',
      linkMan: '',
      userCredits: 0,
      userLevels: 0,
      profile: {},
      messages: 0,
      direct: ''
    }
  },
  methods: {
    buttonClick (btn) {
      if (btn.link) {
        this.$router.push({path: btn.link})
      } else {
        btn.react()
      }
    },
    getData () {
      const user = User.get()
      if (user) {
        this.avatarHref = user.avatar
        this.linkMan = user.linkman
        this.userCredits = user.credit
        this.userLevels = user.levels
        this.messages = user.messages
        this.profile = {
          linkman: user.linkman,
          avatar: user.avatar,
          sex: user.sex,
          mobile: user.mobile,
          company: user.company
        }
      } else {
        this.$http.get(`${ENV.BokaApi}/api/user/show`)
      }
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: true})
      this.getData()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
/* weui css hack */
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
</style>
