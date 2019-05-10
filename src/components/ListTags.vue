<template>
  <div class="tags">
    <div class="tag" v-for="(tag, index) in tags" :key="tag.id">
      <img class="avatar" :src="tag.avatar"/>
      <div class="tag-info">
        <div class="info-top">
          <span class="username clamp1">{{tag.username}}</span>
          <div class="ope-btns" v-if="tag.content.length > 0">
            <div class="btn copy-btn" @click="copyTxt"><span class="al al-copy mr3"></span>复制文本</div>
            <!-- <div class="btn"><span class="al al-xiazai mr3"></span>保存图片</div> -->
          </div>
        </div>
        <div class="content">{{tag.content}}</div>
        <div class="photos" v-if="tag.photo !== ''">
          <div :images="tag.photosSplited" style="width:100%;display:flex;flex-wrap: wrap;">
            <div class="photo-wraper" v-for="(photo,pindex) in tag.photosSplited" :key="pindex">
              <div class="photo">
                  <img :src="photo" @click="showBigimg(pindex,index)" />
              </div>
            </div>
          </div>
        </div>
        <div class="info-bottom">
          <span class="time">{{tag.time}}</span>
          <span class="delete" v-if="teamInfo.manager > 0" @click="deleteTag(tag.moduleid, index)">删除</span>
        </div>
      </div>
    </div>
    <div class="tip-message" v-if="!tags.length && loaded"><span>暂无素材</span></div>
    <!-- 数据加载完毕提示 -->
    <div class="end-area" v-if="tags.length && endShow"><span>--没有更多数据啦--</span></div>
  </div>
</template>

<script type="text/javascript">
import ScrollView from '@/components/ScrollView'
import Env from 'env'
import Time from '#/time'
export default {
  data () {
    return {
      tags: [],
      module: '',
      pagestart: 0,
      limit: 5,
      currentPhotos: [],
      loaded: false,
      endShow: false
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    userInfo: {
      type: Object,
      default: null
    },
    teamInfo: {
      type: Object,
      default: null
    }
  },
  components: {
    ScrollView
  },
  methods: {
    getTags () {
      console.log('in listtags getTags')
      if (this.tags.length === this.pagestart * this.limit) {
        this.$http({
          url: `${Env.BokaApi}/api/team/link`,
          method: 'post',
          data: {
            teamid: this.id,
            module: 'teamsource',
            pagestart: this.pagestart,
            limit: this.limit
          }
        }).then(res => {
          console.log(res)
          let data = res.data
          for (let i = 0; i < data.data.length; i++) {
            data.data[i].photosSplited = data.data[i].photo.split(',')
            data.data[i].time = new Time(data.data[i].dateline * 1000).format()
          }
          if (data.flag) {
            if (this.pagestart === 0) {
              this.tags = data.data
            } else {
              this.tags.push(...data.data)
            }
            this.$nextTick(() => {
              this.$parent.refresh()
            })
            this.pagestart++
          }
          if (data.length < this.limit) {
            this.endShow = true
          }
          this.loaded = true
        })
      }
    },
    showBigimg (pindex, index) {
      const self = this
      console.log(pindex)
      console.log(index)
      // if (self.$util.isPC()) {
      //   self.$refs.tags[pindex][photosSplited].show(index)
      // } else {
      var imgList = self.tags[index].photosSplited
      if (imgList.length > 0) {
        var src = imgList[pindex]
        console.log(imgList)
        console.log(src)
        if (window.WeixinJSBridge) {
          window.WeixinJSBridge.invoke('imagePreview', {
            current: imgList[pindex],
            urls: imgList
          })
        }
      }
    },
    deleteTag (moduleid, index) {
      let _this = this
      _this.$vux.confirm.show({
        title: `确定删除该素材吗？`,
        onConfirm () {
          _this.$http({
            url: `${Env.BokaApi}/api/team/band`,
            method: 'post',
            data: {
              type: 'del',
              module: 'teamsource',
              id: _this.id,
              moduleid: moduleid
            }
          }).then(res => {
            if (res.data.flag) {
              _this.tags.splice(index, 1)
              if (_this.tags.length === 0) {
                _this.pagestart = 0
                _this.getTags()
              }
            }
          })
        }
      })
    },
    copyTxt (e) {
      const self = this
      let eleobj = null
      let elem = e.target.parentNode.parentNode
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
    }
  }
};
</script>

<style lang="less" scoped="">
  .tags{
    .tag{
      display: flex;
      align-items: flex-start;
      width: 100vw;
      padding: 20px;
      box-sizing: border-box;
      border-top: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      background-color: #fff;
      margin-bottom: 5px;
      .avatar{
        width: 50px;
        height: 50px;
        margin-right: 20px;
      }
      .tag-info{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        color: #000;
        .info-top{
          display: flex;
          margin-bottom:6px;
          align-items: center;
          .username{
            color: #5b6a92;
            width:70px;
            font-size: 16px;
          }
          .ope-btns{
            font-size: 14px;
            display: flex;
            .btn{
              color:#7d7979;
              border-radius: 5px;
              background-color: transparent;
              border: 1px solid #cfcfcf;
              padding: 3px 8px;
              height: 16px;
              line-height: 16px;
              .al{
                font-size: 14px;
              }
            }
            .copy-btn{
              margin-right: 10px;
            }
          }
        }
        .content{
          white-space: pre-wrap;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .photos{
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-start;
          margin-bottom: 10px;
          width: 100%;
          .photo-wraper{
            position: relative;
            width: 30%;
            padding-top: 30%;
            height: 0;
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 10px;
            .photo{
              position: absolute;
              left: 0;
              top: 0;
              right: 0;
              bottom: 0;
              img{
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          }
          .photo-wraper:nth-child(3n + 2){
            margin-left: 5%;
            margin-right: 5%;
          }
        }
        .info-bottom{
          display: flex;
          font-size: 14px;
          .time{
            color: #868686;
          }
          .delete{
            margin-left: 10px;
            color: #85b8ea;
          }
        }
      }
    }
    .tag:first-child{
      border-top: none;
    }
    .tag:last-child{
      margin-bottom: 0;
    }
    .tip-message{
      text-align: center;
      color: #c9c9c9;
      margin-top: 30px;
    }
    .end-area{width:100%;height:50px;color:#ccc;display:flex;align-items:center;justify-content: center;}
  }
</style>
