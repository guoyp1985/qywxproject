<template>
  <div class="containerarea font14 newestList">
    <div class="s-container scroll-container" style="top:0px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
      <div style="width:100%;height:45px">
        <div v-if="module == 'news'" class="shead flex_left font16 color-white">{{titleData.news}}</div>
        <div v-if="module == 'activity'" class="shead flex_left font16 color-white">{{titleData.activity}}</div>
        <div v-if="module == 'product'" class="shead flex_left font16 color-white">{{titleData.product}}</div>
        <div v-if="module == 'factoryProduct'" class="shead flex_left font16 color-white">{{titleData.factoryProduct}}</div>
      </div>
      <!-- 最新文章 -->
      <template v-if="disList">
        <div v-if="module == 'news'">
          <div v-if="!articalData || articalData.length == 0" class="flex_center font16 mt10">暂无文章数据</div>
          <router-link class="artical-item flex_left bg-white pt20 pb20 pr15 pl15" v-for="(item, index) in articalData" :key="index" :to="{path: '/news',query: {id:item.id,wid:item.uploader}}">
            <div class="inner">
              <img :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
            </div>
            <div class="flex_left flex_cell">
              <div class="clamp1 w_100 pr10">
                <div class="font14 clamp1 wtitle">{{item.title}}</div>
                <div class="clamp1 font12 color-gray v_middle">
                    <span class="v_middle color-999">{{ item.dateline_str }}</span>
                    <span class="v_middle"><i class="al al-chakan font18 middle-cell pl5 pr5" style="color: #bbbbbb"></i>{{item.views}}</span>
                    <span class="v_middle"><i class="al al-ai-share font14 middle-cell pl5 pr5" style="color: #bbbbbb"></i>{{item.shares}}</span>
                </div>
              </div>
              <div class="t-right">
                <span class="btnicon">去分享</span>
              </div>
            </div>
          </router-link>
        </div>
        <!-- 最新活动 -->
        <div v-if="module == 'activity'">
          <div v-if="!activityData || activityData.length == 0" class="flex_center font16 mt10">暂无活动数据</div>
          <div class="artical-item" v-for="(item, index) in activityData" :key="index">
            <template v-if="item.type=='groupbuy'">
              <router-link class="inner_item flex_left bg-white pt20 pb20 pr15 pl15" :to="{path: '/product',query: {id:item.productid,wid:item.uploader}}">
                <div class="inner">
                  <img :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                </div>
                <div class="txt-cell flex_cell w_100 clamp1 pr10">
                  <div class="font14 clamp1 wtitle">{{item.title}}</div>
                  <div class="font12 color-gray">{{item.dateline_str}}</div>
                </div>
                <div class="t-right">
                  <span class="btnicon">去分享</span>
                </div>
              </router-link>
            </template>
            <template v-else>
              <router-link class="inner_item flex_left bg-white pt20 pb20 pr15 pl15" :to="{path: '/activity',query: {id:item.id,wid:item.uploader}}">
                <div class="inner">
                  <img :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                </div>
                <div class="txt-cell flex_cell w_100 clamp1 pr10">
                  <div class="font14 clamp1 wtitle">{{item.title}}</div>
                  <div class="font12 color-gray">{{item.dateline_str}}</div>
                </div>
                <div class="t-right">
                  <span class="btnicon">去分享</span>
                </div>
              </router-link>
            </template>
          </div>
        </div>
        <!-- 最新商品、厂家商品 -->
        <div v-if="module == 'product' || module == 'factoryProduct'" class="scroll_list">
          <div v-if="!productData || productData.length == 0" class="flex_center font16 mt10">暂无商品数据</div>
          <router-link class="artical-item flex_left bg-white pt20 pb20 pr15 pl15" v-for="(item, index) in productData" :key="index" :to="{path: '/product',query: {id:item.id,wid:item.uploader}}">
            <div class="inner">
              <img :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
            </div>
            <div class="txt-cell flex_cell w_100 clamp1 pr10">
              <div class="font14 clamp1 wtitle">{{item.title}}</div>
              <div class="font12 color-gray">{{item.dateline_str}}</div>
            </div>
            <div class="t-right">
              <span class="btnicon">去分享</span>
            </div>
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
  import ENV from 'env'
  import Time from '#/time'
  import { User } from '#/storage'

  export default {
    data () {
      return {
        loginUser: {},
        articalData: [],
        activityData: [],
        productData: [],
        factoryData: [],
        titleData: {news: '最新文章', activity: '最新活动', product: '最新商品', factoryProduct: '最新厂家商品'},
        module: '',
        retailerInfo: {},
        pageStart: 0,
        limit: 20,
        disList: false
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
            if (self.module === 'news' && self.articalData.length === (self.pageStart + 1) * self.limit) {
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
            if (self.module === 'factoryProduct' && self.productData.length === (self.pageStart + 1) * self.limit) {
              self.pageStart++
              self.$vux.loading.show()
              self.getData4()
            }
          }
        })
      },
      getData1 () {
        const self = this
        let params = {pagestart: self.pageStart, limit: self.limit}
        self.$http.get(`${ENV.BokaApi}/api/list/news?from=retailer`, {
          params: params
        }).then(res => {
          self.$vux.loading.hide()
          let data = res.data
          let retdata = data.data ? data.data : data
          for (var i = 0; i < retdata.length; i++) {
            retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
          }
          self.articalData = self.articalData.concat(retdata)
          self.disList = true
        })
      },
      getData2 () {
        const self = this
        let params = {pagestart: self.pageStart, limit: self.limit}
        self.$http.get(`${ENV.BokaApi}/api/retailer/listActivity?do=store`, {
          params: params
        }).then(res => {
          self.$vux.loading.hide()
          let data = res.data
          let retdata = data.data ? data.data : data
          for (var i = 0; i < retdata.length; i++) {
            retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
          }
          self.activityData = self.activityData.concat(retdata)
          self.disList = true
        })
      },
      getData3 () {
        const self = this
        let params = {pagestart: self.pageStart, limit: self.limit, uploader: self.loginUser.uid}
        self.$http.get(`${ENV.BokaApi}/api/list/product`, {
          params: params
        }).then(res => {
          self.$vux.loading.hide()
          let data = res.data
          let retdata = data.data ? data.data : data
          for (var i = 0; i < retdata.length; i++) {
            retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
          }
          self.productData = self.productData.concat(retdata)
          self.disList = true
        })
      },
      getData4 () {
        const self = this
        let params = {pagestart: self.pageStart, limit: self.limit, agent: 1}
        self.$http.get(`${ENV.BokaApi}/api/list/product`, {
          params: params
        }).then(res => {
          self.$vux.loading.hide()
          let data = res.data
          let retdata = data.data ? data.data : data
          for (var i = 0; i < retdata.length; i++) {
            retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
          }
          self.productData = self.productData.concat(retdata)
          self.disList = true
        })
      },
      moduleShow () {
        this.disList = false
        this.articalData = []
        this.activityData = []
        this.productData = []
        this.factoryData = []
        this.pageStart = 0
        if (this.module === 'news') {
          this.getData1()
        } else if (this.module === 'activity') {
          this.getData2()
        } else if (this.module === 'product') {
          this.getData3()
        } else if (this.module === 'factoryProduct') {
          this.getData4()
        }
      }
    },
    created () {
      this.loginUser = User.get()
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
    .shead{width:100%;padding:10px 10px;box-sizing:border-box;background: linear-gradient(#ff6a61, #f63f3d);position:fixed;top:0;z-index:999;}
    .artical-item{
      border-bottom:1px solid #e5e5e5;box-sizing:border-box;
      .t-right{margin-left:auto;}
      .btnicon{
        background-color:#4cd964;color:#fff;font-size:12px;border-radius:20px;
        display:inline-block;width:50px;text-align: center;
      }
      .inner_item{width:100%;box-sizing:border-box;}
    }
    .artical-item .inner{
      width:50px;height:40px;
      img{width:40px;height:40px;object-fit:cover;}
    }
    .s-container{bottom:0px;}
  }
</style>
