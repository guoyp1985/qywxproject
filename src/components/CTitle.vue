/*
* @description: 个人中心头部组件
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div class="ctitle bg-page">
    <div class="info-area">
      <div class="bg"></div>
      <div class="card_box">
        <div class="card bg-white list-shadow02">
          <div class="content-box">
              <div class="user-info pt10 pb5">
                <router-link :to="{ name: 'tProfile', params: { profile: profile } }">
                  <div class="c_pic">
                    <img :src="avatar" class="v_middle" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                  </div>
                </router-link>
              </div>
              <div class="flex_center">
                <div class="user-info pr5" style="color:#323232;">
                  <router-link :to="{ name: 'tProfile', params: { profile: profile } }">
                    <div class="user-name" >
                      <span class="font16 u-name">{{ name }}</span>
                    <!-- <span v-for="i in userLevel + 1" class="al al-xing font13 u-star" :key="i"></span> -->
                    </div>
                  </router-link>
                </div>
                <!--
                <div class="user-credits">
                  <router-link :to="{ name: 'tCredit', params: { profile: profile } }">
                    <img src="../assets/images/jb_icon.png" style="width: 20px;height: 20px;" />
                    <span class="u-credits" style="color:#fca018;">{{ credits }}</span>
                  </router-link>
                </div>
              -->
              </div>
            </div>
            <div class="head_banner mt5"></div>
        </div>
      </div>
      <router-link class="message-btn" :to="{ name: 'tMessages', params: { profile: profile } }">
        <span class="al al-xiaoxi1 color-white font22"></span>
        <span class="msg-badge" v-if="messages > 0 && messages < 100">{{messages}}</span>
        <span class="msg-badge" v-if="messages >= 100">···</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { Grid, GridItem, Badge } from 'vux'

export default {
  name: 'CTitle',
  components: {
    Grid, GridItem, Badge
  },
  props: {
    // linkInfo: [String, Object],
    // linkCredit: [String, Object],
    profile: Object,
    avatarHref: {
      type: String,
      default: 'https://tossharingsales.boka.cn/images/user.jpg'
    },
    userName: {
      type: String,
      default: 'unkown'
    },
    userCredits: {
      type: Number,
      default: 0
    },
    userLevel: {
      type: Number,
      default: 0
    },
    messages: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
    }
  },
  computed: {
    name () {
      return this.userName
    },
    avatar () {
      return this.avatarHref
    },
    credits () {
      return this.userCredits
    }
  }
  // methods: {
  //   onClickUserInfo () {
  //     this.linkInfo && go(this.linkInfo, this.$router)
  //   },
  //   onClickUserCredits () {
  //     this.linkCredit && go(this.linkCredit, this.$router)
  //   }
  // }
}
</script>

<style lang="less">
.ctitle .head_banner{
  height:30px;
  background: url(../assets/images/v_yinying.png);
  background-size: cover;
  background-position: top;
}
.ctitle .bg{
  height: 140px;
  background: url(../assets/images/v_centerbg.png);
  background-size: cover;
  background-position: bottom;
}
.ctitle .info-area {
  position: relative;
  width: 100%;
  height: auto;
  border-radius: 0;
}
.ctitle .card_box{
  width: 100%;
  padding:0 12px;
  box-sizing:  border-box;
  position: absolute;
  top: 45px;
  z-index: 1;
}
.ctitle .card{
  width:100%;
  border-radius:5px;
  position: relative;
  overflow: hidden;
}
.ctitle .card .c_pic img{
  width: 71px;
  height: 71px;
  border-radius: 50%;
  vertical-align: middle;
  border: 2px solid #fff;
}

.ctitle .content .content-box {
  max-width: 375px;
  margin: 0 auto;
  text-align: center;
}

.ctitle .content .content-box .user-info{
  position: relative;
  text-align: center !important;
  text-align: center;
}
.ctitle .user-info {
  position: relative;
  text-align: center !important;
  text-align: center;
}
.ctitle .content .user-info .u-name {
  vertical-align: middle;
}
.ctitle .content .user-info .u-star {
  color: yellow;
}
.ctitle .content .user-name,
.ctitle .content .user-credits {
  margin-top: 4px;
}
.ctitle .content .user-credits img {
  width: 25px;
}
.ctitle .content .user-credits .u-credits {
  vertical-align: top;
}
.ctitle .message-btn {
  position: absolute;
  right: 15px;
  top: 10px;
  z-index: 3
}
.ctitle .message-btn .msg-badge {
  position: absolute;
  top: -2px;
  right: -8px;
  z-index: 3
}

/* weui css hack */
.ctitle .weui-grid__icon {
  height: auto;
  width: auto;
  text-align: center;
}

.ctitle .weui-grids:before {
  border-top: none;
  height: 0;
}
.ctitle .msg-badge{
  background-color: #ea3a3a;
  text-align:center;
  color:#fff;
  font-size:8pt;
  width: 20px;
  height: 20px;
  line-height: 18px;
  border-radius: 50%;
  display: block;
  padding: 0px;
}
</style>
