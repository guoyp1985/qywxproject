<template>
  <div class="ctitle">
    <div class="info-area">
      <div class="bg" style="width: 750px;height: 375px;margin-left: -375px;"></div>
      <div class="content">
        <div class="content-box">
          <div class="user-info" @click="onClickUserInfo">
            <div>
              <img :src="avatar"/>
            </div>
            <div class="user-name">
              <span class="color-white font16 u-name">{{ name }}</span>
              <span class="al al-xing font13 u-star"></span>
            </div>
          </div>
          <div class="user-credits" @click="onClickUserCredits">
            <img src="../assets/_images/jb_icon.png"/>
            <span class="u-credits color-yellow1">{{ credits }}</span>
          </div>
        </div>
      </div>
    </div>
    <grid :show-lr-borders="false" :show-vertical-dividers="false">
      <grid-item :label="$t('Search Orders')">
        <div slot="icon" class="circle-icon-bg rgba02 color-white">
          <span class="fa fa-file-text-o"></span>
        </div>
      </grid-item>
      <grid-item :label="$t('View Productions')">
        <div slot="icon" class="circle-icon-bg rgba05 color-white">
          <span class="fa fa-shopping-bag"></span>
        </div>
      </grid-item>
      <grid-item :label="$t('View Articles')">
        <div slot="icon" class="circle-icon-bg rgba04 color-white">
          <span class="fa fa-newspaper-o"></span>
        </div>
      </grid-item>
    </grid>
  </div>
</template>

<i18n>
  Search Orders:
    zh-CN: 查订单
  View Productions:
    zh-CN: 挑商品
  View Articles:
    zh-CN: 看文章
</i18n>

<script>
import { Grid, GridItem } from 'vux'
import { go } from '../../libs/router'

export default {
  name: 'CTitle',
  components: {
    Grid,
    GridItem
  },
  props: {
    linkInfo: [String, Object],
    linkCredit: [String, Object],
    avatarHref: {
      type: String,
      default: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/user.jpg'
    },
    userName: {
      type: String,
      default: 'unkown'
    },
    userCredits: {
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
  },
  methods: {
    onClickUserInfo () {
      this.linkInfo && go(this.linkInfo, this.$router)
    },
    onClickUserCredits () {
      this.linkCredit && go(this.linkCredit, this.$router)
    }
  }
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
