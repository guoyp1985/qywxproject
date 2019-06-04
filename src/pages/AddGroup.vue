<template>
  <div id="room-apply" class="containerarea font14 s-havebottom">
    <div class="step top-content">
      <div class="color-red font16 align_center mb10">手动添加微信群</div>
      <div class="step-item">
        <div class="step-item-info db-flex">
          <div class="step-item-title">第一步:</div>
          <div class="flex_cell color-gray2">
            <span>添加官方客服微信</span>
            <span class="color-red" @click="wxContact"> 马上添加 ></span>
          </div>
        </div>
        <div class="step-item-tail"></div>
      </div>
      <div class="step-item">
        <div class="step-item-info db-flex">
          <div class="step-item-title">第二步:</div>
          <div class="flex_cell color-gray2">
            <span>拉官方客服进入微信群</span>
          </div>
        </div>
        <div class="step-item-tail"></div>
      </div>
      <div class="step-item">
        <div class="step-item-info db-flex">
          <div class="step-item-title">第三步:</div>
          <div class="flex_cell color-gray2">
            <span>客服向你发送密钥后，返回此页面输入验证密钥。如未收到任何信息请在群内发任意信息后再试。</span>
          </div>
        </div>
        <div class="step-item-tail"></div>
      </div>
      <div class="step-item">
        <div class="step-item-info db-flex">
          <div class="step-item-title">第四步:</div>
          <div class="flex_cell color-gray2">
            <span>请将手动添加的微信群与获取到的微信群进行关联。</span>
          </div>
        </div>
      </div>
      <!-- <div class="protocal-area">
        <check-icon :value.sync="isAccept">同意<a class="color-red" @click.stop="showProtocol">群群推协议</a></check-icon>
      </div> -->
      <div class="flex_center btnin">
        <div class="inputs">
          <x-input type="text" v-model="crypto" placeholder="请输入密钥"></x-input>
        </div>
        <div @click="submitHandle" class="rgba09red btn">验证</div>
        <!-- <div v-else disabled="true" class="btn">验证</div> -->
      </div>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showDialog" hide-on-blur :dialog-style="{width: '100%', height: '50%', 'background-color': '#ffffff'}">
        <div style="text-align:center;padding-top:10px;" @click="showDialog = false">
          <div style="font-size:14px;text-align:left;padding:10px 20px;overflow-y: scroll;height:400px;">
            <h4 style="text-align:center;">群群推服务协议</h4>
            <p style="text-indent:28px;">通过使用群群推服务，您明确同意使用群群推服务协议，由您自行承担全部风险。共销客不保证您在群群推上看到内容的准确性、真实性或完整性。</p>
            <p style="text-indent:28px;">您特此确认已知晓本协议适用于群群推提供的所有内容和服务。在任何情况下，共销客不对您因使用或无法使用群群推服务而导致的任何直接或间接损害承担责任，包括但不限于您对群群推服务获得的任何信息产生依赖导致的错误、删除、服务延迟或任何其他故障。虽然群群推已竭尽全力确保平台显示的内容是正确的，但共销客对信息准确性作出保证，并“原样”提供所有信息。在法律允许的最大范围内，共销客的合作伙伴和关联公司，相关第三方，员工，承包商以及参与群群推运营的人员，对您或任何第三方因群群推上销售的产品而导致的任何损失或损害，不承担任何责任和义务。这包括（但不限于）因疏忽而导致的任何损失或损害。</p>
            <p style="text-indent:28px;">群群推仅为您提供群价值的参考建议并非完全精准信息！</p>
          </div>
          <x-icon type="ios-close-outline" style="fill:red;"></x-icon>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom class="qrcode-dialog">
      <x-dialog v-model="wxCardShow" class="dialog-demo">
        <div class="img-box">
          <img src="../assets/images/qqt_kefu.jpg" style="max-width:100%;max-height:100%;">
        </div>
        <div>
          <span>长按识别二维码添加官方客服微信</span>
        </div>
        <div @click="wxCardShow=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>
    <div class="font12 color-red4 align_center mt10" style="padding:0 15px;box-sizing:border-box;">注意：请勿将官方客服踢出微信群，否则影响获取邀请人信息</div>
    <template v-if="showHb">
      <firstHb action="addgroup" @closeFirstHb="closeFirstHb"></firstHb>
    </template>
  </div>
</template>
<script>
import { CheckIcon, XButton, XDialog, TransferDom, XInput } from 'vux'
import ENV from 'env'
import FirstHb from '@/components/FirstHb'
import { User } from '#/storage'
export default {
  directives: {
    TransferDom
  },
  components: {
    CheckIcon, XButton, XDialog, XInput, FirstHb
  },
  data () {
    return {
      query: {},
      loginUser: {},
      rgbred: 'rgba09red',
      crypto: '',
      isAccept: false,
      isSubmiting: false,
      showDialog: false,
      wxCardShow: false,
      qrcode: '',
      isFirst: false,
      showHb: false
    }
  },
  methods: {
    initData () {
      this.isFirst = false
      this.showHb = false
    },
    closeFirstHb () {
      this.isFirst = false
      this.showHb = false
      this.afterAdd()
    },
    toStart () {
      this.$router.push('/RoomStart')
    },
    wxContact () {
      if (this.query.from) {
        this.$wechat.miniProgram.navigateTo({url: '/pages/subscribe?type=addkefu'})
      } else {
        this.wxCardShow = true
      }
    },
    showProtocol () {
      this.showDialog = true
    },
    submitHandle () {
      const _this = this
      if (!this.isSubmiting) {
        // const self = this
        const data = {
          crypto: this.crypto
        }
        console.log(data)
        if (this.$util.validateQueue(
          [
            {crypto: data.crypto}
          ],
          model => {
            this.$vux.toast.text('请填写验证密钥', 'middle')
          }
        )) {
          // if (!this.isAccept) {
          //   this.$vux.toast.text('提交评估需同意协议', 'middle')
          //   return
          // }
          this.isSubmiting = true
          this.$vux.loading.show()
          this.$http.post(`${ENV.BokaApi}/api/groups/addGroup`, data).then(res => {
            const data = res.data
            this.$vux.loading.hide()
            this.$vux.toast.show({
              text: data.error,
              type: 'text',
              time: _this.$util.delay(data.error),
              onHide: () => {
                _this.isSubmiting = false
                _this.crypto = ''
                if (data.flag) {
                  if (this.isFirst) {
                    this.showHb = true
                  } else {
                    this.afterAdd()
                  }
                } else {
                  _this.reset()
                }
              }
            })
          })
        }
      }
    },
    afterAdd () {
      let params = this.$util.handleAppParams(this.query, {})
      this.$router.push({path: '/roomList', query: params})
    },
    reset () {
      this.crypto = ''
      this.isAccept = false
    }
  },
  activated () {
    this.query = this.$route.query
    this.loginUser = User.get()
    this.initData()
    if (`${this.loginUser.retailerinfo.firstinfo.addgroup}` === '0' && this.query.from) {
      this.$http.get(`${ENV.BokaApi}/api/user/show`).then(res => {
        const data = res.data
        this.loginUser = data
        User.set(data)
        if (this.loginUser.retailerinfo.firstinfo.addgroup === '0' && this.query.from) {
          this.isFirst = true
        }
      })
    }
  }
}
</script>
<style lang="less">
.containerarea{
  width:100%;height:100%;
  .top-content{
    width:85%;background-color:#fff;border:1px solid #e5e5e5;border-radius:5px;
    padding:10px 15px;box-sizing:border-box;margin:0 auto;margin-top:50px !important;box-shadow: 0 0 5px 2px #e0e0e0;
  }
  .litem{
    width:10px;height:30px;border:1px solid #e5e5e5;border-radius:20px;background-color:#fff;
    position:absolute;bottom:-20px;
  }
}
.rgba09red{background-color:#FB5657 !important;}
.btnin{
  .inputs{
    border:1px solid #C3C3C3;height:31px;padding-left:10px;width:150px;margin-left:20px;
    .weui-cell{padding:0;width:100%;height:100%;box-sizing:border-box;}
  }
  input{outline:none;width:100%;height:100%;}
  .btn{
    width:60px;height:33px;text-align:center;line-height:33px;color:#fff;background-color:#C3C3C3;border:0;
    margin-left:-1px;
  }
}
.weui-icon-circle{font-size:16px !important;}
.weui-icon-success{font-size:16px !important;}
#room-apply {
  background-color:#F2F2F2;
}
#room-apply .protocal-area {
  padding: 20px 0 16px 0;
  text-align: center;
}
#room-apply .submit-button {
  background-color: @boka-red;
  line-height: 45px;
  text-align: center;
}
#room-apply .step {
  padding: 20px 15px;box-sizing:border-box;margin-top:10px;
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
.qrcode-dialog{
  .img-box {height: 350px;overflow: hidden;}
  .vux-close {margin-top: 8px;margin-bottom: 8px;}
}
</style>
