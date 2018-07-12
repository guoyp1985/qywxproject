<template>
  <div class="containerarea font14 bg-white cseller">
    <apply-tip v-if="showApply"></apply-tip>
    <template v-if="!query.uid || query.uid == loginUser.uid">
      <router-link :to="{path:'/addTimeline',query:{uid:retailerUid,type:'retailer'}}" class="add-icon flex_center"><span class="txt">+</span></router-link>
    </template>
    <template v-if="showContainer">
      <div class="pagemiddle" ref="scrollContainer1" @scroll="handleScroll1('scrollContainer1')">
        <div style="position:fixed;top:0;left:0;right:0;bottom:0;">
        <div class="topcover">
          <div class="inner">
            <swiper
              class="pic-swiper notitle"
              dots-position="center"
              :interval=6000
              :show-dots="isShowDot"
              :aspect-ratio="1/1"
              loop>
              <swiper-item v-for="(item,index) in photoarr" :key="item.id">
                <img :src="item" default-src="http://vuxlaravel.boka.cn/images/nopic.jpg" @click="showBigimg(item,photoarr,index)" />
              </swiper-item>
            </swiper>
          </div>
        </div>
        </div>
        <div class="topcover" style="pointer-events: none;">
          <div class="inner">
          </div>
        </div>
        <template v-if="!query.uid || query.uid == loginUser.uid">
          <router-link class="set-icon" :to="{path: '/retailerSetting', query: {from: 'seller'}}"><i class="al al-guanlizhongxin color-white db-in text_shadow"></i></router-link>
        </template>
        <div class="bg-white" style="position: relative;z-index: 2;">
          <div class="boxouter box1">
            <div class="boxinner b_bottom_after">
              <div class="flex_left row1">
                <div class="pic">
                  <div class="pic_top">
                    <img :src="userInfo.avatar" onerror="javascript:this.src='http://vuxlaravel.boka.cn/images/user.jpg';" />
                  </div>
                </div>
                <div class="flex_cell">
                  <div class="clamp1">
                    <span class="v_middle text_shadow bold color-white font16" style="position:absolute;top:-30px;">{{userInfo.title}}</span>
                    <span class="v_middle font12 color-gray">
                      <span class="v_middle">{{userInfo.province}}</span>
                      <span class="v_middle" v-if="userInfo.city && userInfo.city != ''">· {{userInfo.city}}</span>
                    </span>
                  </div>
                </div>
                <div class="btn-cell">
                  <router-link :to="{path: '/chat', query: {uid: userInfo.uid}}" class="btn">联系TA</router-link>
                </div>
              </div>
              <div class="row2" v-if="userInfo.slogan && userInfo.slogan != ''">
                <span class="v_middle color-red5">{{$t('Seller said')}}: </span>
                <span class="v_middle">{{userInfo.slogan}}</span>
              </div>
              <div class="row3" v-if="userInfo.tags && userInfo.tags.length > 0">
                <span class="v_middle color-red5">{{$t('Seller tags')}}: </span>
                <div class="taglist">
                  <div class="tagitem" @click="clickTag(item)" v-for="(item,index) in userInfo.tags">{{item.title}}({{item.timelines}})</div>
                </div>
              </div>
            </div>
          </div>
          <template v-show="focusData.length > 0 && disFocus">
            <div class="linearea">
              <div class="line line1"></div>
              <div class="line line2"></div>
            </div>
            <div class="boxouter box2">
              <div class="boxinner b_top_after">
                <div class="row1">{{focusCount}}位好友关注了TA</div>
                <div class="flex_left">
                  <div class="focuslist" ref="focusList">
                    <router-link class="item" :to="{path:'/chat',query:{uid:item.uid}}" v-for="(item,index) in focusData" :key="index">
                      <div class="pic">
                        <img :src="item.avatar" onerror="javascript:this.src='http://vuxlaravel.boka.cn/images/user.jpg';" />
                      </div>
                      <div class="txt">
                        <div class="clamp1 font12 color-gray2 align_center">{{ item.username }}</div>
                      </div>
                    </router-link>
                  </div>
                  <div v-if="disMore" class="moreicon flex_center color-red" @click="moreFriends">
                    <i class="al al-asmkticon0165 v_middle"></i>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <div class="boxouter box3">
            <div class="boxinner b_top_after">
              <div v-if="disTimeline" class="timelinelist">
                <div v-if="!tlData || tlData.length == 0" class="scroll_item emptyitem flex_center">
                  暂无相关动态
                </div>
                <div v-else class="tlitem b_bottom_after" v-for="(item,index) in tlData" :key="index">
                  <div class="avatar">
                    <img :src="item.avatar" />
                  </div>
                  <div class="con">
                    <div class="txt no_bold">{{item.username}}</div>
                    <div v-html="filterEmot(item.title)"></div>
                    <div class="piclist">
                      <div class="picitem" v-if="item.photoarr.length > 0" v-for="(pic,index1) in item.photoarr">
                        <div class="inner">
                          <img :src="pic" @click="showBigimg1(pic,item.photoarr,`previewer${index}`,index1)" />
                        </div>
                      </div>
                    </div>
                    <template v-if="item.photoarr.length > 0">
                      <div v-transfer-dom>
                        <previewer :list="item.previewerPhoto" :ref="`previewer${index}`"></previewer>
                      </div>
                    </template>
                    <div class="db-flex mt5 color-gray">
                      <div class="flex_cell font12">{{ item.dateline | dateFormat }}</div>
                      <span class="w60 color-gray flex_right" @click="clickDig(item)">
                        <span :class="`v_middle digicon ${item.isdig ? 'diged' : ''}`"></span>
                        <span class="v_middle ml3">{{item.dig}}</span>
                      </span>
                      <div class="w30 flex_right" @click="onReplyShow(item,index)">
                        <i class="al al-pinglun3 font14"></i>
                      </div>
                      <div v-if="item.uid == loginUser.uid || query.uid == loginUser.uid" class="w30 flex_right" @click="deleteTimeline(item,index)">
                        <i class="al al-shanchu font14"></i>
                      </div>
                    </div>
                    <div class="mt5 commentarea" v-if="item.comments && item.comments.length > 0">
                      <div class="citem" v-for="(citem,index1) in item.comments" :key="index1">
                        <div class="txt1" @click="onReplyShow(item,index,citem,index1)">
                          <div class="v_middle db-in name name1">{{citem.username}}: </div>
                          <div class="v_middle db-in" v-html="filterEmot(citem.message)"></div>
                        </div>
                        <div class="txt2" v-for="(ritem,index2) in citem.comment" :key="index2">
                          <div class="v_middle name name2 db-in">{{ritem.username}}</div>
                          <div class="v_middle db-in">回复: </div>
                          <div class="v_middle db-in" v-html="filterEmot(ritem.message)"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pagebottom">
        <div class="w_100 h_100 flex_center">
          <router-link :to="{path: '/store', query: {wid: query.uid}}" class="flex_center flex_cell item ">
            <div>
              <div class="radius-icon"><i class="al al-dianpufill font28" style="line-height: 45px !important;"></i></div>
              <div class="tet"><i class="al al-zhaopian color-white"></i></div>
              <div class="txt">店主精选</div>
            </div>
          </router-link>
          <router-link :to="{path: '/photoVideo', query: {uid: query.uid}}" class="flex_cell item flex_center">
            <div>
              <div class="tet"><i class="al al-zhaopian font24 db-in"></i></div>
              <div class="txt">图片视频</div>
            </div>
          </router-link>
          <router-link :to="{path: '/userStory', query: {uid: query.uid}}" class="flex_cell item flex_center">
            <div>
              <div class="tet"><i class="al al-yonghuxinxi font26 db-in"></i></div>
              <div class="txt">用户反馈</div>
            </div>
          </router-link>
          <router-link :to="{path: '/sellerPromotion', query: {uid: query.uid}}" class="flex_cell item flex_center">
            <div>
              <div class="tet"><i class="al al-goodsnewfill db-in"></i></div>
              <div class="txt">店主促销</div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showTagPopup" height="100%">
          <div class="popup1 tagpopup">
            <template v-if="!query.uid || query.uid == loginUser.uid">
              <router-link :to="{path:'/addTimeline',query:{uid:retailerUid,type:'retailer',tagid:clickTagId}}" class="add-icon flex_center"><span class="txt">+</span></router-link>
            </template>
            <div class="popup-middle" style="top:0;">
              <tag-page
                :query="query"
                :user-info="userInfo"
                :login-user="loginUser"
                :timeline-data="timelineData"
                :page-start="pageStart"
                :limit="limit"
                :show-list="showList"
                :timeline-count="timelineCount"
                :tag-name="tagName"
                :after-delete="afterDelete">
              </tag-page>
            </div>
            <div class="popup-bottom flex_center color-white" @click="closeTagPopup" style="background-color:#e51c23;">
              <span>{{ $t('Close') }}</span>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom>
        <previewer :list="previewerPhotoarr" ref="previewerPhoto"></previewer>
      </div>
      <comment-popup
        :show="replyPopupShow"
        :title="$t('Reply Discussion')"
        @on-submit="replySubmit"
        @on-cancel="replyPopupCancel">
      </comment-popup>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showMoreFriends" height="100%">
          <div class="popup1 tagpopup">
            <div class="popup-top flex_center">关注好友</div>
            <div class="popup-middle">
              <router-link :to="{path:'/chat',query:{uid:item.uid}}" v-for="(item,index) in friendsData" :key="item.uid" class="db scroll_item pt10 pb10 pl12 pr12 bg-white mb10 list-shadow">
                <div class="t-table">
                  <div :to="{path: 'membersView', query: {uid: item.uid}}" class="t-cell v_middle w70">
                    <img class="avatarimg3 imgcover" :src="item.avatar" onerror="javascript:this.src='http://vuxlaravel.boka.cn/images/user.jpg';" />
                  </div>
                  <div :to="{path: 'membersView', query: {uid: item.uid}}" class="t-cell v_middle">
                    <div class="clamp1 font14 color-lightgray">{{item.username}}</div>
                  </div>
                </div>
              </router-link>
            </div>
            <div class="popup-bottom flex_center bg-orange color-white" @click="closeFriendsPopup">
              <span>{{ $t('Close') }}</span>
            </div>
          </div>
        </popup>
      </div>
    </template>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Swiper, SwiperItem, TransferDom, Popup, Previewer } from 'vux'
import ENV from 'env'
import Time from '#/time'
import { User } from '#/storage'
import TagPage from '@/components/TagPage'
import CommentPopup from '@/components/CommentPopup'
import ApplyTip from '@/components/ApplyTip'

export default {
  directives: {
    TransferDom
  },
  components: {
    Swiper, SwiperItem, Popup, TagPage, Previewer, CommentPopup, ApplyTip
  },
  filters: {
    dateFormat (date) {
      return new Time(date * 1000).format()
    }
  },
  data () {
    return {
      showApply: false,
      showContainer: false,
      query: {},
      loginUser: {},
      retailerUid: 0,
      userInfo: {},
      isShowDot: false,
      photoarr: [],
      previewerPhotoarr: [],
      focusCount: 0,
      focusData: [],
      showTagPopup: false,
      timelineData: [],
      limit: 10,
      pageStart: 0,
      showList: false,
      timelineCount: 0,
      tagName: '',
      clickTagId: '',
      disTimeline: false,
      tlData: [],
      pageStart1: 0,
      pageStart2: 0,
      replyPopupShow: false,
      commentData: null,
      commentIndex: 0,
      replyData: null,
      replyIndex: 0,
      commentModule: 'timeline',
      disFocus: false,
      disMore: false,
      showMoreFriends: false,
      friendsData: []
    }
  },
  methods: {
    initData () {
      this.timelineData = []
      this.pageStart = 0
      this.showList = false
      this.disTimeline = false
      this.tlData = []
      this.pageStart1 = 0
      this.replyPopupShow = false
      this.commentData = null
      this.commentIndex = 0
      this.replyData = null
      this.replyIndex = 0
      this.commentModule = 'timeline'
    },
    filterEmot (text) {
      return this.$util.emotPrase(text)
    },
    showBigimg (src, arr, index) {
      const self = this
      if (self.$util.isPC()) {
        self.$refs.previewerPhoto.show(index)
      } else {
        window.WeixinJSBridge.invoke('imagePreview', {
          current: src,
          urls: arr
        })
      }
    },
    showBigimg1 (src, arr, refname, index) {
      const self = this
      if (self.$util.isPC()) {
        let view = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
        view.show(index)
      } else {
        window.WeixinJSBridge.invoke('imagePreview', {
          current: src,
          urls: arr
        })
      }
    },
    closeTagPopup () {
      this.showTagPopup = false
    },
    deleteTimeline (item, index) {
      const self = this
      self.$vux.confirm.show({
        title: '确定要删除吗？',
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/timeline/delete`, {
            id: item.id
          }).then(function (res) {
            self.$vux.loading.hide()
            self.tlData.splice(index, 1)
          })
        }
      })
    },
    afterDelete (item, index) {
      this.timelineData.splice(index, 1)
    },
    closeFriendsPopup () {
      this.showMoreFriends = false
    },
    handleScroll2 (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.friendsData.length === (self.pageStart2 + 1) * self.limit) {
            self.pageStart2++
            self.$vux.loading.show()
            self.getFriends()
          }
        }
      })
    },
    getFriends () {
      const self = this
      self.$http.post(`${ENV.BokaApi}/api/member/friendsCustomer`, {
        wid: self.query.uid ? self.query.uid : self.loginUser.uid, limit: 5000
      }).then(function (res) {
        if (res && res.status === 200) {
          let data = res.data
          let retdata = data.data ? data.data : data
          self.friendsData = retdata
        }
      })
    },
    moreFriends () {
      const self = this
      this.showMoreFriends = true
      self.getFriends()
    },
    getTimelineData (tagid) {
      const self = this
      let params = {pagestart: self.pageStart, limit: self.limit, type: 'retailer'}
      if (self.query.uid) {
        params.wid = self.query.uid
      }
      if (self.clickTagId && self.clickTagId !== '') {
        params.tagid = self.clickTagId
      }
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
        }
        self.timelineData = self.timelineData.concat(retdata)
        self.timelineCount = self.timelineData.length
        self.showList = true
      })
    },
    clickTag (tagitem) {
      const self = this
      self.showTagPopup = true
      self.tagName = tagitem.title
      self.showList = false
      self.timelineData = []
      self.pageStart = 0
      self.clickTagId = tagitem.id
      self.getTimelineData()
    },
    clickDig (item) {
      const self = this
      let url = `${ENV.BokaApi}/api/user/digs/add`
      if (item.isdig) {
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
          if (item.isdig) {
            item.isdig = 0
            item.dig = item.dig - 1
          } else {
            item.isdig = 1
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
    onReplyShow (item, index, citem, index1) {
      this.commentData = item
      this.commentIndex = index
      this.replyPopupShow = true
      if (citem) {
        this.commentModule = 'comments'
        this.replyData = citem
        this.replyIndex = index1
      } else {
        this.commentModule = 'timeline'
        this.replyData = null
        this.replyIndex = 0
      }
    },
    replyPopupCancel () {
      this.replyPopupShow = false
    },
    replySubmit (value) { // 回复提交
      const self = this
      this.replyPopupShow = false
      let nid = 0
      if (this.commentModule === 'comments') {
        nid = self.replyData.id
      } else {
        nid = self.commentData.id
      }
      this.$http.post(`${ENV.BokaApi}/api/comment/add`, {nid: nid, module: self.commentModule, message: value})
      .then(res => {
        let data = res.data
        if (data.flag) {
          if (self.commentModule === 'timeline') {
            if (!self.tlData[self.commentIndex].comments) {
              self.tlData[self.commentIndex].comments = [data.data]
            } else {
              self.tlData[self.commentIndex].comments.push(data.data)
            }
          } else {
            if (!self.tlData[self.commentIndex].comments[self.replyIndex].comment) {
              self.tlData[self.commentIndex].comments[self.replyIndex].comment = [data.data]
            } else {
              self.tlData[self.commentIndex].comments[self.replyIndex].comment.push(data.data)
            }
          }
        } else {
          self.$vux.toast.show({
            text: data.error,
            type: 'warn',
            time: self.$util.delay(data.error)
          })
        }
      })
    },
    getTlData () {
      const self = this
      let params = {pagestart: self.pageStart1, limit: self.limit, type: 'retailer'}
      if (self.query.uid) {
        params.wid = self.query.uid
      }
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
        }
        self.tlData = self.tlData.concat(retdata)
        self.disTimeline = true
      })
    },
    handleScroll1 (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.tlData.length === (self.pageStart1 + 1) * self.limit) {
            self.pageStart1++
            self.$vux.loading.show()
            self.getTlData()
          }
        }
      })
    },
    refresh () {
      const self = this
      self.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      self.loginUser = User.get()
      self.query = self.$route.query
      let params = {}
      if (self.query.uid) {
        params.uid = self.query.uid
        self.retailerUid = self.query.uid
      } else {
        self.retailerUid = self.loginUser.uid
      }
      if (self.query.share_uid) {
        params.share_uid = self.query.share_uid
        params.share_module = 'centerseller'
      }
      if (self.query.lastshareuid) {
        params.lastshareuid = self.query.lastshareuid
      }
      let moduleid = self.query.uid ? self.query.uid : self.loginUser.uid
      self.$http.get(`${ENV.BokaApi}/api/retailer/info`, {
        params: params
      }).then(function (res) {
        if (res.status === 200) {
          let data = res.data
          if (!data.flag) {
            self.showApply = true
            self.showContainer = false
          } else {
            self.showApply = false
            self.showContainer = true
            self.userInfo = data.data ? data.data : data
            document.title = self.userInfo.title
            self.$util.handleWxShare({
              module: 'centerseller',
              moduleid: moduleid,
              lastshareuid: self.query.share_uid,
              title: self.userInfo.title,
              desc: self.userInfo.slogan ? self.userInfo.slogan : self.userInfo.title,
              photo: self.userInfo.avatar,
              link: `${ENV.Host}/#/centerSeller?uid=${moduleid}&share_uid=${self.loginUser.uid}&lastshareuid=${self.query.share_uid}`
            })
            const showphoto = self.userInfo.showphoto
            if (showphoto && self.$util.trim(showphoto) !== '') {
              self.photoarr = showphoto.split(',')
              if (self.photoarr.length > 1) {
                self.isShowDot = true
              } else {
                self.isShowDot = false
              }
              if (self.photoarr.length > 0) {
                self.previewerPhotoarr = self.$util.previewerImgdata(self.photoarr)
              }
            }
            self.getTlData()
            return self.$http.post(`${ENV.BokaApi}/api/member/friendsCustomer`, {
              wid: moduleid, pagestart: 0, limit: 15
            })
          }
        }
      }).then(function (res) {
        if (res && res.status === 200) {
          let data = res.data
          self.focusData = data.data ? data.data : data
          self.focusCount = data.count
          self.getMoreStatus(self)
          self.disFocus = true
        }
      })
    },
    getMoreStatus (self) {
      const wW = window.innerWidth
      const disCols = Math.floor(wW / 48)
      let focusList = self.$refs.focusList[0] ? self.$refs.focusList[0] : self.$refs.focusList
      if (self.focusData.length > disCols - 1) {
        const listW = (disCols - 1) * 48
        focusList.style.flex = ''
        focusList.style.width = `${listW}px`
        self.disMore = true
      } else {
        focusList.style.width = ''
        focusList.style.flex = '1'
        self.disMore = false
      }
    }
  },
  activated () {
    const self = this
    self.initData()
    this.refresh()
    window.onresize = function () {
      self.getMoreStatus(self)
    }
  }
}
</script>

<style lang="less" scoped>
.cseller .vux-slider{overflow: initial;}
.cseller{position:relative;}
.cseller .topcover{position:relative;padding-bottom:65%;}
.cseller .topcover .inner{position:absolute;;left:0;top:0;right:0;height:100%;}
.cseller .set-icon{position:absolute;right:12px;top:8px;z-index:1;}
.cseller .set-icon .al{font-size:22px;}
.cseller .pic-swiper{width:100%;height:100%;}
.cseller .topcover .inner img{vertical-align:middle;width:100%;height:100%;object-fit: cover;}
.boxouter.box1 .boxinner{
  position:relative;z-index:1;background-color:#fff;
  box-shadow: rgba(0, 0, 0, 0.15) 0px -25px 30px 0px
}
.boxouter.box1 .boxinner{padding-bottom:15px;}
.cseller .box1 .row1{height:40px;}
.cseller .box1 .pic{
  padding-left:10px;
  width:95px;height:40px;
  position:relative;
}
.cseller .box1 .pic .pic_top{
  width: 80px;height: 80px;
  vertical-align:middle;
  position:absolute;top:-40px;
}
.cseller .box1 .pic img{
  display: block;width:100%;height:100%;
}
.cseller .box1 .pic .pic_top:after,.cseller .taglist .tagitem:after,.cseller .linearea .line:after{
  content: " ";
  width: 200%;
  height: 200%;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid rgba(0, 0, 0, 0.2);
  -webkit-transform: scale(0.5);
  -ms-transform: scale(0.5);
  transform: scale(0.5);
  -webkit-transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  transform-origin: 0 0;
  box-sizing: border-box;
}
.cseller .taglist .tagitem:after{border-radius:10px;}
.cseller .taglist .tagitem:nth-child(odd):after{border: 1px solid #99d0ff;}
.cseller .taglist .tagitem:nth-child(even):after{border: 1px solid #ff9999;}

.cseller .box1 .btn-cell{
  width:90px;text-align:center;
}
.cseller .box1 .btn{
  display:block;margin:0 auto;
  width: 70px;height: 26px;line-height:26px;color:#fff;
  background-color: rgb(229, 28, 35);
  border-radius: 27px;
  font-size: 12px;
}
.cseller .box1 .row2{margin-top:12px;padding:0 10px;box-sizing: border-box;}
.cseller .box1 .row3{margin-top:8px;padding:0 10px;box-sizing: border-box;}
.cseller .taglist{display:inline-block;}
.cseller .taglist .tagitem{
  display:inline-block;padding:0 5px;height: 20px;line-height:20px;
  font-size:12px;text-align: center;margin:0 5px 5px;position: relative;
}
.cseller .taglist .tagitem:nth-child(odd){color:#99d0ff;}
.cseller .taglist .tagitem:nth-child(even){color:#ff9999;}
.cseller .linearea{position:relative;height:8px;}
.cseller .linearea .line{
  width: 6px;height: 20px;position:absolute;top:50%;margin-top:-10px;z-index:5;border-radius: 12px;background-color:#fff;
}
.cseller .linearea .line:after{
  border-radius: 40px;
}
.cseller .linearea .line1{left:79px;}
.cseller .linearea .line2{right:79px;}

.cseller .boxouter.box2 .boxinner{box-shadow:rgba(204, 204, 204, 0.2) 0px -2px 5px 0px;padding:15px 0px;}
.cseller .box2 .row1{padding:0 10px;}
.cseller .focuslist{display:flex;overflow:hidden;}
.cseller .focuslist:after{
  content:'';
  display:block;
  clear:both;
}
.cseller .focuslist .item{
  width: 48px;padding-top:10px;
  text-align: center;display:block;color:inherit;
}
.cseller .focuslist .pic{padding-left:10px;width:38px;}
.cseller .focuslist img{width:38px;height:38px;vertical-align:middle;object-fit: cover;border-radius:50%;}
.cseller .focuslist .txt{padding-left:10px;width:38px;}
.cseller .moreicon{width:48px;}

.cseller .pagemiddle{top:0;bottom:50px;padding-bottom:35px;}
.cseller .pagebottom{
  height: 50px;border-top:rgb(249, 249, 249) 1px solid;background-color:#fff;
  box-shadow: rgb(170, 170, 170) 0px -1px 8px -4px;text-align: center;
  border-top:rgb(249, 249, 249) 1px solid;z-index:2;overflow-x: initial;
}

.cseller .pagebottom .al,.cseller .pagebottom .tet{height: 26px;line-height: 26px !important}
.cseller .pagebottom .al-zhaopian:before{display: block;line-height: 36px;}
.cseller .pagebottom .al-goodsnewfill:before{display: block;line-height: 32px;}
.cseller .pagebottom .al-yonghuxinxi:before{display: block;line-height: 26px;}
.cseller .pagebottom .item{height:100%;position:relative;color:rgb(229, 28, 35);}
.cseller .pagebottom .al{font-size:22px;overflow: hidden;}
.cseller .pagebottom .txt{height: 22px;line-height: 22px !important;font-size: 8pt;color: rgba(230, 28, 36, 0.5);}
.cseller .pagebottom .radius-icon{
  width:46px;height:46px;position:absolute;left:50%;margin-left:-23px;top:-18px;z-index:1;
  border-radius:50%;background-color:#e51c23;color:#fff;
}
.tagpopup .close-tag{
  position:absolute;top:10px;right:10px;z-index:1;text-align:center;
  width: 67px;height: 24px;line-height:24px;color: rgba(16, 16, 16, 0.88);
  background-color:#fff;border: rgb(187, 187, 187) 1px solid;
  border-radius: 4px;font-size: 12px;
}
.tagpopup .add-icon{
  position:absolute;right:15px;bottom:65px;border-radius:50%;
  width: 44px;height: 44px;z-index: 10;overflow:hidden;
  color:#fff;background-color:#e19194;font-size: 28px;
}
.tagpopup .add-icon .txt{vertical-align:middle;margin-top:-2px;}
.cseller .boxouter.box3 .boxinner{padding:0px 0px;}
.cseller .b_bottom_after:after{background-color: #eaeaea;}
.cseller .add-icon{
  position:absolute;right:15px;bottom:65px;border-radius:50%;
  width: 44px;height: 44px;z-index: 10;overflow:hidden;
  color:#fff;background-color:#e19194;font-size: 28px;
}
.cseller .add-icon .txt{vertical-align:middle;margin-top:-2px;}
.timelinelist .con .txt{font-weight:normal;}
.timelinelist .tlitem{padding:15px 10px;}
.timelinelist .commentarea .txt1:before{display: none;}
.timelinelist .commentarea .txt1{padding-left:0px;}
</style>
