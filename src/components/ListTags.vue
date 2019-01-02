<template>
  <!-- <scroll-view :data="tags" ref="wraper" @scrollEnd="scrollEnd">
    <div class="tags" slot="content" ref="content">
      <div class="tag" v-for="tag in tags" :key="tag.id">
        <img class="avatar" :src="tag.avatar"/>
        <div class="tag-info">
          <div class="info-top">
            <span class="username">{{tag.username}}</span>
            <div class="ope-btns">
              <button class="copy-btn"><span class="al al-"></span>复制</button>
              <button class="download-btn"><span class="al al-">保存图片</span></button>
            </div>
          </div>
          <span class="content">{{tag.content}}</span>
          <div class="photos">
            <img class="photo" v-for="photo in tag.photos" :key="photo.id"/>
          </div>
          <span class="time">{{tag.time}}</span>
        </div>
      </div>
    </div>
  </scroll-view> -->
  <div class="tags">000000</div>
</template>

<script type="text/javascript">
import ScrollView from '@/components/ScrollView'
import Env from 'env'
// import Time from '#/time'
export default {
  data () {
    return {
      tags: [],
      module: '',
      pagestart: 0,
      limit: 5
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  components: {
    ScrollView
  },
  methods: {
    getTags () {
      if (this.tags.length === this.pagestart * this.limit) {
        this.$http({
          url: `${Env.BokaApi}/api/community/getList`,
          method: 'post',
          data: {
            // teamid: this.id,
            // module: this.module,
            pagestart: this.pagestart,
            limit: this.limit
          }
        })
      }
    },
    scrollEnd () {
      console.log('......')
    }
  }
};
</script>

<style lang="less" scoped="">
  .tags{
    .tag{
      display: flex;
      align-items: flex-start;
      width: 100vw;
      padding: 20px;
      box-sizing: border-box;
      border-top: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      .avatar{
        width: 50px;
        height: 50px;
        margin-right: 20px;
      }
      .tag-info{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        color: #000;
        .info-top{
          display: flex;
          margin-bottom: 10px;
          .username{
            margin-right: 20px;
            font-size: 16px;
            .ope-btns{
              font-size: 14px;
              button{
                color: #cfcfcf;
                border-radius: 5px;
              }
            }
          }
        }
        .content{
          font-size: 14px;
          margin-bottom: 10px;
        }
        .photos{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .time{
          color: #868686;
        }
      }
    }
  }
</style>