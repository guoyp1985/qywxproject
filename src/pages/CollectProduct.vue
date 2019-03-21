<template>
  <div class="add-tags">
    <div class="input-box">
      <textarea class="font14" placeholder="链接" maxlength="200" v-model="content"></textarea>
    </div>
    <div class="submit-btn flex_center">
      <button @click="submit">采集</button>
    </div>
  </div>
</template>

<script type="text/javascript">
import ENV from 'env'
export default{
  created () {
    this.id = this.$route.query.id
  },
  activated () {
    this.content = ''
  },
  data () {
    return {
      max: 200,
      id: null,
      content: ''
    }
  },
  watch: {
    content (newValue) {
      console.log(newValue)
      this.count = newValue.length
    }
  },
  methods: {
    submit () {
      if (!this.content.length) {
        this.$vux.toast.show({
          text: '请输入内容!',
          type: 'warn'
        })
        return
      }
      this.$http({
        url: `${ENV.BokaApi}/api/team/source`,
        method: 'post',
        data: {
          type: 'add',
          content: this.content,
          teamid: this.id
        }
      }).then(res => {
        console.log(res)
        if (res.data.flag) {
          this.$router.back()
        }
      })
    }
  }
};
</script>

<style lang="less" scoped="">
.add-tags{
  touch-action: none;
  position: relative;
  width: 100%;
  height: 110%;
  .close{
    position:absolute;top:-9px;right:-4px;z-index:10;
    width:25px;height:25px;border-radius:50%;background-color:#EC3E3F;color:#fff;
    display:flex;justify-content: center;align-items: center;
  }
  .input-box{
    position: relative;
    textarea{
      width: 100%;
      height: 200px;
      padding: 15px;
      box-sizing: border-box;
    }
    .count{
      position: absolute;
      right: 15px;
      bottom: 15px;
      color: #c9c9c9;
    }
  }
  .submit-btn{
    position:fixed;
    bottom: 0;
    width: 100%;
    height: 70px;
    background-color: #fff;
    button{
      width: 80%;
      color: #fff;
      border-radius: 10px;
      background-color: #ff6a61;
      border: none;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
}
</style>
