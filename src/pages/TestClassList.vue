<template>
  <div class="containerarea testclasslist bg-white">
    <div>
        <div class="t-table padding10" style="box-sizing:border-box;">
          <div class="t-cell v_middle w70">
            <img class="avatarimg3 imgcover" src="https://tossqzx.boka.cn/avatar/1/9.jpg" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
          </div>
          <div class="t-cell v_middle">
            <div class="clamp1 font14 color-lightgray">余鹏</div>
          </div>
          <div class="t-cell v_middle align_right">
            测试进度：0%
          </div>
        </div>
        <div class="bg-gray testarea" style="padding: 10px 20px;box-sizing:border-box;">
          <div class="bg-white w_100 pl10" style="height:40px;line-height:40px;box-sizing:border-box;">选择测试范围</div>
          <template v-if="showtestclass && testclassdata.length > 0">
            <div v-for="(item, index) in testclassdata" :key="item.id" class="flex_center bg-white w_100" @click="getmissioninfo(item.next)"><div class="item">{{index + 1}}.{{item.title}}</div></div>
          </template>
          <!--  -->
          <template>

          </template>
          <div class="s-bottom flex_center" style="padding: 0 20px;">
            <div class="flex_cell flex_center btn-bottom-red" @click="">非正常功能</div>
          </div>
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
      testclassdata: [],
      showtestclass: false
    }
  },
  methods: {
    init () {
      this.testclassdata = []
      this.refresh()
    },
    refresh () {
      if (this.testclassdata.length <= 0) {
        this.getdata()
      }
    },
    getdata () {
      const self = this
      this.$http.get(`${ENV.BokaApi}/api/testwork/getClassList`).then(res => {
        // self.$vux.loading.hide()
        const data = res.data
        const retdata = data.data ? data.data : data
        self.testclassdata = retdata
        console.log('====  输出测试分类列表  ====')
        console.log(self.testclassdata)
        self.showtestclass = true
      })
    },
    getmissioninfo (next) {
      if (next > 0) {
        let params = {module: 'testwork', id: next}
        this.$http.get(`${ENV.BokaApi}/api/testwork/info`, {
          params: params
        }).then(function (res) {
          // self.$vux.loading.hide()
          let data = res.data
          console.log('====  输出测试任务信息  ====')
          console.log(data)
        })
      } else {
        this.$vux.toast.show({
          text: '暂无测试任务',
          type: 'warning'
        })
      }
    }
  },
  created () {
    this.init()
  },
  activated () {
    // this.refresh()
  }
}
</script>

<style lang="less">
.testarea{
  position:absolute;left: 0;right: 0;bottom:0;top: 80px;
}
.testarea .item{
  width: 60%;
  height: 40px;
  line-height: 40px;
}
.btn-bottom-red{
  border-radius: 10px;
}
</style>
