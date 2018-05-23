/*
* @description: 知识库列表页
* @auther: gyp
* @created_date: 2018-04-28
*/
<template>
  <div class="containerarea font14 bg-white knowledgeclass notop">
    <div class="pagemiddle" ref="scrollContainer" @scroll="handleScroll">
      <div v-if="!data || data.length == 0" class="emptyitem flex_center">暂无数据</div>
      <router-link v-else v-for="(item,index) in data" :key="item.id" :to="{path: '/knowledge', query: {id: item.id}}" class="scroll_item">
        <div class="pic">
          <div class="inner">
            <x-img class="imgcover" :src="item.photo" default-src="../src/assets/images/nopic.jpg" :offset="0" container=".scroll-container"></x-img>
          </div>
        </div>
        <div class="padding15 border-box">
          <div class="font16">{{ item.title }}</div>
          <div class="color-gray clamp2">{{ item.summary }}</div>
        </div>
      </router-link>
    </div>
    <div class="pagebottom bottomnaviarea b_top_after">
      <div class="t-table bottomnavi">
        <router-link class="t-cell item" to="/centerSales">{{ $t('I am the seller') }}</router-link>
        <div class="t-cell item">
          <popover class="x-popover" placement="top" @on-show="onShow" @on-hide="onHide" >
            <div slot="content" class="popover-demo-content">
              <div class="x-popover-list">
                <router-link class="pitem" to="/store">{{ $t('My shop') }}</router-link>
                <router-link class="pitem" to="/retailerSalcechance">{{ $t('Sale chance') }}</router-link>
                <router-link class="pitem" to="/retailerSales">{{ $t('Rebate customer') }}</router-link>
                <router-link class="pitem" to="/retailerOrders">{{ $t('Order manage') }}</router-link>
                <router-link class="pitem" to="/center">{{ $t('Personal Center') }}</router-link>
              </div>
            </div>
            <div><img class="ico" src="../assets/images/icon-menu.png" /><span class="v_middle">{{ $t('Sales Assistant') }}</span></div>
          </popover>
        </div>
        <router-link class="t-cell item" :to="{path: '/knowledgeclass', query: {classid: 1}}">{{ $t('Newcomer Guide') }}</router-link>
      </div>
    </div>
  </div>
</template>

<i18n>
I am the seller:
  zh-CN: 我是卖家
Sales Assistant:
  zh-CN: 销售助手
Newcomer Guide:
  zh-CN: 新手指南
</i18n>

<script>
import { Popover, XImg } from 'vux'
import ENV from 'env'

export default {
  components: {
    Popover, XImg
  },
  data () {
    return {
      query: {},
      data: [],
      limit: 20,
      pagestart1: 0
    }
  },
  computed: {
  },
  filters: {
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
            self.getdata1()
          }
        }
      })
    },
    getdata1 () {
      const self = this
      let params = { params: { pagestart: self.pagestart1, limit: self.limit } }
      if (self.query.classid) {
        params.params.classid = self.query.classid
      }
      self.$http.get(`${ENV.BokaApi}/api/list/knowledge`, params).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.data = self.data.concat(retdata)
      })
    },
    onShow () {
      console.log('on show')
    },
    onHide () {
      console.log('on hide')
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    self.query = self.$route.query
    self.$vux.loading.show()
    self.getdata1()
  }
}
</script>

<style lang="less">
.knowledgeclass .scroll_item{
  box-shadow: 0 1px 2px rgba(0,0,0,.3);
  position: relative;
  border-radius: 2px;
}
.knowledgeclass .scroll_item:not(:last-child){margin-bottom:10px;}
.knowledgeclass .scroll_item .pic{
  padding-bottom:55%;
  position:relative;
}
.knowledgeclass .scroll_item .pic .inner{
  position:absolute;
  left:0;right:0;bottom:0;top:0;
}
.knowledgeclass .scroll_item .pic img{
  width:100%;height:100%;vertical-algin:middle;
}
.x-popover-list .pitem{
  position:relative;
  padding:10px;
  display:block;
}
.x-popover-list .pitem:not(:last-child):after{
  content:"";display:block;
	background-color:@list-border-color;height:1px;overflow:hidden;
	position: absolute;left: 0;right: 0;bottom:0px;
	-webkit-transform: scaleY(0.5) translateY(0.5px);
	transform: scaleY(0.5) translateY(0.5px);
	-webkit-transform-origin: 0% 0%;
	transform-origin: 0% 0%;
}
</style>
