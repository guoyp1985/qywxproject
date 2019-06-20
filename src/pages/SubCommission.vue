<template>
  <div class="containerarea font14 bg-page sub-commission-page notop nobottom">
    <div class="pagemiddle" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1',0)">
        <template v-if="disList1">
          <div v-if="!tabdata1.length" class="w_100 h_100 flex_center color-gray">暂无数据</div>
          <div v-else class="scroll_list">
            <div v-for="(item,index1) in tabdata1" :key="index1" class="scroll_item bg-white flex_left">
              <div class="pic flex_left">
                <img :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
              </div>
              <div class="flex_cell">
                <div class="clamp1">{{item.linkman}}</div>
                <div class="color-gray font12">{{item.dateline | dateFormat}}</div>
              </div>
              <div class="w100 flex_right color-theme">分佣: {{$t("RMB")}}{{item.salesmoney}}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem, TransferDom, XInput } from 'vux'
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
    Tab, TabItem, Swiper, SwiperItem, TipButtonLayer, XInput
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
    getData () {
      self.$http.post(`${ENV.BokaApi}/api/haitun/teamStat`, {pagestart: pageStart1, limit: limit, fid: 97, uid: 14}).then((res) => {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        self.disList1 = true
      })
    },
    clickTab () {
      this.swiperChange()
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
      this.disList1 = false
      pageStart1 = 0
      this.tabdata1 = []
      this.getData()
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
.sub-commission-page{
  .scroll_item{padding:10px;}
  .pic{
    width:70px;
    img{width:60px;height:60px;border-radius:50%;object-fit: cover;}
  }
}
</style>
