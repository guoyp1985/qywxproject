<template>
  <div class="containerarea s-havebottom font14 applyFactory">
    <!-- <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template> -->
    <template>
      <div class="s-container" style="top:0;">
        <form enctype="multipart/form-data">
          <input ref="fileInput1" class="hide" type="file" name="files" @change="fileChange('photo')" />
        </form>
        <form class="addForm">
          <div class="form-item fg bg-white b-top b-bottom">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">公司名称<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
              <div class="t-cell input-cell v_middle flex_right" style="position:relative;">
                <template v-if="factoryInfo && factoryInfo.id">{{factoryInfo.title}}</template>
                <x-input v-else style="padding-right:5px;" v-model="submitData.title" type="text" class="input" placeholder="请输入公司名称" ></x-input>
              </div>
            </div>
          </div>
          <div class="form-item fg bg-white b-top b-bottom">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">公司简称<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
              <div class="t-cell input-cell v_middle flex_right" style="position:relative;">
                <template v-if="factoryInfo && factoryInfo.id">{{factoryInfo.company}}</template>
                <x-input v-else style="padding-right:5px;" v-model="submitData.company" type="text" class="input" placeholder="请输入公司简称" ></x-input>
              </div>
              <div class="t-cell v_middle font14 w50 align_right">旗舰店</div>
            </div>
          </div>
          <div class="form-item fg bg-white b-top b-bottom">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">手机号<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
              <div class="t-cell input-cell v_middle flex_right" style="position:relative;">
                <template v-if="factoryInfo && factoryInfo.id">{{factoryInfo.mobile}}</template>
                <x-input v-else style="padding-right:5px;" v-model="submitData.mobile" type="text" class="input" placeholder="请输入手机号" ></x-input>
              </div>
            </div>
          </div>
          <div class="form-item fg bg-white b-top b-bottom" v-if="!factoryInfo || !factoryInfo.id">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">验证码<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
              <div class="t-cell input-cell v_middle flex_right" style="position:relative;">
                <x-input style="padding-right:5px;" v-model="yzmcode" type="text" class="input" placeholder="请输入验证码" ></x-input>
                <div class="font14 yzmcode disabled" v-if="count !== countNum" @click="getXcode" :disabled="count !== countNum">{{message}}</div>
                <div class="font14 yzmcode" v-else @click="getXcode" :disabled="count !== countNum">{{message}}</div>
              </div>
            </div>
          </div>
          <div class="form-item bg-white fg b-top">
            <div class="t-table">
              <div class="t-cell title-cell w80 font14 v_middle">营业执照<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
              <div class="t-cell input-cell v_middle align_right" style="position:relative;">
                <template v-if="factoryInfo && factoryInfo.id">
                  <div class="q_photolist align_left bg-white">
                    <div class="photoitem">
                      <div class="inner photo imgcover" :photo="factoryInfo.licensephoto" :style="`background-image: url('${factoryInfo.licensephoto}');`"></div>
                    </div>
                  </div>
                </template>
                <div v-else class="q_photolist align_left bg-white">
                  <template v-if="photoarr.length > 0">
                    <div v-for="(item,index) in photoarr" :key="index" class="photoitem">
                      <div class="inner photo imgcover" :photo="item" :style="`background-image: url('${item}');`">
                        <div class="close" @click="deletephoto(item,index,'photo')">×</div>
                      </div>
                    </div>
                  </template>
                  <div v-if="photoarr.length < maxnum" @click="uploadPhoto('fileInput1')" class="align_right">
                    <span class="color-red">上传营业执照 ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form-item fg bg-white b-top b-bottom">
            <div class="t-table">
              <div class="t-cell title-cell font14 v_middle" style="width:100px;">社会信用代码<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
              <div class="t-cell input-cell v_middle flex_right" style="position:relative;">
                <template v-if="factoryInfo && factoryInfo.id">{{factoryInfo.licensecode}}</template>
                <x-input v-else style="padding-right:5px;" v-model="submitData.licensecode" type="text" class="input" placeholder="请输入营业执照上的信用代码" ></x-input>
              </div>
            </div>
          </div>

          <!-- 分润比例设置 -->
          <div class="form-item bg-white fg b-top">
            <div class=""><span>分润比例设置</span><span @click="clickTip"><i class="al al-wenhao color-red ml5 font24" style="vertical-align:-4px;"></i></span></div>
            <div class="profit-level b_bottom_after flex_left">
              <span>推荐人佣金</span>
              <div v-if="factoryInfo && factoryInfo.id" class="input align_right">{{factoryInfo.superiorrate}}</div>
              <x-input v-else class="input" type="tel" v-model="submitData.superiorrate" placeholder="输入百分比，例如10%则填写10"></x-input>
              <div class="color-gray">%</div>
            </div>
            <div class="profit-level flex_left">
              <span>销售佣金</span>
              <div v-if="factoryInfo && factoryInfo.id" class="input align_right">{{factoryInfo.salesrate}}</div>
              <x-input v-else class="input" type="tel" v-model="submitData.salesrate" placeholder="输入百分比，例如10%则填写10"></x-input>
              <div class="color-gray">%</div>
            </div>
          </div>
          <template v-if="factoryInfo.id">
            <div class="form-item fg bg-white b-top b-bottom">
              <div class="t-table">
                <div class="t-cell title-cell font14 v_middle" style="width:100px;">经营产品<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
                <div class="t-cell input-cell v_middle flex_table" style="position:relative;">{{disProductClass}}</div>
              </div>
            </div>
          </template>
          <template v-else>
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
      <!-- <div class="s-bottom flex_center bg-orange color-white" @click="saveEvent">{{ $t('Submit') }}</div> -->
      <div class="s-bottom flex_center pl12 pr12 list-shadow02 bg-white">
        <div v-if="!factoryInfo || !factoryInfo.id" :class="`flex_cell flex_center btn-bottom-red ${this.flags ? 'disable' : ''}`" @click="saveEvent">提交申请</div>
        <div v-else="factoryInfo.moderate == 0" class="flex_cell flex_center btn-bottom-red disable">审核中...</div>
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
import Reg from '#/reg'
import Sos from '@/components/Sos'
const TimeCount = 60

export default {
  directives: {
    TransferDom
  },
  components: {
    Group, XInput, Popup, Checker, Datetime, CheckerItem, CheckIcon, XTextarea, Sos
  },
  data () {
    return {
      flags: null,
      btnSubmit: '提交申请',
      message: '获取验证码',
      count: 60,
      countNum: 60,
      intervalId: null,
      showSos: false,
      sosTitle: '抱歉，您暂无权限访问此页面！',
      showContainer: false,
      query: {},
      loginUser: {},
      factoryInfo: {},
      allowsubmit: true,
      yzmcode: '',
      hqyzm: '',
      submitData: { title: '', mobile: '', company: '', licensephoto: '', licensecode: '', superiorrate: '20', salesrate: '80' },
      requireddata: { title: '', company: '', licensephoto: '', licensecode: '' },
      classData: [],
      productClass: [],
      disClassData: false,
      photoarr: [],
      maxnum: 1,
      showTip: false,
      fid: 0,
      getCodeIng: false,
      afterApply: false,
      disProductClass: ''
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
      self.submitData.licensephoto = self.photoarr.join(',')
    },
    photoCallback (data) {
      const self = this
      if (data.flag === 1) {
        if (self.photoarr.length < self.maxnum) {
          self.photoarr.push(data.data)
          self.submitData.licensephoto = self.photoarr.join(',')
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
      console.log(this.yzmcode)
      console.log(postData)
      if (self.productClass) {
        postData.productclass = self.productClass
      } else {
        postData.productclass = self.factoryInfo.productclass
      }
      let validateData = []
      for (let key in self.requireddata) {
        let v = {}
        v[key] = postData[key]
        validateData.push(v)
      }
      if (postData.productclass.length === 0 || !postData.productclass) {
        self.$vux.toast.text('必填项不能为空', 'middle')
        return false
      }
      let iscontinue = self.$util.validateQueue(validateData,
        model => {
          switch (model.key) {
            default:
              self.$vux.toast.text('必填项不能为空', 'middle')
          }
        }
      )
      if (postData.mobile === '') {
        this.$vux.toast.text('手机号码不能为空！')
        return false
      }
      if (this.yzmcode === '') {
        this.$vux.toast.text('请填写验证码！')
        return false
      }
      if (this.yzmcode !== this.hqyzm) {
        this.$vux.toast.text('验证码错误！')
        return false
      }
      // postData.shortcode = postData.shortcode.toUpperCase()
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
      // if (self.fid) {
      //   con = '确认更新该厂家信息吗？'
      //   postData.id = self.fid
      // }
      self.$vux.confirm.show({
        content: con,
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/factory/applyFactory`, postData).then(function (res) {
            let data = res.data
            let error = data.flag === 1 ? '申请成功' : data.error
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: error,
              type: (data.flag !== 1 ? 'warn' : 'success'),
              time: self.$util.delay(error),
              onHide: function () {
                if (data.flag === 1) {
                  self.afterApply = true
                }
              }
            })
          })
        }
      })
    },
    getXcode () {
      if (!this.getCodeIng) {
        if (this.submitData.mobile === '') {
          this.$vux.toast.text('手机号码不能为空！')
          return false
        }
        if (!Reg.rPhone.test(this.submitData.mobile)) {
          this.$vux.toast.text('手机号码格式错误', 'middle')
          return false
        }
        if (Reg.rPhone.test(this.submitData.mobile)) {
          this.getCodeIng = true
          this.$http.get(`${ENV.BokaApi}/api/verifyMobile`, { params: { phone: this.submitData.mobile } }).then(res => {
            const data = res.data
            if (data.flag) {
              this.$vux.toast.text('验证码发送成功！')
              const yzm = data
              this.hqyzm = data.data
              console.log('验证码')
              console.log(yzm)
              this.intervalId = setInterval(() => {
                console.log('进入到了倒计时方法')
                this.count--
                if (!this.count) {
                  this.count = TimeCount
                  this.message = '获取验证码'
                  this.getCodeIng = false
                  clearInterval(this.intervalId)
                } else {
                  this.message = `${this.count}秒`
                }
              }, 1000)
            } else {
              this.$vux.toast.text(data.error)
            }
          })
        }
      }
    },
    getData () {
      const self = this
      self.$vux.loading.show()
      self.$http.get(`${ENV.BokaApi}/api/factory/info`,
        { params: { } }
      ).then(function (res) {
        self.$vux.loading.hide()
        let data = res.data
        if (data.flag) {
          let retdata = data.data ? data.data : data
          console.log('in getData')
          console.log(retdata)
          self.factoryInfo = retdata
          self.photoarr = []
          if (retdata.licensephoto && self.$util.trim(retdata.licensephoto) !== '') {
            self.photoarr = retdata.licensephoto.split(',')
          }
          for (let key in self.submitData) {
            self.submitData[key] = retdata[key]
          }
        }
        return self.$http.get(`${ENV.BokaApi}/api/list/applyclass?ascdesc=asc`,
          { params: { limit: 100 } }
        )
      }).then(function (res) {
        if (res) {
          let data = res.data
          data = data.data ? data.data : data
          self.classData = data
          self.productClass = []
          // if (self.factoryInfo.productclass && self.$util.trim(self.factoryInfo.productclass) !== '') {
          //   let idarr = self.factoryInfo.productclass.split(',')
          //   for (let i = 0; i < idarr.length; i++) {
          //     self.productClass.push(parseInt(idarr[i]))
          //   }
          // }
          if (self.factoryInfo.productclass && self.$util.trim(self.factoryInfo.productclass) !== '') {
            let classStr = []
            let idarr = self.factoryInfo.productclass.split(',')
            for (let i = 0; i < idarr.length; i++) {
              self.productClass.push(parseInt(idarr[i]))
              for (let j = 0; j < self.classData.length; j++) {
                if (parseInt(idarr[i]) === self.classData[j].id) {
                  classStr.push(self.classData[j].title)
                  break
                }
              }
            }
            if (classStr.length) {
              self.disProductClass = classStr.join(',')
            }
          }
        }
      })
    },
    init () {
    },
    initData () {
      const self = this
      this.count = TimeCount
      this.message = '获取验证码'
      clearInterval(this.intervalId)
      this.intervalId = null
      self.submitData = { title: '', mobile: '', company: '', licensephoto: '', licensecode: '', superiorrate: '20', salesrate: '80' }
      self.requireddata = { title: '', company: '', licensephoto: '', licensecode: '' }
    },
    refresh () {
      const self = this
      this.$vux.loading.show()
      this.loginUser = User.get()
      self.query = self.$route.query
      self.initData()
      self.getData()
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
.yzmcode{
  background-color:#ff6a61;border:0;color:#fff;border-radius:5px;width:120px;
  height:30px;text-align:center;line-height:30px;outline:none;
}
.disabled{background-color:#ccc;color:#000;pointer-events:none;}
.disable{pointer-events:none;}
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
.applyFactory{
  background-color:#EFF2F3;
  .fg{margin-top:5px;}
  .b-border{border-bottom:1px solid #e5e5e5;}
  .b-top{border-top:1px solid #e5e5e5;}
}
.applyFactory .x-checker .ck-item{
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
.applyFactory .vux-check-icon > span{color:#666;display: inline-block;vertical-align: bottom;line-height: 19px;}
</style>
