"use strict"

module.exports = {
  setConnection(conn) {
    this.connection = conn // 변수를 알아서 만들어준다.
  },
  // selectUser : function(memberNo, trainerNo, successFn, errorFn) {
  //   this.connection.query(
  //     'select '
  //   )
  // },

  insert: function(chat, successFn, errorFn) {
    this.connection.query(
      'insert into chat(tno, mno, confirm, msg, date, whosend) \
      values(?, ?, ?, ?, ?, ?)',
      [chat.tno, chat.mno, chat.confirm, chat.msg, chat.date, chat.who],

      function(error, result) {
        if (error) {
          errorFn(error)

        } else {
          successFn(result)

        }
      }) //connection.query()
  }, // insert()

  update: function(memberNo, trainerNo, successFn, errorFn) {
    this.connection.query(
      "update chat set confirm = 'Y' \
      where mno=? and tno=? and confirm = 'N'",
      [memberNo, trainerNo],

      function(error, result) {
        if (error) {
          errorFn(error)

        } else {
          successFn(result)

        }
      }) //connection.query()
  } //update()
} // module









//
