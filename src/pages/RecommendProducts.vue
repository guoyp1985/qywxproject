<template>
  <div class="containerarea bg-white font14 notop nobottom rproducts">
    <div class="pagemiddle" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
      <div class="pro_box bg-page list_shadow pl12 pr12 pb15">
        <div class="pro_list_top bg-page color-lightgray pt10 pb10 pl12 pr12"></div>
        <div class="rule pb12 pt12 pl12 pr12 border color-lightgray b_bottom_after list-shadow bg-white" style="margin-top: -4px;">
          <div>选择你想要产品去分销吧</div>
        </div>
      </div>
      <div v-if="disProductData" class="productlist squarepic pb10">
        <div v-if="productData.length == 0" class="emptyitem flex_center">还没有厂商提供货源</div>
        <router-link v-else v-for="(item,index) in productData" :key="index" :to="{path: '/factoryProduct', query: {id: item.id, fid: query.id}}" class="bk-productitem scroll_item font14 db ">
      		<div class="inner list-shadow">
      			<div class="picarea">
      				<div class="pic">
                <img class="imgcover" :src="$util.getPhoto(item.photo)" onerror="javascript:this.src='http://vuxlaravel.boka.cn/images/nopic.jpg';" />
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
      self.$http.post(`${ENV.BokaApi}/api/retailer/recommendByFids`, {
        pagestart: pageStart, limit: limit
      }).then(function (res) {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.productData = self.productData.concat(retdata)
        self.disProductData = true
      })
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      if (self.productData.length < limit) {
        pageStart = 0
        self.$vux.loading.show()
        self.disProductData = false
        self.productData = []
        self.getData1()
      }
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

.rproducts .pro_list_top{
  background: url(../assets/images/product_list_top.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-size: 100%;
  height: 20px;
}
</style>
