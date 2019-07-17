<template>
  <div id="article-info-edit" class="font14 containerarea notop">
    <template v-if="showSos">
      <sos :title="sosTitle"></sos>
    </template>
    <template v-if="showContainer">
      <div class="pagemiddle">
        <div v-if="classData.length" class="form-item required bg-white">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">文章类别</div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <select v-model="submitdata.classid" class="w_100" style="height:35px;">
                <option value='0'>请选择</option>
                <option v-for="(item,index) in classData" :value="item.id">{{ item.title }}</option>
              </select>
            </div>
          </div>
        </div>
        <group label-width="5em">
          <group class="textarea-outer">
            <x-textarea
              ref="titleTextarea"
              v-model="submitdata.title"
              :title="$t('News title')"
              class="x-textarea noborder"
              :placeholder="`${$t('Necessary')}${$t('Title')}`"
              :show-counter="false"
              :rows="1"
              :max="30"
              @on-change="textareaChange('titleTextarea')"
              @on-focus="textareaFocus('titleTextarea')"
              autosize>
            </x-textarea>
          </group>
          <cell :title="$t('Cover photo')" class="font14">
            {{$t('Necessary')}}<!--上传图像后可点击<i class="al al-set font14"></i>进行剪裁-->
          </cell>
        </group>
        <div class="img-operate-area">
          <input v-model="submitdata.photo" type="hidden" name="photo" />
          <form enctype="multipart/form-data">
            <input ref="fileInput" class="hide" type="file" name="files" @change="fileChange('fileInput')" />
          </form>
          <div class="q_photolist align_left">
            <template v-if="photoarr.length > 0">
              <div v-for="(item, index) in photoarr" :key="index" class="img-box">
                <img class="img" :src="item"/>
                <a class="setting-btn" @click="clipPhoto(item)">
                  <i class="al al-set font16"></i>
                </a>
                <a class="delete-btn" @click="deletePhoto(item, index)">
                  <i class="al al-guanbi font16"></i>
                </a>
              </div>
            </template>
            <div v-if="photoarr.length < maxnum" class="img-box upload-box" @click="uploadPhoto">
              <div class="img">
                <div class="img-info-box">
                  <i class="al al-zhaopian" style="color:#c6c5c5;line-height:30px;"></i>
                  <div class="font12 color-gray"><span class="havenum">{{ havenum }}</span><span class="ml5 mr5">/</span><span class="maxnum">{{ maxnum }}</span></div>
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
                <div v-else v-for="(item,index) in videoarr" :key="index" class="videoitem photoitem">
                  <div class="inner photo imgcover" :photo="item" style="border:#ccc 1px solid;">
                    <div class="flex_center" style="position:absolute;left:0;top:0;bottom:0;right:0;">
                      <i class="al al-ai-video"></i>
                      <div class="close" @click="deletePhoto(item,index,'video')">×</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <group label-width="5em">
          <group class="textarea-outer">
            <x-textarea
              ref="videoTextarea"
              v-model="submitdata.video"
              title="视频链接"
              class="x-textarea noborder"
              placeholder="视频链接"
              :show-counter="false"
              :rows="3"
              :max="200"
              @on-change="textareaChange('videoTextarea')"
              @on-focus="textareaFocus('videoTextarea')"
              autosize>
            </x-textarea>
          </group>
        </group> -->
        <group class="option-area" label-width="6em">
          <x-textarea
            ref="descTextarea"
            class="font14"
            :title="$t('Share description')"
            :placeholder="$t('Share description placeholder')"
            v-model="submitdata.seodescription"
            :rows="1"
            @on-change="textareaChange('descTextarea')"
            @on-focus="textareaFocus('descTextarea')"
            autosize>
          </x-textarea>
          <x-textarea
            ref="summaryTextarea"
            class="font14"
            :title="$t('Summary')"
            :placeholder="$t('Summary')"
            v-model="submitdata.summary"
            @on-change="textareaChange('summaryTextarea')"
            @on-focus="textareaFocus('summaryTextarea')"
            :rows="1"
            autosize>
          </x-textarea>
        </group>
      </div>
      <div class="pagebottom flex_center pl12 pr12 list-shadow02 bg-white">
        <div class="flex_cell flex_center btn-bottom-red" @click="save">下一步，编辑内容</div>
      </div>
      <clip-popup :show="popupShow" :img="cutImg" :after-submit="popupSubmit" @on-cancel="popupCancel"></clip-popup>
    </template>
  </div>
</template>
<script>
import { Group, XInput, XTextarea, Cell, XButton } from 'vux'
import ClipPopup from '@/components/ClipPopup'
import ENV from 'env'
import { User } from '#/storage'
import Sos from '@/components/Sos'

export default {
  components: {
    Group, XInput, XTextarea, Cell, XButton, ClipPopup, Sos
  },
  data () {
    return {
      showSos: false,
      sosTitle: '抱歉，您暂无权限访问此页面！',
      showContainer: false,
      query: {},
      loginUser: {},
      cutImg: '',
      popupShow: false,
      allowsubmit: true,
      photoarr: [],
      maxnum: 1,
      havenum: 0,
      submitdata: {classid: 0, title: '', photo: '', video: '', seodescription: '', summary: ''},
      requireddata: {title: '', 'photo': ''},
      submitIng: false,
      classData: [],
      Fid: 0,
      videoarr: []
    }
  },
  computed: {
  },
  methods: {
    initData () {
      this.cutImg = ''
      this.popupShow = false
      this.allowsubmit = true
      this.photoarr = []
      this.havenum = 0
      this.submitdata = {classid: 0, title: '', photo: '', seodescription: '', summary: ''}
      this.requireddata = {title: '', 'photo': ''}
    },
    textareaChange (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    textareaFocus (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    photoCallback (data, type) {
      const self = this
      if (data.flag === 1) {
        if (type === 'video') {
          if (data.data.lastIndexOf('.mp4') < 0) {
            let error = '请上传正确的视频文件'
            self.$vux.toast.show({
              text: error,
              time: self.$util.delay(error)
            })
          } else {
            self.videoarr.push(data.data)
            self.submitdata.video = self.videoarr.join(',')
          }
        } else {
          self.photoarr.push(data.data)
          self.submitdata.photo = self.photoarr.join(',')
        }
      } else if (data.error) {
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error)
        })
      }
    },
    uploadPhoto () {
      const self = this
      const fileInput = self.$refs.fileInput[0] ? self.$refs.fileInput[0] : self.$refs.fileInput
      if (self.$util.isPC()) {
        fileInput.click()
      } else {
        let curmax = 1
        self.$wechat.ready(function () {
          self.$util.wxUploadImage({
            maxnum: curmax,
            handleCallback: function (data) {
              self.photoCallback(data)
            }
          })
        })
      }
    },
    fileChange (refname, type, index) {
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
        self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(res => {
          self.$vux.loading.hide()
          let data = res.data
          self.photoCallback(data, type)
        })
      }
    },
    clipPhoto (item) {
      this.popupShow = true
      let index = item.indexOf('?')
      if (index > -1) {
        this.cutImg = item.substring(0, index)
      } else {
        this.cutImg = item
      }
    },
    deletePhoto (item, index, type) {
      if (type === 'video') {
        this.videoarr = []
        this.submitdata.video = ''
      } else {
        this.photoarr.splice(index, 1)
        this.submitdata.photo = this.photoarr.join(',')
      }
    },
    save () {
      const self = this
      if (!self.submitIng) {
        const query = self.$route.query
        // if (!self.submitdata.classid) {
        //   self.$vux.toast.text('请选择分类', 'middle')
        //   return false
        // }
        let validateData = []
        for (let key in self.requireddata) {
          let v = {}
          v[key] = self.submitdata[key]
          validateData.push(v)
        }
        let iscontinue = self.$util.validateQueue(validateData,
          model => {
            switch (model.key) {
              default:
                self.$vux.toast.text('必填项不能为空', 'middle')
            }
          }
        )
        if (!iscontinue) {
          return false
        }
        self.submitIng = true
        self.$vux.loading.show()
        if (query.id) {
          self.submitdata['id'] = query.id
        } else {
          delete self.submitdata['id']
        }
        self.submitdata.fid = self.query.fid
        self.$http.post(`${ENV.BokaApi}/api/add/factorynews`, self.submitdata).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          self.$vux.toast.show({
            text: data.error,
            type: (data.flag !== 1 ? 'warn' : 'success'),
            time: self.$util.delay(data.error),
            onHide: function () {
              self.submitIng = false
              if (data.flag === 1) {
                let params = { id: data.data }
                if (self.query.id) {
                  params.newadd = 1
                }
                if (self.query.callback === 'edit') {
                  params.control = 'edit'
                }
                self.$router.push({ path: '/factoryNews', query: params })
              }
            }
          })
        })
      }
    },
    popupSubmit (cutimg) {
      this.photoarr = [ cutimg ]
      this.submitdata.photo = this.$util.setPhoto(cutimg)
    },
    popupCancel () {
      this.popupShow = false
    },
    getData () {
      if (this.query.id) {
        const self = this
        document.title = '更多设置'
        this.$http.get(`${ENV.BokaApi}/api/moduleInfo`, {
          params: { id: this.query.id, module: 'factorynews' }
        }).then(function (res) {
          const data = res.data
          const retdata = data.data ? data.data : data
          if (retdata.video && retdata.video !== '') {
            self.videoarr = [retdata.video]
          }
          if (retdata) {
            for (let key in self.submitdata) {
              self.submitdata[key] = retdata[key]
            }
            if (self.submitdata.photo && self.$util.trim(self.submitdata.photo) !== '') {
              const parr = self.submitdata.photo.split(',')
              for (let i = 0; i < parr.length; i++) {
                self.photoarr.push(self.$util.getPhoto(parr[i]))
              }
            }
          }
        })
      } else if (this.photoarr.length > 0) {
        this.submitdata.photo = this.$util.setPhoto(this.photoarr[0])
      }
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
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
        if (!(self.loginUser.fid && parseInt(self.loginUser.fid) === parseInt(self.$route.query.fid)) && !isAdmin) {
          this.$vux.loading.hide()
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          this.$vux.loading.hide()
          this.Fid = this.$route.query.fid ? this.$route.query.fid : this.loginUser.fid
          if (!this.classData.length) {
            this.$http.get(`${ENV.BokaApi}/api/list/factorynewsclass`, {
              params: {pagestart: 0, limit: 500, ascdesc: 'asc', fid: this.Fid}
            }).then(res => {
              const data = res.data
              const retdata = data.data ? data.data : data
              this.classData = retdata
            })
          }
          if (this.query.id === undefined || this.query.id !== this.$route.query.id || this.query.fid !== this.$route.query.fid) {
            this.initData()
            this.query = this.$route.query
            this.getData()
          }
        }
      }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
<style lang="less">
.img-operate-area {
  padding: 20px;
  display: flex;
}
.img-box {
  position: relative;
  display: flex;
  float: left;
  margin-right: 10px;
  text-align: center;
}
.img-box.upload-box {
  border: #ccc 1px dashed;
}
.img-box .img {
  width: 90px;
  height: 90px;
}
.img-box input[type=file] {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  width: 100%;
}
.setting-btn,
.delete-btn {
  position: absolute;
  top: -10px;
  background-color: #ffffff;
  border: 1px solid #c0c0c0;
  padding: 4px;
  border-radius: 50%;
  display: block;
  line-height: 16px;
}
.setting-btn {
  left: -10px;
}
.delete-btn {
  right: -10px;
}
.img-info-box {
  margin: 20px;
}
.option-area .weui-cells {
  margin-top: 0;
}
.submit-area {
  position: absolute;
  bottom: 0px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
}
.x-textarea .weui-label{font-size:14px;}
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
</style>
