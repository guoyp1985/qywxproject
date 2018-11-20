<template>
  <div class="containerarea font14 havetoptab bg-page concession">
    <div class="s-topbanner s-topbanner1">
      <div class="row">
        <tab v-model="selectedIndex" active-color="#ea3a3a" default-color="#666666">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index" @on-item-click="clickTab(index)">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container s-container1">
      <swiper v-model="selectedIndex" class="x-swiper no-indicator" @on-index-change="swiperChange">
        <swiper-item v-for="(tabitem, index) in tabtxts" :key="index">
          <div v-if="index === 0" class="swiper-inner scroll-container1" ref="scrollContainer" @scroll="handleScroll('scrollContainer1',index)">
            <template v-if="disList1">
              <div v-if="!tabdata1 || tabdata1.length === 0" class="w_100 h_100 flex_center color-gray">暂无有效的优惠码</div>
              <div v-else class="lists">
                <div v-for="(item,index1) in tabdata1" :key="index1" class="scroll_item item-list">
                  <div class="list">
                    <div class="math">{{item.code}}</div>
                    <div class="date">生成时间: {{item.dateline | dateFormat}}</div>
                  </div>
                  <div class="btncopy mt25 mr10" @click="copyTxt(item)">复制
                    <div class="copy_txt" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ item.code }}</div>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div v-if="index === 1" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer2',index)">
            <template v-if="disList2">
              <div v-if="!tabdata2 || tabdata2.length === 0" class="w_100 h_100 flex_center color-gray">暂无已使用的优惠码</div>
              <div v-else class="lists">
                <div v-for="(item,index1) in tabdata2" :key="index1" class="scroll_item item-list">
                  <div class="list">
                    <div class="math">54785874</div>
                    <div class="date">有效期至 2019年11月15日</div>
                  </div>
                  <div class="btncopy mt25 mr10">复制</div>
                </div>
              </div>
            </template>
          </div>
          <!--
          <template v-if="index == 1">
            <div class="list-item">
              <div class="inner">
                <img src="../assets/images/sren.jpg" />
              </div>
              <div class="used pt5">
                <span class="math">54785874</span>
                <div class="date">有效期至 2019年11月15日</div>
              </div>
            </div>
          </template>
        -->
        </swiper-item>
      </swiper>
    </div>
    <div class="s-bottom flex_center list-shadow02 bg-white">
      <div class="flex_center btn-bottom-red" style="width:85%;" @click="btnshow">生成优惠码</div>
    </div>
    <div v-if="showModal" class="modal-layer flex_center">
      <div class="modal">
        <div class="txt1 pb10">生成优惠码</div>
        <div class="mt10">数量:<input type="number" v-model="quantity"/>个</div>
        <div class="font12 mt5 ml20"><span style="color:red;">*</span>每个优惠码100元，目前免费</div>
        <div class="bom mt25">
          <div class="close" @click="btnclose">取消</div>
          <div class="close color-white" style="background-color:#F85B52;" @click="createCode">立即生成</div>
        </div>
      </div>
      <div class="mceng"></div>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem, TransferDom } from 'vux'
import ENV from 'env'
import Time from '#/time'
import { User } from '#/storage'
import jQuery from 'jquery'

const limit = 10
let pageStart1 = 0
let pageStart2 = 0

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem
  },
  data () {
    return {
      loginUser: {},
      query: {},
      showApply: false,
      showContainer: false,
      retailerInfo: {},
      tabtxts: [ '有效码', '已使用' ],
      selectedIndex: 0,
      disList1: false,
      disList2: false,
      tabdata1: [],
      tabdata2: [],
      showModal: false,
      quantity: ''
    }
  },
  filters: {
    dateFormat: function (dt) {
      return new Time(dt * 1000).dateFormat('yyyy-MM-dd')
    }
  },
  methods: {
    btnshow () {
      this.showModal = true
    },
    btnclose () {
      this.showModal = false
    },
    copyTxt () {
      const self = this
      let eleobj = jQuery('.concession .copy_txt')[0]
      let range = null
      let save = function (e) {
        e.clipboardData.setData('text/plain', eleobj.innerHTML)
        e.preventDefault()
      }
      if (self.$util.isIOS()) { // ios设备
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
    handleScroll: function (refname, index) {
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          switch (self.selectedIndex) {
            case 0:
              if (self.tabdata1.length === (pageStart1 + 1) * limit) {
                pageStart1++
                self.getData1()
              }
              break
            case 1:
              if (self.tabdata2.length === (pageStart2 + 1) * limit) {
                pageStart2++
                self.getData2()
              }
              break
          }
        }
      })
    },
    getData1 () {
      const self = this
      let params = { pagestart: pageStart1, limit: limit, used: 0, fid: self.query.id }
      self.$http.get(`${ENV.BokaApi}/api/factory/listRetailerCode`, {
        params: params
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.disList1 = true
      })
    },
    getData2 () {
      const self = this
      let params = { pagestart: pageStart1, limit: limit, used: 1, fid: self.query.id }
      self.$http.get(`${ENV.BokaApi}/api/factory/listRetailerCode`, {
        params: params
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        self.disList2 = true
      })
    },
    clickTab () {
    },
    swiperChange () {
      console.log('in swiperChange')
      const self = this
      switch (this.selectedIndex) {
        case 0:
          if (this.tabdata1.length < limit) {
            pageStart1 = 0
            self.disList1 = false
            this.tabdata1 = []
            self.getData1()
          }
          break
        case 1:
          if (this.tabdata2.length < limit) {
            pageStart2 = 0
            self.disList2 = false
            this.tabdata2 = []
            self.getData2()
          }
          break
      }
    },
    createCode () {
      const self = this
      if (!self.quantity) {
        self.$vux.toast.text('请输入正确的数量', 'middle')
        return false
      }
      self.showModal = false
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/factory/createRetailerCode`, {
        fid: self.query.id,
        quantity: self.quantity
      }).then(function (res) {
        const data = res.data
        self.$vux.loading.hide()
        const retdata = data.data ? data.data : data
        if (data.flag === 2) {
          location.replace(`${ENV.Host}/#/pay?id=${data.orderid}`)
        } else {
          self.$vux.toast.show({
            text: data.error,
            type: (data.flag !== 1 ? 'warn' : 'success'),
            time: self.$util.delay(data.error),
            onHide: function () {
              self.tabdata1 = self.tabdata1.concat(retdata)
            }
          })
        }
      })
    },
    initContainer () {
      const self = this
      self.showApply = false
      self.showContainer = false
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.$vux.loading.show()
      this.loginUser = User.get()
      if (this.loginUser && (this.loginUser.subscribe === 1 || this.loginUser.isretailer)) {
        if (!this.loginUser.isretailer) {
          this.$vux.loading.hide()
          self.initContainer()
          this.showApply = true
        } else {
          this.$vux.loading.hide()
          this.query = this.$route.query
          if (this.tabdata1.length < limit || this.query.from === 'add') {
            self.initContainer()
            pageStart1 = 0
            this.tabdata1 = []
            this.getData1()
          }
        }
        // }
      }
    }
  },
  activated () {
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less" scoped>
.concession .item-list{width:100%;display:flex;flex-direction:row;background-color:#fff;border-bottom:1px solid #e5e5e5;}
.concession .list{width:80%;padding:10px 10px;}
.concession .list .math{font-weight:bold;}
.concession .item-list .btncopy{
  background-color:#F85B52;color:#fff;width:60px;height:25px;text-align:center;line-height:25px;border-radius:20px;
}
.concession .modal{
  width:70%;padding:15px 10px;border:1px solid #e5e5e5;margin:0 auto;background-color:#fff;text-align:center;
  position:relative;z-index:1;border-radius:10px;
}
.concession .modal .txt1{text-align:center;border-bottom:1px solid #e5e5e5;}
.concession .modal input{width:150px;height:25px;border:1px solid #e5e5e5;border-radius:5px;margin-left:10px;margin-right:5px;padding:5px;box-sizing: border-box;}
.concession .modal .bom{display:flex;flex-direction:row;}
.concession .modal .close{width:100px;height:30px;background-color:#e5e5e5;text-align:center;line-height:30px;border-radius:5px;margin:0 auto;}
.concession .list-item{width:100%;padding:10px 10px;display:flex;flex-direction:row;background-color:#fff;border-bottom:1px solid #e5e5e5;}
.concession .list-item .inner{width:60px;height:50px;}
.concession .list-item .inner img{width:50px;height:100%;border-radius:50%;}
.concession .list-item .used .date{color:#000000;}
.concession .list-item .used .date{font-size:12px;color:#666666;}


.concession .modal-layer{position:absolute;left:0;top:0;right:0;bottom:0;z-index:10;}
.concession .modal-layer .mceng{position:absolute;top:0;bottom:0;left:0;right:0;background-color: rgba(0, 0, 0, 0.6);overflow: hidden;}
</style>
