<template>
  <div class="h_100 error404">
    <div class="content-block">
      <div class="meeting_title1">
        <div class="content_tile mg">
          <span class="">{{ title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
export default {
  name: 'Sos',
  props: {
    title: {
      type: String,
      default: '您要找的内容不见了'
    }
  }
}
</script>

<style lang="less" scoped>
.error404 .content-block {
  margin:0px;
  padding:0;
  max-width:1920px;
  height:100%;
  margin:0 auto;
}
.error404 .list-block{
  margin:12px 0 0;
}
.error404 .meeting_title1{
  background:none;
  height:100%;
  color:#333;
  font-size:18px;
  line-height:40px;
  text-align:center;
}
.error404 .content_tile{
  width:98%;
  height:80%;
  margin:0 auto;
  padding-top:15%;
  box-sizing:border-box;
  background:url(../assets/images/404_icon.png) no-repeat center 90%;
  background-size:40%;
  box-shadow:0px 10px 20px rgba(0,0,0,0.05);
  border-radius:7%;
  text-shadow:1px 2px 0px rgba(255,255,255,1);
}
.error404 .back_year{
  height:20%;
  position:relative;
}
.error404 .back_year .back_btn{
  border:1px solid #04be02;
  left:0;
  right:0;
  top:0;
  bottom:0;
  margin:auto auto;
  width:30%;
  border-radius:10px;
  color:#888;
  letter-spacing:2px;
  padding:0 10px;
  font-size:14px;
  text-align:center;
  position:absolute;
}
.btncopyurl{
  padding:0 10px;
  border:#ccc 1px solid;
  border-radius:5px;
  display:inline-block;
}
@media only screen and (min-width:751px){
  .error404 .content_tile{
    width:98%;
    height:80%;
    padding-top:15%;
    box-sizing:border-box;
    background:url(../assets/images/404_icon.png) no-repeat center 90%;
    background-size:20%;
    box-shadow:0px 10px 20px rgba(0,0,0,0.05);
    border-radius:7%;
    text-shadow:1px 2px 0px rgba(255,255,255,1);
  }
}
@media only screen and (min-width:1200px){
  .error404 .content_tile{
    width:98%;
    height:80%;
    padding-top:15%;
    box-sizing:border-box;
    background:url(../assets/images/404_icon.png) no-repeat center 90%;
    background-size:15%;
    box-shadow:0px 10px 20px rgba(0,0,0,0.05);
    border-radius:7%;
    text-shadow:1px 2px 0px rgba(255,255,255,1);
  }
}
</style>
