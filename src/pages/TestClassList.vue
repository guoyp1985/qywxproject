<template>
  <div class="containerarea testclasslist bg-white">
    <div>
        <div class="t-table padding10" style="box-sizing:border-box;">
          <div class="t-cell v_middle w70">
            <img class="avatarimg3 imgcover" :src="loginUser.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
          </div>
          <div class="t-cell v_middle">
            <div class="clamp1 font14 color-lightgray">{{loginUser.nickname}}</div>
          </div>
          <div v-if="showmissioninfo || showdonetest" class="t-cell v_middle">
            <div class="clamp1 font14 align_right color-lightgray">进度：{{missionFinish}}</div>
          </div>
        </div>
        <div class="testarea font14" style="padding: 10px 20px;box-sizing:border-box;">
          <template v-if="showtestclass && testclassdata.length > 0">
            <div class="bg-white w_100 pl10 bold" style="height:40px;line-height:40px;box-sizing:border-box;">选择测试范围</div>
            <div v-for="(item, index) in testclassdata" :key="item.id" class="flex_center bg-white w_100 " @click="getmissioninfo(item)">
              <div class="item bold">{{index + 1}}.{{item.title}}</div>
              <div class="w80" v-if="!item.start">进度：{{item.finish}}</div>
              <div v-else><div class="font14 choosebtn1 flex_center" @click="starttest(item.id)">开始测试</div></div>
            </div>
          </template>
          <!--  -->
          <template v-if="showmissioninfo && missiondata">
            <div class="bg-white missionarea">
              <div class="align_center font14 padding10" style="line-height:14px;">{{missiondata.title}}</div>
              <div class="font14 padding10">{{missionindex}}.{{missiondata.content}}</div>
              <div class="flex_around" style="padding: 10px 20px;">
                <div class="font14 btn-item flex_center btn-bottom-red" @click="showTxtarea">测试未通过</div>
                <div class="font14 btn-item flex_center btn-bottom-red" @click="testpass(missiondata, 1, '')">测试通过</div>
              </div>
            </div>
          </template>
          <template v-if="showdonetest">
            <div class="bg-white missionarea">
              <div class="align_center font14 padding10" style="line-height:14px;">【{{curtestclass.title}}】已完成测试</div>
              <div class="flex_around" style="padding: 10px 20px;">
                <div class="font14 choosebtn1 flex_center" @click="choosetestclass">请选择测试范围</div>
              </div>
            </div>
          </template>
          <div class="s-bottom flex_center" style="padding: 0 20px;">
            <div class="flex_cell flex_center btn-bottom-red" @click="toAbnormalFunction">非正常功能</div>
          </div>
        </div>
    </div>
    <div v-if="showNotPassReason" class="auto-modal refund-modal flex_center">
      <div class="modal-inner border-box" style="width:80%;">
        <div class="align_center font18 bold pb10 b_bottom_after color-theme pt20">拒申原因</div>
        <div class="align_left txt padding10 b_bottom_after">
          <group class="textarea-outer" style="padding:0;">
            <x-textarea
              ref="serviceTextarea"
              v-model="notPassContent"
              name="title" class="x-textarea noborder"
              placeholder="请输入不通过原因"
              :show-counter="false"
              :rows="6"
              :max="200"
              autosize>
            </x-textarea>
          </group>
        </div>
        <div class="flex_center b_top_after" style="height:50px;">
          <div class="flex_cell flex_center h_100 b_right_after" @click="closeService">取消</div>
          <div class="flex_cell flex_center h_100 color-orange" @click="submitService">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Group, XTextarea } from 'vux'
import {User} from '#/storage'
import ENV from 'env'

export default {
  components: {
    Group, XTextarea
  },
  data () {
    return {
      loginUser: {},
      testclassdata: [],
      showtestclass: false,
      showmissioninfo: false,
      missiondata: null,
      next: null,
      curtestclass: {},
      curmissiondata: {},
      showdonetest: false,
      missionindex: 0,
      showNotPassReason: false,
      notPassContent: '',
      missionFinish: ''
    }
  },
  methods: {
    init () {
      this.testclassdata = []
      this.refresh()
    },
    refresh () {
      this.testclassdata = []
      this.showtestclass = false
      this.showmissioninfo = false
      this.showdonetest = false
      this.missiondata = null
      this.next = null
      this.curtestclass = {}
      this.missionFinish = ''
      this.getdata()
    },
    getdata () {
      const self = this
      this.$http.get(`${ENV.BokaApi}/api/testwork/getClassList`).then(res => {
        const data = res.data
        const retdata = data.data ? data.data : data
        self.testclassdata = retdata
        console.log('====  输出测试分类列表  ====')
        console.log(self.testclassdata)
        self.showtestclass = true
      })
    },
    getmissioninfo (item) {
      const self = this
      const next = item.next
      if (item.id) {
        self.curtestclass = item
        self.missionindex = 0
      }
      console.log('====  输出当前选择的测试分类  =====')
      console.log(self.curtestclass)
      if (next > 0) {
        let params = {module: 'testwork', id: next}
        self.$http.get(`${ENV.BokaApi}/api/testwork/info`, {
          params: params
        }).then(function (res) {
          self.missionindex++
          // self.$vux.loading.hide()
          let data = res.data
          self.missionFinish = data.finish
          console.log('====  输出测试任务信息  ====')
          console.log(data.data)
          self.missiondata = data.data ? data.data : data
          self.showmissioninfo = true
          self.next = data.next
          console.log('==== 输出下一条测试任务的id ====')
          console.log(self.next)
        })
        self.showtestclass = false
      } else {
        self.$vux.toast.show({
          text: '暂无测试任务',
          type: 'warning'
        })
        if (!item.id) {
          self.showmissioninfo = false
          self.showdonetest = true
        }
        // self.refresh()
      }
    },
    testpass (missiondata, state, content) {
      const self = this
      self.curmissiondata = missiondata
      let params = {id: missiondata.id, state: state, content: content}
      console.log(params)
      self.$http.get(`${ENV.BokaApi}/api/testwork/recordTest`, {
        params: params
      }).then(function (res) {
        let data = res.data
        self.$vux.toast.show({
          text: data.error,
          type: 'warning'
        })
        self.notPassContent = ''
        self.showNotPassReason = false
        self.getmissioninfo({next: self.next})
      })
    },
    choosetestclass () {
      this.showdonetest = false
      this.showtestclass = true
      this.refresh()
    },
    toAbnormalFunction () {
      // let params = this.$util.handleAppParams(this.query, {})
      this.$router.push({path: '/abnormalFunction'})
    },
    starttest (id) {
      const self = this
      self.$http.get(`${ENV.BokaApi}/api/testwork/restart`,
        {id: id}
      ).then(function (res) {
        // let data = res.data
        // self.$vux.toast.show({
        //   text: data.error,
        //   type: 'warning'
        // })
      })
    },
    showTxtarea () {
      this.showNotPassReason = true
    },
    closeService () {
      this.showNotPassReason = false
      this.notPassContent = ''
    },
    submitService () {
      this.testpass(this.missiondata, 0, this.notPassContent)
    }
  },
  created () {
      this.loginUser = User.get()
      this.init()
  },
  activated () {
  }
}
</script>

<style lang="less">
.testarea{
  position:absolute;left: 0;right: 0;bottom:0;top: 80px;
  background-color: #f2f2f2;
}
.testarea .item{
  width: 60%;
  height: 40px;
  line-height: 40px;
}
.missionarea{
  position:absolute;left: 10px;right: 10px;top: 80px;
}
.flex_around{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btn-item{
  height: 28px;
  line-height: 28px;
  width: 100px;
}
.btn-bottom-red{
  border-radius: 10px;
}
.choosebtn1{border-radius: 10px;line-height: 28px;height: 28px;border: 1px solid #ea3a3a;color:#ea3a3a;padding: 10px;box-sizing: border-box;}
</style>
