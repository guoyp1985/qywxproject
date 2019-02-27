<template>
  <div id="order-detail" class="containerarea notop rorderdetail bg-page color-gray5 font14">
    <div class="pagemiddle scroll-container">
      <div class="bg-white b_bottom_after padding10">
        <div class="db-flex">
          <div class="w100">买家</div>
          <div class="flex_cell flex_right">{{orderData.linkman}}</div>
        </div>
      </div>
      <div class="bg-white b_bottom_after padding10">
        <div class="db-flex">
          <div class="w100">购买商品</div>
          <div class="flex_cell flex_right">
            <img :src="orderData.photo" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';" style="width:50px;height:50px;object-fit:cover;"/>
          </div>
        </div>
      </div>
      <div class="bg-white b_bottom_after padding10">
        <div class="db-flex">
          <div class="w100">收货地址</div>
          <div class="flex_cell flex_right">{{orderData.address}}</div>
        </div>
      </div>
      <div class="bg-white b_bottom_after padding10">
        <div class="db-flex">
          <div class="w100">手机号码</div>
          <div class="flex_cell flex_right">{{orderData.telephone}}</div>
        </div>
      </div>
      <div class="bg-white b_bottom_after padding10">
        <div class="db-flex">
          <div class="w100">
            <div>
              <div>购买件数</div>
              <div>型号/颜色</div>
            </div>
          </div>
          <div class="flex_cell flex_right">{{orderData.options}}</div>
        </div>
      </div>
      <div class="bg-white b_bottom_after padding10">
        <div class="db-flex">
          <div class="w100">备注</div>
          <div class="flex_cell flex_right">{{orderData.content}}</div>
        </div>
      </div>
      <div class="mt10 bg-white padding10 b_bottom_after">
        <div class="t-table">
          <div class="t-cell">创建时间: {{ data.dateline | dateformat }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { TransferDom, Popup } from 'vux'
import ENV from 'env'
import Time from '#/time'
import { User } from '#/storage'

const BokaApi = ENV.BokaApi

export default {
  directives: {
    TransferDom
  },
  components: {
    Popup
  },
  filters: {
    dateformat: function (value) {
      return new Time(value * 1000).dateFormat('yyyy-MM-dd hh:mm')
    }
  },
  data () {
    return {
      loginUser: {},
      query: {},
      data: {dateline: 1544786026},
      orderData: {
        uid: 8,
        linkman: '买家姓名',
        address: '北京丰台区',
        content: '发货快一点',
        options: '小号，红色',
        photo: 'https://tossqzx.boka.cn/month_201902/15511754252365.png',
        telephone: '18812341234'
      }
    }
  },
  watch: {
    data () {
      return this.data
    }
  },
  computed: {
  },
  methods: {
    getData () {
      this.$http.get(`${BokaApi}/api/moduleInfo`, {
        params: {module: 'ordersoffline', id: this.query.id}
      }).then(res => {
        const data = res.data
        const retdata = data.data ? data.data : data
        this.orderData = retdata
      })
    },
    refresh () {
      this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
      this.loginUser = User.get()
      this.query = this.$route.query
      this.getData()
    }
  },
  activated () {
    this.refresh()
    this.$util.miniPost()
  }
}
</script>

<style lang="less" scoped>
.popup-deliver .fileinput{position:absolute;left:0;right:0;top:0;bottom:0;z-index:1;background-color:transparent;opacity:0;}
</style>
