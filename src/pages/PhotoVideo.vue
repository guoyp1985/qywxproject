<template>
  <div class="containerarea font14 bg-page photovideo">
    <template v-if="!query.uid || query.uid == loginUser.uid">
      <router-link :to="{path:'/addTimeline',query:{uid:retailerUid,type:'retailer'}}" class="add-icon flex_center"><span class="txt">+</span></router-link>
    </template>
    <div class="pagetop b_bottom_after bg-page">
      <div class="boxinner box1">
        <div class="flex_left row1 pt15">
          <div class="pic">
            <img :src="userInfo.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
          </div>
          <div class="flex_cell flex_left">
            <div class="clamp1">
              <span class="v_middle db">{{userInfo.title}}</span>
              <span class="v_middle font12 color-gray">
                <span class="v_middle">{{userInfo.province}}</span>
                <span class="v_middle" v-if="userInfo.city && userInfo.city != ''">· {{userInfo.city}}</span>
              </span>
            </div>
          </div>
          <div class="btn-cell">
            <div  @click="toChat" class="btn">联系</div>
          </div>
        </div>
        <div class="row3">
          <div class="taglist">
            <div class="tagitem v_middle">{{tagName}}</div>
            <span class="v_middle">共 {{timelineCount}} 条</span>
          </div>
        </div>
      </div>
    </div>
    <div class="pagemiddle bg-white" ref="scrollContainer" @scroll="handleScroll('scrollContainer')" style="top:110px;">
      <div class="boxouter box2 mt12">
        <div v-if="disData" class="boxinner tllist piclist pr10 pl10">
          <div v-if="!timelineData || timelineData.length == 0" class="scroll_item emptyitem flex_center">
            暂无相关数据
          </div>
          <div v-else class="picitem" v-for="(item,index) in timelineData" :key="index">
            <div class="inner">
              <img :src="item.photo" @click="showBigimg(item.photo,index)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
            </div>
          </div>
        </div>
      </div>
      <div v-transfer-dom>
        <previewer :list="previewArr" ref="previewer"></previewer>
      </div>
    </div>
    <seller-bottom :query="query" :login-user="loginUser" active-name="photo" :show-store="showStore"></seller-bottom>
  </div>
</template>

<i18n>
</i18n>

<script>
import { TransferDom, Previewer } from 'vux'
import ENV from 'env'
import Time from '#/time'
import { User } from '#/storage'
import SellerBottom from '@/components/SellerBottom'

const limit = 30
let pageStart = 0

export default {
  directives: {
    TransferDom
  },
  components: {
    Previewer, SellerBottom
  },
  filters: {
    dateFormat (date) {
      return new Time(date * 1000).format()
    }
  },
  data () {
    return {
      userInfo: {},
      query: {},
      loginUser: {},
      retailerUid: 0,
      timelineData: [],
      disData: false,
      tagName: '图片视频',
      timelineCount: 0,
      previewArr: [],
      photoArr: [],
      showStore: false
    }
  },
  methods: {
    initData () {
      pageStart = 0
      this.disData = false
      this.timelineData = []
      this.timelineCount = 0
    },
    toChat () {
      const self = this
      let params = { uid: self.query.uid }
      if (!self.query.uid) {
        params.uid = self.loginUser.uid
      }
      if (parseInt(params.uid) === self.loginUser.uid) {
        self.$vux.toast.text('不能和自己聊天哦', 'middle')
      } else {
        if (self.loginUser.subscribe === 0) {
          const originHref = encodeURIComponent(`${ENV.Host}/#/photoVideo?uid=${params.uid}&fromModule=retailer&fromId=${params.uid}`)
          const callbackHref = encodeURIComponent(`${ENV.Host}/#/redirect`)
          location.replace(`${ENV.WxAuthUrl}appid=${ENV.AppId}&redirect_uri=${callbackHref}&response_type=code&scope=snsapi_userinfo&state=${originHref}#wechat_redirect`)
        } else {
          params.fromModule = 'retailer'
          params.fromId = params.uid
          params = this.$util.handleAppParams(this.query, params)
          self.$router.push({path: '/chat', query: params})
        }
      }
    },
    showBigimg (src, index) {
      const self = this
      if (self.$util.isPC()) {
        self.$refs.previewer.show(index)
      } else {
        window.WeixinJSBridge.invoke('imagePreview', {
          current: src,
          urls: self.photoArr
        })
      }
    },
    handleScroll (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.timelineData.length === (pageStart + 1) * limit) {
            pageStart++
            self.$vux.loading.show()
            self.getTimelineData()
          }
        }
      })
    },
    clickDig (item) {
      const self = this
      let url = `${ENV.BokaApi}/api/user/digs/add`
      if (self.isdig) {
        url = `${ENV.BokaApi}/api/user/digs/delete`
      }
      self.$vux.loading.show()
      self.$http.post(url, {
        id: item.id,
        module: 'timeline'
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        if (data.flag === 1) {
          if (self.isdig) {
            self.isdig = 0
            item.dig = item.dig - 1
          } else {
            self.isdig = 1
            item.dig = item.dig + 1
          }
        } else {
          self.$vux.toast.show({
            text: data.error,
            type: 'warning',
            time: self.$util.delay(data.error)
          })
        }
      })
    },
    getTimelineData () {
      const self = this
      let params = {pagestart: pageStart, limit: limit}
      if (self.query.uid) {
        params.wid = self.query.uid
      }
      self.$http.post(`${ENV.BokaApi}/api/timeline/photoList`, params).then(function (res) {
        self.$vux.loading.hide()
        let data = res.data
        let retdata = data.data ? data.data : data
        for (let i = 0; i < retdata.length; i++) {
          let photo = retdata[i].photo
          self.photoArr.push(photo)
          self.previewArr = self.previewArr.concat(self.$util.previewerImgdata([photo]))
        }
        self.timelineData = self.timelineData.concat(retdata)
        self.timelineCount = data.count
        self.disData = true
      })
    },
    refresh () {
      const self = this
      self.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      self.loginUser = User.get()
      if (!self.$route.query.uid || (self.$route.query.uid && self.query.uid !== self.$route.query.uid)) {
        self.initData()
        self.query = self.$route.query
        let params = {}
        if (self.query.uid) {
          params.uid = self.query.uid
          self.retailerUid = self.query.uid
        } else {
          self.retailerUid = self.loginUser.uid
        }
        self.$http.get(`${ENV.BokaApi}/api/retailer/info`, {
          params: params
        }).then(function (res) {
          if (res.status === 200) {
            let data = res.data
            self.userInfo = data.data ? data.data : data
            self.getTimelineData()
          }
          return self.$http.post(`${ENV.BokaApi}/api/list/product?pagestart=0&limit=1&uploader=${self.retailerUid}`)
        }).then(res => {
          const data = res.data
          const retdata = data.data ? data.data : data
          if (retdata.length) {
            self.showStore = true
          } else {
            self.showStore = false
          }
        })
      }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.photovideo .pagetop{z-index: 2;height:110px;box-shadow: rgba(0, 0, 0, 0.1) 0px 9px 36px -3px;}
.photovideo .pagemiddle{padding-bottom:60px;}
.photovideo .add-icon{
  position:absolute;right:20px;bottom:60px;border-radius:50%;
  width: 44px;height: 44px;z-index: 10;overflow:hidden;
  color:#fff;background-color: rgb(229, 28, 35);font-size: 28px;
}
.photovideo .add-icon .txt{vertical-align:middle;margin-top:-2px;}
.boxouter .boxinner{
  position:relative;z-index:1;background-color:#fff;
}
.photovideo .box1 .pic{
  padding-left:10px;
  width:77px;
  position:relative;
}
.photovideo .box1 .pic img{
  width: 67px;height: 67px;
  border-radius:50%;
  vertical-align:middle;
}
.photovideo .box1 .btn-cell{
  width:90px;text-align:center;
}
.photovideo .box1 .btn{
  display:block;margin:0 auto;
  width: 70px;height: 26px;line-height:26px;color:#fff;
  background-color: rgb(229, 28, 35);
  border-radius: 27px;
  font-size: 12px;
}
.photovideo .taglist{height: 18px;line-height:18px;font-size:13px;}
.photovideo .taglist .tagitem{display:inline-block;padding:0 3px;color:rgb(229, 28, 35);}
.photovideo .row3{padding:0px 10px 0px 10px;text-align:right;box-sizing: border-box;}

.tllist .tlitem{
  display:flex;padding:10px;
}
.tllist .avatar{width:50px;text-align:left;}
.tllist .avatar img{width:40px;height:40px;border-radius:50%;vertical-align:middle;}
.tllist .con{flex:1;}
.tllist .con .txt{height: 23px;line-height:23px;color: rgb(93, 102, 155);font-weight: bold;}
.tllist .piclist:after{content:"";display:block;clear:both;}
.tllist .picitem{float:left;width:25%;padding-bottom:25%;position:relative;}
.tllist .picitem .inner{
  position:absolute;top:0;bottom:0;box-sizing:border-box;top:3px;bottom:3px;
}
.tllist .picitem:nth-child(4n+1) .inner{left:0;right:6px;}
.tllist .picitem:nth-child(4n+2) .inner{left:3px;right:3px;}
.tllist .picitem:nth-child(4n+3) .inner{left:6px;right:3px;}
.tllist .picitem:nth-child(4n+4) .inner{left:6px;right:0;}
.tllist .picitem img{width:100%;height:100%;object-fit: cover;}
.tllist .commentarea{
  background-color: rgb(244, 244, 244);
  border-color: rgb(241, 244, 251) 1px solid;
  border-radius: 4px;text-align: center;
  padding:10px 5px;box-sizing: border-box;
}
.tllist .commentarea .txt1{position:relative;padding-left:10px;box-sizing: border-box;text-align:left;}
.tllist .commentarea .txt1:before{
  content:"";
  position:absolute;left:3px;top:4px;width:3px;height: 16px;
  background-color: rgb(229, 28, 35);
}
.tllist .commentarea .name{color:rgb(93, 102, 155);}
.tllist .commentarea .txt2{position:relative;padding-left:20px;box-sizing: border-box;text-align:left;}
</style>
