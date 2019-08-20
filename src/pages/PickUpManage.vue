<template>
  <div id="pickup-manage-page" class="containerarea bg-page font14">
    <div class="s-topbanner s-topbanner1">
      <div class="row">
        <tab v-model="selectedIndex" class="" active-color="#ea3a3a" default-color="#666666">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == selectedIndex" :key="index" @on-item-click="onItemClick()">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container s-container1" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
      <!-- 待发货 -->
      <div v-show="(selectedIndex == 0)">
        <div v-if="!tabData1 || tabData1.length === 0" class="scroll_item padding10 align_center color-gray">
          <div><i class="al al-wushuju font60 pt20"></i></div>
          <div class="mt5">暂无相关订单！</div>
        </div>
        <div v-if="disList1" class="scroll_list">
          <template v-for="(item,index) in tabData1" :index="index">
            <input type="hidden" :ref="`idvalue-${index}`" :value="`${item.id}`" />
            <div class="bk-orderitem order-item scroll_item mb10 font14 db list-shadow">
              <div class="bg-white padding10 b_bottom_after font12 flex_left">
                <div class="color-lightgray">经销商：{{item.linkman}}</div>
              </div>
              <PickUpOrderplate :product="item"></PickUpOrderplate>
              <div class="bg-white padding10 b_top_after b_bottom_after color-gray5">
                <div>
                  <div class="font12 color-lightgray">
                    <span class="middle-cell mr10 v_middle">收货信息:</span><span class="v_middle">{{item.address}}</span>
                    <span @click="copyTxt(item)" class="ml5" style="position:relative;">
                      <i class="al al-fuzhi font14 color-red4"></i><span class="font12 color-red4">复制</span>
                      <div :class="`deliver_txt-0-${item.id}`" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{item.address}}</div>
                    </span>
                  </div>
                  <div class="t-table pt5 color-lightgray font13 deliverarea">
                    <div class="t-cell v_middle appendcontrol align_right w80">
                        <div class="qbtn4 font12" style="padding:1px 14px;" @click="confirmPrice(`${index}`, item)">发货</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <!-- 已发货 -->
      <div v-show="(selectedIndex == 1)">
        <div v-if="!tabData2 || tabData2.length === 0" class="scroll_item padding10 align_center color-gray">
          <div><i class="al al-wushuju font60 pt20"></i></div>
          <div class="mt5">暂无相关订单！</div>
        </div>
        <div v-if="disList2" class="scroll_list">
          <template v-for="(item,index) in tabData2">
            <div class="bk-orderitem order-item scroll_item mb10 font14 db list-shadow">
              <div class="bg-white padding10 b_bottom_after font12 flex_left">
                <div class="color-lightgray">经销商：{{item.linkman}}</div>
              </div>
              <PickUpOrderplate :product="item"></PickUpOrderplate>
              <div class="bg-white padding10 b_top_after b_bottom_after color-gray5">
                <div>
                  <div class="font12 color-lightgray">
                    <span class="middle-cell mr10 v_middle">收货信息:</span><span class="v_middle">{{item.address}}</span>
                    <span @click="copyTxt(item)" class="ml5" style="position:relative;">
                      <i class="al al-fuzhi font14 color-red4"></i><span class="font12 color-red4">复制</span>
                      <div :class="`deliver_txt-1-${item.id}`" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{item.address}}</div>
                    </span>
                  </div>
                  <div class="t-table pt5 color-lightgray font13 deliverarea">
                    <div class="t-cell v_middle appendcontrol align_right w80">
                        <div class="qbtn4 font12" style="padding:1px 14px;">已发货</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div v-if="showServiceModal" class="auto-modal refund-modal flex_center">
      <div class="modal-inner border-box" style="width:80%;">
        <div class="align_center font18 bold pb10 b_bottom_after color-theme pt20">发货</div>
        <div class="align_left txt padding10 b_bottom_after">
          <group class="textarea-outer" style="padding:0;">
            <x-textarea
              ref="serviceTextarea"
              v-model="serviceContent"
              name="title" class="x-textarea noborder"
              placeholder="请输入"
              :show-counter="false"
              :rows="6"
              :max="200"
              @on-change="textareaChange('serviceTextarea')"
              @on-focus="textareaFocus('serviceTextarea')"
              autosize>
            </x-textarea>
          </group>
        </div>
        <form enctype="multipart/form-data">
          <input ref="fileInput" class="hide" type="file" name="files" @change="fileChange" />
        </form>
        <div class="q_photolist align_left bg-white">
          <template v-if="servicePhoto && servicePhoto != ''">
            <div class="photoitem" style="width:100px;">
              <div class="inner photo imgcover">
                <img :src="servicePhoto" class="pic" @click="uploadPhoto('fileInput')" />
                <div class="close" @click.stop="deletephoto()">×</div>
              </div>
            </div>
          </template>
          <div v-else class="photoitem add" @click="uploadPhoto('fileInput')" style="width:100px;">
            <div class="inner">
              <div class="innerlist">
                <div class="flex_center h_100">
                  <i class="al al-zhaopian" style="color:#bbb;line-height:30px;"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex_center b_top_after" style="height:50px;">
          <div class="flex_cell flex_center h_100 b_right_after" @click="closeService">取消</div>
          <div class="flex_cell flex_center h_100 color-orange" @click="submitService">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Time from '#/time'
import jQuery from 'jquery'
import ENV from 'env'
import {Tab, TabItem, XTextarea, Group} from 'vux'
import {User} from '#/storage'
import PickUpOrderplate from '@/components/PickUpOrderplate'

export default {
  components: {
    PickUpOrderplate, Tab, TabItem, XTextarea, Group
  },
  data () {
    return {
      tabData1: [],
      tabData2: [],
      disList1: false,
      disList2: false,
      pageStart1: 0,
      pageStart2: 0,
      limit: 10,
      selectedIndex: 0,
      tabtxts: ['待发货', '已发货'],
      showServiceModal: false,
      serviceContent: '',
      servicePhoto: '',
      loginUser: {},
      index: 0,
      clickData: {}
    }
  },
  methods: {
    init () {
      this.getData1()
    },
    handleScroll: function (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          switch (self.selectedIndex) {
            case 0:
              if (self.tabData1.length === (self.pageStart1 + 1) * self.limit) {
                self.pageStart1++
                self.getData1()
              }
              break
            case 1:
              if (self.tabData2.length === (self.pageStart2 + 1) * self.limit) {
                self.pageStart2++
                self.getData2()
              }
              break
          }
        }
      })
    },
    getData1 (isone) {  // 获取待发货订单数据
      this.$vux.loading.show()
      const self = this
      let params = {dealed: 0, pagestart: self.pageStart1, limit: self.limit, fid: self.loginUser.fid}  // 问题：页面需要厂家id，目前是死值 【已解决】
      if (isone) {
        params = {dealed: 0, pagestart: self.tabData1.length, limit: 1}
      }
      self.$http.post(`${ENV.BokaApi}/api/agent/applyList`,
        params
      ).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabData1 = self.tabData1.concat(retdata)
        self.disList1 = true
        console.log('----response-----')
        console.log(self.tabData1)
      })
    },
    getData2 (isone) {  // 获取已发货订单数据
      this.$vux.loading.show()
      const self = this
      let params = {dealed: 1, pagestart: self.pageStart2, limit: self.limit, fid: self.loginUser.fid}
      if (isone) {
        params = {dealed: 1, pagestart: self.tabData2.length, limit: 1}
      }
      self.$http.post(`${ENV.BokaApi}/api/agent/applyList`,
        params
      ).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        self.tabData2 = self.tabData2.concat(retdata)
        self.disList2 = true
        console.log('----response-----')
        console.log(self.tabData2)
      })
    },
    onItemClick () {  // 选择对应tab获取对应订单状态列表数据
      const self = this
      switch (this.selectedIndex) {
        case 0:
          if (this.tabData1.length < this.limit) {
            self.pageStart1 = 0
            self.disList1 = false
            this.tabData1 = []
            self.getData1()
          }
          break
        case 1:
          if (this.tabData2.length < this.limit) {
            self.pageStart2 = 0
            self.disList2 = false
            this.tabData2 = []
            self.getData2()
          }
          break
      }
    },
    copyTxt (item) {
      const self = this
      let str = `#pickup-manage-page .deliver_txt-${this.selectedIndex}-${item.id}`
      let eleobj = jQuery(str)[0]
      let range = null
      console.log('查看复制内容')
      console.log(eleobj.innerHTML)
      let save = function (e) {
        console.log(e)
        e.clipboardData.setData('text/plain', eleobj.innerHTML)
        e.preventDefault()
      }
      if (self.$util.isIOS()) { // ios设备
        console.log('----ios---')
        window.getSelection().removeAllRanges()
        range = document.createRange()
        range.selectNode(eleobj)
        window.getSelection().addRange(range)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
      } else { // 安卓设备
        console.log('in android')
        document.addEventListener('copy', save)
        document.execCommand('copy')
        document.removeEventListener('copy', save)
      }
      setTimeout(function () {
        self.$vux.toast.show({
          text: '复制成功',
          time: 1500
        })
      }, 200)
    },
    closeService () {
      this.showServiceModal = false
      this.serviceContent = ''
      this.servicePhoto = ''
    },
    submitService () {
      // this.showServiceModal = false
      console.log(this.clickData)
      if (this.$util.trim(this.serviceContent) === '' && this.$util.trim(this.servicePhoto) === '') {
        this.$vux.toast.text('请完善售后信息', 'middle')
        return false
      }
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/agent/dealApply`, {
        id: this.clickData.id, content: this.serviceContent, contentphoto: this.servicePhoto
      }).then(res => {
        this.$vux.loading.hide()
        const data = res.data
        this.$vux.toast.text(data.error)
        if (data.flag) {
          this.showServiceModal = false
          this.refresh()
        }
      })
    },
    confirmPrice (itemindex, data) {
      this.index = itemindex
      this.clickData = data
      this.showServiceModal = true
    },
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
    deletephoto () {
      this.servicePhoto = ''
    },
    photoCallback (data) {
      const self = this
      if (data.flag === 1) {
        self.servicePhoto = data.data
      } else if (data.error) {
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error)
        })
      }
    },
    refresh () {
      this.tabData1 = []
      this.pageStart1 = 0
      this.disList1 = false
      this.tabData2 = []
      this.pageStart2 = 0
      this.disList2 = false
      this.selectedIndex = 0
      this.servicePhoto = ''
      this.serviceContent = ''
      this.getData1()
    }
  },
  activated () {
  },
  created () {
    this.loginUser = User.get()
    console.log('-----loginUser-----')
    console.log(this.loginUser.fid)
    this.init()
  }
}
</script>
<style lang="less">
</style>
