"use strict"

module.exports = {
  setMemberDao(dao) {
    this.memberDao = dao
  },

  setTrainerDao(dao) {
    this.trainerDao = dao
  },

  get(no, success, error) {
    this.studentDao.selectOne(no, success, error)
  } // list
