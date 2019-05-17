<template>
  <div class="containerarea font14 bg-white addmaterial">
    <div class="">
      <form ref="fileForm1" enctype="multipart/form-data">
        <input ref="fileInput1" class="hide" type="file" multiple="multiple" name="files" @change="fileMulChange('fileForm1', 'contentphoto')" />
      </form>
      <div class="pl12 pr12 pt10 bg-white" style="border-bottom:1px solid #e5e5e5;">文字素材</div>
      <group class="textarea-outer textarea-text bg-white">
        <x-textarea
          ref="textarea"
          v-model="submitdata.title"
          @on-change="valueChange"
          class="font14 pop-textarea"
          :rows="10"
          :cols="30"
          :max="200"
          placeholder="请输入宣传内容">
        </x-textarea>
      </group>
      <div class="pl12 pr12 pt10 b_top_after bg-white">详情图像<span class="color-gray">（图像宽高不受限制）</span></div>
      <div class="b_bottom_after bg-white pl12 pr12 pb5">
        <input v-model="submitdata.contentphoto" type="hidden" name="contentphoto" />
        <div class="q_photolist align_left bg-white">
          <template v-if="photoarr1.length > 0">
            <div v-for="(item,index) in photoarr1" :key="index" class="photoitem">
              <div class="inner photo imgcover" :photo="item" :style="`background-image: url('${item}');`">
                <div class="close" @click="deletephoto(item,index,'contentphoto')">×</div>
              </div>
            </div>
          </template>
          <div v-if="photoarr1.length < maxnum1" class="photoitem add" @click="uploadPhoto('fileInput1','contentphoto')">
            <div class="inner">
              <div class="innerlist">
                <div class="flex_center h_100">
                  <div class="txt">
                    <i class="al al-zhaopian" style="color:#bbb;line-height:30px;"></i>
                    <div><span class="havenum">{{ photoarr1.length }}</span><span class="ml5 mr5">/</span><span class="maxnum">{{ maxnum1 }}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-item bg-white">
        <div class="t-table">
          <div class="t-cell title-cell w80 font14 v_middle">视频</div>
          <div class="t-cell input-cell v_middle" style="position:relative;">
            <div class="q_photolist align_left" style="overflow:hidden;">
              <form ref="videoForm" class="db" enctype="multipart/form-data" v-if="videoarr.length == 0">
                <div class="button_video flex_center">
                  <i class="al al-ai-video color-white"></i>
                  <input ref="videoInput" type="file" name="files" @change="fileChange('videoForm', 'video')" />
                </div>
              </form>
              <div v-for="(item,index) in videoarr" :key="index" class="videoitem photoitem">
                <div class="inner photo imgcover" :photo="item" style="border:#ccc 1px solid;">
                  <div class="flex_center" style="position:absolute;left:0;top:0;bottom:0;right:0;">
                    <i class="al al-ai-video"></i>
                    <div class="close" @click="deletephoto(item,index,'video')">×</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sc-bottom">
      <button  @click="saveupevent" class="btnadd" :disabled="flags">立即发布</button>
    </div>
  </div>
</template>
<script>
import { TransferDom, Group, XInput, XTextarea, Previewer } from 'vux'
import ENV from 'env'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group, XInput, XTextarea, Previewer
  },
  data () {
    return {
      photoarr1: [],
      maxnum1: 9,
      videoarr: [],
      video: '',
      submitdata: { title: '', contentphoto: '', video: '' },
      id: 0,
      modules: 'factoryproduct',
      flags: false
    }
  },
  methods: {
    refresh () {
      this.photoarr1 = []
      this.videoarr = []
      this.submitdata.title = ''
    },
    // textareaChange (refname) {
    //   let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
    //   curArea.updateAutosize()
    //   setTimeout(function () {
    //     curArea.updateAutosize()
    //   }, 50)
    // },
    // textareaFocus (refname) {
    //   let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
    //   curArea.updateAutosize()
    // },
    valueChange (val) {
      this.submitdata.title = val
    },
    saveupevent () {
      const self = this
      let postdata = self.submitdata
      let newString = postdata.title
      newString = newString.replace(/\n/g, '_@').replace(/\r/g, '_#')
      newString = newString.replace(/_@/g, '<br/>')
      postdata.title = newString
      postdata.modules = self.modules
      postdata.pid = self.id
      console.log('提交')
      console.log(self.submitdata)
      if (postdata.contentphoto === '' && postdata.video === '' && postdata.title === '') {
        self.$vux.toast.text('文字图片与视频至少填写一项')
        return false
      }
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/add/productmaterial`, postdata).then(res => {
        const data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: '发布成功',
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.$router.push({ path: `/MaterialBank`, query: {pid: self.id} })
            }
          }
        })
      })
    },
    uploadPhoto (refname, type) {
      const self = this
      const fileInput = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      if (self.$util.isPC() || type === 'video') {
        fileInput.click()
      } else {
        self.$wechat.ready(function () {
          let curMaxnum = self.maxnum
          if (type === 'video') {
            curMaxnum = 1
          }
          if (type === 'contentphoto') {
            curMaxnum = self.maxnum1 - self.photoarr1.length
          }
          if (curMaxnum > 9) {
            curMaxnum = 9
          }
          self.$util.wxUploadImage({
            maxnum: curMaxnum,
            handleCallback: function (data) {
              self.photoCallback(data, type)
            }
          })
        })
      }
    },
    photoCallback (data, type) {
      const self = this
      if (data.flag === 1) {
        if (type === 'contentphoto' && self.photoarr1.length < self.maxnum1) {
          self.photoarr1.push(data.data)
          self.submitdata.contentphoto = self.photoarr1.join(',')
        } else if (type === 'video') {
          self.videoarr.push(data.data)
          self.submitdata.video = self.videoarr.join(',')
        }
      } else if (data.error) {
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error)
        })
      }
    },
    fileChange (refname, type) {
      const self = this
      const target = event.target
      const files = target.files
      if (files.length > 0) {
        let fileForm = target.parentNode
        if (type === 'video') {
          fileForm = target.parentNode.parentNode
        }
        const filedata = new FormData(fileForm)
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(function (res) {
          self.$vux.loading.hide()
          let data = res.data
          self.photoCallback(data, type)
        })
      }
    },
    fileMulChange (refname, type, index) {
      const self = this
      const target = event.target
      const files = target.files
      if (files.length > 0) {
        let filedata = new FormData()
        for (let i = 0; i < files.length; i++) {
          filedata.append(`files[${i}]`, files[i])
        }
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/uploadFiles`, filedata).then(function (res) {
          self.$vux.loading.hide()
          let data = res.data
          if (data.flag === 1) {
            let retdata = data.data
            if (type === 'contentphoto' && self.photoarr1.length < self.maxnum1) {
              let allowNum = self.maxnum1 - self.photoarr1.length
              let addNum = retdata.length > allowNum ? allowNum : retdata.length
              let addData = retdata.slice(0, addNum)
              self.photoarr1 = self.photoarr1.concat(addData)
              self.submitdata.contentphoto = self.photoarr1.join(',')
            }
          } else if (data.error) {
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error)
            })
          }
        })
      }
    },
    deletephoto (item, index, type) {
      const self = this
      if (type === 'video') {
        self.videoarr.splice(index, 1)
        self.submitdata.video = self.videoarr.join(',')
      } else if (type === 'photo') {
        self.photoarr.splice(index, 1)
        self.submitdata.photo = self.photoarr.join(',')
      } else {
        self.photoarr1.splice(index, 1)
        self.submitdata.contentphoto = self.photoarr1.join(',')
      }
    }
  },
  activated () {
    this.id = this.$route.query.pid
    this.refresh()
    console.log('PID:')
    console.log(this.id)
  }
}
</script>
<style lang="less">
.addmaterial {
  .textarea-outer.textarea-text .x-textarea{height:150px;}
  .weui-cell__bd textarea{height:150px !important;}
  .sc-bottom{
    width:100%;padding:10px 20px;box-sizing:border-box;background-color:#fff;
    border-top:1px solid #e5e5e5;position:fixed;bottom:0;
  }
  .btnadd{
    width:100%;height:30px;background-color:#ff6a61;color:#fff;text-align:center;
    border-radius:20px;line-height:30px;border:0;outline:none;
  }
  .button_video{
    position:relative;
    width:60px;
    height:60px;
    background-color:#ea3a3a;
    border-radius:50%;
    overflow:hidden;
  }
  .button_video input{
    position:absolute;
    left:0;top:0;right:0;bottom:0;
    opacity:0;
  }
  .pointer{pointer-events:none !important;}
}
</style>
