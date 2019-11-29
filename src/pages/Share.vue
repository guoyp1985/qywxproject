/*
* @description: 分享明细页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="personal-credit" class="containerarea font14 bg-page nobottom">
    <div class="s-topbanner s-topbanner1 flex_left font16 pl10 border-box b_bottom_after">{{$t('Sharing Details')}}</div>
    <div class="s-container s-container1 bg-white scroll-container pl10 pr10" ref="scrollContainer" @scroll="handleScroll">
      <group>
        <div v-if="disList" class="scroll_list">
          <div v-if="!list || list.length == 0" class="no-related-x color-gray">
            <span>{{$t('No Related Data')}}</span>
          </div>
          <cell v-else v-for="(item, index) in list"
          :key="item.id"
          class="share-item font14 scroll_item"
          align-items
          :link="{path: '/sharingDetail', query: {id: item.moduleid}}">
            <img class="imgcover" style="width:60px;height:60px;" slot="icon" :src="item.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
            <div slot="inline-desc">
              <div class="t-table">
                <div class="t-cell v_middle">
                  <div class="clamp1"><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{item.title}}</div>
                  <div class="clamp1 font12 mt5 color-gray">{{item.dateline | dateFormat}} {{item.typestr}}</div>
                </div>
                <div class="t-cell v_middle w60 align_right">
                  <span class="al al-jinbi color-gold"></span>
                  <span class="color-red credit-txt">{{ item.credit | valueFormat }}</span>
                </div>
              </div>
            </div>
          </cell>
        </div>
      </group>
    </div>
  </div>
</template>

<i18n>
Sharing Details:
  zh-CN: 分享明细
</i18n>

<script>
import { Group, GroupTitle, Cell, XImg } from 'vux'
import Time from '#/time'
import ENV from 'env'

const limit = 10
let pageStart = 0
export default {
  components: {
    Group, GroupTitle, Cell, XImg
  },
  data () {
    return {
      query: {},
      disList: false,
      list: []
    }
  },
  filters: {
    dateFormat: function (isoDate) {
      return `${new Time(isoDate * 1000).dateFormat('yyyy-MM-dd hh:mm')} 分享给朋友`
    },
    valueFormat: function (value) {
      return Number(value) < 0 ? `${value}` : `+${value}`
    }
  },
  methods: {
    handleScroll: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.$refs.scrollContainer,
        callback: function () {
          if (self.list.length === (pageStart + 1) * limit) {
            pageStart++
            self.$vux.loading.show()
            self.getData()
          }
        }
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
      const params = { pagestart: pageStart, limit: limit }
      this.$http.get(`${ENV.BokaApi}/api/user/shareList`, { params: params })
      .then(res => {
        self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.list = self.list.concat(retdata)
        self.disList = true
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      if (this.list.length < limit) {
        this.disList = false
        this.list = []
        this.$vux.loading.show()
        pageStart = 0
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
#personal-credit .share-item img {
  width: 60px;
  float: left;
}
#personal-credit .credit-txt {
  vertical-align: super;
}

/* weui css hack */
#personal-credit .vux-cell-primary {
  margin-left: 10px;
}
#personal-credit .weui-cell__ft {
  padding-right: 20px;
}
#personal-credit .weui-cells{margin-top: 0px;}
#personal-credit .scroll_list .scroll_item{padding:10px;}
#personal-credit .weui-cells:before{display:none;}
#personal-credit .weui-cells:last-child::after{display: none;}
#personal-credit .s-topbanner{background:transparent;}
#personal-credit .scroll_list .scroll_item:after{display: none;}
</style>
