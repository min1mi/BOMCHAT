"use strict"

module.exports = {
  setAlertDao(dao) {
    this.alertDao = dao
  },

  get(no, success, error) {
    var obj = this
      this.alertDao.get(no, function(results) {
       success(results)
     }, error)
  }, // get
  add(type, othername, mymno, kinds, success, error) {
    var obj = this
      this.alertDao.add(type, othername, mymno, kinds, function(results) {
        success(results)
      })
  }
} // module