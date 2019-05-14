<template>
  <div id="article-info-edit" class="font14 containerarea notop">
    <subscribe v-if="loginUser.subscribe != 1 && !loginUser.isretailer"></subscribe>
    <apply-tip v-if="showApply"></apply-tip>
    <template v-if="showContainer">
      <div class="">
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
                  <div class="font12 color-gray"><span class="havenum">{{ havenum }}</span><span class="ml5 mr5">/</span><span class="maxnum">{{ maxnum }}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
            :rows="1"
            @on-change="textareaChange('summaryTextarea')"
            @on-focus="textareaFocus('summaryTextarea')"
            autosize>
          </x-textarea>
        </group>
      </div>
      <div class="mt20 flex_center pl12 pr12">
        <div class="flex_cell flex_center btn-bottom-red" @click="save">下一步，编辑内容</div>
      </div>
      <clip-popup :show="popupShow" :img="cutImg" :after-submit="popupSubmit" @on-cancel="popupCancel"></clip-popup>
      <template v-if="showFirst">
        <firstTip @submitFirstTip="submitFirstTip">
          <div class="font15 bold txt">
            <div class="flex_center">{{sysParams.advance_addnews}}</div>
          </div>
        </firstTip>
      </template>
      <template v-if="showHb">
        <firstHb action="addnews" @closeFirstHb="closeFirstHb"></firstHb>
      </template>
    </template>
  </div>
</template>
<script>
import { Group, XInput, XTextarea, Cell, XButton } from 'vux'
import ClipPopup from '@/components/ClipPopup'
import ENV from 'env'
import { User, SystemParams } from '#/storage'
import Sos from '@/components/Sos'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'
import FirstTip from '@/components/FirstTip'
import FirstHb from '@/components/FirstHb'

export default {
  components: {
    Group, XInput, XTextarea, Cell, XButton, ClipPopup, Sos, Subscribe, ApplyTip, FirstTip, FirstHb
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
      maxnum: 1,
      havenum: 0,
      submitdata: { title: '', photo: '', seodescription: '', summary: '' },
      requireddata: { title: '', 'photo': '' },
      submitIng: false,
      isFirst: false,
      showFirst: false,
      showHb: false,
      newData: {},
      sysParams: {}
    }
  },
  computed: {
  },
  methods: {
    initFirstData () {
      this.isFirst = false
      this.showFirst = false
      this.showHb = false
      this.newData = {}
    },
    initData () {
      this.cutImg = ''
      this.popupShow = false
      this.allowsubmit = true
      this.photoarr = []
      this.havenum = 0
      this.submitdata = { title: '', photo: '', seodescription: '', summary: '' }
      this.requireddata = { title: '', 'photo': '' }
    },
    submitFirstTip () {
      this.showFirst = false
    },
    closeFirstHb () {
      this.isFirst = false
      this.showHb = false
      this.afterSave()
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
        self.$wechat.ready(function () {
          self.$util.wxUploadImage({
            maxnum: self.maxnum,
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
    saveData () {
      const self = this
      if (!self.submitIng) {
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
        self.submitIng = true
        self.$vux.loading.show()
        if (query.id) {
          self.submitdata['id'] = query.id
        } else {
          delete self.submitdata['id']
        }
        self.$http.post(`${ENV.BokaApi}/api/add/news`, self.submitdata).then((res) => {
          let data = res.data
          self.$vux.loading.hide()
          self.$vux.toast.show({
            text: data.error,
            type: (data.flag !== 1 ? 'warn' : 'success'),
            time: self.$util.delay(data.error),
            onHide: () => {
              self.submitIng = false
              if (data.flag === 1) {
                this.newData = data
                if (this.isFirst) {
                  this.showHb = true
                } else {
                  this.afterSave()
                }
              }
            }
          })
        })
      }
    },
    afterSave () {
      const self = this
      const data = this.newData
      if (self.query.callback === 'edit') {
        let params = this.$util.handleAppParams(this.query, {id: data.data})
        self.$router.push({ path: '/news', query: params })
      } else {
        if (self.query.minibackurl) {
          let minibackurl = decodeURIComponent(self.query.minibackurl)
          if (self.query.backtype === 'relaunch') {
            self.$wechat.miniProgram.reLaunch({url: `${minibackurl}`})
          } else if (self.query.backtype === 'redirect') {
            self.$wechat.miniProgram.redirectTo({url: `${minibackurl}`})
          } else {
            self.$wechat.miniProgram.navigateTo({url: `${minibackurl}`})
          }
        } else {
          let params = this.$util.handleAppParams(this.query, {wid: this.loginUser.uid, id: data.data, control: 'edit'})
          if (!self.query.id) {
            params.newadd = 1
          }
          self.$router.push({ path: '/news', query: params })
        }
      }
    },
    save () {
      const self = this
      if (self.loginUser.isretailer === 1) {
        self.saveData()
      } else if (self.loginUser.isretailer === 2) {
        self.$http.get(`${ENV.BokaApi}/api/list/news?from=retailer`, {
          params: {pagestart: 0, limit: 6}
        })
        .then(res => {
          const data = res.data
          const retdata = data.data ? data.data : data
          if (retdata.length >= 5 && !self.query.id) {
            self.openVip()
          } else {
            self.saveData()
          }
        })
      }
    },
    openVip () {
      const self = this
      self.$vux.confirm.show({
        content: ENV.vipNews,
        cancelText: ENV.giveUpVipText,
        confirmText: ENV.openVipText,
        onConfirm () {
          location.replace(`${ENV.Host}/#/pay?id=${self.loginUser.payorderid}&module=payorders`)
        }
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
      if (this.query.id) {
        const self = this
        document.title = '更多设置'
        this.$http.get(`${ENV.BokaApi}/api/moduleInfo`, {
          params: { id: this.query.id, module: 'news' }
        })
        .then(function (res) {
          const data = res.data
          const retdata = data.data ? data.data : data
          if (retdata) {
            for (let key in self.submitdata) {
              self.submitdata[key] = retdata[key]
            }
            if (!self.photoarr.length && self.submitdata.photo && self.$util.trim(self.submitdata.photo) !== '') {
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
      this.initFirstData()
      if (this.loginUser && (this.loginUser.subscribe === 1 || this.loginUser.isretailer)) {
        self.initContainer()
        let isAdmin = false
        for (let i = 0; i < self.loginUser.usergroup.length; i++) {
          if (self.loginUser.usergroup[i] === 1) {
            isAdmin = true
            break
          }
        }
        if (!self.loginUser.isretailer && !isAdmin) {
          this.$vux.loading.hide()
          self.initContainer()
          self.showApply = true
        } else {
          self.initContainer()
          self.showContainer = true
          this.$vux.loading.hide()
          if (this.query.id === undefined || this.query.id !== this.$route.query.id) {
            this.initData()
          }
          this.query = this.$route.query
          this.getData()
          if (`${this.loginUser.retailerinfo.firstinfo.addnews}` === '0' && this.query.from) {
            this.$http.get(`${ENV.BokaApi}/api/user/show`).then((res) => {
              this.loginUser = res.data
              User.set(this.loginUser)
              if (`${this.loginUser.retailerinfo.firstinfo.addnews}` === '0' && this.query.from) {
                this.isFirst = true
                // if (`${this.loginUser.retailerinfo.firstinfo.grabnews}` !== '0') {
                //   this.showFirst = true
                // }
              }
            })
          }
        }
      }
    }
  },
  activated () {
    this.$util.miniPost()
    this.$util.getSystemParams(() => {
      this.sysParams = SystemParams.get()
    })
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
</style>
