const express = require('express');
const {getComments, createComment, deleteComment, patchComment} = require('../controllers/comment');
const {checkPost} = require('../controllers/post');
const router = express.Router();
const passport = require('passport');

router.get('/:postId', getComments);
router.post('/', passport.authenticate("jwt", { session: false }), checkPost, createComment);
router.delete('/:id', passport.authenticate("jwt", { session: false }),  deleteComment);
router.patch('/:id', passport.authenticate("jwt", { session: false }), patchComment);

module.exports = router;
