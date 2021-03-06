<style lang="less">
.user-list-area{
  width:100%;margin-top:10px;background-color:#fff;
  .item{position:relative;display:flex;justify-content: flex-start;align-items: center;padding:10px;}
  .item:not(:last-child):after{
    content: " ";
    position: absolute;left: 0;bottom: 0;right: 0;
    height: 1px;border-bottom: 1px solid #ededed;color: #ededed;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .ico-cell{
    margin-right:10px;
    .al{font-size:20px;color:#659af2;font-weight:bold;}
  }
  .txt-cell{flex:1;}
}
</style>

<template>
  <div class="user-list-area">
    <router-link class="item" to="/userCard">
      <div class="ico-cell">
        <span class="al al-youhuiquan2"></span>
      </div>
      <div class="txt-cell">我的优惠券</div>
    </router-link>
    <div class="item">
      <div class="ico-cell">
        <span class="al al-qitashouru"></span>
      </div>
      <div class="txt-cell">我的收入</div>
    </div>
    <router-link class="item" to="/aboutGxk">
      <div class="ico-cell">
        <span class="al al-guanyu"></span>
      </div>
      <div class="txt-cell">关于共销客</div>
    </router-link>
    <router-link class="item" to="/complaint">
      <div class="ico-cell">
        <span class="al al-wenti"></span>
      </div>
      <div class="txt-cell">问题反馈</div>
    </router-link>
    <router-link class="item" to="/service">
      <div class="ico-cell">
        <span class="al al-kefu1"></span>
      </div>
      <div class="txt-cell">联系客服</div>
    </router-link>
    <div class="item" @click="toAdmin" v-if="user.isadmin">
      <div class="ico-cell">
        <span class="al al-houtaiguanli"></span>
      </div>
      <div class="txt-cell">后台管理</div>
    </div>
  </div>
</template>

<script>
import ENV from 'env'
export default {
  name: 'Userpage',
  props: {
    user: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    toAdmin () {
      location.href = `${ENV.AdminUrl}?username=${this.user.username}`
    },
    clickKefu () {
      this.showModal = true
    },
    closeEvent () {
      this.showModal = false
    }
  }
}
</script>
