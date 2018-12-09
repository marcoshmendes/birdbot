require('dotenv').config();

const async = require('async');
const Twitter = require('twitter');
const queryBuilder = require('../app/query-builder');
const client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

function start (req, res) {
    const query = queryBuilder.set(req.body);

    if (!query || query === 'no_criteria_provided') {
        res.status(500).json({
            'message': 'invalid_search'
        });
        return;
    }

    async.auto({
        find: (done) => {
            search(query, (err, tweetIds) => {
                if (err) {
                    res.status(500).json({
                        'message': err
                    });
                    return;
                }

                done(null, tweetIds);
            });
        },
        retweet: ['find', (results, done) => {
            const tweetIds = results.find;

            retweet(tweetIds, (err, retweetsNumber) => {
                if (err) {
                    res.status(500).json({
                        'message': err
                    });
                    return;
                }

                done(null, retweetsNumber);
            });
        }]
    }, (err, results) => {
        if (err) {
            res.status(500).json({
                'message': err
            });
            return;
        }

        res.status(200).json({
            'found_including_already_retweeted': results.find.length,
            'retweeted': results.retweet
        });
    });
}

function retweet(tweetIds, callback) {
    const ids = tweetIds;
    let countRetweets = ids.length;

    async.map(ids, (tweetId, innerCallback) => {
        client.post('statuses/retweet/' + tweetId, (err, tweet, response) => {
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

function search(query, callback) {
    let tweetIds = [];
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

module.exports = {
    start: start
}