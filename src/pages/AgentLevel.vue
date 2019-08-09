<template>
  <div class="containerarea font14 notop fsetting">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="pagemiddle">
        <div class="listarea">
          <div v-for="(item,index) in levelData" :key="index" class="itemarea">
            <div class="form-item">
              <div class="t-table">
                <div class="t-cell title-cell w100 font14 v_middle">等级名称<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <x-input v-model="item.levelname" type="text" class="input" placeholder="经销商名称" ></x-input>
                </div>
              </div>
            </div>
            <div class="flex_right padding10" v-if="index > 0 && item.isAdd">
              <div class="db-in color-red" @click="deleteItem(index)">删除</div>
            </div>
          </div>
        </div>
        <div class="padding10 flex_center">
          <div class="qbtn bg-gray color-white" @click="addItem">添加一项</div>
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
import { XInput } from 'vux'
import ENV from 'env'
import { User } from '#/storage'
import Sos from '@/components/Sos'

export default {
  components: {
    XInput, Sos
  },
  data () {
    return {
      showSos: false,
      sosTitle: '抱歉，您暂无权限访问此页面！',
      showContainer: false,
      query: {},
      loginUser: {},
      levelData: []
    }
  },
  methods: {
    initData () {
      this.levelData = []
    },
    addItem () {
      const self = this
      self.levelData.push({levelname: '', money: '', isAdd: true})
    },
    deleteItem (index) {
      const self = this
      self.$vux.confirm.show({
        content: '确定要删除该项吗？',
        onConfirm () {
          self.levelData.splice(index, 1)
        }
      })
    },
    submitEvent () {
      const self = this
      if (self.levelData.length === 0) {
        self.$vux.toast.text('请添加经销商等级', 'middle')
        return false
      }
      let iscontinue = true
      let levelname = {}
      let salesmoney = {}
      for (let i = 0; i < self.levelData.length; i++) {
        if (self.$util.trim(self.levelData[i].levelname) === '') {
          iscontinue = false
          self.$vux.toast.text('必填项不能为空', 'middle')
          break
        } else {
          let level = i + 1
          levelname[level] = self.levelData[i].levelname
          salesmoney[level] = ''
        }
      }
      if (!iscontinue) {
        return false
      }
      self.$vux.confirm.show({
        content: '等级创建成功后，只能修改不能删除，确定保存吗？',
        onConfirm () {
          // let postData = { fid: self.query.id, salesmoney: salesmoney, levelname: levelname }
          let postData = { fid: self.query.id, levelname: levelname }
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/factory/addPolicy`, postData).then(function (res) {
            self.$vux.loading.hide()
            let data = res.data
            self.$vux.toast.show({
              text: data.error,
              type: data.flag === 1 ? 'success' : 'warn',
              time: self.$util.delay(data.error)
            })
          })
        }
      })
    },
    getData () {
      const self = this
      self.$http.post(`${ENV.BokaApi}/api/factory/getPolicy`, {
        fid: self.query.fid
      }).then(res => {
        const data = res.data
        const retdata = data.data ? data.data : data
        this.levelData = []
        for (let key in retdata) {
          this.levelData.push({levelname: retdata[key]})
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
          if (this.query.id !== this.$route.query.id) {
            this.initData()
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
