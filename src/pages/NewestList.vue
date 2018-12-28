<template>
  <div class="containerarea font14 newestList">
    <div class="s-container scroll-container" style="top:0px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
        <div style="width:100%;height:45px">
          <div v-if="module == 'artical'" class="shead flex_left font16 color-white">
            {{titleData.artical}}
          </div>
          <div v-if="module == 'activity'" class="shead flex_left font16 color-white">
            {{titleData.activity}}
          </div>
          <div v-if="module == 'product'" class="shead flex_left font16 color-white">
            {{titleData.product}}
          </div>
        </div>
      <!-- 最新文章 -->
        <template v-if="disproductdata">
        <div v-if="module == 'artical'">
          <div v-if="!articalData || articalData.length == 0" class="flex_center font16 mt10">暂无文章数据！</div>
          <div class="artical-item flex_left bg-white pt20 pb20 pr15 pl15" v-for="(item, index) in articalData">
            <div class="inner">
              <img :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
            </div>
            <div class="flex_left flex_cell">
              <div class="">
                <div class="font14 clamp1 wtitle">{{item.title}}</div>
                <div class="font12 color-gray">{{item.dateline_str}}</div>
              </div>
              <div class="t-right">
                <span class="btnicon">分享</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新活动 -->
        <div v-if="module == 'activity'">
          <div v-if="!activityData || activityData.length == 0" class="flex_center font16 mt10">抱歉！暂无活动</div>
          <div class="artical-item flex_left bg-white pt20 pb20 pr15 pl15" v-for="(item, index) in activityData">
            <div class="inner">
              <img :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
            </div>
            <div class="flex_left flex_cell">
              <div class="">
                <div class="font14 clamp1 wtitle">{{item.title}}</div>
                <div class="font12 color-gray">{{item.dateline_str}}</div>
              </div>
              <div class="t-right">
                <span class="btnicon">分享</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新商品 -->
        <div v-if="module == 'product'" class="scroll_list">
          <div v-if="!productData || productData.length == 0" class="flex_center font16 mt10">暂无商品！</div>
          <div class="artical-item flex_left bg-white pt20 pb20 pr15 pl15" v-for="(item, index) in productData">
            <div class="inner">
              <img :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
            </div>
            <div class="flex_left flex_cell">
              <div class="">
                <div class="font14 clamp1 wtitle">{{item.title}}</div>
                <div class="font12 color-gray">{{item.dateline_str}}</div>
              </div>
              <div class="t-right">
                <span class="btnicon">分享</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
  import ENV from 'env'
  import Time from '#/time'

  export default {
    data () {
      return {
        articalData: [],
        activityData: [],
        productData: [],
        titleData: {artical: '最新文章', activity: '最新活动', product: '最新商品'},
        module: '',
        retailerInfo: {},
        pageStart: 0,
        limit: 20,
        disproductdata: false
      }
    },
    methods: {
      init () {
        this.module = this.$route.query.module
        console.log(this.module)
      },
      handleScroll (refname) {
        const self = this
        const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
        self.$util.scrollEvent({
          element: scrollarea,
          callback: function () {
            if (self.module === 'artical' && self.articalData.length === (self.pageStart + 1) * self.limit) {
              self.pageStart++
              self.$vux.loading.show()
              self.getData1()
            }
            if (self.module === 'activity' && self.activityData.length === (self.pageStart + 1) * self.limit) {
              self.pageStart++
              self.$vux.loading.show()
              self.getData2()
            }
            if (self.module === 'product' && self.productData.length === (self.pageStart + 1) * self.limit) {
              self.pageStart++
              self.$vux.loading.show()
              self.getData3()
            }
          }
        })
      },
      getData1 () {
        const self = this
        const params = {params: {pagestart: self.pageStart, limit: self.limit}}
        self.$http.get(`${ENV.BokaApi}/api/list/news?from=retailer`, params).then(res => {
          self.$vux.loading.hide()
          let data = res.data
          let retdata = data.data ? data.data : data
          for (var i = 0; i < retdata.length; i++) {
            retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
          }
          self.articalData = self.articalData.concat(retdata)
          self.disproductdata = true
        })
      },
      getData2 () {
        const self = this
        const params = {params: {pagestart: self.pageStart, limit: self.limit}}
        self.$http.get(`${ENV.BokaApi}/api/retailer/listActivity`, params).then(res => {
          self.$vux.loading.hide()
          let data = res.data
          let retdata = data.data ? data.data : data
          for (var i = 0; i < retdata.length; i++) {
            retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
          }
          self.activityData = self.activityData.concat(retdata)
          self.disproductdata = true
        })
      },
      getData3 () {
        const self = this
        const params = {params: {pagestart: self.pageStart, limit: self.limit}}
        self.$http.get(`${ENV.BokaApi}/api/list/product?from=retailer`, params).then(res => {
          self.$vux.loading.hide()
          let data = res.data
          let retdata = data.data ? data.data : data
          for (var i = 0; i < retdata.length; i++) {
            retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
          }
          self.productData = self.productData.concat(retdata)
          self.disproductdata = true
        })
      },
      userInfo () {
        const self = this
        self.$http.get(`${ENV.BokaApi}/api/user/show`).then(res => {
          let data = res.data
          let retdata = data.data ? data.data : data
          self.retailerInfo = retdata
        })
      },
      moduleShow () {
        this.articalData = []
        this.activityData = []
        this.productData = []
        if (this.module === 'artical') {
          this.getData1()
        }
        if (this.module === 'activity') {
          self.pageStart = 0
          this.getData2()
        }
        if (this.module === 'product') {
          self.pageStart = 0
          this.getData3()
        }
      }
    },
    created () {
      this.init()
      this.moduleShow()
    },
    watch: {
      $route (to, from) {
        this.module = this.$route.query.module
        this.moduleShow()
      }
    }
  }
</script>
<style lang="less">
  .newestList{
    .wtitle{width:200px;}
    .shead{width:100%;padding:10px 10px;box-sizing:border-box;background: linear-gradient(#ff6a61, #f63f3d);position:fixed;top:0;z-index:999;}
    .artical-item{
      border-bottom:1px solid #e5e5e5;
      .t-right{margin-left:auto;}
      .btnicon{border-radius:4px;background-color:#4cd964;color:#fff;padding:2px 5px;font-size:12px;display:inline-block;}
    }
    .artical-item .inner{
      width:50px;height:40px;
      img{width:40px;height:40px;}
    }
    .s-container{bottom:0px;}
  }
</style>
