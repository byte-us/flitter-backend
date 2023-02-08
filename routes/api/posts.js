'use strict';

const express = require('express');
const Post = require('../../models/Post');

const router = express.Router();


// GET api/posts?skip=2&limit=7&sort=-time
/* gets all the posts */
router.get('/', async function (req, res, next) {
    try {
        const skip = req.query.skip || 0;
        const limit = req.query.limit || 10;
        const sort = req.query.sort 
        const posts = await Post.getPosts( skip, limit, sort);

        res.json({ posts});
    } catch(error) {
        next(error)
    }   
})


// GET api/posts/:id
/* gets 1 post */
router.get('/:id', async (req, res, next)=> {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        res.json({results : post});
    } catch(error) {
        next(error)
    }   
})


// POST api/posts
/* creates a new post */
router.post('/newpost',async (req, res,next) => {
    try {

        const postBody = req.body        
        const newPost = new Post(postBody);
        const savedPost = await newPost.save()
        res.json( { posts : savedPost })
    } catch (error) {
        next(error)
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