<style lang="less">
.center-page{
  overflow:hidden;height:100%;
  .page-inner{position:absolute;left:0;top:0;right:0;bottom:50px;overflow-y:scroll;}
  .top-box{
    background-color:#f5f9fe;text-align:left;padding:10px;box-sizing: border-box;
    .avatar{width:80px;height:80px;border-radius:50%;margin-right:10px;}
    .txt{font-size:16px;font-weight:bold;}
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
      <template v-if="loginUser && loginUser.uid">
        <template v-if="loginUser.identity == 2">
          <staff :user.sync="loginUser"></staff>
        </template>
        <template v-else>
          <cuser :user.sync="loginUser"></cuser>
        </template>
      </template>
    </div>
    <qiye-footer :user.sync="loginUser"></qiye-footer>
  </div>
</template>

<script>
import {} from 'vux'
import ENV from 'env'
import { User } from '#/storage'
import QiyeFooter from '@/components/QiyeFooter'
import Staff from '@/components/Staff'
import Cuser from '@/components/User'
export default {
  components: { QiyeFooter, Staff, Cuser },
  data () {
    return {
      query: {},
      loginUser: {}
    }
  },
  methods: {
    getData () {
      this.$http.get(`${ENV.BokaApi}/api/user/show`).then(res => {
        console.log('进入到了center页面的user/show', res)
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
