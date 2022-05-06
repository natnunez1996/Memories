import express from 'express';
import { commentPost, createPost, getPost, getPosts, getPostsBySearch, updatePost, deletePost, likePost } from '../controllers/post.js';
import auth from '../middleware/auth.js'

//Routes that calls a controller for callback function
const router = express.Router()

router.get('/search', getPostsBySearch)
router.get('/', getPosts)
router.get('/:id', getPost)

router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)
router.patch('/:id/commentPost', auth, commentPost)

// router.get('/search', getPostsBySearch)
// router.route('/').get(getPosts).post(auth, createPost)
// router.route('/:id').get(getPost).patch(auth, updatePost).delete(auth, deletePost)
// router.patch('/:id/likePost', auth, likePost)

export default router;
