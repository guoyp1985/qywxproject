<template>
  <div class="bk-salestopplate">
    <div class="img-cell">
      <slot name="img"></slot>
    </div>
    <div class="txt-cell">
      <slot name="txtarea"></slot>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'salestopplate'
}
</script>
<style lang="less">
.bk-salestopplate {
  width: 100%;
  height: 145px;
  background-image: url(../assets/images/bannerbg1.png);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.bk-salestopplate .img-cell{
  padding-left:20px;
  width:100px;
  height:100%;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.bk-salestopplate .img-cell img{
  width: 76px;
  height: 76px;
  border: rgba(255, 255, 255, 0.5) 2px solid;
  border-radius: 50%;
}

.bk-salestopplate .right-cell {
  flex: 1;
  height: 100%;
  position: relative;
}

.bk-salestopplate .right-cell .right-content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 0;
}

.bk-salestopplate .right-cell .title-area {
  font-size: 18px !important;
  color: #fff;
}

.bk-salestopplate .right-cell .nav-area {
  position: relative;
}

.bk-salestopplate .right-cell .btns-area {
  position: absolute;
  right: 20px;
}
</style>
