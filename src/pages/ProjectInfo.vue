<template>
  <div id="project-info" class="containerarea font14">
    <div class="t-table">
      <div class="t-cell v_middle" style="width:70px;">
        <img class="avatarimg3 imgcover v_middle" src="" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
      </div>
      <div class="t-cell v_middle">
        <div class="clamp1 font14">完美生活旗舰店</div>
        <div class="clamp1 mt5 font14 color-gray">2019-09-12 15:36</div>
      </div>
      <div class="t-cell w60 align_right v_middle">
        <div class="qbtn bg-red color-white">待审核</div>
      </div>
    </div>
    <div class="s-topbanner s-topbanner1">
      <tab class="b-tab" v-model="selectedIndex">
        <tab-item :selected="selectedIndex==0" @on-item-click="toggleTab">项目进度</tab-item>
        <tab-item :selected="selectedIndex==1" @on-item-click="toggleTab">经营统计</tab-item>
      </tab>
    </div>
  </div>
</template>

<i18n>
</i18n>
<script>
import { Sticky, Tab, TabItem } from 'vux'
import {User} from '#/storage'
import ENV from 'env'

export default {
  components: {
    Sticky, Tab, TabItem
  },
  data () {
    return {
      query: {},
      selectedIndex: 0,
      distabdata1: false,
      distabdata2: false,
      tabdata1: [],
      tabdata2: [],
      limit: 10,
      pagestart1: 0,
      pagestart2: 0
    }
  },
  methods: {
    initData () {
      // this.selectedIndex = 0
      // this.distabdata1 = false
      // this.distabdata2 = false
      // this.distabdata3 = false
      // this.distabdata4 = false
      // this.tabdata1 = []
      // this.tabdata2 = []
      // this.tabdata3 = []
      // this.tabdata4 = []
      // this.pagestart1 = 1
      // this.pagestart2 = 1
      // this.pagestart3 = 1
      // this.pagestart4 = 1
    },
    toggleTab () {
      console.log('in toggleTab')
      console.log(this.selectedIndex)
      switch (this.selectedIndex) {
        case 0:
          !this.tabdata1.length && this.getData()
          break
        case 1:
          !this.tabdata2.length && this.getData(2)
          break
      }
    },
    scrollHandle () {
      const self = this
      this.$util.scrollEvent({
        element: this.$refs.scrollContainer,
        callback: () => {
          switch (self.selectedIndex) {
            case 0:
              if (self.tabdata1.length === (self.pagestart1 + 1) * self.limit) {
                self.pagestart1++
                self.getData(0)
              }
              break
            case 1:
              if (self.tabdata2.length === (self.pagestart2 + 1) * self.limit) {
                self.pagestart2++
                self.getData(2)
              }
              break
          }
        }
      })
    },
    getData (flag) {
      flag = flag || 0
      this.$vux.loading.show()
      const self = this
      let params = {flag: flag, limit: self.limit}
      if (flag === 2) {
        params.pagestart = this.pagestart2
      } else {
        params.pagestart = this.pagestart1
      }
      this.$http.get(`${ENV.BokaApi}/api/order/orderList/user`, {
        params: params
      }).then((res) => {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        switch (flag) {
          case 0:
            self.tabdata1 = self.tabdata1.concat(retdata)
            self.distabdata1 = true
            break
          case 2:
            self.tabdata2 = self.tabdata2.concat(retdata)
            self.distabdata2 = true
            break
        }
      })
    },
    init () {
      // this.$vux.loading.show()
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.initData()
      this.query = this.$route.query
      let flag = parseInt(this.query.flag)
      switch (flag) {
        case 2:
          if (this.query.refresh || !this.tabdata2.length) {
            this.selectedIndex = 1
            this.pagestart2 = 0
            this.tabdata2 = []
            this.toggleTab()
          }
          break
        default :
          if (this.query.refresh || !this.tabdata1.length) {
            this.selectedIndex = 0
            this.pagestart1 = 0
            this.tabdata1 = []
            this.toggleTab()
          }
          break
      }
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less">
.b-tab .vux-tab .vux-tab-item.vux-tab-selected{color:#ea3a3a;}
.b-tab .vux-tab-ink-bar{background-color:#ea3a3a;}
</style>
