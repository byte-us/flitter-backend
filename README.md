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
## API Documentation


Posts list:

GET /api/

{
  "results": [
    {
      "_id": "63e08ed72dbe1d2e63c258db",
      "author": "63e08ed72dbe1d2e63c258d6",
      "message": "The very first flit!",
      "kudos": [
        "63e08ed72dbe1d2e63c258d6"
      ],
      "time": "2023-02-06T05:23:35.638Z",
      "__v": 0,
      "createdAt": "2023-02-06T05:23:35.641Z",
      "updatedAt": "2023-02-06T05:23:35.641Z"
    }
