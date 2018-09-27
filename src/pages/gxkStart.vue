<template>
  <div class="containerarea">
    <div class="intro">
      <div class="xlist al al-tubiaozhizuomoban-copy">
        <!-- <img src="../assets/images/front/xlist.png" @click="toggle()" /> -->
        <div class="radis"></div>
        <span class="al al-tubiaozhizuomoban-copy" @click="toggle()"></span>
        <div class="menu" v-show="isShow">
          <div class="triangle-up"></div>
          <div class="txtTitle" @click="getTogxh()">共销汇</div>
          <div class="txtGxk">共销客</div>
        </div>
      </div>
      <div class="inner">
        <img class="pic" src="/src/assets/images/front/intro.jpg">
      </div>
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
          <img src="../assets/images/mgxk.jpg" />
          <div class="txtFont">长按识别共销客小程序</div>
          <!-- <a href="https://www.sharingsales.cn/#/centerSales"><button class="animation">免费入驻<div class="sweep-light"></div></button></a> -->
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
      isShow: false,
      photoShow: false,
      currentSkill: {},
      skills: [{
        skillTitle: '微信群轻松获客',
        skillIntro: '新人入群领福利，微信群获客更容易',
        skillImg: 'https://tossharingsales.boka.cn/start/skill1.png',
        phone1: '/src/assets/images/front/skill1phone1.png',
        phone2: '/src/assets/images/front/skill1phone2.png',
        skillMore: '发动你的客户及朋友帮你分享，只要查看过你店铺、商品或文章的用户，都会成为你的潜在客户。访客秒变客户，微信获客可以如此简单！'
      }, {
        especial: true,
        skillTitle: '邀请进群有福利',
        skillIntro: '老用户邀请新用户，群快速发展更简单',
        skillImg: 'https://tossharingsales.boka.cn/start/skill2.png',
        phone1: '/src/assets/images/front/skill2phone1.png',
        phone2: '/src/assets/images/front/skill2phone2.png',
        skillMore: '系统根据每位客户的分享、浏览等行为精确计算成交概率，成交概率越高的客户证明对你的产品越感兴趣，此时可主动出击与他取得联系，有效提高销售额。'
      }, {
        skillTitle: '微信群裂变轻松管理',
        skillIntro: '一个微信群，快速裂变百个微信群',
        skillImg: 'https://tossharingsales.boka.cn/start/skill3.png',
        phone1: '/src/assets/images/front/skill3phone1.png',
        phone2: '/src/assets/images/front/skill3phone2.png',
        skillMore: '潜在客户及时不是微信好友，也可通过系统直接联系，让你与客户的沟通随时随地。'
      }, {
        skillTitle: '个人影响力全新打造',
        skillIntro: '与其让用户了解产品，不如先让用户了解你',
        skillImg: 'https://tossharingsales.boka.cn/start/skill4.png',
        phone1: '/src/assets/images/front/skill4phone1.png',
        phone2: '/src/assets/images/front/skill4phone2.png',
        skillMore: '成交过程最难解决的就是“信任”问题，客户可通过商品页面查看到“本店购买过的好友”，并一键向购买过的好友咨询使用反馈，通过好友来解决买家对产品的信任问题。'
      }, {
        skillTitle: '微信群培训一劳永逸',
        skillIntro: '课程素材提前准备，在线培训随时随地',
        skillImg: 'https://tossharingsales.boka.cn/start/skill5.png',
        phone1: '/src/assets/images/front/skill5phone1.png',
        phone2: '/src/assets/images/front/skill5phone2.png',
        skillMore: '微商创业难点就是一个人在卖卖卖，不如将现有客户发展成“返点客”，“返点客”自己购买以及带来好友购买均可获得佣金奖励，返点佣金系统自动分发，“返点客”让你不再一个人战斗。'
      }, {
        skillTitle: '群活跃度迅速提高',
        skillIntro: '群活动调动群氛围，迅速提高群活跃度',
        skillImg: 'https://tossharingsales.boka.cn/start/skill5.png',
        phone1: '/src/assets/images/front/skill6phone1.png',
        phone2: '/src/assets/images/front/skill6phone2.png',
        skillMore: '微商创业难点就是一个人在卖卖卖，不如将现有客户发展成“返点客”，“返点客”自己购买以及带来好友购买均可获得佣金奖励，返点佣金系统自动分发，“返点客”让你不再一个人战斗。'
      }],
      summaries: ['获客+留存，一切尽在掌控', '玩好微信群营销，迅速提升销售额'],
      slogens: ['·会销售产品的人，能赚钱；', '·会销售产品又能使用系统的人，能赚更多的钱；', '·会销售产品，又会使用系统，还能够利用工具进行裂变的人，才能轻松挣大钱']
    }
  },
  methods: {
    getTogxh () {
      this.$router.push('/start')
    },
    toggle () {
      if (this.isShow === true) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
    onDetailItem (event) {
      console.log(event)
      let index = event.changedTouches[0].target.dataset.index
      console.log(index)
      this.photoShow = true
      this.currentSkill = this.skills[index]
      document.addEventListener('touchmove', function (event) {
        window.event.returnValue = false
      }, false)
    },
    onCloseBtn () {
      this.photoShow = false
      this.currentSkill = {}
      document.addEventListener('touchmove', function (event) {
        window.event.returnValue = true
      }, false)
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
.txtFont{
  padding-bottom:20px;
  letter-spacing:2px;
}
.containerarea{
  background-color:#ECF2FC;
}
.txtTitle{
  border-bottom:1px solid #e5e5e5;
  padding-bottom:5px;
  color:#1b87d6;
}
.txtGxk{
  padding-top:5px;
  color:#afa8a8;
}
.radis{
  position:absolute;
  width:50px;
  height:50px;
  border-radius:50%;
  background-color:#fff;
  margin-top:100px;
  z-index:1;
  position:fixed;
  right:15px;
  top:-80px;
  box-shadow: 0px 0px 7px 1px #abbbd2;
}
.triangle-up {
  position:absolute;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 15px solid #fff;
  margin:0 auto;
  right:10px;
  margin-top:-22px;
}
.xlist{
  color:#fff;
  position:absolute;
  top:0;
}
  .xlist>span{
    position:absolute;
    margin-top:103px;
    z-index:2;
    font-size:30px;
    position:fixed;
    right:25px;
    top:-80px;
    color:#17426a;
  }
  .menu{
    position:absolute;
    z-index:1;
    width:70px;
    height:80px;
    background-color:#fff;
    color:black;
    position:fixed;
    right:15px;
    top:85px;
    border-radius:5px;
    font-size:15px;
    text-align:center;
    padding-top:10px;
    box-shadow:0px 0px 7px 1px #abbbd2;
  }
  /* .menu>div:nth-child(2){
    border:1px solid #e5e5e5;
  } */
/* 动画效果 */
  .animation{
    width: 260px;
    height: 45px;
    border:0;
    line-height: 45px;
    background: #12a7f7;
    text-align: center;
    border-radius: 20px;
    overflow: hidden;
    margin: 0 auto;
    position: relative;
    font-size:18px;
    color:#fff;
    margin-top:180px;
    box-shadow: 2px 2px 5px #d4d4d4;
  }
  .sweep-light{
    position: absolute;
    left: 0;
    right: 20px;
    top: 0;
    bottom: 0;
    margin:auto;
    margin-left:80px;
    pointer-events: none;
    background-color: rgba(255,255,255,0.4);
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    -o-border-radius: 100%;
    -ms-border-radius: 100%;
    border-radius: 100%;
    -webkit-animation-fill-mode: both;
    -moz-animation-fill-mode: both;
    -ms-animation-fill-mode: both;
    -o-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
    width: 100px;
    height: 100px;
    -webkit-animation: ball-scale 1s 0s ease-in-out infinite;
    -moz-animation: ball-scale 1s 0s ease-in-out infinite;
    -ms-animation: ball-scale 1s 0s ease-in-out infinite;
    -o-animation: ball-scale 1s 0s ease-in-out infinite;
    animation: ball-scale 1s 0s ease-in-out infinite;
  }
  @-webkit-keyframes ball-scale {
    0% {
    -webkit-transform: scale(0);
    transform: scale(0)
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0
  }
  }
  @keyframes ball-scale {
    0% {
    -webkit-transform: scale(0);
    transform: scale(0)
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0
   }
  }
/*------------------------------*/
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
    width: 60%;
    margin-top: 100px;
  }
  /*.especial{
    width: 55% !important;
  }*/
  .close-btn{
    position: absolute;
    top: 20px;
    right: 20px;
    width: 20px;
    height: 20px;
    background: url('https://tossharingsales.boka.cn/start/closebtn.png') no-repeat center;
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
    width:100%;
    padding-bottom:178%;
    position:relative;
  }
  .intro .inner{position:absolute;left:0;top:0;right:0;bottom:0;}
  .intro .inner .pic{width:100%;}
  .intro .txtlist{position:absolute;left:10px;right:0;bottom:40%;}
  .intro .txtitem{
    /* height: 30px;
    line-height: 30px;*/
    color: #a0a4aa;
    text-align:left;
    display:inline-block;
    padding-left:30px;
    line-height:5px;
  }
 .intro .txtlist .txtitem:not(:last-child){margin-bottom:15px;}
  .intro:nth-child(1)>ul{
    margin-top: 50vh;
  }
  .txtlist .txtitem li:nth-child(2){padding-left:50px;}
    /*
  .intro:nth-child(1)>ul>li{
    height: 30px;
    line-height: 30px;
    font-size: 0;
    color: #a0a4aa;
    text-align: center;
    margin-bottom: 15px;
  } */
  .txtitem>span{
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
    height: 100%;
  }
  /* .txtitem>span:nth-child(1){
    width: 30px;
    line-height: 30px;
    height: 30px !important;
    text-align: center;
    border: 1px solid #a0a4aa;
    border-radius: 50%;
    margin-right: 10px;
    background-size: 60% auto !important;
  } */
  /* .txtitem>span:nth-child(1)>img{
    width: 20px;
    height: 20px;
    margin-top: 5px;
  } */
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
    background: url('https://tossharingsales.boka.cn/start/detailtitle.png') no-repeat center top;
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
    background: url('https://tossharingsales.boka.cn/start/detailitem.png') no-repeat center top;
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
    width: 130px;
    height: 281px;
  }
  /*.detail-item>ul>li:nth-child(2)>div:nth-child(3)>img{
    width: 80%;
  }*/
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
    background: url('https://tossharingsales.boka.cn/start/btnbk.png') no-repeat center;
    background-size: 100% auto;
  }
  .btn>ul{
    padding-top: 40px;
  }
  .btn>ul>li{
    text-align: left;
    color: #0c7ebb;
    font-size: 16px;
    line-height: 30px;
    font-weight: 700;
    padding: 0 10px;
  }
  .btn>img{
    width:150px;
    height:150px;
    margin-top:220px;
    padding-bottom:20px;
  }
  .detail-item>ul>li:nth-child(1){
    background: url('https://tossharingsales.boka.cn/start/skill1bk.jpg') no-repeat center;
    background-size: 100% auto;
  }
  .detail-item>ul>li:nth-child(2){
    background: url('https://tossharingsales.boka.cn/start/skill2bk.png') no-repeat center;
    background-size: 100% auto;
  }
  .detail-item>ul>li:nth-child(3){
    background: url('https://tossharingsales.boka.cn/start/skill3bk.png') no-repeat center;
    background-size: 100% auto;
  }
  .detail-item>ul>li:nth-child(4){
    background: url('https://tossharingsales.boka.cn/start/skill4bk.jpg') no-repeat center;
    background-size: 100% auto;
  }
  .detail-item>ul>li:nth-child(5){
    background: url('https://tossharingsales.boka.cn/start/skill5bk.jpg') no-repeat center;
    background-size: 100% auto;
  }
</style>
