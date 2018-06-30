<template>
  <div class="font14 containerarea notop addtimeline">
    <subscribe v-if="loginUser.subscribe != 1"></subscribe>
    <apply-tip v-if="showApply"></apply-tip>
    <template v-if="showContainer">
      <div class="pagemiddle">
        <group>
          <x-textarea
            ref="textarea"
            v-model="submitdata.title"
            @on-change="valueChange"
            class="font14 pop-textarea"
            :max="200"
            :placeholder="$t('Say something')">
          </x-textarea>
        </group>
        <emotion-box bind-textarea=".pop-textarea"></emotion-box>
        <div class="img-operate-area">
          <input v-model="submitdata.photo" type="hidden" name="photo" />
          <form enctype="multipart/form-data">
            <input ref="fileInput" class="hide" type="file" name="files" @change="fileChange" />
          </form>
          <div class="q_photolist align_left">
            <template v-if="photoarr.length > 0">
              <div v-for="(item, index) in photoarr" :key="index" class="img-box">
                <img class="img imgcover" :src="item"/>
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
                  <div class="font12 color-gray"><span class="havenum">{{ photoarr.length }}</span><span class="ml5 mr5">/</span><span class="maxnum">{{ maxnum }}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-item border-box padding10" v-if="tagsData.length > 0">
          <div class="pb10">选择标签</div>
          <checker
          class="x-checker"
          type="checkbox"
          v-model="submitdata.tagids"
          default-item-class="ck-item"
          selected-item-class="ck-item-selected">
            <checker-item class="border1px color-gray" v-for="(item, index) in tagsData" :key="index" :value="item.id">{{ item.title }}</checker-item>
          </checker>
        </div>
      </div>
      <div class="pagebottom flex_center pl12 pr12 list-shadow02 bg-white">
        <div class="flex_cell flex_center btn-bottom-red" @click="save">{{ $t('Release') }}</div>
      </div>
      <clip-popup :show="popupShow" :img="cutImg" :after-submit="popupSubmit" @on-cancel="popupCancel"></clip-popup>
    </template>
  </div>
</template>
<script>
import { Group, XInput, XTextarea, Cell, XButton, Checker, CheckerItem } from 'vux'
import ClipPopup from '@/components/ClipPopup'
import ENV from 'env'
import { User } from '#/storage'
import Sos from '@/components/Sos'
import Subscribe from '@/components/Subscribe'
import EmotionBox from '@/components/EmotionBox'

export default {
  components: {
    Group, XInput, XTextarea, Cell, XButton, ClipPopup, Sos, Subscribe, EmotionBox, Checker, CheckerItem
  },
  data () {
    return {
      showApply: false,
      showContainer: false,
      query: {},
      loginUser: {},
      cutImg: '',
      popupShow: false,
      allowsubmit: true,
      photoarr: [],
      maxnum: 9,
      havenum: 0,
      submitdata: { title: '', photo: '', tagids: [] },
      requireddata: { title: '', 'photo': '' },
      textarea: null,
      tagsData: []
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
      this.submitdata = { title: '', photo: '', tagids: [] }
      this.requireddata = { title: '', 'photo': '' }
    },
    valueChange (val) {
      this.submitdata.title = val
    },
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
              alert(JSON.stringify(data))
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
    save () {
      const self = this
      if (self.$util.trim(self.submitdata.title) === '' && self.$util.trim(self.submitdata.photo) === '') {
        self.$vux.toast.text('请添加内容或图片信息', 'middle')
        return false
      }
      self.$vux.loading.show()
      self.submitdata.tagids = self.submitdata.tagids.join(',')
      self.$http.post(`${ENV.BokaApi}/api/timeline/add `, self.submitdata).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              self.$router.push({ path: '/centerSeller' })
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
    getData () {
      const self = this
      self.$http.get(`${ENV.BokaApi}/api/retailer/info`).then(function (res) {
        if (res.status === 200) {
          let data = res.data
          self.userInfo = data.data ? data.data : data
          self.tagsData = self.userInfo.tags
        }
      })
    },
    initContainer () {
      const self = this
      self.showApply = false
      self.showContainer = false
    },
    refresh () {
      const self = this
      self.$vux.loading.show()
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      if (this.loginUser && this.loginUser.subscribe === 1) {
        if (self.loginUser.isretailer === 2) {
          self.initContainer()
          self.$vux.loading.hide()
          let backUrl = encodeURIComponent(location.href)
          location.replace(`${ENV.Host}/#/pay?id=${self.loginUser.payorderid}&module=payorders&lasturl=${backUrl}`)
        } else {
          self.initContainer()
          let isAdmin = false
          for (let i = 0; i < self.loginUser.usergroup.length; i++) {
            if (self.loginUser.usergroup[i] === 1) {
              isAdmin = true
              break
            }
          }
          if (!self.loginUser.isretailer && !isAdmin) {
            self.$vux.loading.hide()
            self.initContainer()
            self.showApply = true
          } else {
            self.initContainer()
            self.showContainer = true
            self.$vux.loading.hide()
            self.getData()
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


.addtimeline .x-checker .ck-item{
  font-size:13px;
  display: inline-block;
  padding: 0 15px;
  height: 30px;
  line-height: 30px;
  border:0px;
  text-align: center;
  border-radius: 3px;
  background-color: #fff;
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  box-sizing: border-box;
}
.x-checker .border1px.ck-item-selected:after{border:1px solid #ea3a3a;}
</style>
