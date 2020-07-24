<template>
  <div class="containerarea bg-white font14 rsharelist">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer && loginUser.isretailer == 1">
      <div class="s-topbanner s-topbanner1">
        <div class="flex_center h_100 toprow">
          <div class="flex_cell font16 pl20 color-white">{{ viewuser.linkman }}的{{$t('Views')}}</div>
        </div>
      </div>
      <div class="s-container s-container1">
        <div class="flex_center bg-white" style="height:55px;position:absolute;left:0;top:0;right:0;">
          <search
            class="v-search"
            v-model="searchword1"
            :auto-fixed="autofixed"
            @on-submit="onSubmit1"
            @on-change="onChange1"
            @on-cancel="onCancel1"
            ref="search">
          </search>
        </div>
        <div v-if="disdata" class="scroll_list swiper-inner pl10 pr10 border-box scroll-container" style="top:55px;" ref="scrollContainer" @scroll="handleScroll">
          <div v-if="!data || data.length === 0" class="scroll_item  emptyitem flex_center">
            <template v-if="searchresult1">暂无搜索结果</template>
            <template v-else>暂无浏览数据</template>
          </div>
          <div @click="toModule(item)"v-else v-for="(item,index) in data" :key="item.id" class="scroll_item db padding10">
            <div class="flex_left">
              <img class="imgcover avatarimg2 radius0" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
              <div class="flex_cell pl10">
                <div class="clamp1"><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{ item.title }}</div>
                <div class="clamp1 color-gray font12">浏览次数: {{ item.number }}</div>
                <div class="clamp1 color-gray font12">停留时间: {{ item.staytime | staytimeFormat }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<i18n>
Contact customer:
  zh-CN: 联系客户
Customer text:
  zh-CN: 客户
Percent:
  zh-CN: 成交概率
</i18n>

<script>
import { Search, XImg } from 'vux'
import Sos from '@/components/Sos'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'
const jweixin = require('../../static/jweixin')

const limit = 10
let pageStart1 = 0
let self = this
export default {
  components: {
    Search, XImg, Sos
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    },
    staytimeFormat: function (value) {
      let ret = ''
      let stay = parseInt(value)
      if (stay < 60) {
        ret = `${stay}秒`
      } else if (stay >= 60 && stay < 3660) {
        let m = Math.floor(stay / 60)
        let s = stay % 60
        ret = `${m}分钟${s}秒`
      } else if (stay >= 3660) {
        let h = Math.floor(stay / 3660)
        let val1 = stay % 3660
        let m = Math.floor(val1 / 60)
        let s = val1 % 60
        ret = `${h}小时${m}分钟${s}秒`
      }
      return ret
    }
  },
  data () {
    return {
      showSos: false,
      sosTitle: '',
      showContainer: false,
      autofixed: false,
      query: {},
      loginUser: {},
      viewuser: {},
      disdata: false,
      data: [],
      searchword1: '',
      searchresult1: false
    }
  },
  methods: {
    toModule (item) {
      if (item.module === 'courseclass' || item.module === 'lottery' || item.module === 'miniactivity') {
        if (this.query.from === 'from') {
          let type = 'default'
          if (this.query.fromapp) {
            type = this.query.fromapp
          }
          jweixin.miniProgram.reLaunch({url: ENV.AppHomePage[type]})
        } else {
          this.$vux.toast.text('请在小程序内查看')
        }
      } else {
        this.$router.push({path: `/${item.module}`, query: {id: item.moduleid, wid: item.wid}})
      }
    },
    onChange1 (val) {
      this.searchword1 = val
    },
    onCancel1 () {
      self.searchword1 = ''
      self.$vux.loading.show()
      self.disdata = false
      self.data = []
      pageStart1 = 0
      self.getData1()
    },
    onSubmit1 () {
      self.$vux.loading.show()
      self.disdata = false
      self.data = []
      pageStart1 = 0
      self.getData1()
    },
    handleScroll () {
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer,
        callback: function () {
          if (self.data.length === (pageStart1 + 1) * limit) {
            pageStart1++
            self.$vux.loading.show()
            self.getData1()
          }
        }
      })
    },
    getData1 () {
      const params = { params: { uid: self.query.uid, pagestart: pageStart1, limit: limit } }
      const keyword = self.searchword1
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult1 = true
        params.params.keyword = keyword
      } else {
        self.searchresult1 = false
      }
      self.$http.get(`${ENV.BokaApi}/api/user/viewList`, params)
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.data = self.data.concat(retdata)
        self.disdata = true
      })
    },
    getDateState (dt) {
      return this.$util.getDateState(dt)
    },
    getDateClass (dt) {
      let ret = this.$util.getDateClass(dt)
      ret = `${ret} mr5`
      return ret
    },
    getData () {
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, { module: 'retailer', action: 'sharelist' })
      .then(res => self.$http.get(`${ENV.BokaApi}/api/retailer/customerView`, { params: { customeruid: self.query.uid } }))
      .then(res => {
        self.$vux.loading.hide()
        let data = res.data
        if (data.flag !== 1) {
          self.sosTitle = data.error
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          self.viewuser = data.data ? data.data : data
          document.title = `${self.viewuser.linkman}的浏览`
          self.getData1()
        }
      })
    },
    openVip () {
      self.$vux.confirm.show({
        content: ENV.vipMemberView,
        cancelText: ENV.giveUpVipText,
        confirmText: ENV.openVipText,
        onCancel () {
          self.$router.push('/centerSales')
        },
        onConfirm () {
          location.replace(`${ENV.Host}/#/pay?id=${self.loginUser.payorderid}&module=payorders`)
        }
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      if (this.loginUser.isretailer === 2) {
        this.openVip()
      } else {
        if (this.query.uid !== this.$route.query.uid) {
          this.query = this.$route.query
          pageStart1 = 0
          this.disdata = false
          this.data = []
          this.$vux.loading.show()
          this.getData()
        }
      }
    }
  },
  activated () {
    self = this
    this.refresh()
  }
}
</script>

<style lang="less" scoped>
.textarea-outer{padding:10px;}
.textarea-outer .weui-cells{margin-top:0;}
.textarea-outer .weui-cells:before{display:none;}
.textarea-outer .weui-cells:after{display:none;}
</style>
