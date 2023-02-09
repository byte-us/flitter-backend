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
## Add new post:
POST /api/posts

## List all the posts of a user:
GET /api/posts?username=lola

## Page:
Page number. Default is 1
GET /api/posts?page=2

## Limit:
Limit posts of a user:. Default is 10
GET /api/posts?limit=5

