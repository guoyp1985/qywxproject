<template>
  <div class="containerarea notop font14 bg-page poster">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="pagemiddle">
        <div class="picarea bg-white">
          <div class="inner">
            <img src="https://tossharingsales.boka.cn/images/poster.png">
          </div>
        </div>
        <div v-if="coverphotoarr && coverphotoarr.length > 0" class="mt10 bg-white padding10 mt5 bg-white">
          <div class="pr10 pl10">{{ $t('Choice cover photo') }}</div>
          <template>
            <div class="coverlist">
              <div class="flex_row flex_left">
                <div v-for="(item,index) in coverphotoarr" :key="index" class="flex_table w_33 padding5 border-box" @click="selectcover(item,index)">
                  <div class="item pic-photo border01">
                    <div class="ico" v-if="item.checked"><i class="al al-duihao"></i></div>
                    <div class="pic-layer">
                      <img :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="mt10 bg-white">
          <form enctype="multipart/form-data">
            <input ref="fileInput" class="hide" type="file" name="files" @change="fileChange" />
          </form>
          <form>
            <div class="form-item required">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Upload images') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
                <div class="t-cell">
                  <input v-model="submitdata.photo" type="hidden" name="photo" />
                  <div class="q_photolist align_left">
                    <template v-if="photoarr.length > 0">
                      <div v-for="(item,index) in photoarr" :key="index" class="photoitem">
                        <div class="inner photo imgcover" :photo="item" :style="`background-image: url('${item}');`">
                          <div class="close" @click="deletephoto(item,index)">×</div>
                          <div class="clip" @click="clipPhoto(item)"><i class="al al-set"></i></div>
                        </div>
                      </div>
                    </template>
                    <div v-if="photoarr.length < maxnum" class="photoitem add" style="width:34%;" @click="uploadPhoto">
                      <div class="inner">
                        <div class="innerlist">
                          <div class="flex_center h_100">
                            <div class="txt">
                              <i class="al al-zhaopian" style="color:#c6c5c5;line-height:30px;"></i>
                              <div><span class="havenum">{{ havenum }}</span><span class="ml5 mr5">/</span><span class="maxnum">{{ maxnum }}</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-item required">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Main title') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <group class="textarea-outer">
                    <x-textarea
                      ref="titleTextarea"
                      v-model="submitdata.title"
                      name="title"
                      class="x-textarea noborder"
                      :placeholder="$t('Input main title')"
                      :show-counter="false"
                      :rows="1"
                      :max="30"
                      @on-change="textareaChange('titleTextarea')"
                      @on-focus="textareaFocus('titleTextarea')"
                      autosize>
                    </x-textarea>
                  </group>
                </div>
              </div>
            </div>
            <div class="form-item">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Subtitle') }}</div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <group class="textarea-outer">
                    <x-textarea
                      ref="subtitleTextarea"
                      v-model="submitdata.subtitle"
                      name="subtitle"
                      class="x-textarea noborder"
                      :placeholder="$t('Input subtitle')"
                      :show-counter="false"
                      :rows="1"
                      :max="30"
                      @on-change="textareaChange('subtitleTextarea')"
                      @on-focus="textareaFocus('subtitleTextarea')"
                      autosize>
                    </x-textarea>
                  </group>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div v-if="iscreating" class="pagebottom color-white bg-green font16 flex_center btncreate disabled"></div>
      <div v-else class="pagebottom color-white bg-green font16 flex_center btncreate" @click="saveevent"></div>
      <clip-popup :show="popupShow" :img="cutImg" :after-submit="popupSubmit" @on-cancel="popupCancel"></clip-popup>
    </template>
  </div>
</template>

<i18n>
Generating poster:
  zh-CN: 生成海报
Choice cover photo:
  zh-CN: 选择已有封面图
Main title:
  zh-CN: 主标题
Input main title:
  zh-CN: 请输入主标题 30字以内
Subtitle:
  zh-CN: 副标题
Input subtitle:
  zh-CN: 请输入副标题 30字以内
Upload images:
  zh-CN: 上传图像
</i18n>

<script>
import { Group, XTextarea, XImg } from 'vux'
import ClipPopup from '@/components/ClipPopup'
import Sos from '@/components/Sos'
import ENV from 'env'
const jweixin = require('../../static/jweixin')

export default {
  components: {
    Group, XTextarea, XImg, ClipPopup, Sos
  },
  data () {
    return {
      showSos: false,
      sosTitle: '',
      showContainer: false,
      query: {},
      data: {},
      coverphotoarr: [],
      photoarr: [],
      maxnum: 1,
      havenum: 0,
      submitdata: { title: '', photo: '', subtitle: '' },
      requireddata: { title: '', 'photo': '' },
      iscreating: false,
      cutImg: '',
      popupShow: false
    }
  },
  watch: {
    submitdata: function () {
      return this.submitdata
    },
    havenum: function (val) {
      this.havenum = this.photoarr.length
      return this.havenum
    }
  },
  computed: {
  },
  methods: {
    initData () {
      this.showSos = false
      this.sosTitle = ''
      this.showContainer = false
      this.coverphotoarr = []
      this.photoarr = []
      this.submitdata = { title: '', photo: '', subtitle: '' }
      this.iscreating = false
      this.cutImg = ''
      this.popupShow = false
    },
    textareaChange (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    textareaFocus (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
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
        jweixin.ready(function () {
          self.$util.wxUploadImage({
            maxnum: 1,
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
    deletephoto (item, index) {
      const self = this
      this.photoarr.splice(index, 1)
      this.submitdata.photo = this.photoarr.join(',')
      for (let i = 0; i < self.coverphotoarr.length; i++) {
        let cur = self.coverphotoarr[i]
        if (cur.checked) {
          cur.checked = false
          break
        }
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
    popupSubmit (cutimg) {
      this.photoarr = [ cutimg ]
      this.submitdata.photo = this.$util.setPhoto(cutimg)
    },
    popupCancel () {
      this.popupShow = false
    },
    selectcover (item, index) {
      const self = this
      if (item.checked) {
        self.photoarr = []
        item.checked = false
      } else {
        self.photoarr = [ item.photo ]
        item.checked = true
        for (let i = 0; i < self.coverphotoarr.length; i++) {
          let cur = self.coverphotoarr[i]
          if (i !== index && cur.checked) {
            cur.checked = false
            break
          }
        }
      }
      self.submitdata.photo = self.photoarr.join(',')
    },
    saveevent () {
      const self = this
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
      self.iscreating = true
      self.$http.post(`${ENV.BokaApi}/api/retailer/createPoster`, self.submitdata).then(function (res) {
        if (res) {
          let data = res.data
          self.$vux.loading.hide()
          self.iscreating = false
          let toasttype = data.flag !== 1 ? 'warn' : 'success'
          self.$vux.toast.show({
            text: data.error,
            type: toasttype,
            time: self.$util.delay(data.error),
            onHide: function () {
              if (data.flag === 1) {
                self.$router.push('/posterDetail')
              }
            }
          })
        } else {
          self.$vux.loading.hide()
          self.iscreating = false
          self.$vux.toast.show({
            text: '请求超时, 请重试',
            type: 'warn'
          })
        }
      })
    },
    getData () {
      const self = this
      self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'poster', id: self.query.id
      }).then(function () {
        let params = { params: { id: self.query.id, module: self.query.module } }
        return self.$http.get(`${ENV.BokaApi}/api/moduleInfo`, params)
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.data = data.data ? data.data : data
        if (data.flag !== 1) {
          self.sosTitle = data.error
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          self.submitdata.title = self.data.title
          self.coverphotoarr = []
          if (self.data.photo && self.$util.trim(self.data.photo) !== '') {
            let arr = self.data.photo.split(',')
            for (let i = 0; i < arr.length; i++) {
              self.coverphotoarr.push({ photo: arr[i], checked: false })
            }
          }
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      // if (this.query.module !== this.$route.query.module || this.query.id !== this.$route.query.id) {
      this.initData()
      this.query = this.$route.query
      this.submitdata.type = this.query.module
      this.submitdata.id = this.query.id
      this.$vux.loading.show()
      this.getData()
      // }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.poster .picarea{padding-top:15px;padding-bottom:15px;background-color:#fff;text-align:center}
.poster .picarea .inner{margin:0 auto;width:60%;border:1px solid #f2f2f2;box-shadow:3px 3px 10px #dfdfdf}
.poster .picarea img{max-width:100%}
.poster .coverlist .item{width:100%;}
.poster .coverlist .item .ico{position:absolute;top:0;right:0;bottom:0;left:0;background-color:rgba(0,0,0,.5);z-index:1;}
.poster .coverlist .item .ico i{position:absolute;top:50%;left:50%;margin-top:-15px;margin-left:-15px;width:30px;height:30px;color:#fff;}
.poster .btncreate:after{content:"生成海报"}
.poster .btncreate.disabled:after{content:"正在生成海报 请稍等..."}
.form-item{position:relative;padding:10px;}
.form-item:after{
  content:"";display:block;
	background-color:@list-border-color;height:1px;overflow:hidden;
	position: absolute;left: 0;right: 0;bottom:1px;
	-webkit-transform: scaleY(0.5) translateY(0.5px);
	transform: scaleY(0.5) translateY(0.5px);
	-webkit-transform-origin: 0% 0%;
	transform-origin: 0% 0%;
}
.flex_row{display:flex;flex-flow:row wrap;}
.pic-photo{position:relative;width:100%;padding-bottom:100%;}
.pic-layer{position:absolute;width:100%;height:100%;}
.pic-layer img{width:100%;height:100%;object-fit: cover;object-position: 50% 0;}
.w_20{width:20%;}
.w_25{width:25%;}
.w_33{width:33%;}
.w_50{width:50%;}
.border01{position:relative;}
.border01:after{content:" ";width:200%;height:200%;position:absolute;top:0;left:0;border:2px solid #e3e3e3;transform:scale(0.5);-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0;box-sizing: border-box;}
</style>
