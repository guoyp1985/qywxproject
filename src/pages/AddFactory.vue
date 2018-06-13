<template>
  <div class="containerarea s-havebottom bg-white font14 addFactory">
    <div class="s-container" style="top:0;">
      <form enctype="multipart/form-data">
        <input ref="fileInput1" class="hide" type="file" name="files" @change="fileChange('photo')" />
      </form>
      <form class="addForm">
        <div class="form-item">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Fatory name') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <input v-model="submitData.title" type="text" class="input" :placeholder="$t('Fatory name')" />
            </div>
          </div>
        </div>
        <div class="form-item bg-white">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Product summary') }}</div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <group class="textarea-outer" style="padding:0;">
                <x-textarea v-model="submitData.summary" class="x-textarea noborder" :placeholder="$t('Product summary')" :show-counter="false" :rows="1" :max="30" autosize></x-textarea>
              </group>
            </div>
          </div>
        </div>
        <div class="form-item bg-white">
          <div class="t-table">
            <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Cover photo') }}</div>
            <div class="t-cell input-cell v_middle" style="position:relative;">
              <div class="q_photolist align_left bg-white">
                <template v-if="photoarr.length > 0">
                  <div v-for="(item,index) in photoarr" :key="index" class="photoitem">
                    <div class="inner photo imgcover" :photo="item" :style="`background-image: url('${item}');`">
                      <div class="close" @click="deletephoto(item,index,'photo')">×</div>
                    </div>
                  </div>
                </template>
                <div v-if="photoarr.length < maxnum" class="photoitem add" @click="uploadPhoto('fileInput1')">
                  <div class="inner">
                    <div class="innerlist">
                      <div class="flex_center h_100">
                        <div class="txt">
                          <i class="al al-zhaopian" style="color:#bbb;line-height:30px;"></i>
                          <div><span class="havenum">{{ photoarr.length }}</span><span class="ml5 mr5">/</span><span class="maxnum">{{ maxnum }}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <template v-if="disClassData">
          <div class="form-item required border-box padding10" v-if="classData.length > 0">
            <div class="pb10">经营产品<span class="color-gray">(最多三项)</span><span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
            <checker
            class="x-checker"
            type="checkbox"
            v-model="productClass"
            :max="3"
            default-item-class="ck-item"
            selected-item-class="ck-item-selected">
              <checker-item class="border1px color-gray" v-for="(item, index) in classData" :key="index" :value="index">{{ item.title }}</checker-item>
            </checker>
          </div>
        </template>
      </form>
    </div>
    <div class="s-bottom flex_center bg-orange color-white" @click="saveEvent">{{ $t('Submit') }}</div>
    <div class="s-bottom flex_center pl12 pr12 list-shadow02 bg-white">
      <div class="flex_cell flex_center btn-bottom-red" @click="saveEvent">{{ $t('Submit') }}</div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Group, XInput, TransferDom, Popup, Checker, CheckerItem, CheckIcon, XTextarea } from 'vux'
import ENV from 'env'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group, XInput, Popup, Checker, CheckerItem, CheckIcon, XTextarea
  },
  data () {
    return {
      autofixed: false,
      query: {},
      allowsubmit: true,
      submitData: { title: '', summary: '', photo: '' },
      requireddata: { title: '', productclass: '' },
      classData: [],
      productClass: [],
      disClassData: false,
      photoarr: [],
      maxnum: 1
    }
  },
  watch: {
    query: function () {
      return this.query
    },
    submitData: function () {
      return this.submitData
    },
    requireddata: function () {
      return this.requireddata
    },
    productClass: function () {
      return this.productClass
    }
  },
  methods: {
    deletephoto (item, index) {
      const self = this
      self.photoarr.splice(index, 1)
      self.submitData.photo = self.photoarr.join(',')
    },
    photoCallback (data) {
      const self = this
      if (data.flag === 1) {
        if (self.photoarr.length < self.maxnum) {
          self.photoarr.push(data.data)
          self.submitData.photo = self.photoarr.join(',')
        }
      } else if (data.error) {
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error)
        })
      }
    },
    uploadPhoto (refname) {
      const self = this
      const fileInput = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
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
    fileChange (type) {
      const self = this
      const target = event.target
      const files = target.files
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
    saveEvent () {
      const self = this
      let postData = self.submitData
      postData.productclass = self.productClass
      let validateData = []
      for (let key in self.requireddata) {
        let v = {}
        v[key] = postData[key]
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
      let con = '确认添加该厂商吗？'
      if (self.query.id) {
        con = '确认更新该厂商信息吗？'
        postData.id = self.query.id
      }
      self.$vux.confirm.show({
        content: con,
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/factory/add`, postData).then(function (res) {
            let data = res.data
            self.$vux.loading.hide()
            if (data.flag === 1) {
              self.$router.go(-1)
            } else {
              self.$vux.toast.show({
                text: data.error,
                type: 'warn',
                time: self.$util.delay(data.error)
              })
            }
          })
        }
      })
    },
    setProductClass () {
      const self = this
      for (let i = 0; i < self.classData.length; i++) {
        for (let j = 0; j < self.productClass.length; j++) {
          if (parseInt(self.productClass[j]) === self.classData[i].id) {
            self.classData[i].checked = true
            break
          }
        }
      }
    },
    refresh () {
      const self = this
      self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'fatory', action: 'add'
      }).then(function () {
        return self.$http.get(`${ENV.BokaApi}/api/list/applyclass?ascdesc=asc`,
          { params: { limit: 100 } }
        )
      }).then(function (res) {
        self.$vux.loading.hide()
        let data = res.data
        data = data.data ? data.data : data
        self.classData = data
        self.disClassData = true
        if (self.$route.query.id && self.query.id !== self.$route.query.id) {
          self.query = self.$route.query
          self.$vux.loading.show()
          self.$http.get(`${ENV.BokaApi}/api/factory/info`,
            { params: { fid: self.query.id } }
          ).then(function (res) {
            self.$vux.loading.hide()
            let data = res.data
            let retdata = data.data ? data.data : data
            if (retdata.photo && self.$util.trim(retdata.photo) !== '') {
              self.photoarr.push(retdata.photo)
            }
            for (let key in self.submitData) {
              self.submitData[key] = retdata[key]
            }
          })
        }
      })
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.addFactory .x-checker .ck-item{
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
.addFactory .vux-check-icon > span{color:#666;display: inline-block;vertical-align: bottom;line-height: 19px;}
</style>
