<style lang="less">
.qiye-news-list-page{
  .scroll_list{
    .scroll_item{background-color:#fff;padding:10px;width:100%;box-sizing: border-box;}
  }
}
</style>
<template>
  <div class="qiye-news-list-page containerarea" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1')">
    <div v-if="disList1" class="scroll_list">
      <div v-if="!listData1 || !listData1.length" class="flex_empty">暂无数据</div>
      <template v-else>
        <div v-for="(item,index) in listData1" :key="index" class="scroll_item flex_left" @click="toDetail(item)">
          <div class="mr10">
            <img :src="item.photo" style="width:90px;height:50px;object-fit:cover;" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" />
          </div>
          <div class="flex_cell">
            <div class="clamp1">{{item.title}}</div>
            <div class="mt5 color-gray font12">{{item.dateline_str}}</div>
          </div>
        </div>
      </template>
      <div class="load-end-area loading" v-if="isLoading1"></div>
      <div class="load-end-area done" v-else-if="isDone1"></div>
    </div>
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
    toDetail (item) {
      this.$router.push({path: '/qiyeNews', query: {id: item.id}})
    },
    getList1 () {
      let params = {pagestart: this.pagestart1, limit: this.limit, module: 'news'}
      this.$http.get(`${ENV.BokaApi}/api/content/getList`, {
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
    refresh () {
      this.loginUser = User.get()
      this.query = this.$route.query
      this.pagestart1 = 0
      this.disList1 = false
      this.listData1 = []
      this.isLoading1 = false
      this.isDone1 = false
      this.getList1()
    }
  },
  created () {
  },
  activated () {
    this.refresh()
  }
}
</script>
