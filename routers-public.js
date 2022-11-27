const express = require('express')

const {
  UserController
} = require('./controllers')

const router = express.Router()

router
  .route('/login')
  .post(UserController.login)

router
  .route('/users')
  .post(UserController.create)
module.exports = router
