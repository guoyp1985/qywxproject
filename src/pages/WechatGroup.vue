<style lang="less">
.wegroup-page{
  .top-box{
    background-color:#f5f9fe;text-align:left;padding:10px;box-sizing: border-box;
    .txt{font-size:16px;font-weight:bold;}
  }
}
</style>
<template>
  <div class="bg-page font14 wegroup-page">
    <div class="top-box list-shadow02" style="">
      <div class="txt">{{ loginUser.linkman }}</div>
      <div class="mt5 font12 color-gray">{{loginUser.email}}</div>
    </div>
    <div class="padding10">
      <div class="box-outer">
        <div class="box-title">微信群</div>
        <div class="box-list square">
          <div to="" class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-zhaopian"></span>
              </div>
              <div class="txt">建群</div>
            </div>
          </div>
          <div class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-youhuiquan"></span>
              </div>
              <div class="txt">新人优惠券</div>
            </div>
          </div>
          <div class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-youhuiquan1"></span>
              </div>
              <div class="txt">全员抢券</div>
            </div>
          </div>
        </div>
        <div class="box-list square">
          <div to="" class="list-item ico-pic-item">
            <div class="item-inner">
              <div class="ico-bg">
                <span class="al al-hongbao"></span>
              </div>
              <div class="txt">颜值红包</div>
            </div>
          </div>
          <div class="list-item ico-pic-item">
          </div>
          <div class="list-item ico-pic-item">
          </div>
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
