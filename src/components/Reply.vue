<template>
  <div class="reply">
    <div class="header-area">
      <div class="name-cell">
        {{item.userName}} {{$t('Reply')}}
      </div>
      <div class="digg-cell color-gray">
        <a @click="diggClick(item.diggUrl)">
          <span class="digicon"></span>
          <span class="digg-count">{{item.diggCount}}</span>
        </a>
      </div>
    </div>
    <div class="reply-content">
      {{item.content}}
    </div>
    <div class="date-area">
      <div class="date-cell">
        {{item.date | dateFormat}}
      </div>
      <div class="btns-cell">
        <a v-if="item.authority>2" @click="onReview">{{$t('Review')}}</a>
        <a v-if="item.authority>2" @click="onDelete">{{$t('Delete')}}</a>
      </div>
    </div>
  </div>
</template>
<i18n>
</i18n>
<script>
import Time from '../../libs/time'
export default {
  name: 'Reply',
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          userName: 'unkown',
          date: 1522659301220,
          diggCount: 0,
          content: '我是内容'
        }
      }
    }
  },
  filters: {
    dateFormat (date) {
      return new Time(date).format()
    }
  },
  methods: {
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
.reply {
  padding-top: 8px;
  padding-left: 6px;
}
.reply:first-of-type {
  position: relative;
}
.reply:first-of-type:before {
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #dadada;
}
.reply .header-area {
  display: flex;
}
.reply .name-cell {
  flex: 1;
  color: #999999;
  position: relative;
}
.reply .name-cell:before {
  content: ' ';
  position: absolute;
  left: -6px;
  top: 5px;
  bottom: 5px;
  width: 3px;
  border-left: 3px solid #1aad19;
}
.reply .detail-cell .digg-cell {
  width: 100px;
  text-align: right;
}
.reply .detail-cell .reply-content {
  padding-right: 10px;
  word-break: break-word;
}
.reply .detail-cell .date-area {
  padding: 1.5px 0;
  font-size: 11px !important;
  color: #c7c7c7;
}
.reply .date-area {
  display: flex;
}
.reply .date-area .btns-cell {
  text-align: right;
  flex: 1;
}
.reply .date-area .btns-cell a{
  padding: 0 5px;
  color: #999999;
}
.reply .date-area .date-cell {
  width: 150px;
}
</style>
