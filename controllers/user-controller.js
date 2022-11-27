const createError = require('http-errors')
const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const ACCESS_TOKEN_SECRET = 'aaaaasd'

exports.create = (req, res, next) => { 
/*
  #swagger.description = 'Rota de criacao de usuario'

  #swagger.parameters['usuario'] = { 
    in: 'body', 
    '@schema': { 
        "required": ["user, password"], 
        "properties": { 
            "name": { 
                "type": "string", 
                "minLength": 2,
                "description": "nome do usuario",  
                "example": "joao teste" 
            },
            "password": { 
                "type": "string", 
                "minLength": 2,  
                "description": "senha do usuario", 
                "example": "12345" 
            },
             "user": { 
                "type": "string", 
                "minLength": 2,  
                "description": "nick do usuario", 
                "example": "joaoteste" 
            } 
        }
    } 
  } 
*/

Promise.resolve()
  .then(() => bcrypt.hash(req.body.password, 10))
  .then(passHashed => new User({...req.body, password: passHashed}).save())
  .then(data => res.status(201).json(data))
  .catch(err => next(err))
}

exports.login = (req, res, next) => Promise.resolve()
  .then(() => User.findOne({user: req.body.user}))
  .then(user => user ? bcrypt.compare(req.body.password, user.password) : next(createError(401)))
  .then(passHashed => passHashed ? jwt.sign(req.body.user, ACCESS_TOKEN_SECRET) : next(createError(407)))
  .then(accessToken => res.status(200).json({accessToken}))
  .catch(err => next(err))