'use strict';

const express = require('express');
const router = express.Router();
const User = require('../../models/User')
const passport = require("passport");

// GET api/users/auth
// Gets the authorized user with token
router.get('/auth', passport.authenticate('jwt', {session: false}));
router.get('/auth', async function (req, res, next) {
    try {
        res.json({results : req.user});
    } catch(error) {
        next(error)
    }
})


// GET api/users
router.get('/', async function (req, res, next) {
    try {
        const users = await User.getUsers();
        res.json({results : users});
    } catch(error) {
        next(error)
    }   
})


// GET api/users/:id
/* gets 1 user with its id */
router.get('/:id', async function (req, res, next) {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        res.json({results : user});
    } catch(error) {
        next(error)
    }   
})


// POST api/users
/* creates a new user */
router.post('/newuser',async (req, res,next) => {
    try {
        const usersInfo = req.body;
        const newUser = new User(usersInfo);
        const savedUser = await newUser.save();
        res.json( { users : savedUser })
    } catch (error) {
        next(error)
    }
})


//DELETE api/users/:id
/* deletes 1 user */
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user) {
            return next(new Error(404))
        }
        await User.deleteOne({_id: id});
        res.json();
        
    } catch (error) {
        next(error)
    }
})

// PUT api/users/:id/follow
/* follow a user and update lists of "following" and "followers" */
router.put('/:id/follow', async (req, res, next) => {
    try {
        const anotherUser = req.body._id
        // identify the user with the provided id
        const userToFollow = await User.findById(req.params.id);
        // if in this userToFollow's followers' list this id doesn't exist:
        if (!userToFollow.followers.includes(anotherUser)) {
            await Promise.all([
                // add to the list of following and follower the corresponding ids
                User.updateOne({ _id: anotherUser }, { $push: {following: userToFollow._id}}),
                User.updateOne({ _id: userToFollow._id }, { $push: { followers: anotherUser}})
            ]);
            res.json({result: "You are now following this user" });
        } else {
            res.json({ result: "You already follow this user" });
        }
    } catch (error) {
        next(error);
    }
});

// PUT api/users/:id/unfollow
/* unfollow a user and update the list of followers and following*/ 
router.put('/:id/unfollow', async (req, res, next) => {
    try {
        const anotherUser = req.body._id
        const userToUnfollow = await User.findById(req.params.id);
        if (userToUnfollow.followers.includes(anotherUser)) {
            await Promise.all([
                User.updateOne({ _id: anotherUser }, {$pull: {following: userToUnfollow._id}}),
                User.updateOne({ _id: userToUnfollow._id }, {$pull: {followers: anotherUser}})
            ]);
            res.json({result: "You're no longer following this user"});
        } else {
            res.json({result: "You don't follow this user"});
        }
    } catch (error) {
        next(error);
    }
});


module.exports = router;