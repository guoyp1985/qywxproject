/*
* @description: 评论组件
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div class="comment">
    <div class="avatar-cell">
      <x-img :src="item.avatar" container="#vux_view_box_body"></x-img>
    </div>
    <div class="detail-cell">
      <div class="header-area">
        <div class="name-cell">
          {{item.username}}
        </div>
        <div class="digg-cell color-gray">
          <a @click="diggClick(item.dig)">
            <span class="digicon"></span>
            <span class="digg-count">{{item.dig}}</span>
          </a>
        </div>
      </div>
      <div class="comment-content" v-html="item.message"></div>
      <div class="date-area">
        <div class="date-cell">
          {{item.dateline | dateFormat}}
        </div>
        <div class="btns-cell">
          <a v-if="params.uploader == item.uid" @click="onReply">{{$t('Reply')}}</a>
          <!-- <a v-if="uid === item.authority" @click="onReview">{{$t('Review')}}</a> -->
          <a v-if="params.uid == item.uid" @click="onDelete">{{$t('Delete')}}</a>
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
          userAvatar: '../assets/_images/nopic.jpg',
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
  computed: {
  },
  filters: {
    dateFormat (date) {
      return new Time(date * 1000).format()
    }
  },
  methods: {
    onReply () {
      this.$emit('on-reply')
    },
    onReview () {
      this.$emit('on-review')
    },
    onDelete () {
      this.$emit('on-delete')
    },
    diggClick () {

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
