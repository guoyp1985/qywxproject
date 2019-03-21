<template>
  <div class="containerarea font14 bg-page concession s-havebottom">
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
          <div v-if="index === 0" class="swiper-inner scroll-container1" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1',index)">
            <template v-if="disList1">
              <div v-if="!tabdata1.length" class="w_100 h_100 flex_center color-gray">暂无有效的优惠码</div>
              <div v-else class="scroll_list">
                <div v-for="(item,index1) in tabdata1" :key="index1" :class="`scroll_item bg-white flex_left item-${item.id}`">
                  <div class="flex_cell padding10">
                    <div class="bold">{{item.code}}</div>
                    <div class="color-gray font12">生成时间: {{item.dateline | dateFormat}}</div>
                  </div>
                  <div class="w100 flex_center">
                    <div class="btncopy" @click="copyTxt(item)">复制
                      <div class="copy_txt" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ item.code }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div v-if="index === 1" class="swiper-inner scroll-container1" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2',index)">
            <template v-if="disList2">
              <div v-if="!tabdata2.length" class="w_100 h_100 flex_center color-gray">暂无已使用的优惠码</div>
              <div v-else class="scroll_list">
                <div v-for="(item,index1) in tabdata2" :key="index1" class="scroll_item bg-white flex_left">
                  <div class="pic flex_center" style="width:70px;" v-if="item.avatar && item.avatar != ''">
                    <img class="v_middle imgcover" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" style="width:50px;height:50px;" />
                  </div>
                  <div class="flex_cell padding10">
                    <div class="bold">{{item.code}}</div>
                    <div class="color-gray font12">{{item.linkman}}</div>
                    <div class="color-gray font12">使用时间: {{item.usedateline | dateFormat}}</div>
                  </div>
                </div>
              </div>
            </template>
          </div>
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
        <div class="font12 mt5 ml20"><span style="color:red;">*</span>每个优惠码{{codefee}}元</div>
        <div class="bom mt25">
          <div class="close" @click="btnclose">取消</div>
          <div class="close color-white" style="background-color:#F85B52;" @click="createCode">立即生成</div>
        </div>
      </div>
      <div class="mceng"></div>
    </div>
    <template v-if="showTipModal">
      <tip-button-layer
        @clickClose="closeTipModal"
        title="优惠码生成成功">
      </tip-button-layer>
    </template>
  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem, TransferDom } from 'vux'
import ENV from 'env'
import Time from '#/time'
import { User } from '#/storage'
import jQuery from 'jquery'
import TipButtonLayer from '@/components/TipButtonLayer'

const limit = 20
let pageStart1 = 0
let pageStart2 = 0
let self = {}

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, TipButtonLayer
  },
  data () {
    return {
      loginUser: {},
      query: {},
      tabtxts: [ '有效码', '已使用' ],
      selectedIndex: 0,
      disList1: false,
      disList2: false,
      tabdata1: [],
      tabdata2: [],
      showModal: false,
      quantity: '',
      codefee: 0,
      showTipModal: false
    }
  },
  filters: {
    dateFormat: function (dt) {
      return new Time(dt * 1000).dateFormat('yyyy-MM-dd')
    }
  },
  methods: {
    closeTipModal () {
      this.showTipModal = false
    },
    btnshow () {
      this.showModal = true
    },
    btnclose () {
      this.showModal = false
    },
    copyTxt (item) {
      const className = `.concession .item-${item.id} .copy_txt`
      const eleobj = jQuery(className)[0]
      let range = null
      let save = function (e) {
        e.clipboardData.setData('text/plain', eleobj.innerHTML)
        e.preventDefault()
      }
      if (self.$util.isIOS()) { // ios设备
        console.log('进入到了ios设备')
        window.getSelection().removeAllRanges()
        range = document.createRange()
        range.selectNode(eleobj)
        console.log(range)
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
      let params = { pagestart: pageStart1, limit: limit, used: 0, fid: self.query.id }
      self.$http.get(`${ENV.BokaApi}/api/factory/listRetailerCode`, {
        params: params
      }).then((res) => {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        this.codefee = data.codefee
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.disList1 = true
      })
    },
    getData2 () {
      let params = { pagestart: pageStart1, limit: limit, used: 1, fid: self.query.id }
      self.$http.get(`${ENV.BokaApi}/api/factory/listRetailerCode`, {
        params: params
      }).then((res) => {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        this.codefee = data.codefee
        self.tabdata2 = self.tabdata2.concat(retdata)
        self.disList2 = true
      })
    },
    clickTab () {
      console.log('in clicktab')
    },
    swiperChange (index) {
      if (index !== undefined) {
        this.selectedIndex = index
      }
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
      if (!self.quantity) {
        self.$vux.toast.text('请输入正确的数量', 'middle')
        return false
      }
      self.showModal = false
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/factory/createRetailerCode`, {
        fid: self.query.id,
        quantity: self.quantity
      }).then((res) => {
        const data = res.data
        self.$vux.loading.hide()
        if (data.flag) {
          if (data.orderid) {
            if (self.query.from) {
              let weburl = encodeURIComponent(`concession?id=${self.query.id}&type=pay`)
              self.$wechat.miniProgram.navigateTo({url: `/packageB/pages/pay?id=${data.orderid}&module=${data.ordermodule}&weburl=${weburl}`})
            } else {
              let backurl = encodeURIComponent(`concession?id=${self.query.id}&type=pay`)
              location.replace(`${ENV.Host}/#/pay?id=${data.orderid}&module=${data.ordermodule}&backurl=${backurl}`)
            }
          } else {
            self.disList1 = false
            self.tabdata1 = []
            pageStart1 = 0
            self.getData1()
          }
        } else {
          self.$vux.toast.show({
            text: data.error,
            type: (data.flag !== 1 ? 'warn' : 'success'),
            time: self.$util.delay(data.error)
          })
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
      if (this.query.type === 'pay') {
        this.showTipModal = true
      }
      this.disList1 = false
      pageStart1 = 0
      this.tabdata1 = []
      this.getData1()
    }
  },
  activated () {
    self = this
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less" scoped>
.concession .btncopy{
  position:relative;background-color:#F85B52;color:#fff;width:60px;height:25px;text-align:center;line-height:25px;border-radius:20px;
}
.concession .modal{
  width:70%;padding:15px 10px;border:1px solid #e5e5e5;margin:0 auto;background-color:#fff;text-align:center;
  position:relative;z-index:1;border-radius:10px;
}
.concession .modal .txt1{text-align:center;border-bottom:1px solid #e5e5e5;}
.concession .modal input{width:150px;height:25px;border:1px solid #e5e5e5;border-radius:5px;margin-left:10px;margin-right:5px;padding:5px;box-sizing: border-box;}
.concession .modal .bom{display:flex;flex-direction:row;}
.concession .modal .close{width:100px;height:30px;background-color:#e5e5e5;text-align:center;line-height:30px;border-radius:5px;margin:0 auto;}

.concession .modal-layer{position:absolute;left:0;top:0;right:0;bottom:0;z-index:10;}
.concession .modal-layer .mceng{position:absolute;top:0;bottom:0;left:0;right:0;background-color: rgba(0, 0, 0, 0.6);overflow: hidden;}
</style>
