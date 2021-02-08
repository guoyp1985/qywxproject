<style lang="less">
.invite-join-page{
  width:100%;box-sizing: border-box;
  textarea{width:100%;height:200px;resize:none;}
  .btn{
    width:100px;line-height:40px;background-color:#07c160;color:#fff;border-radius:60px;text-align:center;
  }
}
</style>
<template>
  <div class="bg-page invite-join-page">
    <div class="flex_center padding10 font16 bold">邀请加入</div>
    <div class="form-list">
      <div class="form-item left">
        <div class="title-cell">邀请语</div>
        <div class="input-cell">
          <textarea v-model="submitData.content" placeholder="邀请语"></textarea>
        </div>
      </div>
    </div>
    <div class="mt20 flex_center">
      <div class="btn" @click="submitEvent">发送</div>
    </div>
  </div>
</template>

<script>
import {} from 'vux'
import { User } from '#/storage'
export default {
  components: {},
  data () {
    return {
      query: {},
      loginUser: {},
      submitData: {
        content: ''
      },
      requiredData: {
        content: ''
      }
    }
  },
  methods: {
    submitEvent () {
      let iscontinue = true
      for (let key in this.requiredData) {
        if (this.submitData[key] === '') {
          this.$vux.toast.text('请完善内容')
          iscontinue = false
          break
        }
      }
      if (!iscontinue) return false
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
