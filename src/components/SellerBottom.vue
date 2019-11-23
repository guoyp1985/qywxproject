<template>
<div class="pagebottom seller-bottom">
  <div class="w_100 h_100 flex_center">
    <router-link :to="{path: '/centerSeller', query:{uid: query.uid,wid:query.wid}}" :class="`flex_cell item flex_center ${activeName == 'home' ? 'active' : ''}`">
      <div class="inner">
        <div class="tet"><i class="al al-shouye1 font24 db-in" style="margin-top:3px;"></i></div>
        <div class="txt">首页</div>
      </div>
    </router-link>
    <router-link :to="{path: '/sellerPromotion', query: {uid: query.uid}}" :class="`flex_cell item flex_center ${activeName == 'promotion' ? 'active' : ''}`">
      <div class="inner">
        <div class="tet"><i class="al al-goodsnewfill db-in"></i></div>
        <div class="txt">促销</div>
      </div>
    </router-link>
    <router-link v-if="showStore" :to="{path: '/store', query: {wid: query.uid}}" class="flex_center flex_cell item ">
      <div class="inner">
        <div class="tet">
          <div class="radius-icon">
            <i class="al al-dianpufill font28 color-white" style="line-height: 45px !important;"></i>
          </div>
        </div>
        <div class="txt" style="color: rgba(230, 28, 36, 0.5);">店铺</div>
      </div>
    </router-link>
    <router-link :to="{path: '/photoVideo', query: {uid: query.uid}}" :class="`flex_cell item flex_center ${activeName == 'photo' ? 'active' : ''}`">
      <div class="inner">
        <div class="tet"><i class="al al-zhaopian font24 db-in"></i></div>
        <div class="txt">图片</div>
      </div>
    </router-link>
    <router-link :to="{path: '/userStory', query: {uid: query.uid}}" :class="`flex_cell item flex_center ${activeName == 'story' ? 'active' : ''}`">
      <div class="inner">
        <div class="tet"><i class="al al-yonghuxinxi font26 db-in"></i></div>
        <div class="txt">反馈</div>
      </div>
    </router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'SellerBottom',
  props: {
    query: Object,
    loginUser: Object,
    activeName: {
      type: String,
      default: ''
    },
    showStore: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less">
.seller-bottom{
  height: 50px;border-top:rgb(249, 249, 249) 1px solid;background-color:#fff;
  box-shadow: rgb(170, 170, 170) 0px -1px 8px -4px;text-align: center;
  border-top:rgb(249, 249, 249) 1px solid;z-index:2;overflow-x: initial;
}

.seller-bottom .al,.seller-bottom .tet{height: 26px;line-height: 26px !important;position:relative;}
.seller-bottom .al-zhaopian:before{display: block;line-height: 36px;}
.seller-bottom .al-goodsnewfill:before{display: block;line-height: 32px;}
.seller-bottom .al-yonghuxinxi:before{display: block;line-height: 26px;}
.seller-bottom .item{height:100%;position:relative;color:#999;}
.seller-bottom .item.active{color:#e19194;}
.seller-bottom .item .inner{height:48px;}
.seller-bottom .al{font-size:22px;overflow: hidden;}
.seller-bottom .txt{height: 22px;line-height: 22px !important;font-size: 8pt;}
.seller-bottom .radius-icon{
  width:46px;height:46px;position:absolute;left:50%;margin-left:-23px;top:-18px;z-index:1;
  border-radius:50%;background-color:#e51c23;color:#fff;
}
</style>
