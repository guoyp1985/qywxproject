<template>
  <div>
    <div class="intro">
      <ul>
        <li v-for="item in skills" :key="item.id"><span></span><span>{{item.skillTitle}}</span></li>
      </ul>
    </div>
    <div class="detail">
        <div class="detail-title"></div>
        <div class="detail-summary">
          <ul>
            <li v-for="item in summaries" :key="item.id">{{item}}</li>
          </ul>
        </div>
        <div class="detail-item">
          <ul>
            <li v-for="(item, index) in skills" :key="item.id">
              <h1>{{item.skillTitle}}</h1>
              <p>{{item.skillIntro}}</p>
              <div><img :src="item.phone1"></div>
              <div><img :src="item.phone2"></div>
              <button :data-index="index" @touchend="onDetailItem">了解详情></button>
            </li>
          </ul>
        </div>
        <div class="btn">
          <ul>
            <li v-for="item in slogens" :key="item.id">{{item}}</li>
          </ul>
          <button>免费入驻</button>
        </div>
    </div>
    <div class="photo-show" v-if="photoShow" ref="photoShowContainer">
      <ul>
        <li>
          <img :class="{especial: currentSkill.especial}" :src="currentSkill.phone1">
        </li>
        <li>
          <img :src="currentSkill.phone2">
        </li>
      </ul>
      <div class="close-btn" @touchend="onCloseBtn"></div>
      <div class="skill-more">{{currentSkill.skillMore}}</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import BScroll from 'better-scroll'
export default{
  data () {
    return {
      photoShow: false,
      currentSkill: {},
      skills: [{
        skillTitle: '微信获客信手捏来',
        skillIntro: '看过的用户都会成为你的潜在客户',
        phone1: require('./skill1phone1.png'),
        phone2: require('./skill1phone2.png'),
        skillMore: '发动你的客户及朋友帮你分享，只要查看过你店铺、商品或文章的用户，都会成为你的潜在客户。访客秒变客户，微信获客可以如此简单！'
      }, {
        especial: true,
        skillTitle: '客户层级直观体现',
        skillIntro: '根据潜在的客户自动计算成交概率',
        phone1: require('./skill2phone1.png'),
        phone2: require('./skill2phone2.png'),
        skillMore: '系统根据每位客户的分享、浏览等行为精确计算成交概率，成交概率越高的客户证明对你的产品越感兴趣，此时可主动出击与他取得联系，有效提高销售额。'
      }, {
        skillTitle: '沟通客户主动及时',
        skillIntro: '即便不是微信好友也可直接联系',
        phone1: require('./skill3phone1.png'),
        phone2: require('./skill3phone2.png'),
        skillMore: '潜在客户及时不是微信好友，也可通过系统直接联系，让你与客户的沟通随时随地。'
      }, {
        skillTitle: '销售过程信任传递',
        skillIntro: '买家通过购买过的好友获取反馈',
        phone1: require('./skill4phone1.png'),
        phone2: require('./skill4phone2.png'),
        skillMore: '成交过程最难解决的就是“信任”问题，客户可通过商品页面查看到“本店购买过的好友”，并一键向购买过的好友咨询使用反馈，通过好友来解决买家对产品的信任问题。'
      }, {
        skillTitle: '更多的人帮你销售',
        skillIntro: '返点客让你不再一个人销售',
        phone1: require('./skill5phone1.png'),
        phone2: require('./skill5phone2.png'),
        skillMore: '微商创业难点就是一个人在卖卖卖，不如将现有客户发展成“返点客”，“返点客”自己购买以及带来好友购买均可获得佣金奖励，返点佣金系统自动分发，“返点客”让你不再一个人战斗。'
      }],
      summaries: ['共销客六脉神剑，助力新型微商', '轻松解决获客、销售双重难题'],
      slogens: ['·会销售产品的人，能赚钱；', '·会销售产品又能使用系统的人，能赚更多的钱；', '·会销售产品，又会使用系统，还能够利用工具进行裂变的人，才能轻松挣大钱']
    }
  },
  methods: {
    onDetailItem (event) {
      console.log(event)
      let index = event.changedTouches[0].target.dataset.index
      console.log(index)
      this.photoShow = true
      this.currentSkill = this.skills[index]
      document.addEventListener('touchmove', function (event) {
        window.event.returnValue = false;
      }, false);
    },
    onCloseBtn () {
      this.photoShow = false
      this.currentSkill = {}
      document.addEventListener('touchmove', function (event) {
        window.event.returnValue = true;
      }, false);
    }
  },
  watch: {
    currentSkill (newValue) {
      console.log(newValue)
      if (newValue.skillTitle !== undefined) {
        this.$nextTick(res => {
          this.scroll = new BScroll(this.$refs.photoShowContainer, {
            scrollX: true,
            scrollY: false,
            snap: {
              loop: false,
              threshold: 0.3
            }
          })
        })
      }
    }
  }
};
</script>
<style type="text/css">
  .photo-show{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    overflow: hidden;
  }
  .photo-show>ul{
    width: 200vw;
    height: 100vh;
    font-size: 0;
  }
  .photo-show>ul>li{
    width: 100vw;
    height: 100vh;
    text-align: center;
    display: inline-block;
    vertical-align: top;
  }
  .photo-show>ul>li>img{
    width: 50%;
    margin-top: 100px;
  }
  .especial{
    width: 55% !important;
  }
  .close-btn{
    position: absolute;
    top: 20px;
    right: 20px;
    width: 20px;
    height: 20px;
    background: url('./closebtn.png') no-repeat center;
    background-size: 100% auto;
  }
  .skill-more{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100vw;
    font-size: 12px;
    text-align: justify;
    color: #fff;
    line-height: 20px;
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .intro{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: url('./intro.jpg') no-repeat center top;
    background-size: 100% auto;
  }
  .intro:nth-child(1)>ul{
    margin-top: 50vh;
  }
  .intro:nth-child(1)>ul>li{
    height: 30px;
    line-height: 30px;
    font-size: 0;
    color: #a0a4aa;
    text-align: center;
    margin-bottom: 15px;
  }
  .intro:nth-child(1)>ul>li>span{
    display: inline-block;
    vertical-align: top;
    font-size: 16px;
    height: 100%;
  }
  .intro:nth-child(1)>ul>li>span:nth-child(1){
    width: 30px;
    border: 1px solid #a0a4aa;
    border-radius: 50%;
    margin-right: 10px;
    background-size: 60% auto !important;
  }
  .intro:nth-child(1)>ul>li:nth-child(1)>span:nth-child(1){
    background: url('./skill1.png') no-repeat center;
  }
  .intro:nth-child(1)>ul>li:nth-child(2)>span:nth-child(1){
    background: url('./skill2.png') no-repeat center;
  }
  .intro:nth-child(1)>ul>li:nth-child(3)>span:nth-child(1){
    background: url('./skill3.png') no-repeat center;
  }
  .intro:nth-child(1)>ul>li:nth-child(4)>span:nth-child(1){
    background: url('./skill4.png') no-repeat center;
  }
  .intro:nth-child(1)>ul>li:nth-child(5)>span:nth-child(1){
    background: url('./skill5.png') no-repeat center;
  }
  .detail{
    background-color: #ecf3fd;
  }
  .detail-title{
    width: 150px;
    height: 45px;
    position: relative;
    margin: 0 auto;
    top: -7px;
    color: #fff;
    background: url('./detailtitle.png') no-repeat center top;
    background-size: 100% auto;
  }
  .detail-summary>ul>li{
    text-align: center;
    line-height: 30px;
    font-size: 16px;
  }
  .detail-item{
    background-size: 100%;
    text-align: center;
  }
  .detail-item>ul>li{
    text-align: center;
    font-size: 0;
  }
  .detail-item>ul>li>h1{
    width: 180px;
    margin: 0 auto;
    font-size: 16px;
    color: #0c7ebb;
    padding-bottom: 10px;
    border-bottom: 1px solid #dddddd;
  }
  .detail-item>ul>li>p{
    background: url('./detailitem.png') no-repeat center top;
    font-size: 14px;
    color: #323232;
    padding-top: 15px;
    margin-top: -3px;
  }
  .detail-item>ul>li>div{
    display: inline-block;
    width: 50%;
    margin: 30px 0;
  }
  .detail-item>ul>li>div>img{
    width: 70%;
  }
  .detail-item>ul>li:nth-child(2)>div:nth-child(3)>img{
    width: 80%;
  }
  .detail-item>ul>li>button{
    margin: 0 auto 30px;
    background-color: #0c7ebb;
    border-radius: 5px;
    border: none;
    color: #fff;
    padding: 5px 10px;
  }
  .btn{
    width: 100vw;
    height: 400px;
    text-align: center;
    background: url('./btnbk.png') no-repeat center;
    background-size: 100% auto;
  }
  .btn>button{
    background-color: #0c7ebb;
    border-radius: 5px;
    border: none;
    color: #fff;
    padding: 10px 20px;
    margin-top: 100px;
  }
  .btn>ul{
    margin-top: 30px;
  }
  .btn>ul>li{
    text-align: left;
    color: #0c7ebb;
    font-size: 16px;
    line-height: 30px;
    font-weight: 700;
    padding: 0 10px;
  }
  .detail-item>ul>li:nth-child(1){
    background: url('./skill1bk.jpg') no-repeat center;
    background-size: 100% auto;
  }
  .detail-item>ul>li:nth-child(2){
    background: url('./skill2bk.png') no-repeat center;
    background-size: 100% auto;
  }
  .detail-item>ul>li:nth-child(3){
    background: url('./skill3bk.png') no-repeat center;
    background-size: 100% auto;
  }
  .detail-item>ul>li:nth-child(4){
    background: url('./skill4bk.jpg') no-repeat center;
    background-size: 100% auto;
  }
  .detail-item>ul>li:nth-child(5){
    background: url('./skill5bk.jpg') no-repeat center;
    background-size: 100% auto;
  }
</style>
