/*
* @description: 金币详情页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="personal-credit" class="containerarea font14 bg-page">
    <div class="pagetop flex_left font18 pl10 border-box">{{$t('Credit Details')}}</div>
    <div class="pagemiddle bg-white scroll-container" ref="scrollContainer" @scroll="handleScroll" style="bottom:53px;">
      <group>
        <div v-if="disList" class="scroll_list">
          <cell v-if="list && list.length > 0" v-for="(item, index) in list" :key="index" class="credit-item" align-items >
            <x-img class="imgcover" style="width:60px;height:60px;" slot="icon" default-src="../src/assets/images/nopic.jpg" :src="item.photo" :offset=0 container=".scroll-container"></x-img>
            <div slot="inline-desc">
              <div class="t-table">
                <div class="t-cell v_middle">
                  <div class="clamp1"><span :class="getDateClass(item.dateline)">{{ getDateState(item.dateline) }}</span>{{item.title}}</div>
                  <div class="clamp1 font12 mt5 color-gray">{{item.ldate}} {{item.typestr}}</div>
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
      doCreated: false,
      query: {},
      disList: false,
      list: [],
      pagestart: 0,
      limit: 20
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
    handleScroll () {
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
    self.doCreated = true
    self.$vux.loading.show()
    self.getData()
  },
  activated () {
    const self = this
    if (!self.doCreated && self.list.length === 0) {
      self.getData()
    }
    self.doCreated = false
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
