<style lang="less">
.book-list-page.nobottom{
  .s-container{bottom:0;}
}
.book-list-page{
  .s-container{bottom:50px;overflow-y:auto;}
  .scroll_list{
    padding-top:10px;
    .scroll_item:not(:first-child){margin-top:12px;}
    .scroll_item{
      box-sizing: border-box;background-color:#fff;
      .btn{
        padding:0 10px;line-height:27px;
        background-color: #07c160;color:#fff;
        border-radius:5px; font-size:14px;font-weight:bold;
      }
    }
  }
  .txt-list{
    width:100%;padding:10px;box-sizing:border-box;
    .txt-item:not(:last-child){padding-bottom:10px;}
    .txt-item{
      display:flex;justify-content: flex-start;align-items: center;
      .txt-cell{
        display:flex;justify-content: flex-end;align-items: center;
        flex:1;padding-left:10px;box-sizing: border-box;
        color:#000;font-weight:bold;
      }
    }
  }
  .page-footer{
    display:flex;justify-content: center;align-items: center;
    width:100%;box-sizing: border-box;height:50px;
    position: absolute;left: 0;right: 0;bottom: 0;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.07);
    .item{
      flex:1;display:flex;justify-content: center;align-items: center;height:100%;
      background-color:#ea3a3a;color:#fff;
    }
  }
  .reject-modal{
    .textarea{width:100%;height:100px;resize:none;}
  }
}
</style>
<template>
  <div :class="`containerarea book-list-page ${(loginUser && loginUser.identity == 2) ? '' : 'nobottom'}`">
    <div class="s-topbanner s-topbanner1 bg-white">
      <div class="row">
        <tab v-model="selectedIndex" class="v-tab">
          <tab-item :selected="selectedIndex == 0" @on-item-click="clickTab(0)">待处理</tab-item>
          <tab-item :selected="selectedIndex == 1" @on-item-click="clickTab(1)">今日预订</tab-item>
        </tab>
      </div>
    </div>
    <div class="s-container s-container1">
      <div v-show="(selectedIndex == 0)" class="swiper-inner" ref="scrollContainer1" @scroll="handleScroll('scrollContainer1', 0)">
        <template v-if="disList1">
          <div v-if="!listData1 || !listData1.length" class="flex_empty">暂无预订数据</div>
          <div v-else class="scroll_list">
            <div v-for="(item,index) in listData1" :key="index" class="scroll_item b_bottom_after">
              <div class="flex_left b_top_after" style="width:100%;padding:10px;box-sizing:border-box;">
                <div class="flex_cell bold font16">{{item.canbie_name}}</div>
                <!-- <div class="flex_right color-red font12">{{item.moderate_name}}</div> -->
              </div>
              <div class="txt-list b_top_after">
                <div class="txt-item">
                  <span>{{item.storename.title}}</span>
                  <span class="ml5" v-if="item.tableid">{{item.tableid}}桌</span>
                  <span>：</span>
                  <span class="ml5">{{item.title}} {{item.sex_name}}</span>
                  <span style="color:#659af2;" @click="toPhone(item)">{{item.mobile}}</span>
                </div>
                <div class="txt-item">
                  <span>预订餐台：</span>
                  <span>{{item.tabletype_name}}</span>
                </div>
                <div class="txt-item">
                  <span>就餐人数：</span>
                  <span>{{item.dinners}}人</span>
                </div>
                <div class="txt-item">
                  <span>预约时间：</span>
                  <span>{{item.dinnertime}}</span>
                </div>
                <div class="txt-item" v-if="item.content && item.content != ''">
                  <span>备注：</span>
                  <span v-html="item.content"></span>
                </div>
              </div>
              <div class="b_top_after" v-if="item.moderate == 0 || item.moderate == -1" style="width:100%;padding:10px;box-sizing:border-box;">
                <!-- <div class="flex_left">
                  <div>预定时间</div>
                  <div class="flex_cell flex_right color-gray">{{item.dateline_str}}</div>
                </div> -->
                <div class="flex_right" v-if="item.moderate == 0">
                  <div class="btn" @click="agreeEvent(item,index)">接受预订</div>
                  <div class="btn ml10 bg-gray" @click="rejectEvent(item,index)">拒绝预订</div>
                </div>
                <template v-if="item.moderate == -1">
                  <!-- <div class="flex_left" v-if="item.tableid && item.tableid != ''">
                    <div>就餐桌号</div>
                    <div class="flex_cell flex_right color-red">{{item.tableid}}</div>
                  </div> -->
                  <div class="flex_left" v-if="item.rejectreason && item.rejectreason != ''">
                    <div>拒绝原因</div>
                    <div class="flex_cell flex_right color-red">{{item.rejectreason}}</div>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div class="load-end-area loading" v-if="isLoading1"></div>
          <div class="load-end-area done" v-else-if="isDone1"></div>
        </template>
      </div>
      <div v-show="(selectedIndex == 1)" class="swiper-inner" ref="scrollContainer2" @scroll="handleScroll('scrollContainer2', 1)">
        <template v-if="disList2">
          <div v-if="!listData2 || !listData2.length" class="flex_empty">暂无数据</div>
          <div v-else class="scroll_list">
            <div v-for="(item,index) in listData2" :key="index" class="scroll_item b_bottom_after">
              <div class="flex_left b_top_after" style="width:100%;padding:10px;box-sizing:border-box;">
                <div class="flex_cell bold font16">{{item.canbie_name}}</div>
                <!-- <div class="flex_right color-red font12">{{item.moderate_name}}</div> -->
              </div>
              <div class="txt-list b_top_after">
                <div class="txt-item">
                  <span>{{item.storename.title}}</span>
                  <span>：</span>
                  <span class="ml5">{{item.title}} {{item.sex_name}}</span>
                  <span style="color:#659af2;" @click="toPhone(item)">{{item.mobile}}</span>
                </div>
                <div class="txt-item">
                  <span>预约时间：</span>
                  <span>{{item.dinnertime}}</span>
                  <span>，</span>
                  <span class="color-red font16 bold">{{item.tabletype_name}}</span>
                  <span class="color-red font16 bold">{{item.tableid}}</span>
                </div>
              </div>
              <div class="b_top_after" style="width:100%;padding:10px;box-sizing:border-box;">
                <div class="flex_right">
                  <div v-if="!item.shorturl || item.shorturl == ''" class="btn" @click="createUrl(item,index)">生成短链接</div>
                  <div v-else class="btn bg-gray" @click="copyUrl(item,index)">
                    <span>复制短链接</span>
                    <div :class="`copy_txt copy_txt${index}`" style="opacity:0;height:0px;width:0px;">{{item.shorturl}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="load-end-area loading" v-if="isLoading2"></div>
          <div class="load-end-area done" v-else-if="isDone2"></div>
        </template>
      </div>
    </div>
    <div class="page-footer" v-if="loginUser && loginUser.identity == 2">
      <router-link class="item" to="/addBook">添加预订</router-link>
    </div>
    <div class="auto-modal flex_center" v-if="showAgree">
      <div class="modal-inner">
        <div class="box-outer">
          <div class="box-title bold font18 align_center">请输入桌号</div>
          <div class="padding10">
            <input style="width:100%;" v-model="tableid" type="number" class="input" placeholder="桌号" />
          </div>
          <div class="flex_center pt20 pb20">
            <div class="flex_center" style="width:80%;height:30px;border-radius:60px;background-color:#eb6b5e;color:#fff;" @click="submitAgree">接受预定</div>
          </div>
        </div>
        <div class="close-area flex_center">
          <div class="al al-close" @click="closeModal"></div>
        </div>
      </div>
    </div>
    <div class="auto-modal flex_center reject-modal" v-if="showReject">
      <div class="modal-inner">
        <div class="box-outer">
          <div class="box-title bold font18 align_center">拒绝原因</div>
          <div class="padding10">
            <textarea class="textarea" v-model="reason" placeholder="请输入拒绝原因"></textarea>
          </div>
          <div class="flex_center pt20 pb20">
            <div class="flex_center" style="width:80%;height:30px;border-radius:60px;background-color:#eb6b5e;color:#fff;" @click="submitReject">拒绝预定</div>
          </div>
        </div>
        <div class="close-area flex_center">
          <div class="al al-close" @click="closeModal"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Tab, TabItem} from 'vux'
import ENV from 'env'
import Time from '../../libs/time'
import { User } from '#/storage'
import jQuery from 'jquery'

export default {
  components: {Tab, TabItem},
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
      showAgree: false,
      showReject: false,
      tableid: '',
      reason: '',
      clickData: {},
      clickIndex: 0
    }
  },
  methods: {
    copyUrl (item, index) {
      let eleobj = jQuery(`.copy_txt${index}`)[0]
      console.log(eleobj)
      let range = null
      let save = function (e) {
        e.clipboardData.setData('text/plain', eleobj.innerHTML)
        e.preventDefault()
      }
      if (this.$util.isIOS()) { // ios设备
        this.isIOS = true
        console.log('in iOS')
        window.getSelection().removeAllRanges()
        range = document.createRange()
        range.selectNode(eleobj)
        window.getSelection().addRange(range)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
      } else { // 安卓设备
        console.log('in android')
        this.isIOS = false
        document.addEventListener('copy', save)
        document.execCommand('copy')
        document.removeEventListener('copy', save)
      }
    },
    createUrl (item, index) {
      this.$vux.loading.show()
      console.log(ENV.BookPage[ENV.factory])
      this.$http.get(`${ENV.BokaApi}/api/wxa/url_scheme`, {
        params: {
          path: ENV.BookPage[ENV.factory],
          query: `id=${item.id}`,
          expiredays: 0
        }
      }).then(res => {
        this.$vux.loading.hide()
        const data = res.data
        this.$vux.toast.show({
          text: data.msg,
          type: 'text',
          time: this.$util.delay(data.msg)
        })
        if (data.code === 0) {
          this.listData2[index].shorturl = data.data
        }
      })
    },
    switchData () {
      switch (this.selectedIndex) {
        case 0:
          if (this.isLoading1) return false
          if (this.listData1.length < this.limit) {
            this.pagestart1 = 1
            this.disList1 = false
            this.listData1 = []
            this.isLoading1 = true
            this.isDone1 = false
            this.getList1()
          }
          break
        case 1:
          if (this.isLoading2) return false
          if (this.listData2.length < this.limit) {
            this.pagestart2 = 1
            this.disList2 = false
            this.listData2 = []
            this.isLoading2 = true
            this.isDone2 = false
            this.getList2()
          }
          break
      }
    },
    clickTab (index) {
      this.selectedIndex = parseInt(index)
      this.switchData()
    },
    toPhone (item) {
      location.href = `tel:${item.mobile}`
    },
    initModal () {
      this.showAgree = false
      this.showReject = false
      this.tableid = ''
      this.reason = ''
    },
    closeModal () {
      this.initModal()
    },
    agreeEvent (item, index) {
      this.clickData = item
      this.clickIndex = index
      this.showAgree = true
    },
    rejectEvent (item, index) {
      this.clickData = item
      this.clickIndex = index
      this.showReject = true
    },
    handleAjax (ajaxData) {
      this.submitIng = true
      this.$vux.loading.show()
      this.$http.get(`${ENV.BokaApi}/api/bookdinner/dealBook`, {
        params: ajaxData
      }).then(res => {
        this.submitIng = false
        let data = res.data
        this.$vux.loading.hide()
        this.$vux.toast.show({
          text: data.msg,
          type: 'text',
          time: this.$util.delay(data.msg)
        })
        if (data.code === 0) {
          this.initModal()
          this.refresh()
        }
      })
    },
    submitAgree () {
      if (this.submitIng) return false
      if (!this.tableid || this.tableid === '') {
        this.$vux.toast.show({
          text: '请输入桌号',
          type: 'text'
        })
        return false
      }
      this.handleAjax({id: this.clickData.id, tableid: this.tableid, agree: 1})
    },
    submitReject () {
      if (this.submitIng) return false
      if (!this.reason || this.reason === '') {
        this.$vux.toast.show({
          text: '请输入拒绝原因',
          type: 'text'
        })
        return false
      }
      this.handleAjax({id: this.clickData.id, rejectreason: this.reason, agree: 0})
    },
    getList1 () {
      let params = {from: 'cms', page: this.pagestart1, limit: this.limit, flag: 1}
      this.$http.get(`${ENV.BokaApi}/api/bookdinner/bookList`, {
        params: params
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.isLoading1 = false
        let retdata = data.data ? data.data : data
        for (var i = 0; i < retdata.length; i++) {
          retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
        }
        this.listData1 = this.listData1.concat(retdata)
        this.disList1 = true
        if (this.listData1.length && retdata.length < this.limit) {
          this.isDone1 = true
        }
      })
    },
    getList2 () {
      let params = {from: 'cms', page: this.pagestart2, limit: this.limit, flag: 2}
      this.$http.get(`${ENV.BokaApi}/api/bookdinner/bookList`, {
        params: params
      }).then(res => {
        let data = res.data
        this.$vux.loading.hide()
        this.isLoading2 = false
        let retdata = data.data ? data.data : data
        for (var i = 0; i < retdata.length; i++) {
          retdata[i].shorturl = ''
          retdata[i].dateline_str = new Time(retdata[i].dateline * 1000).dateFormat('yyyy-MM-dd hh:mm')
        }
        this.listData2 = this.listData2.concat(retdata)
        this.disList2 = true
        if (this.listData2.length && retdata.length < this.limit) {
          this.isDone2 = true
        }
      })
    },
    handleScroll (refname, index) {
      const scrollarea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      this.$util.scrollEvent({
        element: scrollarea,
        callback: () => {
          switch (index) {
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
    initData () {
      this.selectedIndex = 0
      this.disList1 = false
      this.listData1 = []
      this.pagestart1 = 1
      this.isLoading1 = false
      this.isDone1 = false
      this.disList2 = false
      this.listData2 = []
      this.pagestart2 = 1
      this.isLoading2 = false
      this.isDone2 = false
    },
    refresh () {
      this.loginUser = User.get()
      this.initData()
      this.switchData()
    }
  },
  created () {
  },
  activated () {
    this.query = this.$route.query
    this.refresh()
    this.$refs.scrollContainer1.scrollTop = this.pageTop
  },
  beforeRouteLeave (to, from, next) {
    this.pageTop = this.$refs.scrollContainer1.scrollTop
    next()
  }
}
</script>
