<style lang="less">
.buyer-show-page{}
</style>
<template>
  <div class="buyer-show-page containerarea font14" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1')">
    <template v-if="disList1">
      <div v-if="!listData1 || !listData1.length" class="flex_empty">暂无数据</div>
      <div v-else class="scroll_list">
        <div v-for="(item,index) in listData1" :key="index" class="scroll_item">
          <div>{{item.title}}</div>
        </div>
      </div>
      <div class="load-end-area loading" v-if="isLoading1"></div>
      <div class="load-end-area done" v-else-if="isDone1"></div>
    </template>
  </div>
</template>

<script>
import {} from 'vux'
import ENV from 'env'
import Time from '../../libs/time'
import { User } from '#/storage'

export default {
  components: {
  },
  data () {
    return {
      query: {},
      loginUser: {},
      selectedIndex: 0,
      limit: 15,
      pagestart1: 0,
      disList1: false,
      listData1: [],
      isLoading1: false,
      isDone1: false
    }
  },
  methods: {
    getList1 () {
      let params = {pagestart: this.pagestart1, limit: this.limit}
      this.$http.get(`${ENV.BokaApi}/api`, {
        params: params
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.isLoading1 = false
        let retdata = data.data ? data.data : data
        for (var i = 0; i < retdata.length; i++) {
          retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd')
        }
        this.listData1 = this.listData1.concat(retdata)
        this.disList1 = true
        if (retdata.length < this.limit) {
          this.isDone1 = true
        }
      })
    },
    handleScroll (refname) {
      const scrollarea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      this.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          if (this.isLoading1 || this.isDone1) return false
          if (this.listData1.length === (this.pagestart1 + 1) * this.limit) {
            this.pagestart1++
            this.isLoading1 = true
            this.getList1()
          }
        }
      })
    },
    refresh (query) {
      this.loginUser = User.get()
      this.query = this.$route.query
    }
  },
  created () {
  },
  activated () {
    this.refresh()
  }
}
</script>
