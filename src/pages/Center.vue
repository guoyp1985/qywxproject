<style lang="less">
.center-page{
  overflow:hidden;height:100%;
  .page-inner{position:absolute;left:0;top:0;right:0;bottom:50px;overflow-y:scroll;}
  .top-box{
    background-color:#f5f9fe;text-align:left;padding:10px;box-sizing: border-box;
    .avatar{width:80px;height:80px;border-radius:50%;margin-right:10px;}
    .txt{font-size:16px;font-weight:bold;}
  }
  .list-area{
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
}
</style>
<template>
  <div class="bg-page center-page">
    <div class="page-inner" :style="`${afterLoad && loginUser && loginUser.uid && !isPC && !isQywx ? 'bottom:0;' : ''}`">
      <div class="top-box list-shadow02 flex_left">
        <img class="avatar" :src="loginUser.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
        <div class="txt">{{ loginUser.linkman }}</div>
      </div>
      <cuser :user.sync="loginUser"></cuser>
    </div>
    <template v-if="afterLoad && loginUser && loginUser.uid && (isPC || isQywx) && loginUser.identity == 2">
      <qiye-footer :user.sync="loginUser"></qiye-footer>
    </template>
  </div>
</template>

<script>
import {} from 'vux'
import ENV from 'env'
import { User } from '#/storage'
import Cuser from '@/components/User'
import QiyeFooter from '@/components/QiyeFooter'
export default {
  components: { Cuser, QiyeFooter },
  data () {
    return {
      query: {},
      loginUser: {},
      showModal: false,
      afterLoad: false,
      isPC: false,
      isQywx: false
    }
  },
  methods: {
    toAdmin () {
      location.href = `${ENV.AdminUrl}?username=${this.loginUser.username}`
    },
    clickKefu () {
      this.showModal = true
    },
    closeEvent () {
      this.showModal = false
    },
    refresh () {
      this.query = this.$route.query
      this.loginUser = User.get()
      this.isPC = this.$util.isPC
      this.isQywx = this.$util.isQywx()
      this.afterLoad = true
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
