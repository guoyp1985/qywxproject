import ENV from 'env'
let pool = {}
const Socket = {
<<<<<<< HEAD
  create: () => ws = (ws ? ws : new WebSocket(ENV.SocketServer)),
  listening: (room, uid, linkman, callback) => {
=======
  create: (room) => {
    let ws = pool[room]
>>>>>>> 749b593bdbc8015aa18688130d8a25d32ed93a1e
    if (!ws) {
      ws = new WebSocket(ENV.SocketApi)
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
<<<<<<< HEAD
    data.room_id = `${ENV.SocketBokaRoom}-${data.room_id}`
    ws && ws.send(JSON.stringify(data))
  },
  destory: room => {
    Socket.send({
      type: 'logout',
      room_id: room
    })
=======
    const ws = pool[data.room_id]
    if (ws) {
      data.room_id = `${ENV.SocketBokaApi}-${data.room_id}`
      ws.send(JSON.stringify(data))
    }
>>>>>>> 749b593bdbc8015aa18688130d8a25d32ed93a1e
  }
  // destory: room => {
  //   Socket.send({
  //     type: 'logout',
  //     room_id: room
  //   })
  // }
}

export default Socket
