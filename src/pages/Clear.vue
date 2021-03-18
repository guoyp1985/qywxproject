<template>
  <div class="containerarea bg-page font14 duser">
    <div class="mt12">
      <div class="btn bg-red color-white" @click="clearStorage">清除本地缓存</div>
    </div>
  </div>
</template>

<script>
import ENV from 'env'
import { User, Version, Token, Access, SystemParams, GlobalData, AuthCount } from '#/storage'

export default {
  data () {
    return {
      uids: ''
    }
  },
  methods: {
    clearObject () {
      Token.remove()
      User.remove()
      Access.remove()
      Version.remove()
      Version.set(ENV.Version)
      SystemParams.remove()
      GlobalData.remove()
      AuthCount.remove()
    },
    clearStorage () {
      this.$vux.confirm.show({
        content: '确定要清除缓存吗？',
        onConfirm: () => {
          this.clearObject()
          this.$vux.toast.show({
            text: '成功'
          })
        }
      })
    }
  },
  activated () {
  }
}
</script>

<style lang="less" scoped>
.duser .btn{
  margin:0 auto;
  width:60%;
  padding:10px;
  box-sizing: border-box;
  text-align:center;
}
</style>
