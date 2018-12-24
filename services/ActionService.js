const Twitter = require('twitter');
const async = require('async');
const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

function search(query, callback) {
    const tweetIds = [];
    const criteria = {
        q: query
    };

    client.get('search/tweets', criteria, (err, tweets, response) => {
        if (err) {
            callback(err);
            return;
        }

        tweets.statuses.forEach((tweet) => {
            tweetIds.push(tweet.id_str);
        });
        
        callback(null, tweetIds);
    });
}

function get(query, callback) {
    const criteria = {
        q: query
    };

    client.get('search/tweets', criteria, (err, tweets, response) => {
        if (err) {
            callback(err);
            return;
        }
        
        callback(null, tweets);
    });
}

function retweet(tweetIds, callback) {
    const ids = tweetIds;
    let countRetweets = ids.length;

    async.map(ids, (tweetId, innerCallback) => {
        client.post('statuses/retweet', { id: tweetId }, (err, tweet, response) => {
            if (err) {
                countRetweets--;
                innerCallback();
                return;
            }

            innerCallback(null, tweet);
        });
    }, (err, results) => {
        if (err) {
            callback(err);
            return;
        }

        callback(null, countRetweets);
    });
}

function like(tweetIds, callback) {
    const ids = tweetIds;
    let countLikes = ids.length;

    async.map(ids, (tweetId, innerCallback) => {
        client.post('favorites/create', { id: tweetId }, (err, tweet, response) => {
            if (err) {
                countLikes--;
                innerCallback();
                return;
            }

            innerCallback(null, tweet);
        });
    }, (err, results) => {
        if (err) {
            callback(err);
            return;
        }

        callback(null, countLikes);
    });
}

function tweet(text, callback) {
    client.post('statuses/update', { status: text }, (err, tweet, response) => {
        if (err) {
            callback(err);
            return;
        }

        callback(null, tweet);
    });
}

module.exports = {
    search: search,
    retweet: retweet,
    tweet: tweet,
    like: like,
    get: get
}