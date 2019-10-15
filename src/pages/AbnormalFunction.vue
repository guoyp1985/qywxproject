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
            <div class="flex_cell mr20">{{index2 + 1}}.{{iteminfo.title}}</div>
            <div ><div class="font14 choosebtn flex_center" @click="">通过</div></div>
          </div>
        </template>
        <template v-else>
          <div class="flex_center iteminfo">暂无不正常功能点</div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
// import {User} from '#/storage'
import ENV from 'env'

export default {
  data () {
    return {
      abnormaldata: []
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
