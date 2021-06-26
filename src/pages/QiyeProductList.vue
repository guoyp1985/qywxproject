<style lang="less">
.qiye-product-list-page{
  .scroll_list{
    .scroll_item{
      background-color:#fff;width:100%;box-sizing: border-box;
      .item-inner{padding:10px;width:100%;box-sizing: border-box;}
    }
    .btn{
      border-radius:60px;background-color:#659af2;color:#fff;
      padding:0 10px;height:30px;display:flex;justify-content:center;align-items:center;
    }
  }
  label{
    input{margin-top:5px;}
  }
}
</style>
<template>
  <div class="qiye-product-list-page containerarea s-havebottom">
    <search
      class="v-search bg-white"
      v-model="searchword"
      :auto-fixed="autofixed"
      @on-submit="onSubmit"
      @on-change="onChange"
      @on-cancel="onCancel"
      placeholder="请输入商品名称"
      ref="search">
    </search>
    <div class="s-topbanner s-topbanner1 flex_left bg-white b_bottom_after" style="top:55px;">
      <label class="flex_center flex_cell">
        <div class="pr10">
          <input @click="clickRadio(1)" type="radio" name="store" :checked="storeid == 1" />
        </div>
        <div class="flex_left" @click="clickInput(1)">中关村店</div>
      </label>
      <label class="flex_center flex_cell">
        <div class="pr10">
          <input @click="clickRadio(2)" type="radio" name="store" :checked="storeid == 2" />
        </div>
        <div class="flex_left" @click="clickInput(2)">胜古店</div>
      </label>
    </div>
    <div class="s-bottom b_top_after">
      <tab class="v-tab" v-model="selectedIndex">
        <tab-item :selected="selectedIndex==0" @on-item-click="clickTab(0)">在售</tab-item>
        <tab-item :selected="selectedIndex==1" @on-item-click="clickTab(1)">沽清</tab-item>
      </tab>
    </div>
    <div class="s-container s-container1" style="top:99px;">
      <div v-show="(selectedIndex == 0)" class="swiper-inner" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1', 0)">
        <div v-if="disList1" class="scroll_list">
          <div v-if="!listData1 || !listData1.length" class="flex_empty">暂无数据</div>
          <template v-else>
            <div v-for="(item,index) in listData1" :key="index" class="scroll_item">
              <div class="flex_left item-inner" @click="toDetail(item)">
                <div class="mr10">
                  <img :src="item.photo" style="width:50px;height:50px;object-fit:cover;" onerror="javascript:this.src='https://tosqy.boka.cn/images/nopic.jpg';" />
                </div>
                <div class="flex_cell">
                  <div class="clamp1">
                    <span class="color-gray" v-if="item.moderate == 0">【已下架】</span>
                    <span class="color-gray" v-if="item.moderate == 2">【已沽清】</span>
                    <span>{{item.title}}</span>
                  </div>
                  <div class="mt5 color-red font12">￥{{item.price}}</div>
                </div>
                <!-- <div class="ml10">
                  <div class="btn" v-if="item.moderate == 1" @click.stop="moderateEvent(item,index)">沽清</div>
                  <div class="btn" v-if="item.moderate == 2" @click.stop="moderateEvent(item,index)">取消沽清</div>
                </div> -->
              </div>
              <div class="flex_center bg-white h40 font14 b_top_after" style="color:#659af2">
                <div class="flex_cell h_100 flex_center b_right_after" v-if="item.moderate == 1" @click.stop="moderateEvent(item,index,2)">沽清</div>
                <div class="flex_cell h_100 flex_center b_right_after" v-if="item.moderate == 2" @click.stop="moderateEvent(item,index,1)">取消沽清</div>
                <div class="flex_cell h_100 flex_center b_right_after" v-if="item.moderate == 1" @click.stop="moderateEvent(item,index,0)">下架</div>
                <div class="flex_cell h_100 flex_center b_right_after" v-if="!item.moderate" @click.stop="moderateEvent(item,index,1)">上架</div>
              </div>
              <div v-if="index < listData1.length - 1" class="pt10 bg-page"></div>
            </div>
          </template>
          <div class="load-end-area loading" v-if="isLoading1"></div>
          <div class="load-end-area done" v-else-if="isDone1"></div>
        </div>
      </div>
      <div v-show="(selectedIndex == 1)" class="swiper-inner" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2', 1)">
        <div v-if="disList2" class="scroll_list">
          <div v-if="!listData2 || !listData2.length" class="flex_empty">暂无数据</div>
          <template v-else>
            <div v-for="(item,index) in listData2" :key="index" class="scroll_item">
              <div class="flex_left item-inner" @click="toDetail(item)">
                <div class="mr10">
                  <img :src="item.photo" style="width:50px;height:50px;object-fit:cover;" onerror="javascript:this.src='https://tosqy.boka.cn/images/nopic.jpg';" />
                </div>
                <div class="flex_cell">
                  <div class="clamp1">
                    <span class="color-gray" v-if="item.moderate == 0">【已下架】</span>
                    <span class="color-gray" v-if="item.moderate == 2">【已沽清】</span>
                    <span>{{item.title}}</span>
                  </div>
                  <div class="mt5 color-red font12">￥{{item.price}}</div>
                </div>
                <!-- <div class="ml10">
                  <div class="btn" v-if="item.moderate == 1" @click.stop="moderateEvent(item,index)">沽清</div>
                  <div class="btn" v-if="item.moderate == 2" @click.stop="moderateEvent(item,index)">取消沽清</div>
                </div> -->
              </div>
              <div class="flex_center bg-white h40 font14 b_top_after" style="color:#659af2">
                <div class="flex_cell h_100 flex_center b_right_after" v-if="item.moderate == 1" @click.stop="moderateEvent(item,index,2)">沽清</div>
                <div class="flex_cell h_100 flex_center b_right_after" v-if="item.moderate == 2" @click.stop="moderateEvent(item,index,1)">取消沽清</div>
                <div class="flex_cell h_100 flex_center b_right_after" v-if="item.moderate == 1" @click.stop="moderateEvent(item,index,0)">下架</div>
                <div class="flex_cell h_100 flex_center b_right_after" v-if="!item.moderate" @click.stop="moderateEvent(item,index,1)">上架</div>
              </div>
              <div v-if="index < listData12.length - 1" class="pt10 bg-page"></div>
            </div>
          </template>
          <div class="load-end-area loading" v-if="isLoading2"></div>
          <div class="load-end-area done" v-else-if="isDone2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Search, Tab, TabItem} from 'vux'
import ENV from 'env'
import Time from '../../libs/time'
import { User } from '#/storage'

export default {
  components: {Search, Tab, TabItem},
  data () {
    return {
      query: {},
      loginUser: {},
      selectedIndex: 0,
      limit: 15,
      pagestart1: 1,
      disList1: false,
      listData1: [],
      isLoading1: false,
      isDone1: false,
      pagestart2: 1,
      disList2: false,
      listData2: [],
      isLoading2: false,
      isDone2: false,
      pageTop: 0,
      submitIng: false,
      searchword: '',
      autofixed: false,
      storeid: 1
    }
  },
  methods: {
    clickRadio (val) {
      let curVal = parseInt(val)
      let isPc = this.$util.isPC()
      if (!isPc) {
        if (this.storeid !== curVal) {
          this.$vux.loading.show()
          this.storeid = parseInt(val)
          this.switchData()
        }
      }
    },
    clickInput (val) {
      let curVal = parseInt(val)
      let isPc = this.$util.isPC()
      if (!isPc) {
        if (this.storeid !== curVal) {
          this.$vux.loading.show()
          this.storeid = parseInt(val)
          this.switchData()
        }
      }
    },
    clickTab (index) {
      this.selectedIndex = parseInt(index)
      this.$vux.loading.show()
      this.switchData()
    },
    switchData () {
      switch (this.selectedIndex) {
        case 0:
          if (this.isLoading1) return false
          this.pagestart1 = 1
          this.disList1 = false
          this.listData1 = []
          this.isLoading1 = false
          this.isDone1 = false
          this.getList1()
          break
        case 1:
          if (this.isLoading2) return false
          this.pagestart2 = 1
          this.disList2 = false
          this.listData2 = []
          this.isLoading2 = false
          this.isDone2 = false
          this.getList2()
          break
      }
    },
    toDetail (item) {
      this.$router.push({path: '/qiyeProduct', query: {id: item.id}})
    },
    moderateEvent (item, index, val) {
      if (this.submitIng) return false
      this.submitIng = true
      let ajaxParams = {id: item.id, module: 'product', moderate: val}
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/content/moderate`, ajaxParams).then(res => {
        this.submitIng = false
        let data = res.data
        this.$vux.loading.hide()
        this.$vux.toast.show({
          text: data.msg,
          type: 'text',
          time: this.$util.delay(data.msg)
        })
        if (data.code === 0) {
          switch (this.selectedIndex) {
            case 0:
              this.listData1[index].moderate = ajaxParams.moderate
              break
            case 1:
              this.listData2[index].moderate = ajaxParams.moderate
              break
          }
        }
      })
    },
    onSubmit () {
      this.$vux.loading.show()
      switch (this.selectedIndex) {
        case 0:
          this.disList1 = false
          this.isDone1 = false
          this.listData1 = []
          this.pagestart1 = 1
          this.getList1()
          break
        case 1:
          this.disList2 = false
          this.isDone2 = false
          this.listData2 = []
          this.pagestart2 = 1
          this.getList2()
          break
      }
    },
    onChange (val) {
      this.searchword = val
    },
    onCancel () {
      this.$vux.loading.show()
      this.searchword = ''
      switch (this.selectedIndex) {
        case 0:
          this.disList1 = false
          this.isDone1 = false
          this.listData1 = []
          this.pagestart1 = 1
          this.getList1()
          break
        case 1:
          this.disList2 = false
          this.isDone2 = false
          this.listData2 = []
          this.pagestart2 = 1
          this.getList2()
          break
      }
    },
    getList1 () {
      let params = {page: this.pagestart1, limit: this.limit, module: 'product', moderate: 1, storeid: this.storeid}
      if (this.searchword && this.searchword !== '') params.keyword = this.searchword
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
        if (this.listData1.length && retdata.length < this.limit) {
          this.isDone1 = true
        }
      })
    },
    getList2 () {
      let params = {page: this.pagestart2, limit: this.limit, module: 'product', moderate: 2, storeid: this.storeid}
      if (this.searchword && this.searchword !== '') params.keyword = this.searchword
      this.$http.get(`${ENV.BokaApi}/api/content/getList`, {
        params: params
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.isLoading2 = false
        let retdata = data.data ? data.data : data
        for (var i = 0; i < retdata.length; i++) {
          retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd')
        }
        this.listData2 = this.listData2.concat(retdata)
        this.disList2 = true
        if (this.listData2.length && retdata.length < this.limit) {
          this.isDone2 = true
        }
      })
    },
    handleScroll (refname) {
      const scrollarea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      this.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          switch (this.selectedIndex) {
            case 0:
              if (this.isLoading1 || this.isDone1) return false
              if (this.listData1.length === this.pagestart1 * this.limit) {
                this.pagestart1++
                this.isLoading1 = true
                this.getList1()
              }
              break
            case 1:
              if (this.isLoading2 || this.isDone2) return false
              if (this.listData2.length === this.pagestart2 * this.limit) {
                this.pagestart2++
                this.isLoading2 = true
                this.getList2()
              }
              break
          }
        }
      })
    },
    refresh () {
      this.loginUser = User.get()
      this.query = this.$route.query
      this.switchData()
    }
  },
  created () {
    this.refresh()
  },
  activated () {
    if (document.querySelector('.vux-tab')) {
      document.querySelector('.vux-tab').scrollLeft = this.tabLeft
    }
    switch (this.selectedIndex) {
      case 0:
        this.$refs.scrollContainer1.scrollTop = this.pageTop
        break
      case 1:
        this.$refs.scrollContainer2.scrollTop = this.pageTop
        break
    }
  },
  beforeRouteLeave (to, from, next) {
    if (document.querySelector('.vux-tab')) {
      this.tabLeft = document.querySelector('.vux-tab').scrollLeft
    }
    switch (this.selectedIndex) {
      case 0:
        this.pageTop = this.$refs.scrollContainer1.scrollTop
        break
      case 1:
        this.pageTop = this.$refs.scrollContainer2.scrollTop
        break
    }
    next()
  }
}
</script>
