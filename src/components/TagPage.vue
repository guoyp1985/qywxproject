<template>
  <div class="font14 mt12">
    <div class="boxouter box2">
      <div v-if="showList" class="boxinner timelinelist">
        <div v-if="!timelineData || timelineData.length == 0" class="scroll_item emptyitem flex_center">
          暂无相关动态
        </div>
        <div v-else class="tlitem" v-for="(item,index) in timelineData" :key="index">
          <div class="avatar">
            <img :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
          </div>
          <div class="con">
            <div class="txt">{{item.username}}</div>
            <div v-if="item.title && item.title != ''" v-html="filterEmot(item.title)"></div>
            <div class="piclist" v-if="item.photoarr.length > 0">
              <div
                :class="`picitem ${item.photoarr.length == 1 ? 'one' : ''} ${item.photoarr.length >= 2 ? 'more' : ''}`"
                  v-for="(pic,index1) in item.photoarr">
                <div class="inner">
                  <img :src="pic" @click="showBigimg(pic,item.photoarr,`previewer${index}`,index1)" />
                </div>
              </div>
            </div>
            <template v-if="item.photoarr.length > 0">
              <div v-transfer-dom>
                <previewer :list="item.previewerPhoto" :ref="`previewer${index}`"></previewer>
              </div>
            </template>
            <div class="datetxt">
              <div class="flex_cell font12 flex_left">
                <span class="db-in v_middle">{{ item.dateline | dateFormat }}</span>
                <div class="deletetxt" v-if="item.uid == loginUser.uid || query.uid == loginUser.uid || (sellerType == 'userstory' && (!query.uid || query.uid == loginUser.uid))" @click="deleteTimeline(item,index)">删除</div>
              </div>
              <div class="flex_right ricon">
                <i class="al al-pl font12" @click="clickIcon(item, index)"></i>
                <div :class="`iconlayer flex_center ${item.clicked ? 'active' : ''}`">
                  <span class="iconitem" @click="clickDig(item,index)">
                    <i class="al al-zan8 mr5 font12"></i>
                    <span class="v_middle" v-if="item.isdig">取消</span>
                    <span class="v_middle" v-else>赞</span>
                  </span>
                  <div class="iconitem" @click="onReplyShow(item,index)" v-if="loginUser.subscribe">
                    <i class="al al-pinglun1 font14 mr5"></i>
                    <span class="v_middle">评论</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt5 commentarea" v-if="(item.comments && item.comments.length > 0) || (item.digman && item.digman.length > 0)">
              <template v-if="item.digman && item.digman.length > 0">
                <div class="digarea">
                  <span class="al al-zan8 mr5 font12"></span>
                  <span class="v_middle">{{item.digmanstr}}</span>
                </div>
              </template>
              <div class="line" v-if="(item.comments && item.comments.length > 0) && item.digman && item.digman.length > 0"></div>
              <div class="commlist" v-if="item.comments && item.comments.length > 0">
                <div class="citem" v-for="(citem,index1) in item.comments" :key="index1">
                  <div class="txt1" @click="onReplyShow(item,index,citem,index1)">
                    <span class="v_middle name name1">{{citem.username}}: </span>
                    <span class="v_middle" v-html="filterEmot(citem.message)"></span>
                  </div>
                  <div class="replylist" v-if="citem.comment.length > 0">
                    <div class="txt2 ritem" v-for="(ritem,index2) in citem.comment" :key="index2">
                      <span class="v_middle name name2">{{ritem.username}}</span>
                      <span class="v_middle">回复</span>
                      <span class="v_middle name name2">{{citem.username}}: </span>
                      <span class="v_middle" v-html="filterEmot(ritem.message)"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <comment-popup
      :show="replyPopupShow"
      :title="disCommentTitle"
      @on-submit="replySubmit"
      @on-cancel="replyPopupCancel">
    </comment-popup>
  </div>
</template>

<i18n>
</i18n>

<script>
import { TransferDom, Previewer } from 'vux'
import CommentPopup from '@/components/CommentPopup'
import ENV from 'env'
import Time from '#/time'

export default {
  name: 'TagPage',
  props: {
    query: {
      type: Object,
      default: {}
    },
    userInfo: {
      type: Object,
      default: {}
    },
    loginUser: {
      type: Object,
      default: {}
    },
    timelineData: {
      type: Array,
      default: []
    },
    pageStart: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 10
    },
    showList: {
      type: Boolean,
      default: false
    },
    timelineCount: {
      type: Number,
      default: 0
    },
    tagName: {
      type: String,
      default: '卖家动态'
    },
    sellerType: {
      type: String,
      default: ''
    },
    afterDelete: Function,
    clickComment: Function,
    cancelComment: Function,
    afterReply: Function,
    afterDig: Function
  },
  directives: {
    TransferDom
  },
  components: {
    Previewer, CommentPopup
  },
  filters: {
    dateFormat (date) {
      return new Time(date * 1000).format1()
    }
  },
  data () {
    return {
      replyPopupShow: false,
      commentData: null,
      commentIndex: 0,
      replyData: null,
      replyIndex: 0,
      commentModule: 'timeline',
      commentTitle: '评论',
      replyTitle: '回复',
      disCommentTitle: '评论'
    }
  },
  methods: {
    deleteTimeline (item, index) {
      const self = this
      self.timelineData[index].clicked = false
      self.$vux.confirm.show({
        title: '确定要删除吗？',
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/timeline/delete`, {
            id: item.id
          }).then(function (res) {
            self.$vux.loading.hide()
            let data = res.data
            if (data.flag) {
              if (self.afterDelete) {
                self.afterDelete(item, index)
              }
            } else {
              self.$vux.toast.show({
                text: data.error,
                type: 'warning',
                time: self.$util.delay(data.error)
              })
            }
          })
        }
      })
    },
    filterEmot (text) {
      return this.$util.emotPrase(text)
    },
    clickIcon (item, index) {
      this.timelineData[index].clicked = !this.timelineData[index].clicked
    },
    showBigimg (src, arr, refname, index) {
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
    clickDig (item, index) {
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
            for (let i = 0; i < item.digman.length; i++) {
              if (self.loginUser.linkman === item.digman[i]) {
                item.digman.splice(i, 1)
                break
              }
            }
          } else {
            item.isdig = 1
            item.dig = item.dig + 1
            item.digman.push(self.loginUser.linkman)
          }
          self.timelineData[index].clicked = false
          self.timelineData[index].digman = item.digman
          self.timelineData[index].digmanstr = item.digman.join(',')
          if (self.afterDig) {
            self.afterDig(self.timelineData[index])
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
      this.clickComment && this.clickComment()
      this.replyPopupShow = true
      if (citem) {
        this.disCommentTitle = this.replyTitle
        this.commentModule = 'comments'
        this.replyData = citem
        this.replyIndex = index1
      } else {
        this.disCommentTitle = this.commentTitle
        this.commentModule = 'timeline'
        this.replyData = null
        this.replyIndex = 0
      }
      this.timelineData[index].clicked = false
    },
    replyPopupCancel () {
      this.cancelComment && this.cancelComment()
      this.replyPopupShow = false
    },
    replySubmit (value) { // 回复提交
      const self = this
      this.cancelComment && this.cancelComment()
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
            if (!self.timelineData[self.commentIndex].comments) {
              self.timelineData[self.commentIndex].comments = [data.data]
            } else {
              self.timelineData[self.commentIndex].comments.push(data.data)
            }
          } else {
            if (!self.timelineData[self.commentIndex].comments[self.replyIndex].comment) {
              self.timelineData[self.commentIndex].comments[self.replyIndex].comment = [data.data]
            } else {
              self.timelineData[self.commentIndex].comments[self.replyIndex].comment.push(data.data)
            }
          }
          if (self.afterReply) {
            self.afterReply(self.timelineData[self.commentIndex])
          }
        } else {
          self.$vux.toast.show({
            text: data.error,
            type: 'warn',
            time: self.$util.delay(data.error)
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.boxouter .boxinner{
  position:relative;z-index:1;background-color:#fff;
}
.tagpage .boxouter.box1 .boxinner{padding-bottom:0;}
.tagpage .box1 .row1{height:35px;}
.tagpage .box1 .pic{
  padding-left:20px;
  width:77px;height:35px;
  position:relative;
}
.tagpage .box1 .pic img{
  width: 67px;height: 67px;
  box-shadow: rgb(170, 170, 170) 0px -3px 12px -3px;
  border-radius:50%;
  vertical-align:middle;
  position:absolute;top:-35px;
}
.tagpage .box1 .btn-cell{
  width:90px;text-align:center;
}
.tagpage .box1 .btn{
  display:block;margin:0 auto;
  width: 70px;height: 26px;line-height:26px;color:#fff;
  background-color: rgb(229, 28, 35);
  border-radius: 27px;
  font-size: 12px;
}
.tagpage .taglist .tagitem{
  display:inline-block;padding:0 5px;height: 24px;line-height:24px;
  border-width:1px;border-style:solid;
  border-radius: 5px;text-align: center;margin:0 5px 5px;
  border-color:rgb(229, 28, 35);color:rgb(229, 28, 35);
}
.tagpage .row3{padding:15px 20px;box-sizing: border-box;}
</style>
