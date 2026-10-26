import express from 'express'
import {getPosts, getPost, createPost, updatePost, deletePost} from '../controllers/postController.js';
const router = express.Router();

let posts = [
    {id: 1, title: 'Post One'},
    {id: 2, title: 'Post Two'},
    {id: 3, title: 'Post Three'}
];


router.get('/', getPosts);

router.get('/:id', getPost);

router.post('/', createPost);

router.put('/:id', updatePost)

router.delete('/:id', deletePost)

export default router