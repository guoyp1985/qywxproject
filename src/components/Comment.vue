/*
* @description: 评论组件
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div class="comment">
    <div class="avatar-cell">
      <img :src="item.avatar" default-src="https://tossharingsales.boka.cn/images/user.jpg" @on-error="imgError('avatar')" />
      <!--
      <img  :src="item.avatar" onerror="javascript:this.src='https://tossharingsales.boka.cn/images/nopic.jpg';"/>
    -->
    </div>
    <div class="detail-cell">
      <div class="header-area">
        <div class="name-cell">
          {{item.username}}
        </div>
        <div class="digg-cell color-gray" @click="diggClick(item)">
          <span :class="`digicon ${item.isdig ? 'diged' : ''}`"></span>
          <span class="digg-count">{{item.dig}}</span>
        </div>
      </div>
      <div class="comment-content" v-html="filterEmot(item.message)"></div>
      <div class="date-area">
        <div class="date-cell">
          {{item.dateline | dateFormat}}
        </div>
        <div class="btns-cell" style="width:105px;" v-if="params.uploader == params.uid">
          <div class="qbtn bg-orange color-white w50 font12" style="padding:5px 0;" @click="onReply">{{$t('Reply')}}</div>
          <div class="qbtn bg-red color-white w50 font12" v-if="params.uploader == params.commentuid" style="padding:5px 0;" @click="onDelete">{{$t('Delete')}}</div>
        </div>
      </div>
      <div class="reply-area">
        <slot name="replies"></slot>
      </div>
    </div>
  </div>
</template>

<i18n>
</i18n>

<script>
import { XImg } from 'vux'
import ENV from 'env'
import Time from '#/time'

export default {
  name: 'Comment',
  components: {
    XImg
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          userAvatar: 'https://tossharingsales.boka.cn/images/nopic.jpg',
          userName: 'unkown',
          date: 1522659301220,
          diggCount: 0,
          content: '我是内容',
          replies: []
        }
      }
    },
    params: Object
  },
  filters: {
    dateFormat (date) {
      return new Time(date * 1000).format()
    }
  },
  methods: {
    filterEmot (text) {
      return this.$util.emotPrase(text)
    },
    onReply () {
      this.$emit('on-reply')
    },
    onReview () {
      this.$emit('on-review')
    },
    onDelete () {
      this.$emit('on-delete')
    },
    diggClick (item) {
      const self = this
      let url = `${ENV.BokaApi}/api/user/digs/add`
      if (item.isdig) {
        url = `${ENV.BokaApi}/api/user/digs/delete`
      }
      self.$vux.loading.show()
      self.$http.post(url, {
        id: item.id,
        module: 'comments'
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        if (data.flag === 1) {
          if (item.isdig) {
            item.isdig = 0
            item.dig = item.dig - 1
          } else {
            item.isdig = 1
            item.dig = item.dig + 1
          }
        } else {
          self.$vux.toast.show({
            text: data.error,
            type: 'warning',
            time: self.$util.delay(data.error)
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.comment {
  display: flex;
  margin-top: 8px;
}
.comment .avatar-cell img {
  width: 32px;
  height: 32px;
}
.comment .detail-cell {
  flex: 1;
  font-size: 14px;
  margin-left: 10px;
}
.comment .detail-cell .header-area {
  display: flex;
}
.comment .detail-cell .name-cell {
  flex: 1;
  color: #999999;
}
.comment .detail-cell .digg-cell {
  width: 100px;
  text-align: right;
}
.comment .detail-cell .comment-content {
  padding-right: 10px;
  word-break: break-word;
}
.comment .detail-cell .date-area {
  padding: 1.5px 0;
  font-size: 11px !important;
  color: #c7c7c7;
  margin-bottom: 4px;
}
.comment .date-area {
  display: flex;
}
.comment .date-area .btns-cell {
  text-align: right;
}
.comment .date-area .btns-cell a{
  padding: 0 5px;
  color: #999999;
}
.comment .date-area .date-cell {
  width: 150px;
}
.comment .date-area .btns-cell {
  flex: 1;
}
</style>
