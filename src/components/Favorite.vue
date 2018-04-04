<template>
  <div id="personal-favorite">
    <div class="top-banner">
      <div class="f-title">
        <div class="user-avatar">
          <img :src="avatar"/>
        </div>
        <div class="user-info">
          <div class="font16 color-white">{{ name }}</div>
          <div class="coin-row">
            <span class="user-coin">
              <i class="al al-jinbi3 font20"></i>
              <span class="font13 color-white">{{ coins }}</span>
            </span>
          </div>
        </div>
      </div>
      <tab class="x-tab">
        <tab-item selected class="" @on-item-click="onItemClick">{{ $t('Article') }}</tab-item>
        <tab-item @on-item-click="onItemClick">{{ $t('Goods') }}</tab-item>
        <tab-item @on-item-click="onItemClick">{{ $t('Store') }}</tab-item>
      </tab>
    </div>
  </div>
</template>

<i18n>

</i18n>

<script>
import { Grid, GridItem, Tab, TabItem } from 'vux'

export default {
  components: {
    Grid,
    GridItem,
    Tab,
    TabItem
  },
  data () {
    return {
      avatar: 'http://gongxiaoshe.qiyeplus.com/data/upload/avatar/user.jpg',
      name: '黄一萌',
      coins: 50
    }
  },
  methods: {
    onItemClick () {

    }
  }
}
</script>

<style lang="less">
#personal-favorite .top-banner {
  width: 100%;
  height: 154px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  background-image: url(../assets/images/bannerbg1.png);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

#personal-favorite .f-title {
  height: 110px;
  padding: 0 10px;
  display: flex;
}

#personal-favorite .user-avatar {
  width: 110px;
  margin: auto;
  text-align: center;
}

#personal-favorite .user-info {
  flex: 1;
  margin: auto;
}

#personal-favorite .user-avatar img {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  vertical-align: middle;
  border: 2px solid #fff;
}

#personal-favorite .x-tab {
  background: none;
}

#personal-favorite .user-coin {
  border: 1px solid #ffd706;
  border-radius: 22px;
  padding-right: 12px;
  min-width: 40px;
  display: inline-block;
  height: 20px;
  position: relative;
}

#personal-favorite .user-coin i {
  line-height: 20px;
  color: #ffd706;
}

#personal-favorite .user-coin span {
  line-height: 22px;
  vertical-align: top;
}

#personal-favorite .coin-row {
  margin-top: 10px;
}

/* vux css hack */
#personal-favorite .vux-tab {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
