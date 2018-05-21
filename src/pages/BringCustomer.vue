/*
* @description: 带来客户页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="bring-customer">
    <sticky scroll-box="bring-customer">
      <div class="bring-customer-title font16 color-white">
        {{$t('Bring Customer')}}
      </div>
    </sticky>
    <view-box>
      <group v-if="list.length">
        <cell class="user-cell" v-for="(item, index) in list" :key="index" :title="item.linkman">
          <x-img slot="icon" :src="item.avatar" class="radius50 imgcover"></x-img>
          <div slot="inline-desc">
            <span class="color-gray font13">{{item.dateline | dateFormat}}</span>
          </div>
        </cell>
      </group>
      <template v-else>
        <div class="no-related-x color-gray">
          <span>{{$t('No Related Data')}}</span>
        </div>
      </template>
    </view-box>
  </div>
</template>
<script>
import { ViewBox, Group, Cell, XImg, Sticky } from 'vux'
import ENV from 'env'
import Time from '#/time'

export default {
  components: {
    ViewBox, Group, Cell, XImg, Sticky
  },
  data () {
    return {
      query: Object,
      list: [],
      limit: 20,
      pagestart1: 0,
      isBindScroll1: false,
      scrollArea1: null
    }
  },
  filters: {
    dateFormat (date) {
      return new Time(date * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    scroll1: function () {
      const self = this
      self.$util.scrollEvent({
        element: self.scrollArea1,
        callback: function () {
          if (self.list.length === (self.pagestart1 + 1) * self.limit) {
            self.pagestart1++
            self.$vux.loading.show()
            self.getdata()
          }
        }
      })
    },
    getdata () {
      const self = this
      let params = {}
      if (self.query.wid) {
        params.wid = self.query.wid
      }
      this.$http.post(`${ENV.BokaApi}/api/seller/bringCustomer`, params)
      .then(res => {
        let data = res.data
        self.$vux.loading.hide()
        let retdata = data.data ? data.data : data
        self.list = self.list.concat(retdata)
        self.disdata = true
        if (!self.isBindScroll1) {
          self.scrollArea1 = document.querySelector('#vux_view_box_body')
          self.isBindScroll1 = true
          self.scrollArea1.removeEventListener('scroll', self.scroll1)
          self.scrollArea1.addEventListener('scroll', self.scroll1)
        }
      })
    }
  },
  created () {
    const self = this
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
    self.query = self.$route.query
    self.$http.post(`${ENV.BokaApi}/api/retailer/logAction`, {
      module: 'retailer', action: 'bringcustomer'
    })
    self.$vux.loading.show()
    this.getdata()
  }
}
</script>
<style lang="less">
#bring-customer .bring-customer-title {
  padding: 10px;
  background-image: url('../assets/images/bannerbg2.png');
}
#bring-customer .user-cell img {
  width: 40px;
  height: 40px;
}

/* vux css hack */
#bring-customer .weui-cell__hd {
  display: flex;
}
#bring-customer .weui-cells {
  margin-top: 0;
}
#bring-customer .weui-cells:before {
  height: 0;
  border-top: none;
}
#bring-customer .vux-cell-primary {
  padding-left: 10px;
}
</style>
