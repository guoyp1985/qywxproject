/*
* @description: 厂家货源
* @auther: gyp
* @created_date: 2019-09-06
*/
<template>
  <div class="containerarea bg-page font14 factory-source-page">
    <div class="s-topbanner s-topbanner1" style="height:55px;">
      <div class="row" style="height:55px;">
        <search
          class="v-search bg-white"
          v-model='searchword1'
          :auto-fixed="autofixed"
          @on-submit="onSubmit1"
          @on-change="onChange1"
          @on-cancel="onCancel1"
          ref="search">
        </search>
      </div>
    </div>
    <div class="s-container s-container1" style="top:55px;">
      <div class="swiper-inner scroll-container2" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2',1)">
        <template v-if="distabdata2">
          <div v-if="!tabdata2 || tabdata2.length === 0" class="w_100 h_100 flex_center color-gray">暂无数据</div>
          <div v-else class="scroll_list">
            <div v-for="(item,index1) in tabdata2" :key="index1" class="scroll_item" @click="toUpProduct(item)">
              <div class="scroll_inner">
                <div class="info-row flex_left">
                  <div class="pic flex_left">
                    <img :src="item.factoryinfo.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
                  </div>
                  <div class="flex_cell flex_left">
                    <div class="w_100">
                      <div>{{item.factoryinfo.title}}</div>
                      <div class="font12 color-gray mt5">联系人: {{item.factoryinfo.newbankuser}}</div>
                      <div class="font12 color-gray mt5">联系电话: {{item.factoryinfo.mobile}}</div>
                    </div>
                  </div>
                  <div class="flex_right" style="width:90px;">
                    <div class="rbtn flex_center">挑选商品</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<i18n>
Add order1:
  zh-CN: 返点客
My orders:
  zh-CN: 我的订单
</i18n>
<script>
import { Tab, TabItem, Swiper, SwiperItem, XTextarea, Group, XButton, TransferDom, Popup, XImg, Search } from 'vux'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'
let self = {}
const limit = 10
let pageStart2 = 0
export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, XTextarea, Group, XButton, Popup, XImg, Search
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      showApply: false,
      showContainer: false,
      query: {},
      loginUser: {},
      distabdata2: false,
      tabdata2: [],
      showpopup: false,
      autofixed: false,
      searchword1: '',
      Fid: 0
    }
  },
  methods: {
    onChange1 (val) {
      this.searchword1 = val
    },
    onCancel1 () {
      this.searchword1 = ''
      pageStart2 = 0
      self.distabdata2 = false
      this.tabdata2 = []
      self.getData2()
    },
    onSubmit1 () {
      pageStart2 = 0
      self.distabdata2 = false
      this.tabdata2 = []
      self.getData2()
    },
    toUpProduct (item) {
      console.log('in')
      console.log(item)
      this.$router.push({path: '/factorySource', query: {fid: item.factoryinfo.id}})
    },
    handleScroll (refname, index) {
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          if (self.tabdata2.length === (pageStart2 + 1) * limit) {
            pageStart2++
            self.getData2()
          }
        }
      })
    },
    getData2 () {
      this.$vux.loading.show()
      const self = this
      const params = {pagestart: pageStart2, limit: limit, type: 'join', fid: this.Fid}
      let keyword = self.searchword1
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        params.keyword = keyword
      }
      self.$http.get(`${ENV.BokaApi}/api/factory/fpimportList`, {
        params: params
      }).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        self.distabdata2 = true
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
      if (this.query.fid) {
        this.Fid = this.query.fid
      } else {
        this.Fid = this.loginUser.fid
      }
      if (this.tabdata2.length < limit) {
        pageStart2 = 0
        self.distabdata2 = false
        this.tabdata2 = []
        self.getData2()
      }
    }
  },
  activated () {
    self = this
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less" scoped>
.factory-source-page{
  .scroll_list{
    .scroll_item:not(:last-child){margin-bottom:12px;}
    .scroll_item{
      border:#ccc 0.5px solid;background-color:#fff;padding:10px;box-sizing: border-box;
      .scroll_inner{
        .info-row{
          .pic{
            width:70px;
            img{width:60px;height:60px;object-fit:cover;}
          }
        }
        .pic-row{
          background-color:#ccc;padding:5px;box-sizing: border-box;
          .pic-img{width:50px;height:50px;object-fit:cover;}
        }
        .rbtn{
          width:80px;height:25px;border:#ea3a3a 1px solid;color:#ea3a3a;border-radius:30px;font-size:12px;
        }
      }
    }
  }
}
</style>
