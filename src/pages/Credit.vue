/*
* @description: 金币详情页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="personal-credit">
    <!-- <c-title :link-info="{path:'/profile'}"
            :link-credit="{path:'/credit'}">
    </c-title> -->
    <template v-if="disList">
      <group :title="$t('Credit Details')" v-if="list.length">
        <cell v-for="(item, index) in list" :key="index" class="credit-item" align-items :title="item.title" :inline-desc="item.ldate">
          <x-img slot="icon" :src="item.photo" class="imgcover" default-src="../src/assets/images/nopic.jpg" container="#vux_view_box_body"/>
          <div slot="child">
            <span class="al al-jinbi color-gold"></span>
            <span class="color-red">{{ item.credit | valueFormat }}</span>
          </div>
        </cell>
      </group>
      <div v-else class="no-related-x color-gray">
        <span>{{$t('No Related Data')}}</span>
      </div>
    </template>
  </div>
</template>
<script>
import { Group, Cell, XImg } from 'vux'
import CTitle from '@/components/CTitle'
import Time from '#/time'
import ENV from 'env'

export default {
  components: {
    Group, Cell, XImg, CTitle
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
      return new Time(isoDate).dateFormat('yyyy-MM-dd hh:mm:ss')
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
      this.$http.get(`${ENV.BokaApi}/api/user/creditsList`, {
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
    }
  },
  created () {
    const self = this
    self.$vux.loading.show()
    self.getData()
  }
}
</script>

<style lang="less">
#personal-credit .credit-item img {
  width: 60px;
  float: left;
}

/* weui css hack */
#personal-credit .vux-cell-primary {
  margin-left: 10px;
}
</style>
