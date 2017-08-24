// 학생 정보를 다루는 서비스를 정의한다.
const express = require('express')
const datasource = require('../util/datasource')
const alertDao = require('../dao/alertDao')
const alertService = require('../service/alertService')

const connection = datasource.getConnection()
alertDao.setConnection(connection)
alertService.setAlertDao(alertDao)

const router = express.Router()

router.post('/get.json', (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*")
  var no = request.body.no
   alertService.get(no, function(result) {
     console.log(no)
     var arr = new Array()
     var obj = {}
     for(var i=0; i < result.length; i++) {
       if(result[i].pm == "PM")
        result[i].pm = "오후"
       else if(result[i].pm == "AM")
        result[i].pm = "오전"
        obj.alno = result[i].alno
        obj.confirm = result[i].confirm
        obj.date = result[i].date
        obj.img = result[i].img
        obj.kinds = result[i].kinds
        obj.mymno = result[i].mymno
        obj.othername = result[i].othername
        obj.pm = result[i].pm
        obj.time = result[i].time
        obj.type = result[i].type
        arr.push(obj)
     }
     response.json(arr)
 }, function(error) {
     response.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
             .end('error')
     console.log(error)
   })
})

router.post('/add.json', (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*")
  console.log('애드들어옴')
  var type = request.body.type
  var othermno = request.body.othermno
  var othername = request.body.othername
  var mymno = request.body.mymno
  var kinds = request.body.kinds
  console.log(type, othername, mymno,kinds, othermno)
  alertService.add(type, othername, mymno, kinds, othermno, function(result) {
    response.json(result)
  }, function(error) {
    response.status(200)
           .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
    console.log(error)
  })
})

router.post('/delete.json', (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*")
  console.log('삭제 들어옴')
  var no = request.body.no

  alertService.delete(no, function(result) {
    response.json(result)
  }, function(error) {
    response.status(200)
           .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
    console.log(error)
  })
})

module.exports = router
