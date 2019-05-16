<template>
  <div class="containerarea font14 bg-white materialbank">
    <div v-if="!tlData || tlData.length == 0" class="flex_center font16 mt20">暂无素材数据</div>
    <div v-else class="timelinelist" v-for="(item, index) in tlData" :key="index">
      <div class="tlitem">
        <div class="avatar"><img :src="item.uploaderavatar" /></div>
        <div class="con">
          <div class="txt no_bold">{{item.uploadername}}</div>
          <div>{{item.title}}</div>
          <div class="piclist">
            <div class="picitem more">
              <div class="inner" v-for="(items,index) in item.contentphoto">
                <img :src="items" />
              </div>
            </div>
            <div v-if="item.video" class="picitem more">
              <div class="inner">
                <video
                  ref="productVideo"
                  :src="item.video"
                  controls
                  autoplay="true"
                  webkit-playsinline=""
                  playsinline="true"
                  x-webkit-airplay="true"
                  raw-controls=""
                  x5-video-player-type="h5"
                  x5-video-player-fullscreen="true"
                  x5-video-orientation="portrait">
                </video>
                <!-- <div class="close-icon flex_center" @click="stopPlay('productVideo')">关闭</div> -->
              </div>
            </div>
          </div>
          <div class="datetxt flex_left">
            <div class="font12">{{item.dateline_str}}</div>
            <div class="ricon ml20" @click="delScai(item,index)">删除</div>
          </div>
        </div>
      </div>
    </div>
    <router-link class="bg-sucai" :to="{path: '/AddMaterial', query: {pid: this.id}}">
      <div class="addsucai">发布素材</div>
    </router-link>
  </div>
</template>
<script>
import ENV from 'env'
import Time from '#/time'

export default {
  data () {
    return {
      tlData: [],
      id: 0,
      photoarr: []
    }
  },
  methods: {
    clickPlay (refname) {
      const self = this
      this.playVideo = true
      setTimeout(function () {
        self.$refs[refname].play()
      }, 100)
    },
    stopPlay (refname) {
      this.playVideo = false
    },
    refresh () {
      this.tlData = []
    },
    getData () {
      this.refresh()
      this.$http.get(`${ENV.BokaApi}/api/list/productmaterial`, {
        params: {pid: this.id}
      }).then(res => {
        this.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        for (var i = 0; i < retdata.length; i++) {
          retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd')
        }
        this.tlData = retdata
        for (var i = 0; i < this.tlData.length; i++) {
          this.photoarr = this.tlData[i].contentphoto
        }
        console.log('素材数据')
        console.log(this.photoarr)
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
  }
}
</script>
<style lang="less">
.materialbank{
  .bg-sucai{
    width:100%;padding:10px 20px;box-sizing:border-box;background-color:#fff;
    border-top:1px solid #e5e5e5;position:fixed;bottom:0;
  }
  .addsucai{width:100%;height:30px;background-color:#ff6a61;color:#fff;text-align:center;border-radius:20px;line-height:30px;}
  .tlitem{border-bottom:1px solid #e5e5e5;}
  .videoarea{position:absolute;left:0;top:0;right:0;bottom:0;z-index:9999;background-color:#000;color:#fff;}
  .videoarea video{position: absolute;width: 100%;height: 100%;}
  .videoarea .close-icon{position:absolute;left:50%;top:7px;width:60px;height:30px;margin-left:-30px;background-color:#232323;color:#fff;border-radius:10px;}
  .picitem video{width:100px;height:100px;}
}
</style>
