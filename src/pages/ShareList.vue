<template>
  <div class="containerarea bg-white font14 rsharelist">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer && loginUser.isretailer == 1">
      <div class="s-topbanner s-topbanner1">
        <div class="flex_center h_100 toprow">
          <div class="flex_cell font16 pl20 color-white">{{ viewuser.linkman }}的{{$t('Share')}}</div>
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
          <div v-if="disdata" class="scroll_list">
            <div v-if="!data || data.length === 0" class="scroll_item  emptyitem flex_center">
              <template v-if="searchresult1">暂无搜索结果</template>
              <template v-else>暂无分享数据</template>
            </div>
            <template v-else v-for="(item,index) in data">
              <div @click="toLink(item)" class="scroll_item db padding10">
                <div class="flex_left">
                  <img class="imgcover avatarimg2 radius0" :src="getPhoto(item.photo)" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
                  <div class="flex_cell pl10">
                    <div class="clamp1"><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{ item.title }}</div>
                    <div class="clamp1 color-gray font12">
                      <span class="v_middle"><i class="al al-chakan font18 middle-cell pl5 pr5 color-b8b8b8"></i>{{item.visitor}}次</span>
                      <span class="v_middle"><i class="al al-fenxiang font18 middle-cell pl5 pr5 color-b8b8b8"></i>{{item.shares}}次</span>
                    </div>
                    <div class="clamp1 color-gray font12">分享时间：{{ item.dateline | dateformat }}</div>
                  </div>
                </div>
              </div>
            </template>
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

const limit = 10
let pageStart = 0
export default {
  components: {
    Search, XImg, Sos
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
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
    toLink (item) {
      if (item.module === 'lottery' || item.module === 'retailer' || item.module === 'miniactivity') {
        this.$router.push({path: `/store`, query: {wid: item.wid}})
      } else {
        this.$router.push({path: `/${item.module}`, query: {id: item.moduleid, wid: item.wid}})
      }
    },
    getPhoto: function (src) {
      return this.$util.getPhoto(src)
    },
    onChange1 (val) {
      this.searchword1 = val
    },
    onCancel1 () {
      const self = this
      self.searchword1 = ''
      self.$vux.loading.show()
      self.disdata = false
      self.data = []
      pageStart = 0
      self.getData1()
    },
    onSubmit1 () {
      const self = this
      self.$vux.loading.show()
      self.disdata = false
      self.data = []
      pageStart = 0
      self.getData1()
    },
    handleScroll () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer,
        callback: function () {
          if (self.data.length === (pageStart + 1) * limit) {
            pageStart++
            self.$vux.loading.show()
            self.getData1()
          }
        }
      })
    },
    getData1 () {
      const self = this
      const params = { params: { uid: self.query.uid, pagestart: pageStart, limit: limit } }
      const keyword = self.searchword1
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult1 = true
        params.params.keyword = keyword
      } else {
        self.searchresult1 = false
      }
      self.$http.get(`${ENV.BokaApi}/api/user/shareList`, params).then(function (res) {
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
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, { module: 'retailer', action: 'sharelist' })
      .then(res => self.$http.get(`${ENV.BokaApi}/api/retailer/customerView`, { params: { customeruid: self.query.uid } }))
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        if (data.flag !== 1) {
          self.sosTitle = data.error
          self.showSos = true
          self.showContainer = false
        } else {
          self.showSos = false
          self.showContainer = true
          self.viewuser = data.data ? data.data : data
          document.title = `${self.viewuser.linkman}的分享`
          self.getData1()
        }
      })
    },
    openVip () {
      const self = this
      self.$vux.confirm.show({
        content: ENV.vipMemberShare,
        cancelText: ENV.giveUpVipText,
        confirmText: ENV.openVipText,
        onCancel () {
          self.$router.push({path: '/centerSales'})
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
          this.disdata = false
          this.data = []
          pageStart = 0
          this.$vux.loading.show()
          this.getData()
        }
      }
    }
  },
  activated () {
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
