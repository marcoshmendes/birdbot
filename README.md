# Birdbot 1.0

This is an twitter bot to retweet based on hashtag and mention. 
This script was created to run periodically by task running like CRON, however you could run it locally following the steps bellow.

### 1 - Create an **.env** file in the project root folder:

You need to create an [Twitter APP](https://apps.twitter.com/) first and get your keys. Once you have keys in hands, create an .env file with this values.

```
CONSUMER_KEY = XXXXXXXXXXXXXXXXXXXXX
CONSUMER_SECRET = XXXXXXXXXXXXXXXXXXXXXXXXX
ACCESS_TOKEN_KEY = XXXXXXXXXXXXXXXXXXX-XXXXXXXXXXXXXXXXXXXX
ACCESS_TOKEN_SECRET = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
```

### 2 - Run NPM INSTALL to install dependencies

```
npm install
```

### 3 - Run NPM START to start server

```
npm start
```

### 4 - Route

```
POST http://localhost:3004/api/search
```

Body :

```
{
  hashtag: 'string',
  mention: 'string
}
```

Response:

```
{
    "found_including_duplicate": 15,
    "retweeted": 0
}
```
