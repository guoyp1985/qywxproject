<template>
  <div id="article-info-edit" class="font14">
    <group label-width="5em">
      <group class="textarea-outer">
        <x-textarea v-model="submitdata.title" :title="$t('News title')" class="x-textarea noborder" :placeholder="`${$t('Necessary')}${$t('Title')}`" :show-counter="false" :rows="1" :max=30 autosize></x-textarea>
      </group>
      <cell :title="$t('Cover photo')" class="font14">
        {{$t('Necessary')}}<!--上传图像后可点击<i class="al al-set font14"></i>进行剪裁-->
      </cell>
    </group>
    <div class="img-operate-area">
      <input v-model="submitdata.photo" type="hidden" name="photo" />
      <form enctype="multipart/form-data">
        <input ref="fileInput" class="hide" type="file" name="files" @change="fileChange" />
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
    <group class="option-area" label-width="6em">
      <x-textarea class="font14" :title="$t('Share description')" :placeholder="$t('Share description placeholder')" v-model="submitdata.seodescription" :rows="1" autosize></x-textarea>
      <x-textarea class="font14" :title="$t('Summary')" :placeholder="$t('Summary')" v-model="submitdata.summary" :rows="1" autosize></x-textarea>
    </group>
    <div class="submit-area">
      <x-button type="primary" @click.native="save">{{$t('Save')}}</x-button>
      <x-button @click.native="cancel">{{$t('Cancel')}}</x-button>
    </div>
    <clip-popup :show="popupShow" :img="cutImg" :after-submit="popupSubmit" @on-cancel="popupCancel"></clip-popup>
  </div>
</template>
<script>
import { Group, XInput, XTextarea, Cell, XButton } from 'vux'
import ClipPopup from '@/components/ClipPopup'
import ENV from 'env'
export default {
  components: {
    Group, XInput, XTextarea, Cell, XButton, ClipPopup
  },
  data () {
    return {
      doCreated: false,
      query: Object,
      cutImg: '',
      popupShow: false,
      allowsubmit: true,
      photoarr: [],
      maxnum: 1,
      havenum: 0,
      submitdata: { title: '', photo: '', seodescription: '', summary: '' },
      requireddata: { title: '', 'photo': '' }
    }
  },
  computed: {
  },
  methods: {
    photoCallback (data) {
      const self = this
      if (data.flag === 1) {
        self.photoarr.push(data.data)
        self.submitdata.photo = self.photoarr.join(',')
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
        self.$wechat.ready(function () {
          self.$util.wxUploadImage({
            maxnum: 9,
            handleCallback: function (data) {
              self.photoCallback(data)
            }
          })
        })
      }
    },
    fileChange (e) {
      const self = this
      let files = e.target.files
      if (files.length > 0) {
        const fileForm = e.target.parentNode
        const filedata = new FormData(fileForm)
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          self.photoCallback(data)
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
    deletePhoto (item, index) {
      this.photoarr.splice(index, 1)
      this.submitdata.photo = this.photoarr.join(',')
    },
    cancel () {
      this.$router.go(-1)
    },
    save () {
      const self = this
      const query = self.$route.query
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
      self.$vux.loading.show()
      if (query.id) {
        self.submitdata['id'] = query.id
      } else {
        delete self.submitdata['id']
      }
      self.$http.post(`${ENV.BokaApi}/api/add/news`, self.submitdata).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              let params = { id: data.data }
              if (self.query.id) {
                params.newadd = 1
              }
              self.$router.push({ path: '/news', query: params })
            }
          }
        })
      })
    },
    popupSubmit (cutimg) {
      this.photoarr = [ cutimg ]
      this.submitdata.photo = this.$util.setPhoto(cutimg)
    },
    popupCancel () {
      this.popupShow = false
    },
    initInfo () {
      const self = this
      if (self.query.id) {
        document.title = '更多设置'
        self.$http.get(`${ENV.BokaApi}/api/moduleInfo`, {
          params: { id: self.query.id, module: 'news' }
        }).then(function (res) {
          let data = res.data
          let retdata = data.data ? data.data : data
          if (retdata) {
            for (let key in self.submitdata) {
              self.submitdata[key] = retdata[key]
            }
            if (self.submitdata.photo && self.$util.trim(self.submitdata.photo) !== '') {
              let parr = self.submitdata.photo.split(',')
              for (let i = 0; i < parr.length; i++) {
                self.photoarr.push(self.$util.getPhoto(parr[i]))
              }
            }
          }
        })
      }
    }
  },
  created () {
    const self = this
    self.doCreated = true
    self.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    self.query = self.$route.query
    if (self.query.id) {
      self.initInfo()
    } else {
      if (self.photoarr.length > 0) {
        self.submitdata.photo = self.$util.setPhoto(self.photoarr[0])
      }
    }
  },
  activated () {
    const self = this
    if (!self.doCreated) {
      self.initInfo()
    }
    self.doCreated = false
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
</style>
