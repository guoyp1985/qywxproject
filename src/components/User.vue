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
    <router-link class="item" to="/userCard?flag=1">
      <div class="ico-cell">
        <span class="al al-huodong" style="font-size:18px;"></span>
      </div>
      <div class="txt-cell">活动奖品</div>
    </router-link>
    <template v-if="afterLoad && (isQywx || !isWx)">
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
    </template>
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
      showWebApp: false,
      isKaifa: ENV.isKaifa,
      isWx: false,
      isQywx: false,
      afterLoad: false
    }
  },
  methods: {
    handleLaunchFn (e) {
      console.log(e)
    },
    handleErrorFn (e) {
      console.log('fail', e.detail)
    },
    toAdmin () {
      location.href = `${ENV.AdminUrl}?username=${this.user.username}`
    }
  },
  created () {
    console.log('=========进入到了user页面的created方法')
    if ((this.user.uid === 1 || this.user.uid === 159) && this.isKaifa) {
      this.showWebApp = true
    }
    this.isWx = this.$util.isWx()
    this.isQywx = this.$util.isQywx()
    this.afterLoad = true
  }
}
</script>
