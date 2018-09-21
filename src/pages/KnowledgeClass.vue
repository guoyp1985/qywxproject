/*
* @description: 知识库列表页
* @auther: gyp
* @created_date: 2018-04-28
*/
<template>
  <div class="containerarea font14 bg-white knowledgeclass notop">
    <div class="pagemiddle" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
      <template v-if="disData">
        <div v-if="!data || data.length == 0" class="emptyitem flex_center">暂无数据</div>
        <router-link v-else v-for="(item,index) in data" :key="item.id" :to="{path: '/knowledge', query: {id: item.id}}" class="scroll_item">
          <div class="pic">
            <div class="inner">
              <img class="imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
            </div>
          </div>
          <div class="padding15 border-box">
            <div class="font16">{{ item.title }}</div>
            <div class="color-gray clamp2">{{ item.summary }}</div>
          </div>
        </router-link>
      </template>
    </div>
    <div class="pagebottom bottomnaviarea b_top_after">
      <div class="t-table bottomnavi">
        <router-link class="t-cell item" to="/centerSales">{{ $t('I am the seller') }}</router-link>
        <router-link class="t-cell item" to="/center">{{ $t('Center') }}</router-link>
        <!--
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
            <div><img class="ico" src="https://tossharingsales.boka.cn/images/icon-menu.png" /><span class="v_middle">{{ $t('Sales Assistant') }}</span></div>
          </popover>
        </div>
      -->
        <router-link class="t-cell item" :to="{path: '/knowledgeClass', query: {classid: 1}}">{{ $t('Newcomer Guide') }}</router-link>
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
      limit: 10,
      pagestart1: 0,
      disData: false
    }
  },
  methods: {
    handleScroll: function (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.data.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getData()
          }
        }
      })
    },
    getData () {
      const self = this
      const params = { params: { pagestart: this.pagestart1, limit: this.limit } }
      if (self.query.classid) {
        params.params.classid = self.query.classid
      }
      this.$vux.loading.show()
      self.$http.get(`${ENV.BokaApi}/api/list/knowledge`, params).then(function (res) {
        const data = res.data
        const retdata = data.data ? data.data : data
        self.$vux.loading.hide()
        self.data = self.data.concat(retdata)
        self.disData = true
      })
    },
    onShow () {
      console.log('on show')
    },
    onHide () {
      console.log('on hide')
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.query = this.$route.query
      if (this.data.length < this.limit) {
        this.pagestart1 = 0
        this.getData()
      }
    }
  },
  activated () {
    this.refresh()
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
