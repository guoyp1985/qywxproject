<template>
  <div class="containerarea bg-page font14 duser">
    <div class="mt12">
      <div class="btn bg-red color-white" @click="clearStorage">清除本地缓存</div>
    </div>
  </div>
</template>

<script>
import ENV from 'env'
import { User, Version, Token, Access, FirstInfo } from '#/storage'

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
      FirstInfo.remove()
    },
    deleteEvent () {
      const self = this
      self.$vux.confirm.show({
        content: '确定要删除博卡授权中心用户吗？',
        onConfirm () {
          self.$vux.loading.show()
          self.$http.get(`${ENV.BokaApi}/api/user/del`, {
            params: { uids: self.uids }
          }).then(function (res) {
            let data = res.data
            self.$vux.loading.hide()
            let error = data.flag === 1 ? '成功' : data.error
            self.$vux.toast.show({
              text: error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: self.$util.delay(error),
              onHide: function () {
                if (data.flag === 1) {
                  self.uids = ''
                  self.clearObject()
                }
              }
            })
          })
        }
      })
    },
    deleteFactory () {
      const self = this
      self.$vux.confirm.show({
        content: '确定要删除厂家小程序用户吗？',
        onConfirm () {
          self.$vux.loading.show()
          self.$http.get(`${ENV.FactoryApi}/delUser`, {
            params: {uids: self.uids}
          }).then(function (res) {
            let data = res.data
            self.$vux.loading.hide()
            let error = data.flag === 1 ? '成功' : data.error
            self.$vux.toast.show({
              text: error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: self.$util.delay(error),
              onHide: function () {
                if (data.flag === 1) {
                  self.uids = ''
                  self.clearObject()
                }
              }
            })
          })
        }
      })
    },
    clearStorage () {
      const self = this
      self.$vux.confirm.show({
        content: '确定要清除缓存吗？',
        onConfirm () {
          self.$vux.loading.show()
          self.clearObject()
          self.$vux.loading.hide()
          self.$vux.toast.show({
            text: '成功'
          })
        }
      })
    }
  },
  activated () {
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
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
