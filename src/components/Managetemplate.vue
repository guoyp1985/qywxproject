<template>
  <div class="bk-managetemplate order-item scroll_item mb10 font14 db list-shadow">
    <div class="bg-white padding10 b_bottom_after font13 db-flex">
      <div class="inner flex_left">
        <img class="imgcover" :src="data.avatar" @error="`javascript:'this.src=${ENV.ImageHostUri}/user.jpg';`" />
      </div>
      <div class="flex_cell flex_left">
        <div class="w_100 clamp1">{{data.linkman}}</div>
      </div>
      <div class="flex_right" style="position:relative;width:120px;" @click="copyTxt(data)">
        <span class="al al-copy font14 color-red4"></span><span class="font14 color-red4">复制收货地址</span>
        <div class="deliver_txt" style="position:absolute;left:0;top:0;right:0;bottom:0;opacity:0;z-index:1;overflow:hidden;">{{ data.linkman ? data.linkman + ', ' : '' }}{{ data.telephone ? data.telephone + ', ' : '' }}{{ data.address ? data.address : '' }}</div>
      </div>
    </div>
    <div @click="toDetail" class="db pt10 pb10 pl12 pr12 bg-white" style="color:inherit;">
      <div class="t-table">
        <div class="t-cell pic" style="width:90px;">
          <img class="imgcover" :src="data.photo" @error="`javascript:'this.src=${ENV.ImageHostUri}/nopic.jpg';`" style="width:80px;height:80px;" />
        </div>
        <div class="t-cell v_middle">
          <div class="font14"><span class="color-lightgray">型号数量: </span>{{data.options}}</div>
        </div>
      </div>
      <div class="clamp1 font14"><span class="color-lightgray">手机号码: </span>{{data.telephone}}</div>
      <div class="mt5 font14"><span class="color-lightgray">收货地址: </span>{{data.address}}</div>
    </div>
    <div class="bg-white padding10 b_top_after b_bottom_after color-gray5 flex_right" v-if="data.flag == 1 || data.flag == 2 || data.flag == 3">
      <template v-if="data.flag == 1">
        <div class="btn canle" @click="clickCancel">取消</div>
        <div class="btn sure" @click="clickConfirm">确认收款</div>
      </template>
      <template v-if="data.flag == 2">
        <div class="btn sure" @click="clickDeliver">立即发货</div>
      </template>
      <template v-if="data.flag == 3">
        <div class="btn sure" @click="viewDeliver">查看物流</div>
      </template>
    </div>
  </div>
</template>
<script>
import jQuery from 'jquery'
export default {
  name: 'Managetemplate',
  props: {
    dataIndex: Number,
    data: Object,
    orderLink: {
      type: String,
      default: ''
    },
    from: {
      type: String,
      default: ''
    }
  },
  watch: {
    data () {
      return this.data
    }
  },
  methods: {
    toDetail () {
      let params = {id: this.data.id}
      if (this.$route.query.from) {
        params.from = this.$route.query.from
      }
      this.$router.push({path: '/simpleOrderDetail', query: params})
    },
    copyTxt () {
      console.log('in copy')
      const self = this
      let eleobj = jQuery('#order-management-page .deliver_txt')[0]
      let range = null
      let save = function (e) {
        e.clipboardData.setData('text/plain', eleobj.innerHTML)
        e.preventDefault()
      }
      if (self.$util.isIOS()) { // ios设备
        window.getSelection().removeAllRanges()
        range = document.createRange()
        range.selectNode(eleobj)
        window.getSelection().addRange(range)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
      } else { // 安卓设备
        console.log('in android')
        document.addEventListener('copy', save)
        document.execCommand('copy')
        document.removeEventListener('copy', save)
      }
      setTimeout(function () {
        self.$vux.toast.show({
          text: '复制成功',
          time: 1500
        })
      }, 200)
    },
    clickCancel () {
      this.$emit('clickCancel', this.data, this.dataIndex)
    },
    clickConfirm () {
      this.$emit('clickConfirm', this.data, this.dataIndex)
    },
    clickDeliver () {
      this.$emit('uploadDeliver', this.data, this.dataIndex)
    },
    viewDeliver () {
      this.$emit('viewDeliver', this.data, this.dataIndex)
    }
  }
}
</script>

<style lang="less">
.bk-managetemplate{
  height:100%;
  .inner{
    width:40px;height:30px;border-radius:50%;
    img{width:30px;height:30px;border-radius:50%;border:1px solid #e5e5e5}
  }
  .btn{width:70px;height:20px;font-size:12px;text-align:center;line-height:20px;border-radius:20px;margin-left:10px;}
  .canle{border:1px solid #999;color:#999;}
  .sure{border:1px solid #fd6c63;color:#fd6c63;}
}
</style>
