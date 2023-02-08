'use strict';

const express = require('express');

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


// GET api/posts/user/{id}
// Returns all the posts of a user from newest to oldest
router.get('/user/:author', async (req, res, next) => {


    try {
        const userId = req.params.author;

        // paginación
        const page = req.query.page || 1;
        // default number of postr per page 10
        const limit = req.query.limit || 10;
        const skip = (page-1)*limit;
        const sort = req.query.sort || "-author";

        const filter = {author: userId};


        // if userId is a ObjectID
        if(!userId.match(/^[a-fA-F0-9]{24}$/)) next() 

        const userPosts = await Post.getPosts(filter, sort, skip, limit);
        res.json({page, limit, result: userPosts})

    } catch (err) {
        next(err);
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
