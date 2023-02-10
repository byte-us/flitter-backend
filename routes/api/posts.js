'use strict';

var createError = require('http-errors');
const express = require('express');
const router = express.Router();
const Post = require('../../models/Post')
const User = require('../../models/User')



// GET api/posts?page=2&limit=5&sort=-time
/* gets all the posts */
router.get('/', async function (req, res, next) {
    try {
        const username = req.query.username;
        const search = req.query.search;
        const filter = {};

        if (username) {
            const user = await User.findOne({username});
            if (!user) {
                next(createError(404, `Username ${username} does not exist`));
                return;
            }
            filter.author = user.id;
        }

        if (search) {
            filter.$text = {$search: search};
        }

        // paginación
        const page = req.query.page || 1;
        // default number of postr per page 10
        const limit = req.query.limit || 10;
        const skip = (page-1)*limit;
        const sort = req.query.sort || "-author";

        const posts = await Post.getPosts(filter, sort, skip, limit);
        const totalPosts = Object.keys(posts).length
        res.json({page, limit, totalPosts, result: posts});
    } catch(err) {
        next(err);
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
