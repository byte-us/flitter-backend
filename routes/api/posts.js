'use strict';

const express = require('express');
const Post = require('../../models/Post')
const router = express.Router();

// GET api/
router.get('/', async function (req, res, next) {
    try {
        const posts = await Post.getPosts();
        res.json({results : posts});
    } catch(err) {
        next(err)
    }   
})

// POST api/posts
router.post('/posts',async (req, res,next) => {
    try {
        const postBody = req.body;
        const newPost = new Post(postBody);
        const savePost = await newPost.save()
        res.json( { posts : savePost })
    } catch (err) {
        next(err)
    }
})

//

module.exports = router;