<template>
  <div class="containerarea s-havebottom font14 rgoodeazy bg-white">
    <div class="s-topbanner">
      <div class="row">
        <div class="bg"></div>
        <div class="flex_center h_100 toprow">
          <div class="flex_cell font18 pl20">{{$t('Goodeazy')}}</div>
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
          <div v-if="(index == 0)" class="pl10 pr10">
            <div class="font15 pt15">搜索关键词采集文章</div>
            <div class="font12 color-gray mt5">在搜索框内输入文章关键词，点击“搜索”按钮搜索相关文章后，即可预览或采集文章素材。</div>
            <div class="mb15" style="position:relative;">
              <search
                class="x-search"
                v-model="searchword"
                :auto-fixed="autofixed"
                @on-submit="onSubmit"
                @on-change="onChange"
                @on-cancel="onCancel"
                ref="search">
              </search>
              <div class="scroll_list pl10 pr10 mb12" style="position:absolute;top:45px;">
                <div v-if="showSearchEmpty && (!searchdata || searchdata.length == 0)" class="scroll_item emptyitem">
                  <div class="t-table">
                    <div class="t-cell">暂无搜索结果</div>
                  </div>
                </div>
                <div v-else v-for="(item,index) in searchdata" :key="item.id" class="scroll_item pt10 pb10">
                  <div class="t-table">
                    <a :href="item.url" class="t-cell v_middle">
                      <div class="clamp1">{{ item.title }}</div>
                      <div class="clamp2 font12 color-gray mt5">{{ item.summary }}</div>
                    </a>
                    <div class="t-cell align_right v_middle" style="width:60px;">
                      <span class="qbtn bg-green color-white font12" @click="collect(item,index)">{{ $t('Collect') }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="(index == 1)">
            <div class="pl10 pr10">
              <div class="font15 pt15">文章链接采集文章</div>
              <div class="font12 color-gray mt5">请从微信公众号中复制文章链接，粘贴在文本框内，点击“采集”按钮，采集成功后即可编辑分享</div>
              <form class="subform mb15">
                <div class="t-table mt12">
                  <div class="t-cell v_middle" style="height:100%;background-color: #fafafa;">
                    <group class="textarea-outer">
                      <x-textarea v-model="collecturl" class="x-textarea noborder" name="url" :placeholder="$t('Url paster here')" :show-counter="false" :rows="1" autosize></x-textarea>
                    </group>
                  </div>
                  <div class="t-cell v_middle align_center bg-green color-white font15" style="width:80px;" @click="collect1">{{ $t('Collect') }}</div>
                </div>
              </form>
            </div>
            <div class="bg-page" style="height:12px;"></div>
            <div class="padding15 font15 b_bottom_after">{{ $t('Collect record') }}</div>
            <div class="scroll_list pl10 pr10 pb10">
              <div v-if="!newsdata || newsdata.length == 0" class="scroll_item emptyitem">
                <div class="t-table">
                  <div class="t-cell">您还没有采集过文章</div>
                </div>
              </div>
              <router-link v-else v-for="(item,index) in newsdata" :key="item.id" class="scroll_item pt10 pb10 db" :to="{path: 'article', query: {id: item.id}}">
                <div class="t-table">
                  <div class="t-cell v_middle" style="width:40px;">
                    <img class="imgcover v_middle" :src="item.photo" style="width:30px;height:30px;" />
                  </div>
                  <div class="t-cell">
                    <div class="clamp1 font14">{{item.title}}</div>
                    <div class="clamp1 font12 color-gray">{{ item.dateline | dateformat }}</div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
    <div class="s-bottom bottomnaviarea b_top_after">
      <div class="t-table bottomnavi">
        <router-link class="t-cell item" to="/store">{{ $t('My shop') }}</router-link>
        <router-link class="t-cell item" to="/centerSales">{{ $t('Sales center') }}</router-link>
        <router-link class="t-cell item" to="/retailerOrders">{{ $t('My orders') }}</router-link>
      </div>
    </div>
  </div>
</template>

<i18n>
Rebate customer:
  zh-CN: 返点客户
Share invite customer:
  zh-CN: 分享邀请返点客户
Rebate manage:
  zh-CN: 返点管理
Message text:
  zh-CN: 早上八点到晚上十一点可以发送消息,但只有48小时内互动过的返点客户才能收到消息,消息将通过博卡授权中心 公众号直接推送给返点客户,每日只能推送一次。
Send text:
  zh-CN: 发送
Url paster here:
  zh-CN: 链接粘贴在此处
Collect:
  zh-CN: 采集
Collect record:
  zh-CN: 采集记录
My orders:
  zh-CN: 我的订单
</i18n>

<script>
import { Tab, TabItem, Swiper, SwiperItem, Search, XTextarea, Group } from 'vux'
import Time from '#/time'
import ENV from 'env'

export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Search,
    XTextarea,
    Group
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      autofixed: false,
      tabtxts: [ '关键词', '链接' ],
      tabmodel: 0,
      newsdata: [],
      searchdata: [],
      searchword: '',
      showSearchEmpty: false,
      collecturl: '',
      limit: 20,
      pagestart: 0,
      isBindScroll: false,
      scrollArea: null

    }
  },
  methods: {
    scroll: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea,
        callback: function () {
          if (self.newsdata.length === (self.pagestart + 1) * self.limit) {
            self.pagestart++
            self.$vux.loading.show()
            self.getnewsdata()
          }
        }
      })
    },
    getnewsdata () {
      const self = this
      let params = { do: 'list', pagestart: self.pagestart, limit: self.limit }
      self.$http.post(`${ENV.BokaApi}/api/news/goodeazy`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.newsdata = self.newsdata.concat(retdata)
        if (!self.isBindScroll) {
          let items = document.querySelectorAll('.rgoodeazy .swiperitem')
          self.scrollArea = items[1]
          self.isBindScroll = true
          self.scrollArea.removeEventListener('scroll', self.scroll)
          self.scrollArea.addEventListener('scroll', self.scroll)
        }
      })
    },
    onChange (val) {
      this.searchword = val
    },
    onCancel () {
      this.searchword = ''
    },
    onSubmit () {
      const self = this
      let kw = self.searchword
      if (!kw || self.$util.trim(kw) === '') {
        self.$vux.alert.show({
          title: '',
          content: '请输入搜索内容'
        })
        return false
      }
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/news/goodeazy`,
        { do: 'get_sogou_list', keyword: kw }
      ).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.searchdata = (data.data ? data.data : data)
        self.showSearchEmpty = true
      })
    },
    tabitemclick (index) {
      const self = this
      if (index === 1) {
        if (self.pagestart === 0 && !self.isBindScroll) {
          self.$vux.loading.show()
          self.getnewsdata()
        }
      }
    },
    collect (item, index) {
      const self = this
      self.$vux.confirm.show({
        content: '确定要采集该文章吗？',
        onConfirm () {
          self.$vux.loading.show()
          self.$http.post(`${ENV.BokaApi}/api/news/goodeazy`,
            { do: 'download', url: item.url }
          ).then(function (res) {
            let data = res.data
            self.$vux.loading.hide()
            self.$vux.toast.show({
              text: data.error,
              time: self.$util.delay(data.error),
              onHide: function () {
                if (data.flag === 1) {
                  // self.searchdata.splice(index, 1)
                  self.$router.push({path: '/news', query: {id: data.data.id}})
                }
              }
            })
          })
        }
      })
    },
    collect1 () {
      const self = this
      if (!self.collecturl || self.$util.trim(self.collecturl) === '') {
        self.$vux.alert.show({
          title: '',
          content: '请输入采集链接'
        })
        return false
      }
      self.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/news/goodeazy`,
        { do: 'download', url: self.collecturl }
      ).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        self.$vux.toast.show({
          text: data.error,
          time: self.$util.delay(data.error),
          onHide: function () {
            if (data.flag === 1) {
              // self.newsdata.push(data.data)
              self.$router.push({path: '/news', query: {id: data.data.id}})
            }
          }
        })
      })
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleBar: false})
  }
}
</script>

<style lang="less" scoped>
.rgoodeazy .textarea-outer .weui-cells{background-color:transparent;}
.rgoodeazy .x-textarea textarea{background-color:transparent;}
</style>
