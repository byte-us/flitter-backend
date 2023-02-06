'use strict';

const express = require('express');
const Post = require('../../models/Post');

const router = express.Router();
const User = require('../../models/User')


// GET api/posts
// gets all the posts
router.get('/', async function (req, res, next) {
    try {
        const posts = await Post.getPosts();
        res.json({results : posts});
    } catch(err) {
        next(err)
    }   
})


// GET api/posts/:id
/* gets 1 post */
router.get('/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        res.json({results : post});
    } catch(err) {
        next(err)
    }   
})


// POST api/posts
router.post('/',async (req, res,next) => {
    try {
        const postData = req.body;
        const newPost = new Post(postData);
        const savePost = await newPost.save()
        res.json( { posts : savePost })
    } catch (err) {
        next(err)
    }
})


//DELETE api/posts/:id
/* deletes 1 post*/
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        if(!post) {
            return next(new Error(404))
        }
        await Post.deleteOne({_id: id});
        res.json();
        
    } catch (error) {
        next(error)
    }
})


//PUT api/posts/:id
/* updates a post */
router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const postBody = req.body;

        const updatedPost = await Post.findOneAndUpdate({_id:id}, postBody, {
            new: true
        });
        res.json({ post:updatedPost })
    } catch (error) {
        next(error)
    }
})

module.exports = router;