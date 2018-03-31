<template>
  <div class="ctitle">
    <div class="bg"></div>
    <div class="content">
      <div class="info">
        <div class="avatar" @click="onClick">
          <div>
            <img :src="avatar" />
          </div>
          <div>
            <span>{{ name }}</span>
            <span class="star">
              <i></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { go } from '../../libs/router'

export default {
  name: 'CTitle',
  props: {
    link: [String, Object],
    avatarLink: {
      type: String,
      default: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/user.jpg'
    },
    userName: {
      type: String,
      default: 'unkown'
    }
  },
  computed: {
    name () {
      return this.userName
    },
    avatar () {
      return this.avatarLink
    }
  },
  methods: {
    onClick () {
      this.link && go(this.link, this.$router)
    }
  }
}
</script>

<style lang="less">
.ctitle {
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
  border-radius: 750px/350px;
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

.ctitle .content .info {
  padding-top: 30px;
  max-width: 375px;
  margin: 0 auto;
  text-align: center;
}

.ctitle .content .info .avatar {
  position: relative;
  width: 110px;
  text-align: center !important;
}

.ctitle .content .info img {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  vertical-align: middle;
  border: 2px solid #fff;
}

.ctitle .content .info .star {
  color: yellow;
  display: inline-block;
  border-radius: 10px;
  height: 16px;
  line-height: 13px;
}
</style>
