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
      <div v-if="list == 'artical'" class="artical-item flex_left bg-white pt10 pb10 pr15 pl15" v-for="(item, index) in articalData">
        <div class="inner">
          <img src="https://tossharingsales.boka.cn/images/user.jpg" />
        </div>
        <div class="flex_left flex_cell">
          <div class="">
            <div class="font14 clamp1 wtitle">{{item.title}}</div>
            <div class="font12 color-gray2">{{item.time}}</div>
          </div>
          <div class="t-right">
            <span class="btnicon">分享</span>
          </div>
        </div>
      </div>
      <!-- 最新活动 -->
      <div v-if="list == 'activity'" class="artical-item flex_left bg-white pt10 pb10 pr15 pl15" v-for="(item, index) in activityData">
        <div class="inner">
          <img src="https://tossharingsales.boka.cn/images/user.jpg" />
        </div>
        <div class="flex_left flex_cell">
          <div class="">
            <div class="font14 clamp1 wtitle">{{item.title}}</div>
            <div class="font12 color-gray2">{{item.time}}</div>
          </div>
          <div class="t-right">
            <span class="btnicon">分享</span>
          </div>
        </div>
      </div>
      <!-- 最新商品 -->
      <div v-if="list == 'product'" class="artical-item flex_left bg-white pt10 pb10 pr15 pl15" v-for="(item, index) in productData">
        <div class="inner">
          <img src="https://tossharingsales.boka.cn/images/user.jpg" />
        </div>
        <div class="flex_left flex_cell">
          <div class="">
            <div class="font14 clamp1 wtitle">{{item.title}}</div>
            <div class="font12 color-gray2">{{item.time}}</div>
          </div>
          <div class="t-right">
            <span class="btnicon">分享</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        articalData: [{title: '文章标题', time: '2018-12-31'}, {title: '文章标题', time: '2018-12-31'}],
        activityData: [{title: '活动标题', time: '2018-12-31'}, {title: '活动标题', time: '2018-12-31'}],
        productData: [{title: '商品标题', time: '2018-12-31'}, {title: '商品标题', time: '2018-12-31'}],
        titleData: {artical: '最新文章', activity: '最新活动', product: '最新商品'},
        list: ''
      }
    },
    methods: {
      init () {
        console.log('页面参数名称：')
        this.list = this.$route.query.list
        console.log(this.list)
      }
    },
    created () {
      this.init()
    },
    watch: {
      $route (to, from) {
        this.list = this.$route.query.list
        console.log('页面参数名称：')
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
