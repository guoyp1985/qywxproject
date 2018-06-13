<template>
  <div class="containerarea font14 notop fsetting">
    <div class="pagemiddle">
      <div class="listarea">
        <div v-for="(item,index) in feeData" :key="index" class="itemarea">
          <div class="form-item">
            <div class="t-table">
              <div class="t-cell title-cell font14 v_middle bold">{{ index + 1 }}级代理</div>
            </div>
          </div>
          <div class="form-item">
            <div class="t-table">
              <div class="t-cell title-cell w60 font14 v_middle">佣金<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <input v-model="item.agentfee" type="text" class="input" placeholder="佣金" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagebottom flex_center pl12 pr12 list-shadow02 bg-white">
      <div class="flex_cell flex_center btn-bottom-red" @click="submitEvent">{{ $t('Submit') }}</div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import ENV from 'env'
import { User } from '#/storage'

export default {
  components: {
  },
  data () {
    return {
      query: {},
      feeData: [],
      loginUser: {},
      levelpolicy: []
    }
  },
  methods: {
    submitEvent () {
      const self = this
      if (self.feeData.length === 0) {
        self.$vux.toast.text('请添加内容', 'middle')
        return false
      }
      let iscontinue = true
      let agentfee = {}
      for (let i = 0; i < self.feeData.length; i++) {
        if (self.$util.trim(self.feeData[i].agentfee) === '') {
          iscontinue = false
          break
        } else {
          let level = i + 1
          agentfee[level] = self.feeData[i].agentfee
        }
      }
      if (!iscontinue) {
        self.$vux.toast.text('必填项不能为空', 'middle')
        return false
      }
      let postData = { fid: self.loginUser.fid, agentfee: agentfee, id: self.query.id }
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/factory/addAgentFee`, postData).then(function (res) {
        self.$vux.loading.hide()
        let data = res.data
        if (data.flag === 1) {
          self.$router.go(-1)
        } else {
          self.$vux.toast.show({
            text: data.error,
            type: 'warn',
            time: self.$util.delay(data.error)
          })
        }
      })
    },
    getData () {
      const self = this
      self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, { module: 'retailer', action: 'setting' }).then(function () {
        return self.$http.get(`${ENV.BokaApi}/api/factory/info`,
          { params: { fid: self.loginUser.fid } }
        )
      }).then(function (res) {
        self.$vux.loading.hide()
        let data = res.data
        let retdata = data.data ? data.data : data
        self.levelpolicy = retdata.levelpolicy
        return self.$http.post(`${ENV.BokaApi}/api/factory/getAgentFee`, {id: self.query.id})
      }).then(function (res) {
        let data = res.data
        let retdata = data.data ? data.data : data
        for (let key in self.levelpolicy) {
          self.feeData.push({agentfee: retdata[key] ? retdata[key] : '0.00', key: key})
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      if (this.query.id !== this.$route.query.id) {
        this.feeData = []
        this.query = this.$route.query
        this.getData()
      }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.fsetting .listarea .itemarea:not(:last-child){margin-bottom:12px;}
.fsetting .itemarea{
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.07);
  background-color:#fff;
}
</style>
