/*
* @description: 群群推下单页面
* @auther: simon
* @created_date: 2019-1-8
*/
<template>
  <div id="room-order-deal" class="containerarea font14 s-havebottom">
    <div class="room-details">
      <room-view :item="room" :show-details="true"></room-view>
    </div>
    <div class="operation-area">
      <form>
        <forminputplate class="required">
          <span slot="title">商品</span>
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
              <span class="text">选择商品</span>
            </div>
          </div>
        </forminputplate>
      </form>
    </div>
    <div class="protocal-area">
      <check-icon :value.sync="isAccept" type="plain"><a>同意群群推协议</a></check-icon>
    </div>
    <div class="s-bottom submit-button color-white" @click="makeDeal">
      <span>支付保证金 ￥{{room.deposit}}</span>
    </div>
    <append-product v-model="popupShow" @close="popupClose" @confirm="popupConfirm" from="myshop"></append-product>
  </div>
</template>
<script>
import { CheckIcon } from 'vux'
import RoomView from '@/components/RoomView'
import forminputplate from '@/components/Forminputplate'
import AppendProduct from '@/components/AppendProduct'
import ENV from 'env'
export default {
  components: {
    CheckIcon, RoomView, forminputplate, AppendProduct
  },
  data () {
    return {
      isAccept: false,
      popupShow: false,
      product: {},
      room: {},
      isSubmiting: false
    }
  },
  methods: {
    loadData () {
      const id = this.$route.query.id
      this.$http.post(`${ENV.BokaApi}/api/groups/groupInfo`, {id: id})
      .then(res => {
        if (res.data.flag === 1) {
          this.room = res.data.data
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
            console.log(data)
            this.$vux.toast.text(data.error, 'middle')
            if (data.flag === 1) {
              setTimeout(() => {
                this.$router.push({path: '/pay', query: {id: data.data, module: data.ordermodule}})
              }, 1000)
            }
          })
        }
      }
    }
  },
  activated () {
    this.loadData()
  }
}
</script>
<style lang="less">
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
}
</style>
