<style lang="less">
.qy-footer{
  display:flex;justify-content: center;align-items: center;
  padding:0 12px;width:100%;box-sizing: border-box;height:50px;overflow:hidden;
  position: absolute;left: 0;right: 0;bottom: 0;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.07);
  .item{
    flex:1;display:flex;justify-content: center;align-items: center;height:100%;
    .inner{
      position:relative;
    }
    .radius-area{width:35px;height:35px;position:relative;}
    .radius-ico{
      position:absolute;left:50%;top:-10px;margin-left:-17px;
    }
    .avatar{width:20px;height:20px;border-radius:50%;object-fit:cover;margin-left:3px;}
  }
}
</style>

<template>
  <div class="qy-footer">
    <router-link class="item" to="/">首页</router-link>
    <!-- <div class="item"><router-link class="item" to="/qiyeCustomerList">服务</router-link> </div> -->
    <div class="item">
      <div class="inner">
        <span class="al al-jiahao1" style="font-size:45px;"></span>
      </div>
    </div>
    <!-- <div class="item"><router-link class="item" to="/saleChance">机会</router-link> </div> -->
    <router-link class="item" to="/center">
      <span>我</span>
      <!-- <img
        class="avatar"
        v-if="user && user.avatar && user.avatar != ''"
        :src="user.avatar"
        onerror="javascript:this.src='https://tosqy.boka.cn/images/user.jpg';" /> -->
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'QiyeFooter',
  props: {
    user: {
      type: Object,
      default: {}
    }
  }
}
</script>
