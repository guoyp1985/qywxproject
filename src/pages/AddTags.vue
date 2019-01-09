<template>
  <div class="add-tags">
    <div class="input-box">
      <group>
        <x-textarea placeholder="说点什么吧..." :max="max"></x-textarea>
      </group>
    </div>
    <div class="photos">
      <div class="photo-wraper" v-for="photo in photos" :key="photo.id">
        <div class="photo">
          <span class="al al-guanbi"></span>
          <img :src="photo">
        </div>
      </div>
      <div class="photo-wraper" v-if="photos.length < 9">
        <div class="photo count-tip" @click="onChooseImage">
          <span class="al al-zhaopian"></span>
          <span class="count">{{photos.length}} / 9</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { Group, XTextarea } from 'vux'
export default{
  data () {
    return {
      max: 200,
      id: null,
      photos: []
    }
  },
  components: {
    Group,
    XTextarea
  },
  methods: {
    onChooseImage () {
      if (this.$util.isPC()) {
        console.log('现在是pc端')
      } else {
        this.$wechat.ready(function () {
          this.$util.wxUploadImage({
            maxnum: 9 - this.photos.length,
            handleCallback: function (data) {
              if (data.flag === 1) {
                this.photos.push(data.data)
              } else if (data.error) {
                this.$vux.toast.show({
                  text: data.error
                })
              }
            }
          })
        })
      }
    }
  }
};
</script>

<style lang="less" scoped="">
.add-tags{
  width: 100vw;
  height: 100vh;
  .photos{
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    box-sizing: border-box;
    justify-content: space-between;
    .photo-wraper{
      width: 30%;
      height: 0;
      padding-top: 30%;
      position: relative;
      .photo{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        img{
          width: 100%;
          height: 100%;
        }
        .al-guanbi{
          position: absolute;
          top: -5px;
          right: -5px;
        }
      }
      .count-tip{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: 1px dotted #c9c9c9;
        color: #c9c9c9;
        border-radius: 5px;
        .al-zhaopian{
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>