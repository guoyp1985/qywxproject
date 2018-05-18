/*
* @description: 分享详情页面
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="sharing-detail">
    <group>
      <group-title slot="title">{{$t('Share view user')}}</group-title>
      <template v-if="disList">
        <div v-if="!list || list.length == 0" class="emptyitem flex_center">暂无数据</div>
        <cell v-else class="font13" v-for="(item, index) in list" :key="index" :title="item.linkman">
          <x-img slot="icon" class="avatar imgcover" :src="item.avatar"></x-img>
          <span slot="inline-desc" class="font13">
            {{item.dateline | dateFormat}}
          </span>
        </cell>
      </template>
    </group>
  </div>
</template>
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
    dateFormat (value) {
      return new Time(value).dateFormat('yyyy-MM-dd hh:mm')
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
      let params = { id: self.query.id, module: self.query.module, pagestart: self.pagestart, limit: self.limit }
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
    self.query = self.$route.query
    self.$vux.loading.show()
    self.getData()
  }
}
</script>
<style lang="less" scoped>
#sharing-detail .credit-txt {
  vertical-align: super;
}
#sharing-detail .avatar {
  width: 40px;
  height: 40px;
}
</style>
