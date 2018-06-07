<template>
  <div class="containerarea bg-white font14">
    <div class="form-item">
      <div class="t-table">
        <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Fatory name') }}</div>
        <div class="t-cell input-cell v_middle" style="position:relative;">{{ viewData.title }}</div>
      </div>
    </div>
    <div class="form-item bg-white">
      <div class="t-table">
        <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Product summary') }}</div>
        <div class="t-cell input-cell v_middle" style="position:relative;">{{ viewData.summary }}</div>
      </div>
    </div>
    <div class="form-item bg-white">
      <div class="t-table">
        <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Time of admission') }}</div>
        <div class="t-cell input-cell v_middle" style="position:relative;">{{ viewData.dateline | dateformat }}</div>
      </div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import ENV from 'env'
import Time from '#/time'

export default {
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      query: {},
      viewData: {}
    }
  },
  watch: {
    query: function () {
      return this.query
    }
  },
  methods: {
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'fatory', action: 'info'
      }).then(function () {
        return self.$http.get(`${ENV.BokaApi}/api/factory/info`,
          { params: { fid: self.query.id } }
        )
      }).then(function (res) {
        self.$vux.loading.hide()
        let data = res.data
        let retdata = data.data ? data.data : data
        self.viewData = retdata
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
