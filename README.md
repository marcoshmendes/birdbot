
# NodeJS - Birdbot 1.0

A Twitter bot made in Node.js. This API was created to be executed by a time-based task runner like cron-job, however you could run it locally and call endpoints by yourself.

# What can i do with birdbot?

- Retweet
- Like
- Write tweets
- Search tweets and get result as JSON

# Index

- [Twitter Keys](#twitterkeys)
- [Install](#install)
- [Operators](#operators)
- [How to use operators](#howtouse)
- Endpoints
  - [Retweet](#retweet)
  - [Like](#like)
  - [Tweet](#tweet)
  - [Search](#search)
- [Twitter Search API restrictions](#restrictions)

# <a name="twitterkeys">Create a Twitter APP and get your keys</a>

Before use twitter API, even by a third-party like birdbot, you will need to create an [Twitter APP](https://apps.twitter.com/) for the Twitter account you'd like automate. 

There is a little process to create an app, you will be requested to answer some questions on the web page where you'll create your app, the questions are about your purpose to use the API. Try to save your answers, because maybe you will have to answer again replying an email sent from Twitter.

After that process you will be able to generate your keys. They look like this:


`CONSUMER_KEY = XXXXXXXXXXXXXXXXXXXXX`

`CONSUMER_SECRET = XXXXXXXXXXXXXXXXXXXXXXXXX`

`ACCESS_TOKEN_KEY = XXXXXXXXXXXXXXXXXXX-XXXXXXXXXXXXXXXXXXXX`

`ACCESS_TOKEN_SECRET = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx`

Once you have keys in your hands, let's install birdbot.

# <a name="install">Install</a>

### 1 - Create an **.env** file in the project root folder

After clone the repository, it's time to create the .env file with your app keys information like this one:

```
CONSUMER_KEY = XXXXXXXXXXXXXXXXXXXXX
CONSUMER_SECRET = XXXXXXXXXXXXXXXXXXXXXXXXX
ACCESS_TOKEN_KEY = XXXXXXXXXXXXXXXXXXX-XXXXXXXXXXXXXXXXXXXX
ACCESS_TOKEN_SECRET = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
```

### 2 - Run NPM INSTALL to install all dependencies

```
npm install
```

### 3 - Run NPM START to start server

```
npm start
```

**OBS**. It will start server on port **3004**, you can change this param in the **config/config.js** file.

```javascript
module.exports = {
	'port': process.env.PORT || 3004
}
```

# <a name="operators">Operators</a>

Operators are the properties you can use in request body, to create your custom query, it is like a query language.

- **hashtag** (string)
- **mention** (string)
- **from** (string)
- **filter** (string)
  - **safe** (Tweets marked as potentially sensitive removed)
  - **media** (image or video)
  - **native_video** (an uploaded video, Amplify video, Periscope, or Vine.)
  - **periscope** (Periscope video URL.)
  - **vine** (a Vine.)
  - **images** (links identified as photos, including third parties such as Instagram)
  - **twimg** (pic.twitter.com link representing one or more photos.)
  - **links** (linking to URL)
- **attitude** (string)
- **except** (string)
- **ask** (boolean)
- **words** (array of strings)
- **or** (object, word or hashtags)
- **url** (string)
- **recent** (boolean)

The **or** operator requires attention to use. Its **type** may be **word** or **hashtag**

**TYPE = WORD**

```javascript
{
  "or": {
    "type": "word",
    "keys": ["love", "hate"]
  }
}
```

**TYPE = HASHTAG**

```javascript
{
  "or": {
    "type": "hashtag",
    "keys": ["love", "hate"]
  }
}
```


# <a name="howtouse">How to use operators</a>

You will use operators as keys in the request you sent for endpoints, let's take a look:

#### OBS. You can't use "**words**" operator and "**or**" operator together in the same search, one of them will be ignored in case of use.

- Tweets with hashtag superbowl
```javascript
{
  "hashtag": "superbowl"
}
```

- Tweets with profile mention **@nasa** and hashtag **#apollo11**
```javascript
{
  "mention": "nasa",
  "hashtag": "apollo11"
}
```

- From profile **@nasa** containing hashtag **rocket**
```javascript
{
  "from": "nasa",
  "hashtag": "rocket"
}
```

- Tweets with profile mention **@spacex**, hashtag **#apolo** and words **rocket** and **launch**
```javascript
{
  "mention": "nasa",
  "hashtag": "apollo11",
  "words": ["rocket", "launch"]
}
```

- Tweets with hashtag **love**, words **"beautiful"**, **"couple"** and **"in the air"** except word **hate**
```javascript
{
  "hashtag": "love",
  "words": ["beautiful", "couple", "in the air"],
  "except": "hate"
}
```

- Containing **“traffic”** hashtag and asking a question.
```javascript
{
  "hashtag": "traffic",
  "ask": "true"
}
```

- Containing **“fight”** hashtag and with a negative attitude.
```javascript
{
  "hashtag": "fight",
  "attitude": "negative"
}
```

- Containing **“book”** hashtag and with a positive attitude.
```javascript
{
  "hashtag": "book",
  "attitude": "positive"
}
```

- Containing **“book”** hashtag and url containing Amazon
```javascript
{
  "hashtag": "book",
  "url": "amazon"
}
```

- Containing words **"puppy"** and **"cute"** and and links identified as photos, including third parties such as Instagram
```javascript
{
  "words": ["puppy", "cute"],
  "filter": "images"
}
```

- Recent tweets containing hashtag **"dollar"**
```javascript
{
  "hashtag": "dollar",
  "recent": "true"
}
```

Containing either “love” or “hate” **words** (or both).
```javascript
{
  "or": {
	"type": "word",
	"keys": ["love", "hate"]
  }
}
```

Containing either “love” or “hate” **hashtags** (or both).
```javascript
{
  "or": {
	"type": "hashtag",
	"keys": ["love", "hate"]
  }
}
```

# <a name="retweet">Retweet</a>

Endpoint for retweet, assuming you're running it locally on port 3004

```
POST http://localhost:3004/api/retweet
```

Example Body :

```javascript
{
  hashtag: "superbowl",
  mention: "nasa",
  words: ["one", "two"]
}
```

Response:

```javascript
{
    "found_including_already_retweeted": 14,
    "retweeted": 2
}
```

# <a name="like">Like</a>

Endpoint for like tweets, assuming you're running it locally on port 3004

```
POST http://localhost:3004/api/like
```

Example Body :

```javascript
{
  "hashtag": "guitar",
  "mention": "gibsonguitar"
}
```

Response:

```javascript
{
    "found_including_already_liked": 22,
    "liked": 20
}
```

# <a name="tweet">Write Tweet</a>

Endpoint for write tweets, assuming you're running it locally on port 3004

```
POST http://localhost:3004/api/tweet
```

Example Body :

```javascript
{
  "text": "This is my first tweet with birdbot",
}
```

Response (tweet object):

```javascript
{
    "created_at": "Mon Dec 24 06:37:53 +0000 2018",
    "id": 1077090970502615000,
    "id_str": "1077090970502615041",
    "text": "Hey there",
    "truncated": false,
    "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [],
        "urls": []
    },
    "source": "<a href=\"https://github.com/marcoshmendes/60daysguitar\" rel=\"nofollow\">60daysguitar</a>",
    "in_reply_to_status_id": null,
    "in_reply_to_status_id_str": null,
    "in_reply_to_user_id": null,
    "in_reply_to_user_id_str": null,
    "in_reply_to_screen_name": null,
    "user": {
        "id": 751283766300074000,
        "id_str": "751283766300073985",
        "name": "60Days Guitar Challenge",
        "screen_name": "60daysguitar",
        "location": "",
        "description": "Guitar every day for 60 days challenge. Join us posting one Twitter video playing, everyday with #60daysguitar hashtag and tag us. We'll post everything here.",
        "url": null,
        "entities": {
            "description": {
                "urls": []
            }
        },
        "protected": false,
        "followers_count": 2,
        "friends_count": 0,
        "listed_count": 0,
        "created_at": "Fri Jul 08 05:16:22 +0000 2016",
        "favourites_count": 10,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "verified": false,
        "statuses_count": 81,
        "lang": "pt",
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "F5F8FA",
        "profile_background_image_url": null,
        "profile_background_image_url_https": null,
        "profile_background_tile": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/1059596261387571200/MwVRAFNq_normal.jpg",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/1059596261387571200/MwVRAFNq_normal.jpg",
        "profile_banner_url": "https://pbs.twimg.com/profile_banners/751283766300073985/1541463216",
        "profile_link_color": "1DA1F2",
        "profile_sidebar_border_color": "C0DEED",
        "profile_sidebar_fill_color": "DDEEF6",
        "profile_text_color": "333333",
        "profile_use_background_image": true,
        "has_extended_profile": false,
        "default_profile": true,
        "default_profile_image": false,
        "following": false,
        "follow_request_sent": false,
        "notifications": false,
        "translator_type": "none"
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "is_quote_status": false,
    "retweet_count": 0,
    "favorite_count": 0,
    "favorited": false,
    "retweeted": false,
    "lang": "en"
}
```

# <a name="search">Search and get result as JSON</a>

Endpoint for retrieve tweets, assuming you're running it locally on port 3004

```
POST http://localhost:3004/api/search
```

Example Body :

```javascript
{
  "hashtag": "guitar",
  "mention": "gibsonguitar"
}
```

Response (A collection of tweet objects):

```javascript
{
    "statuses": [
    	{ Tweet Object },
        { Tweet Object },
        { Tweet Object },
        { Tweet Object },
        { Tweet Object },
        { Tweet Object }
    ]
}
```


### <a name="restrictions">Twitter Search API restrictions</a>

This project uses **Standard** API, and results of search and retweets may be not totally reliable.

The [Twitter API](https://developer.twitter.com/en/docs/tweets/search/overview) platform offers three tiers of search APIs:

**Standard**  This search API searches against a sampling of recent Tweets published in the past 7 days. Part of the 'public' set of APIs.  
  
**Premium**  Free and paid access to either the last 30 days of Tweets or access to Tweets from as early as 2006. Built on the reliability and full-fidelity of our enterprise data APIs, provides the opportunity to upgrade your access as your app and business grow.  

**Enterprise**  Paid (and managed) access to either the last 30 days of Tweets or access to Tweets from as early as 2006. Provides full-fidelity data, direct account management support, and dedicated technical support to help with integration strategy.

|Category|Product Name|Supported history|Query capability|Counts endpoint| Data fidelity |
|---|---|---|---|---|---|
|Standard| [Standard Search API](https://developer.twitter.com/en/docs/tweets/search/overview/standard) |7 days|  [Standard operators](https://developer.twitter.com/en/docs/tweets/search/guides/standard-operators) | Not available  |  Incomplete |
| Premium  | [Search Tweets: 30-day endpoint](https://developer.twitter.com/en/docs/tweets/search/overview/premium)  | 30 days  | [Premium operators](https://developer.twitter.com/en/docs/tweets/search/guides/premium-operators)  | Available  |  Full |
|Premium|[Search Tweets: Full-archive endpoint](https://developer.twitter.com/en/docs/tweets/search/overview/premium)  | Tweets from as early as 2006  | [Premium operators](https://developer.twitter.com/en/docs/tweets/search/guides/premium-operators)  | Available  |  Full |
|  Enterprise | [30-day Search API](https://developer.twitter.com/en/docs/tweets/search/overview/enterprise)|30 day|[Premium operators](https://developer.twitter.com/en/docs/tweets/search/guides/premium-operators) |  Included |  Full |
| Enterprise  | [Full-archive Search API](https://developer.twitter.com/en/docs/tweets/search/overview/enterprise) |Tweets from as early as 2006 |[Premium operators](https://developer.twitter.com/en/docs/tweets/search/guides/premium-operators)|Included  | Full  |
