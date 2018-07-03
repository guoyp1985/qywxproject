<template>
  <div class="containerarea font14 bg-page photovideo notop nobottom">
    <router-link to="/addTimeline" class="add-icon flex_center"><span class="txt">+</span></router-link>
    <div class="pagemiddle" style="padding-top:45px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
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
          <div class="row3">
            <div class="taglist">
              <div class="tagitem v_middle">{{tagName}}</div>
              <span class="v_middle">共 {{timelineCount}} 条</span>
            </div>
          </div>
        </div>
      </div>
      <div class="boxouter box2 mt12">
        <div v-if="disData" class="boxinner tllist">
          <div v-if="!timelineData || timelineData.length == 0" class="scroll_item emptyitem flex_center">
            暂无相关数据
          </div>
          <div v-else class="tlitem" v-for="(item,index) in timelineData" :key="index">
            <div class="con">
              <div class="piclist">
                <div class="picitem" v-if="item.photoarr.length > 0" v-for="(pic,index1) in item.photoarr">
                  <div class="inner">
                    <img :src="pic" @click="showBigimg(pic)" onerror="javascript:this.src='http://vuxlaravel.boka.cn/images/nopic.jpg';" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-transfer-dom>
        <previewer :list="previewArr" ref="previewer"></previewer>
      </div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { TransferDom, Previewer } from 'vux'
import ENV from 'env'
import Time from '#/time'
import { User } from '#/storage'

const limit = 10
let pageStart = 0

export default {
  directives: {
    TransferDom
  },
  components: {
    Previewer
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
      disData: false,
      tagName: '图片视频',
      timelineCount: 0,
      previewArr: [{
        msrc: 'http://vuxlaravel.boka.cn/images/nopic.jpg',
        src: 'http://vuxlaravel.boka.cn/images/nopic.jpg'
      }]
    }
  },
  methods: {
    initData () {
      pageStart = 0
      this.disData = false
      this.timelineData = []
      this.timelineCount = 0
    },
    showBigimg (src) {
      const self = this
      if (self.$util.isPC()) {
        self.previewArr = [{
          msrc: src,
          src: src
        }]
        self.$refs.previewer.show(0)
      } else {
        self.$vue.wechat.previewImage({
          current: src,
          urls: [src]
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
          let photoarr = []
          let photo = retdata[i].photo
          if (photo && self.$util.trim(photo) !== '') {
            photoarr = photo.split(',')
          }
          retdata[i].photoarr = photoarr
        }
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
        }
        self.$http.get(`${ENV.BokaApi}/api/retailer/info`, {
          params: params
        }).then(function (res) {
          if (res.status === 200) {
            let data = res.data
            self.userInfo = data.data ? data.data : data
            self.getTimelineData()
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
.photovideo .add-icon{
  position:absolute;right:15px;bottom:15px;border-radius:50%;
  width: 44px;height: 44px;z-index: 10;overflow:hidden;
  color:#fff;background-color: rgb(229, 28, 35);font-size: 28px;
}
.photovideo .add-icon .txt{vertical-align:middle;margin-top:-2px;}
.boxouter{padding-left:5px;padding-right:5px;box-sizing: border-box;}
.boxouter .boxinner{
  position:relative;z-index:1;background-color:#fff;
  border-radius:5px;
  border: rgb(244, 244, 244) 1px solid;
  box-shadow: rgb(204, 204, 204) 0px -9px 16px -3px;
}
.photovideo .boxouter.box1 .boxinner{padding-bottom:0;}
.photovideo .box1 .row1{height:35px;}
.photovideo .box1 .pic{
  padding-left:20px;
  width:77px;height:35px;
  position:relative;
}
.photovideo .box1 .pic img{
  width: 67px;height: 67px;
  box-shadow: rgb(170, 170, 170) 0px -3px 12px -3px;
  border-radius:50%;
  vertical-align:middle;
  position:absolute;top:-35px;
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
.photovideo .taglist .tagitem{
  display:inline-block;padding:0 5px;height: 24px;line-height:24px;
  border-width:1px;border-style:solid;
  border-radius: 5px;text-align: center;margin:0 5px 5px;
  border-color:rgb(229, 28, 35);color:rgb(229, 28, 35);
}
.photovideo .row3{padding:15px 20px;box-sizing: border-box;}

.tllist{

}
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
