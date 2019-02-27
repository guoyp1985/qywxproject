<template>
  <div class="containerarea bg-page font14 factory-setting">
    <div class="pagemiddle" style="top:0px;">
      <form enctype="multipart/form-data">
        <input ref="fileInput" class="hide" type="file" name="files" @change="fileChange('logo','fileInput')" />
      </form>
      <form class="form-list">
        <div class="item db-flex">
          <div class="flex_left w80"><span>厂家名称</span><span class="al al-xing icon"></span></div>
          <div class="flex_cell flex_left">
            <x-input v-model="submitdata.title" placeholder="请输入厂家名称" class="input"></x-input>
          </div>
        </div>
        <div class="item db-flex">
          <div class="flex_left w80"><span>厂家logo</span><span class="al al-xing icon"></span></div>
          <div class="flex_cell flex_right" @click="uploadPhoto('fileInput','logo')">
            <template v-if="!submitdata.photo || submitdata.photo == ''">
              <span class="color-red">添加logo ></span>
            </template>
            <template v-else>
              <img :src="submitdata.photo" style="width:30px;height:30px;object-fit:cover;" />
            </template>
          </div>
        </div>
        <div class="item" style="padding-left:0;padding-right:0;" v-for="(item,index) in contentArr" :key="index">
          <form enctype="multipart/form-data">
            <input :ref="`fileInput${index}`" class="hide" type="file" name="files" @change="fileChange('contentphoto',`fileInput${index}`)" />
          </form>
          <div class="b_bottom_after pb5 pl10 pr10 db-flex">
            <div class="flex_cell flex_left">厂家介绍 {{index+1}}</div>
            <div v-if="index > 0" class="flex_right color-red w80" @click="deleteContent(index)">删除</div>
          </div>
          <div class="padding10">
            <x-textarea
              :name="`content${index+1}`"
              :ref="`contentTextarea${index+1}`"
              v-model="item.content"
              style="padding:5px;"
              class="x-textarea noborder"
              placeholder="可输入品牌介绍、加盟优势、加盟案例等内容，吸引更多卖家加盟"
              :show-counter="false"
              :rows="1"
              @on-change="textareaChange(`contentTextarea${index+1}`, index)"
              @on-focus="textareaFocus(`contentTextarea${index+1}`,index)"
              autosize>
            </x-textarea>
          </div>
          <div class="padding10">
            <div class="q_photolist align_left">
              <template v-if="item.photoarr.length > 0">
                <div v-for="(photo,index1) in item.photoarr" :key="index1" class="photoitem ml10">
                  <div style="padding:5px 0;">
                    <div class="inner photo imgcover" :photo="photo" :style="`background-image: url('${photo}');`">
                      <div class="close" @click="deletephoto(photo,index1,'contentphoto',index)">×</div>
                      <div class="clip"><i class="al al-set"></i></div>
                    </div>
                  </div>
                </div>
              </template>
              <div v-if="item.photoarr.length < maxnum1" class="photoitem add ml10" @click="uploadPhoto(`fileInput${index}`,'contentphoto',index)">
                <div style="padding:5px 0;">
                  <div class="inner">
                    <div class="innerlist">
                      <div class="flex_center h_100">
                        <div class="txt">
                          <i class="al al-zhaopian" style="color:#c6c5c5;line-height:30px;"></i>
                          <div>{{item.photoarr.length}} / {{maxnum1}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div v-if="contentArr.length < 10" class="padding10 flex_center">
        <div class="w100 bg-white color-theme align_center padding5" style="border:#ccc 1px solid;border-radius:5px;" @click="addContent">添加一项</div>
      </div>
    </div>
    <div class="pagebottom flex_center bg-theme color-white" @click="submitevent">保存并预览</div>
  </div>
</template>

<script>
import { XTextarea, XInput, TransferDom, Popup, CheckIcon, Checker, CheckerItem } from 'vux'
import Forminputplate from '@/components/Forminputplate'
import ENV from 'env'
import { User } from '#/storage'

export default {
  directives: {
    TransferDom
  },
  components: {
    XTextarea, XInput, Popup, CheckIcon, Forminputplate, Checker, CheckerItem
  },
  data () {
    return {
      query: {},
      loginUser: {},
      factoryInfo: {},
      maxnum: 1,
      maxnum1: 9,
      submitdata: {title: '', 'photo': '', content: ''},
      photoarr: [],
      requireddata: {title: '', 'photo': ''},
      contentArr: [{content: '', photo: '', photoarr: []}],
      clickIndex: 0
    }
  },
  watch: {
    photoarr: function () {
      return this.photoarr
    },
    contentArr: function () {
      return this.contentArr
    },
    submitdata: function () {
      console.log('in watch sumitdata')
      if (this.submitdata.buyonline) {
        this.online = true
        this.offline = false
      } else {
        this.online = false
        this.offline = true
      }
      return this.submitdata
    },
    buyonline: function () {
      console.log('in watch bunonline')
      if (this.isFirst) {
        this.online = this.buyonline
        this.isFirst = false
      }
      return this.buyonline
    },
    buyoffline: function () {
      console.log('in watch buyoffline')
      if (this.isFirst1) {
        this.offline = this.buyoffline
        this.isFirst1 = false
      }
      return this.buyoffline
    }
  },
  methods: {
    addContent () {
      this.contentArr.push({content: '', photo: '', photoarr: []})
    },
    deleteContent (index) {
      this.$vux.confirm.show({
        content: '确定要删除吗？',
        onConfirm: () => {
          this.contentArr.splice(index, 1)
        }
      })
    },
    textareaChange (refname, index) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    textareaFocus (refname, index) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    photoCallback (data, type) {
      const self = this
      if (data.flag === 1) {
        if (type === 'logo') {
          self.photoarr.push(data.data)
          self.submitdata.photo = self.photoarr[0]
        } else if (type === 'contentphoto') {
          console.log('进入')
          this.contentArr[this.clickIndex].photoarr.push(data.data)
          this.contentArr[this.clickIndex].photo = this.contentArr[this.clickIndex].photoarr.join(',')
          console.log(this.contentArr)
        }
      } else if (data.error) {
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error)
        })
      }
    },
    uploadPhoto (refname, type, index) {
      const self = this
      const fileInput = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      console.log('uploadPhoto type')
      console.log(type)
      if (index) {
        this.clickIndex = index
      } else {
        this.clickIndex = 0
      }
      if (self.$util.isPC()) {
        fileInput.click()
      } else {
        let curmax = 1
        if (type === 'contentphoto') {
          curmax = 9 - this.contentArr[this.clickIndex].photoarr.length
        }
        self.$wechat.ready(function () {
          self.$util.wxUploadImage({
            maxnum: curmax,
            handleCallback: function (data) {
              console.log('handleCallback')
              console.log(type)
              self.photoCallback(data, type)
            }
          })
        })
      }
    },
    fileChange (type) {
      const self = this
      const target = event.target
      let files = target.files
      if (files.length > 0) {
        const fileForm = target.parentNode
        const filedata = new FormData(fileForm)
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(function (res) {
          let data = res.data
          self.$vux.loading.hide()
          self.photoCallback(data, type)
        })
      }
    },
    deletephoto (item, index, type, index1) {
      if (index1) {
        this.clickIndex = index1
      } else {
        this.clickIndex = 0
      }
      if (type === 'logo') {
        this.photoarr.splice(index, 1)
        this.submitdata.photo = ''
      } else {
        this.contentArr[this.clickIndex].photoarr.splice(index, 1)
        this.contentArr[this.clickIndex].photo = this.contentArr[this.clickIndex].photoarr.join(',')
      }
    },
    submitevent () {
      const self = this
      let validateData = []
      for (let key in self.requireddata) {
        let v = {}
        v[key] = self.submitdata[key] ? self.submitdata[key] : ''
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
      let conArr = []
      for (let i = 0; i < this.contentArr.length; i++) {
        let curcon = this.contentArr[i]
        if (curcon.content === '' && curcon.photo === '') {
          self.$vux.toast.text('请完善厂家介绍或者内容图片', 'middle')
          return false
        } else {
          let con = {}
          if (curcon.content !== '') {
            con.content = curcon.content
          } else {
            con.content = ''
          }
          if (curcon.photo !== '') {
            con.photo = curcon.photo
            con.photoarr = curcon.photo.split(',')
          } else {
            con.photo = ''
            con.photoarr = []
          }
          conArr.push(con)
        }
      }
      self.$vux.loading.show()
      if (conArr.length > 0) {
        this.submitdata.content = JSON.stringify(conArr)
      } else {
        this.submitdata.content = ''
      }
      self.$http.post(`${ENV.BokaApi}/api/factory/add`, {
        ...self.submitdata, id: self.query.fid
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let error = data.error
        if (!error) {
          if (data.flag) {
            error = '成功'
          } else {
            error = '失败'
          }
        }
        self.$vux.toast.show({
          text: error,
          time: self.$util.delay(error),
          onHide: () => {
            if (data.flag === 1) {
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
                self.$router.push({path: '/factoryDetail', query: {fid: self.query.fid}})
              }
            }
          }
        })
      })
    },
    init () {
      this.loginUser = User.get()
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      this.$http.get(`${ENV.BokaApi}/api/factory/info`, {
        params: {id: this.query.fid}
      }).then(res => {
        const data = res.data
        this.factoryInfo = data.data
        this.submitdata.title = this.factoryInfo.title
        this.submitdata.photo = this.factoryInfo.photo
        this.submitdata.content = this.factoryInfo.content
        let content = this.factoryInfo.content
        if (content && content !== '') {
          this.contentArr = JSON.parse(content)
        }
      })
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.factory-setting{
  .form-list{
    padding-left:10px;padding-right:10px;padding-bottom:10px;box-sizing: border-box;
    .item{
      position:relative;width:100%;padding:10px;box-sizing: border-box;
      margin-top:5px;background-color:#fff;box-shadow:0px 0px 3px 1px #e4e4e4;
      .icon{color:red;font-size:12px;margin-top:-3px;margin-left:3px;}
      .input{
        width:100%;padding:0 5px;text-align:right;box-sizing: border-box;
        input{text-align:right;}
      }
    }
  }
  .x-checker .ck-item{
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
  .s-havebottom .s-container{bottom:50px;}
  .s-bottom{height:50px;}

  .taglist{}
  .taglist .tagitem{
    padding:5px 10px;box-sizing: border-box;display: inline-block;
  }
  .taglist .tagitem.add .inner{
    border-color:rgb(229, 28, 35);color:rgb(229, 28, 35);
  }
  .taglist .tagitem .inner{
    position:relative;
    font-size:13px;
    padding: 0 15px;height: 30px;line-height: 30px;
    text-align: center;
    border-radius: 3px;background-color: #fff;box-sizing: border-box;
    border:1px solid #ddd;color:#999;
  }
  .taglist .tagitem .del{
  	position:absolute;top:-8px;right:-8px;
  	width:20px;height:20px;border-radius:50%;background-color:rgba(229, 28, 35,0.8);color:#fff;
  	display:flex;justify-content: center;align-items: center;
  }
  .taglist .tagitem .edit{
  	position:absolute;top:-8px;left:-8px;
  	width:20px;height:20px;border-radius:50%;background-color:rgba(229, 28, 35,0.8);color:#fff;
  	display:flex;justify-content: center;align-items: center;
  }
}
</style>
