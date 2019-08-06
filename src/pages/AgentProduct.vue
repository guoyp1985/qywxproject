<template>
  <div class="containerarea font14 notop fsetting">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="pagemiddle">
        <div class="scroll_list" v-if="productData && productData.id">
          <div class="scroll_item mb10 font14 bg-white db list-shadow " style="color:inherit;">
            <div v-if="productData.moderate == 0" class="ico down"></div>
            <div class="t-table bg-white pt10 pb10">
              <div class="t-cell pl12 v_middle" style="width:110px;">
                <img class="imgcover v_middle" :src="getPhoto(productData.photo)" style="width:100px;height:100px;" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
              </div>
              <div class="t-cell v_middle">
                <div class="clamp1 font16 pr10 color-lightgray">{{productData.title}}</div>
                <div class="t-table pr12 border-box mt15">
                  <div class="t-cell color-999 font14">
                    <div class="clamp1">售价:<span class="color-red"> {{ $t('RMB') }}{{ productData.price }}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="listarea">
          <div v-for="(item,index) in levelData" :key="index" class="itemarea">
            <div class="form-item">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle bold">{{levelName[index]}}</div>
              </div>
            </div>
            <div class="form-item">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">价格</div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <input v-model="item.money" type="text" class="input" placeholder="价格" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagebottom flex_center pl12 pr12 list-shadow02 bg-white">
        <div class="flex_cell flex_center btn-bottom-red" @click="submitEvent">{{ $t('Save') }}</div>
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
      productData: {},
      levelData: [],
      levelName: [],
      isSubmitIng: false
    }
  },
  methods: {
    initData () {
      this.isSubmitIng = false
      this.productData = {}
      this.levelData = []
      this.levelName = []
    },
    getPhoto (src) {
      return this.$util.getPhoto(src)
    },
    submitEvent () {
      const self = this
      if (this.isSubmitIng) return false
      let iscontinue = true
      let agentfee = []
      for (let i = 0; i < self.levelData.length; i++) {
        let curmoney = self.levelData[i].money
        if (self.$util.trim(curmoney) === '') {
          agentfee.push('')
        } else if (isNaN(curmoney)) {
          iscontinue = false
          self.$vux.toast.text('请输入正确的经销商价格', 'middle')
          break
        } else if (isNaN(curmoney) || parseFloat(curmoney.replace(/,/g, '')) < 0) {
          iscontinue = false
          self.$vux.toast.text('经销商价格不能小于0', 'middle')
          break
        } else if (parseFloat(curmoney.replace(/,/g, '')) > parseFloat(this.productData.price.replace(/,/g, ''))) {
          iscontinue = false
          self.$vux.toast.text('经销商价格不能大于商品价格', 'middle')
          break
        } else {
          agentfee.push(curmoney.replace(/,/g, ''))
        }
      }
      if (!iscontinue) {
        return false
      }
      this.isSubmitIng = true
      let postData = {agentfee: agentfee, id: this.query.pid}
      if (this.query.fid) {
        postData.fid = this.query.fid
      }
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/factory/addAgentFee`, postData).then(res => {
        this.isSubmitIng = false
        self.$vux.loading.hide()
        let data = res.data
        self.$vux.toast.show({
          text: data.error,
          type: data.flag === 1 ? 'success' : 'warn',
          time: self.$util.delay(data.error)
        })
      })
    },
    getData () {
      const self = this
      self.$http.get(`${ENV.BokaApi}/api/moduleInfo`, {
        params: {id: self.query.pid, module: 'factoryproduct'}
      }).then(res => {
        const data = res.data
        if (data.flag) {
          this.productData = data.data
          let postParams = {}
          if (this.query.fid) {
            postParams.fid = this.query.fid
          }
          return self.$http.post(`${ENV.BokaApi}/api/factory/getPolicy`, postParams)
        }
      }).then(res => {
        if (res) {
          const data = res.data
          const retdata = data.data ? data.data : data
          this.levelData = []
          for (let key in retdata) {
            this.levelName.push(retdata[key])
            this.levelData.push({levelname: retdata[key]})
          }
          let postParams = {id: this.query.pid}
          if (this.query.fid) {
            postParams.fid = this.query.fid
          }
          return self.$http.post(`${ENV.BokaApi}/api/factory/getAgentFee`, postParams)
        }
      }).then(res => {
        if (res) {
          const data = res.data
          const retdata = data.data
          if (data.flag) {
            for (let key in retdata.agentfee) {
              this.levelData[key - 1].money = retdata.agentfee[key]
            }
            console.log(this.levelData)
          }
        }
      })
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      if (this.loginUser) {
        this.$vux.loading.show()
        let isAdmin = false
        for (let i = 0; i < self.loginUser.usergroup.length; i++) {
          if (self.loginUser.usergroup[i] === 1) {
            isAdmin = true
            break
          }
        }
        if (!(self.loginUser.fid && parseInt(self.loginUser.fid) === parseInt(self.$route.query.id)) && !isAdmin) {
          this.$vux.loading.hide()
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          this.$vux.loading.hide()
          this.initData()
          this.query = this.$route.query
          this.getData()
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
