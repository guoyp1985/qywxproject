<template>
  <div class="add-tags">
    <div class="input-box">
      <group>
        <x-textarea placeholder="说点什么吧..." :max="max" v-model="content"></x-textarea>
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
    <div class="submit-btn">
      <button>发布</button>
    </div>
  </div>
</template>

<script type="text/javascript">
import { Group, XTextarea } from 'vux'
export default{
  components: {
    Group, XTextarea
  },
  data () {
    return {
      max: 200,
      id: null,
      photos: []
    }
  },
  methods: {
    onChooseImage () {
      if (this.$util.isPC()) {
        console.log('现在是pc端')
      } else {
        this.$wechat.ready(() => {
          this.$util.wxUploadImage({
            maxnum: 9 - this.photos.length,
            handleCallback: (data) => {
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
  position: relative;
  width: 100vw;
  height: 100vh;
  .weui-cells,.vux-no-group-title{
    margin-top: 0 !important;
  }
  .photos{
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    box-sizing: border-box;
    justify-content: flex-start;
    .photo-wraper{
      width: 30%;
      height: 0;
      padding-top: 30%;
      position: relative;
      margin-bottom: 10px;
      .photo{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
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
    .photo-wraper:nth-child(3n+2) {
      margin-left: 5%;
      margin-right: 5%;
    }
  }
  .submit-btn{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    button{
      width: 80%;
      color: #fff;
      border-radius: 10px;
      background-color: #ff6a61;
      border: none;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
}
</style>
