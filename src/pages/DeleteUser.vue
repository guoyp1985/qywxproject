<template>
  <div class="containerarea bg-page font14 duser">
    <div class="form-item bg-white mt12">
      <div class="t-table">
        <div class="t-cell title-cell w80 v_middle">用户ID<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
        <div class="t-cell input-cell v_middle">
          <input v-model="uids" type="text" class="input" placeholder="用户ID,英文逗号隔开" />
        </div>
      </div>
    </div>
    <div class="mt12">
      <div class="btn bg-green color-white" @click="deleteEvent">删除博卡授权中心用户</div>
    </div>
    <div class="mt12">
      <div class="btn bg-orange color-white" @click="deleteFactory">删除厂家小程序用户</div>
    </div>
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
