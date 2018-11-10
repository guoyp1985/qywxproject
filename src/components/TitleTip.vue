/*
* @description: 文章浏览头部组件
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <sticky :scroll-box="scrollBox" v-show="show">
    <template v-if="user.subscribe == 0">
      <div class="title-tip color-blue flex_center" @click="access">您有待领取的金币，点击领取 ></div>
    </template>
    <template v-else>
      <div class="title-tip">
        <router-link class="avatar-cell" to="/center">
          <img :src="avatarHref" class="imgavatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
        </router-link>
        <router-link class="info-cell flex_left" to="/center">
          <div class="user-name">
            {{userName}}
          </div>
          <!--
          <div class="user-credit">
            {{$t('Credit')}}: {{userCredit}}
          </div>
        -->
        </router-link>
        <router-link class="op-cell" to="/messages">
          <span class="al al-pinglun color-black font24"></span>
          <span v-if="messages > 0" class="numicon">{{ messages }}</span>
        </router-link>
      </div>
    </template>
  </sticky>
</template>
<i18n>
</i18n>
<script>
import { Sticky } from 'vux'
export default {
  name: 'TitleTip',
  components: {
    Sticky
  },
  props: {
    user: Object,
    scrollBox: String,
    avatarHref: {
      type: String,
      default: 'https://tossharingsales.boka.cn/images/user.jpg'
    },
    userName: {
      type: String,
      default: 'unkown'
    },
    userCredit: {
      type: Number,
      default: 0
    },
    delay: {
      type: Number,
      default: 15000
    },
    messages: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      show: true,
      waitgetcredit: 100
    }
  },
  methods: {
    access () {
      this.$util.wxAccess()
    }
  },
  created () {
    const self = this
    setTimeout(() => {
      self.show = false
    }, this.delay)
  }
}
</script>
<style lang="less">
.title-tip {
  position: relative;
  padding: 10px 15px;
  background-color: #ffffff;
  display: flex;
  font-size: 13px;
  color: #999999;
}
.title-tip:after {
  content: ' ';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  border-bottom: 1px solid #efefef;
}
.title-tip .avatar-cell {
  width: 40px;
  height: 40px;
}
.title-tip .avatar-cell img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.title-tip .info-cell {
  padding-left: 10px;
  flex: 1;
}
.title-tip .op-cell {
  width: 50px;
  text-align: right;
  position:relative;
}
.title-tip .user-credit {
  color: @keywords-color;
}
.title-tip .numicon {
    position: absolute;
    top: 0;
    right: -15px;
    background: #f06825;
    padding: 0 1px;
    border-radius: 16%;
    color: #fff;
    font-size: 10px;
    min-width: 18px;
    text-align: center;
}
</style>
