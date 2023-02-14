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
            profileImage: ['https://wallpapers-clan.com/wp-content/uploads/2022/06/cute-pusheen-pfp-1.jpg'],
            followers: [],
            following: [],
            posts: []
        },{
            name: 'lola',
            username: 'lola',
            email: 'lola@gmail.com',
            password: 'lola123',
            profileImage: ['https://wallpapers-clan.com/wp-content/uploads/2022/06/cute-pusheen-pfp-1.jpg'],
            followers: [],
            following: [],
            posts: []
        },{
            name: 'maga',
            username: 'maga',
            email: 'maga@gmail.com',
            password: 'maga123',
            profileImage: ['https://wallpapers-clan.com/wp-content/uploads/2022/06/cute-pusheen-pfp-1.jpg'],
            followers: [],
            following: [],
            posts: []
        },{
            name: 'agapita',
            username: 'agapita21',
            email: 'agapita21@gmail.com',
            password: 'pita123',
            profileImage: ['https://wallpapers-clan.com/wp-content/uploads/2022/06/cute-pusheen-pfp-1.jpg'],
            followers: [],
            following: [],
            posts: []
        },{
            name: 'florencio',
            username: 'florencio14',
            email: 'floren@gmail.com',
            password: 'floren123',
            profileImage: ['https://wallpapers-clan.com/wp-content/uploads/2022/06/cute-pusheen-pfp-1.jpg'],
            followers: [],
            following: [],
            posts: []
        },{
            name: 'luciana',
            username: 'luciana33',
            email: 'luci33@gmail.com',
            password: 'luci123',
            profileImage: ['https://wallpapers-clan.com/wp-content/uploads/2022/06/cute-pusheen-pfp-1.jpg'],
            followers: [],
            following: [],
            posts: []
        },{
            name: 'hermenegildo',
            username: 'hermenegildo22',
            email: 'herme@gmail.com',
            password: 'herme123',
            profileImage: ['https://wallpapers-clan.com/wp-content/uploads/2022/06/cute-pusheen-pfp-1.jpg'],
            followers: [],
            following: [],
            posts: []
        },{
            name: 'pepito',
            username: 'pepito3',
            email: 'pepi3@gmail.com',
            password: 'pepito123',
            profileImage: ['https://wallpapers-clan.com/wp-content/uploads/2022/06/cute-pusheen-pfp-1.jpg'],
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
        },{
            author: insertedUsers[1]._id,
            message: "Excited to join #Flitter! 🚀💻",
            kudos: [insertedUsers[1]._id, insertedUsers[2]._id, insertedUsers[0]._id]
        },{
            author: insertedUsers[2]._id,
            message: "The sleek interface and fun features of #Flitter make it my new favorite social network. 💜",
            kudos: [insertedUsers[3]._id, insertedUsers[2]._id, insertedUsers[0]._id]
        },{
            author: insertedUsers[6]._id,
            message: "Had so much fun using #Flitter today! Can't wait to see what other cool things it has in store. #SocialMedia #NewNetwork",
            kudos: [insertedUsers[1]._id, insertedUsers[2]._id, insertedUsers[0]._id]
        },{
            author: insertedUsers[3]._id,
            message: "Just discovered #Flitter and I'm already loving it! The community is great and it's easy to use. #SocialMedia #Excited 💻💜",
            kudos: [insertedUsers[1]._id, insertedUsers[2]._id, insertedUsers[0]._id]
        },{
            author: insertedUsers[4]._id,
            message: "Had a blast using the fun features on #Flitter today! Can't wait to see what's next. #NewNetwork #SocialMedia 💜🚀",
            kudos: [insertedUsers[1]._id, insertedUsers[2]._id, insertedUsers[0]._id]
        },{
            author: insertedUsers[5]._id,
            message: "Loving the simplicity and creativity of #Flitter! It's quickly becoming my go-to social network. 💻💜",
            kudos: [insertedUsers[1]._id, insertedUsers[2]._id, insertedUsers[0]._id, insertedUsers[7]._id, insertedUsers[3]._id]
        },{
            author: insertedUsers[7]._id,
            message: "Just joined #Flitter and I'm already loving the community. So much fun and excitement in one place! 💜🚀",
            kudos: [insertedUsers[1]._id, insertedUsers[2]._id, insertedUsers[0]._id]
        },{
            author: insertedUsers[2]._id,
            message: "Having a blast exploring #Flitter! Can't wait to see what other cool things it has in store. #NewNetwork #SocialMedia 💻💜",
            kudos: [insertedUsers[1]._id, insertedUsers[2]._id, insertedUsers[0]._id]
        },{
            author: insertedUsers[4]._id,
            message: "So impressed with #Flitter! The interface is sleek, the community is great, and the fun features keep me coming back. 💜🚀",
            kudos: [insertedUsers[1]._id, insertedUsers[2]._id, insertedUsers[0]._id]
        },{
            author: insertedUsers[5]._id,
            message: "Already addicted to #Flitter! This new social network has everything I've been looking for. #SocialMedia #Excited 💻💜",
            kudos: [insertedUsers[1]._id, insertedUsers[2]._id]
        },{
            author: insertedUsers[7]._id,
            message: "Just started using #Flitter and I'm already in love. The community is so supportive and friendly. 💜🚀",
            kudos: [insertedUsers[1]._id, insertedUsers[0]._id]
        },{
            author: insertedUsers[2]._id,
            message: "Having a great time using #Flitter! So many cool features and a fantastic community. #SocialMedia #NewNetwork 💻💜",
            kudos: [insertedUsers[1]._id, insertedUsers[2]._id, insertedUsers[0]._id, insertedUsers[7]._id, insertedUsers[4]._id, insertedUsers[5]._id]
        },{
            author: insertedUsers[5]._id,
            message: "Loving the endless possibilities on #Flitter! Can't wait to see what other cool things it has in store. #Excited 🚀💜",
            kudos: [insertedUsers[1]._id]
        },{
            author: insertedUsers[7]._id,
            message: "Just got started on #Flitter and it's already my favorite social network. So much fun and excitement! 💜🚀",
            kudos: [insertedUsers[1]._id, insertedUsers[2]._id, insertedUsers[0]._id, insertedUsers[7]._id]
        },{
            author: insertedUsers[6]._id,
            message: "So impressed with #Flitter! This new social network has everything I've been looking for and more. #Excited 💻💜",
            kudos: [insertedUsers[1]._id, insertedUsers[2]._id, insertedUsers[0]._id]
        },
        {
            author: insertedUsers[1]._id,
            message: "The more the merrier!",
            publishedDate: "2023-03-11"
        }]).catch(err => {
            console.log('There was an error', err)
            process.exit()
        });
    Post.createIndexes();

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
