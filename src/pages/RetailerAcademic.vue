/*
* @description: 商学院推荐素材页
* @auther: gyp
* @created_date: 2018-04-28
*/
<template>
  <div class="containerarea font14 knowledgeclass notop nobottom bg-page">
    <apply-tip v-if="showApply"></apply-tip>
    <subscribe v-if="loginUser.subscribe == 0 && !loginUser.isretailer"></subscribe>
    <template v-if="showContainer">
      <div class="pagemiddle" ref="scrollContainer" @scroll="handleScroll('scrollContainer')">
        <template v-if="disData">
          <div v-if="!data || data.length == 0" class="emptyitem flex_center">暂无素材</div>
          <router-link v-else v-for="(item,index) in data" :key="index" :to="{path: '/academic', query: {id: item.id, fid: item.fid}}" class="scroll_item db bg-white">
            <div class="pic">
              <div class="inner">
                <img class="imgcover" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
              </div>
            </div>
            <div class="padding15 border-box">
              <div class="font16">{{ item.title }}</div>
            </div>
          </router-link>
        </template>
      </div>
    </template>
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
import { User } from '#/storage'
import Subscribe from '@/components/Subscribe'
import ApplyTip from '@/components/ApplyTip'

const limit = 10
let pageStart = 0

export default {
  components: {
    Popover, XImg, Subscribe, ApplyTip
  },
  data () {
    return {
      showApply: false,
      showContainer: false,
      query: {},
      loginUser: {},
      data: [],
      disData: false
    }
  },
  methods: {
    initData () {
      pageStart = 0
      this.disData = false
      this.data = []
    },
    handleScroll: function (refname) {
      const self = this
      const scrollarea = self.$refs[refname][0] ? self.$refs[refname][0] : self.$refs[refname]
      self.$util.scrollEvent({
        element: scrollarea,
        callback: function () {
          if (self.data.length === (pageStart + 1) * limit) {
            pageStart++
            self.$vux.loading.show()
            self.getData()
          }
        }
      })
    },
    getData () {
      const self = this
      const params = { pagestart: pageStart, limit: limit, module: 'academic' }
      if (this.query.fid) {
        params.fid = this.query.fid
      }
      this.$vux.loading.show()
      self.$http.post(`${ENV.BokaApi}/api/retailer/recommendNews`, params).then(function (res) {
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
    init () {
      this.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
        module: 'retailer', action: 'academic'
      })
    },
    initContainer () {
      this.showApply = false
      this.showContainer = false
    },
    refresh () {
      const self = this
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.$vux.loading.show()
      this.loginUser = User.get()
      if (this.loginUser && (this.loginUser.subscribe !== 0 || this.loginUser.isretailer)) {
        // if (self.loginUser.isretailer === 2) {
        //   this.$vux.loading.hide()
        //   self.initContainer()
        //   self.$vux.loading.hide()
        //   let backUrl = encodeURIComponent(location.href)
        //   location.replace(`${ENV.Host}/#/pay?id=${self.loginUser.payorderid}&module=payorders&lasturl=${backUrl}`)
        // }
        if (!this.loginUser.isretailer) {
          this.$vux.loading.hide()
          self.initContainer()
          this.showApply = true
        } else {
          self.initContainer()
          this.showContainer = true
          this.query = this.$route.query
          if (this.data.length < limit) {
            this.initData()
            this.getData()
          } else {
            this.$vux.loading.hide()
          }
        }
      }
    }
  },
  created () {
    this.init()
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
