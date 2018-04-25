/*
* @description: 返点客页
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div id="to-recommend">
    <sticky scroll-box="to-recommend">
      <tab v-model="selectedIndex">
        <tab-item class="font14" selected>{{$t('My Return Stores')}}</tab-item>
        <tab-item class="font14">{{$t('Bought Stores')}}</tab-item>
      </tab>
    </sticky>
    <view-box v-show="selectedIndex===0">
      <group v-if="list.length">
        <cell-box v-for="(item, index) in list" :key="index" :link="{name: 'tRebateStore', params: {id: item.id}}">
          <div class="store-img">
            <x-img :src="item.img"></x-img>
          </div>
          <div class="store-info">
            <div class="store-name">
              {{item.name}}
            </div>
          </div>
        </cell-box>
      </group>
      <div v-else class="no-related-x color-gray">
        <span>{{$t('No Related Ruturn Stores')}}</span>
      </div>
    </view-box>
    <view-box v-show="selectedIndex===1">
      <group v-if="list1.length">
        <cell-box v-for="(item, index) in list1" :key="index">
          <div class="store-img">
            <x-img :src="item.img"></x-img>
          </div>
          <div class="store-info font14">
            <div class="store-name">
              {{item.name}}
            </div>
          </div>
          <div class="operate-cell">
            <x-button class="font12" mini type="primary" @click.native="applyClick">申请返点客</x-button>
          </div>
        </cell-box>
      </group>
      <div v-else class="no-related-stores color-gray">
        <span>{{$t('No Bought Stores')}}</span>
      </div>
    </view-box>
  </div>
</template>
<script>
import { ViewBox, Tab, TabItem, Group, CellBox, XImg, Sticky, XButton } from 'vux'

export default {
  components: {
    ViewBox,
    Tab,
    TabItem,
    Group,
    CellBox,
    XImg,
    Sticky,
    XButton
  },
  data () {
    return {
      selectedIndex: 0,
      list: [
        {
          id: '1',
          img: '../../assets/_images/nopic.jpg',
          name: 'adidas'
        }
      ],
      list1: [
        {
          id: '1',
          img: '../../assets/_images/nopic.jpg',
          name: 'adidas'
        }
      ]
    }
  },
  computed: {
    getItems () {
    }
  },
  methods: {
    applyClick (id) {
      this.$router.push({name: 'tRebateApply'})
    }
  },
  created () {
    this.$store.commit('updateToggleTabbar', {toggleTabbar: false})
  }
}
</script>

<style lang="less">
#to-recommend .recommend-title {
  padding: 10px 20px;
  position: relative;
  background-color: #ffffff;
}
#to-recommend .recommend-title:after {
  content: ' ';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e7e7e7;
}
#to-recommend .bought-stores {
  margin-top: 10px;
}
#to-recommend .store-info {
  flex: 1;
  padding-left: 10px;
}
#to-recommend .store-img {
  display: flex;
}
#to-recommend .store-img img{
  width: 60px;
  height: 60px;
}

/* vux css hack */
#to-recommend .weui-cells {
  margin-top: 0;
}
#to-recommend .weui-cells:first-of-type:before {
  height: 0;
  border-top: none;
}
</style>
