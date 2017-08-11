// 학생 정보를 다루는 서비스를 정의한다.
const express = require('express')
const datasource = require('../util/datasource')
const memberDao = require('../dao/member-dao')
const memberService = require('../service/member-service')

const connection = datasource.getConnection()
memberDao.setConnection(connection)
memberService.setMemberDao(memberDao)

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
