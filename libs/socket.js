import ENV from 'env'
let pool = {}
const Socket = {
  create: (room) => {
    let ws = pool[room]
    if (!ws) {
      ws = new WebSocket(ENV.SocketServer)
      pool[room] = ws
    }
    return ws
  },
  listening: (params, callback) => {
    const ws = Socket.create(params.room)
    if (!ws) {
      console.error('WS: ws not created')
      return
    }
    ws.onopen = () => {
      let linkman = params.linkman
      if (linkman) {
        linkman = linkman.replace(/"/g, '\\"')
      }
      const loginData = {
        type: 'login',
        uid: params.uid,
        client_name: linkman,
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
      Socket.destroy(params.room)
      Socket.listening(params, callback)
    }
    ws.onerror = () => {
      console.info('WS: Connecting Error')
      Socket.destroy(params.room)
      Socket.listening(params, callback)
    }
  },
  send: data => {
    const ws = pool[data.room_id]
    if (ws) {
      data.room_id = `${ENV.SocketBokaRoom}-${data.room_id}`
      ws.send(JSON.stringify(data))
    }
  },
  destory: room => {
    pool[room] = null
  }
}

export default Socket
