<template>
  <div class="containerarea s-havebottom bg-white font14 addFactory">
    <div class="s-container" style="top:0;">
      <form class="addForm">
        <div class="form-item">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Fatory name') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <input v-model="submitData.title" type="text" class="input" :placeholder="$t('Fatory name')" />
            </div>
          </div>
        </div>
        <div class="form-item bg-white">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Product summary') }}</div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <group class="textarea-outer" style="padding:0;">
                <x-textarea v-model="submitData.summary" class="x-textarea noborder" :placeholder="$t('Product summary')" :show-counter="false" :rows="1" :max="30" autosize></x-textarea>
              </group>
            </div>
          </div>
        </div>
        <div class="form-item required border-box padding10" v-if="classData.length > 0">
          <input v-model="submitData.productclass" type="hidden" name="productclass" />
          <div class="pb10">经营产品<span class="color-gray">(最多三项)</span><span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
          <checker
          class="x-checker"
          type="checkbox"
          v-model="submitData.productclass"
          :max="3"
          default-item-class="ck-item"
          selected-item-class="ck-item-selected">
            <checker-item class="border1px color-gray" v-for="(item, index) in classData" :key="index" :value="index">{{ item.title }}</checker-item>
          </checker>
        </div>
      </form>
    </div>
    <div class="s-bottom flex_center bg-orange color-white" @click="saveEvent">{{ $t('Submit') }}</div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Group, XInput, TransferDom, Popup, Checker, CheckerItem, CheckIcon, XTextarea } from 'vux'
import ENV from 'env'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group, XInput, Popup, Checker, CheckerItem, CheckIcon, XTextarea
  },
  data () {
    return {
      autofixed: false,
      query: {},
      allowsubmit: true,
      submitData: { title: '', summary: '', productclass: '' },
      requireddata: { title: '', productclass: '' },
      classData: []
    }
  },
  watch: {
    query: function () {
      return this.query
    },
    submitData: function () {
      return this.submitData
    },
    requireddata: function () {
      return this.requireddata
    }
  },
  methods: {
    saveEvent () {
      const self = this
      let validateData = []
      for (let key in self.requireddata) {
        let v = {}
        v[key] = self.submitData[key]
        validateData.push(v)
      }
      let iscontinue = self.$util.validateQueue(validateData,
        model => {
          switch (model.key) {
            default:
              self.$vux.toast.text('必填项不能为空', 'middle')
          }
        }
      )
      if (!iscontinue) {
        return false
      }
      self.$vux.confirm.show({
        content: '确认添加该厂商吗？',
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/factory/add`, self.submitData).then(function (res) {
            let data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: self.$util.delay(data.error),
              onHide: function () {
                if (data.flag === 1) {
                }
              }
            })
          })
        }
      })
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'fatory', action: 'add'
      }).then(function () {
        return self.$http.get(`${ENV.BokaApi}/api/list/applyclass?ascdesc=asc`,
          { params: { limit: 100 } }
        )
      }).then(function (res) {
        self.$vux.loading.hide()
        let data = res.data
        data = data.data ? data.data : data
        for (let i = 0; i < data.length; i++) {
          data[i].checked = false
        }
        self.classData = data
      })
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.addFactory .x-checker .ck-item{
  font-size:13px;
  display: inline-block;
  padding: 0 15px;
  height: 30px;
  line-height: 30px;
  border:0px;
  text-align: center;
  border-radius: 3px;
  background-color: #fff;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  box-sizing: border-box;
}
.x-checker .border1px.ck-item-selected:after{border:1px solid #ea3a3a;}
.addFactory .vux-check-icon > span{color:#666;display: inline-block;vertical-align: bottom;line-height: 19px;}
</style>
