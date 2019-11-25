<template>
  <div class="bk-nameplate">
    <div class="left-cell">
      <slot name="icon"></slot>
    </div>
    <div class="right-cell">
      <div class="right-content">
        <div class="title-area">
          <slot name="title"></slot>
        </div>
        <div class="nav-area">
          <div class="btns-area">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Nameplate'
}
</script>

<style lang="less">
.bk-nameplate {
  width: 100%;
  height: 100px;
  background-image: url(../assets/images/bannerbg.png);
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
  padding: 10px 0;
}

.bk-nameplate .left-cell {
  width: 100px;
  height: 100%;
  position: relative;
}

.bk-nameplate .right-cell {
  flex: 1;
  height: 100%;
  position: relative;
}

.bk-nameplate .right-cell .right-content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 0;
}

.bk-nameplate .right-cell .title-area {
  font-size: 18px !important;
  color: #fff;
}

.bk-nameplate .right-cell .nav-area {
  position: relative;
}

.bk-nameplate .right-cell .btns-area {
  position: absolute;
  right: 20px;
}
</style>
