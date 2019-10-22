/*
* @description: 文章详情页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div class="containerarea font14 bg-white news notop nobottom">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div id="article-content" class="pagemiddle">
        <div class="article-view">
          <div class="article-title">
            <h2>{{article.title}}</h2>
          </div>
          <div class="article-vice-title">
            <h4>{{article.vicetitle}}</h4>
          </div>
          <div class="article-info" style="position:relative;">
            <span class="article-date color-gray">{{article.dateline | dateFormat}}</span>
            <span v-if="reward.subscribe != 1" @click="popupSubscribe" class="article-ex color-blue">{{ WeixinName }}</span>
            <!-- <router-link v-else to="/subscribeInfo" class="article-ex color-blue">{{ WeixinName }}</router-link> -->
            <router-link class="article-author" :to="{ name: '', params: {} }">{{article.author}}</router-link>
          </div>
          <template v-if="article.c_format == 'json'">
            <template v-for="(item, index) in article.content">
              <div v-if="item.content && item.content != ''" class="padding10">{{item.content}}</div>
              <template v-for="(photo,index1) in item.photo" index="index1" item="photo">
                <div class="flex_center">
                  <img :src="photo" style="max-width:100%;"/>
                </div>
              </template>
            </template>
          </template>
          <template v-else>
            <template v-if="article.uploader == reward.uid || article.fid == reward.fid">
              <div v-if="article.content == '' && !afterEdit" id="editor-content" class="article-content color-gray font16">
                <p>内容为空，点击【编辑】按钮可修改内容哦！</p>
              </div>
              <div v-else id="editor-content" class="article-content" v-html="article.content"></div>
            </template>
            <template v-else>
              <div class="article-content" v-html="article.content"></div>
            </template>
          </template>
          <div class="reading-info">
            <span class="font14 color-gray">{{$t('Reading')}} {{article.views | readingCountFormat}}</span>
            <!-- <span class="font14 color-gray" @click="clickDig"><span :class="`digicon ${isdig ? 'diged' : ''}`"></span> {{article.dig}}</span> -->
          </div>
        </div>
      </div>
      <share-success
        v-show="showShareSuccess"
        v-if="article.uploader == reward.uid || query.wid == reward.uid || article.identity != 'user'"
        :data="article"
        :loginUser="loginUser"
        :module="module"
        :on-close="closeShareSuccess">
      </share-success>
      <editor v-if="(reward.uid == article.uploader || reward.fid == article.fid) && showEditor && article.c_format != 'json'" elem="#editor-content" module="academic" :loginUser="loginUser" :query="query" @on-edit="clickEdit" @on-auto-save="autoSave" @on-save="editSave" @on-setting="editSetting" @on-delete="editDelete"></editor>
      <div v-transfer-dom class="x-popup">
        <popup v-model="showSubscribe" height="100%">
          <div class="popup1">
            <div class="popup-top flex_center">关注</div>
            <div class="popup-middle font14 flex_center">
          			<img :src="WeixinQrcode" style="max-width:90%;max-height:90%;" />
            </div>
            <div class="popup-bottom flex_center">
              <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closeSubscribe">{{ $t('Close') }}</div>
            </div>
          </div>
        </popup>
      </div>
      <div v-transfer-dom>
        <previewer :list="previewerPhotoarr" ref="previewer"></previewer>
      </div>
    </template>
  </div>
</template>
<script>
import { Popup, TransferDom, XButton, Divider, Previewer } from 'vux'
import Editor from '@/components/Editor'
import ShareSuccess from '@/components/ShareSuccess'
import Sos from '@/components/Sos'
import Time from '#/time'
import ENV from 'env'
import jQuery from 'jquery'
import { User } from '#/storage'
import Socket from '#/socket'

let room = ''
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, XButton, Divider, Editor, ShareSuccess, Previewer, Sos
  },
  data () {
    return {
      module: 'academic',
      query: {},
      loginUser: {},
      WeixinName: ENV.WeixinName,
      showSos: false,
      sosTitle: '抱歉，您暂无权限访问此页面！',
      showContainer: false,
      showShareSuccess: false,
      reward: { headimgurl: 'https://tossharingsales.boka.cn/images/user.jpg', avatar: 'https://tossharingsales.boka.cn/images/user.jpg', linkman: '', credit: 0 },
      article: {},
      factoryinfo: {},
      comments: [],
      showSubscribe: false,
      WeixinQrcode: ENV.WeixinQrcode,
      isdig: 0,
      photoarr: [],
      previewerPhotoarr: [],
      // disComments: false,
      pagestart: 0,
      limit: 20,
      replyData: null,
      showEditor: false,
      showArticle: false,
      editIng: false,
      afterEdit: false
    }
  },
  filters: {
    dateFormat (date) {
      return new Time(date * 1000).dateFormat('yyyy-MM-dd')
    },
    readingCountFormat (count) {
      return count > 100000 ? '100000+' : count
    }
  },
  watch: {
    isdig () {
      return this.isdig
    }
  },
  methods: {
    access () {
      this.$util.wxAccess()
    },
    clickEdit () {
      this.editIng = true
    },
    clickInsertProduct (url) {
      this.$router.push({path: url})
    },
    popupSubscribe () {
      this.showSubscribe = true
    },
    closeSubscribe () {
      this.showSubscribe = false
    },
    clickProduct (event) {
      const self = this
      let node = event.target
      while (node) {
        if (node.nodeType === 1 && node.getAttribute('class').indexOf('insertproduct') > -1) {
          const linkurl = node.getAttribute('linkurl')
          if (linkurl) {
            self.$router.push({path: linkurl})
          }
          break
        }
        node = node.parentNode
      }
    },
    getData () {
      const self = this
      const id = this.query.id
      const infoparams = { id: id, module: this.module }
      if (this.query.from === 'poster') {
        infoparams.from = 'poster'
      }
      if (this.query['share_uid']) {
        infoparams['share_uid'] = self.query.share_uid
      }
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/moduleInfo`, infoparams) // 获取文章
      .then(res => {
        const data = res.data
        if (!isNaN(data.flag)) {
          self.$vux.loading.hide()
          if (data.flag !== 1) {
            self.sosTitle = data.error
            self.showSos = true
            return false
          }
          if (res.data.flag) {
            self.article = res.data.data
            self.article = res.data.data
            self.showArticle = true
            self.showEditor = true
            document.title = self.article.title
            self.reward = User.get()
            self.factoryinfo = self.article.factoryinfo
            let shareParams = {
              data: self.article,
              module: self.module,
              moduleid: self.article.id,
              link: `${ENV.Host}/#/academic?id=${self.article.id}&fid=${self.article.fid}&share_uid=${self.reward.uid}`,
              successCallback: function () {
                self.showShareSuccess = true
              }
            }
            if (self.query.share_uid) {
              shareParams.link = `${shareParams.link}&lastshareuid=${self.query.share_uid}`
              shareParams.lastshareuid = self.query.share_uid
            }
            self.$util.handleWxShare(shareParams)
            self.showContainer = true
            return self.$http.get(`${ENV.BokaApi}/api/user/digs/show`, {
              params: {id: id, module: self.module}
            })
          }
        }
      })
      .then(res => {
        if (res) {
          if (self.reward.uid !== self.article.uploader) {
            let items = document.querySelectorAll('.insertproduct')
            for (let i = 0; i < items.length; i++) {
              let cur = items[i]
              cur.addEventListener('click', self.clickProduct)
            }
          }
          self.handleImg()
          const data = res.data
          if (data.flag === 1) {
            self.isdig = 1
          }
        }
      })
    },
    save (callback) {
      const self = this
      let editorContent = document.querySelector('#editor-content')
      self.$vux.loading.show()
      let con = editorContent.innerHTML.replace(/Eleditor-active/g, '')
        .replace('<p class="">文章内容为空，点击【编辑】按钮可修改内容哦！</p>', '')
        .replace('<p>文章内容为空，点击【编辑】按钮可修改内容哦！</p>', '')
        .replace('<p class="Eleditor-active">文章内容为空，点击【编辑】按钮可修改内容哦！</p>', '')
      self.$http.post(`${ENV.BokaApi}/api/editContent/academic`, {
        id: self.query.id,
        content: con
      }).then(res => {
        let data = res.data
        self.$vux.loading.hide()
        if (data.flag === 1) {
          if (con !== '') {
            self.article.content = con
            self.afterEdit = true
          }
          self.handleImg()
          callback && callback()
        }
        let toasttype = data.flag !== 1 ? 'warn' : 'success'
        self.$vux.toast.show({
          text: data.error,
          type: toasttype,
          time: self.$util.delay(data.error)
        })
      })
    },
    autoSave () {
      this.save()
    },
    editSave () {
      this.editIng = false
      this.save()
    },
    editSetting () {
      this.$router.push({name: 'tAddAcademic', params: {id: this.article.id, fid: this.article.fid}})
    },
    editDelete () {
      this.$vux.confirm.show({
        title: this.$t('Delete Article Confirm'),
        onCancel () {},
        onConfirm () {}
      })
    },
    closeShareSuccess () {
      this.showShareSuccess = false
    },
    clickDig () {
      const self = this
      let url = `${ENV.BokaApi}/api/user/digs/add`
      if (self.isdig) {
        url = `${ENV.BokaApi}/api/user/digs/delete`
      }
      self.$vux.loading.show()
      self.$http.post(url, {
        id: self.query.id,
        module: self.module
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        if (data.flag === 1) {
          if (self.isdig) {
            self.isdig = 0
            self.article.dig = self.article.dig - 1
          } else {
            self.isdig = 1
            self.article.dig = self.article.dig + 1
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
    handleImg () {
      const self = this
      self.photoarr = []
      self.previewerPhotoarr = []
      let imgTags = document.querySelectorAll('.news .article-content img')
      if (imgTags.length > 0) {
        for (let i = 0; i < imgTags.length; i++) {
          let curimg = imgTags[i]
          if (jQuery(curimg).parents('.insertproduct').length === 0) {
            self.photoarr.push(imgTags[i].getAttribute('src'))
            curimg.removeEventListener('click', self.clickImg)
            curimg.addEventListener('click', self.clickImg)
          }
        }
      }
      self.previewerPhotoarr = self.$util.previewerImgdata(self.photoarr)
    },
    clickImg (event) {
      const node = event.target
      const src = node.getAttribute('src')
      let index = 0
      for (let i = 0; i < this.photoarr.length; i++) {
        if (this.photoarr[i] === src) {
          index = i
          break
        }
      }
      this.showBigimg(index)
    },
    showBigimg (index) {
      const self = this
      if (!document.querySelector('.Eleditor-area')) {
        if (self.$util.isPC()) {
          self.$refs.previewer.show(index)
        } else {
          window.WeixinJSBridge.invoke('imagePreview', {
            current: self.photoarr[index],
            urls: self.photoarr
          })
        }
      }
    },
    toStore () {
      const self = this
      self.$router.push({path: '/store', query: {wid: self.factoryinfo.uid}})
    },
    createSocket () {
      const uid = this.loginUser.uid
      const linkman = this.loginUser.linkman
      // const fromId = this.query.fromId
      room = `${this.module}-${this.query.id}-${this.article.wid}`
      Socket.listening({room: room, uid: uid, linkman: linkman, fromModule: this.module, fromId: this.query.id})
    },
    init () {
      this.$util.wxAccessListening()
    },
    refresh (query) {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      const self = this
      this.loginUser = User.get()
      this.showArticle = false
      this.showEditor = false
      this.editIng = false
      if (this.query.id !== query.id) {
        self.showSos = false
        self.showContainer = false
        this.query = query
      }
      this.getData()
    }
  },
  created () {
    this.init()
  },
  activated () {
    const self = this
    this.loginUser = User.get()
    if (this.loginUser) {
      this.$vux.loading.show()
      let isAdmin = false
      for (let i = 0; i < self.loginUser.usergroup.length; i++) {
        if (self.loginUser.usergroup[i] === 1) {
          isAdmin = true
          break
        }
      }
      if (!self.loginUser.isretailer && !self.loginUser.fid && !isAdmin) {
        this.$vux.loading.hide()
        self.showSos = true
        self.showContainer = false
      } else {
        this.$vux.loading.hide()
        if (this.query.id !== this.$route.query.id) {
          self.showSos = false
          self.showContainer = false
          this.refresh(this.$route.query)
        }
      }
    }
  }
  // beforeRouteLeave (to, from, next) {
  //   Socket.destory(room)
  //   next()
  // }
}
</script>
<style lang="less">
#article-content .article-view {
  padding: 10px 15px;
  background: #ffffff;
}
#article-content .article-info {
  padding: 10px 0;
}
#article-content .operate-area {
  text-align: center;
}
#article-content .operate-area span {
  vertical-align: middle;
  font-size: 12px;
  line-height: 16px;
}
#article-content .reading-info {
  padding: 20px 0;
}
#article-content .reading-info span + span {
  margin-left: 10px;
}
#article-content .article-author {
  margin-left: 6px;
  color: #1aad19;
}
#article-content .qrcode-area {
  padding: 15px;
  position: relative;
  vertical-align: middle;
  background: url(../assets/images/qrbg.gif);
}
#article-content .qrcode-bg {
  margin: 0 auto;
  box-shadow: 1px 0 5px #868181;
  background-color: #fff;
}
#article-content .qrcode {
  text-align: center;
  position: relative;
  margin: 0 auto;
  display: block;
}
#article-content .qrcode>img {
  width: 100%;
}
#article-content .scan-area {
  width: 50%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  vertical-align: middle;
}
#article-content .scan-area img {
  max-width: 100%;
  height: 100%;
  vertical-align: middle;
  display: block;
  margin:0 auto;
}
#article-content .comment-area {
  padding: 20px 15px;
}
#article-content .comment-op {
  text-align: right;
  color: #1aad19;
}
#editor-content {
  overflow: hidden;
}
#editor-content img {
  max-width: 100% !important;
}

/* vui css hack */
#article-content .weui-btn_mini {
  padding: 0 13px;
}


.news .insertproduct{
  display:block;padding:5px !important;position:relative;text-indent: 0 !important;
  color:inherit !important;border:#e3e3e3 1px solid !important;border-radius:5px !important;
}
.news .insertproduct img{vertical-align: middle !important;}
.news .insertproduct .iteminfo{
  text-align:right;position:absolute;color:#fff;padding-left:10px;padding-right:10px;
  font-size:12px;
  bottom: 15px;right: 9px;border-radius: 15px;background-image: linear-gradient(90deg, #f26f12 0%, #fa3f06 99%);
}
.news .weui-btn_mini{border: 1px solid #1aad19 !important;}
.news .weui-btn_plain-primary{border:0px;}
.news .weui-btn:after{display: none;}
.news .editor{}
</style>
