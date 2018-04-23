<template>
  <div id="product-evaluation">
    <group>
      <cell title="productName" class="product-rater">
        <x-img class="product-img" slot="icon" :src="productImg"></x-img>
        <div slot="inline-desc">
          <rater v-model="stars"></rater>
        </div>
      </cell>
    </group>
    <group>
      <x-textarea v-model="value" class="font14" :max="500" :placeholder="$t('Writing Evaluation')"></x-textarea>
    </group>
    <group>
      <group-title slot="title">{{$t('Evaluation Of Logistics')}}<span style="float:right;">{{$t('To Give Five Stars')}}</span></group-title>
      <cell class="font14" :title="$t('Express Package')">
        <rater v-model="stars1"></rater>
      </cell>
      <cell class="font14" :title="$t('Delivery Speed')">
        <rater v-model="stars2"></rater>
      </cell>
      <cell class="font14" :title="$t('Service Attitude')">
        <rater v-model="stars3"></rater>
      </cell>
    </group>
    <box gap="20px">
      <x-button type="primary" @click.native="onSubmit">{{$t('Confirm')}}</x-button>
      <x-button type="default" @click.native="onCancel">{{$t('Cancel')}}</x-button>
    </box>
  </div>
</template>
<script>
import { Group, GroupTitle, Cell, XImg, Rater, XTextarea, XButton, Box } from 'vux'
export default {
  components: {
    Group,
    GroupTitle,
    Cell,
    XImg,
    Rater,
    XTextarea,
    XButton,
    Box
  },
  data () {
    return {
      productName: '',
      productImg: '',
      stars: 1,
      stars1: 1,
      stars2: 1,
      stars3: 1,
      value: ''
    }
  },
  methods: {
    onSubmit () {

    },
    onCancel () {
      this.$router.go(-1)
    }
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
</style>
