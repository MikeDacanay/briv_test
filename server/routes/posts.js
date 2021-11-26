const express = require('express');
const {createPost, deletePost, getPosts, patchPost} = require('../controllers/post');
const router = express.Router();
const passport = require('passport');

router.get('/', getPosts);
router.post('/', passport.authenticate("jwt", { session: false }), createPost);
router.delete('/:id', passport.authenticate("jwt", { session: false }),  deletePost);
router.patch('/:id', passport.authenticate("jwt", { session: false }), patchPost);

module.exports = router;
