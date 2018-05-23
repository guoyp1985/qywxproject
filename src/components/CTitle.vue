/*
* @description: 个人中心头部组件
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div class="ctitle">
    <div class="info-area">
      <div class="bg" style="width: 750px;height: 375px;margin-left: -375px;"></div>
      <div class="content">
        <div class="content-box">
          <div class="user-info">
            <router-link :to="{ name: 'tProfile', params: { profile: profile } }">
              <div>
                <img :src="avatar"/>
              </div>
              <div class="user-name">
                <span class="color-white font16 u-name">{{ name }}</span>
                <span v-for="i in userLevel + 1" class="al al-xing font13 u-star" :key="i"></span>
              </div>
            </router-link>
          </div>
          <div class="user-credits">
            <router-link :to="{ name: 'tCredit', params: { profile: profile } }">
              <img src="../assets/images/jb_icon.png"/>
              <span class="u-credits color-yellow1">{{ credits }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="message-btn">
      <router-link :to="{ name: 'tMessages', params: { profile: profile } }">
        <span class="al al-pinglun color-white font24"></span>
        <badge class="msg-badge" v-if="messages > 0" :text="messages"></badge>
      </router-link>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Grid, GridItem, Badge, XImg } from 'vux'
export default {
  name: 'CTitle',
  components: {
    Grid, GridItem, Badge, XImg
  },
  props: {
    // linkInfo: [String, Object],
    // linkCredit: [String, Object],
    profile: Object,
    avatarHref: String,
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
.ctitle .info-area {
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 185px;
  background: #fff;
  border-radius: 0;
}

.ctitle .bg {
  position: absolute;
  content: "";
  display: block;
  bottom: 0;
  left: 50%;
  margin-left: -750px;
  width: 1500px;
  height: 750px;
  border-radius: ~"750px/350px";
  z-index: 1;
	background-image: -o-linear-gradient(179deg, #30bded 0, #2085c5 20%);
	background-image: -moz-linear-gradient(179deg, #30bded 0, #2085c5 20%);
	background-image: -ms-linear-gradient(179deg, #30bded 0, #2085c5 20%);
	background-image: linear-gradient(358deg, #30bded 0, #2085c5 20%);
	border-color: #eee;
	background-color: #5899d0;
}

.ctitle .content {
  position: absolute;
  z-index: 2;
  width: 100%;
}

.ctitle .content .content-box {
  padding-top: 30px;
  max-width: 375px;
  margin: 0 auto;
  text-align: center;
}

.ctitle .content .content-box .user-info {
  position: relative;
  text-align: center !important;
}

.ctitle .content .user-info img {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  vertical-align: middle;
  border: 2px solid #fff;
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
  right: 20px;
  top: 10px;
  z-index: 3
}
.ctitle .message-btn .msg-badge {
  position: absolute;
  top: 2px;
  right: -6px;
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
</style>
