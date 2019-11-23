/*
* @description: 添加团购活动表单项组件
* @auther: gyp
* @created_date: 2018-4-20
*/
<template>
  <div>
    <div class="form-item">
      <div class="t-table">
        <div class="t-cell title-cell w80 font14 v_middle">团购价<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
        <div class="t-cell input-cell v_middle" style="position:relative;">
          <x-input v-model="submitdata.param_groupprice" type="text" class="input" name="param_groupprice" placeholder="团购价" ></x-input>
        </div>
        <div class="t-cell v_middle align_right font12" style="width:40px;">元</div>
      </div>
    </div>
    <div class="form-item">
      <div class="t-table">
        <div class="t-cell title-cell w80 font14 v_middle">成团人数<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
        <div class="t-cell input-cell v_middle" style="position:relative;">
          <x-input v-model="submitdata.param_numbers" type="tel" class="input" name="param_numbers" placeholder="几人成团" ></x-input>
        </div>
        <div class="t-cell v_middle align_right font12" style="width:40px;">人</div>
      </div>
    </div>
    <div class="form-item">
      <div class="t-table">
        <div class="t-cell title-cell w80 font14 v_middle">成团时间<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
        <div class="t-cell input-cell v_middle" style="position:relative;">
          <x-input v-model="submitdata.param_finishtime" type="tel" class="input" name="param_finishtime" placeholder="用户完成活动的最长时间,如24" ></x-input>
        </div>
        <div class="t-cell v_middle align_right font12" style="width:40px;">小时</div>
      </div>
    </div>
    <div class="form-item">
      <div class="t-table">
        <div class="t-cell title-cell w80 font14 v_middle">限购件数<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
        <div class="t-cell input-cell v_middle" style="position:relative;">
          <x-input v-model="submitdata.param_everybuy" type="tel" class="input" name="param_everybuy" placeholder="单个用户最多购买团购商品数量" ></x-input>
        </div>
        <div class="t-cell v_middle align_right font12" style="width:40px;">件</div>
      </div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { XInput } from 'vux'

export default {
  name: 'FormGroupbuy',
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
