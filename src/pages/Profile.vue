/*
* @description: 用户信息页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="user-profile">
    <group label-width="4em" label-align="left" label-margin-right="2em">
      <cell :inline-desc="$t('Sync From Wx')" @click.native="syncWxProfile">
        <x-img slot="icon" class="avatar imgcover" :src="getProfile.avatar" default-src="../src/assets/images/user.jpg"></x-img>
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

<i18n>
Sync From Wx:
  zh-CN: 同步微信资料
Name:
  zh-CN: 姓名
Gendar:
  zh-CN: 性别
Company Name:
  zh-CN: 公司名
Cell Phone Number:
  zh-CN: 手机
Confirm:
  zh-CN: 确认
</i18n>

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
        avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/user.jpg',
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
  created () {
    if (this.$route.params.profile) {
      this.getProfile = this.$route.params.profile
    } else {
      this.getProfile = User.get()
    }
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
  },
  methods: {
    syncWxProfile () {
      const self = this
      this.$http.get(`${ENV.BokaApi}/api/user/refresh/0`)
      .then(res => {
        if (res.data.flag) {
          const user = User.get()
          self.getProfile = res.data.data
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
        this.$http.post(`${ENV.BokaApi}/api/user/update/0`, this.getProfile)
        .then(res => {
          const user = User.get()
          User.set({
            ...user,
            ...self.getProfile
          })
          self.$vux.toast.text(res.data.error, 'middle')
          setTimeout(() => {
            self.$router.go(-1)
          }, 1000)
        })
      }
    },
    onCancel () {
      this.$router.go(-1)
    }
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
