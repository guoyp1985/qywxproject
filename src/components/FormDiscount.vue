/*
* @description: 添加限时活动表单项组件
* @auther: gyp
* @created_date: 2018-4-20
*/
<template>
  <div>
    <div class="form-item">
      <div class="t-table">
        <div class="t-cell title-cell w80 font14 v_middle">活动价格<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
        <div class="t-cell input-cell v_middle" style="position:relative;">
          <input v-model="submitdata.param_price" type="text" class="input" name="param_price" placeholder="活动价格" />
        </div>
        <div class="t-cell v_middle align_right font12" style="width:40px;">元</div>
      </div>
    </div>
    <div class="form-item">
      <div class="t-table">
        <div class="t-cell title-cell w80 font14 v_middle">每人限购<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
        <div class="t-cell input-cell v_middle" style="position:relative;">
          <input v-model="submitdata.param_limitcount" type="tel" class="input" name="param_limitcount" placeholder="每人限购" />
        </div>
        <div class="t-cell v_middle align_right font12" style="width:40px;">元</div>
      </div>
    </div>
    <div class="form-item">
      <div class="t-table">
        <div class="t-cell title-cell w80 font14 v_middle">投放总数<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
        <div class="t-cell input-cell v_middle" style="position:relative;">
          <input v-model="submitdata.param_storage" type="tel" class="input" name="param_storage" placeholder="此次活动投入的商品总数" />
        </div>
        <div class="t-cell v_middle align_right font12" style="width:40px;">元</div>
      </div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { XInput } from 'vux'

export default {
  name: 'FormDiscount',
  components: {
    XInput
  },
  props: {
    submitdata: Object
  },
  data () {
    return {
    }
  },
  created: function () {
  },
  watch: {
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="less">
<style>
