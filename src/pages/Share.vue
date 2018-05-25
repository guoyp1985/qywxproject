/*
* @description: 分享明细页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="personal-credit" class="containerarea font14 bg-page">
    <div class="pagetop flex_left font18 pl10 border-box">{{$t('Sharing Details')}}</div>
    <div class="pagemiddle bg-white scroll-container" ref="scrollContainer" @scroll="handleScroll" style="bottom:53px;">
      <group>
        <div v-if="disList" class="scroll_list">
          <cell v-if="list.length" v-for="(item, index) in list"
          :key="item.id"
          class="share-item font14 scroll_item"
          align-items
          :link="{path: '/sharingDetail', query: {id: item.moduleid}}">
            <x-img class="imgcover" style="width:60px;height:60px;" slot="icon" default-src="../src/assets/images/nopic.jpg" :src="item.photo" :offset=0 container=".scroll-container"></x-img>
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
          <div v-else class="no-related-x color-gray">
            <span>{{$t('No Related Data')}}</span>
          </div>
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
export default {
  components: {
    Group, GroupTitle, Cell, XImg
  },
  data () {
    return {
      // query: Object,
      disList: false,
      list: [],
      pagestart: 0,
      limit: 10
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
          if (self.list.length === (self.pagestart + 1) * self.limit) {
            self.pagestart++
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
      const params = { pagestart: self.pagestart, limit: self.limit }
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
      this.$vux.loading.show()
      this.getData()
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
</style>
