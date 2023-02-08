'use strict'
// Initialize db with some data

const { default: mongoose, Mongoose } = require('mongoose');
const readline = require('readline')
const User = require('../models/User')
const Post = require('../models/Post')

console.log("Initializing DB collections");
main().catch(err => console.log('There was an error', err));


async function main() {
    // Ask user for confirmation
    const continuar = await askToRemoveDB('Are you VERY sure you want to delete all the data from the data base? [N/y]');
    if (!continuar) {
        console.log("Cancelled");
        process.exit();
    }

    const connection = require('../lib/connectMongoose');
    const insertedUsers = await initUsers();
    await initPosts(insertedUsers);
    connection.close();
    process.exit();
}


// Populate collection Users with documents
async function initUsers() {
    const deleteUsers = await User.deleteMany();
    console.log(`Deleted ${deleteUsers.deletedCount} users`);

    const insertedUsers = await User.insertMany([{
            name: 'ana',
            username: 'ana123',
            email: 'ana@gmail.com',
            password: 'ana123',
            followers: [],
            following: [],
            posts: []
        },{
            name: 'lola',
            username: 'lola',
            email: 'lola@gmail.com',
            password: 'lola123',
            followers: [],
            following: [],
            posts: []
        },{
            name: 'maga',
            username: 'maga',
            email: 'maga@gmail.com',
            password: 'maga123',
            followers: [],
            following: [],
            posts: []
        }
    ]).catch(err => {
        console.log('There was an error', err)
        process.exit()
    });


    console.log(`Created ${insertedUsers.length} users`)
    return insertedUsers;
}


// Populate collection Post with documents
async function initPosts(insertedUsers) {
    const deletePosts = await Post.deleteMany();
    console.log(`Deleted ${deletePosts.deletedCount} posts`);

    const insertedPosts = await Post.insertMany([{
            author: insertedUsers[0]._id,
            message: "The very first flit!",
            kudos: [insertedUsers[0]._id]
        },{
            author: insertedUsers[1]._id,
            message: "And now it's the second!",
            kudos: [insertedUsers[1]._id, insertedUsers[2]._id, insertedUsers[0]._id]
        },
        {
            author: insertedUsers[1]._id,
            message: "More the merrier!",
        }]).catch(err => {
            console.log('There was an error', err)
            process.exit()
        });

    console.log(`Created ${insertedUsers.length} posts`)
}
    

async function askToRemoveDB(text) {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(text, answer => {
            if (answer.toLowerCase() === 'y') {
                resolve(true);
                return;
            }

            resolve(false);
        })
    })
}
