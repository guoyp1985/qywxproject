<template>
  <div v-transfer-dom class="x-popup">
    <popup v-model="value" height="100%">
      <div class="popup1">
        <div class="popup-top flex_center">{{ $t('Select product') }}</div>
        <div ref="scrollProduct" @scroll="handleScroll" class="popup-middle">
          <search
            class="x-search"
            v-model="searchWord"
            :auto-fixed="false"
            @on-submit="handleSubmit"
            @on-change="handleChange"
            @on-cancel="handleCancel"
            ref="search">
          </search>
          <div class="scroll_list">
            <div v-if="!products || products.length === 0" class="scroll_item padding10 color-gray align_center">
              <template v-if="searchResult">
                <div class="flex_center" style="height:80px;">暂无搜索结果</div>
              </template>
              <template v-else>
                <div class="flex_center" style="height:80px;">暂无商品</div>
              </template>
            </div>
            <check-icon v-else class="x-check-icon scroll_item" v-for="(item,index) in products" :key="item.id" :value.sync="item.checked" @click.native.stop="handleCheck(item,index)">
              <div class="t-table">
                <div class="t-cell pic v_middle w50">
                  <img class="v_middle imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" style="width:40px;height:40px;" />
                </div>
                <div class="t-cell v_middle" style="color:inherit;">
                  <div class="clamp1">{{item.title}}</div>
                  <div class="font12 clamp1"><span class="color-orange">¥{{ item.price }}</span><span class="ml10 color-gray">{{ $t('Storage') }} {{ item.storage }}</span></div>
                  <div class="font12" v-if="rebate">佣金: {{item.rebate}}</div>
                  <div class="font12 clamp1 color-orange" v-if="item.allowcard">允许使用优惠券</div>
                </div>
              </div>
            </check-icon>
          </div>
        </div>
        <div class="popup-bottom flex_center">
          <div class="flex_cell bg-gray color-white h_100 flex_center" @click="close">{{ $t('Close') }}</div>
          <div class="flex_cell bg-green color-white h_100 flex_center" @click="confirm">{{ $t('Confirm') }}</div>
        </div>
      </div>
    </popup>
  </div>
</template>
<script>
import { TransferDom, Popup, Search, CheckIcon } from 'vux'
import ENV from 'env'
export default {
  name: 'AppendProduct',
  directives: {
    TransferDom
  },
  components: {
    Popup, Search, CheckIcon
  },
  props: {
    value: Boolean,
    from: {
      type: String,
      default: ''
    },
    rebate: Boolean
  },
  data () {
    return {
      limit: 20,
      pageStart: 0,
      searchWord: '',
      searchResult: false,
      products: []
    }
  },
  methods: {
    handleScroll () {
      console.log('in handlescroll ')
      const _this = this
      const scrollarea = _this.$refs.scrollProduct
      _this.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          if (_this.products.length === (_this.pageStart + 1) * _this.limit) {
            _this.pageStart++
            _this.$vux.loading.show()
            _this.getProductData()
          }
        }
      })
    },
    handleCheck (data, index) {
      if (data.checked) {
        this.selectProdcut = data
        this.selectProductIndex = index
      } else {
        this.selectProdcut = null
        this.selectProductIndex = -1
      }
      for (let d of this.products) {
        if (d.id !== data.id && d.checked) {
          delete d.checked
          break
        }
      }
      this.$emit('select', data, index)
    },
    handleChange (val) {
      this.searchWord = val
    },
    handleCancel () {
      this.searchWord = ''
      this.products = []
      this.pageStart = 0
      this.$vux.loading.show()
      this.getProductData()
    },
    handleSubmit () {
      this.products = []
      this.pageStart = 0
      this.$vux.loading.show()
      this.getProductData()
    },
    close () {
      this.$emit('close')
    },
    afterConfirm () {
      this.$emit('confirm', this.selectProdcut)
    },
    confirm () {
      if (!this.selectProdcut || !this.selectProdcut.id) {
        this.$vux.alert.show({
          title: '',
          content: '请选择商品'
        })
        return false
      }
      if (this.from === 'activity' && this.selectProdcut.allowcard) {
        this.$vux.confirm.show({
          content: '该商品是可使用优惠券的商品，继续选择该商品将会导致两种优惠叠加使用',
          confirmText: '继续创建',
          cancelText: '停用优惠券',
          onCancel () {
            this.$vux.loading.show()
            this.$http.post(`${ENV.BokaApi}/api/setModulePara/product`, {
              module: 'product', id: this.selectProdcut.id, param: 'allowcard', paramvalue: 0
            }).then(res => {
              this.$vux.loading.hide()
              this.selectProdcut.allowcard = 0
              this.products[this.selectProductIndex].allowcard = 0
              this.afterConfirm()
            })
          },
          onConfirm () {
            this.afterConfirm()
          }
        })
      } else {
        this.afterConfirm()
      }
    },
    getProductData () {
      let params = { params: { from: this.from, pagestart: this.pageStart, limit: this.limit } }
      let keyword = this.searchWord
      if (typeof keyword !== 'undefined' && this.$util.trim(keyword) !== '') {
        params.params.keyword = keyword
      }
      this.$http.get(`${ENV.BokaApi}/api/list/product`, params).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        if (typeof keyword !== 'undefined' && this.$util.trim(keyword) !== '') {
          this.searchResult = true
        } else {
          this.searchResult = false
        }
        let products = data.data ? data.data : data
        this.products = this.products.concat(products)
      })
    }
  },
  created () {
    this.getProductData()
  }
}
</script>
<style lang="less">
</style>
