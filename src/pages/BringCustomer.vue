/*
* @description: 带来客户页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="bring-customer">
    <sticky scroll-box="bring-customer">
      <div class="bring-customer-title font16 color-white">
        {{$t('Bring Customer')}}
      </div>
    </sticky>
    <view-box>
      <group v-if="list.length">
        <cell class="user-cell" v-for="(item, index) in list" :key="index" :title="item.username">
          <x-img slot="icon" :src="item.avatar" class="radius50"></x-img>
          <div slot="inline-desc">
            <span class="color-gray font13">{{item.dateline | dateFormat}}</span>
          </div>
        </cell>
      </group>
      <template v-else>
        <div class="no-related-x color-gray">
          <span>{{$t('No Related Data')}}</span>
        </div>
      </template>
    </view-box>
  </div>
</template>
<script>
import Time from '#/time'

export default {
  data () {
    return {
      list: [
        {
          avatar: '',
          username: 'simon',
          dateline: 1523446874216
        }
      ]
    }
  },
  filters: {
    dateFormat (date) {
      return new Time(date).format()
    }
  }
}
</script>
<style lang="less">
#bring-customer .bring-customer-title {
  padding: 10px;
  background-image: url('../assets/images/bannerbg2.png');
}
#bring-customer .user-cell img {
  width: 40px;
  height: 40px;
}

/* vux css hack */
#bring-customer .weui-cell__hd {
  display: flex;
}
#bring-customer .weui-cells {
  margin-top: 0;
}
#bring-customer .weui-cells:before {
  height: 0;
  border-top: none;
}
#bring-customer .vux-cell-primary {
  padding-left: 10px;
}
</style>
