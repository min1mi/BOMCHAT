"use strict"

module.exports = {
  setConnection(conn) {
    this.connection = conn // 변수를 알아서 만들어준다.
  },

  get(no, successFn, errorFn) {
    this.connection.query(
      'select a.alno, a.othername, a.mymno, \
      a.kinds, a.date, a.confirm, a.type, m.name, m.img \
      from alert a inner join memb m on a.othermno = m.mno\
      where a.mymno = ?',
      [no],
      function (error, result) {
        if (error) {
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  },
  add(type, othername, mymno, kinds, successFn, errorFn) {
    this.connection.query(
      'insert into alert(othername, mymno, kinds, date, \
      confirm, type) values(?,?,?,now(),0,?)',
      [othername, mymno, kinds, type],
      function (error, result) {
        if (error) {
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  },
  delete(no, successFn, errorFn) {
    this.connection.query(
      'delete from alert where alno = ?',
      [no],
      function (error, result) {
        if (error) {
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  }
} // module









//
