<template>
  <div id="rebate-apply">
    <group class="title">
      <cell class="font14" :title="`${$t('Shop name')}: ${shopName}`" :inline-desc="`${$t('Shop Owner')}: ${owner}`">
        <img class="avatar" slot="icon" :src="avatar"/>
        <div slot="child">
          <x-button mini type="default">{{$t('Contact')}}</x-button>
        </div>
      </cell>
    </group>
    <group label-width="5em" :title="$t('To Write Application Info')">
      <x-input class="font14" :title="$t('Real Name')" v-model="realName" :placeholder="`${$t('Must')}${$t('Real Name')}`"></x-input>
      <x-input class="font14" :title="$t('Mobile')" v-model="mobile" :placeholder="`${$t('Must')}${$t('Mobile')}`">
        <x-button slot="right" type="primary" mini>{{$t('Get Verify Code')}}</x-button>
      </x-input>
      <x-input class="font14" :title="$t('Verify Code')" v-model="verifyCode" :placeholder="`${$t('Must')}${$t('Verify Code')}`"></x-input>
    </group>
    <group :title="$t('Application Reason')">
      <x-textarea class="font14" :max="100" v-model="reason" :placeholder="$t('Application Reason')"></x-textarea>
    </group>
    <div class="application-agreement font14">
      <check-icon :value.sync="agree">
        {{$t('Agree')}}<a class="agreement" @click.stop="showAgreement">{{$t('Rebate Agreement')}}</a>
      </check-icon>
    </div>
    <div v-transfer-dom>
      <popup class="agreement-popup" v-model="popShow" position="right" width="100%">
        <popup-header
        :title="$t('Rebate Agreement')"
        :show-bottom-border="false"></popup-header>
        <view-box class="agreement-box">
        </view-box>
        <flexbox class="button-area">
          <flexbox-item>
            <x-button  type="primary" @click.native="onAgree">{{$t('Agree')}}</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="warn" @click.native="onDisagree">{{$t('Disagree')}}</x-button>
          </flexbox-item>
        </flexbox>
      </popup>
    </div>
  </div>
</template>
<script>
import {
  Group,
  GroupTitle,
  Cell,
  XButton,
  XInput,
  XTextarea,
  CheckIcon,
  Flexbox,
  FlexboxItem,
  ViewBox,
  Popup,
  PopupHeader,
  TransferDom
} from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    GroupTitle,
    Cell,
    XButton,
    XInput,
    XTextarea,
    CheckIcon,
    Flexbox,
    FlexboxItem,
    ViewBox,
    Popup,
    PopupHeader
  },
  data () {
    return {
      avatar: '',
      shopName: '',
      owner: '',
      realName: '',
      mobile: '',
      verifyCode: '',
      reason: '',
      agree: false,
      popShow: false
    }
  },
  methods: {
    showAgreement () {
      this.popShow = true
    },
    onAgree () {
      this.agree = true
      console.log(this.agree)
      this.popShow = false
    },
    onDisagree () {
      this.agree = false
      this.popShow = false
    }
  }
}
</script>
<style lang="less">
#rebate-apply .application-agreement {
  text-align: center;
  padding: 20px 0px;
}
#rebate-apply .agreement {
  color: #007aff;
}
#rebate-apply .avatar {
  width: 40px;
  height: 40px;
}
.agreement-popup .agreement-box {
  position: relative;
  height: calc(~"100% - 46px");
}
.agreement-popup .button-area {
  position: absolute;
  bottom: 0;
  height: 42px;
  padding: 2px 0;
}
/* vux css hack */
#rebate-apply .weui-cell__hd {
  display: flex;
}
#rebate-apply .vux-cell-primary {
  padding-left: 10px;
}
</style>
