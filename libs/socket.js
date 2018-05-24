import ENV from 'env'
let ws = null
const Socket = {
  create: () => ws = (ws ? ws : new WebSocket(ENV.SocketApi)),
  listening: (room, uid, linkman, callback) => {
    const roomId = `${ENV.SocketBokaApi}-news-${room}`
    if (!ws) {
      console.error('WS: ws undefined')
      return
    }
    ws.onopen = function () {
      let loginData = {
        type: 'login',
        uid: uid,
        client_name: linkman.replace(/"/g, '\\"'),
        room_id: roomId
      }
      ws.send(JSON.stringify(loginData))
    }
    ws.onmessage = function (e) {
      const data = JSON.parse(e.data)
      if (data.type === 'login') {
        console.info('WS: Login')
      } else if (data.type === 'logout') {
        console.info('WS: Logout')
      } else if (data.type === 'say') {
        console.info('WS: Receive Message')
        const message = JSON.parse(e.data)
        let content = message.content
        if (content) {
          content = content.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, '\'')
        }
        const sendMessage = {
          uid: message.from_uid,
          content: content,
          dateline: message.time,
          msgtype: message.msgtype ? message.msgtype : 'text',
          picurl: message.picurl ? message.picurl : '',
          thumb: message.thumb ? message.thumb : '',
          username: message.from_client_name,
          id: message.msgid,
          roomid: message.room_id,
          avatar: message.avatar,
          newsdata: message.newsdata
        }
        callback && callback(sendMessage)
      }
    }
    ws.onclose = function () {
      console.info('WS: Closed')
      self.wsConnect()
    }
    ws.onerror = function () {
      console.info('WS: Connecting Error')
    }
  },
  destory: () => {
    ws.send(JSON.stringify({
      type: 'logout',
      room_id: room
    }))
    ws = null
  }
}

export default Socket
