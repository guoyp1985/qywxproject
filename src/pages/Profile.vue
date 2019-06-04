/*
* @description: 用户信息页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="user-profile">
    <group label-width="4em" label-align="left" label-margin-right="2em">
      <cell :inline-desc="$t('Sync From Wx')" @click.native="syncWxProfile">
        <img slot="icon" class="avatar imgcover" :src="getProfile.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
      </cell>
      <x-input :title="$t('Name')" required :placeholder="`${$t('Necessary')}${$t('Name')}`" v-model="getProfile.linkman"></x-input>
      <popup-radio :title="$t('Gendar')" :options="options" v-model="getProfile.sex" :placeholder="$t('Gendar')"></popup-radio>
      <x-input :title="$t('Company Name')" :placeholder="$t('Company Name')" v-model="getProfile.company"></x-input>
      <x-input :title="$t('Cell Phone Number')" :placeholder="$t('Cell Phone Number')" :max="11" is-type="china-mobile" v-model="getProfile.mobile"></x-input>
    </group>
    <box gap="15px 15px">
      <x-button type="primary" @click.native="onConfirm">{{ $t('Confirm') }}</x-button>
      <x-button type="default" @click.native="onCancel">{{ $t('Cancel') }}</x-button>
    </box>
  </div>
</template>

<script>
import { Group, Cell, Box, XInput, PopupRadio, XButton, XImg } from 'vux'
import ENV from 'env'
import { User } from '#/storage'

export default {
  components: {
    Group, Cell, Box, XInput, PopupRadio, XButton, XImg
  },
  data () {
    return {
      query: {},
      option: '',
      options: [
        {
          key: 1,
          value: '男'
        },
        {
          key: 2,
          value: '女'
        }
      ],
      profile: {
        avatar: 'https://tossharingsales.boka.cn/images/user.jpg',
        linkman: '',
        sex: 1,
        company: '',
        mobile: ''
      }
    }
  },
  computed: {
    getProfile: {
      get: function () {
        return this.profile
      },
      set: function (profile) {
        this.profile = {
          ...this.profile,
          ...profile,
          mobile: this.$util.trim(profile.mobile)
        }
      }
    }
  },
  methods: {
    syncWxProfile () {
      const self = this
      this.$http.get(`${ENV.BokaApi}/api/user/refresh/0`)
      .then(res => {
        if (res.data.flag) {
          const user = User.get()
          const retdata = res.data.data
          for (let key in retdata) {
            self.getProfile[key] = retdata[key]
          }
          User.set({
            ...user,
            ...self.getProfile
          })
          self.$vux.toast.text(res.data.error, 'middle')
        }
      })
    },
    onConfirm () {
      const self = this
      this.getProfile.mobile = this.$util.trim(this.getProfile.mobile)
      if (this.$util.validateQueue([
        {linkman: this.getProfile.linkman},
        {mobile: this.getProfile.mobile, r: 'Phone', required: false}
      ],
      model => {
        switch (model.key) {
          case 'mobile':
            self.$vux.toast.text('手机号错误', 'middle')
            break
          default:
            self.$vux.toast.text('未填必选项', 'middle')
        }
      })) {
        this.$http.post(`${ENV.BokaApi}/api/user/update/0`, {
          linkman: this.getProfile.linkman,
          mobile: this.getProfile.mobile,
          sex: this.getProfile.sex,
          company: this.getProfile.company
        }).then(res => {
          const user = User.get()
          User.set({
            ...user,
            ...self.getProfile
          })
          self.$vux.toast.text(res.data.error, 'middle')
          setTimeout(() => {
            if (self.query.minibackurl) {
              let minibackurl = decodeURIComponent(self.query.minibackurl)
              self.$wechat.miniProgram.navigateTo({url: `${minibackurl}`})
            } else {
              self.$router.go(-1)
            }
          }, 1000)
        })
      }
    },
    onCancel () {
      if (this.query.minibackurl) {
        let minibackurl = decodeURIComponent(this.query.minibackurl)
        this.$wechat.miniProgram.navigateTo({url: `${minibackurl}`})
      } else {
        this.$router.go(-1)
      }
    },
    init () {
      this.getProfile = User.get()
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
#user-profile .avatar {
  width: 60px;
  height: 60px;
}
/* weui css hack */
#user-profile .weui-cell__hd {
  display: flex;
}
#user-profile .weui-cell__hd img {
  margin-right: 10px;
}
#user-profile .vux-no-group-title {
  margin-top: 0;
}
#user-profile .weui-cells:before{
  border-top: none;
}
</style>
