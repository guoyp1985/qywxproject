import ENV from 'env'
let ws = null
const Socket = {
  create: () => ws = (ws ? ws : new WebSocket(ENV.SocketApi)),
  listening: (room, uid, linkman, callback) => {
    const roomId = `${ENV.SocketBokaApi}-${room}`
    if (!ws) {
      console.error('WS: ws undefined')
      return
    }
    ws.onopen = () => {
      const loginData = {
        type: 'login',
        uid: uid,
        client_name: linkman.replace(/"/g, '\\"'),
        room_id: roomId
      }
      Socket.send(loginData)
    }
    ws.onmessage = e => {
      const data = JSON.parse(e.data)
      console.log(data)
      if (data.type === 'login') {
        console.info(`WS: Login Room ${roomId}`)
      } else if (data.type === 'logout') {
        console.info(`WS: Logout Room ${roomId}`)
      } else if (data.type === 'say') {
        console.info(`WS: Receive Message From Room ${roomId}`)
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
    ws.onclose = () => {
      console.info('WS: Closed')
      Socket.listening(room, uid, linkman, callback)
    }
    ws.onerror = () => {
      console.info('WS: Connecting Error')
    }
  },
  send: data => {
    data.room_id = `${ENV.SocketBokaApi}-${data.room_id}`
    ws && ws.send(JSON.stringify(data))
  },
  destory: room => {
    Socket.send({
      type: 'logout',
      room_id: room
    })
    ws.onopen = null
    ws.onmessage = null
    ws.onclose = null
    ws.onerror = null
    ws = null
  }
}

export default Socket
