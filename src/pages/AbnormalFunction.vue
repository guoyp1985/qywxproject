/*
* @description: 非正常功能页面
* @auther: yh
* @created_date: 2019-10-15
*/
<template>
  <div class="containerarea abnormalfunction">
    <div class="bg-white mb10" v-for="(item, index) in abnormaldata" :key="item.id">
      <div class="title font16 bold">{{item.title}}</div>
      <div class="font14">
        <template v-if="item.data.length > 0">
          <div v-for="(iteminfo, index2) in item.data" :key="iteminfo.id" class="flex_center iteminfo">
            <div @click="showMissionInfo(iteminfo.moduleid)" class="flex_cell mr20 clamp2">{{index2 + 1}}.{{iteminfo.testworkcontent}}</div>
            <div ><div class="font14 choosebtn flex_center" @click="passTest(iteminfo.moduleid, 1, '')">通过</div></div>
          </div>
        </template>
        <template v-else>
          <div class="flex_center iteminfo">暂无不正常功能点</div>
        </template>
      </div>
    </div>
    <div v-if="showTestInfo" class="auto-modal refund-modal flex_center">
      <div class="modal-inner border-box" style="width:80%;">
        <div class="align_center font18 bold pb10 b_bottom_after color-theme pt20">测试内容</div>
        <div class="align_left txt padding10 b_bottom_after">
          <group class="textarea-outer" style="padding:0;">
            <x-textarea
              ref="serviceTextarea"
              v-model="missioncontent"
              name="title" class="x-textarea noborder"
              readonly
              :show-counter="false"
              :rows="6"
              :max="200"
              autosize>
            </x-textarea>
          </group>
        </div>
        <div class="flex_center b_top_after" style="height:50px;">
          <div class="flex_cell flex_center h_100 b_right_after" @click="closeService">取消</div>
          <div class="flex_cell flex_center h_100 color-orange" @click="submitService">通过</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import {User} from '#/storage'
import ENV from 'env'
import { Group, XTextarea } from 'vux'

export default {
  components: {
    Group, XTextarea
  },
  data () {
    return {
      abnormaldata: [],
      missiondata: {},
      missioncontent: '',
      showTestInfo: false
    }
  },
  methods: {
    refresh () {
      this.abnormaldata = []
      this.getdata()
    },
    getdata () {
      const self = this
      self.$http.get(`${ENV.BokaApi}/api/testwork/abnormal`).then(res => {
        console.log('==== 输出不正常功能列表 ====')
        let data = res.data
        self.abnormaldata = data.data ? data.data : []
        console.log(self.abnormaldata)
      })
    },
    passTest (id, state, content) {
      const self = this
      let params = {id: id, state: state, content: content}
      console.log(params)
      self.$http.get(`${ENV.BokaApi}/api/testwork/recordTest`, {
        params: params
      }).then(function (res) {
        let data = res.data
        self.$vux.toast.show({
          text: data.error,
          type: 'warning'
        })
        self.refresh()
      })
    },
    showMissionInfo (id) {
      console.log('=== 输出当前参数 ===')
      console.log(id)
      const self = this
      self.showTestInfo = true
      let params = {module: 'testwork', id: id}
      self.$http.get(`${ENV.BokaApi}/api/testwork/info`, {
        params: params
      }).then(function (res) {
        let data = res.data
        self.missiondata = data.data
        self.missioncontent = self.missiondata.content
        console.log('==== 输出当前任务信息 ====')
        console.log(self.missiondata)
      })
    },
    closeService () {
      this.showTestInfo = false
      this.missioncontent = ''
    },
    submitService () {
      this.passTest(this.missiondata.id, 1)
      this.showTestInfo = false
      this.refresh()
    }
  },
  created () {
  },
  activated () {
    this.refresh()
  }
}
</script>

<style lang="less">
.abnormalfunction{background-color: #f2f2f2;padding:15px 10px;box-sizing: border-box;}
.choosebtn{border-radius: 35px;width: 70px;line-height: 28px;height: 28px;border: 1px solid #ea3a3a;color:#ea3a3a;}
.title{text-indent: 10px;height: 38px;line-height: 38px;position: relative;}
.title:after{
  content: "";
  position: absolute;
  display: block;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f2f2f2;
  height: 1px;
  transform: scaleY(1) translateY(1px);
}
.mr20{margin-right: 20px;}
.iteminfo{padding:15px 10px;}
</style>
