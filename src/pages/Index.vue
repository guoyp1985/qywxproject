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
    <div class="page-inner" :style="`${afterLoad && loginUser && loginUser.uid && !isPC && !isQywx ? 'bottom:0;' : ''}`">
      <div class="top-box list-shadow02 flex_left">
        <img class="avatar" :src="loginUser.avatar" onerror="javascript:this.src='https://tosqy.boka.cn/images/user.jpg';" />
        <div class="txt">{{ loginUser.linkman }}</div>
      </div>
      <template v-if="afterLoad && loginUser && loginUser.uid">
        <template v-if="(isPC || isQywx) && loginUser.identity == 2">
          <staff :user.sync="loginUser" :targets.sync="targets"></staff>
        </template>
        <template v-else>
          <cuser :user.sync="loginUser"></cuser>
        </template>
      </template>
    </div>
    <template v-if="afterLoad && loginUser && loginUser.uid && (isPC || isQywx) && loginUser.identity == 2">
      <qiye-footer :user.sync="loginUser"></qiye-footer>
    </template>
  </div>
</template>

<script>
import {} from 'vux'
import ENV from 'env'
import { User, GlobalData, SystemParams } from '#/storage'
import QiyeFooter from '@/components/QiyeFooter'
import Staff from '@/components/Staff'
import Cuser from '@/components/User'
export default {
  components: { QiyeFooter, Staff, Cuser },
  data () {
    return {
      query: {},
      loginUser: {},
      globalData: {},
      targets: null,
      afterLoad: false,
      isPC: false,
      isQywx: false
    }
  },
  methods: {
    getUser () {
      this.$http.get(`${ENV.BokaApi}/api/user/show`, {
        params: {init: 1}
      }).then(res => {
        if (res && res.status === 200) {
          const data = res.data
          if (data.code === 0) {
            User.set(data.data)
            SystemParams.set(data.paras)
            GlobalData.set(data)
            this.handleGlobalData()
          }
        }
      })
    },
    handleGlobalData () {
      this.globalData = GlobalData.get()
      if (this.globalData.targets) this.targets = this.globalData.targets
    },
    refresh () {
      this.query = this.$route.query
      this.loginUser = User.get()
      if (GlobalData.get()) {
        this.handleGlobalData()
      } else {
        this.getUser()
      }
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
