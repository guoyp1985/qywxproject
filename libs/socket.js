import ENV from 'env'
let ws = null
const Socket = {
  create: () => ws = new WebSocket(ENV.SocketApi),
  listening: (params, callback) => {
    if (!ws) {
      console.error('WS: ws undefined')
      return
    }
    ws.onopen = () => {
      const loginData = {
        type: 'login',
        uid: params.uid,
        client_name: params.linkman.replace(/"/g, '\\"'),
        room_id: params.room,
        frommodule: params.fromModule,
        fromid: params.fromId
      }
      console.log(params)
      Socket.send(loginData)
    }
    ws.onmessage = e => {
      const data = JSON.parse(e.data)
      if (data.type === 'login') {
        console.info(`WS: Login Room ${params.room}`)
      } else if (data.type === 'logout') {
        console.info(`WS: Logout Room ${params.room}`)
        // ws.onopen = null
        // ws.onmessage = null
        // ws.onclose = null
        // ws.onerror = null
        Socket.listening(params, callback)
      } else if (data.type === 'say') {
        console.info(`WS: Receive Message From Room ${params.room}`)
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
      Socket.listening(params, callback)
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
  }
}

export default Socket
