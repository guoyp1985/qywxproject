/*
* @description: 群群推验证页面
* @auther: simon
* @created_date: 2019-1-5
*/
<template>
  <div id="room-apply" class="containerarea font14 s-havebottom">
    <form>
      <forminputplate class="required">
        <span slot="title">验证密钥</span>
        <input v-model="key" type="text" name="key" class="input border-box" placeholder="请输入密钥" />
      </forminputplate>
      <div class="protocal-area">
        <check-icon :value.sync="isAccept" type="plain"><a>同意群群推协议</a></check-icon>
      </div>
    </form>
    <div class="s-bottom submit-button color-white" @click="submitHandle">
      <span>提交验证</span>
    </div>
    <div class="step">
      <div class="step-item">
        <div class="step-item-info db-flex">
          <div class="step-item-title">第一步:</div>
          <div class="flex_cell color-gray">
            <span>添加官方客服微信</span>
            <span class="color-red"> 马上添加 ></span>
          </div>
        </div>
        <div class="step-item-tail"></div>
      </div>
      <div class="step-item">
        <div class="step-item-info db-flex">
          <div class="step-item-title">第二步:</div>
          <div class="flex_cell color-gray">
            <span>拉官方客服进入微信群</span>
          </div>
        </div>
        <div class="step-item-tail"></div>
      </div>
      <div class="step-item">
        <div class="step-item-info db-flex">
          <div class="step-item-title">第三步:</div>
          <div class="flex_cell color-gray">
            <span>客服向你发送密钥后，返回此页面输入验证密钥。如未收到任何信息，请在群内发任意信息后再试。</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { CheckIcon, XButton } from 'vux'
import ENV from 'env'
import forminputplate from '@/components/Forminputplate'
export default {
  components: {
    CheckIcon, XButton, forminputplate
  },
  data () {
    return {
      key: '',
      isAccept: false,
      isSubmitIng: false
      // roomCategory: [1],
      // roomCategories: [
      //   {id: 1, title: '夜跑群'},
      //   {id: 2, title: '养生群'},
      //   {id: 3, title: '追星群'}
      // ]
    }
  },
  methods: {
    submitHandle () {
      if (!this.isSubmitIng) {
        // const self = this
        const room = {
          key: this.key
        }
        console.log(room)
        if (this.$util.validateQueue(
          [
            {key: room.key}
          ],
          model => {
            this.$vux.toast.text('未填必选项', 'middle')
          }
        )) {
          if (!this.isAccept) {
            this.$vux.toast.text('提交评估需同意协议', 'middle')
            return
          }
          this.isSubmitIng = true
          this.$vux.loading.show()
          this.$http.post(`${ENV.BokaApi}/api/groups/addGroup`, room)
          .then(res => {
            const data = res.data
            if (data.flag === 1) {
              this.$vux.loading.hide()
              setTimeout(() => {
                this.$router.back()
                this.isSubmitIng = false
              }, 1000)
            } else {
              this.isSubmitIng = false
            }
            this.$vux.toast.text(res.data.error, 'middle')
          })
        }
      }
    }
  }
}
</script>
<style lang="less">
#room-apply {
  background-color: #ffffff;
}
#room-apply .protocal-area {
  padding: 20px 0;
  text-align: center;
}
#room-apply .submit-button {
  background-color: @boka-red;
  line-height: 45px;
  text-align: center;
}
#room-apply .step {
  padding: 20px 40px;
}
#room-apply .step .step-item {
  position: relative;
  height: 70px;
}
#room-apply .step .step-item .step-item-tail {
  position: absolute;
  left: 20px;
  top: 30px;
  width: 1px;
  height: 30px;
  background-color: @boka-red;
}
#room-apply .step-item-title {
  color: @boka-red;
  width: 60px;
}
</style>
