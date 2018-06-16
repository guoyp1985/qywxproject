<template>
  <div class="containerarea font14 notop fsetting">
    <div class="pagemiddle">
      <div class="listarea">
        <div v-for="(item,index) in levelData" :key="index" class="itemarea">
          <div class="form-item">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle bold">{{ index + 1 }}级代理</div>
            </div>
          </div>
          <div class="form-item">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">等级名称<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <input v-model="item.levelname" type="text" class="input" placeholder="等级名称" />
              </div>
            </div>
          </div>
          <div class="form-item">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">销售额<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <input v-model="item.money" type="text" class="input" placeholder="销售额" />
              </div>
            </div>
          </div>
          <div class="flex_right padding10" v-if="index > 0 && item.isAdd">
            <div class="db-in color-red" @click="deleteItem(index)">删除</div>
          </div>
        </div>
      </div>
      <div class="padding10 flex_center">
        <div class="qbtn bg-green color-white" @click="addItem">添加一项</div>
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

export default {
  components: {
  },
  data () {
    return {
      query: {},
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
        self.$vux.toast.text('请添加内容', 'middle')
        return false
      }
      let iscontinue = true
      let salesmoney = {}
      let levelname = {}
      for (let i = 0; i < self.levelData.length; i++) {
        if (self.$util.trim(self.levelData[i].money) === '' || self.$util.trim(self.levelData[i].levelname) === '') {
          iscontinue = false
          break
        } else {
          let level = i + 1
          salesmoney[level] = self.levelData[i].money.replace(/,/g, '')
          levelname[level] = self.levelData[i].levelname
        }
      }
      if (!iscontinue) {
        self.$vux.toast.text('必填项不能为空', 'middle')
        return false
      }
      self.$vux.confirm.show({
        content: '等级创建成功后，只能修改不能删除，确定提交吗？',
        onConfirm () {
          let postData = { fid: self.query.id, salesmoney: salesmoney, levelname: levelname }
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
      self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, { module: 'retailer', action: 'setting' }).then(function () {
        return self.$http.get(`${ENV.BokaApi}/api/factory/info`,
          { params: { fid: self.query.id } }
        )
      }).then(function (res) {
        self.$vux.loading.hide()
        let data = res.data
        let retdata = data.data ? data.data : data
        let levelpolicy = retdata.levelpolicy
        let levelname = retdata.levelname
        for (let key in levelpolicy) {
          self.levelData.push({money: levelpolicy[key], levelname: levelname[key]})
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      if (this.query.id !== this.$route.query.id) {
        this.initData()
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
