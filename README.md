# flitter-backend
Deployment:
-----------

1. Install dependencies
```sh
npm install
```

2. Start MongoDB server

3. Load initial data to database:
```sh
npm run init-db
```

To start the application in production:
```sh
npm run start
```

To start the application in development:
```sh
MONGODB="mongodb://172.23.32.1:27017/flitterApp" npm run dev
```
# API Documentation


## List of all posts:

GET /api/posts

Output example:
{
    "results": [
        {
            "_id": "63e2c4e940985b409cc89bc9",
            "author": {
                "_id": "63e2c4e940985b409cc89bc3",
                "name": "ana",
                "username": "ana123",
                "email": "ana@gmail.com",
                "password": "ana123",
                "followers": [],
                "following": [],
                "posts": [],
                "__v": 0,
                "createdAt": "2023-02-07T21:38:49.624Z",
                "updatedAt": "2023-02-07T21:38:49.624Z"
            },
            "message": "The very first flit!",
            "kudos": [
                "63e2c4e940985b409cc89bc3"
            ],
            "__v": 0,
            "createdAt": "2023-02-07T21:38:49.800Z",
            "updatedAt": "2023-02-07T21:38:49.800Z"
        },
  ]
}

## Add new post:
POST /api/posts

## List all the posts of a user:
GET /api/posts/{userId}:

example /api/posts/63e1665b5218a5bfb27dfd63

## Page:
Page number. Default is 1
example:/api/posts/{userId}?page=2

## Limit:
Limit posts of a user:. Default is 10
example:/api/posts/{userId}?limit=5