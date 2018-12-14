<template>
  <div class="containerarea">
    <div>
      <input type='checkbox' id="sidemenu" @click="onlayer" />
      <div class="aside">
          <div class="sideul">
              <div class="txtgxh">共销客</div>
              <div class="txtgxk active" @click="getTogxk">共销客</div>
          </div>
      </div>
      <div class='wrap'>
          <label for='sidemenu' class="al al-tubiaozhizuomoban-copy" v-show="btnOpen"></label>
          <!-- <label for='sidemenu' class="al al-guanbi" v-show="btnClose" style="background-color:red"></label> -->
      </div>
  </div>
    <div class="intro">
      <div class="inner">
        <img class="pic" src="https://tossharingsales.boka.cn/start/intro.jpg">
        <ul class="txtlist">
          <li class="txtitem" v-for="item in skills" :key="item.id"><span><img :src="item.skillImg"></span><span>{{item.skillTitle}}</span></li>
        </ul>
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
          <a href="https://www.sharingsales.cn/#/centerSales">
            <button class="animation">
              <span>免费入驻</span>
              <del class="font11 pl10 price">原价:￥199/年</del>
              <div class="sweep-light"></div>
            </button>
          </a>
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
    <div class="mceng" v-show="isShow"></div>
  </div>
</template>
<script type="text/javascript">
import BScroll from 'better-scroll'
import ENV from 'env'
import { User } from '#/storage'
export default{
  inject: ['reload'],
  data () {
    return {
      query: {},
      loginUser: {},
      btnOpen: true,
      btnClose: false,
      isShow: false,
      photoShow: false,
      currentSkill: {},
      skills: [{
        skillTitle: '微信获客信手捏来',
        skillIntro: '看过的用户都会成为你的潜在客户',
        skillImg: 'https://tossharingsales.boka.cn/start/skill1.png',
        phone1: 'https://tossharingsales.boka.cn/start/skill1phone1.png',
        phone2: 'https://tossharingsales.boka.cn/start/skill1phone2.png',
        skillMore: '发动你的客户及朋友帮你分享，只要查看过你店铺、商品或文章的用户，都会成为你的潜在客户。访客秒变客户，微信获客可以如此简单！'
      }, {
        especial: true,
        skillTitle: '成交可能直观体现',
        skillIntro: '根据潜在客户行为自动计算成交概率',
        skillImg: 'https://tossharingsales.boka.cn/start/skill2.png',
        phone1: 'https://tossharingsales.boka.cn/start/skill2phone1.png',
        phone2: 'https://tossharingsales.boka.cn/start/skill2phone2.png',
        skillMore: '系统根据每位客户的分享、浏览等行为精确计算成交概率，成交概率越高的客户证明对你的产品越感兴趣，此时可主动出击与他取得联系，有效提高销售额。'
      }, {
        skillTitle: '沟通客户主动及时',
        skillIntro: '即便不是微信好友也可直接联系',
        skillImg: 'https://tossharingsales.boka.cn/start/skill3.png',
        phone1: 'https://tossharingsales.boka.cn/start/skill3phone1.png',
        phone2: 'https://tossharingsales.boka.cn/start/skill3phone2.png',
        skillMore: '潜在客户及时不是微信好友，也可通过系统直接联系，让你与客户的沟通随时随地。'
      }, {
        skillTitle: '销售过程信任传递',
        skillIntro: '买家通过购买过的好友获取反馈',
        skillImg: 'https://tossharingsales.boka.cn/start/skill4.png',
        phone1: 'https://tossharingsales.boka.cn/start/skill4phone1.png',
        phone2: 'https://tossharingsales.boka.cn/start/skill4phone2.png',
        skillMore: '成交过程最难解决的就是“信任”问题，客户可通过商品页面查看到“本店购买过的好友”，并一键向购买过的好友咨询使用反馈，通过好友来解决买家对产品的信任问题。'
      }, {
        skillTitle: '更多的人帮你销售',
        skillIntro: '每一个客户都能帮你销售',
        skillImg: 'https://tossharingsales.boka.cn/start/skill5.png',
        phone1: 'https://tossharingsales.boka.cn/start/skill5phone1.png',
        phone2: 'https://tossharingsales.boka.cn/start/skill5phone2.png',
        skillMore: '微商创业难点就是一个人在卖卖卖，不如将现有客户发展成“返点客”，“返点客”自己购买以及带来好友购买均可获得佣金奖励，返点佣金系统自动分发，“返点客”让你不再一个人战斗。'
      }],
      summaries: ['共销客六脉神剑，助力新型微商', '轻松解决获客、销售双重难题'],
      slogens: ['·会销售产品的人，能赚钱；', '·会销售产品又能使用系统的人，能赚更多的钱；', '·会销售产品，又会使用系统，还能够利用工具进行裂变的人，才能轻松挣大钱']
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
              threshold: 0.3,
              swipeTime: 3000
            }
          })
        })
      }
    }
  },
  methods: {
    getTogxk () {
      this.$router.push('/miniStart')
    },
    onlayer () {
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
    },
    init () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      self.loginUser = User.get()
      console.log(self.loginUser)
      if (self.query.share_uid) {
        let params = {uid: self.query.share_uid}
        params.share_uid = self.query.share_uid
        params.share_module = 'centerseller'
        if (self.query.lastshareuid) {
          params.lastshareuid = self.query.lastshareuid
        }
        self.$http.get(`${ENV.BokaApi}/api/retailer/info`, {
          params: params
        })
      }
      let shareParams = {
        module: 'centerseller',
        moduleid: self.loginUser.uid,
        title: '共销客',
        desc: '共销客六脉神剑，助力新型微商',
        photo: 'https://tossharingsales.boka.cn/start/intro.jpg',
        link: `${ENV.Host}/#/miniStart?share_uid=${self.loginUser.uid}`
      }
      if (self.query.share_uid) {
        shareParams.link = `${shareParams.link}&lastshareuid=${self.query.share_uid}`
        shareParams.lastshareuid = self.query.share_uid
      }
      console.log(shareParams)
      self.$util.handleWxShare(shareParams)
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.$util.miniPost()
  }
}
</script>
<style type="text/css">
.price{
  color:#fff;position:absolute;line-height:48px;
}
.mceng{
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background-color: rgba(0, 0, 0, 0.6);
  overflow: hidden;
  z-index:0;
}
/*侧边栏导航条*/
  .txtgxh{padding-left:50px;}
  .txtgxh.active{color:#b8b8bd;}
  .txtgxk{padding-left: 20px;}
  .txtgxk.active{color:#b8b8bd;}
  #sidemenu{
  display: none;
  }
  #sidemenu:checked + .aside {
  left: 0;
  }
  #sidemenu:checked ~ .wrap {
  padding-left: 220px;
  }
  .aside {
  position: absolute;
  top: 18px;
  bottom: 0;
  left: -200px;
  width: 208px;
  height: 45px;
  background: white;
  transition: 0.2s ease-out;
  line-height: 45px;
  position:fixed;
  z-index:1;
  }
  .wrap {
  position: absolute;
  height: 45px;
  left:-15px;
  padding: 10px;
  transition: 0.2s ease-out;
  }
  label {
  background: white;
  color: #fff;
  cursor: pointer;
  display: block;
  font-family: Courier New;
  font-size: 30px;
  width: 45px;
  height: 45px;
  line-height: 48px;
  text-align: center;
  display: inline-block;
  background-color:#08a4fb;
  z-index:1;
  position:fixed;
  top:18px;
  border-top-right-radius:5px;
  border-bottom-right-radius:5px;
  }
  .sideul {
  display:flex;
  flex-direction:row;
  list-style: none;
  color: #1b87d6;
  width: 100%;
  font-size: 15px;
  text-align: center;
  z-index:1;
  }
/*over*/
  .containerarea{
    background-color:#ECF2FC;
  }
/* 动画效果 */
  .animation{
    width: 260px;
    height: 45px;
    border:0;
    line-height: 45px;
    background: #12a7f7;
    border-radius: 20px;
    overflow: hidden;
    margin: 0 auto;
    position: relative;
    font-size:18px;
    color:#fff;
    margin-top:220px;
    box-shadow: 0px 0px 7px 1px #abbbd2;
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
    margin-top: 80px;
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
  .intro .txtlist{position:absolute;left:0;right:0;bottom:14%;}
  .intro .txtitem{
    height: 30px;
    line-height: 30px;
    color: #e1e2e6;
    text-align: center;
  }
  .intro .txtlist .txtitem:not(:last-child){margin-bottom:15px;}
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
  .txtitem>span{
    display: inline-block;
    vertical-align: top;
    font-size: 18px;
    height: 100%;
  }
  .txtitem>span:nth-child(1){
    width: 30px;
    line-height: 30px;
    height: 30px !important;
    text-align: center;
    border: 1px solid #a0a4aa;
    border-radius: 50%;
    margin-right: 10px;
    background-size: 60% auto !important;
  }
  .txtitem>span:nth-child(1)>img{
    width: 20px;
    height: 20px;
    margin-top: 5px;
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
    padding: 10px 20px;
  }
  .btn{
    width: 100vw;
    height: 400px;
    text-align: center;
    background: url('https://tossharingsales.boka.cn/start/btnbk.png') no-repeat center;
    background-size: 100% auto;
  }
  /* .btn>button{
    background-color: #0c7ebb;
    border-radius: 5px;
    border: none;
    color: #fff;
    padding: 10px 20px;
    margin-top: 100px;
  } */
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
