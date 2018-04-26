/*
* @description: 个人中心页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="personal-center" v-cloak>
    <c-title :avatar-href="avatarHref"
            :user-name="linkMan"
            :user-credits="userCredits"
            :user-level="userLevels"
            :profile="profile"
            :messages="messages">
    </c-title>
    <grid :cols="4" :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item :label="$t(btn.name)" v-for="(btn, index) in btns" :key="index" @click.native="buttonClick(btn)">
        <div slot="icon" :class="`circle-icon-bg ${btn.color} color-white`">
          <span :class="`fa ${btn.icon}`"></span>
        </div>
      </grid-item>
    </grid>
    <div class="grid-title">{{ $t('Service') }}</div>
    <grid :cols="4" :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item :label="$t(btn.name)" v-for="(btn, index) in btns1" :key="index" @click.native="buttonClick(btn)">
        <div slot="icon" :class="btn.color">
          <span :class="`al ${btn.icon}`"></span>
        </div>
      </grid-item>
    </grid>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Grid, GridItem } from 'vux'
import CTitle from '@/components/CTitle'
// import ENV from '#/env'
import { Token, User } from '#/storage'

export default {
  components: {
    Grid,
    GridItem,
    CTitle
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
          name: 'Sales center',
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
            if (self.$util.isPC()) {
              self.$router.push({name: 'tLogin'})
            } else {
              self.$router.push({name: 'tIndex'})
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
    }
  },
  created () {
    // const self = this
    // this.$http.get(`${ENV.BokaApi}/api/user/home`, {})
    // .then(res => res.json())
    // .then(data => {
    //   console.log(data)
    //   self.avatarHref = data.avatar
    //   self.linkMan = data.linkman
    //   self.userCredits = data.credit
    //   self.userLevels = data.levels
    //   self.messages = data.messages
    //   self.profile = {
    //     linkman: data.linkman,
    //     avatar: data.avatar,
    //     sex: data.sex,
    //     mobile: data.mobile,
    //     company: data.company
    //   }
    // })
    const user = User.get()
    console.log(user)
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
    this.$store.commit('updateToggleTabbar', {toggleTabbar: true})
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
</style>
