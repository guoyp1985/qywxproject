<template>
  <div class="authentication">
    <div class="header">根据电子商务法律规定，请先进行实名认证</div>
    <div class="photo1">
      <div class="phleft">
        <img src="../assets/images/card/photo1.png" />
        <div class="txt">(身份证正面)</div>
      </div>
      <div class="linek">
        <span class="al al-zhaoxiangji"></span>
        <div class="font10 txtph">上传正面照片</div>
      </div>
    </div>
    <div class="photo1 mt10">
      <div class="phleft">
        <img src="../assets/images/card/photo2.png" />
        <div class="txt">(身份证反面)</div>
      </div>
      <div class="linek">
        <span class="al al-zhaoxiangji"></span>
        <div class="font10 txtph">上传反面照片</div>
      </div>
    </div>
    <div class="photo1 mt10">
      <div class="phleft">
        <img src="../assets/images/card/photo3.png" />
        <div class="txt">(手持正面)</div>
      </div>
      <div class="linek">
        <span class="al al-zhaoxiangji"></span>
        <div class="font10 txtph">手持正面照片</div>
      </div>
    </div>
    <div class="message mt5"><span>* </span>拍摄二代身份证原件，确保图片清晰，四角完整。</div>
    <div class="btn">
      <div class="btnbom btn-bottom-red">立即认证</div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="less">
  .authentication{width:100%;height:100%;background-color:#F2F2F2;}
  .authentication .header{height:44px;text-align:center;line-height:44px;background: -webkit-linear-gradient(#ff6a61, #f63f3d);color:#fff;}
  .authentication .photo1{
    width:100%;padding:20px 50px;background-color:#fff;color:#666666;font-size:14px;display:flex;flex-direction:row;position: relative;
    border-bottom:1px solid #e5e5e5;
  }
  .authentication .photo1 img{width:100px;height:70px;}
  .authentication .photo1 .txt{padding-left:10px;}
  .authentication .photo1 .linek{
    width:80px;height:80px;border:1px dashed #e5e5e5;position:absolute;right:160px;top:25px;text-align:center;color:#a5a5a5;line-height:80px;
  }
  .authentication .photo1 .linek .txtph{position:absolute;top:25px;left:5px;}
  .authentication .message{text-align:right;font-size:10px;color:#a5a5a5;}
  .authentication .message span{font-size:16px;color:red;}
  .authentication .btn{width:100%;margin:0 auto;}
  .authentication .btn .btnbom{
    width:85%;height:40px;color:#fff;text-align:center;line-height:40px;position:fixed;bottom:0;
    left:0;right:0;margin-left:auto;margin-right:auto;
  }
</style>
