<style lang="less">
.add-comcard-page{
  width:100%;box-sizing: border-box;
  .form-list{
    .title-cell{margin-right:5px;}
    .input-cell.time-cell{height:30px;}
  }
  .date-txt{
    position:absolute;left:0;right:0;top:0;height:30px;line-height:30px;
    background-color:transparent;z-index:10;font-size:13px;
    text-align:left;color:#999;
  }
  .mjje{
    border: 1px solid #ccc;border-radius: 4px;margin:0 3px;padding:0 5px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);line-height:30px;
  }
  .btn{
    width:100px;line-height:40px;background-color:#07c160;color:#fff;border-radius:60px;text-align:center;
  }
}
</style>
<template>
  <div class="bg-page add-comcard-page">
    <div class="form-list">
      <div class="form-item flex_left">
          <div class="title-cell">开始时间<span class="ml3 vertical color-red">*</span></div>
          <div class="input-cell time-cell">
            <datetime format="YYYY-MM-DD HH:mm" v-model='submitData.starttime' :show.sync="visibility1" @on-change="datechange1" @on-cancel="datecancel1" @on-confirm="dateconfirm1"></datetime>
            <div @click="showxdate1" class="date-txt">{{ selectdatetxt1 }}</div>
          </div>
      </div>
      <div class="form-item flex_left">
          <div class="title-cell">结束时间<span class="ml3 vertical color-red">*</span></div>
          <div class="input-cell time-cell">
            <datetime format="YYYY-MM-DD HH:mm" v-model='submitData.endtime' :show.sync="visibility2" @on-change="datechange2" @on-cancel="datecancel2" @on-confirm="dateconfirm2"></datetime>
            <div @click="showxdate2" class="date-txt">{{ selectdatetxt2 }}</div>
          </div>
      </div>
      <div class="form-item flex_left">
          <div class="title-cell">有效期<span class="ml3 vertical color-red">*</span></div>
          <div class="input-cell">
              <input v-model="submitData.validday" type="text" placeholder="有效期，最多20天">
          </div>
          <div>天</div>
      </div>
      <div class="form-item flex_left">
          <div class="title-cell">发放数量<span class="ml3 vertical color-red">*</span></div>
          <div class="input-cell">
              <input v-model="submitData.totalcount" type="text" placeholder="发放数量">
          </div>
      </div>
      <div class="form-item flex_left">
          <div class="title-cell">满减金额<span class="ml3 vertical color-red">*</span></div>
          <div class="input-cell db-flex">
              <span style="line-height:34px">满:</span>
              <input class="mjje" v-model="submitData.ordermoney" type="number" />
              <span style="line-height:34px">减:</span>
              <input class="mjje" v-model="submitData.facemoney" type="number" />
          </div>
      </div>
    </div>
    <div class="mt20 flex_center">
      <div class="btn" @click="submitEvent">提交</div>
    </div>
  </div>
</template>

<script>
import ENV from 'env'
import { Datetime } from 'vux'
import { User } from '#/storage'
export default {
  components: { Datetime },
  data () {
    return {
      query: {},
      loginUser: {},
      submitData: {
        starttime: '',
        endtime: '',
        validday: '',
        totalcount: '',
        ordermoney: '',
        facemoney: ''
      },
      requiredData: {
        starttime: '',
        endtime: '',
        validday: '',
        totalcount: '',
        ordermoney: '',
        facemoney: ''
      },
      visibility1: false,
      visibility2: false,
      selectdatetxt1: '选择开始时间',
      selectdatetxt2: '选择结束时间',
      submitIng: false
    }
  },
  methods: {
    showxdate1 () {
      this.visibility1 = true
    },
    datechange1 (val) {
    },
    datecancel1 () {
      this.submitData.starttime = ''
      this.selectdatetxt1 = '选择开始时间'
    },
    dateconfirm1 () {
      this.selectdatetxt1 = ''
    },
    showxdate2 () {
      this.visibility2 = true
    },
    datechange2 (val) {
    },
    datecancel2 () {
      this.submitData.endtime = ''
      this.selectdatetxt2 = '选择结束时间'
    },
    dateconfirm2 () {
      this.selectdatetxt2 = ''
    },
    submitEvent () {
      if (this.submitIng) return false
      let iscontinue = true
      for (let key in this.requiredData) {
        if (this.submitData[key] === '') {
          this.$vux.toast.text('请完善内容')
          iscontinue = false
          break
        }
      }
      if (!iscontinue) return false
      let stime = new Date(this.submitData.starttime).valueOf()
      let etime = new Date(this.submitData.endtime).valueOf()
      if (stime > etime) {
        this.$vux.toast.text('请选择正确的起止时间')
        return false
      }
      let validday = this.submitData.validday
      if (isNaN(validday) || parseInt(validday) > 20 || parseInt(validday) < 0 || !(/(^[1-9]\d*$)/.test(validday))) {
        this.$vux.toast.text('请输入正确的有效期，最多20天')
        return false
      }
      let totalcount = this.submitData.totalcount
      if (isNaN(totalcount) || parseInt(totalcount) < 0 || !(/(^[1-9]\d*$)/.test(totalcount))) {
        this.$vux.toast.text('请输入正确的发放数量')
        return false
      }
      let facemoney = this.submitData.facemoney
      let ordermoney = this.submitData.ordermoney
      if (parseFloat(facemoney) < 0.01 || parseFloat(ordermoney) < 0) {
        this.$vux.toast.text('请输入正确的满减金额')
        return false
      }
      this.submitIng = true
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/miniactivity/add`, {
        ...this.submitData, type: 'cardcommon'
      }).then(res => {
        this.$vux.loading.hide()
        let data = res.data
        this.$vux.toast.show({
          text: data.error,
          type: (data.flag !== 1 ? 'warn' : 'success'),
          time: this.$util.delay(data.error),
          onHide: () => {
            if (data.flag) {
              this.$router.push('/activity')
            } else {
              this.submitIng = false
            }
          }
        })
      })
    },
    refresh () {
      this.query = this.$route.query
      this.loginUser = User.get()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
