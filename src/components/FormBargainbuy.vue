/*
* @description: 添加砍价活动表单项组件
* @auther: gyp
* @created_date: 2018-4-20
*/
<template>
  <div class="form-bargainbuy">
    <div class="form-item">
      <div class="t-table">
        <div class="t-cell title-cell w80 font14 v_middle">活动价格<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
        <div class="t-cell input-cell v_middle" style="position:relative;">
          <x-input v-model="minprice" type="text" class="input minprice" name="param_minprice" placeholder="活动价格" ></x-input>
        </div>
        <div class="t-cell v_middle align_right font12" style="width:40px;">元</div>
      </div>
    </div>
    <div class="form-item">
      <div class="t-table">
        <div class="t-cell title-cell w80 font14 v_middle">投放总数<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
        <div class="t-cell input-cell v_middle" style="position:relative;">
          <x-input v-model="submitdata.param_limitbuy" type="tel" class="input" name="param_limitbuy" placeholder="此次活动投入的商品总数" ></x-input>
        </div>
        <div class="t-cell v_middle align_right font12" style="width:40px;">件</div>
      </div>
    </div>
    <div class="form-item">
      <div class="t-table">
        <div class="t-cell title-cell w80 font14 v_middle">砍价周期<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
        <div class="t-cell input-cell v_middle" style="position:relative;">
          <x-input v-model="submitdata.param_finishtime" type="tel" class="input" name="param_everymin" placeholder="用户完成活动的最长时间,如24" ></x-input>
        </div>
        <div class="t-cell v_middle align_right font12" style="width:40px;">小时</div>
      </div>
    </div>
    <div class="form-item">
      <div class="t-table">
        <div class="t-cell title-cell w80 font14 v_middle">最小可砍<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
        <div class="t-cell input-cell v_middle" style="position:relative;">
          <x-input v-model="everymin" type="text" class="input everymin" name="param_everymin" placeholder="用户砍价最小金额" ></x-input>
        </div>
        <div class="t-cell v_middle align_right font12" style="width:40px;">元</div>
      </div>
    </div>
    <div class="form-item">
      <div class="t-table">
        <div class="t-cell title-cell w80 font14 v_middle">最大可砍<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
        <div class="t-cell input-cell v_middle" style="position:relative;">
          <x-input v-model="everymax" type="text" class="input everymax" name="param_everymax" placeholder="用户砍价最大金额" ></x-input>
        </div>
        <div class="t-cell v_middle align_right font12" style="width:40px;">元</div>
      </div>
    </div>
    <div v-show="showtip" class="from-item">
      <div class="padding10 align_center color-gray font13">预计需要<span class="ml3 mr3">{{ neednum }}</span>位好友帮忙砍至最低价</div>
      <div class=" align_center color-gray font13">建议人数在20~30人之间，砍价容易成功</div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { XInput } from 'vux'
import jQuery from 'jquery'

export default {
  name: 'FormBargainbuy',
  components: {
    XInput
  },
  props: {
    data: Object,
    submitdata: Object
  },
  data () {
    return {
      showtip: false,
      neednum: 0,
      minprice: '0.00',
      everymin: '0.00',
      everymax: '0.00',
      price: '0.00',
      inMounted: false
    }
  },
  watch: {
    minprice: function () {
      const self = this
      if (self.data && self.data.price) {
        self.price = self.data.price.replace(/,/g, '')
      }
      self.submitdata.param_minprice = self.minprice
      self.getNum()
      return self.minprice
    },
    everymin: function () {
      const self = this
      if (self.data && self.data.price) {
        self.price = self.data.price.replace(/,/g, '')
      }
      self.submitdata.param_everymin = self.everymin
      self.getNum()
      return self.everymin
    },
    everymax: function () {
      const self = this
      if (self.data && self.data.price) {
        self.price = self.data.price.replace(/,/g, '')
      }
      self.submitdata.param_everymax = self.everymax
      self.getNum()
      return self.everymax
    },
    price: function () {
      const self = this
      if (self.data && self.data.price) {
        self.price = self.data.price.replace(/,/g, '')
      }
      self.getNum()
      return self.price
    }
  },
  methods: {
    initData () {
      this.neednum = 0
      this.minprice = ''
      this.everymin = ''
      this.everymax = ''
      this.price = ''
    },
    getNum: function () {
      const self = this
      if (self.data && self.data.price) {
        self.price = self.data.price.replace(/,/g, '')
      }
      let minprice = self.minprice
      let everymin = self.everymin
      let everymax = self.everymax
      let price = self.price
      if (self.$util.trim(price) !== '' && self.$util.trim(minprice) !== '' && !isNaN(minprice)) {
        let cha = parseFloat(price) - parseFloat(minprice)
        if (self.$util.trim(everymin) !== '' && self.$util.trim(everymax) !== '') {
          let nnum = Math.ceil((cha / parseFloat(everymin) + cha / parseFloat(everymax)) / 2)
          self.neednum = isNaN(nnum) ? 0 : nnum
          self.showtip = true
        } else if (self.$util.trim(everymin) !== '') {
          let nnum = Math.ceil(cha / parseFloat(everymin))
          self.neednum = isNaN(nnum) ? 0 : nnum
          self.showtip = true
        } else if (self.$util.trim(everymax) !== '') {
          let nnum = Math.ceil(cha / parseFloat(everymax))
          self.neednum = isNaN(nnum) ? 0 : nnum
          self.showtip = true
        } else {
          self.showtip = false
        }
      } else {
        self.showtip = false
      }
    }
  },
  created: function () {
    // const self = this
    // self.minprice = self.submitdata.param_minprice
    // self.everymin = self.submitdata.param_everymin
    // self.everymax = self.submitdata.param_everymax
    // if (self.data && self.data.price) {
    //   self.price = self.data.price.replace(/,/g, '')
    // }
  },
  mounted () {
    const self = this
    self.initData()
    jQuery('.form-bargainbuy .input').val('')
  },
  activated () {
    const self = this
    self.initData()
    jQuery('.form-bargainbuy .input').val('')
  }
}
</script>

<style lang="less">
<style>
