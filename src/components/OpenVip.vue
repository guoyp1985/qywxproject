<template>
  <div class="viplayer font14 flex_center">
    <div class="inner">
      <div class="logo flex_center">
        <img src="../assets/images/logo_blue.png" />
      </div>
      <div class="bg color-white">
        <div class="font16 align_center pt10">开通VIP</div>
        <div class="flex_center">
          <div class="flex_right flex_cell">
            <span>{{$t('RMB')}}</span>
            <span style="font-size:24px;">99</span>
            <span>元/年</span>
          </div>
          <div class="w40"></div>
          <div class="flex_left flex_cell" style="text-decoration:line-through;">
            <span>{{$t('RMB')}}</span>
            <span>299</span>
            <span>元/年</span>
          </div>
        </div>
      </div>
      <div class="bg-white pt20" style="border-bottom-left-radius:10px;border-bottom-right-radius:10px;">
        <div class="txtline">
          <div class="txt">VIP特权</div>
        </div>
        <div class="padding20 align_center">
          <div>· 添加商品无数量限制</div>
          <div>· 添加活动无数量限制</div>
          <div>· 采集文章无数量限制</div>
          <div>· 了解客户的最新动态</div>
          <div>· 在线与客户取得联系</div>
          <div>· 聚客大管家使用权限</div>
        </div>
        <div class="padding20">
          <div class="db-flex">
            <div class="flex_cell flex_left">
              <div class="btn" style="background-color:#d7d7d7" @click="closeVip">放弃=错失良机</div>
            </div>
            <div class="flex_cell flex_right">
              <div class="btn" style="background-color:#099ded;color:#fff;" @click="openVip">立即开通</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OpenVip',
  props: {
  },
  data () {
    return {}
  },
  methods: {
    closeVip () {
      this.$emit('hide-vip')
    },
    openVip () {
      this.$emit('open-vip')
    }
  }
}
</script>

<style lang="less">
.viplayer{position:absolute;left:0;top:0;right:0;bottom:0;background-color:rgba(0,0,0,0.6);z-index:10;}
.viplayer .inner{width:80%;max-width:300px;position:relative;border-radius:10px;}
.viplayer .logo{position:absolute;top:-30px;left:50%;margin-left:-30px;width:60px;height:60px;background-color:#fff;border-radius:50%;}
.viplayer .logo img{width:60px;}
.viplayer .bg{
  width:100%;height:80px;padding-top:30px;border-top-left-radius:10px;border-top-right-radius:10px;
  background-image:url(../assets/images/bannerbg.png);background-position:center;background-repeat:no-repeat;
  background-size:cover;
}
.viplayer .txtline{position:relative;height:30px;background-color:#fff;}
.viplayer .txtline:before{content:"";z-index:1;position:absolute;width:130px;height:2px;left:50%;margin-left:-65px;top:50%;margin-top:-1px;background-color:#099ded;}
.viplayer .txtline .txt{
  z-index:2;width:70px;height:30px;line-height:30px;background-color:#fff;color:#099ded;text-align:center;
  position:absolute;left:50%;margin-left:-35px;
}
.viplayer .btn{
  border-radius:10px;height:40px;line-height:40px;width:110px;text-align:center;
}
</style>
