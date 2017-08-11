// MEMB 테이블 데이터 처리
"use strict"

module.exports = {
  setConnection(conn) {
    this.connection = conn
  },
  selectOne(no, successFn, errorFn) { // 성공했을 때 호출될 함수, 실패했을 때 호출될 함수
    // alert(currPageNo + 1) // 0번째 태그의 콘텐츠만 가져옴, 콘텐츠 = 시작태그와 끝태그 사이에 있는 값
    this.connection.query(
      'select accounttype, email, id, mtype, name, mno \
      from memb \
      where mno = ?',
      [no],
      function (error, results) {
        if (error) {
          errorFn(error)
        } else {
          successFn(results[0])
        }
    }) // connection.query
  }, // selectOne
} // module












//
