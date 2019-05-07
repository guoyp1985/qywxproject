<template>
  <div class="containerarea s-havebottom font14 addFactory">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <div class="s-container" style="top:0;">
        <form enctype="multipart/form-data">
          <input ref="fileInput1" class="hide" type="file" name="files" @change="fileChange('photo')" />
        </form>
        <form class="addForm">
          <div class="form-item fg bg-white b-top b-bottom">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Fatory name') }}<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
              <div class="t-cell input-cell v_middle flex_table" style="position:relative;">
                <x-input style="width:80%;padding-right:5px;" v-model="submitData.title" type="text" class="input" :placeholder="$t('Fatory name')" ></x-input>
                <span class="font14">旗舰店</span>
              </div>
            </div>
          </div>
          <div class="form-item bg-white fg b-top">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">{{ $t('Product summary') }}</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <group class="textarea-outer" style="padding:0;">
                  <x-textarea
                    ref="summaryTextarea"
                    v-model="submitData.summary"
                    class="x-textarea noborder"
                    :placeholder="$t('Product summary')"
                    :show-counter="false"
                    :rows="1"
                    :max="30"
                    @on-change="textareaChange('summaryTextarea')"
                    @on-focus="textareaFocus('summaryTextarea')"
                    autosize>
                  </x-textarea>
                </group>
              </div>
            </div>
          </div>
          <div class="form-item bg-white fg b-top">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">缩写码<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <x-input v-model="submitData.shortcode" type="text" class="input font14 align_right" :max="3" placeholder="必须为三位大写字母"></x-input>
              </div>
              <!-- <div class="t-cell title-cell color-red v_middle font12 align_right" style="width:130px;">(必须为三位大写字母)</div> -->
            </div>
          </div>
          <!--
          <div class="form-item">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">卖家名额</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <x-input class="input" type="tel" class="input" placeholder="卖家名额" ></x-input>
              </div>
            </div>
          </div>
        -->
          <div class="form-item bg-white fg b-top">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">logo</div>
              <div class="t-cell input-cell v_middle" style="position:relative;">
                <div class="q_photolist align_left bg-white">
                  <template v-if="photoarr.length > 0">
                    <div v-for="(item,index) in photoarr" :key="index" class="photoitem">
                      <div class="inner photo imgcover" :photo="item" :style="`background-image: url('${item}');`">
                        <div class="close" @click="deletephoto(item,index,'photo')">×</div>
                      </div>
                    </div>
                  </template>
                  <!-- <div class="photoitem add">
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
                  </div> -->
                  <div v-if="photoarr.length < maxnum" @click="uploadPhoto('fileInput1')" class="align_right">
                    <span class="color-red">添加logo ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 分润比例设置 -->
          <div class="form-item bg-white fg b-top">
            <div class=""><span>分润比例设置</span><span @click="clickTip"><i class="al al-wenhao color-red ml5 font24" style="vertical-align:-4px;"></i></span></div>
            <div class="profit-level b_bottom_after">
              <span>推荐人佣金</span>
              <x-input class="input" type="tel" v-model="submitData.superiorrate" placeholder="输入百分比，例如10%则填写10"></x-input>
              <div class="color-gray">%</div>
            </div>
            <div class="profit-level">
              <span>销售佣金</span>
              <x-input class="input" type="tel" v-model="submitData.salesrate" placeholder="输入百分比，例如10%则填写10"></x-input>
              <div class="color-gray">%</div>
            </div>
          </div>
          <template v-if="disClassData">
            <div class="form-item required border-box bg-white padding10 fg b-top" v-if="classData.length > 0">
              <div class="pb10">经营产品<span class="color-gray">(最多三项)</span><span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
              <checker
              class="x-checker"
              type="checkbox"
              v-model="productClass"
              :max="3"
              default-item-class="ck-item"
              selected-item-class="ck-item-selected">
                <checker-item class="border1px color-gray" v-for="(item, index) in classData" :key="index" :value="item.id">{{ item.title }}</checker-item>
              </checker>
            </div>
          </template>
        </form>
      </div>
      <div class="s-bottom flex_center bg-orange color-white" @click="saveEvent">{{ $t('Submit') }}</div>
      <div class="s-bottom flex_center pl12 pr12 list-shadow02 bg-white">
        <div class="flex_cell flex_center btn-bottom-red" @click="saveEvent">{{ $t('Submit') }}</div>
      </div>
      <div v-if="showTip" class="auto-modal flex_center">
        <div class="modal-inner border-box" style="width:80%;">
          <div class="align_center font18 bold pb10 b_bottom_after color-theme pt20">分润比例设置</div>
          <div class="align_left txt padding10">
            <div>销售佣金：是指销售该商品的卖家所得佣金。</div>
            <div class="mt10">推荐人佣金：是指销售该商品的上级推荐人所得佣金。</div>
            <div class="mt10">佣金比例根据商品所设置的商品利润进行计算，例如商品利润为<span class="color-red">20元</span>，销售佣金比例为<span class="color-red">20%</span>，则销售该商品的卖家可得佣金为<span class="color-red">20 x 20%=4元</span>，推荐人佣金比例计算方式同理。</div>
            <div class="mt10">注意：销售佣金比例+推荐人佣金比例需小于100%，否则厂家将没有收入。</div>
          </div>
          <div class="close-area flex_center" @click="closeTip">
            <i class="al al-close"></i>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Group, XInput, TransferDom, Popup, Checker, Datetime, CheckerItem, CheckIcon, XTextarea } from 'vux'
import ENV from 'env'
import { User } from '#/storage'
import Sos from '@/components/Sos'

export default {
  directives: {
    TransferDom
  },
  components: {
    Group, XInput, Popup, Checker, Datetime, CheckerItem, CheckIcon, XTextarea, Sos
  },
  data () {
    return {
      showSos: false,
      sosTitle: '抱歉，您暂无权限访问此页面！',
      showContainer: false,
      query: {},
      loginUser: {},
      infoData: {},
      allowsubmit: true,
      submitData: { title: '', summary: '', shortcode: '', photo: '', superiorrate: '20', salesrate: '80' },
      requireddata: { title: '' },
      classData: [],
      productClass: [],
      disClassData: false,
      photoarr: [],
      maxnum: 1,
      showTip: false,
      fid: 0
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
    clickTip () {
      this.showTip = true
    },
    closeTip () {
      this.showTip = false
    },
    textareaChange (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    textareaFocus (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
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
            maxnum: self.maxnum - self.photoarr.length,
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
      console.log(postData)
      if (self.productClass) {
        postData.productclass = self.productClass
      } else {
        postData.productclass = self.infoData.productclass
      }
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
      let charReg = /^[A-Z]+$/
      if (!charReg.test(postData.shortcode) || postData.shortcode.length < 3) {
        self.$vux.toast.text('缩写码必需为三个大写字母', 'middle')
        return false
      }
      postData.shortcode = postData.shortcode.toUpperCase()
      let superiorrate = postData.superiorrate
      let salesrate = postData.salesrate
      let reg = /^[1-9]\.?[0-9]*$/
      console.log('推荐卖家' + postData.superiorrate)
      console.log('卖家' + postData.salesrate)
      if (superiorrate !== 0 && !reg.test(superiorrate)) {
        self.$vux.toast.text('请输入正确的分润比例', 'middle')
        return
      }
      if (salesrate !== 0 && !reg.test(salesrate)) {
        self.$vux.toast.text('请输入正确的分润比例', 'middle')
        return
      }
      if (parseFloat(superiorrate) + parseFloat(salesrate) > 100) {
        self.$vux.toast.text('推荐佣金+销售佣金不能超过100%', 'middle')
        return
      }
      if (!iscontinue) {
        return false
      }
      let con = '确认添加该厂家吗？'
      if (self.fid) {
        con = '确认更新该厂家信息吗？'
        postData.id = self.fid
      }
      self.$vux.confirm.show({
        content: con,
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/factory/add`, postData).then(function (res) {
            let data = res.data
            self.$vux.loading.hide()
            let error = data.flag ? '设置成功' : data.error
            let timeout = self.$util.delay(error)
            self.$vux.toast.show({
              text: error,
              type: data.flag ? 'success' : 'warn',
              time: timeout
            })
            if (data.flag === 1) {
              setTimeout(() => {
                self.$router.go(-1)
              }, timeout)
            }
          })
        }
      })
    },
    getData () {
      const self = this
      self.$vux.loading.show()
      if (self.fid) {
        self.$http.get(`${ENV.BokaApi}/api/factory/info`,
          { params: { fid: self.fid } }
        ).then(function (res) {
          self.$vux.loading.hide()
          let data = res.data
          let retdata = data.data ? data.data : data
          console.log('in getData')
          console.log(retdata)
          self.infoData = retdata
          self.photoarr = []
          if (retdata.photo && self.$util.trim(retdata.photo) !== '') {
            self.photoarr.push(retdata.photo)
          }
          for (let key in self.submitData) {
            self.submitData[key] = retdata[key]
          }
          if (self.disClassData) {
            return self.$http.get(`${ENV.BokaApi}/api/list/applyclass?ascdesc=asc`,
              { params: { limit: 100 } }
            )
          }
        }).then(function (res) {
          if (res) {
            let data = res.data
            data = data.data ? data.data : data
            self.classData = data
            self.productClass = []
            if (self.infoData.productclass && self.$util.trim(self.infoData.productclass) !== '') {
              let idarr = self.infoData.productclass.split(',')
              for (let i = 0; i < idarr.length; i++) {
                self.productClass.push(parseInt(idarr[i]))
              }
            }
          }
        })
      } else {
        self.$vux.loading.hide()
        self.$http.get(`${ENV.BokaApi}/api/list/applyclass?ascdesc=asc`,
          { params: { limit: 100 } }
        ).then(function (res) {
          if (res) {
            let data = res.data
            data = data.data ? data.data : data
            self.classData = data
            self.productClass = []
          }
        })
      }
    },
    init () {
    },
    initData () {
      const self = this
      self.submitData = { title: '', summary: '', shortcode: '', photo: '', superiorrate: '20', salesrate: '80' }
      self.requireddata = { title: '' }
      self.disClassData = false
    },
    refresh () {
      const self = this
      this.$vux.loading.show()
      this.loginUser = User.get()
      self.query = self.$route.query
      self.initData()
      let ismanager = false
      for (let i = 0; i < this.loginUser.usergroup.length; i++) {
        if (this.loginUser.usergroup[i] === 1) {
          ismanager = true
          break
        }
      }
      if (ismanager) {
        self.disClassData = true
        self.requireddata.productclass = ''
      }
      let isEdit = false
      if (this.query.id) {
        isEdit = true
        this.fid = parseInt(this.query.id)
      } else if (this.query.fid) {
        isEdit = true
        this.fid = parseInt(this.query.fid)
      }
      if (ismanager || (isEdit && this.fid === this.loginUser.fid)) {
        self.showSos = false
        self.showContainer = true
        this.$vux.loading.hide()
        self.getData()
      } else {
        this.$vux.loading.hide()
        self.showSos = true
        self.showContainer = false
      }
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    this.refresh()
  }
};
</script>

<style lang="less">
.photoitem{float:right !important;}
.weui-input{text-align:right;}
.weui-textarea{text-align:right;}
.profit-level{
  box-sizing: border-box;
  padding: 20px 10px 20px 10px;
  display: flex;
  span{
    flex: 0 0 80px;
  }
  input{
    padding-left: 10px;
    flex: 1;
    text-align:left;
  }
  .weui-cell:before{display:none;}
}
.addFactory{
  background-color:#EFF2F3;
  .fg{margin-top:5px;}
  .b-border{border-bottom:1px solid #e5e5e5;}
  .b-top{border-top:1px solid #e5e5e5;}
}
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
