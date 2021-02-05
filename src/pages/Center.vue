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
    <div class="page-inner">
      <div class="top-box list-shadow02 flex_left">
        <img class="avatar" :src="loginUser.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
        <div class="txt">{{ loginUser.linkman }}</div>
      </div>
      <div class="list-area">
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
      </div>
    </div>
    <qiye-footer :user.sync="loginUser"></qiye-footer>
    <div v-if="showModal" class="auto-modal flex_center">
      <div class="modal-inner border-box" style="width:80%;">
        <div class="align_center font18 bold pb10 b_bottom_after color-theme pt10">客服</div>
        <div class="" style="padding:20px 10px;">
          <div class="align_center">
            <img src="../assets/images/kefu.jpg" style="width:100px;height:178px;" />
          </div>
          <div class="flex_left">
            <span>仇红波</span>
            <a class="ml5" href="tel:18601033313;" style="color:#659af2;">18601033313</a>
          </div>
        </div>
        <div class="close-area flex_center" @click="closeEvent">
          <span class="al al-close"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {} from 'vux'
import ENV from 'env'
import { User } from '#/storage'
import QiyeFooter from '@/components/QiyeFooter'
export default {
  components: { QiyeFooter },
  data () {
    return {
      query: {},
      loginUser: {},
      showModal: false
    }
  },
  methods: {
    clickKefu () {
      this.showModal = true
    },
    closeEvent () {
      this.showModal = false
    },
    getData () {
      this.$http.get(`${ENV.BokaApi}/api/user/show`).then(res => {
        console.log('进入到了center页面的user/show', res)
        console.log(res)
        if (!res) return
        const data = res.data
        let retdata = data.data ? data.data : data
        this.loginUser = retdata
        User.set(this.loginUser)
        console.log('当前用户信息', this.loginUser)
      })
    },
    refresh () {
      this.query = this.$route.query
      this.getData()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
