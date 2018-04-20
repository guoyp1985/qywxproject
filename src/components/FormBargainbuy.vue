/*
* @description: 添加砍价活动表单项组件
* @auther: gyp
* @created_date: 2018-4-20
*/
<template>
  <div>
    <div class="form-item">
      <div class="t-table">
        <div class="t-cell title-cell w80 font14 v_middle">活动价格<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
        <div class="t-cell input-cell v_middle" style="position:relative;">
          <input v-model="submitdata.minprice" type="text" class="input" name="minprice" placeholder="活动价格" />
        </div>
        <div class="t-cell v_middle align_right font12" style="width:40px;">元</div>
      </div>
    </div>
    <div class="form-item">
      <div class="t-table">
        <div class="t-cell title-cell w80 font14 v_middle">投放总数<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
        <div class="t-cell input-cell v_middle" style="position:relative;">
          <input v-model="submitdata.limitbuy" type="text" class="input" name="limitbuy" placeholder="此次活动投入的商品总数" />
        </div>
        <div class="t-cell v_middle align_right font12" style="width:40px;">件</div>
      </div>
    </div>
    <div class="form-item">
      <div class="t-table">
        <div class="t-cell title-cell w80 font14 v_middle">砍价周期<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
        <div class="t-cell input-cell v_middle" style="position:relative;">
          <input v-model="submitdata.finishtime" type="text" class="input" name="finishtime" placeholder="用户完成活动的最长时间,如24" />
        </div>
        <div class="t-cell v_middle align_right font12" style="width:40px;">小时</div>
      </div>
    </div>
    <div class="form-item">
      <div class="t-table">
        <div class="t-cell title-cell w80 font14 v_middle">最小可砍<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
        <div class="t-cell input-cell v_middle" style="position:relative;">
          <input v-model="submitdata.everymin" type="text" class="input" name="everymin" placeholder="用户砍价最小金额" />
        </div>
        <div class="t-cell v_middle align_right font12" style="width:40px;">元</div>
      </div>
    </div>
    <div class="form-item">
      <div class="t-table">
        <div class="t-cell title-cell w80 font14 v_middle">最大可砍<span class="al al-xing color-red font12 ricon" style="vertical-align: 3px;display:inline-block;"></span></div>
        <div class="t-cell input-cell v_middle" style="position:relative;">
          <input v-model="submitdata.everymax" type="text" class="input" name="everymax" placeholder="用户砍价最大金额" />
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
  name: 'FormBargainbuy',
  components: {
    XInput
  },
  props: {
    /*
    submitdata: {
      type: Object,
      default: () => {}
    },
    */
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
