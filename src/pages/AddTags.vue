<template>
  <div class="add-tags">
    <div class="input-box">
      <textarea class="font14" placeholder="说点什么吧..." maxlength="200" v-model="content"></textarea>
      <span class="count">{{count}} / 200</span>
    </div>
    <div class="photos">
      <div class="photo-wraper" v-for="(photo, index) in photos" :key="photo.id">
        <div class="photo">
          <div class="close" @click="delPhoto(index)">
            <i class="al al-guanbi font16"></i>
          </div>
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
      <button @click="submit">发布</button>
    </div>
  </div>
</template>

<script type="text/javascript">
import Env from 'env'
export default{
  created () {
    this.id = this.$route.query.id
  },
  activated () {
    this.content = ''
    this.photos = []
  },
  data () {
    return {
      max: 200,
      id: null,
      photos: [],
      content: '',
      count: 0
    }
  },
  watch: {
    content (newValue) {
      console.log(newValue)
      this.count = newValue.length
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
    },
    submit () {
      if (!this.content.length && !this.photos.length) {
        this.$vux.toast.show({
          text: '请输入内容!',
          type: 'warn'
        })
        return
      }
      this.$http({
        url: `${Env.BokaApi}/api/team/source`,
        method: 'post',
        data: {
          type: 'add',
          content: this.content,
          teamid: this.id,
          photo: this.photos.length > 0 ? this.photos.join(',') : ''
        }
      }).then(res => {
        console.log(res)
        if (res.data.flag) {
          this.$router.back()
        }
      })
    },
    delPhoto (index) {
      this.photos.splice(index, 1)
    }
  }
};
</script>

<style lang="less" scoped="">
.add-tags{
  position: relative;
  width: 100%;
  height: 100%;
  .close{
    position:absolute;top:-9px;right:-4px;z-index:10;
    width:25px;height:25px;border-radius:50%;background-color:#EC3E3F;color:#fff;
    display:flex;justify-content: center;align-items: center;
  }
  .input-box{
    position: relative;
    textarea{
      width: 100%;
      height: 200px;
      padding: 15px;
      box-sizing: border-box;
    }
    .count{
      position: absolute;
      right: 15px;
      bottom: 15px;
      color: #c9c9c9;
    }
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
        // .al-guanbi{
        //   position: absolute;
        //   top: -20px;
        //   right: -10px;
        //   font-weight: 700;
        //   color: #ff6a61;
        // }
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
