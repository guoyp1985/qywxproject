<template>
<div class="containerarea mpsetting font14">
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
            <div class="title">审核版本</div>
            <template v-if="disCensorData">
              <div v-if="!censorData" class="pt20 pb20 flex_left">暂无审核数据</div>
              <div v-else class="scroll_list">
                <div class="db-flex pb20 scroll_item">
                  <div class="col1">
                    <div>
                      <div class="gray">版本号</div>
                      <div class="font22">{{censorData.code_ver}}</div>
                      <!--
                      <div>
                        <div class="btn1">审核不通过</div>
                      </div>
                    -->
                    </div>
                  </div>
                  <div class="col2 flex_cell">
                    <!--
                    <div class="flex_left">
                      <div class="gray w100">开发者</div>
                      <div class="flex_cell">{{censorData.user_name}}</div>
                    </div>
                  -->
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
                    <div class="btn">详情</div>
                  </div>
                  <div class="col4">
                    <div class="btn" @click="clickBtn2"><i class="al al-jiantou_down"></i></div>
                    <div v-if="showBtn2" class="btnlayer">
                      <div class="item">撤回审核</div>
                    </div>
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
                    <!--
                    <div class="btn">详情</div>
                  -->
                    <div class="btn db" @click="uploadFile(item)">上传代码</div>
                    <div class="btn db mt12" @click="uploadFile(item)">提交审核</div>
                  </div>
                  <!--
                  <div class="col4">
                    <div class="btn" @click="clickBtn3"><i class="al al-jiantou_down"></i></div>
                    <div v-if="showBtn3" class="btnlayer">
                      <div class="item">选为体验版本</div>
                      <div class="item">删除</div>
                    </div>
                  </div>
                -->
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
</div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem, TransferDom, Popup } from 'vux'
import Time from '#/time'
import ENV from 'env'
let self = {}
export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, Popup
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
      appid: null
    }
  },
  methods: {
    initBtn () {
      this.showBtn1 = false
      this.showBtn2 = false
      this.showBtn3 = false
      this.showBtn4 = false
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
        self.$vux.toast.show({
          text: data.error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag) {
              self.testerWechatId = ''
            }
          }
        })
      })
    },
    getQRCode () {
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/open/getQRCode`, {
        appid: self.appid
      }).then(function (res) {
        self.$vux.loading.hide()
        const data = res.data
        self.$vux.toast.show({
          text: data.error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: self.$util.delay(data.error)
        })
        if (data.flag) {
          self.previewQrcode = data.data
        } else {
          self.previewQrcode = null
        }
        self.disPreview = true
      })
    },
    previewEvent () {
      self.showPreview = true
      self.getQRCode()
    },
    closePreview () {
      self.showPreview = false
    },
    createTesterCode () {
      self.getQRCode()
    },
    clickBtn1 () {
      if (this.showBtn1) {
        this.initBtn()
      } else {
        this.initBtn()
        this.showBtn1 = true
      }
    },
    clickBtn2 () {
      if (this.showBtn2) {
        this.initBtn()
      } else {
        this.initBtn()
        this.showBtn2 = true
      }
    },
    clickBtn3 () {
      if (this.showBtn3) {
        this.initBtn()
      } else {
        this.initBtn()
        this.showBtn3 = true
      }
    },
    clickBtn4 () {
      if (this.showBtn4) {
        this.initBtn()
      } else {
        this.initBtn()
        this.showBtn4 = true
      }
    },
    uploadFile (item) {
      const self = this
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/open/commitTemplate`, {
        appid: self.appid,
        templateid: item.template_id
      }).then(res => {
        self.$vux.loading.hide()
        self.$vux.alert.show({
          title: '',
          content: res.data.error
        })
      })
    },
    refresh () {
      const self = this
      this.query = this.$route.query
      self.$http.get(`${ENV.BokaApi}/api/open/getAuthAppId`, {
        params: {authcode: self.query.auth_code}
      }).then(function (res) {
        let data = res.data
        if (data.flag) {
          self.appid = data.data
          return self.$http.get(`${ENV.BokaApi}/api/open/getAuthInfo`, {
            params: {appid: self.appid}
          })
        }
      }).then(res => {
        if (res) {
          let data = res.data
          self.censorData = data.data ? data.data : data
        }
        self.disCensorData = true
      })
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
</style>
