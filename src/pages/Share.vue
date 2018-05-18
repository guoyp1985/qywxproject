/*
* @description: 分享明细页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="personal-credit">
    <!-- <c-title :link-info="{path:'/profile'}"
            :link-credit="{path:'/credit'}">
    </c-title> -->
    <group>
      <group-title slot="title">{{$t('Sharing Details')}}</group-title>
      <template v-if="disList">
        <template v-if="list.length">
          <cell v-for="(item, index) in list"
          :key="item.id"
          class="share-item font14"
          align-items
          :link="{path: '/sharingDetail', query: {id: item.id, module: item.module}}">
            <x-img class="imgcover" style="width:60px;height:60px;" slot="icon" default-src="../src/assets/images/nopic.jpg" :src="item.photo" container="#vux_view_box_body"></x-img>
            <div slot="inline-desc">
              <div class="clamp1"><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{item.title}}</div>
              <div class="clamp1 font12 mt5 color-gray">{{item.dateline | dateFormat}} {{item.typestr}}</div>
            </div>
            <div slot="child">
              <span class="al al-jinbi color-gold"></span>
              <span class="color-red credit-txt">{{ item.credit | valueFormat }}</span>
            </div>
          </cell>
        </template>
        <div v-else class="no-related-x color-gray">
          <span>{{$t('No Related Data')}}</span>
        </div>
      </template>
    </group>
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
      query: Object,
      disList: false,
      list: [],
      pagestart: 0,
      limit: 10,
      isBindScroll: false,
      scrollContainer: document.querySelector('#vux_view_box_body')
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
    scroll: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollContainer,
        callback: function () {
          if (self.list.length === (self.pagestart + 1) * self.limit) {
            self.pagestart++
            self.$vux.loading.show()
            self.getData()
          }
        }
      })
    },
    getData () {
      const self = this
      let params = { pagestart: self.pagestart, limit: self.limit }
      this.$http.get(`${ENV.BokaApi}/api/user/shareList`, {
        params: params
      })
      .then(res => {
        self.$vux.loading.hide()
        let data = res.data
        let retdata = data.data ? data.data : data
        self.list = self.list.concat(retdata)
        self.disList = true
        if (!self.isBindScroll) {
          self.isBindScroll = true
          self.scrollContainer.removeEventListener('scroll', self.scroll)
          self.scrollContainer.addEventListener('scroll', self.scroll)
        }
      })
    },
    getDateState: function (dt) {
      return this.$util.getDateState(dt)
    },
    getDateClass: function (dt) {
      let ret = this.$util.getDateClass(dt)
      ret = `${ret} mr5`
      return ret
    }
  },
  created () {
    const self = this
    self.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    self.$vux.loading.show()
    self.getData()
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
