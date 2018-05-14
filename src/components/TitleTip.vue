/*
* @description: 文章浏览头部组件
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <sticky :scroll-box="scrollBox" v-show="show">
    <div class="title-tip">
      <div class="avatar-cell">
        <img :src="avatarHref"/>
      </div>
      <div class="info-cell">
        <div class="user-name">
          {{userName}}
        </div>
        <div class="user-credit">
          {{$t('Gain Credit')}}: {{userCredit}}
        </div>
      </div>
      <div class="op-cell">
        <a>
          <span class="al al-pinglun color-black font24"></span>
        </a>
      </div>
    </div>
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
    scrollBox: String,
    avatarHref: {
      type: String,
      default: '../../assets/images/nopic.jpg'
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
      default: 5000
    }
  },
  data () {
    return {
      show: true
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
}
.title-tip .user-credit {
  color: @keywords-color;
}
</style>
