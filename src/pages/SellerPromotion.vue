<template>
  <div class="containerarea font14 bg-page spromotion">
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
    <div class="pagemiddle bg-page" ref="scrollContainer" @scroll="handleScroll('scrollContainer')" style="top:110px;">
      <div class="boxouter box2 mt12">
        <div v-if="disData" class="boxinner tllist">
          <div v-if="!timelineData || timelineData.length == 0" class="scroll_item emptyitem flex_center">
            暂无促销商品
          </div>
          <div v-else v-for="(item,index) in timelineData" :key="item.id">
            <groupbuyitemplate :data="item" v-if="item.type == 'groupbuy'">
              <img slot="photo" class="imgcover" style="width:80px;height:80px;" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
              <span slot="title">{{item.title}}</span>
              <span slot="numbers">{{ item.numbers }}</span>
              <span slot="havetuan">{{ item.havetuan }}</span>
              <span slot="groupprice">{{item.groupprice}}</span>
              <span slot="price">{{item.price}}</span>
            </groupbuyitemplate>
            <bargainbuyitemplate :data="item" v-if="item.type == 'bargainbuy'">
              <img slot="photo" class="imgcover" style="width:80px;height:80px;" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
              <span slot="title">{{item.title}}</span>
              <span slot="saveprice">{{ item.saveprice }}</span>
              <span slot="minprice">{{item.minprice}}</span>
              <span slot="price">{{item.price}}</span>
            </bargainbuyitemplate>
          </div>
        </div>
      </div>
    </div>
    <seller-bottom :query="query" :login-user="loginUser" active-name="promotion" :show-store="showStore"></seller-bottom>
  </div>
</template>

<i18n>
</i18n>

<script>
import { TransferDom } from 'vux'
import ENV from 'env'
import Time from '#/time'
import { User } from '#/storage'
import Groupbuyitemplate from '@/components/Groupbuyitemplate'
import Bargainbuyitemplate from '@/components/Bargainbuyitemplate'
import SellerBottom from '@/components/SellerBottom'

const limit = 10
let pageStart = 0

export default {
  directives: {
    TransferDom
  },
  components: {
    Groupbuyitemplate, Bargainbuyitemplate, SellerBottom
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
      timelineData: [],
      tagName: '店主促销',
      timelineCount: 0,
      disData: false,
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
          const originHref = encodeURIComponent(`${ENV.Host}/#/sellerPromotion?uid=${params.uid}&fromModule=retailer&fromId=${params.uid}`)
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
    getTimelineData () {
      const self = this
      let params = {pagestart: pageStart, limit: limit, do: 'store'}
      if (self.query.uid) {
        params.wid = self.query.uid
      }
      self.$http.get(`${ENV.BokaApi}/api/retailer/listActivity`, {
        params: params
      }).then(function (res) {
        self.$vux.loading.hide()
        let data = res.data
        let retdata = data.data ? data.data : data
        self.timelineData = self.timelineData.concat(retdata)
        self.timelineCount = self.timelineData.length
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
.spromotion .pagetop{z-index: 2;height:110px;box-shadow: rgba(0, 0, 0, 0.1) 0px 9px 36px -3px;}
.boxouter .boxinner{position:relative;z-index:1;}
.spromotion .box1 .pic{
  padding-left:10px;
  width:77px;
  position:relative;
}
.spromotion .box1 .pic img{
  width: 67px;height: 67px;
  border-radius:50%;
  vertical-align:middle;
}
.spromotion .box1 .btn-cell{
  width:90px;text-align:center;
}
.spromotion .box1 .btn{
  display:block;margin:0 auto;
  width: 70px;height: 26px;line-height:26px;color:#fff;
  background-color: rgb(229, 28, 35);
  border-radius: 27px;
  font-size: 12px;
}
.spromotion .taglist{height: 18px;line-height:18px;font-size:13px;}
.spromotion .taglist .tagitem{display:inline-block;padding:0 3px;color:rgb(229, 28, 35);}
.spromotion .row3{padding:0px 10px 0px 10px;text-align:right;box-sizing: border-box;}

.tllist .tlitem{
  display:flex;padding:10px;
}
.tllist .avatar{width:50px;text-align:left;}
.tllist .avatar img{width:40px;height:40px;border-radius:50%;vertical-align:middle;}
.tllist .con{flex:1;}
.tllist .con .txt{height: 23px;line-height:23px;color: rgb(93, 102, 155);font-weight: bold;}
.tllist .piclist{display:flex;}
.tllist .picitem{width:33.33333%;padding-bottom:33.33333%;position:relative;}
.tllist .picitem .inner{
  position:absolute;top:0;bottom:0;box-sizing:border-box;
}
.tllist .picitem:nth-child(3n+1) .inner{left:0;right:14px;}
.tllist .picitem:nth-child(3n+2) .inner{left:7px;right:7px;}
.tllist .picitem:nth-child(3n+3) .inner{left:14px;right:0;}
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
