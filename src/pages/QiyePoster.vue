<style lang="less">
.wegroup-page{
  .top-box{
    background-color:#f5f9fe;text-align:left;padding:10px;box-sizing: border-box;
    .avatar{width:80px;height:80px;border-radius:50%;margin-right:10px;}
    .txt{font-size:16px;font-weight:bold;}
  }
  .btn{width:100px;text-align:center;line-height:35px;border-radius:10px;background-color:#07c160;color:#fff;}
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
        <div class="box-title">海报</div>
        <div class="box-con">
          <div>点击下方按钮制作海报</div>
          <div class="flex_center" style="margin-top:20px;">
            <a class="btn" href="https://www.canva.cn/templates/search/5rW35oqlX64/">开始制作</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {} from 'vux'
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
