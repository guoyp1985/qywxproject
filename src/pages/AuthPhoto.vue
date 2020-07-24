<template>
  <div class="containerarea font14 authentication">
    <div class="header">根据电子商务法律规定，请先进行实名认证</div>
    <div>
      <form enctype="multipart/form-data">
        <input ref="fileInput1" class="hide" type="file" name="files" @change="fileChange1" />
      </form>
      <form enctype="multipart/form-data">
        <input ref="fileInput2" class="hide" type="file" name="files" @change="fileChange2" />
      </form>
      <form enctype="multipart/form-data">
        <input ref="fileInput3" class="hide" type="file" name="files" @change="fileChange3" />
      </form>
      <div class="photo-item">
        <div class="flex_cell flex_center">
          <div class="phleft">
            <img src="../assets/images/card/photo1.png" />
            <div class="txt">(身份证正面)</div>
          </div>
        </div>
        <div class="flex_cell flex_center">
          <div class="linek flex_center" @click="uploadPhoto1">
            <div class="w_100 align_center" v-if="!photo1 || photo1 == ''">
              <span class="al al-zhaoxiangji"></span>
              <div class="font10 txtph">上传正面照片</div>
            </div>
            <div v-else class="w_100 flex_center">
              <img :src="photo1" />
            </div>
          </div>
        </div>
      </div>
      <div class="photo-item">
        <div class="flex_cell flex_center">
          <div class="phleft">
            <img src="../assets/images/card/photo2.png" />
            <div class="txt">(身份证反面)</div>
          </div>
        </div>
        <div class="flex_cell flex_center">
          <div class="linek flex_center" @click="uploadPhoto2">
            <div class="w_100 align_center" v-if="!photo2 || photo2 == ''">
              <span class="al al-zhaoxiangji"></span>
              <div class="font10 txtph">上传反面照片</div>
            </div>
            <div v-else class="w_100 flex_center">
              <img :src="photo2" />
            </div>
          </div>
        </div>
      </div>
      <!--
      <div class="photo-item">
        <div class="flex_cell flex_center">
          <div class="phleft">
            <img src="../assets/images/card/photo3.png" />
            <div class="txt">(手持正面)</div>
          </div>
        </div>
        <div class="flex_cell flex_center">
          <div class="linek flex_center" @click="uploadPhoto3">
            <div class="w_100 align_center" v-if="!photo3 || photo3 == ''">
              <span class="al al-zhaoxiangji"></span>
              <div class="font10 txtph">手持正面照片</div>
            </div>
            <div v-else class="w_100 flex_center">
              <img :src="photo3" />
            </div>
          </div>
        </div>
      </div>
    -->
      <div class="message mt5"><span>* </span>拍摄二代身份证原件，确保图片清晰，四角完整。</div>
    </div>
    <div class="btn flex_center mt20">
      <div class="btnbom btn-bottom-red" @click="submitEvent">立即认证</div>
    </div>
  </div>
</template>

<script>
import ENV from 'env'
import { User } from '#/storage'
const jweixin = require('../../static/jweixin')
let self = this
export default {
  data () {
    return {
      query: {},
      loginUser: {},
      photo1: '',
      photo2: '',
      photo3: '',
      submitIng: false
    }
  },
  methods: {
    initData () {
      this.photo1 = ''
      this.photo2 = ''
      this.photo3 = ''
      this.submitIng = false
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
    wxUpload (callback) {
      jweixin.ready(function () {
        self.$util.wxUploadImage({
          maxnum: 1,
          handleCallback: function (data) {
            if (data.flag === 1) {
              callback && callback(data)
            } else if (data.error) {
              self.$vux.toast.show({
                text: data.error,
                time: self.$util.delay(data.error)
              })
            }
          }
        })
      })
    },
    uploadPhoto1 () {
      const fileInput = self.$refs.fileInput1[0] ? self.$refs.fileInput1[0] : self.$refs.fileInput1
      if (self.$util.isPC()) {
        fileInput.click()
      } else {
        self.wxUpload(function (data) {
          self.photo1 = data.data
        })
      }
    },
    uploadPhoto2 () {
      const fileInput = self.$refs.fileInput2[0] ? self.$refs.fileInput2[0] : self.$refs.fileInput2
      if (self.$util.isPC()) {
        fileInput.click()
      } else {
        self.wxUpload(function (data) {
          self.photo2 = data.data
        })
      }
    },
    uploadPhoto3 () {
      const fileInput = self.$refs.fileInput3[0] ? self.$refs.fileInput3[0] : self.$refs.fileInput3
      if (self.$util.isPC()) {
        fileInput.click()
      } else {
        self.wxUpload(function (data) {
          self.photo3 = data.data
        })
      }
    },
    fileUpload (filedata, callback) {
      filedata.append('needcompress', 1)
      self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        if (data.flag === 1) {
          callback && callback(data)
        } else if (data.error) {
          self.$vux.toast.show({
            text: data.error,
            time: self.$util.delay(data.error)
          })
        }
      })
    },
    fileChange1 (e) {
      let files = e.target.files
      if (files.length > 0) {
        const fileForm = e.target.parentNode
        const filedata = new FormData(fileForm)
        self.fileUpload(filedata, function (data) {
          self.photo1 = data.data
        })
      }
    },
    fileChange2 (e) {
      let files = e.target.files
      if (files.length > 0) {
        const fileForm = e.target.parentNode
        const filedata = new FormData(fileForm)
        self.fileUpload(filedata, function (data) {
          self.photo2 = data.data
        })
      }
    },
    fileChange3 (e) {
      const self = this
      let files = e.target.files
      if (files.length > 0) {
        const fileForm = e.target.parentNode
        const filedata = new FormData(fileForm)
        self.$vux.loading.show()
        self.fileUpload(filedata, function (data) {
          self.photo3 = data.data
        })
      }
    },
    submitEvent () {
      const self = this
      if (!self.submitIng) {
        if (self.photo1 === '' || self.photo2 === '') {
          self.$vux.toast.show({
            text: '请按要求上传身份证照片',
            time: 1500
          })
          return false
        }
        self.submitIng = true
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/validateIDCard`, {
          cardphoto: self.photo1, cardphotof: self.photo2
        }).then(function (res) {
          self.$vux.loading.hide()
          self.submitIng = false
          let retdata = res.data
          self.$vux.toast.show({
            text: retdata.error,
            type: retdata.flag ? 'success' : 'warn',
            time: self.$util.delay(retdata.error)
          })
          if (retdata.flag) {
            self.loginUser = retdata.data
            User.set(retdata.data)
            if (self.query.fromPage) {
              self.$router.push({path: decodeURIComponent(self.query.fromPage)})
            }
          }
        })
      }
    }
  },
  activated () {
    self = this
    this.$util.miniPost()
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    this.loginUser = User.get()
    this.query = this.$route.query
    this.initData()
  }
}
</script>

<style lang="less">
.authentication{
  background-color:#F2F2F2;
  .header{width:100%;height:44px;text-align:center;line-height:44px;background: -webkit-linear-gradient(#ff6a61, #f63f3d);color:#fff;}
  .photo-item{
    width:100%;padding:20px 0;background-color:#fff;color:#666666;display:flex;margin-bottom:10px;box-sizing: border-box;
    border-bottom:1px solid #e5e5e5;
    img{width:100px;object-fit:cover;display:block;}
    .txt{margin-top:10px;text-align:center;}
    .linek{
      width:80px;border:1px dashed #e5e5e5;text-align:center;color:#a5a5a5;
    }
  }
  .message{text-align:right;font-size:10px;color:#a5a5a5;}
  .message span{font-size:16px;color:red;}
  .btn{width:100%;height:50px;}
  .btn .btnbom{width:85%;height:40px;text-align:center;}
}
</style>
