const createError = require('http-errors')
const { Post } = require('../models');
const post = require('../models/post');
let data;

function convertPost(post) {
    post.user = {
      _id: post.user._id,
      name: post.user.name,
      user: post.user.user
    };

    return post;
}

exports.convertPost = convertPost;

exports.list = (req, res, next) => Promise.resolve()
  .then(() => Post.find({}).populate('user').populate('likes').populate('comments'))
  .then(data => data.map(convertPost))
  .then(data => res.json(data))
  .catch(err => {
    console.error(err)
    next(err)
  })

exports.add = (req, res, next) => Promise.resolve()
  .then(() => {
    req.body.user = req.user._id;
    return new Post(req.body).save()
  })
  .then((returnPost) => {
    returnPost.populate('user');
    returnPost.populate('likes');
    data = returnPost;
  })
  .then(() => res.json(convertPost(data)))
  .catch(err => {
    console.log("Erro ao criar post!")
    console.log(err)
    next(err)})

exports.show = (req, res, next) => Promise.resolve()
  .then(() => Post.findById(req.params.id).populate({
    path: 'comments'
  }))
  .then((data) => {
    if (data) {
      (req.accepts(['html', 'json']) === 'json')
        ? res.json(data)
        : res.render('posts/show', { post: data })
    } else {
      next(createError(404))
    }
  })
  .catch(err => { next(err)})

exports.save = (req, res, next) => Promise.resolve()
  .then(() => Post.findByIdAndUpdate(req.params.id, req.body.post, {
    runValidators: true
  }))
  .then((data) => {
    res.message('save post success!')
    res.redirect(`/v1/posts/${req.params.id}`)
  })
  .catch(err => 
    next(err)
  )

exports.delete = (req, res, next) => Promise.resolve()
  .then(() => Post.deleteOne({ _id: req.params.id }))
  .then(() => {
    res.message('delete post success!')
    res.redirect('/v1/posts')
  })
  .catch(err => next(err))

exports.edit = (req, res, next) => Promise.resolve()
  .then(() => Post.findById(req.params.id))
  .then((data) => {
    res.render('posts/edit', {
      post: data
    })
  })
  .catch(err => next(err))

exports.new = (req, res, next) => Promise.resolve()
  .then((data) => {
    res.render('posts/new', { post: new Post(res.locals.post) })
  })
  .catch(err => next(err))