/*
* @description: 群群推下单页面
* @auther: simon
* @created_date: 2019-1-8
*/
<template>
  <div id="room-order-deal" class="containerarea font14 s-havebottom">
    <div class="room-details">
      <room-view :item="room" :show-details="true"></room-view>
    </div>
    <div class="operation-area">
      <form>
        <forminputplate class="required">
          <span slot="title">群名称</span>
          <div class="align_right pr10 color-gray">
            <div class="select-area">选择商品</div>
          </div>
        </forminputplate>
      </form>
    </div>
    <div class="protocal-area">
      <check-icon :value.sync="isAccept" type="plain"><a>同意群群推协议</a></check-icon>
    </div>
    <div class="s-bottom submit-button color-white">
      <span>支付保证金 ￥{{bond}}</span>
    </div>
  </div>
</template>
<script>
import { CheckIcon } from 'vux'
import RoomView from '@/components/RoomView'
import forminputplate from '@/components/Forminputplate'
export default {
  components: {
    CheckIcon, RoomView, forminputplate
  },
  data () {
    return {
      isAccept: false,
      room: {id: 1, topic: 'baba', avatar: 'https://tossharingsales.boka.cn/images/nopic.jpg'},
      bond: 0
    }
  }
}
</script>
<style lang="less">
#room-order-deal .operation-area {
  margin-top: 10px;
  background-color: #ffffff;
}
#room-order-deal .submit-button {
  background-color: @boka-red;
  line-height: 45px;
  text-align: center;
}
#room-order-deal .select-area {
  height: 32px;
  line-height: 32px;
}
#room-order-deal .select-area:after {
  content: " ";
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #c8c8cd;
  border-style: solid;
  -webkit-transform: matrix(.71,.71,-.71,.71,0,0);
  transform: matrix(.71,.71,-.71,.71,0,0);
  position: relative;
  top: -2px;
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 2px;
}
#room-order-deal .protocal-area {
  padding: 20px 0;
  text-align: center;
}
</style>
