import ENV from 'env'
let ws = null
const Socket = {
  create: () => ws = (ws ? ws : new WebSocket(ENV.SocketServer)),
  listening: (room, uid, linkman, callback) => {
    if (!ws) {
      console.error('WS: ws undefined')
      return
    }
    ws.onopen = () => {
      const loginData = {
        type: 'login',
        uid: uid,
        client_name: linkman.replace(/"/g, '\\"'),
        room_id: room
      }
      Socket.send(loginData)
    }
    ws.onmessage = e => {
      const data = JSON.parse(e.data)
      if (data.type === 'login') {
        console.info(`WS: Login Room ${room}`)
      } else if (data.type === 'logout') {
        console.info(`WS: Logout Room ${room}`)
        // ws.onopen = null
        // ws.onmessage = null
        // ws.onclose = null
        // ws.onerror = null
        ws = null
      } else if (data.type === 'say') {
        console.info(`WS: Receive Message From Room ${room}`)
        const message = JSON.parse(e.data)
        // let content = message.content
        // if (content) {
        message.content = message.content.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, '\'')
        // }
        const sendMessage = {
          uid: message.from_uid,
          // content: content,
          dateline: message.time,
          // msgtype: message.msgtype ? message.msgtype : 'text',
          // picurl: message.picurl ? message.picurl : '',
          // thumb: message.thumb ? message.thumb : '',
          username: message.from_client_name,
          id: message.messageid,
          roomid: message.room_id,
          ...message
          // avatar: message.avatar,
          // newsdata: message.newsdata,
          // mediaid: message.mediaid
        }
        callback && callback(sendMessage)
      }
    }
    ws.onclose = () => {
      console.info('WS: Closed')
      Socket.listening(room, uid, linkman, callback)
    }
    ws.onerror = () => {
      console.info('WS: Connecting Error')
    }
  },
  send: data => {
    data.room_id = `${ENV.SocketBokaRoom}-${data.room_id}`
    ws && ws.send(JSON.stringify(data))
  },
  destory: room => {
    Socket.send({
      type: 'logout',
      room_id: room
    })
  }
}

export default Socket
