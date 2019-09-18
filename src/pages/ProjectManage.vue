/*
* @description: 项目管理页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="order-search" class="containerarea font14">
    <div class="s-topbanner s-topbanner1">
      <tab class="b-tab" v-model="selectedIndex">
        <tab-item :selected="selectedIndex==0" @on-item-click="toggleTab">全部</tab-item>
        <tab-item :selected="selectedIndex==1" @on-item-click="toggleTab">待审核</tab-item>
        <tab-item :selected="selectedIndex==2" @on-item-click="toggleTab">运营中</tab-item>
        <tab-item :selected="selectedIndex==3" @on-item-click="toggleTab">已完成</tab-item>
      </tab>
    </div>
    <div ref="scrollContainer" class="s-container s-container1 scroll-container" @scroll="scrollHandle">
      <div v-show="selectedIndex===0">
        <template v-if="distabdata1">
          <template v-if="tabdata1.length">
            <div class="scroll_item pt10 pb10  pl12 pr12 bg-white mt10 list-shadow" @click="toInfo(item)" v-for="(item,index) in tabdata1" :item="item" :key="index">
              <div class="t-table">
                <div class="t-cell v_middle" style="width:70px;">
                  <img class="avatarimg3 imgcover v_middle" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                </div>
                <div class="t-cell v_middle">
                  <div class="clamp1 font14">完美生活旗舰店</div>
                  <div class="clamp1 mt5 font14 color-gray">2019-09-12 15:36</div>
                </div>
                <div class="t-cell w60 align_right v_middle">
                  <div style="color:#f6a843;">待审核</div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="no-related-x color-gray">
              <span>暂无任何数据</span>
            </div>
          </template>
        </template>
      </div>
      <div v-show="selectedIndex===1">
        <template v-if="distabdata2">
          <template v-if="tabdata2.length">
            <div class="scroll_item pt10 pb10  pl12 pr12 bg-white mt10 list-shadow" @click="toInfo(item)" :class="{'pb10' : index === (tabdata2.length - 1)}" v-for="(item,index) in tabdata2" :item="item" :key="index">
              <div class="t-table">
                <div class="t-cell v_middle" style="width:70px;">
                  <img class="avatarimg3 imgcover v_middle" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                </div>
                <div class="t-cell v_middle">
                  <div class="clamp1 font14">完美生活旗舰店</div>
                  <div class="clamp1 mt5 font14 color-gray">2019-09-12 15:36</div>
                </div>
                <div class="t-cell w60 align_right v_middle">
                  <div style="color:#f6a843;">待审核</div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="no-related-x color-gray">
              <span>暂无任何数据</span>
            </div>
          </template>
        </template>
      </div>
      <div v-show="selectedIndex===2">
        <template v-if="distabdata3">
          <template v-if="tabdata3.length">
            <div class="scroll_item pt10 pb10  pl12 pr12 bg-white mt10 list-shadow" @click="toInfo(item)" v-for="(item,index) in tabdata3" :item="item" :key="index">
              <div class="t-table">
                <div class="t-cell v_middle" style="width:70px;">
                  <img class="avatarimg3 imgcover v_middle" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                </div>
                <div class="t-cell v_middle">
                  <div class="clamp1 font14">完美生活旗舰店</div>
                  <div class="clamp1 mt5 font14 color-gray">2019-09-12 15:36</div>
                </div>
                <div class="t-cell w60 align_right v_middle">
                  <div style="color:#f6a843;">待审核</div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="no-related-x color-gray">
              <span>{{$t('No Related Orders')}}</span>
            </div>
          </template>
        </template>
      </div>
      <div v-show="selectedIndex===3">
        <template v-if="distabdata4">
          <template v-if="tabdata4.length">
            <div class="scroll_item pt10 pb10  pl12 pr12 bg-white mt10 list-shadow" @click="toInfo(item)" v-for="(item,index) in tabdata4" :item="item" :key="index">
              <div class="t-table">
                <div class="t-cell v_middle" style="width:70px;">
                  <img class="avatarimg3 imgcover v_middle" :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
                </div>
                <div class="t-cell v_middle">
                  <div class="clamp1 font14">完美生活旗舰店</div>
                  <div class="clamp1 mt5 font14 color-gray">2019-09-12 15:36</div>
                </div>
                <div class="t-cell w60 align_right v_middle">
                  <div style="color:#f6a843;">待审核</div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="no-related-x color-gray">
              <span>暂无任何数据</span>
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { Sticky, Tab, TabItem } from 'vux'
// import {User} from '#/storage'
import ENV from 'env'

export default {
  components: {
    Sticky, Tab, TabItem
  },
  data () {
    return {
      query: {},
      loginUser: {},
      selectedIndex: 0,
      distabdata1: false,
      distabdata2: false,
      distabdata3: false,
      distabdata4: false,
      tabdata1: [],
      tabdata2: [],
      tabdata3: [],
      tabdata4: [],
      limit: 10,
      pagestart1: 0,
      pagestart2: 0,
      pagestart3: 0,
      pagestart4: 0,
      refundContent: '',
      clickOrder: {},
      clickIndex: 0,
      pageTop: 0
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
      this.refundContent = ''
      this.clickOrder = {}
      this.clickIndex = 0
    },
    toInfo (item) {
      this.$router.push({path: '/projectInfo', query: {id: item.id, fid: item.fid}})
    },
    toggleTab () {
      console.log('in toggleTab')
      console.log(this.selectedIndex)
      switch (this.selectedIndex) {
        case 0:
          !this.tabdata1.length && this.getData()
          break
        case 1:
          !this.tabdata2.length && this.getData(1)
          break
        case 2:
          !this.tabdata3.length && this.getData(2)
          break
        case 3:
          !this.tabdata4.length && this.getData(3)
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
            case 2:
              if (self.tabdata3.length === (self.pagestart3 + 1) * self.limit) {
                self.pagestart3++
                self.getData(3)
              }
              break
            case 3:
              if (self.tabdata4.length === (self.pagestart4 + 1) * self.limit) {
                self.pagestart4++
                self.getData(4)
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
      let params = {progress: flag, limit: self.limit}
      if (flag === 1) {
        params.pagestart = this.pagestart2
      } else if (flag === 2) {
        params.pagestart = this.pagestart3
      } else if (flag === 3) {
        params.pagestart = this.pagestart4
      } else {
        params.pagestart = this.pagestart1
      }
      this.$http.post(`${ENV.BokaApi}/api/factory/inviterFactory`, params).then((res) => {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        switch (flag) {
          case 0:
            self.tabdata1 = self.tabdata1.concat(retdata)
            self.distabdata1 = true
            break
          case 1:
            self.tabdata2 = self.tabdata2.concat(retdata)
            self.distabdata2 = true
            break
          case 2:
            self.tabdata3 = self.tabdata3.concat(retdata)
            self.distabdata3 = true
            break
          case 3:
            self.tabdata4 = self.tabdata4.concat(retdata)
            self.distabdata4 = true
            break
        }
      })
    },
    init () {
      this.$vux.loading.show()
    },
    refresh () {
      // this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      // this.loginUser = User.get()
      this.initData()
      this.query = this.$route.query
      let flag = parseInt(this.query.flag)
      switch (flag) {
        case 1:
          if (!this.tabdata2.length) {
            this.selectedIndex = 1
            this.pagestart2 = 0
            this.tabdata2 = []
            this.toggleTab()
          }
          break
        case 2:
          if (!this.tabdata3.length) {
            this.selectedIndex = 2
            this.pagestart3 = 0
            this.tabdata3 = []
            this.toggleTab()
          }
          break
        case 3:
          if (!this.tabdata4.length) {
            this.selectedIndex = 3
            this.pagestart4 = 0
            this.tabdata4 = []
            this.toggleTab()
          }
          break
        default :
          if (!this.tabdata1.length) {
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
  },
  activated () {
    if (this.$refs.scrollContainer) {
      this.$refs.scrollContainer.scrollTop = this.pageTop
    }
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less">
.b-tab .vux-tab .vux-tab-item.vux-tab-selected{color:#ea3a3a;}
.b-tab .vux-tab-ink-bar{background-color:#ea3a3a;}
</style>
