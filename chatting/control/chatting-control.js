const express = require('express')
const datasource = require('../util/datasource')
// const trainerDao = require('../dao/chatDao')
// const chatService = require('../service/chat-service')
const connection = datasource.getConnection()
// chatDao.setConnection(connection)
// chatService.setChatDao(chatDao)

var clients = [];

const router = express.Router()


router.ws('/chat.json', function(ws, req) {
  console.log('router.ws 콜백함수 실행됨')
  var myMap = new Map;
  clients.push(myMap)
  console.log('client connected')


  ws.on('message', function(value) {
    // ws.send('서버에서 보냈어!' + msg);
    console.log(value)
    var obj = JSON.parse(value),
      msg = obj.message

    if (!myMap.has('user')) {
      var you = obj.you,
        me = obj.me,
        isTrainer = obj.isTrainer

        console.log(you)
        console.log(me)
      myMap.set('user', me)
      myMap.set('ws', ws)
      myMap.set('opponent', you)
      myMap.set('isTrainer', (isTrainer == 'Y' ? true : false))

      console.log('새로운 유저!\n유저 넘버: ' + myMap.get('user') +
        ', wsID: ' + myMap.get('ws')._socket._handle.fd +
        ', 상대방 넘버: ' + myMap.get('opponent'));

      setCommunicator(myMap)
      return;
    }

    if (myMap.has('oppMap')) {
      var data = JSON.stringify({
        'message': msg,
        'sender': 'you'
      })
      broadcast(myMap, data)
    }

    // if(myMap.get('isMusician')) addMusiChat(myMap, msg)
    // else addChat(myMap, msg)
  })



ws.on('close', function(user) {
  client.splice(client.indexof(client), 1)
  console.log('client disconnected')
})

ws.on('error', function(user) {
user.splice(user.indexof(client), 1)
console.log('error')
})
});

// function addTrainerChat(myMap, msg) {
//   chatService.insert({
//     'mno' : myMap.get('opponent'),
//     'muno' : myMap.get('user'),
//     'msg' : msg,
//     'date' : now,
//     'who' : myMap.get('user')
//   }, function(result) {
//     var data = {
//       'message': msg,
//       'sender': 'me'
//     }
//     myMap.get('ws').send(JSON.stringify(data));
//   }, function(error) {
//     console.log(error)
//   })//chatService.insert()
// } //addChat()

function setCommunicator(myMap) {
  var oppMap;
  for (var i = 0; i < clients.length; i++) {
    oppMap = clients[i]
    if ((oppMap.get('opponent') == myMap.get('user')) && (oppMap.get('user') == myMap.get('opponent'))) {
      console.log('상대도 온라인 상태');
      myMap.set('oppMap', oppMap)
      oppMap.set('oppMap', myMap)
      return;
    }
    console.log('상대는 오프라인');
  } //for()
} //broadcast()

function broadcast(myMap, data) {
  console.log('브로드 캐스트 => ' + myMap.get('opponent') + ', wsID: ' + myMap.get('oppMap').get('ws')._socket._handle.fd);
  myMap.get('oppMap').get('ws').send(data)
}

module.exports = router









//
