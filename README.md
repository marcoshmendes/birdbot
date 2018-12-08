
# NodeJS - Birdbot 1.0

Twitter bot to make retweets based on custom search (hashtag, mention and words)
This script was created to run periodically by task running like CRON, however you could run it locally to test by yourself, following the steps bellow.

### 1 - Create an **.env** file in the project root folder:

You need to create an [Twitter APP](https://apps.twitter.com/) first and get your keys. Once you have keys in your hands, create an .env file with this values.

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

**OBS**. It will start server on port **3004**, you can change this param in the **
config/config.js** file.

### 4 - Route

Example route, assuming you're running it locally on port 3004

```
POST http://localhost:3004/api/retweet
```

Example Body :

```javascript
{
  hashtag: 'superbowl',
  mention: 'nasa',
  words: ['one', 'two']
}
```

You must send at least one of these three:

- **hashtag**: String
- **mention**: String
- **words**: Array of strings

Response:

```javascript
{
    "found_including_already_retweeted": 14,
    "retweeted": 2
}
```

### Examples of use

Retweet tweets with hashtag **#guitar**
```javascript
{
  hashtag: 'guitar'
}
```

Retweet tweets with profile mention **@nasa** and hashtag **#apollo11**
```javascript
{
  mention: 'nasa',
  hashtag: 'apollo11',
}
```

Retweet tweets with profile mention **@spacex**, hashtag **#apolo** and words **rocket** and **launch**
```javascript
{
  mention: 'nasa',
  hashtag: 'apollo11',
  words: ['rocket', 'launch']
}
```

### Twitter Search API restrictions

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
