<template>
  <div class="containerarea columnarea bg-white font14 notop nobottom rproducts">
    <search
      class="v-search bg-white"
      v-model='searchword'
      :auto-fixed="autofixed"
      @on-submit="onSubmit"
      @on-change="onChange"
      @on-cancel="onCancel"
      ref="search">
    </search>
    <tab class="w_100 v-tab">
      <tab-item v-for="(item,index) in classData" :selected="selectedIndex == index" :key="index"  @on-item-click="onItemClick">{{item.title}}</tab-item>
    </tab>
    <div class="column-content" style="padding-bottom:10px;box-sizing:border-box;position:relative;">
        <!-- <div>
          <search
            class="v-search bg-white"
            v-model='searchword'
            :auto-fixed="autofixed"
            @on-submit="onSubmit"
            @on-change="onChange"
            @on-cancel="onCancel"
            ref="search">
          </search>
        </div> -->
      <div class="b_top_after pt10 pb10">
        <div class="flex_center">
          <div :class="`flex_cell flex_center b_right_after sort-icon ${sort == 'dateline' ? 'active' : ''}`" @click="sortEvent('dateline')">
            <div class="txt">最新上架<span :class="`al sort ${datecss}`"></span></div>
          </div>
          <div :class="`flex_cell flex_center sort-icon ${sort == 'profit' ? 'active' : ''}`" @click="sortEvent('profit')">
            <div class="txt">利润最高<span :class="`al sort ${pricecss}`"></span></div>
          </div>
        </div>
      </div>
      <div class="b_top_after"></div>
      <div style="overflow-y:auto;position:absolute;left:0;top:0;right:0;bottom:0;top:43px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
        <div v-if="disProductData">
          <div class="productlist squarepic">
            <div v-if="productData.length == 0" class="emptyitem flex_center align_center w_100">该分类下暂无货源数据</div>
            <div v-else @click="toFProduct(item)" v-for="(item,index) in productData" :key="index" class="bk-productitem scroll_item font14 db ">
          		<div class="inner list-shadow">
          			<div class="picarea">
          				<div class="pic">
                    <img class="imgcover" :src="$util.getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                    <div class="t-icon color-theme flex_center"><i class="al al-zhuanqian font18"></i><span>赚 {{$t('RMB')}}{{item.levelagent}}</span></div>
                  </div>
          			</div>
          			<div class="desbox" style="overflow:hidden;">
          				<div class="align_left clamp1">{{ item.title }}</div>
                  <div class="clamp1 color-red" style="height:20px;">{{item.sellingpoint}}</div>
                  <div class="flex_left mt5">
                    <div class="flex_cell flex_left">
                      <div class="w_100 clamp1 color-red">{{ $t('RMB') }} {{ item.price }}</div>
                    </div>
                    <div class="flex_right" style="width:55px;">
                      <div v-if="!item.haveimport" class="bg-theme color-white flex_center" style="width:50px;border-radius:10px;height:25px;" @click.stop="upEvent(item, index)">上架</div>
                      <div v-else class="bg-theme color-white flex_center" style="width:50px;border-radius:10px;height:25px;">已上架</div>
                    </div>
                  </div>
          			</div>
          		</div>
            </div>
          </div>
          <div style="text-align:center;color:#999;height:30px;line-height:30px;font-size:14px;" v-if="scrollEnd">没有更多商品啦</div>
        </div>
      </div>
      <template v-if="showTip">
        <tip-layer buttonTxt="立即申请" content="会员卖家才可代理厂家商品，赶快入驻申请吧！" @clickClose="closeTip" @clickButton="toApply"></tip-layer>
      </template>
      <template v-if="showFirst">
        <firstTip @submitFirstTip="submitFirstTip">
          <div class="font15 bold txt">
            <div class="flex_center">{{sysParams.advance_importproduct}}</div>
          </div>
        </firstTip>
      </template>
      <template v-if="showHb">
        <firstHb action="importproduct" @closeFirstHb="closeFirstHb" @afterOpen="afterClickOpen"></firstHb>
      </template>
    </div>
  </div>
</template>

<i18n>
Apply join:
  zh-CN: 申请加入
</i18n>

<script>
import { Tab, TabItem, Search } from 'vux'
import { User, SystemParams } from '#/storage'
import ENV from 'env'
import Time from '#/time'
import TipLayer from '@/components/TipLayer'
import FirstTip from '@/components/FirstTip'
import FirstHb from '@/components/FirstHb'

let self = this
const limit = 30
let pageStart = 0

export default {
  components: {
    Tab, TabItem, Search, TipLayer, FirstTip, FirstHb
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      query: {},
      loginUser: {},
      viewData: {},
      disProductData: false,
      productData: [],
      classData: [],
      selectedIndex: 0,
      defaultTab: [{title: '为你推荐'}, {title: '全部'}],
      autofixed: false,
      searchword: '',
      datecss: 'desc',
      pricecss: 'desc',
      sort: 'dateline',
      pageTop: 0,
      tabLeft: 0,
      scrollEnd: false,
      showTip: false,
      showFirst: false,
      isFirst: false,
      showHb: false,
      sysParams: {},
      clickData: null,
      clickIndex: 0
    }
  },
  watch: {
    query: function () {
      return this.query
    }
  },
  methods: {
    initData () {
      this.isFirst = false
      this.showFirst = false
      this.clickData = null
      this.clickIndex = 0
    },
    closeTip () {
      this.showTip = false
    },
    toApply () {
      if (this.query.from) {
        let webquery = encodeURIComponent(`from=${this.query.from}`)
        this.$wechat.miniProgram.redirectTo({url: `/pages/vip?weburl=recommendProducts&webquery=${webquery}`})
      } else {
        let backurl = `/recommendProducts`
        backurl = encodeURIComponent(backurl)
        this.$router.push({path: '/center', query: {backurl: backurl}})
      }
    },
    submitFirstTip () {
      this.showFirst = false
    },
    closeFirstHb () {
      this.showHb = false
    },
    afterClickOpen (data) {
      this.isFirst = false
    },
    importProduct (item) {
      const self = this
      self.$vux.confirm.show({
        content: '确定将该商品上架到店铺并进行出售吗？',
        onConfirm: () => {
          self.$vux.loading.show()
          let params = {id: item.id}
          if (self.query.wid) {
            params.wid = self.query.wid
          }
          self.$http.post(`${ENV.BokaApi}/api/factory/importFactoryProduct`, params).then((res) => {
            let data = res.data
            self.$vux.loading.hide()
            let error = data.error
            if (data.flag === 1) {
              error = '上架成功！该商品已显示在你的店铺中！'
              this.productData[this.clickIndex].haveimport = 1
            }
            self.$vux.toast.show({
              text: error,
              type: data.flag === 1 ? 'success' : 'warn',
              time: self.$util.delay(error),
              onHide: () => {
                if (this.isFirst && data.flag) {
                  this.showHb = true
                }
              }
            })
          })
        }
      })
    },
    upEvent (item, index) {
      this.clickData = item
      this.clickIndex = index
      if (!this.loginUser.isretailer || !this.loginUser.retailerinfo.vipvalidate) {
        this.showTip = true
      } else {
        this.importProduct(item)
      }
    },
    onChange (val) {
      this.searchword = val
    },
    onCancel () {
      const self = this
      self.searchword = ''
      self.$vux.loading.show()
      self.disProductData = false
      self.productData = []
      pageStart = 0
      self.getData1()
    },
    onSubmit () {
      const self = this
      self.$vux.loading.show()
      self.disProductData = false
      self.productData = []
      pageStart = 0
      self.getData1()
    },
    sortEvent (type) {
      if (type === 'dateline') {
        if (this.sort === 'dateline') {
          if (this.datecss === 'desc') {
            this.datecss = 'asc'
          } else {
            this.datecss = 'desc'
          }
        } else {
          this.sort = 'dateline'
        }
      } else {
        if (this.sort === 'profit') {
          if (this.pricecss === 'desc') {
            this.pricecss = 'asc'
          } else {
            this.pricecss = 'desc'
          }
        } else {
          this.sort = 'profit'
        }
      }
      this.$vux.loading.show()
      this.disProductData = false
      this.productData = []
      pageStart = 0
      this.getData1('sort')
    },
    toFProduct (item) {
      let params = this.$util.handleAppParams(this.query, {id: item.id})
      if (this.query.id) {
        params.fid = this.query.id
      }
      this.$router.push({path: '/factoryProduct', query: params})
    },
    handleScroll (refname) {
      let scrollArea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollArea,
        callback: function () {
          if (self.productData.length === (pageStart + 1) * limit) {
            pageStart++
            self.$vux.loading.show()
            self.getData1()
          } else {
            self.scrollEnd = true
          }
        }
      })
    },
    getData1 (type) {
      let params = {pagestart: pageStart, limit: limit, wid: this.loginUser.uid}
      if (this.loginUser.retailerinfo.fid) {
        params.fid = this.loginUser.retailerinfo.fid
      }
      if (this.sort === 'dateline') {
        params.orderby = 'recommendtime'
        params.ascdesc = this.datecss
      } else {
        params.orderby = 'salesrebate'
        params.ascdesc = this.pricecss
      }
      if (this.selectedIndex === 0) {
        params.recommend = 2
      } else if (this.selectedIndex === 1) {
        // params.orderby = 'saled'
        params.from = 'origin'
      } else {
        // params.orderby = 'saled'
        params.from = 'origin'
        params.classid = self.classData[self.selectedIndex].id
      }
      if (this.searchword !== '') {
        params.keyword = this.searchword
      }
      self.$http.post(`${ENV.BokaApi}/api/list/factoryproduct`, params).then(function (res) {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.productData = self.productData.concat(retdata)
        self.disProductData = true
      })
    },
    onItemClick (index) {
      console.log('in onitemclick')
      console.log(index)
      if (index !== self.selectedIndex) {
        this.searchword = ''
        self.selectedIndex = index
        pageStart = 0
        self.$vux.loading.show()
        self.disProductData = false
        self.productData = []
        self.getData1()
      }
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      this.loginUser = User.get()
      this.initData()
      if ((`${this.loginUser.retailerinfo.firstinfo.importproduct}` === '0' && this.query.from) || !this.loginUser.retailerinfo.vipvalidate) {
        this.$http.get(`${ENV.BokaApi}/api/user/show`).then(res => {
          const data = res.data
          this.loginUser = data
          User.set(data)
          if (`${this.loginUser.retailerinfo.firstinfo.importproduct}` === '0' && this.query.from) {
            this.isFirst = true
          }
        })
      }
      if (!self.classData.length) {
        self.$http.get(`${ENV.BokaApi}/api/list/productclass?ascdesc=asc`, { params: { pagestart: pageStart, limit: 500 } }).then((res) => {
          self.$vux.loading.hide()
          const data = res.data
          let retdata = data.data ? data.data : data
          retdata = this.defaultTab.concat(retdata)
          self.classData = retdata
          pageStart = 0
          self.$vux.loading.show()
          self.disProductData = false
          self.productData = []
          self.getData1()
        })
      }
    }
  },
  created () {
    self = this
    this.refresh()
  },
  activated () {
    this.$refs.scrollContainer.scrollTop = this.pageTop
    document.querySelector('.vux-tab').scrollLeft = this.tabLeft
    this.showHb = false
    this.isFirst = false
    this.$util.getSystemParams(() => {
      this.sysParams = SystemParams.get()
    })
  },
  beforeRouteLeave (to, from, next) {
    this.pageTop = this.$refs.scrollContainer.scrollTop
    this.tabLeft = document.querySelector('.vux-tab').scrollLeft
    next()
  }
  /*
  activated () {
    self = this
    this.refresh()
  }
  */
}
</script>

<style lang="less">
.rproducts{
  .squarepic .desbox{height:85px;}
  .t-icon{
    position:absolute;left:0;top:10px;border-top-right-radius:20px;border-bottom-right-radius:20px;background-color:#fff;padding:5px 10px 5px 5px;font-size:15px;
    box-shadow: 0px 0px 3px 1px #e6ebed;font-weight:bold;
  }
  .v-tab .vux-tab-container .vux-tab-selected{border-bottom-style:solid !important;}
  .scrollable .vux-tab-ink-bar{bottom:0 !important;}
  .sort-icon.active{color:#ff6a61;}
  .sort-icon{
    .txt{
      width:86px;text-align:left;position:relative;
      .al{position:absolute;right:0;top:50%;}
      .sort.desc{margin-top:-25px;}
      .sort.asc{margin-top:-22px;}
    }
    .sort.desc:before {content: "\e7d4";}
    .sort.asc:before {content: "\e7d5";}
  }
}
</style>
