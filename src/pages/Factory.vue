<template>
  <div class="containerarea bg-white font14 notop">
    <div class="pagemiddle" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
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
      <div class="bg-white mt5 padding10 b_top_after">
        <div class="flex_center btn-bottom-red" @click="upAll">一键上架所有商品</div>
      </div>
      <div class="b_top_after"></div>
      <div class="bg-white mt5 padding10 b_top_after">
        <span class="db-in pl5 font16 vline">{{ $t('All products') }}</span>
      </div>
      <div class="b_top_after"></div>
      <div v-if="disProductData" class="productlist squarepic pb10">
        <div v-if="productData.length == 0" class="emptyitem flex_center">暂无商品</div>
        <router-link v-else v-for="(item,index) in productData" :to="{path: '/factoryProduct', query: {id: item.id, fid: query.id}}" class="bk-productitem scroll_item font14 db ">
      		<div class="inner list-shadow">
      			<div class="picarea">
      				<div class="pic">
                <img class="imgcover" :src="item.photo" onerror="javascript:this.src='http://vuxlaravel.boka.cn/images/nopic.jpg';" />
              </div>
      			</div>
      			<div class="desbox" style="overflow:hidden;">
      				<div class="align_left pl5 pr5 clamp2 distitle" style="line-height:18px;height:36px;">{{ item.title }}</div>
      				<div class="clamp1">
      					<div class="flex_table padding5">
      						<span class="color-red font14 flex_cell" style="overflow: hidden;margin-right: 10px;white-space: nowrap;text-overflow: ellipsis;">{{ $t('RMB') }} <span style="margin-left:1px;">{{ item.price }}</span></span>
      						<span class="color-gray">{{ $t('Saled txt') }}:<span style="margin-left:1px;">{{ item.saled }}</span></span>
      					</div>
      				</div>
      			</div>
      		</div>
        </router-link>
      </div>
    </div>
    <div class="s-bottom list-shadow flex_center bg-white pl12 pr12">
      <div class="align_center flex_center flex_cell">
        <router-link class="flex_center btn-bottom-orange" style="width:85%;" :to="{path: '/chat', query: {uid: viewData.uploader}}">{{ $t('Contact factory') }}</router-link>
      </div>
      <div class="align_center flex_center flex_cell">
        <div class="flex_center btn-bottom-red" style="width:85%;" @click="joinEvent">{{ $t('Apply join') }}</div>
      </div>
    </div>
  </div>
</template>

<i18n>
Apply join:
  zh-CN: 申请加入
</i18n>

<script>
import ENV from 'env'
import Time from '#/time'

const limit = 10
let pageStart = 0

export default {
  components: {
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      query: {},
      viewData: {},
      disProductData: false,
      productData: []
    }
  },
  watch: {
    query: function () {
      return this.query
    }
  },
  methods: {
    joinEvent () {
      const self = this
      self.$vux.confirm.show({
        content: '确定要申请加入该厂商吗？',
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/factory/join`, {
            fid: self.query.id
          }).then(function (res) {
            let data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              type: data.flag === 1 ? 'success' : 'warn',
              time: self.$util.delay(data.error)
            })
          })
        }
      })
    },
    upAll () {
      const self = this
      self.$vux.confirm.show({
        content: '确定要上架该厂商的所有商品？',
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/factory/`, {
            fid: self.query.id
          }).then(function (res) {
            let data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              type: data.flag === 1 ? 'success' : 'warn',
              time: self.$util.delay(data.error)
            })
          })
        }
      })
    },
    handleScroll (refname) {
      const self = this
      let scrollArea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollArea,
        callback: function () {
          if (self.productData.length === (pageStart + 1) * limit) {
            pageStart++
            self.$vux.loading.show()
            self.getData1()
          }
        }
      })
    },
    getData1 () {
      const self = this
      self.$http.get(`${ENV.BokaApi}/api/list/factoryproduct`, {
        params: { uploader: self.query.id, pagestart: pageStart, limit: limit }
      }).then(function (res) {
        const data = res.data
        if (self.hideloading) {
          self.$vux.loading.hide()
        }
        const retdata = data.data ? data.data : data
        self.productData = self.productData.concat(retdata)
        self.disProductData = true
      })
    },
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
        if (self.query.id && self.productData.length < limit) {
          self.disProductData = false
          self.productData = []
          self.getData1()
        }
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
