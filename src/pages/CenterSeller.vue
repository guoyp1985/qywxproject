<template>
  <div class="containerarea font14 bg-page cseller">
    <apply-tip v-if="showApply"></apply-tip>
    <template v-if="showContainer">
      <div class="pagemiddle" ref="scrollContainer1" @scroll="handleScroll1('scrollContainer1')">
        <div class="topcover">
          <div class="inner">
            <template v-if="!query.uid || query.uid == loginUser.uid">
              <router-link class="set-icon" :to="{path: '/retailerSetting', query: {from: 'seller'}}"><i class="al al-guanlizhongxin color-red4 db-in"></i></router-link>
            </template>
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
        <div class="boxouter box1">
          <div class="boxinner">
            <div class="flex_left row1">
              <div class="pic">
                <img :src="userInfo.avatar" onerror="javascript:this.src='http://vuxlaravel.boka.cn/images/user.jpg';" />
              </div>
              <div class="flex_cell flex_left">
                <div class="clamp1">
                  <span class="v_middle">{{userInfo.title}}</span>
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
        <template v-if="focusData.length > 0 && disFocus">
          <div class="linearea">
            <div class="line line1"></div>
            <div class="line line2"></div>
          </div>
          <div class="boxouter box2">
            <div class="boxinner">
              <div class="row1">{{focusCount}}位好友关注了TA</div>
              <div class="flex_left">
                <div class="focuslist">
                  <router-link class="item" :to="{path:'/chat',query:{uid:item.uid}}" v-for="(item,index) in focusData" :key="index">
                    <div class="pic">
                      <img :src="item.avatar" onerror="javascript:this.src='http://vuxlaravel.boka.cn/images/user.jpg';" />
                    </div>
                    <div class="txt">
                      <div class="clamp1 font12 color-gray2 align_center">{{ item.username }}</div>
                    </div>
                  </router-link>
                </div>
                <div v-if="disMore" class="moreicon flex_center color-red">
                  <i class="al al-asmkticon0165 v_middle"></i>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="boxouter box3">
          <div class="boxinner">
            <div class="row1">最新动态</div>
            <div v-if="disTimeline" class="timelinelist">
              <div v-if="!tlData || tlData.length == 0" class="scroll_item emptyitem flex_center">
                暂无相关动态
              </div>
              <div v-else class="tlitem" v-for="(item,index) in tlData" :key="index">
                <div class="avatar">
                  <img :src="item.avatar" />
                </div>
                <div class="con">
                  <div class="txt">{{item.username}}</div>
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
                    <span class="flex_cell color-gray flex_right" @click="clickDig(item)">
                      <span :class="`v_middle digicon ${item.isdig ? 'diged' : ''}`"></span>
                      <span class="v_middle ml3">{{item.dig}}</span>
                    </span>
                    <div class="w30 flex_right" @click="onReplyShow(item,index)">
                      <i class="al al-pinglun3 font14"></i>
                    </div>
                  </div>
                  <div class="mt5 commentarea" v-if="item.comments && item.comments.length > 0">
                    <div class="citem" v-for="(citem,index1) in item.comments" :key="index1">
                      <div class="txt1" @click="onReplyShow(item,index,citem,index1)">
                        <div class="v_middle db-in name name1">{{citem.username}}</div>
                        <div class="v_middle db-in" v-html="filterEmot(citem.message)"></div>
                      </div>
                      <div class="txt2" v-for="(ritem,index2) in citem.comment" :key="index2">
                        <div class="v_middle name name2 db-in">{{ritem.username}}</div>
                        <div class="v_middle db-in">回复：</div>
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
      <div class="pagebottom flex_center">
        <router-link :to="{path: '/sellerTimeline', query: {uid: query.uid}}" class="flex_cell item flex_center">
          <div>
            <div><i class="al al-sccollection"></i></div>
            <div class="txt">店主动态</div>
          </div>
        </router-link>
        <router-link :to="{path: '/photoVideo', query: {uid: query.uid}}" class="flex_cell item flex_center">
          <div>
            <div><i class="al al-zhaopian"></i></div>
            <div class="txt">图片视频</div>
          </div>
        </router-link>
        <router-link :to="{path: '/userStory', query: {uid: query.uid}}" class="flex_cell item flex_center">
          <div>
            <div><i class="al al-yonghuxinxi" style="font-size:19px;"></i></div>
            <div class="txt">用户故事</div>
          </div>
        </router-link>
        <router-link :to="{path: '/sellerPromotion', query: {uid: query.uid}}" class="flex_cell item flex_center">
          <div>
            <div><i class="al al-goodsnewfill"></i></div>
            <div class="txt">店主促销</div>
          </div>
        </router-link>
        <router-link :to="{path: '/store', query: {wid: query.uid}}" class="flex_cell item flex_center">
          <div>
            <div><i class="al al-dianpufill"></i></div>
            <div class="txt">进入店铺</div>
          </div>
        </router-link>
      </div>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showTagPopup" height="100%">
          <div class="popup1 tagpopup">
            <router-link :to="{path:'/addTimeline',query:{uid:retailerUid,type:'retailer',tagid:clickTagId}}" class="add-icon flex_center"><span class="txt">+</span></router-link>
            <div class="popup-middle" style="top:0;">
              <tag-page
                :user-info="userInfo"
                :login-user="loginUser"
                :timeline-data="timelineData"
                :scroll-event="scrollEvent"
                :page-start="pageStart"
                :limit="limit"
                :show-list="showList"
                :timeline-count="timelineCount"
                :tag-name="tagName"></tag-page>
            </div>
            <div class="popup-bottom flex_center bg-orange color-white" @click="closeTagPopup">
              <span>{{ $t('Close') }}</span>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom>
        <previewer :list="previewerPhotoarr" ref="previewerPhoto"></previewer>
      </div>
      <comment-popup :show="replyPopupShow" :title="$t('Reply Discussion')" @on-submit="replySubmit"  @on-cancel="replyPopupCancel"></comment-popup>
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
      replyPopupShow: false,
      commentData: null,
      commentIndex: 0,
      replyData: null,
      replyIndex: 0,
      commentModule: 'timeline',
      disFocus: false,
      disMore: false
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
    scrollEvent () {
      const self = this
      if (self.timelineData.length === (self.pageStart + 1) * self.limit) {
        self.pageStart++
        self.$vux.loading.show()
        self.getTimelineData()
      }
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
              module: 'timeline',
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
          self.getMoreStatus()
          self.disFocus = true
        }
      })
    },
    getMoreStatus () {
      const self = this
      const wW = window.innerWidth
      const disCols = Math.floor(wW / 58)
      if (self.focusData.length > disCols - 1) {
        self.disMore = true
      } else {
        self.disMore = false
      }
    }
  },
  activated () {
    const self = this
    if (this.$route.query.from === 'add') {
      self.initData()
    }
    this.refresh()
    window.onresize = function () {
      self.getMoreStatus()
    }
  }
}
</script>

<style lang="less" scoped>
.cseller .topcover{position:relative;padding-bottom:55.55%;}
.cseller .topcover .inner{position:absolute;left:0;top:0;right:0;bottom:0;}
.cseller .topcover .set-icon{position:absolute;right:15px;top:15px;z-index:1;}
.cseller .topcover .set-icon .al{font-size:22px;}
.cseller .pic-swiper{width:100%;height:100%;}
.cseller .topcover .inner img{vertical-align:middle;width:100%;height:100%;object-fit: cover;}
.boxouter{padding-left:5px;padding-right:5px;box-sizing: border-box;}
.boxouter .boxinner{
  position:relative;z-index:1;background-color:#fff;
  border-radius:5px;
  border: rgb(244, 244, 244) 1px solid;
  box-shadow: rgb(204, 204, 204) 0px -9px 16px -3px;
}
.boxouter.box1 .boxinner{padding-bottom:15px;}
.cseller .box1 .row1{height:35px;}
.cseller .box1 .pic{
  padding-left:20px;
  width:77px;height:35px;
  position:relative;
}
.cseller .box1 .pic img{
  width: 67px;height: 67px;
  box-shadow: rgb(170, 170, 170) 0px -3px 12px -3px;
  border-radius:50%;
  vertical-align:middle;
  position:absolute;top:-35px;
}
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
.cseller .box1 .row2{margin-top:12px;padding:0 20px;box-sizing: border-box;}
.cseller .box1 .row3{margin-top:12px;padding:0 20px;box-sizing: border-box;}
.cseller .taglist{display:inline-block;}
.cseller .taglist .tagitem{
  display:inline-block;padding:0 5px;height: 24px;line-height:24px;
  border-width:1px;border-style:solid;
  border-radius: 5px;text-align: center;margin:0 5px 5px;
}
.cseller .taglist .tagitem:nth-child(odd){border-color:rgb(229, 28, 35);color:rgb(229, 28, 35);}
.cseller .taglist .tagitem:nth-child(even){border-color:rgb(0, 150, 136);color:rgb(0, 150, 136);}
.cseller .linearea{position:relative;height:8px;}
.cseller .linearea .line{
  width: 12px;height: 30px;position:absolute;top:50%;margin-top:-15px;z-index:5;
  border:rgba(187, 187, 187, 0.45) 1px solid;border-radius: 12px;background-color:#fff;
}
.cseller .linearea .line1{left:79px;}
.cseller .linearea .line2{right:79px;}

.cseller .boxouter.box2 .boxinner{box-shadow: rgb(204, 204, 204) 0px -2px 16px -3px;padding:15px 0px;}
.cseller .box2 .row1{padding:0 20px;}
.cseller .focuslist{flex:1;display:flex;overflow:hidden;}
.cseller .focuslist:after{
  content:'';
  display:block;
  clear:both;
}
.cseller .focuslist .item{
  width: 58px;padding-top:10px;
  text-align: center;display:block;color:inherit;
}
.cseller .focuslist .pic{padding-left:20px;width:38px;}
.cseller .focuslist img{width:38px;height:38px;border-radius:50%;vertical-align:middle;object-fit: cover;}
.cseller .focuslist .txt{padding-left:20px;width:38px;}
.cseller .moreicon{width:58px;}

.cseller .pagemiddle{top:0;bottom:50px;padding-bottom:20px;}
.cseller .pagebottom{
  height: 50px;border-top:rgb(249, 249, 249) 1px solid;background-color:#fff;
  box-shadow: rgb(170, 170, 170) 0px -1px 8px -4px;text-align: center;
  border-top:rgb(249, 249, 249) 1px solid;z-index:1;
}
.cseller .pagebottom *{line-height:1.4 !important;}
.cseller .pagebottom .item{height:100%;}
.cseller .pagebottom .al{color:rgb(229, 28, 35);font-size:18px;}
.cseller .pagebottom .txt{color:rgb(229, 28, 35);font-size:12px;}
.tagpopup .close-tag{
  position:absolute;top:10px;right:10px;z-index:1;text-align:center;
  width: 67px;height: 24px;line-height:24px;color: rgba(16, 16, 16, 0.88);
  background-color:#fff;border: rgb(187, 187, 187) 1px solid;
  border-radius: 4px;font-size: 12px;
}
.tagpopup .add-icon{
  position:absolute;right:15px;bottom:15px;border-radius:50%;
  width: 44px;height: 44px;z-index: 10;overflow:hidden;
  color:#fff;background-color: rgb(229, 28, 35);font-size: 28px;
}
.tagpopup .add-icon .txt{vertical-align:middle;margin-top:-2px;}
.cseller .boxouter.box3{margin-top:8px;}
.cseller .boxouter.box3 .boxinner{box-shadow: rgb(204, 204, 204) 0px -2px 16px -3px;padding:15px 20px;}
.cseller .box3 .timelinelist .tlitem{padding:10px 0;}
</style>
