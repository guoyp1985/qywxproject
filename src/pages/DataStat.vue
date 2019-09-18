<style lang="less">
.data-stat-page{
  .box-area:not(:last-child){margin-bottom:20px;}
  .box-area{
    box-shadow:0px 0px 3px 1px #e6ebed;
    padding:10px;background-color:#fff;
    .col-item:not(:last-child):after{
      content:"";display:block;
    	background-color:@list-border-color;height:1px;overflow:hidden;
    	position: absolute;left: 0;right: 0;bottom:0px;
    	-webkit-transform: scaleY(0.5) translateY(0.5px);
    	transform: scaleY(0.5) translateY(0.5px);
    	-webkit-transform-origin: 0% 0%;
    	transform-origin: 0% 0%;
    }
    .col-item{
      width:100%;display:flex;flex-wrap: wrap;padding-top:10px;padding-bottom:10px;position:relative;
      .row-item:not(:last-child):after{
        content:"";display:block;
      	background-color:@list-border-color;width:1px;overflow:hidden;
      	position: absolute;right: 0;top: 0;bottom:0px;
      	-webkit-transform: scaleX(0.5) translateX(0.5px);
      	transform: scaleX(0.5) translateX(0.5px);
      	-webkit-transform-origin: 0% 0%;
      	transform-origin: 0% 0%;
      }
      .row-item{
        width:50%;box-sizing:border-box;position:relative;
        .txt1{
          text-align:center;color:#999;font-size:16px;
        }
        .txt2{
          text-align:center;color:#ff6a61;font-weight:bold;
        }
      }
      .big{
        .txt2{font-size:20px;}
      }
      .middle{
        .txt2{font-size:16px;}
      }
      .small{
        .txt2{font-size:14px;}
      }
    }
  }
}
</style>
<template>
  <div class="containerarea font14 bg-page data-stat-page">
    <div class="box-area">
      <div class="col-item">
        <div class="row-item big">
          <div class="txt1">今日订单</div>
          <div class="txt2">100</div>
        </div>
        <div class="row-item big">
          <div class="txt1">今日收入</div>
          <div class="txt2">100.00</div>
        </div>
      </div>
      <div class="col-item">
        <div class="row-item big">
          <div class="txt1">今日入驻</div>
          <div class="txt2">200</div>
        </div>
        <div class="row-item big">
          <div class="txt1">今日销售额</div>
          <div class="txt2">300.00</div>
        </div>
      </div>
    </div>
    <div class="box-area">
      <div class="col-item">
        <div class="row-item big">
          <div class="txt1">本月订单</div>
          <div class="txt2">100</div>
        </div>
        <div class="row-item big">
          <div class="txt1">本月收入</div>
          <div class="txt2">100.00</div>
        </div>
      </div>
      <div class="col-item">
        <div class="row-item big">
          <div class="txt1">本月入驻</div>
          <div class="txt2">200</div>
        </div>
        <div class="row-item big">
          <div class="txt1">本月销售额</div>
          <div class="txt2">300.00</div>
        </div>
      </div>
    </div>
    <div class="box-area">
      <div class="col-item">
        <div class="row-item big">
          <div class="txt1">累计订单</div>
          <div class="txt2">100</div>
        </div>
        <div class="row-item big">
          <div class="txt1">累计收入</div>
          <div class="txt2">100.00</div>
        </div>
      </div>
      <div class="col-item">
        <div class="row-item big">
          <div class="txt1">累计入驻</div>
          <div class="txt2">200</div>
        </div>
        <div class="row-item big">
          <div class="txt1">累计销售额</div>
          <div class="txt2">300.00</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {} from 'vux'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'

export default {
  components: {
  },
  data () {
    return {
      query: {},
      loginUser: {}
    }
  },
  filters: {
    dateFormat: function (isoDate) {
      return new Time(isoDate).dateFormat('yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
    }
  },
  created () {
  },
  activated () {
    this.refresh()
  }
}
</script>
