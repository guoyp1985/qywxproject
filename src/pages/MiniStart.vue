<template>
  <div class="containerarea">
    <div class="intro">
      <div class="navigation">
        <input type='checkbox' id="sidemenu" @click="onlayer" />
        <div class="aside">
            <div class="sideul">
                <div class="txtgxh active" @click="getTogxh">共销客</div>
                <div class="txtgxk">共销客</div>
            </div>
        </div>
        <div class='wrap'>
            <label id='sideMenuControl' for='sidemenu' class="lbl al al-tubiaozhizuomoban-copy"></label>
        </div>
    </div>
      <div class="inner">
        <img class="pic" src="https://tossharingsales.boka.cn/start/gxk/intro.jpg">
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
    <div class="mceng" v-show="isShow"></div>
  </div>
</template>
<script type="text/javascript">
import BScroll from 'better-scroll'
import ENV from 'env'
import { User } from '#/storage'
export default{
  data () {
    return {
      query: {},
      loginUser: {},
      isShow: false,
      photoShow: false,
      currentSkill: {},
      skills: [{
        skillTitle: '微信群轻松获客',
        skillIntro: '新人入群领福利，微信群获客更容易',
        skillImg: 'https://tossharingsales.boka.cn/start/skill1.png',
        phone1: 'https://tossharingsales.boka.cn/start/gxk/skill1phone1.png',
        phone2: 'https://tossharingsales.boka.cn/start/gxk/skill1phone2.png',
        skillMore: '新用户进群群主发红包答谢，发送的红包无法控制领取过的用户不再领取。共销客小程序自动识别新用户身份，为新用户发放入群福利。'
      }, {
        especial: true,
        skillTitle: '邀请进群有福利',
        skillIntro: '老用户邀请新用户，群快速发展更简单',
        skillImg: 'https://tossharingsales.boka.cn/start/skill2.png',
        phone1: 'https://tossharingsales.boka.cn/start/gxk/skill2phone1.png',
        phone2: 'https://tossharingsales.boka.cn/start/gxk/skill2phone2.png',
        skillMore: '群内老用户邀请新用户进群，即可获得邀请福利，通过老用户介绍新用户的方式，不仅可以调动老用户的积极性，还可以快速解决微信群的获客问题。'
      }, {
        skillTitle: '微信群裂变轻松管理',
        skillIntro: '一个微信群，快速裂变百个微信群',
        skillImg: 'https://tossharingsales.boka.cn/start/skill3.png',
        phone1: 'https://tossharingsales.boka.cn/start/gxk/skill3phone1.png',
        phone2: 'https://tossharingsales.boka.cn/start/gxk/skill3phone2.png',
        skillMore: '利用“返点客”发展裂变群，培养一个300人的返点客群，每位返点客建立一个300人的微信群，卖家即可拥有300*300=90000个潜在客户，通过共销客轻松管理裂变群。'
      }, {
        skillTitle: '个人影响力全新打造',
        skillIntro: '与其让用户了解产品，不如先让用户了解你',
        skillImg: 'https://tossharingsales.boka.cn/start/skill4.png',
        phone1: 'https://tossharingsales.boka.cn/start/gxk/skill4phone1.png',
        phone2: 'https://tossharingsales.boka.cn/start/gxk/skill4phone2.png',
        skillMore: '卖家秀可面向所有微信用户，弥补朋友圈的不足，先让用户来了解你，彼此建立信任感之后，才能走向“成交”。'
      }, {
        skillTitle: '微信群培训一劳永逸',
        skillIntro: '课程素材提前准备，在线培训随时随地',
        skillImg: 'https://tossharingsales.boka.cn/start/skill5.png',
        phone1: 'https://tossharingsales.boka.cn/start/gxk/skill5phone1.png',
        phone2: 'https://tossharingsales.boka.cn/start/gxk/skill5phone2.png',
        skillMore: '微信群对代理和客户进行培训需实时在群内发送语音、图片以及文字，全程只能一人在忙，培训的内容无法重复利用。培训功能支持培训内容提前录入，一键邀请群成员参与听课，课件永久保存，重复利用。'
      }, {
        skillTitle: '群活跃度迅速提高',
        skillIntro: '群活动调动群氛围，迅速提高群活跃度',
        skillImg: 'https://tossharingsales.boka.cn/start/skill5.png',
        phone1: 'https://tossharingsales.boka.cn/start/gxk/skill6phone1.png',
        phone2: 'https://tossharingsales.boka.cn/start/gxk/skill6phone2.png',
        skillMore: '微信群营销做的好不好，一定程度上取决于群活跃度高不高。微信群活动有效提高群成员的参与度，并鼓励群成员进行分享，短时间内为卖家获得大量客户及微信好友。'
      }],
      summaries: ['获客+留存，一切尽在掌控', '玩好微信群营销，迅速提升销售额'],
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
              threshold: 0.3
            }
          })
        })
      }
    }
  },
  methods: {
    onlayer () {
      if (this.isShow === true) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
    getTogxh () {
      this.$router.push('/start')
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
        desc: '微信群营销工具',
        photo: 'https://tossharingsales.boka.cn/start/gxk/intro.jpg',
        link: `${ENV.Host}/#/miniStart?share_uid=${self.loginUser.uid}`
      }
      if (self.query.share_uid) {
        shareParams.link = `${shareParams.link}&lastshareuid=${self.query.share_uid}`
        shareParams.lastshareuid = self.query.share_uid
      }
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
.mceng{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
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
  .txtFont{
    padding-bottom:20px;
    letter-spacing:2px;
  }
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
    padding: 10px 20px;
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
