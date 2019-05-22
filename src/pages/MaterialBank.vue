<template>
  <div class="containerarea font14 bg-white materialbank" v-if="disShow">
    <div class="pagemiddle" style="top:0;" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
      <div>
        <div v-if="!tlData || tlData.length == 0" class="flex_center font16 mt20">暂无素材数据</div>
        <div v-else class="timelinelist" v-for="(item, index) in tlData" :key="index">
          <div class="tlitem">
            <div class="avatar"><img :src="item.uploaderavatar" /></div>
            <div class="con">
              <div class="flex_left">
                <div class="txt no_bold">{{item.uploadername}}</div>
                <div v-if="item.title !== ''" style="margin-left:auto;color:#7d7979;" @click="copyTxt"><span class="al al-copy mr3 font14"></span>复制</div>
              </div>
              <div v-if="item.title && item.title != ''" v-html="filterEmot(item.title)"></div>
              <div class="piclist">
                <div class="picitem more" v-for="(items,index1) in item.photoarr">
                  <div class="inner">
                    <img :src="items" @click="showBigimg1(items,item.photoarr,`previewer${index}`,index1)" />
                  </div>
                </div>
                <template v-if="item.video && item.video != ''">
                  <div class="picitem more" @click="clickPlay('productVideo', item)">
                    <div class="inner align_center" :style="`border:1px solid #e5e5e5;line-height:95px;background:url('${item.uploaderavatar}')`">
                      <div class="pofang"><i class="al al-bofang"></i></div>
                    </div>
                  </div>
                  <!-- webkit-playsinline=""
                  playsinline="true" -->
                  <div v-if="item.playvideo" class="videoarea">
                    <video
                      ref="productVideo"
                      :src="item.video"
                      controls
                      autoplay="true"
                      x-webkit-airplay="true"
                      raw-controls=""
                      x5-video-player-type="h5"
                      x5-video-player-fullscreen="true"
                      x5-video-orientation="portrait">
                    </video>
                    <div class="close-icon flex_center" @click="stopPlay('productVideo', item)">关闭</div>
                  </div>
                </template>
                <template v-if="item.photoarr.length > 0">
                  <div v-transfer-dom>
                    <previewer :list="item.previewerPhoto" :ref="`previewer${index}`"></previewer>
                  </div>
                </template>
              </div>
              <div class="datetxt flex_left">
                <div class="font12">{{item.dateline_str}}</div>
                <div v-if="item.uploader == userInfo.uid || item.fid == userInfo.fid" class="ricon ml20" @click="delScai(item,index)">删除</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex_center" style="color:#999;height:30px;" v-if="isLoading">数据加载中</div>
    </div>
    <router-link class="bg-sucai pagebottom flex_center" :to="{path: '/AddMaterial', query: {pid: this.id}}">
      <div class="addsucai">发布素材</div>
    </router-link>
  </div>
</template>
<script>
import { TransferDom, Previewer } from 'vux'
import ENV from 'env'
import Time from '#/time'
let pageStart = 0
const limit = 10

export default {
  directives: {
    TransferDom
  },
  components: {
    Previewer
  },
  data () {
    return {
      tlData: [],
      id: 0,
      userInfo: {},
      disShow: false,
      playVideo: false,
      isLoading: false
    }
  },
  methods: {
    handleScroll: function (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.tlData.length === (pageStart + 1) * limit) {
            pageStart++
            self.$vux.loading.show()
            self.isLoading = true
            self.getData()
          }
        }
      })
    },
    filterEmot (text) {
      return this.$util.emotPrase(text)
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
    copyTxt (e) {
      const self = this
      let eleobj = null
      let elem = e.target.parentNode
      console.log(elem)
      while ((elem = elem.nextSibling)) {
        if (elem.nodeType === 1) {
          eleobj = elem
          break
        }
      }
      if (eleobj.innerHTML.length > 0) {
        let range = null
        let save = function (e) {
          e.clipboardData.setData('text/plain', eleobj.innerHTML)
          e.preventDefault()
        }
        if (self.$util.isIOS()) { // ios设备
          window.getSelection().removeAllRanges()
          range = document.createRange()
          range.selectNode(eleobj)
          window.getSelection().addRange(range)
          document.execCommand('copy')
          window.getSelection().removeAllRanges()
        } else { // 安卓设备
          console.log('in android')
          document.addEventListener('copy', save)
          document.execCommand('copy')
          document.removeEventListener('copy', save)
        }
        setTimeout(function () {
          self.$vux.toast.show({
            text: '复制成功',
            time: 1500
          })
        }, 200)
      }
    },
    clickPlay (refname, item) {
      const self = this
      // this.playVideo = true
      console.log(item)
      item.playvideo = true
      setTimeout(function () {
        self.$refs[refname][0].play()
      }, 100)
    },
    stopPlay (refname, item) {
      // this.playVideo = false
      item.playvideo = false
    },
    refresh () {
      this.tlData = []
      pageStart = 0
    },
    getData () {
      this.$http.get(`${ENV.BokaApi}/api/list/productmaterial`, {
        params: {pid: this.id, pagestart: pageStart, limit: limit}
      }).then(res => {
        this.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        for (var i = 0; i < retdata.length; i++) {
          let photoarr = []
          let photo = retdata[i].contentphoto
          retdata[i].playvideo = false
          retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
          if (photo && this.$util.trim(photo) !== '') {
            photoarr = photo.split(',')
          }
          retdata[i].photoarr = photoarr
          retdata[i].previewerPhoto = this.$util.previewerImgdata(photoarr)
        }
        this.tlData = this.tlData.concat(retdata)
        this.isLoading = false
        this.disShow = true
      })
    },
    getData2 () {
      this.$http.get(`${ENV.BokaApi}/api/user/show`).then(res => {
        const data = res.data
        const retdata = data.data ? data.data : data
        this.userInfo = retdata
        console.log('个人信息：')
        console.log(this.userInfo)
      })
    },
    delScai (item, index) {
      const self = this
      self.$vux.confirm.show({
        title: '确定要删除吗？',
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/delete/productmaterial`, {
            id: item.id
          }).then(function (res) {
            const data = res.data
            self.$vux.loading.hide()
            self.tlData.splice(index, 1)
            if (data.flag === 1) {
              self.$vux.toast.text(data.error)
            }
          })
        }
      })
    }
  },
  activated () {
    this.id = this.$route.query.pid
    this.refresh()
    this.getData()
    this.getData2()
  }
}
</script>
<style lang="less">
.materialbank{
  .bg-sucai{
    border-top:1px solid #e5e5e5;
  }
  .addsucai{width:100%;height:30px;background-color:#ff6a61;color:#fff;text-align:center;border-radius:20px;line-height:30px;}
  .tlitem{border-bottom:1px solid #e5e5e5;}
  .videoarea{position:absolute;left:0;top:0;right:0;bottom:0;background-color:#000;color:#fff;z-index:10;}
  .videoarea video{position:absolute;width:100%;height:100%;}
  .videoarea .close-icon{position:absolute;left:50%;top:7px;width:60px;height:30px;margin-left:-30px;background-color:rgba(0,0,0,0.3);color:#fff;border-radius:10px;}
  .play-icon{width:110px;height:110px;border:1px solid #e5e5e5;}
  .timelinelist:last-child{margin-bottom:50px;}
  .pofang{
    width:40px;height:40px;background-color:rgba(0,0,0,0.3);border-radius:50%;text-align:center;line-height:45px;
    margin-left:20px;margin-top:20px;color:#fff;
  }
}
</style>
