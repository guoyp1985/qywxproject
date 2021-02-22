<style lang="less">
.qy-customer-view-page{
  .top-box{
    background-color:#f5f9fe;text-align:left;padding:10px;box-sizing: border-box;
    .avatar{width:80px;height:80px;border-radius:50%;margin-right:10px;}
    .txt{font-size:16px;font-weight:bold;}
  }
  .view-area{
    background-color:#fff;
    .view-item{
      padding:10px;display:flex;justify-content: flex-start;align-items: center;
      position:relative;
      .col1{padding-right:10px;}
      .col2{flex:1;display:flex;justify-content: flex-end;align-items: center;}
    }
    .view-item:not(:last-child):after{
  		content: " ";
      position: absolute;left: 0;bottom: 0;right: 0;
      height: 1px;border-bottom: 1px solid #ededed;color: #ededed;
      -webkit-transform-origin: 0 100%;
      transform-origin: 0 100%;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    .btn-col{
      padding-left:10px;
      .btn{
        width:45px;text-align:center;line-height:22px;border-radius:5px;
        background-color:#07c160;color:#fff;
        font-size:12px;
      }
    }
  }
  .update-modal{
    .btn{height:40px;}
    .btn-cancel{background-color:#ccc;color:#fff;}
    .btn-submit{background-color:#07c160;color:#fff;}
  }
}
</style>
<template>
  <div class="bg-page qy-customer-view-page">
    <div class="top-box list-shadow02 flex_left">
      <img class="avatar" :src="viewData.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/user.jpg';" />
      <div class="txt">{{ viewData.linkman }}</div>
    </div>
    <div class="view-area">
      <div class="view-item">
        <div class="col1">微信昵称</div>
        <div class="col2">{{viewData.linkman}}</div>
      </div>
      <div class="view-item">
        <div class="col1">性别</div>
        <div class="col2">{{getsex}}</div>
      </div>
      <div class="view-item">
        <div class="col1">手机号</div>
        <div class="col2">{{viewData.mobile}}</div>
      </div>
      <div class="view-item">
        <div class="col1">价值</div>
        <div class="col2">{{viewData.yingxiangli}}</div>
      </div>
      <div class="view-item">
        <div class="col1">真实姓名</div>
        <div class="col2">{{viewData.truename}}</div>
        <div class="btn-col">
          <div class="btn" @click="updateEvent('truename')">更新</div>
        </div>
      </div>
      <div class="view-item">
        <div class="col1">公司名称</div>
        <div class="col2">{{viewData.company}}</div>
        <div class="btn-col">
          <div class="btn" @click="updateEvent('company')">更新</div>
        </div>
      </div>
      <div class="view-item">
        <div class="col1">生日</div>
        <div class="col2">
          <datetime format="YYYY-MM-DD" v-model='viewData.birthday_str' :show.sync="showDateTime" @on-cancel="dateCancel" @on-confirm="dateConfirm"></datetime>
        </div>
        <div class="btn-col">
          <div class="btn" @click="clickDate">更新</div>
        </div>
      </div>
      <div class="view-item">
        <div class="col1">地区</div>
        <div class="col2">{{ viewData.country }} {{ viewData.province }} {{ viewData.city }}</div>
      </div>
    </div>
    <div class="box-outer mt10" style="border-radius:0;">
      <div class="box-title">维护内容</div>
      <div class="box-con">
      </div>
    </div>
    <div v-if="showModal" class="auto-modal flex_center update-modal">
      <div class="modal-inner border-box" style="width:80%;">
        <div class="align_center font18 bold pb10 b_bottom_after color-theme pt10">更新信息</div>
        <div class="flex_left" style="padding:20px 10px;text-align:left;">
          <div class="pr10">{{nameObject[updateChar]}}</div>
          <div class="flex_cell flex_right">
            <input v-model="updateVal" type="text" class="w_100" style="line-height:25px;" :placeholder="nameObject[updateChar]" />
          </div>
        </div>
        <div class="b_top_after flex_center">
          <div class="flex_cell flex_center btn btn-cancel" @click="closeModal">取消</div>
          <div class="flex_cell flex_center btn btn-submit" @click="submitModal">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Datetime} from 'vux'
import ENV from 'env'
import { User } from '#/storage'
import Time from '../../libs/time'
export default {
  components: {Datetime},
  data () {
    return {
      query: {},
      loginUser: {},
      viewData: {},
      showModal: false,
      updateChar: '',
      nameObject: {
        truename: '真实姓名',
        company: '公司名称'
      },
      updateVal: '',
      birthday: '',
      showDateTime: false
    }
  },
  computed: {
    getsex () {
      let val = this.viewData.sex
      let ret = '未知'
      if (val === 1) {
        ret = '男'
      } else if (val === 2) {
        ret = '女'
      }
      return ret
    }
  },
  methods: {
    clickDate () {
      this.showDateTime = true
    },
    dateCancel () {
    },
    dateConfirm () {
      this.ajaxUpdate('birthday', this.viewData.birthday_str, () => {
        this.showDateTime = false
      })
    },
    updateEvent (char) {
      this.updateChar = char
      this.updateVal = this.viewData[char]
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    },
    ajaxUpdate (char, value, callback) {
      this.$vux.loading.show()
      this.$http.get(`${ENV.BokaApi}/api/customer/update`, {
        params: {uid: this.query.uid, char: char, value: value}
      }).then(res => {
        this.$vux.loading.hide()
        let data = res.data
        this.$vux.toast.text(data.msg)
        if (data.code === 0) {
          callback && callback()
        }
      })
    },
    submitModal () {
      if (this.updateVal === '') {
        this.$vux.toast.text('请输入更新内容')
        return false
      }
      this.ajaxUpdate(this.updateChar, this.updateVal, () => {
        this.viewData[this.updateChar] = this.updateVal
        this.showModal = false
      })
    },
    getInfo () {
      this.$vux.loading.show()
      this.$http.get(`${ENV.BokaApi}/api/customer/info`, {
        params: {uid: this.query.uid}
      }).then(res => {
        this.$vux.loading.hide()
        let data = res.data
        let retdata = data.data ? data.data : data
        if (retdata) {
          retdata.birthday_str = ''
          if (retdata.birthday) {
            retdata.birthday_str = new Time(retdata.birthday * 1000).dateFormat('yyyy-MM-dd')
          }
          this.viewData = retdata
        }
      })
    },
    refresh () {
      this.query = this.$route.query
      this.loginUser = User.get()
      this.getInfo()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
