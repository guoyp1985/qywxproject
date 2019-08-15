/*
* @description: 群群推下单页面
* @auther: simon
* @created_date: 2019-1-8
*/
<template>
  <div id="room-order-deal" class="containerarea font14 s-havebottom">
    <div class="room-details">
      <room-view :item="room" :show-details="true" :routerPath="routePath">
        <div slot="sort-key">
          <div class="font12 mt5 color-gray">综合评分：{{room.score}}分</div>
        </div>
      </room-view>
    </div>
    <!-- <div class="mt10 bg-white padding10 color-red">订单发起后，群主将成为您的返点客，商品出售成功后会向返点客支付返点佣金</div> -->
    <div class="operation-area">
      <form>
        <forminputplate class="required">
          <span slot="title">选择推广商品</span>
          <div class="pr10 color-gray" @click="handleAppend">
            <div v-if="product.id" class="select-area">
              <div class="t-table">
                <div class="t-cell v_middle align_right pr10 font13">
                  <div class="clamp1">{{product.title}}</div>
                  <div class="clamp1"><span class="color-gray">{{ $t('Storage') }} {{ product.storage }}</span><span class="ml10 color-orange">¥{{ product.price }}</span></div>
                </div>
                <div class="t-cell pic v_middle w40">
                  <img class="v_middle imgcover" :src="product.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" style="width:40px;height:40px;" />
                </div>
              </div>
            </div>
            <div v-else class="align_right select-area">
              <span class="text color-red">点击选择推广商品</span>
            </div>
          </div>
        </forminputplate>
        <div class="pl10 pr20 pt25 pb25">
          <div class="color-red font14">提示</div>
          <div class="color-gray2 font12 mt5">1. 订单发起后，群主将成为您的返点客，商品出售成功后会向返点客支付返点佣金。</div>
          <div class="color-gray2 font12 mt5">2. 订单支付时，微信将收取0.6%的手续费。</div>
        </div>
      </form>
    </div>
    <div class="protocal-area">
      <check-icon :value.sync="isAccept" type="plain"><a class="color-gray2" @click.stop="showProtocol">同意群群推协议</a></check-icon>
    </div>
    <!-- <div class="align_center font14 color-red w_100" style="position:absolute;bottom:50px;">订单生成，微信将收取0.6%的手续费</div> -->
    <div class="s-bottom submit-button color-white" @click="makeDeal">
      <span>支付保证金 ￥{{room.deposit}} + 手续费￥{{fee}}</span>
    </div>
    <append-product v-model="popupShow" @close="popupClose" @confirm="popupConfirm" from="roomorder" :rebate="propRebate"></append-product>
    <div v-transfer-dom>
      <x-dialog v-model="showDialog" hide-on-blur :dialog-style="{width: '100%', height: '50%', 'background-color': '#ffffff'}">
        <div style="text-align:center;padding-top:10px;" @click="showDialog = false">
          <div style="font-size:14px;text-align:left;padding:10px 20px;overflow-y:scroll;height:400px;">
            <h4 style="text-align:center;">群群推服务协议</h4>
            <p style="text-indent:28px;">通过使用群群推服务，您明确同意使用群群推服务协议，由您自行承担全部风险。共销客不保证您在群群推上看到内容的准确性、真实性或完整性。</p>
            <p style="text-indent:28px;">您特此确认已知晓本协议适用于群群推提供的所有内容和服务。在任何情况下，共销客不对您因使用或无法使用群群推服务而导致的任何直接或间接损害承担责任，包括但不限于您对群群推服务获得的任何信息产生依赖导致的错误、删除、服务延迟或任何其他故障。虽然群群推已竭尽全力确保平台显示的内容是正确的，但共销客对信息准确性作出保证，并“原样”提供所有信息。在法律允许的最大范围内，共销客的合作伙伴和关联公司，相关第三方，员工，承包商以及参与群群推运营的人员，对您或任何第三方因群群推上销售的产品而导致的任何损失或损害，不承担任何责任和义务。这包括（但不限于）因疏忽而导致的任何损失或损害。</p>
            <p style="text-indent:28px;">群群推仅为您提供群价值的参考建议并非完全精准信息！</p>
          </div>
          <x-icon type="ios-close-outline" style="fill:red;"></x-icon>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import { CheckIcon, XDialog, TransferDom } from 'vux'
import RoomView from '@/components/RoomView'
import forminputplate from '@/components/Forminputplate'
import AppendProduct from '@/components/AppendProduct'
import ENV from 'env'
export default {
  directives: {
    TransferDom
  },
  components: {
    CheckIcon, RoomView, forminputplate, AppendProduct, XDialog
  },
  data () {
    return {
      query: {},
      isAccept: false,
      popupShow: false,
      product: {},
      room: {},
      isSubmiting: false,
      showDialog: false,
      propRebate: true,
      routePath: '',
      fee: '0.00'
    }
  },
  methods: {
    initData () {
      this.room = {}
      this.product = {}
    },
    showProtocol () {
      this.showDialog = true
    },
    loadData () {
      const id = this.$route.query.id
      this.$vux.loading.show()
      this.$http.post(`${ENV.BokaApi}/api/groups/groupInfo`, {id: id})
      .then(res => {
        this.$vux.loading.hide()
        if (res.data.flag === 1) {
          this.room = res.data.data
          let fee = parseFloat(this.room.deposit) * 0.006
          if (fee < 0.01) {
            this.fee = '0.01'
          } else {
            this.fee = fee.toFixed(2)
          }
        }
      })
    },
    handleAppend () {
      this.popupShow = true
    },
    popupClose () {
      this.popupShow = false
    },
    popupConfirm (product) {
      this.product = product
      this.popupShow = false
    },
    makeDeal () {
      if (!this.isSubmiting) {
        const gid = parseInt(this.$route.query.id)
        const data = {
          pid: this.product.id,
          gid: gid
        }
        if (this.$util.validateQueue(
          [
            {pid: data.pid},
            {gid: data.gid}
          ],
          model => {
            switch (model.key) {
              case 'pid':
                this.$vux.toast.text('请选择商品', 'middle')
                break
              case 'gid':
                this.$vux.toast.text('未知群信息', 'middle')
                break
            }
          }
        )) {
          if (!this.isAccept) {
            this.$vux.toast.text('需同意协议', 'middle')
            return
          }
          this.$http.post(`${ENV.BokaApi}/api/groups/addOrder`, data)
          .then(res => {
            const data = res.data
            this.$vux.toast.text(data.error, 'middle')
            if (data.flag === 1) {
              setTimeout(() => {
                if (this.query.from) {
                  this.$wechat.miniProgram.navigateTo({url: `/packageB/pages/pay?id=${data.data}&module=${data.ordermodule}&weburl=roomOrders`})
                } else {
                  let backurl = encodeURIComponent(`/roomOrders`)
                  location.replace(`${ENV.Host}/#/pay?id=${data.data}&module=${data.ordermodule}&backurl=${backurl}`)
                }
              }, 1000)
            }
          })
        }
      }
    }
  },
  activated () {
    this.query = this.$route.query
    this.routePath = this.$route.path
    this.initData()
    this.loadData()
  }
}
</script>
<style lang="less">
#room-order-deal{
  .title-cell{width:110px;}
}
#room-order-deal .operation-area {
  margin-top: 10px;
  background-color: #ffffff;
}
#room-order-deal .submit-button {
  background-color: @boka-red;
  line-height: 45px;
  text-align: center;
}
#room-order-deal .select-area .text {
  line-height: 40px;
}
#room-order-deal .select-area {
  height: 40px;
}
#room-order-deal .select-area:after {
  content: " ";
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #c8c8cd;
  border-style: solid;
  -webkit-transform: matrix(.71,.71,-.71,.71,0,0);
  transform: matrix(.71,.71,-.71,.71,0,0);
  position: relative;
  top: -2px;
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 0px;
}
#room-order-deal .protocal-area {
  padding: 20px 0;
  text-align: center;
  position:absolute;bottom:40px;width:100%;
  a{text-decoration:underline;}
}
</style>
