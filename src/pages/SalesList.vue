<template>
  <div class="containerarea font14 rsaleslist bg-white">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer && loginUser.isretailer == 1">
      <div class="s-topbanner s-topbanner1">
        <div class="flex_center h_100 toprow">
          <div class="flex_cell font16 pl20 color-white">{{ viewuser.linkman }}的订单</div>
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
          <div v-if="!data || data.length === 0" class="scroll_item emptyitem flex_center">
            <template v-if="searchresult1">暂无搜索结果</template>
            <template v-else>暂无订单</template>
          </div>
          <router-link v-else v-for="item in data" :key="item.id" class="scroll_item padding10 db" :to="{path: '/retailerOrderDetail', query: {id: item.orderid}}">
            <div class="flex_left">
              <img class="imgcover avatarimg2 radius0" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
              <div class="flex_cell pl10">
                <div class="clamp1">{{ item.title }}</div>
                <div class="clamp1 color-gray font12">
                  <span class="v_middle">{{ item.dateline | dateformat }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { Search, XImg } from 'vux'
import Time from '#/time'
import ENV from 'env'
import { User } from '#/storage'

export default {
  components: {
    Search, XImg
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
      viewuser: {},
      loginUser: {},
      tabmodel: 0,
      disdata: false,
      data: [],
      searchword1: '',
      searchresult1: false,
      searchword2: '',
      searchresult2: false,
      limit: 10,
      pagestart1: 0
    }
  },
  methods: {
    handleScroll: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer,
        callback: function () {
          if (self.data.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getData1()
          }
        }
      })
    },
    getData1 () {
      const self = this
      const params = { params: { uid: self.query.uid, buyonline: 1, pagestart: self.pagestart1, limit: self.limit } }
      const keyword = self.searchword1
      if (typeof keyword !== 'undefined' && keyword && self.$util.trim(keyword) !== '') {
        self.searchresult1 = true
        params.params.keyword = keyword
      } else {
        self.searchresult1 = false
      }
      self.$http.get(`${ENV.BokaApi}/api/user/salesList`, params).then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.data = self.data.concat(retdata)
        self.disdata = true
      })
    },
    onChange1 (val) {
      this.searchword1 = val
    },
    onSubmit1 () {
      const self = this
      self.$vux.loading.show()
      self.disdata = false
      self.data = []
      self.pagestart1 = 0
      self.getData1()
    },
    onCancel1 () {
      const self = this
      self.searchword1 = ''
      self.$vux.loading.show()
      self.disdata = false
      self.data = []
      self.pagestart1 = 0
      self.getData1()
    },
    getData () {
      const self = this
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, { module: 'retailer', action: 'setting', id: this.query.uid })
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
          document.title = `${self.viewuser.linkman}`
          self.getData1()
        }
      })
    },
    openVip () {
      const self = this
      self.$vux.confirm.show({
        content: ENV.vipMemberSale,
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
      this.$store.commit('updateToggleTabbar', {toggleTarbar: true})
      this.loginUser = User.get()
      if (this.loginUser.isretailer === 2) {
        this.openVip()
      } else {
        if (this.query.uid !== this.$route.query.uid) {
          this.query = this.$route.query
          self.pagestart1 = 0
          this.disdata = false
          this.data = []
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
.rnews .bk-listplate1 .iconcell{width:45px;}
.vux-popup-dialog .weui-cell__bd{text-align:center;}
.vux-popup-dialog .weui-cell__ft{display:none;}

</style>
