<template>
  <div class="containerarea font14 notop fsetting">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="pagemiddle">
        <div class="listarea" v-if="disFeeData">
          <div v-if="!feeData || feeData.length == 0" class="emptyitem flex_center">
            <div>
              <div>您还未设置代理等级</div>
              <div>点击此处<router-link class="color-blue" :to="{ path: '/factoryLevel', query: {id: query.fid} }">设置等级</router-link></div>
            </div>
          </div>
          <div v-else v-for="(item,index) in feeData" :key="index" class="itemarea">
            <div class="form-item">
              <div class="t-table">
                <div class="t-cell title-cell font14 v_middle bold">{{ item.levelname }}</div>
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
    </template>
  </div>
</template>

<i18n>
</i18n>

<script>
import ENV from 'env'
import { User } from '#/storage'
import Sos from '@/components/Sos'

export default {
  components: {
    Sos
  },
  data () {
    return {
      showSos: false,
      sosTitle: '抱歉，您暂无权限访问此页面！',
      showContainer: false,
      query: {},
      loginUser: {},
      feeData: [],
      disFeeData: false,
      levelpolicy: [],
      fid: 0
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
      let errortip = ''
      let agentfee = {}
      let levelname = {}
      for (let i = 0; i < self.feeData.length; i++) {
        let curfee = self.feeData[i].agentfee
        let curname = self.feeData[i].levelname
        if (self.$util.trim(curfee) === '' || self.$util.trim(curname) === '') {
          iscontinue = false
          errortip = '必填项不能为空'
          break
        } else if (isNaN(curfee) || parseFloat(curfee) < 0) {
          iscontinue = false
          errortip = '请输入正确的佣金'
          break
        } else {
          const price = self.productData.price
          const maxRebate = (parseFloat(price) - parseFloat(price) * 0.11).toFixed(2)
          if (parseFloat(curfee) > maxRebate) {
            iscontinue = false
            errortip = `返点佣金应小于${maxRebate}元`
            break
          } else {
            let level = i + 1
            agentfee[level] = self.feeData[i].agentfee
            levelname[level] = self.feeData[i].levelname
          }
        }
      }
      if (!iscontinue) {
        self.$vux.toast.text(errortip, 'middle')
        return false
      }
      let postData = { fid: self.loginUser.fid, agentfee: agentfee, levelname: levelname, id: self.query.id }
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/factory/addAgentFee`, postData).then(function (res) {
        self.$vux.loading.hide()
        let data = res.data
        if (data.flag === 1) {
          if (self.query.from === 'add') {
            self.$router.push({ path: '/factoryProduct', query: { id: self.query.id, fid: self.query.fid } })
          } else {
            self.$router.go(-1)
          }
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
      self.$http.get(`${ENV.BokaApi}/api/factory/info`, {
        params: { fid: self.loginUser.fid }
      }).then(function (res) {
        self.$vux.loading.hide()
        let data = res.data
        let retdata = data.data ? data.data : data
        self.levelpolicy = retdata.levelpolicy
        return self.$http.post(`${ENV.BokaApi}/api/factory/getAgentFee`, {id: self.query.id, fid: self.query.fid})
      }).then(function (res) {
        let data = res.data
        let retdata = data.data ? data.data : data
        let agentfee = retdata.agentfee
        let levelname = retdata.levelname
        for (let key in self.levelpolicy) {
          self.feeData.push({agentfee: agentfee[key] ? agentfee[key] : '0.00', levelname: levelname[key]})
          self.disFeeData = true
        }
        return self.$http.get(`${ENV.BokaApi}/api/moduleInfo`, {
          params: {id: self.query.id, module: 'factoryproduct'}
        })
      }).then(res => {
        const data = res.data
        self.productData = data.data ? data.data : data
      })
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      if (this.$router.query.fid) {
        this.fid = this.$router.query.fid
      } else {
        this.fid = this.loginUser.fid
      }
      if (this.loginUser) {
        this.$vux.loading.show()
        let isAdmin = false
        for (let i = 0; i < self.loginUser.usergroup.length; i++) {
          if (self.loginUser.usergroup[i] === 1) {
            isAdmin = true
            break
          }
        }
        if (!(self.loginUser.fid && parseInt(self.loginUser.fid) === parseInt(self.fid)) && !isAdmin) {
          this.$vux.loading.hide()
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          this.$vux.loading.hide()
          if (this.query.id !== this.$route.query.id || this.query.fid !== this.$route.query.fid) {
            this.feeData = []
            this.query = this.$route.query
            this.getData()
          }
        }
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
