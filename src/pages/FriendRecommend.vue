<template>
  <div class="containerarea font14 friendRecommend">
    <div style="width:100%;height:110px;">
      <div class="rhead flex_left t-table">
        <div class="inner">
          <img src="https://tossharingsales.boka.cn/images/user.jpg" />
        </div>
        <div class="txt-cell color-white flex_cell">
          <div class="font16 clamp1">嗯</div>
          <div class="clamp1">店铺宝贝: 50</div>
        </div>
        <div style="position: absolute; top: 30px; right: 14px; height: 35px;">
          <router-link :to="{ path: '', query: {} }">
            <span class="al al-xiaoxi1 font24 color-white"></span>
          </router-link>
        </div>
      </div>
    </div>
    <!-- 文章 -->
    <div class="share-list mt10">
      <div class="border-t12 border pt10 pb10 pr15 pl15 bg-white b_bottom_after">
        <div class="t-table">
          <div class="t-cell middle-cell align_left font16">最新文章</div>
          <router-link :to="{ path: '/NewestList', query: {list: 'artical'} }" class="t-cell middle-cell align_right font14">
            <div style="color:#40aadd;">更多>></div>
          </router-link>
        </div>
      </div>
      <div class="artical-item flex_left bg-white pt10 pb10 pr15 pl15" v-for="(item, index) in articalData">
        <div class="inner">
          <img src="https://tossharingsales.boka.cn/images/user.jpg" />
        </div>
        <div class="flex_left flex_cell">
          <div class="">
            <div class="font14 clamp1 wtitle">文章标题</div>
            <div class="font12 color-gray2">2018-11-20</div>
          </div>
          <div class="t-right">
            <span class="btnicon">去分享</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 活动 -->
    <div class="share-list mt10">
      <div class="border-t12 border pt10 pb10 pr15 pl15 bg-white b_bottom_after">
        <div class="t-table">
          <div class="t-cell middle-cell align_left font16">最新活动</div>
          <router-link :to="{ path: '/NewestList', query: {list: 'activity'} }" class="t-cell middle-cell align_right font14">
            <div style="color:#40aadd;">更多>></div>
          </router-link>
        </div>
      </div>
      <div class="artical-item flex_left bg-white pt10 pb10 pr15 pl15" v-for="(item, index) in articalData">
        <div class="inner">
          <img src="https://tossharingsales.boka.cn/images/user.jpg" />
        </div>
        <div class="txt-cell flex_cell">
          <div class="font14 clamp1 wtitle">活动标题</div>
          <div class="font12 color-gray2">2018-11-20</div>
        </div>
        <div class="t-right">
          <span class="btnicon">去分享</span>
        </div>
      </div>
    </div>
    <!-- 商品 -->
    <div class="share-list mt10">
      <div class="border-t12 border pt10 pb10 pr15 pl15 bg-white b_bottom_after">
        <div class="t-table">
          <div class="t-cell middle-cell align_left font16">最新商品</div>
          <router-link :to="{ path: '/NewestList', query: {list: 'product'} }" class="t-cell middle-cell align_right font14">
            <div style="color:#40aadd;">更多>></div>
          </router-link>
        </div>
      </div>
      <div class="artical-item flex_left bg-white pt10 pb10 pr15 pl15" v-for="(item, index) in articalData">
        <div class="inner">
          <img src="https://tossharingsales.boka.cn/images/user.jpg" />
        </div>
        <div class="txt-cell flex_cell">
          <div class="font14 clamp1 wtitle">商品标题</div>
          <div class="font12 color-gray2">2018-11-20</div>
        </div>
        <div class="t-right">
          <span class="btnicon">去分享</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        selectedIndex: 0,
        item: {uid: 985},
        articalData: [{id: 1}, {id: 2}, {id: 3}]
      }
    }
  }
</script>
<style lang="less">
  .friendRecommend{
    background-color:#EFEEF3;
    .rhead{
      padding:20px 10px;box-sizing:border-box;background: linear-gradient(#ff6a61, #f63f3d);position:fixed;top:0;z-index:999;
      .inner{
        width:80px;height:70px;
        img{width:70px;height:70px;border-radius:50%;}
      }
    }
    .share-list{}
    .artical-item{
      border-bottom:1px solid #e5e5e5;
      .wtitle{width:200px;}
      .t-right{margin-left:auto;width:50px;}
      .btnicon{border-radius:4px;background-color:#4cd964;color:#fff;padding:2px 5px;font-size:12px;display:inline-block;}
    }
    .artical-item .inner{
      width:50px;height:40px;
      img{width:40px;height:40px;}
    }
  }
</style>
