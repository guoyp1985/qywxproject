<style lang="less">
.wegroup-page{
  .top-box{
    background-color:#f5f9fe;text-align:left;padding:10px;box-sizing: border-box;
    .avatar{width:80px;height:80px;border-radius:50%;margin-right:10px;}
    .txt{font-size:16px;font-weight:bold;}
  }
}
</style>
<template>
  <div class="bg-page wegroup-page">
    <div class="top-box list-shadow02 flex_left">
      <img class="avatar" :src="loginUser.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
      <div class="txt">{{ loginUser.linkman }}</div>
    </div>
    <div class="padding10">
      <div class="box-outer">
        <div class="box-title">建立客户群须知</div>
        <div class="box-con">
          <div style="color:red">请按照提示批量设置您的客户群，否则会影响客户群功能的使用</div>
          <div>1、设置好群名称，建议设置群名为类似“北京宴靛厂路店福利群188”。</div>
          <div>2、设置好群欢迎语。可以使用&nbsp;#客户昵称# 欢迎加入“北京宴靛厂路店福利群188”，本群为各位VIP客户提供红包、优惠券等多种福利。</div>
          <div>3、设置好群欢迎语中的图片。用户可以通过该图片领取群福利。</div>
        </div>
      </div>
      <div class="box-outer mt10">
        <div class="box-title">客户群活动</div>
        <div class="box-list square">
          <div class="list-item ico-pic-item" @click="clickEvent">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-youhuiquan"></span>
              </div>
              <div class="txt">新人优惠券</div>
            </div>
          </div>
          <div to="" class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-youhuiquan3"></span>
              </div>
              <div class="txt">专属优惠券</div>
            </div>
          </div>
          <div class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-youhuiquan2"></span>
              </div>
              <div class="txt">全员抢券</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="auto-modal flex_center">
      <div class="modal-inner border-box" style="width:80%;">
        <div class="align_center font18 bold pb10 b_bottom_after color-theme pt10">新人优惠券</div>
        <div class="b_bottom_after" style="padding:20px 10px;text-align:left;">新人入群有红包或者优惠券</div>
        <div class="close-area flex_center" @click="closeEvent">
          <span class="al al-close"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {} from 'vux'
// import ENV from 'env'
import { User } from '#/storage'
export default {
  components: {},
  data () {
    return {
      query: {},
      loginUser: {},
      showModal: false
    }
  },
  methods: {
    clickEvent () {
      this.showModal = true
    },
    closeEvent () {
      this.showModal = false
    },
    refresh () {
      this.query = this.$route.query
      this.loginUser = User.get()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
