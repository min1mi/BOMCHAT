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
  } // list
} // module
