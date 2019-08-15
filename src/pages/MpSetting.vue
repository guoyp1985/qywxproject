<template>
<div class="containerarea mpsetting font14">
  <!-- <template v-if="!showContainer">
    <template v-if="!haveAppid">
      <div class="w_100 h_100 flex_center font18">授权过期，请重新授权</div>
    </template>
    <template v-else> -->
  <template>
    <template>
      <div class="pagetop">
        <tab v-model="selectedIndex" class="b-tab">
          <tab-item :selected="selectedIndex == 0">开发管理</tab-item>
          <tab-item :selected="selectedIndex == 1">体验者管理</tab-item>
        </tab>
      </div>
      <div class="pagemiddle">
        <swiper v-model="selectedIndex" class="x-swiper no-indicator">
          <swiper-item>
            <div class="boxlist">
              <div class="boxitem">
                <div class="title">厂家</div>
                <template v-if="disFactory">
                  <div v-if="haveFactory" class="pt20 pb20 flex_left">{{factory.title}}</div>
                  <div v-else class="flex_right pr10">
                    <div class="btn db" style="width:102px;" @click="showFactoryPopup">选择厂家</div>
                  </div>
                </template>
              </div>
              <div class="boxitem">
                <div class="title">在用版本</div>
                <template v-if="disCensorData">
                  <div v-if="!censorData" class="pt20 pb20 flex_left">暂无数据</div>
                  <div v-else class="scroll_list">
                    <div class="db-flex pb20 scroll_item">
                      <div class="col1">
                        <div>
                          <div class="gray">版本号</div>
                          <div class="font22">{{censorData.code_ver}}</div>
                          <div class="color-blue flex_left">
                            <div class="align_center" @click="previewEvent" style="width:50px;border:#007aff 1px solid;border-radius:5px;">
                              <span class="font12">预览</span>
                              <i class="al al-erweima1 font12"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col2 flex_cell">
                        <div class="flex_left">
                          <div class="gray w100">提交审核时间</div>
                          <div class="flex_cell">{{censorData.code_uploadtime | dateFormat}}</div>
                        </div>
                        <div class="flex_left mt12">
                          <div class="gray w100">描述</div>
                          <div class="flex_cell">{{censorData.code_desc}}</div>
                        </div>
                      </div>
                      <div class="col3">
                        <div class="btn db mt12" @click="submitCensor(censorData)">提交审核</div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <div class="boxitem">
                <div class="title">开发版本</div>
                <template v-if="disDevelopmentData">
                  <div v-if="!developmentData.length" class="pt20 pb20 flex_left">暂无上传开发数据</div>
                  <div v-else class="scroll_list">
                    <div class="db-flex pb20 scroll_item" v-for="(item,index) in developmentData" :key="index">
                      <div class="col1">
                        <div>
                          <div class="gray">版本号</div>
                          <div class="font22">{{item.user_version}}</div>
                        </div>
                      </div>
                      <div class="col2 flex_cell">
                        <div class="flex_left">
                          <div class="gray w100">开发者</div>
                          <div class="flex_cell">{{item.developer}}</div>
                        </div>
                        <div class="flex_left mt12">
                          <div class="gray w100">提交时间</div>
                          <div class="flex_cell">{{item.create_time | dateFormat}}</div>
                        </div>
                        <div class="flex_left mt12">
                          <div class="gray w100">描述</div>
                          <div class="flex_cell">{{item.user_desc}}</div>
                        </div>
                      </div>
                      <div class="col3">
                        <div class="btn db" @click="uploadFile(item)">上传代码</div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </swiper-item>
          <swiper-item>
              <div class="align_center font16 pt15 pb15">请输入体验者微信号</div>
              <div class="form-item bg-white mt12">
                <div class="t-table">
                  <div class="t-cell input-cell v_middle">
                    <input v-model="testerWechatId" type="text" class="input" placeholder="体验者微信号" />
                  </div>
                </div>
              </div>
              <div class="pt15">
                <div class="padding10 bg-green color-white align_center font16" style="width:60%;margin:0 auto;border-radius:10px;" @click="bindUser">提交</div>
              </div>
          </swiper-item>
        </swiper>
      </div>
    </template>
  </template>
  <div v-transfer-dom class="x-popup">
    <popup v-model="showPreview" height="100%">
      <div class="popup1">
        <div class="popup-top flex_center">扫码体验</div>
        <div v-if="disPreview" class="popup-middle font14 flex_center">
            <img v-if="previewQrcode" :src="previewQrcode" style="max-width:90%;max-height:90%;" />
            <div v-else class="flex_cell">
              <div class="align_center">体验码生成失败</div>
              <div class="pt15">
                <div class="padding10 bg-green color-white align_center font16" style="width:60%;margin:0 auto;border-radius:10px;" @click="createTesterCode">生成体验码</div>
              </div>
            </div>
        </div>
        <div class="popup-bottom flex_center">
          <div class="flex_cell h_100 flex_center bg-gray color-white" @click="closePreview">{{ $t('Close') }}</div>
        </div>
      </div>
    </popup>
  </div>
  <div class="modalarea flex_center" v-if="showConfirmModal">
    <div class="modal">
      <div class="pagetop flex_left font16 pl10 pr10">
        <span>提交审核的相关须知</span>
        <div class="close flex_center" @click="closeConfirmModal"><i class="al al-guanbi"></i></div>
      </div>
      <div class="pagemiddle flex_center" style="bottom:100px;">
        <div>
          <div class="align_center"><i class="al al-wenhao" style="color:#10aeff;font-size:72px;"></i></div>
            <div class="align_center font16">确定要提交审核？</div>
            <div class="mt12" style="color:#9a9a9a;">提交给微信团队审核前，请确保:</div>
            <ul style="color:#9a9a9a;">
              <li style="margin:10px 0;">
                <div class="db-in">
                  <div>提交的小程序功能完整，可正常打开和运行，而不是测试版或 Demo</div>
                  <div>小程序的调试和预览可在开发者工具进行。多次提交测试内容或 Demo，将受到相应处罚。</div>
                </div>
              </li>
              <li style="margin:10px 0;">
                <div class="db-in">已仔细阅读<a href="https://developers.weixin.qq.com/miniprogram/product/index.html" target="_blank">《微信小程序平台运营规范》</a>和<a href="https://developers.weixin.qq.com/miniprogram/product/reject.html" target="_blank">《微信小程序平台审核常见被拒绝情形》</a>
                </div>
              </li>
            </ul>
        </div>
      </div>
      <div class="pagebottom" style="height:100px;">
        <div class="font0 align_center">
          <span class="font14 v_top">
            <check-icon class="green color-gray2" :value.sync="isagree" @click.native.stop="clickagree">已阅读并了解平台审核规则</check-icon>
          </span>
        </div>
        <div class="flex_center mt12">
          <div class="flex_cell flex_right pr10">
            <div :class="`btn flex_center ${btncss}`" @click="nextEvent">下一步</div>
          </div>
          <div class="flex_cell flex_left pl10">
            <div class="btn flex_center" @click="closeConfirmModal">取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-transfer-dom class="x-popup">
    <popup v-model="showFactory" height="100%">
      <div class="popup1">
        <div class="popup-top flex_center">选择厂家</div>
        <div ref="scrollProduct" @scroll="handleScroll('scrollProduct')" class="popup-middle">
          <div class="scroll_list" v-if="disFactoryList">
            <div v-if="!factoryData || !factoryData.length" class="scroll_item padding10 color-gray align_center">
              <div class="flex_center" style="height:80px;">暂无厂家数据</div>
            </div>
            <check-icon v-else class="x-check-icon scroll_item" v-for="(item,index) in factoryData" :key="item.id" :value.sync="item.checked" @click.native.stop="radioclick(item,index)">
              <div class="t-table">
                <div class="t-cell pic v_middle w50">
                  <img class="v_middle imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" style="width:40px;height:40px;" />
                </div>
                <div class="t-cell v_middle" style="color:inherit;">
                  <div class="clamp1">{{item.title}}</div>
                </div>
              </div>
            </check-icon>
          </div>
        </div>
        <div class="popup-bottom flex_center">
          <div class="flex_cell bg-gray color-white h_100 flex_center" @click="closeFactoryPopup">{{ $t('Close') }}</div>
          <div class="flex_cell bg-green color-white h_100 flex_center" @click="confirmFactoryPopup">{{ $t('Confirm txt') }}</div>
        </div>
      </div>
    </popup>
  </div>
</div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem, TransferDom, Popup, CheckIcon, XInput, Search, Radio } from 'vux'
import Time from '#/time'
import ENV from 'env'
let self = {}
let pageStart1 = 0
let limit = 20
export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, Popup, CheckIcon, XInput, Search, Radio
  },
  filters: {
    dateFormat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      query: {},
      selectedIndex: 0,
      testerWechatId: '',
      showPreview: false,
      previewQrcode: null,
      disPreview: false,
      showBtn1: false,
      showBtn2: false,
      showBtn3: false,
      showBtn4: false,
      censorData: null,
      disCensorData: false,
      developmentData: [],
      disDevelopmentData: false,
      appid: null,
      isagree: false,
      btncss: '',
      allownext: false,
      showConfirmModal: false,
      showContainer: false,
      haveAppid: false,
      disFactory: false,
      haveFactory: false,
      factory: {},
      showFactory: false,
      factoryData: [],
      disFactoryList: false,
      selectedFactory: null
    }
  },
  methods: {
    initData () {
      this.showBtn1 = false
      this.showBtn2 = false
      this.showBtn3 = false
      this.showBtn4 = false
      this.showContainer = false
      this.haveAppid = false
      this.selectedIndex = 0
      this.testerWechatId = ''
      this.showPreview = false
      this.previewQrcode = null
      this.disPreview = false
      this.censorData = null
      this.disCensorData = false
      this.developmentData = []
      this.disDevelopmentData = false
      this.appid = null
      this.isagree = false
      this.btncss = ''
      this.allownext = false
      this.showConfirmModal = false
      this.factory = {}
      this.showFactory = false
      pageStart1 = 0
      this.factoryData = []
      this.disFactoryList = false
    },
    bindUser () {
      if (self.$util.trim(self.testerWechatId) === '') {
        self.$vux.toast.text('请输入体验者微信号', 'middle')
        return false
      }
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/open/bindTester`, {
        appid: self.appid, wechatId: self.testerWechatId
      }).then(function (res) {
        self.$vux.loading.hide()
        const data = res.data
        let showError = data.error
        if (data.error.search(/user already bind hint/g) > -1) {
          showError = '该用户已绑定过体验者'
        } else if (data.error.search(/user not exist or user cannot be searched hint/g) > -1) {
          showError = '搜索不到该用户。请输入正确的微信号，并确保“微信-我-隐私”中的“通过微信号搜索到我”选项处于打开状态。'
        }
        if (data.flag) {
          self.$vux.toast.text(showError, 'middle')
          self.testerWechatId = ''
        } else {
          self.$vux.alert.show({
            title: '',
            content: showError
          })
        }
      })
    },
    getQRCode () {
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/open/getQRCode`, {
        appid: self.appid
      }).then(function (res) {
        self.$vux.loading.hide()
        const data = res.data
        if (!data.qrcode) {
          self.$vux.toast.show({
            text: data.error,
            type: (data.flag !== 1 ? 'warn' : 'success'),
            time: self.$util.delay(data.error)
          })
          self.previewQrcode = null
        } else {
          self.previewQrcode = data.qrcode
        }
        self.disPreview = true
      })
    },
    previewEvent () {
      if (!self.censorData.code_ver || self.censorData.code_ver === '') {
        self.$vux.toast.text('请先上传代码后再体验！', 'middle')
      } else {
        self.showPreview = true
        self.getQRCode()
      }
    },
    closePreview () {
      self.showPreview = false
    },
    createTesterCode () {
      self.getQRCode()
    },
    submitCensor (item) {
      self.showConfirmModal = true
    },
    closeConfirmModal () {
      self.showConfirmModal = false
    },
    clickagree () {
      if (self.isagree) {
        self.btncss = 'active'
        self.allownext = true
      } else {
        self.btncss = ''
        self.allownext = false
      }
    },
    nextEvent () {
      if (self.allownext) {
        self.$router.push({path: '/wxOpen', query: {'auth_code': self.query.auth_code}})
      }
    },
    showFactoryPopup () {
      this.showFactory = true
      if (!this.factoryData.length) {
        this.getFactory()
      }
    },
    closeFactoryPopup () {
      this.showFactory = false
    },
    radioclick (item, index) {
      this.selectedFactory = item
      for (let i = 0; i < this.factoryData.length; i++) {
        if (this.factoryData[i].id !== item.id) {
          delete this.factoryData[i].checked
        }
      }
      console.log(this.selectedFactory)
    },
    confirmFactoryPopup () {
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/open/bindFactory`, {
        appid: this.appid,
        fid: this.selectedFactory.id
      }).then(res => {
        const data = res.data
        this.$vux.loading.hide()
        this.$vux.toast.show({
          text: data.error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: this.$util.delay(data.error),
          onHide: function () {
            if (data.flag) {
              self.factory.id = self.selectedFactory.id
              self.factory.title = self.selectedFactory.title
              self.haveFactory = true
              console.log(self.factory)
              location.reload()
            }
          }
        })
        this.showFactory = false
      })
    },
    getFactory () {
      const self = this
      const params = { pagestart: pageStart1, limit: limit }
      this.$http.get(`${ENV.BokaApi}/api/factory/list`, {
        params: params
      })
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.factoryData = self.factoryData.concat(retdata)
        self.disFactoryList = true
      })
    },
    handleScroll: function (refname, index) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.factoryData.length === (pageStart1 + 1) * limit) {
            pageStart1++
            self.$vux.loading.show()
            self.getFactory()
          }
        }
      })
    },
    uploadFile (item) {
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/open/commitTemplate`, {
        appid: self.appid,
        templateid: item.template_id
      }).then(res => {
        self.$vux.loading.hide()
        self.$vux.alert.show({
          title: '',
          content: res.data.error,
          onHide () {
            location.reload()
          }
        })
      })
    },
    getAuthInfo () {
      self.$http.get(`${ENV.BokaApi}/api/open/getAuthInfo`, {
        params: {appid: self.appid}
      }).then(res => {
        if (res) {
          let data = res.data
          self.censorData = data.data ? data.data : data
          self.factory.id = self.censorData.fid
          self.factory.title = self.censorData.factoryname
          if (self.factory.id > 0) {
            self.haveFactory = true
          } else {
            self.haveFactory = false
          }
          self.disFactory = true
        }
        self.disCensorData = true
      })
    },
    refresh () {
      this.initData()
      this.query = this.$route.query
      self.appid = self.query.appid ? self.query.appid : null
      if (self.appid) {
        self.haveAppid = true
        self.showContainer = true
        self.getAuthInfo()
      } else {
        self.$http.get(`${ENV.BokaApi}/api/open/getAuthAppId`, {
          params: {authcode: self.query.auth_code}
        }).then(function (res) {
          let data = res.data
          if (data.flag) {
            self.appid = data.data
            self.haveAppid = true
            self.showContainer = true
            self.getAuthInfo()
          } else {
            self.haveAppid = false
            self.showContainer = true
          }
        })
      }
      self.$http.get(`${ENV.BokaApi}/api/open/getTemplates`).then(function (res) {
        let data = res.data
        self.developmentData = data.data ? data.data : data
        self.disDevelopmentData = true
      })
    }
  },
  activated () {
    self = this
    this.refresh()
  }
}
</script>
<style lang="less">
.mpsetting{padding:20px;box-sizing: border-box;background-color:#f8f9fb;}
.mpsetting{padding:20px 20px 100px;box-sizing: border-box;background-color:#f8f9fb;}
.mpsetting .bigtitle{font-size:16px;}
.mpsetting .tiptxt{margin-top:10px;background-color:#eff1f3;padding:5px 10px;color:#353535;}
.boxlist{margin-top:10px;}
.boxlist .boxitem{
  background-color:#fff;border-radius: 4px;
  box-shadow: 0 1px 2px rgba(150,150,150,0.3);padding: 20px 30px 30px;
}
.boxlist .boxitem:not(:last-child){margin-bottom:10px;}
.boxlist .title{font-size:20px;font-weight:400;margin-bottom:30px;}
.boxlist .col1{width:100px;text-align:left;}
.boxlist .col3{padding:0 10px;}
.boxlist .col4{padding:0 10px;position:relative;}
.boxlist .btn{
  display: inline-block;overflow: visible;
  height: 30px;line-height: 30px;vertical-align: middle;text-align: center;
  border-radius: 3px;border-width: 1px;border-style: solid;cursor: pointer;
  background-color: #1aad19;
  background-image: -moz-linear-gradient(top,#1aad19 0,#1aad19 100%);
  background-image: -webkit-gradient(linear,0 0,0 100%,from(#1aad19),to(#1aad19));
  background-image: -webkit-linear-gradient(top,#1aad19 0,#1aad19 100%);
  background-image: -o-linear-gradient(top,#1aad19 0,#1aad19 100%);
  background-image: linear-gradient(to bottom,#1aad19 0,#1aad19 100%);
  border-color: #1aad19;
  color: #fff;
}
.boxlist .col3 .btn{padding:0 22px;}
.boxlist .col4 .btn{padding:0 11px;}
.boxlist .col4 .btn .al{font-size:14px;font-weight:bold;}
.boxlist .gray{color:#9a9a9a;}
.boxlist .btnlayer{
  border-radius: 4px;box-shadow: 0 0 20px #e4e8eb;background-color: #fff;text-align: center;
  position: absolute;right: -45px;margin-top: 10px;z-index: 9;
}
.boxlist .btnlayer.active{display:block;}
.btnlayer .item{min-width:90px;padding: 0 22px;line-height:40px;color:#353535;}
.btnlayer .item:not(:last-child){border-bottom: 1px solid #e7e7eb;}

.scroll_list .scroll_item:not(:first-child){padding-top:20px;}

.mpsetting .modalarea ul{list-style:none;}
.mpsetting .modalarea li:before {float:left;color: #e7e7eb;content: "●";margin-right: 1em;}
.mpsetting .modalarea a{color: #576b95;}
.mpsetting .modalarea .btn{
  color: #353535;width:110px;text-align:center;
  background-image: linear-gradient(to bottom,#fbfbfb 0,#fbfbfb 100%);
  border: #e4e8eb 1px solid;
}
.mpsetting .modalarea .btn.active{
  color:#fff;
  background-image: linear-gradient(to bottom,#1aad19 0,#1aad19 100%);
  border: #1aad19 1px solid;
}
.setitem{border-bottom: 1px dashed #e7e7eb;}
.setitem .lineitem{padding-top:25px;}
.mpsetting .addarea{padding: 10px;}
.addarea .btnadd{width:130px;}
.addarea .icon{
  width:22px;height:22px;margin-right:5px;
  border:#576b95 1px solid;border-radius:50%;line-height:22px;text-align:center;color:#576b95;
}
</style>
