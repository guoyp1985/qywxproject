<template>
  <div class="tags">
    <div class="tag" v-for="(tag, index) in tags" :key="tag.id">
      <img class="avatar" :src="tag.avatar"/>
      <div class="tag-info">
        <div class="info-top">
          <span class="username">{{tag.username}}</span>
          <div class="ope-btns">
            <div class="btn copy-btn"><span class="al"></span>复制</div>
            <div class="btn"><span class="al"></span>保存图片</div>
          </div>
        </div>
        <span class="content">{{tag.content}}</span>
        <div class="photos">
          <img class="photo" v-for="photo in tag.photosSplited" :key="photo.id"/>
        </div>
        <div class="info-bottom">
          <span class="time">{{tag.time}}</span>
          <span class="delete" v-if="userInfo.uid === teamInfo.uploader" @click="deleteTag(tag.id, index)">删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import ScrollView from '@/components/ScrollView'
import Env from 'env'
import Time from '#/time'
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
    },
    userInfo: {
      type: Object,
      default: null
    },
    teamInfo: {
      type: Object,
      default: null
    }
  },
  components: {
    ScrollView
  },
  methods: {
    getTags () {
      console.log('in listtags getTags')
      if (this.tags.length === this.pagestart * this.limit) {
        this.$http({
          url: `${Env.BokaApi}/api/team/link`,
          method: 'post',
          data: {
            teamid: this.id,
            module: 'teamsource',
            pagestart: this.pagestart,
            limit: this.limit
          }
        }).then(res => {
          console.log(res)
          let data = res.data
          for (let i = 0; i < data.data.length; i++) {
            data.data[i].photosSplited = data.data[i].photo.split(',')
            data.data[i].time = new Time(data.data[i].datelime * 1000).format()
          }
          if (data.flag) {
            if (this.pagestart === 0) {
              this.tags = data.data
            } else {
              this.tags.push(...data.data)
            }
          }
        })
      }
    },
    deleteTag (moduleid, index) {
      let _this = this
      _this.$vux.confirm.show({
        title: `确定删除该${this.moduleTransfer}吗？`,
        onConfirm () {
          _this.$http({
            url: `${Env.BokaApi}/api/team/band`,
            method: 'post',
            data: {
              type: 'del',
              module: 'teamsource',
              id: _this.id,
              moduleid: moduleid
            }
          }).then(res => {
            console.log(res)
            if (res.data.flag) {
              _this.tags.splice(index, 1)
            }
          })
        }
      })
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
      background-color: #fff;
      margin-bottom: 20px;
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
          align-items: center;
          .username{
            margin-right: 20px;
            font-size: 16px;
          }
          .ope-btns{
            font-size: 14px;
            display: flex;
            .btn{
              color: #cfcfcf;
              border-radius: 5px;
              background-color: transparent;
              border: 1px solid #cfcfcf;
              padding: 5px 8px;
              height: 16px;
              line-height: 16px;
              .al{
                font-size: 14px;
              }
            }
            .copy-btn{
              margin-right: 10px;
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
        .info-bottom{
          display: flex;
          font-size: 14px;
          .time{
            color: #868686;
          }
          .delete{
            margin-left: 10px;
            color: #85b8ea;
          }
        }
      }
    }
    .tag:first-child{
      border-top: none;
    }
    .tag:last-child{
      margin-bottom: 0;
    }
  }
</style>