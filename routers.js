const express = require('express')

const {
  PostController,
  CommentController,
  LikeController,
} = require('./controllers')

const { getAll, follow } = require('./controllers/user-controller');

const router = express.Router()

router
  .route('/posts')
  .get(PostController.list)
  .post(PostController.add)
router
  .route('/posts/new')
  .get(PostController.new)
router
  .route('/posts/:id')
  .get(PostController.show)
  .put(PostController.save)
  .delete(PostController.delete)
router
  .route('/posts/:id/edit')
  .get(PostController.edit)

router
  .param('postId', CommentController.beforeAllById)
  .route('/:postId/comments')
  .get(CommentController.list)
  .post(CommentController.add)
router
  .route('/:postId/comments/new')
  .get(CommentController.new)
router
  .route('/:postId/comments/:id')
  .get(CommentController.show)
  .put(CommentController.save)
  .delete(CommentController.delete)
router
  .route('/:postId/comments/:id/edit')
  .get(CommentController.edit)

router
  .param('postId', LikeController.beforeAllById)
  .route('/:postId/likes')
  .post(LikeController.add)

router
  .route('/all/users')
  .get(getAll)

router
  .param('followId', (req, res, next, id) => {
    res.locals.followId = id,
    next();
  })
  .route('/:followId/follow')
  .post(follow)

router.use('/posts', router)

module.exports = router