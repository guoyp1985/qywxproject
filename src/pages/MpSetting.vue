<template>
<div class="containerarea mpsetting font14">
  <div class="bigtitle">开发管理</div>
  <!--
  <div class="tiptxt flex_left">
    <div class="w40">
      <span class="al al-gantanhaozhong color-blue"></span>
    </div>
    <div class="v_middle flex_cell flex_cell">你已暂停小程序的服务，用户不可正常访问线上版本小程序。暂停服务不影响小程序代码提交审核及发布。</div>
  </div>
-->
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
              <div class="btn" @click="uploadFile(item)">上传代码</div>
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
</div>
</template>

<script>
import Time from '#/time'
import ENV from 'env'
export default {
  filters: {
    dateFormat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      query: {},
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
