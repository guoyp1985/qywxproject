<style lang="less">
.income-list-item:after{display:none;}
.income-list-item:not(:last-child){margin-bottom:10px;}
.income-list-item{
  .pic{width:40px;}
  img{width:35px;height:35px;border-radius:50%;}
  .date-cell{width:110px;}
  .bg-item{background-color:rgba(245,249,250,0.7);}
}
.border_bottomAndTop{
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
}
</style>

<template>
  <div class="scroll_item bg-white mt10 list-shadow income-list-item">
    <div class="flex_left padding10 b_bottom_after">
      <div class="flex_left pic">
        <img :src="item.avatar" />
      </div>
      <div class="flex_cell flex_left ml5 mr5">
        <div class="w_100 clamp1">{{item.customername}}</div>
      </div>
      <div class="flex_right bold font16">￥{{item.money}}</div>
      <!-- <div class="flex_right date-cell">
        <div class="w_100 clamp1 font12 color-gray align_right">{{item.dateline_str}}</div>
      </div> -->
    </div>
    <!-- <div class="padding10 font12 border_bottomAndTop">
      <div class="db-flex mb5">
        <div class="flex_left color-gray">佣金类型</div>
        <div class="flex_cell align_right color-orange">{{item.content}}</div>
      </div>
      <div class="db-flex mb5">
        <div class="flex_left color-gray">金额</div>
        <div class="flex_cell align_right color-orange">{{item.ordermoney}}</div>
      </div>
      <div class="db-flex mb5">
        <div class="flex_left color-gray">佣金</div>
        <div class="flex_cell align_right color-orange">{{item.money}}</div>
      </div>
    </div> -->
    <div class="padding10 flex_left color-theme">{{item.desc}}</div>
  </div>
</template>

<script>
export default {
  name: 'IncomeItem',
  props: {
    item: {
      type: Object,
      default: {}
    },
    index: {
      type: Number,
      default: 0
    },
    tabIndex: {
      type: Number,
      default: 0
    },
    user: {
      type: Object,
      default: {}
    }
  },
  methods: {
  }
}
</script>
