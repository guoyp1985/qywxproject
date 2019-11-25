/*
* @description: 回复组件
* @auther: simon
* @created_date: 2018-4-20
*/
<template>
  <div class="reply">
    <div class="header-area">
      <div class="name-cell" @click="testclick">
        <span class="color-orange mr5">{{item.username}}</span><span>{{$t('Reply')}}</span>
      </div>
      <!--
      <div class="digg-cell color-gray" @click="diggClick('comment',item.id,item)">
        <span class="digicon"></span>
        <span class="digg-count">{{item.diggCount}}</span>
      </div>
    -->
    </div>
    <div class="reply-content" v-html="filterEmot(item.message)"></div>
    <div class="date-area">
      <div class="date-cell">
        {{item.dateline | dateFormat}}
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
import Time from '#/time'
import ENV from 'env'
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
      return new Time(date * 1000).format()
    }
  },
  watch: {
    item: function () {
      return this.item
    }
  },
  methods: {
    filterEmot (text) {
      return this.$util.emotPrase(text)
    },
    onReview () {
      this.$emit('on-review')
    },
    onDelete () {
      this.$emit('on-delete')
    },
    testclick () {
      console.log('test click')
    },
    diggClick (digmodule, digid, data) {
      console.log('in click')
      const self = this
      let url = `${ENV.BokaApi}/api/user/digs/add`
      if (self.digStatus && self.$util.trim(self.digStatus) !== '') {
        url = `${ENV.BokaApi}/api/user/digs/delete`
      }
      self.$vux.loading.show()
      self.$http.post(url, {
        id: digid,
        module: digmodule
      }).then(function (res) {
        let data = res.data
        self.$vux.loading.hide()
        if (data.flag === 1) {
          if (data.digStatus === 'diged') {
            if (digmodule === 'news') {
              self.digStatus = ''
            }
            delete data.digStatus
            data.dig = self.article.dig - 1
          } else {
            if (digmodule === 'news') {
              self.digStatus = 'diged'
            }
            data.digStatus = 'diged'
            data.dig = self.article.dig + 1
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
