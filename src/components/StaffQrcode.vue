<style lang="less">
.staff-qrcode-area{
  margin-top:10px;display:flex;justify-content:flex-start;align-items: center;
  .qrcode-inner{
    max-width:600px;display:flex;justify-content: flex-start;align-items: center;
    box-shadow: 0px 0px 3px 1px #e6ebed;border-radius: 5px;background-color:#fff;
    padding:10px;box-sizing: border-box;
  }
  .txt-cell{
    display:flex;justify-content: flex-start;align-items: center;
    margin-right:10px;color: #659af2;flex:1;
  }
  .pic-cell{
    display:flex;justify-content: flex-end;align-items: center;
    max-width:50%;
    img{display:block;max-width:100%;}
  }
}
</style>

<template>
  <div class="staff-qrcode-area">
    <div class="qrcode-inner">
      <div class="txt-cell">
        <div class="flex_cell">
          <div>1、享受新客户福利</div>
          <div>2、专属客服的一对一VIP服务</div>
          <div>3、{{sysParams.company_short}}优惠券</div>
          <div>4、领取微信红包</div>
          <div>5、随机打折券</div>
        </div>
      </div>
      <div class="pic-cell">
        <img :src="user.qrcode" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StaffQrcode',
  props: {
    user: {
      type: Object,
      default: {}
    },
    sysParams: {
      type: Object,
      default: {}
    }
  }
}
</script>
