require('dotenv').config();

var Twitter = require('twitter');
var config = require('../config/config');
var async = require('async');

var client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

function start (req, res) {
    var hashtag = req.body['hashtag'];
    var mention = req.body['mention'];

    if (!hashtag || !mention) {
        res.status(401).json({
            'error': 'no_data_provided'
        });
        return;
    }

    async.auto({
        search: function(done) {
            searchTweets(hashtag, mention, function(tweetIds) {
                if (!tweetIds || !tweetIds.length) {
                    done('data_not_found');
                    return;
                }

                done(null, tweetIds);
            });
        },
        retweet: ['search', function(results, done) {
            var searchResultIds = results.search;

            retweet(searchResultIds, function(response) {
                done(null, response);
            });
        }]
    }, function(err, results) {
        console.log('SUCCESS :' + new Date(), results);
    });
}

function retweet(tweetIds, callback) {
    var ids = tweetIds;

    async.map(ids, function(tweetId, innerCallback) {
        client.post('statuses/retweet/' + tweetId, function(error, tweet, response) {
            if (error) {
                console.log('ERROR RETWEET', error);
                return;
            }

            innerCallback(tweet);
        });
    }, function(err, results) {
        callback(results);
    });
}

function searchTweets(hashtag, mention, callback) {
    var tweetIds;
    var search = {
        q: hashtag
    };

    client.get('search/tweets', search, function(error, tweets, response) {
        if (error) {
            console.log('ERROR SEARCH', error);
            return;
        }

        tweetIds = getTweetIdsWithMention(tweets.statuses, mention);
        callback(tweetIds);
    });
}

function getTweetIdsWithMention(data, mention) {
    var tweetIds = [];

    data.forEach(function(tweet) {
        if (tweet.entities.user_mentions.length) {
            tweet.entities.user_mentions.forEach(function(mentions) {
                if (mentions.screen_name === mention) {
                    tweetIds.push(tweet.id_str);
                }
            })
        }
    });

    return tweetIds;
}

module.exports = {
    start: start
}