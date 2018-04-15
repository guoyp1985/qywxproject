<template>
  <div id="user-profile">
    <group label-width="5em" label-align="left" label-margin-right="2em">
      <cell :inline-desc="$t('Sync From Wx')">
        <img class="avatar" slot="icon" :src="avatarHref"/>
      </cell>
      <x-input :title="$t('Name')" :placeholder="$t('Name')" v-model="value1"></x-input>
      <popup-radio :title="$t('Gendar')" :options="options" v-model="option" :placeholder="$t('Gendar')"></popup-radio>
      <x-input :title="$t('Company Name')" :placeholder="$t('Company Name')" v-model="value3"></x-input>
      <x-input :title="$t('Cell Phone Number')" :placeholder="$t('Cell Phone Number')" mask="999 9999 9999" :max="13" is-type="china-mobile" v-model="value4"></x-input>
    </group>
    <box gap="15px 15px">
      <x-button type="primary">{{ $t('Confirm') }}</x-button>
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
import { Group, Cell, Box, XInput, PopupRadio, XButton } from 'vux'

export default {
  components: {
    Group,
    Cell,
    Box,
    XInput,
    PopupRadio,
    XButton
  },
  data () {
    return {
      avatarHref: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/user.jpg',
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
      value1: '',
      value2: '',
      value3: '',
      value4: ''
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
  margin-right: 10px;
}
#user-profile .vux-no-group-title {
  margin-top: 0;
}
#user-profile .weui-cells:before{
  border-top: none;
}
</style>
