<template>
  <div class="containerarea font14 bg-page stimeline">
    <div class="pagemiddle">
      <div class="boxouter box1">
        <div class="boxinner">
          <div class="flex_left row1">
            <div class="pic">
              <img :src="loginUser.avatar" onerror="javascript:this.src='http://vuxlaravel.boka.cn/images/user.jpg';" />
            </div>
            <div class="flex_cell flex_left">
              <div class="clamp1">
                <span class="v_middle">{{retailerInfo.title}}</span>
                <span class="v_middle font12 color-gray">
                  <span class="v_middle">{{loginUser.province}}</span>
                  <span class="v_middle" v-if="loginUser.city && loginUser.city != ''">·{{loginUser.city}}</span>
                </span>
              </div>
            </div>
            <div class="btn-cell">
              <router-link :to="{path: '/chat', query: {uid: loginUser.uid}}" class="btn">联系TA</router-link>
            </div>
          </div>
          <div class="row2">
            <span class="v_middle color-red5">店主说: </span>
            <span class="v_middle">我尝试过无数失败，但我始终相信自己可以，只要能够坚持，不靠男人一样可以打拼出自己的天地！</span>
          </div>
          <div class="row3">
            <span class="v_middle color-red5">我的标签: </span>
            <div class="taglist">
              <div class="tagitem">钢琴(23)</div>
              <div class="tagitem">护肤经验(673)</div>
              <div class="tagitem">钢琴(23)</div>
              <div class="tagitem">护肤经验(673)</div>
              <div class="tagitem">钢琴(23)</div>
              <div class="tagitem">护肤经验(673)</div>
            </div>
          </div>
        </div>
      </div>
      <div class="linearea">
        <div class="line line1"></div>
        <div class="line line2"></div>
      </div>
      <div class="boxouter box2">
        <div class="boxinner">
          <div class="row1">{{focusCount}}位好友关注了TA</div>
          <div class="focuslist">
            <router-link class="item" :to="{path:'/chat',query:{uid:item.uid}}" v-for="(item,index) in focusData" :key="index">
              <div class="pic">
                <img :src="item.avatar" onerror="javascript:this.src='http://vuxlaravel.boka.cn/images/user.jpg';" />
              </div>
              <div class="txt">
                <div class="clamp1 font12 color-gray2 align_center">{{ item.linkman }}</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="pagebottom flex_center">
      <div class="flex_cell item flex_center">
        <div>
          <div class="icon"><i class="al al-sccollection"></i></div>
          <div class="txt">店主动态</div>
        </div>
      </div>
      <div class="flex_cell item flex_center">
        <div>
          <div class="icon"><i class="al al-zhaopian"></i></div>
          <div class="txt">图片视频</div>
        </div>
      </div>
      <div class="flex_cell item flex_center">
        <div>
          <div class="icon"><i class="al al-yonghuxinxi"></i></div>
          <div class="txt">用户故事</div>
        </div>
      </div>
      <div class="flex_cell item flex_center">
        <div>
          <div class="icon"><i class="al al-goodsnewfill"></i></div>
          <div class="txt">店主促销</div>
        </div>
      </div>
      <div class="flex_cell item flex_center">
        <div>
          <div class="icon"><i class="al al-dianpufill"></i></div>
          <div class="txt">进入店铺</div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import {} from 'vux'
import ENV from 'env'
import { User } from '#/storage'

export default {
  components: {
  },
  data () {
    return {
      query: {},
      loginUser: {},
      retailerInfo: {},
      focusCount: 3,
      focusData: [
        { uid: 7, linkman: 'gyp', avatar: 'http://osslaravel.boka.cn/avatar/1/7.jpg' },
        { uid: 25, linkman: '小小于', avatar: 'http://osslaravel.boka.cn/avatar/1/25.jpg' },
        { uid: 39, linkman: '大笨牛', avatar: 'http://osslaravel.boka.cn/avatar/1/39.jpg' }
      ]
    }
  },
  methods: {
    refresh () {
      const self = this
      self.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      self.query = self.$route.query
      self.loginUser = User.get()
      self.$http.get(`${ENV.BokaApi}/api/retailer/home`).then(function (res) {
        if (res.status === 200) {
          let data = res.data
          self.retailerInfo = data.data ? data.data : data
        }
      })
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.stimeline .boxouter{padding-left:5px;padding-right:5px;box-sizing: border-box;}
.stimeline .boxouter .boxinner{
  position:relative;z-index:1;background-color:#fff;
  border-radius:5px;
  border: rgb(244, 244, 244) 1px solid;
  box-shadow: rgb(204, 204, 204) 0px -9px 16px -3px;
}
.stimeline .box1 .row1{height:35px;}
.stimeline .box1 .pic{
  padding-left:20px;
  width:77px;height:35px;
  position:relative;
}
.stimeline .box1 .pic img{
  width: 67px;height: 67px;
  box-shadow: rgb(170, 170, 170) 0px -3px 12px -3px;
  border-radius:50%;
  vertical-align:middle;
  position:absolute;top:-35px;
}
.stimeline .box1 .btn-cell{
  width:90px;text-align:center;
}
.stimeline .box1 .btn{
  display:block;margin:0 auto;
  width: 70px;height: 26px;line-height:26px;color:#fff;
  background-color: rgb(229, 28, 35);
  border-radius: 27px;
  font-size: 12px;
}
.stimeline .box1 .row2{margin-top:12px;padding:0 20px;box-sizing: border-box;}
.stimeline .box1 .row3{margin-top:12px;padding:0 20px 15px;box-sizing: border-box;}
.stimeline .taglist{display:inline-block;}
.stimeline .taglist .tagitem{
  display:inline-block;padding:0 5px;height: 24px;line-height:24px;
  border-width:1px;border-style:solid;
  border-radius: 5px;text-align: center;margin-bottom:5px;
}
.stimeline .taglist .tagitem:nth-child(odd){border-color:rgb(229, 28, 35);color:rgb(229, 28, 35);}
.stimeline .taglist .tagitem:nth-child(even){border-color:rgb(0, 150, 136);color:rgb(0, 150, 136);}
.stimeline .linearea{position:relative;height:8px;}
.stimeline .linearea .line{
  width: 12px;height: 30px;position:absolute;top:50%;margin-top:-15px;z-index:5;
  border:rgba(187, 187, 187, 0.45) 1px solid;border-radius: 12px;background-color:#fff;
}
.stimeline .linearea .line1{left:79px;}
.stimeline .linearea .line2{right:79px;}

.stimeline .boxouter.box2 .boxinner{box-shadow: rgb(204, 204, 204) 0px -2px 16px -3px;padding:15px 0px;}
.stimeline .box2 .row1{padding:0 20px;}
.stimeline .focuslist{padding-top:10px;padding-right:20px;}
.stimeline .focuslist:after{
  content:'';
  display:block;
  clear:both;
}
.stimeline .focuslist .item{
  float: left;width: 58px;
  text-align: center;display:block;color:inherit;
}
.stimeline .focuslist .pic{padding-left:20px;width:38px;}
.stimeline .focuslist img{width:38px;height:38px;border-radius:50%;vertical-algin:middle;object-fit: cover;}
.stimeline .focuslist .txt{padding-left:20px;width:38px;}

.stimeline  .pagemiddle{top:0;bottom:50px;padding-bottom:20px;}
.stimeline  .pagebottom{
  height: 50px;border-top:rgb(249, 249, 249) 1px solid;background-color:#fff;
  box-shadow: rgb(170, 170, 170) 0px -1px 8px -4px;text-align: center;
  border-top:rgb(249, 249, 249) 1px solid;
}
.stimeline  .pagebottom *{line-height:1.4 !important;}
.stimeline  .pagebottom .item{height:100%;}
.stimeline .pagebottom .al{color:rgb(229, 28, 35);font-size:18px;}
.stimeline .pagebottom .txt{color:rgb(229, 28, 35);font-size:12px;}
</style>
