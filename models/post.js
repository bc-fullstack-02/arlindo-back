const { Schema, model } = require('mongoose')
const Redact = require('./redact')

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, 'titulo obrigatorio'],
    minLength: [2, 'titulo no minimo 2']
  },
  description: {
    type: String,
    required: [true, 'descricao obrigatoria'],
    validate: { // bonus track
      validator: (val) => Redact
        .count({ term: val })
        .then(count => count === 0),
      message: 'nao pode usar a palavra {VALUE}'
    },
  },
  img: {
    type: Schema.Types.String,
    ref: 'Image'
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Like'
  }]
})

module.exports = model('Post', postSchema)