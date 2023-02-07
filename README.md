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

```sh
MONGODB="mongodb://172.23.32.1:27017/flitterApp" npm run dev
```
# API Documentation


## List of all the posts:

GET /api/posts

{
  "results": [
    {
      "_id": "63e08ed72dbe1d2e63c258db",
      "author": "63e08ed72dbe1d2e63c258d6",
      "message": "The very first flit!",
      "kudos": [
        "63e08ed72dbe1d2e63c258d6"
      ],
      "__v": 0,
      "createdAt": "2023-02-06T05:23:35.641Z",
      "updatedAt": "2023-02-06T05:23:35.641Z"
    }
  ]
}

## List all the posts of a user:
GET /api/posts/{author}:

example /api/posts/63e1665b5218a5bfb27dfd63

{
  "result": [
    {
      "_id": "63e1665b5218a5bfb27dfd68",
      "author": "63e1665b5218a5bfb27dfd63",
      "message": "And now it's the second!",
      "kudos": [
        "63e1665b5218a5bfb27dfd63",
        "63e1665b5218a5bfb27dfd64",
        "63e1665b5218a5bfb27dfd62"
    }
  ]
}