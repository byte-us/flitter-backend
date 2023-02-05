'use strict';

const express = require('express');
const Content = require('../../models/Content');
const router = express.Router();

// GET api/
router.get('/', async function (req, res, next) {
    try {
        const posts = await Content.getPosts();
        res.json({results : posts});
    } catch(err) {
        next(err)
    }   
})

// POST api/posts
router.post('/posts',async (req, res,next) => {
    try {
        const postBody = req.body;
        const newPost = new Content(postBody);
        const savePost = await newPost.save()
        res.json( { posts : savePost })
    } catch (err) {
        next(err)
    }
})

//

module.exports = router;