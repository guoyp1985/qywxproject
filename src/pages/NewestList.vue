<template>
  <div class="containerarea font14 newestList">
    <div style="width:100%;height:45px">
      <div v-if="list == 'artical'" class="shead flex_left font16 color-white">
        {{titleData.artical}}
      </div>
      <div v-if="list == 'activity'" class="shead flex_left font16 color-white">
        {{titleData.activity}}
      </div>
      <div v-if="list == 'product'" class="shead flex_left font16 color-white">
        {{titleData.product}}
      </div>
    </div>
    <div class="share-list">
      <!-- 最新文章 -->
      <div v-if="list == 'artical'">
        <div v-if="!articalData || articalData.length == 0" class="flex_center font16 mt10">暂无文章数据！</div>
        <div class="artical-item flex_left bg-white pt10 pb10 pr15 pl15" v-for="(item, index) in articalData">
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
      <div v-if="list == 'activity'">
        <div v-if="!activityData || activityData.length == 0" class="flex_center font16 mt10">抱歉！暂无活动</div>
        <div class="artical-item flex_left bg-white pt10 pb10 pr15 pl15" v-for="(item, index) in activityData">
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
      <div v-if="list == 'product'">
        <div v-if="!productData || productData.length == 0" class="flex_center font16 mt10">暂无商品！</div>
        <div class="artical-item flex_left bg-white pt10 pb10 pr15 pl15" v-for="(item, index) in productData">
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
    </div>
  </div>
</template>
<script>
  import ENV from 'env'
  import Time from '../../libs/time'
  export default {
    data () {
      return {
        articalData: [],
        activityData: [],
        productData: [],
        titleData: {artical: '最新文章', activity: '最新活动', product: '最新商品'},
        list: ''
      }
    },
    methods: {
      init () {
        this.list = this.$route.query.list
        console.log(this.list)
      },
      getData1 () {
        const self = this
        self.$http.post(`${ENV.BokaApi}/api/list/news?from=retailer&pagestart=0&limit=10`).then(res => {
          let data = res.data
          let retdata = data.data ? data.data : data
          for (var i = 0; i < retdata.length; i++) {
            retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
          }
          self.articalData = retdata
        })
      },
      getData2 () {
        const self = this
        self.$http.post(`${ENV.BokaApi}/api/retailer/listActivity?pagestart=0&limit=10`).then(res => {
          let data = res.data
          let retdata = data.data ? data.data : data
          for (var i = 0; i < retdata.length; i++) {
            retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
          }
          self.activityData = retdata
        })
      },
      getData3 () {
        const self = this
        self.$http.post(`${ENV.BokaApi}/api/list/product?from=retailer&pagestart=0&limit=10`).then(res => {
          let data = res.data
          let retdata = data.data ? data.data : data
          for (var i = 0; i < retdata.length; i++) {
            retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
          }
          self.productData = retdata
        })
      }
    },
    created () {
      this.init()
      this.getData1()
      this.getData2()
      this.getData3()
    },
    watch: {
      $route (to, from) {
        this.list = this.$route.query.list
        console.log(this.list)
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
  }
</style>
