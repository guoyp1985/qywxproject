<style lang="less">
.customer-stat-page{
  .box-list{
    .txt1{text-align:center;font-size:20px;font-weight:bold;}
    .txt2{text-align:center;color:#999;}
  }
}
</style>
指标
本周新增一般，重点，核心客户数
当前一般，重点，核心客户总数
本周一般、重点、核心客户到店次数
本周一般、重点、核心客户消费金额
<template>
  <div class="customer-stat-page">
    <div class="box-outer">
      <div class="box-title">本周新增客户数</div>
      <div class="box-list square">
        <div class="list-item">
          <div class="item-inner">
            <div class="txt1">{{statData.xinzeng.yb}}</div>
            <div class="txt2">一般</div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-inner">
            <div class="txt1">{{statData.xinzeng.zd}}</div>
            <div class="txt2">重点</div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-inner">
            <div class="txt1">{{statData.xinzeng.hx}}</div>
            <div class="txt2">核心</div>
          </div>
        </div>
      </div>
    </div>
    <div class="box-outer mt12">
      <div class="box-title">当前客户数</div>
      <div class="box-list square">
        <div class="list-item">
          <div class="item-inner">
            <div class="txt1">{{statData.dangqian.yb}}</div>
            <div class="txt2">一般</div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-inner">
            <div class="txt1">{{statData.dangqian.zd}}</div>
            <div class="txt2">重点</div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-inner">
            <div class="txt1">{{statData.dangqian.hx}}</div>
            <div class="txt2">核心</div>
          </div>
        </div>
      </div>
    </div>
    <div class="box-outer mt12">
      <div class="box-title">本周客户到店次数</div>
      <div class="box-list square">
        <div class="list-item">
          <div class="item-inner">
            <div class="txt1">{{statData.daodian.yb}}</div>
            <div class="txt2">一般</div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-inner">
            <div class="txt1">{{statData.daodian.zd}}</div>
            <div class="txt2">重点</div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-inner">
            <div class="txt1">{{statData.daodian.hx}}</div>
            <div class="txt2">核心</div>
          </div>
        </div>
      </div>
    </div>
    <div class="box-outer mt12">
      <div class="box-title">本周客户消费金额</div>
      <div class="box-list square">
        <div class="list-item">
          <div class="item-inner">
            <div class="txt1">{{statData.xiaofei.yb}}</div>
            <div class="txt2">一般</div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-inner">
            <div class="txt1">{{statData.xiaofei.zd}}</div>
            <div class="txt2">重点</div>
          </div>
        </div>
        <div class="list-item">
          <div class="item-inner">
            <div class="txt1">{{statData.xiaofei.hx}}</div>
            <div class="txt2">核心</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ENV from 'env'
import {User} from '#/storage'

export default {
  data () {
    return {
      loginUser: {},
      statData: {}
    }
  },
  methods: {
    getData () {
      this.$http.get(`${ENV.BokaApi}/api/customer/weekStat`).then(res => {
        let data = res.data
        if (data.code === 0) {
          this.statData = data.data
        }
      })
    }
  },
  activated () {
    this.query = this.$route.query
    this.loginUser = User.get()
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.duser .btn{
  margin:0 auto;
  width:60%;
  padding:10px;
  box-sizing: border-box;
  text-align:center;
}
</style>
