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
  console.log("2222222")
  response.setHeader("Access-Control-Allow-Origin", "*")
  var no = request.body.no
  console.log(no)
   alertService.get(no, function(result) {
     response.json(result)
 }, function(error) {
     response.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
             .end('error')
     console.log(error)
   })
})

module.exports = router
