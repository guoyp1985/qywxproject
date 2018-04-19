<template>
  <div class="containerarea s-havebottom bg-white font14">
    <div class="s-container" style="top:0;">
      <div class="padding10 font16 bg-gray4">{{ $t('Seller info setting') }}</div>
      <form>
        <Forminputplate class="required">
          <span slot="title">{{ $t('Shop name') }}</span>
          <input type="text" name="title" class="input border-box" :placeholder="$t('Shop name')" />
        </Forminputplate>
        <Forminputplate>
          <span slot="title">{{ $t('Wechat qrcode') }}</span>
          <div>
            <input type="hidden" name="qrcode" required="" value="http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204030611795.jpg" class="no-fastclick">
            <div class="q_photolist align_left" uploadform=".uploadfileForm">
              <div v-if="showphotoitem" class="photoitem">
                <div class="inner photo" photo="http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204030611795.jpg" style="background-image: url('http://oss.boka.cn/gongxiaoshe_qiyeplus_com/month_201803/15204030611795.jpg');">
                  <div class="close" @click="deletephoto">×</div>
                </div>
              </div>
              <div v-if="showaddphoto" class="photoitem add">
                <div class="inner">
                  <input type="file" style="position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:transparent;" @change="filechange">
                  <div class="t-table">
                    <div class="t-cell">
                      <div class="txt">
                        <i class="fa fa-photo" style="color:#c6c5c5;"></i>
                        <div class="mt5">{{ $t('Upload wechat qrcode') }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="font12 color-blue3 mt5">{{ $t('Upload qrcode text') }}</div>
          </div>
        </Forminputplate>
        <Forminputplate>
          <span slot="title">{{ $t('Pay type') }}</span>
          <div>
            <label style="display:inline-block;" class="btnbuyonline" template=".template4">
              <div class="qradio">
                <input type="radio" name="buyonline" value="1" required="" checked="" class="no-fastclick">
                <i></i><span style="vertical-align:-3px;">在线支付</span>
              </div>
            </label>
            <label style="display:inline-block;margin-left:5px;" class="btnbuyonline" template=".template5">
              <div class="qradio">
                <input type="radio" name="buyonline" value="0" required="" class="no-fastclick">
                <i></i><span style="vertical-align:-3px;">线下支付</span>
              </div>
            </label>
          </div>
        </Forminputplate>
        <div v-show="showmore">
          <Forminputplate>
            <span slot="title">{{ $t('Shop description') }}</span>
            <group class="textarea-outer" style="padding:0;">
              <x-textarea style="padding:5px;" class="x-textarea noborder" :placeholder="$t('Shop description')" :show-counter="false" :rows="1" autosize></x-textarea>
            </group>
          </Forminputplate>
          <Forminputplate>
            <span slot="title">{{ $t('Auto reply') }}</span>
            <group class="textarea-outer" style="padding:0;">
              <x-textarea style="padding:5px;" class="x-textarea noborder" :placeholder="$t('Shop description')" :value="replyvalue" :show-counter="false" :rows="1" autosize></x-textarea>
            </group>
          </Forminputplate>
        </div>
        <div v-if="showmore" @click="expandevent" class="padding15 font14 align_center color-gray">{{ $t('Up text') }}<i class="al al-jiantou2-up font14 middle-cell"></i></div>
        <div v-else class="padding15 font14 align_center color-gray"  @click="expandevent">{{ $t('Epand text') }}<i class="al al-jiantouyoushuang- font14"></i></div>
      </form>
    </div>
    <div class="s-bottom flex_center bg-green color-white">{{ $t('Submit order') }}</div>
  </div>
</template>

<i18n>
Seller info setting:
  zh-CN: 卖家信息设置
Shop name:
  zh-CN: 店铺名称
Wechat qrcode:
  zh-CN: 微信二维码
Upload wechat qrcode:
  zh-CN: 上传个人微信二维码
Upload qrcode text:
  zh-CN: 如何上传个人微信二维码?
Pay type:
  zh-CN: 支付方式
Shop description:
  zh-CN: 店铺介绍
Auto reply:
  zh-CN: 自动回复
Auto reply placeholder:
  zh-CN: 用户在线咨询时自动回复的消息
Epand text:
  zh-CN: 展开更多设置
Up text:
  zh-CN: 收起更多设置
Cancel txt:
  zh-CN: 取消
Confirm txt:
  zh-CN: 提交
</i18n>

<script>
import { Group, XTextarea, XInput, TransferDom } from 'vux'
import Forminputplate from '@/components/Forminputplate'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    Forminputplate,
    XTextarea,
    XInput,
    TransferDom
  },
  data () {
    return {
      showmore: false,
      replyvalue: '你好，请稍等，一会为你服务',
      showaddphoto: true,
      showphotoitem: false,
      havenum: 0,
      maxnum: 1
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
  },
  computed: {
  },
  methods: {
    expandevent () {
      this.showmore = !this.showmore
    },
    filechange (e) {
      this.showaddphoto = false
      this.showphotoitem = true
    },
    deletephoto () {
      this.showaddphoto = true
      this.showphotoitem = false
    }
  }
}
</script>

<style lang="less">
.form-item{position:relative;padding:10px;}
.form-item:after{
  content:"";display:block;
	background-color:@list-border-color;height:1px;overflow:hidden;
	position: absolute;left: 0;right: 0;bottom:1px;
	-webkit-transform: scaleY(0.5) translateY(0.5px);
	transform: scaleY(0.5) translateY(0.5px);
	-webkit-transform-origin: 0% 0%;
	transform-origin: 0% 0%;
}
</style>
