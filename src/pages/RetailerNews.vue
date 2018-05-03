<template>
  <div class="containerarea s-havebottom font14 rnews bg-white">
    <div class="s-topbanner">
      <div class="row">
        <div class="bg"></div>
        <div class="flex_center h_100 toprow">
          <div class="flex_cell font18 pl20">{{$t('News')}}</div>
        </div>
      </div>
      <div class="row">
        <tab v-model="tabmodel" class="x-tab" active-color="#fff" default-color="#fff">
          <tab-item v-for="(item,index) in tabtxts" :selected="index == 0" :key="index" @on-item-click="tabitemclick">{{item}}</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container">
      <swiper v-model="tabmodel" class="x-swiper no-indicator">
        <swiper-item class="swiperitem" v-for="(tabitem, index) in tabtxts" :key="index">
          <template v-if="(index == 0)">
            <div class="scroll_list pl10 pr10">
              <div v-if="!tabdata1 || tabdata1.length == 0" class="scroll_item pt10 pb10 color-gray align_center">
                <div class="t-table">
                  <div class="t-cell v_middle">
                    <div><i class="al al-wushuju font60 pt20"></i></div>
                    <div class="mt5">空空如也~</div>
                    <div class="align_left mt5">可以根据自己的营销特色<router-link to="/addNews" class="color-blue">创建文章</router-link>，或通过<router-link to="/retailerGoodeazy" class="color-blue">【易采集】</router-link>搜索符合自己营销特色的文章进行修改并发布。</div>
                  </div>
                </div>
              </div>
              <router-link :to="{path: `/articles/${item.id}`}" v-else v-for="(item,index1) in tabdata1" :key="item.id" class="scroll_item db pt10 pb10">
                <div class="t-table">
                  <div class="t-cell v_middle w50">
                    <img :src="item.photo" style="width:40px;height:40px;" class="imgcover" />
                  </div>
                  <div class="t-cell v_middle">
                    <div class="clamp1 font16">{{item.title}}</div>
                    <div class="clamp1 font12 color-gray v_middle">
                        <span class="v_middle">{{ item.dateline | dateformat }}</span>
                        <span class="v_middle"><i class="al al-chakan font18 middle-cell pl5 pr5 color-b8b8b8"></i>{{item.views}}</span>
                        <span class="v_middle"><i class="al al-ai-share font13 middle-cell pl5 pr5 color-b8b8b8"></i>{{item.shares}}</span>
                    </div>
                  </div>
                  <div class="t-cell v_middle w50">
                    <div class="qbtn1 bg-green color-white" @click="controlpopup1(item)">{{ $t('Control text') }}</div>
                  </div>
                </div>
              </router-link>
            </div>
          </template>
          <template v-if="(index == 1)">
            <div class="scroll_list pl10 pr10">
              <div v-if="!tabdata2 || tabdata2.length == 0" class="scroll_item pt10 pb10 color-gray align_center">
                <div class="t-table">
                  <div class="t-cell v_middle">
                    <div><i class="al al-wushuju font60 pt20"></i></div>
                    <div class="mt5">空空如也~</div>
                    <div class="align_left mt5">问：原创或采集的文章有什么作用？</div>
                    <div class="align_left">答：将文章分享给好友，好友查看文章后就会成为你的客户，且文章中内置了店铺链接，也可向文章内插入商品，有效提高品牌曝光率！</div>
                  </div>
                </div>
              </div>
              <router-link :to="{path: `/articles/${item.id}`}" v-else v-for="(item,index1) in tabdata1" :key="item.id" class="scroll_item db pt10 pb10">
                <div class="t-table">
                  <div class="t-cell v_middle w50">
                    <img :src="item.photo" style="width:40px;height:40px;" class="imgcover" />
                  </div>
                  <div class="t-cell v_middle">
                    <div class="clamp1 font16">{{item.title}}</div>
                    <div class="clamp1 font12 color-gray v_middle">
                        <span class="v_middle">{{ item.dateline | dateformat }}</span>
                        <span class="v_middle"><i class="al al-chakan font18 middle-cell pl5 pr5 color-b8b8b8"></i>{{item.views}}</span>
                        <span class="v_middle"><i class="al al-ai-share font13 middle-cell pl5 pr5 color-b8b8b8"></i>{{item.shares}}</span>
                    </div>
                  </div>
                  <div class="t-cell v_middle w50">
                    <div class="qbtn1 bg-green color-white" @click="controlpopup1(item)">{{ $t('Control text') }}</div>
                  </div>
                </div>
              </router-link>
            </div>
          </template>
        </swiper-item>
      </swiper>
    </div>
    <div class="s-bottom flex_center bg-blue3 color-white">
      <router-link class="flex_cell bg-blue3 flex_center h_100" to="/retailerGoodeazy" style="border-right:#fff 1px solid;">{{ $t('Goodeazy') }}</router-link>
      <router-link class="bg-blue3 flex_center h_100" to="/addNews" style="width:30%;">{{ $t('Create news') }}</router-link>
    </div>
    <div v-transfer-dom>
      <popup class="menuwrap" v-model="showpopup1" @on-hide="popupevent('hide')" @on-show="popupevent('show')">
        <div class="popup0">
          <div class="list">
            <div class="item" v-for="(row,index1) in controldata" :key="index1">
              <router-link class="inner" v-if="row.key == 'stat'" to="/newsStat">{{ row.title }}</router-link>
              <router-link class="inner" v-else-if="row.key == 'set'" :to="{path:'/addNews',query:{id:clickdata1.id}}">{{ row.title }}</router-link>
              <div class="inner" v-else @click="clickpopup1(row.key,clickdata1)">
                <div :class="`clamp1 ${row.key}`">{{ row.title }}</div>
              </div>
            </div>
            <div class="item close mt10" @click="clickpopup1('row.key,clickdata1')">
              <div class="inner">{{ $t('Cancel txt') }}</div>
            </div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <popup class="menuwrap" v-model="showpopup2" @on-hide="popupevent('hide')" @on-show="popupevent('show')">
        <div class="popup0">
          <div class="list">
            <div class="item" v-for="(row,index1) in controldata" :key="index1">
              <router-link class="inner" v-if="row.key == 'set'" :to="{path:'/addNews',query:{id:clickdata2.id}}">{{ row.title }}</router-link>
              <div v-else class="inner" @click="clickpopup2(row.key,clickdata2)">
                <div :class="`clamp1 ${row.key}`">{{ row.title }}</div>
              </div>
            </div>
            <div class="item close mt10" @click="clickpopup2('row.key,clickdata2')">
              <div class="inner">{{ $t('Cancel txt') }}</div>
            </div>
          </div>
        </div>
      </popup>
    </div>
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
import { Tab, TabItem, Swiper, SwiperItem, Group, TransferDom, Popup } from 'vux'
import Time from '#/time'
import ENV from '#/env'

export default {
  directives: {
    TransferDom
  },
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Group,
    TransferDom,
    Popup
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      tabtxts: [ '我的文章', '采集记录' ],
      tabmodel: 0,
      tabdata1: [],
      tabdata2: [],
      controldata: [
        { key: 'push', title: '推送给返点客' },
        { key: 'set', title: '更多设置' },
        { key: 'stat', title: '文章统计' },
        { key: 'createposter', title: '生成海报' }
      ],
      showpopup1: false,
      showpopup2: false,
      clickdata1: {},
      clickdata2: {},
      limit: 10,
      pagestart1: 0,
      pagestart2: 0,
      isBindScroll1: false,
      isBindScroll2: false,
      scrollArea1: null,
      scrollArea2: null
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
    self.$vux.loading.show()
    self.getdata1()
  },
  methods: {
    scroll1: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea1,
        callback: function () {
          if (self.tabdata1.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getdata1()
          }
        }
      })
    },
    scroll2: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea2,
        callback: function () {
          if (self.tabdata2.length === (self.pagestart2 + 1) * self.limit) {
            self.pagestart2++
            self.$vux.loading.show()
            self.getdata2()
          }
        }
      })
    },
    getdata1 () {
      const self = this
      let params = { params: { from: 'retailer', pagestart: self.pagestart1, limit: self.limit } }
      self.$http.get(`${ENV.BokaApi}/api/list/news`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata1 = self.tabdata1.concat(retdata)
        if (!self.isBindScroll1) {
          let items = document.querySelectorAll('.rnews .swiperitem')
          self.scrollArea1 = items[0]
          self.scrollArea2 = items[1]
          self.isBindScroll1 = true
          self.scrollArea1.removeEventListener('scroll', self.scroll1)
          self.scrollArea1.addEventListener('scroll', self.scroll1)
        }
      })
    },
    getdata2 () {
      const self = this
      let params = { from: 'retailer', do: 'list', pagestart: self.pagestart2, limit: self.limit }
      self.$http.post(`${ENV.BokaApi}/api/news/goodeazy`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.tabdata2 = self.tabdata2.concat(retdata)
        if (!self.isBindScroll2) {
          self.isBindScroll2 = true
          self.scrollArea2.removeEventListener('scroll', self.scroll2)
          self.scrollArea2.addEventListener('scroll', self.scroll2)
        }
      })
    },
    controlpopup1 (item) {
      event.preventDefault()
      this.showpopup1 = !this.showpopup1
      this.clickdata1 = item
    },
    controlpopup2 (item) {
      event.preventDefault()
      this.showpopup2 = !this.showpopup2
      this.clickdata2 = item
    },
    popupevent (status) {

    },
    clickpopup1 (key, item) {
      this.showpopup1 = false
    },
    clickpopup2 (key, item) {
      this.showpopup2 = false
    },
    tabitemclick (index) {
      const self = this
      if (index === 0) {
        if (self.pagestart1 > 0) {
          self.$vux.loading.show()
          self.getdata1()
        }
      } else if (index === 1) {
        if (self.pagestart2 === 0 && !self.isBindScroll2) {
          self.$vux.loading.show()
          self.getdata2()
        }
      }
    }
  }
}
</script>

<style lang="less">
.rnews .bk-listplate1 .iconcell{width:45px;}
.vux-popup-dialog .weui-cell__bd{text-align:center;}
.vux-popup-dialog .weui-cell__ft{display:none;}

</style>
