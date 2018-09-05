<template>
<div class="containerarea wxopen font14">
  <div class="pagetop flex_left font16 pl10 pr10">
    <span>提交审核</span>
  </div>
  <div class="pagemiddle padding10">
    <div class="font20">配置功能页面<span class="font14" style="color:#9a9a9a;">至少填写一组，填写正确的信息有利于用户快速搜索出你的小程序</span></div>
    <div class="setlist">
      <div class="setitem" v-for="(item,index) in setArr" :key="index">
        <div class="lineitem">功能页面{{index+1}}</div>
        <div class="lineitem border-box mb10">
          <div class="t-table">
            <div class="t-cell title-cell w100 font14 v_middle">功能页面</div>
            <div class="t-cell input-cell v_middle border1px" style="position:relative;">
              <select class="w_100" style="height:35px;" v-model="item.page">
                <option v-for="(o,oindex) in pagesArr" :value="o">{{o}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="lineitem border-box mb10">
          <div class="t-table">
            <div class="t-cell title-cell w100 font14 v_middle">标题</div>
            <div class="t-cell input-cell v_middle border1px" style="position:relative;">
              <x-input
                class="font14"
                placeholder="标题"
                :max="32"
                v-model="item.title">
              </x-input>
            </div>
          </div>
        </div>
        <div class="lineitem border-box mb10">
          <div class="t-table">
            <div class="t-cell title-cell w100 font14 v_top pt10">所在服务类目</div>
            <div class="t-cell input-cell v_top" style="position:relative;">
              <div>
                <select style="height:35px;" v-model="item.first_id" @change="firstChange(item, index)">
                  <option v-for="(c,cindex) in categoryArr" :value="c.id">{{c.title}}</option>
                </select>
                <select style="height:35px;" v-model="item.second_id" @change="secondChange(item, index)">
                  <option v-for="(sc,cindex) in item.second" :value="sc.id">{{sc.title}}</option>
                </select>
              </div>
              <div class="mt10" style="color:#9a9a9a;">功能页面和服务类目必须一一对应，且功能页面提供的内容必须符合该类目范围</div>
            </div>
          </div>
        </div>
        <div class="lineitem border-box mb10">
          <div class="t-table">
            <div class="t-cell title-cell w100 font14 v_top pt10">标签</div>
            <div class="t-cell input-cell v_top ">
              <div class="border1px">
                <x-textarea
                  :ref="`tagTextarea${index}`"
                  v-model="item.tag"
                  class="x-textarea noborder"
                  placeholder="标签"
                  :rows="1"
                  @on-change="textareaChange(`tagTextarea${index}`)"
                  @on-focus="textareaFocus(`tagTextarea${index}`)"
                  autosize>
                </x-textarea>
              </div>
              <div class="mt10" style="color:#9a9a9a;">标签用回车分开，填写与页面功能相关的标签，更容易被搜索</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="addarea" v-if="setArr.length <= 5">
      <div class="btnadd flex_left" @click="addSetItem">
        <span class="icon flex_center">+</span>
        <span>添加功能页面</span>
      </div>
  </div>
  </div>
  <div class="pagebottom flex_center">
    <div class="btn active flex_center" @click="censorEvent">提交审核</div>
  </div>
</div>
</template>

<script>
import { Tab, TabItem, Swiper, SwiperItem, TransferDom, Popup, CheckIcon, XInput, XTextarea } from 'vux'
import Time from '#/time'
import ENV from 'env'
let self = {}
export default {
  directives: {
    TransferDom
  },
  components: {
    Tab, TabItem, Swiper, SwiperItem, Popup, CheckIcon, XInput, XTextarea
  },
  filters: {
    dateFormat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      query: {},
      appid: null,
      defaultSubmitData: {page: '', title: '', tag: '', first_id: null, second_id: null, second: []},
      setArr: [{page: '', title: '', tag: '', first_id: null, second_id: null, second: []}],
      pagesArr: [],
      categoryArr: [],
      secondCategoryObject: {},
      secondCategoryArr: [],
      selectedPage: ''
    }
  },
  methods: {
    initBtn () {
    },
    textareaChange (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    textareaFocus (refname) {
      let curArea = this.$refs[refname][0] ? this.$refs[refname][0] : this.$refs[refname]
      curArea.updateAutosize()
    },
    getCategory () {
      self.$http.get(`${ENV.BokaApi}/api/open/getCategory`, {
        params: {appid: self.appid}
      }).then(function (res) {
        const data = res.data
        if (data.flag) {
          const retdata = data.data
          for (let i = 0; i < retdata.length; i++) {
            const curd = retdata[i]
            retdata[i].id = curd.first_id
            retdata[i].title = curd.first_class
            retdata[i].second = [{id: curd.second_id, title: curd.second_class}]
            self.secondCategoryObject[curd.first_id] = [{id: curd.second_id, title: curd.second_class}]
          }
          self.secondCategoryArr = retdata[0].second
          self.setArr[0].second = retdata[0].second
          self.defaultSubmitData.second = retdata[0].second
          self.categoryArr = retdata
        }
      })
    },
    getPages () {
      self.$http.get(`${ENV.BokaApi}/api/open/getPages`, {
        params: {appid: self.appid}
      }).then(function (res) {
        const data = res.data
        if (data.flag) {
          self.pagesArr = data.data
        }
      })
    },
    censorEvent () {
      console.log(self.setArr)
      let itemList = []
      for (let i = 0; i < self.setArr.length; i++) {
        const curdata = self.setArr[i]
        let oitem = {}
        oitem.address = curdata.page
        oitem.tag = curdata.tag
        oitem.first_class = curdata.first_class
        oitem.second_class = curdata.first_class
        oitem.first_id = curdata.first_id
        oitem.second_id = curdata.second_id
        oitem.title = curdata.title
        itemList.push(oitem)
      }
      console.log(itemList)
      // self.$vux.loading.hide()
      // self.$http.post(`${ENV.BokaApi}/api/open/submitAudit`, {
      //   appid: self.appid, itemlist: self.setArr
      // }).then(function (res) {
      //   self.$vux.loading.hide()
      //   const data = res.data
      //   self.$vux.toast.show({
      //     text: data.error,
      //     type: (data.flag !== 1 ? 'warn' : 'success'),
      //     time: self.$util.delay(data.error)
      //   })
      // })
    },
    addSetItem () {
      self.setArr.push(self.defaultSubmitData)
    },
    firstChange (item, index) {
      self.setArr[index].second = self.secondCategoryObject[item.first_id]
      for (let i = 0; i < self.categoryArr.length; i++) {
        if (self.categoryArr[i].first_id === item.first_id) {
          self.setArr[index].first_class = self.categoryArr[i].first_class
          break
        }
      }
    },
    secondChange (item, index) {
      console.log('in second chnage')
      for (let i = 0; i < self.setArr[index].second.length; i++) {
        if (self.setArr[index].second[i].id === item.second_id) {
          self.setArr[index].second_class = self.setArr[index].second[i].title
          break
        }
      }
    },
    clickBtn2 () {
      if (this.showBtn2) {
        this.initBtn()
      } else {
        this.initBtn()
        this.showBtn2 = true
      }
    },
    refresh () {
      const self = this
      this.query = this.$route.query
      self.$http.get(`${ENV.BokaApi}/api/open/getAuthAppId`, {
        params: {authcode: self.query.auth_code}
      }).then(function (res) {
        let data = res.data
        if (data.flag) {
          self.appid = data.data
          self.getPages()
          self.getCategory()
        }
      })
    }
  },
  activated () {
    self = this
    this.refresh()
  }
}
</script>
<style lang="less">
.wxopen{padding:20px;background-color:#fff;box-sizing: border-box;}

.wxopen .btn{
  color: #353535;width:80%;text-align:center;
  background-image: linear-gradient(to bottom,#fbfbfb 0,#fbfbfb 100%);
  border: #e4e8eb 1px solid;height:35px;border-radius:5px;
}
.wxopen .btn.active{
  color:#fff;
  background-image: linear-gradient(to bottom,#1aad19 0,#1aad19 100%);
  border: #1aad19 1px solid;
}
.setitem{border-bottom: 1px dashed #e7e7eb;}
.setitem .lineitem{padding-top:25px;}
.wxopen .addarea{padding: 10px;}
.addarea .btnadd{width:130px;}
.addarea .icon{
  width:22px;height:22px;margin-right:5px;
  border:#576b95 1px solid;border-radius:50%;line-height:22px;text-align:center;color:#576b95;
}
</style>
