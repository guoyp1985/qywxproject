<template>
  <div :class="`containerarea font14 bg-page userstory ${topcss}`">
    <router-link :to="{path:'/addTimeline',query:{uid:retailerUid,type:'customer'}}" class="add-icon flex_center"><span class="txt">+</span></router-link>
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
    <div class="pagemiddle bg-white" style="top: 110px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
      <tag-page
        :query="query"
        :user-info="userInfo"
        :login-user="loginUser"
        :timeline-data="timelineData"
        :show-list="showList"
        :timeline-count="timelineCount"
        :after-delete="afterDelete"
        :click-comment="clickComment"
        seller-type="userstory"
        :cancel-comment="cancelComment">
      </tag-page>
    </div>
    <seller-bottom :query="query" :login-user="loginUser"  active-name="story" :show-store="showStore"></seller-bottom>
  </div>
</template>

<i18n>
</i18n>

<script>
import { TransferDom, Previewer } from 'vux'
import ENV from 'env'
import Time from '#/time'
import { User } from '#/storage'
import TagPage from '@/components/TagPage'
import SellerBottom from '@/components/SellerBottom'

const limit = 10
let pageStart = 0
let self = {}

export default {
  directives: {
    TransferDom
  },
  components: {
    Previewer, TagPage, SellerBottom
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
      showList: false,
      timelineData: [],
      disData: false,
      tagName: '用户反馈',
      timelineCount: 0,
      replyPopupShow: false,
      commentData: null,
      commentIndex: 0,
      replyData: null,
      replyIndex: 0,
      commentModule: 'timeline',
      topcss: '',
      showStore: false
    }
  },
  methods: {
    filterEmot (text) {
      return this.$util.emotPrase(text)
    },
    cancelComment () {
      this.topcss = ''
    },
    clickComment () {
      this.topcss = 'notop'
    },
    initData () {
      pageStart = 0
      this.disData = false
      this.timelineData = []
      this.timelineCount = 0
    },
    toChat () {
      let params = { uid: self.query.uid }
      if (!self.query.uid) {
        params.uid = self.loginUser.uid
      }
      if (parseInt(params.uid) === self.loginUser.uid) {
        self.$vux.toast.text('不能和自己聊天哦', 'middle')
      } else {
        if (self.loginUser.subscribe === 0) {
          const originHref = encodeURIComponent(`${ENV.Host}/#/userStory?uid=${params.uid}&fromModule=retailer&fromId=${params.uid}`)
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
    afterDelete (item, index) {
      this.timelineData.splice(index, 1)
      let params = {pagestart: self.timelineData.length, limit: 1, type: 'customer'}
      if (self.query.uid) {
        params.wid = self.query.uid
      }
      self.handlePageTimeline(params)
    },
    showBigimg (arr, index) {
      if (self.$util.isPC()) {
        self.previewArr = self.$util.previewerImgdata(arr)
        self.$refs.previewer.show(index)
      } else {
        window.WeixinJSBridge.invoke('imagePreview', {
          current: arr[index],
          urls: arr
        })
      }
    },
    handleScroll (refname) {
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
    handlePageTimeline (params) {
      self.$http.post(`${ENV.BokaApi}/api/timeline/list`, params).then(function (res) {
        self.$vux.loading.hide()
        let data = res.data
        let retdata = data.data ? data.data : data
        for (let i = 0; i < retdata.length; i++) {
          let photoarr = []
          let photo = retdata[i].photo
          if (photo && self.$util.trim(photo) !== '') {
            photoarr = photo.split(',')
          }
          retdata[i].photoarr = photoarr
          retdata[i].previewerPhoto = self.$util.previewerImgdata(photoarr)
          retdata[i].clicked = false
          retdata[i].digmanstr = retdata[i].digman.join(',')
        }
        self.timelineData = self.timelineData.concat(retdata)
        self.timelineCount = data.count
        self.disData = true
        self.showList = true
      })
    },
    getTimelineData () {
      let params = {pagestart: pageStart, limit: limit, type: 'customer'}
      if (self.query.uid) {
        params.wid = self.query.uid
      }
      self.handlePageTimeline(params)
    },
    refresh () {
      self.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      self.replyPopupShow = false
      self.loginUser = User.get()
      if (!self.$route.query.uid || self.query.uid !== self.$route.query.uid || self.$route.query.from === 'add') {
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
    self = this
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.userstory.notop .pagetop{display:none;}
.userstory.notop .pagemiddle{top:0 !important;}
.userstory .pagetop{z-index: 2;height:110px;box-shadow: rgba(0, 0, 0, 0.1) 0px 9px 36px -3px;}
.userstory .pagemiddle{padding-bottom:60px;}
.userstory .add-icon{
  position:absolute;right:20px;bottom:60px;border-radius:50%;
  width: 44px;height: 44px;z-index: 10;overflow:hidden;
  color:#fff;background-color: rgb(229, 28, 35);font-size: 28px;
}
.userstory .add-icon .txt{vertical-align:middle;margin-top:-2px;}
.boxouter .boxinner{
  position:relative;z-index:1;background-color:#fff;
  border-radius:5px;
  border: rgb(244, 244, 244) 1px solid;
  box-shadow: rgb(204, 204, 204) 0px -9px 16px -3px;
}
.userstory .box1 .pic{
  padding-left:10px;
  width:77px;
  position:relative;
}
.userstory .box1 .pic img{
  width: 67px;height: 67px;
  border-radius:50%;
  vertical-align:middle;
}
.userstory .box1 .btn-cell{
  width:90px;text-align:center;
}
.userstory .box1 .btn{
  display:block;margin:0 auto;
  width: 70px;height: 26px;line-height:26px;color:#fff;
  background-color: rgb(229, 28, 35);
  border-radius: 27px;
  font-size: 12px;
}
.userstory .taglist{height: 18px;line-height:18px;font-size:13px;}
.userstory .taglist .tagitem{display:inline-block;padding:0 3px;color:rgb(229, 28, 35);}
.userstory .row3{padding:0px 10px 0px 10px;text-align:right;box-sizing: border-box;}

</style>
