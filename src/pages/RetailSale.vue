<style lang="less">
.rsale-page{
  .top-box{
    background-color:#f5f9fe;text-align:left;padding:10px;box-sizing: border-box;
    .avatar{width:80px;height:80px;border-radius:50%;margin-right:10px;}
    .txt{font-size:16px;font-weight:bold;}
  }
}
</style>
<template>
  <div class="bg-page font14 rsale-page">
    <div class="top-box list-shadow02 flex_left">
      <img class="avatar" :src="loginUser.avatar" />
      <div class="txt">{{ loginUser.linkman }}</div>
    </div>
    <div class="padding10">
      <div class="box-outer">
        <div class="box-title">内容</div>
        <div class="box-list square">
          <div to="" class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-jituankehu"></span>
              </div>
              <div class="txt">人员列表</div>
            </div>
          </div>
          <div class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-yaoqing1"></span>
              </div>
              <div class="txt">邀请加入</div>
            </div>
          </div>
          <div class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-paimingbang"></span>
              </div>
              <div class="txt">分销榜</div>
            </div>
          </div>
        </div>
        <div class="box-list square">
          <div to="" class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-qitashouru"></span>
              </div>
              <div class="txt">收入</div>
            </div>
          </div>
          <div class="list-item ico-pic-item"></div>
          <div class="list-item ico-pic-item"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {} from 'vux'
import ENV from 'env'
import { User } from '#/storage'
export default {
  components: {
  },
  data () {
    return {
      query: {},
      loginUser: {}
    }
  },
  methods: {
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
