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
    <group :title="$t('Credit Details')" v-if="items.length">
      <cell v-for="(item, index) in items" :key="index" class="credit-item" align-items :title="item.title" :inline-desc="item.ldate">
        <!-- <x-img slot="icon" :src="photo" default-src="../src/assets/_images/nopic.jpg"/> -->
        <div slot="child">
          <span class="al al-jinbi color-gold"></span>
          <span class="color-red">{{ item.credit | valueFormat }}</span>
        </div>
      </cell>
    </group>
    <div v-else class="no-related-x color-gray">
      <span>{{$t('No Related Data')}}</span>
    </div>
  </div>
</template>
<script>
import Time from '#/time'
import ENV from 'env'

export default {
  data () {
    return {
      type: '1',
      items: []
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
    getData () {
      const self = this
      this.$http.get(`${ENV.BokaApi}/api/user/creditsList`)
      .then(res => {
        if (res.data.flag) {
          self.items = res.data.data
        }
      })
    }
  },
  created () {
    this.getData()
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
