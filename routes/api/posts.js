'use strict';

var createError = require('http-errors');
const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const User = require('../../models/User');
const { default: mongoose } = require('mongoose');
const passport = require("passport");



// GET api/posts?page=2&limit=5&sort=-time
/* gets all the posts */
router.get('/', async function (req, res, next) {
    try {
        const username = req.query.username;
        const text = req.query.text;
        const published = req.query.published;
        const filter = {};

        // filters
        if (username) {
            const user = await User.findOne({username});
            if (!user) {
                next(createError(404, `Username ${username} does not exist`));
                return;
            }
            filter.author = user.id;
        }

        if (text) {
            filter.$text = {$search: text};
        }

        if (published === "true") {
            filter.publishedDate = {$lte: new Date()};
        }
        if (published === "false") {
            filter.publishedDate = {$gt: new Date()};
        }

        // paginación
        const page = req.query.page || 1;
        // default number of postr per page 10
        const limit = req.query.limit || 10;
        const skip = (page-1)*limit;
        const sort = req.query.sort || "-publishedDate";

        const posts = await Post.getPosts(filter, sort, skip, limit);

        const totalPosts = await Post.countPosts(filter)
        res.json({totalPosts, page, limit, result: posts});
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
        res.json({result : post});
    } catch(error) {
        next(error)
    }  
})

// POST api/posts
router.post('/', passport.authenticate('jwt', {session: false}));
router.post('/', 
async (req, res, next) => {
    try {
        const {message} = req.body;
        const publishedDate = new Date();
        // TODO - need to get the current user from the access token
        // and look that user up instead.
        const author = req.user;

        const newPost = new Post({author, message, publishedDate});
        const savedPost = await newPost.save()
        res.json(savedPost)
    } catch (err) {
        next(err)
    }
})


//DELETE api/posts/:id
/* deletes 1 post*/
router.delete('/:id', passport.authenticate('jwt', {session: false}));
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id);
        if(!post) {
            next(createError(404, `Post ${id} does not exist`));
            return;
        }

        if(req.user.id !== post.author.toString()) {
            next(createError(403 , "Can not remove posts of other users"));
            return;
        }

        await Post.deleteOne({_id: id});
        res.json(post);
        
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


//PUT api/posts/:id/kudos
/* give and remove kudos from a post */
router.put('/:id/kudos', passport.authenticate('jwt', {session: false}));
router.put('/:id/kudos', async (req, res, next) => {
    try {
        const user = req.user;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            next(createError(404, `Post ${postId} does not exist`));
            return;
        }

        if (!post.kudos.includes(user._id)) {
            await Post.updateOne({ _id: post._id }, {$push: {kudos: user._id}});
            res.json({message: `User ${user.username} added kudo to post ${post._id}`});
       
        } else {
            await Post.updateOne({ _id: post._id }, {$pull: {kudos: user._id}});
            res.json({message: `User ${user.username} removed kudo from post ${post._id}` });
        }
    } catch (error) {
        next(error);
    }
});


module.exports = router;
