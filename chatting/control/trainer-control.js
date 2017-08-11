// 학생 정보를 다루는 서비스를 정의한다.
const express = require('express')
const datasource = require('../util/datasource')
const trainerDao = require('../dao/trainer-dao')
const memberDao = require('../dao/member-dao')
const studentService = require('../service/trainer-service')

const connection = datasource.getConnection()
trainerDao.setConnection(connection)
memberDao.setConnection(connection)
trainerService.setTrainerDao(trainerDao)
trainerService.setMemberDao(memberDao)

const router = express.Router()

router.get('/get.json', (request, response) => {
  var no = location.href.split('?')[1].split('=')[1];
  memberService.get(no, function(result) {
    response.json(result)
  }, function(error) {
    response.status(200)
            .set('Content-Type', 'text/plain;charset=UTF-8')
            .end('error')
    console.log(error)
  })
})

module.exports = router
