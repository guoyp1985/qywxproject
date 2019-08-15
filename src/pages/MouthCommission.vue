<template>
  <div class="containerarea font14 mouthcommission bg-page">
    <div class="customerinfo1" v-for="(item,index) in items" :key="index">
      <div class="topinfo flex_left">
        <div class="outbox"><div class="innerbox"><img src="https://tossqzx.boka.cn/avatar/5/8421.jpg"/></div></div>
        <div>
          <div class="uname">{{item.title}}</div>
          <div class="time">2019-06-19 12:00:00</div>
        </div>
        <div class="left1 a">分佣：¥ 100</div>
      </div>
    </div>
  </div>
</template>
<script>
// import ENV from 'env'
export default {
  data () {
    return {
      title: '',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      list: []
    }
  },
  created: function () {
    const self = this
    self.$http.get(`https://laravel.boka.cn/api/list_n/productclass`).then((res) => {
      console.log(res.data)
      this.list = res.data.data
      console.log(self.list)
    })
  }
  // methods: {
  //   getData () {
  //
  //   }
  // }
}
</script>
<style lang="less">
  .mouthcommission{
    .customerinfo1{
      margin-bottom: 10px;
    }
    .topinfo{
      padding: 10px;
      box-sizing: border-box;
      background: white;
    }
    .uname{
      font-size: 18px;
    }
    .left1{
      color: #ff3b30 !important;
      text-align: center;
      margin: 0 5px;
    }
    .a{
      margin-left: auto !important;
    }
    .time{
      color: #cdcdcd;
    }
    .outbox{
      height: 60px;
      width: 80px;
    }
    .innerbox{
      height: 60px;
      width: 60px;
      border-radius: 50px;
    }
    .innerbox img{
      width: 100%;
      height: 100%;
      border-radius: 50px;
    }
  }
</style>
