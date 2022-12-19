const createError = require('http-errors')
const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { response } = require('express')

const ACCESS_TOKEN_SECRET = 'aaaaasd'

exports.create = (req, res, next) => {
  /*
  #swagger.description = 'Rota de criacao de usuario'

  #swagger.parameters['usuario'] = { 
    in: 'body', 
    '@schema': { 
        "required": ["name, password, user"], 
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

exports.getAll = (req, res, next) => {
  console.log('GET ALL CALLED');

  const transformUser = (user) => {
   return  {
      _id: user._id,
      user: user.user,
      name: user.name,
      following: user.following
   }
  }

  Promise.resolve()
    .then(() => User.find({}))
    .then(userList => userList.map(transformUser).filter(user => user._id.toString() != req.user._id.toString()))
    .then(response => res.json(response))
    .catch(err => {
      console.log(err);
      next(err);
    });
}

exports.login = (req, res, next) => {
 /*
  #swagger.description = 'Rota de login'

  #swagger.parameters['usuario'] = { 
    in: 'body', 
    '@schema': { 
        "required": ["user, password"], 
        "properties": { 
            "user": { 
              "type": "string", 
              "minLength": 2,  
              "description": "nick do usuario", 
              "example": "joaoteste" 
            } 
            "password": { 
                "type": "string", 
                "minLength": 2,  
                "description": "senha do usuario", 
                "example": "12345" 
            }
        }
    } 
  } 
*/

 const loginResolve = async () => {
    const user = await User.findOne({user: req.body.user}).populate('following');

    if(!user) {
      return next(createError(401));
    }

    if(!(await bcrypt.compare(req.body.password, user.password))) {
      return next(createError(402));
    }

    const accessToken = jwt.sign({ user: req.body.user }, ACCESS_TOKEN_SECRET);

    const responseUser = {
      _id: user._id,
      user: user.user,
      name: user.name,
      following: user.following
    };

    res.status(200).json({ 
      accessToken,
      user: responseUser
    })
 }

 Promise.resolve()
  .then(loginResolve)
  .catch(err => next(err))
}