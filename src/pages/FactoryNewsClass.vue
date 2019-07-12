<template>
  <div class="containerarea s-havebottom font14 rnews bg-page">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <form ref="fileForm" enctype="multipart/form-data">
        <input ref="fileInput" class="hide" type="file" name="files" @change="fileChange('fileForm')" />
      </form>
      <div class="pagetop b_bottom_after flex_center" style="height:55px;">
        <search
          class="v-search"
          v-model='searchword1'
          :auto-fixed="autofixed"
          @on-submit="onSubmit1"
          @on-change="onChange1"
          @on-cancel="onCancel1"
          ref="search">
        </search>
      </div>
      <div class="pagemiddle scroll-container" style="top:55px;" ref="scrollContainer" @scroll="handleScroll('scrollContainer','factorynews')">
        <div v-if="distabdata1" class="scroll_list ">
          <div v-if="!tabdata1 || tabdata1.length === 0" class="scroll_item padding10 color-gray align_center">
            <template v-if="searchresult1">
              <div class="flex_center" style="height:80px;">暂无搜索结果</div>
            </template>
            <template v-else>
              <div class="t-table" style="padding-top:20%;">
                <div class="t-cell v_middle">
                  <div><i class="al al-wushuju font60 pt20"></i></div>
                  <div class="mt5">空空如也~</div>
                  <div class="align_center mt5">赶快<router-link :to="{path: '/addFactoryNews', query: {fid: query.fid}}" class="color-blue">创建文章</router-link>，为卖家提供素材可有效提高销量哦</div>
                </div>
              </div>
            </template>
          </div>
          <router-link :to="{path: '/factoryNewsList', query: {classid: item.id, fid: query.fid}}" v-else v-for="(item,index1) in tabdata1" :key="item.id" class="list-shadow scroll_item db pt10 pb10 pl12 pr12 bg-white mb10">
            <div class="t-table">
              <div class="t-cell v_middle w70">
                <img class="imgcover" style="width:60px;height:60px;" :src="$util.getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
              </div>
              <div class="t-cell v_middle">
                <div class="clamp1 font14 color-lightgray"><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{item.title}}</div>
                <div class="clamp1 font14 color-gray v_middle mt5">
                </div>
              </div>
              <div class="align_right t-cell v_bottom w80 pb8">
                  <div class="btnicon bg-red color-white font12" @click="clickEdit(item,index1)">编辑</div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="s-bottom list-shadow flex_center bg-white pl12 pr12">
        <div class="flex_cell flex_center btn-bottom-red" @click="addClass">创建文章类别</div>
      </div>
      <div v-transfer-dom>
        <popup class="menuwrap" v-model="showpopup">
          <div class="popup0 bg-white">
            <div class="form-item required bg-white">
              <div class="t-table">
                <div class="t-cell title-cell w80 font14 v_middle">分类名称<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
                <div class="t-cell input-cell v_middle" style="position:relative;">
                  <group class="textarea-outer" style="padding:0;">
                    <x-textarea
                      ref="titleTextarea"
                      v-model="classTitle"
                      name="title" class="x-textarea noborder"
                      placeholder="分类名称"
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
            <div class="pl12 pr12 pt10 b_top_after bg-white">封面图<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;"></span></div>
            <div class="b_bottom_after bg-white pl12 pr12 pb5">
              <div class="q_photolist align_left bg-white">
                <div class="photoitem">
                  <div class="inner photo imgcover" style="border:#ccc 1px solid;" @click="uploadPhoto('fileInput')">
                    <img v-if="coverPhoto && coverPhoto != ''" :src="coverPhoto" class="pic" />
                    <div v-else class="pic flex_center"><i class="al al-zhaopian color-gray"></i></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex_center padding20">
              <div class="flex_cell flex_center" @click="closePopup">
                <div class="flex_center btn-bottom-red" style="width:80%;background-color:#ccc;">取消</div>
              </div>
              <div class="flex_cell flex_center" @click="submitClass">
                <div class="flex_center btn-bottom-red" style="width:80%;">提交</div>
              </div>
            </div>
          </div>
        </popup>
      </div>
    </template>
  </div>
</template>

<i18n>
Goodeazy:
  zh-CN: 易采集
Create news:
  zh-CN: 创建文章
Control text:
  zh-CN: 操作
</i18n>

<script>
import { TransferDom, Popup, CheckIcon, XImg, Search, Group, XInput, XTextarea } from 'vux'
import Time from '#/time'
import { User } from '#/storage'
import ENV from 'env'
import Sos from '@/components/Sos'

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup, CheckIcon, XImg, Search, Sos, Group, XInput, XTextarea
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    },
    photoFormat: function (photo) {
      const self = this
      let parr = photo.split(',')
      let retphoto = parr[0]
      return self.$util.getPhoto(retphoto)
    }
  },
  data () {
    return {
      showSos: false,
      sosTitle: '抱歉，您暂无权限访问此页面！',
      showContainer: false,
      query: {},
      loginUser: {},
      autofixed: false,
      tabtxts: [ '我的文章', '采集记录' ],
      tabmodel: 0,
      distabdata1: false,
      distabdata2: false,
      tabdata1: [],
      tabdata2: [],
      controldata: [
        { key: 'set', title: '更多设置' },
        { key: 'stat', title: '统计' }
      ],
      showpopup: false,
      clickdata: {},
      clickIndex: 0,
      limit: 10,
      pagestart1: 0,
      pagestart2: 0,
      searchword1: '',
      searchresult1: false,
      coverPhoto: '',
      classTitle: '',
      submitIng: false
    }
  },
  methods: {
    textareaChange (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
      setTimeout(function () {
        curArea.updateAutosize()
      }, 50)
    },
    textareaFocus (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    photoCallback (data) {
      if (data.flag === 1) {
        this.coverPhoto = data.data
      } else if (data.error) {
        this.$vux.toast.show({
          text: data.error,
          time: this.$util.delay(data.error)
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
            maxnum: 1,
            handleCallback: function (data) {
              self.photoCallback(data)
            }
          })
        })
      }
    },
    fileChange (refname) {
      const self = this
      const target = event.target
      const files = target.files
      if (files.length > 0) {
        let fileForm = target.parentNode
        const filedata = new FormData(fileForm)
        self.$vux.loading.show()
        self.$http.post(`${ENV.BokaApi}/api/upload/files`, filedata).then(res => {
          self.$vux.loading.hide()
          let data = res.data
          self.photoCallback(data)
        })
      }
    },
    addClass () {
      this.showpopup = true
    },
    closePopup () {
      this.showpopup = false
      this.clickdata = null
      this.clickIndex = 0
    },
    submitClass () {
      if (!this.submitIng) {
        let postdata = {title: this.classTitle, photo: this.coverPhoto, fid: this.query.fid}
        if (this.clickdata && this.clickdata.id) {
          postdata.id = this.clickdata.id
        }
        if (this.$util.trim(postdata.title) === '') {
          this.$vux.toast.text('请输入分类名称', 'middle')
          return false
        }
        if (this.$util.trim(postdata.photo) === '') {
          this.$vux.toast.text('请上传分类封面图', 'middle')
          return false
        }
        this.submitIng = false
        this.$vux.loading.show()
        this.$http.post(`${ENV.BokaApi}/api/add/factorynewsclass`, postdata).then(res => {
          const data = res.data
          this.$vux.loading.hide()
          this.$vux.toast.show({
            text: data.error,
            type: data.flag !== 1 ? 'warn' : 'success',
            time: this.$util.delay(data.error)
          })
          if (data.flag) {
            this.showpopup = false
            if (postdata.id) {
              this.tabdata1[this.clickIndex] = data.datainfo
            } else {
              if (this.tabdata1.length === (this.pagestart1 + 1) * this.limit) {
                this.tabdata1.splice(this.tabdata1.length - 1, 1)
              }
              this.tabdata1 = [data.datainfo].concat(this.tabdata1)
            }
            this.clickdata = null
            this.clickIndex = 0
          }
        })
      }
    },
    handleScroll (refname, type) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (type === 'factorynews') {
            if (self.tabdata1.length === (self.pagestart1 + 1) * self.limit) {
              self.pagestart1++
              self.$vux.loading.show()
              self.getData1()
            }
          } else if (type === 'customer') {
            if (self.customerdata.length === (self.customerPagestart + 1) * self.limit) {
              self.customerPagestart++
              self.$vux.loading.show()
              self.getCustomerdata()
            }
          }
        }
      })
    },
    getData1 () {
      const self = this
      const params = {fid: self.query.fid, pagestart: self.pagestart1, limit: self.limit}
      let keyword = self.searchword1
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult1 = true
        params.keyword = keyword
      } else {
        self.searchresult1 = false
      }
      self.$http.get(`${ENV.BokaApi}/api/list/factorynewsclass`, {
        params: params
      }).then(function (res) {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.distabdata1 = true
      })
    },
    onChange1 (val) {
      this.searchword1 = val
    },
    onCancel1 () {
      const self = this
      self.searchword1 = ''
      self.$vux.loading.show()
      self.distabdata1 = false
      self.tabdata1 = []
      self.pagestart1 = 0
      self.getData1()
    },
    onSubmit1 () {
      const self = this
      self.$vux.loading.show()
      self.distabdata1 = false
      self.tabdata1 = []
      self.pagestart1 = 0
      self.getData1()
    },
    clickEdit (item, index) {
      event.preventDefault()
      this.showpopup = !this.showpopup
      this.clickdata = item
      this.clickIndex = index
      this.coverPhoto = item.photo
      this.classTitle = item.title
    },
    getCustomerdata () {
      const self = this
      self.$vux.loading.show()
      let params = { params: { pagestart: self.customerPagestart, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/retailer/sellersList`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        self.customerdata = self.customerdata.concat(retdata)
      })
    },
    clickpopup (key, item) {
      const self = this
      self.showpopup = false
    },
    getDateState (dt) {
      return this.$util.getDateState(dt)
    },
    getDateClass (dt) {
      let ret = this.$util.getDateClass(dt)
      ret = `${ret} mr5`
      return ret
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      if (this.loginUser) {
        this.$vux.loading.show()
        let isAdmin = false
        for (let i = 0; i < self.loginUser.usergroup.length; i++) {
          if (self.loginUser.usergroup[i] === 1) {
            isAdmin = true
            break
          }
        }
        if (!(self.loginUser.fid && parseInt(self.loginUser.fid) === parseInt(self.$route.query.fid)) && !isAdmin) {
          this.$vux.loading.hide()
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          self.$vux.loading.hide()
          this.query = this.$route.query
          if (this.tabdata1.length < this.limit) {
            this.distabdata1 = false
            this.tabdata1 = []
            this.$vux.loading.show()
            self.pagestart1 = 0
            this.getData1()
          }
        }
      }
    }
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.rnews .bk-listplate1 .iconcell{width:45px;}
.vux-popup-dialog .weui-cell__bd{text-align:center;}
.vux-popup-dialog .weui-cell__ft{display:none;}
.rnews .collect{
  background:#ee9f25;
  color: #fff;
  width: 171px;
  height: 36px;
  margin: 0 auto;
  border-radius: 50px;
}
.rnews .s-bottom{
  height: 50px;
}
.rnews .btnicon{
  display: inline-block;
  color: #ea3a3a;
  border: 1px solid #ea3a3a;
  text-align: center;
  border-radius: 30px;
  letter-spacing: 0px;
  height: 21px;
  width: 41px;
  line-height: 21px;
}
</style>
