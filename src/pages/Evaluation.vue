/*
* @description: 订单评价页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="product-evaluation" class="containerarea font14">
    <template v-if="showSos">
      <Sos :title="sosTitle"></Sos>
    </template>
    <template v-if="showContainer">
      <template v-if="list.length > 0">
        <div class="evaluation" v-for="(item, index) in list" :key="index">
          <group>
            <cell :title="item.name" class="product-rater font14">
              <x-img class="product-img" slot="icon" :src="item.photo"></x-img>
              <div slot="inline-desc">
                <rater v-model="item.stars"></rater>
              </div>
            </cell>
          </group>
          <group>
            <x-textarea v-model="item.comment" class="font14" :max="500" :placeholder="`${$t('Necessary')}${$t('Writing Evaluation')}`"></x-textarea>
          </group>
          <group>
            <group-title slot="title">{{$t('Evaluation Of Logistics')}}<span style="float:right;">{{$t('To Give Five Stars')}}</span></group-title>
            <cell class="font14" :title="$t('Express Package')">
              <rater v-model="item.stars1"></rater>
            </cell>
            <cell class="font14" :title="$t('Delivery Speed')">
              <rater v-model="item.stars2"></rater>
            </cell>
            <cell class="font14" :title="$t('Service Attitude')">
              <rater v-model="item.stars3"></rater>
            </cell>
          </group>
          <div class="operate-area">
            <x-button mini @click.native="onSubmit(item)">{{$t('Submit')}}</x-button>
          </div>
          <!-- <box gap="20px">
            <x-button type="primary" @click.native="onSubmit">{{$t('Confirm')}}</x-button>
            <x-button type="default" @click.native="onCancel">{{$t('Cancel')}}</x-button>
          </box> -->
        </div>
      </template>
    </template>
  </div>
</template>
<script>
import { Group, GroupTitle, Cell, XImg, Rater, XTextarea, XButton, Box } from 'vux'
import Sos from '@/components/Sos'
import ENV from 'env'
export default {
  components: {
    Group, GroupTitle, Cell, XImg, Rater, XTextarea, XButton, Box, Sos
  },
  data () {
    return {
      showSos: false,
      sosTitle: '',
      showContainer: false,
      query: {},
      list: []
    }
  },
  methods: {
    onSubmit (product) {
      const self = this
      const orderId = this.$route.query.id
      this.$http.post(`${ENV.BokaApi}/api/comment/add`, {message: product.comment, module: 'product', nid: product.pid, type: 'orders', orderid: orderId})
      .then(res => {
        if (res.data.flag) {
          self.$vux.toast.text(res.data.error)
          setTimeout(() => {
            self.$router.go(-1)
          }, 2000)
        } else {
          self.$vux.toast.text(res.data.error)
        }
      })
    },
    onCancel () {
      this.$router.go(-1)
    },
    getData () {
      const self = this
      const id = this.$route.query.id
      this.$http.get(`${ENV.BokaApi}/api/order/orderDetail`, {
        params: {id: id}
      })
      .then(res => {
        let data = res.data
        if (data.flag !== 1) {
          self.sosTitle = data.error
          self.showSos = true
          self.showContainer = false
        }
        if (res.data.flag) {
          const retdata = data.data ? data.data : data
          if (retdata.length === 0) {
            self.sosTitle = '无此订单'
            self.showSos = true
            self.showContainer = false
          } else {
            self.showContainer = true
            self.list = retdata.orderlist
          }
        }
      })
    },
    refresh () {
      this.getData()
    }
  },
  activated () {
    this.refresh()
  }
}
</script>
<style lang="less">
#product-evaluation .product-img {
  width: 60px;
  height: 60px;
}

#product-evaluation .product-rater .vux-cell-primary {
  margin-left: 10px;
}

#product-evaluation .product-rater .vux-label {
  padding-left: 5px;
  padding-bottom: 5px;
}

#product-evaluation .operate-area {
  position: relative;
  background-color: #ffffff;
  text-align: right;
  padding: 8px 10px;
}

/* vux css hack */
#product-evaluation .weui-cell__hd {
  display: flex;
}
#product-evaluation .vux-cell-primary {
  margin-left: 10px;
}
</style>
