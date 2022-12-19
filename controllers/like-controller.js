const createError = require('http-errors')
const { Like, Post } = require('../models')
const { convertPost } = require('./post-controller')

module.exports = {
  beforeAllById: (req, res, next, id) => Promise.resolve()
  .then(() => {
    res.locals.post = { id }
    // console.log(`Request post id : ${id}`)
    next()
  })
  .catch(err => next(err)),
  
  add: (req, res, next) => {
    
    const likeResolve = async () => {
      const postId = res.locals.post.id;
      const userId = req.user._id;
      
      const post = await Post.findById(postId)
        .populate('user')
        .populate('likes');

      if(!post) {
        return next(createError(404));
      }

      const likeExists = await Like.findOne({ user: userId, post: postId });

      console.log("LIKE EXISTS: ", likeExists)

      if(likeExists) {
        const idString = likeExists._id.toString();
        
        const likes = post.likes
          .map(like => like._id.toString())
          .filter(likeId => likeId != idString);
        
        await Like.deleteOne({ _id: likeExists._id });
        
        const postResponse = await Post.findByIdAndUpdate(postId, { ...post, likes })
          .populate('user')
          .populate('likes');

        res.message('like removed with success!');
        res.json(convertPost(postResponse));
        return;
      }
     
      const likeBody = new Like({ post: postId, user: userId });

      const like = await likeBody.save()

      console.log('Like saved: ', like);
      
      post.likes.push(like)
      
      await post.save();

      res.message('add like success!');
      res.json(convertPost(post));
    }

    Promise.resolve()
      .then(likeResolve)
      .catch(err => next(err))

    // Promise.resolve()
    //   .then(() => new Like(Object.assign(req.body.like, { post: res.locals.post.id, user: req.user._id })).save())
    //   .then((like) =>
    //     Post.findById(like.post)
    //     .then(post => Object.assign(post, { likes: [...post.likes, like._id] }))
    //     .then(post => Post.findByIdAndUpdate(like.post, post))
    //     .then(() => like) 
    //   )
    //   .then((data) => {
    //     res.message('add like success!')
    //     res.json(data)
    //   })
    //   .catch(err =>{ 
    //     next(err)
    //   })
  }
}
