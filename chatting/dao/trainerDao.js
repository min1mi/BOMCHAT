"use strict"

module.exports = {
  setConnection(conn) {
    this.connection = conn // 변수를 알아서 만들어준다.
  },
  selectOne(no, successFn, errorFn) {
    this.connection.query(
      'select  m.mno,t.tno, m.name, m.mtype, \
              t.company, t.zipcode, t.comaddr, t.comdetailaddr, \
              t.spono, t.introduction, t.img \
      from tcher t inner join memb m on t.tno = m.mno \
      where t.tno = ?', [no],
      function(error, results) {
        if (error) {
          errorFn(error)
        } else {
          successFn(results[0]) // select가 한개라서 0번으로 호출
        }
      }) // connection.query
  } // selectOneStudent
} // module









//
