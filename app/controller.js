require('dotenv').config();

const async = require('async');
const ActionService = require('../services/ActionService')
const queryBuilder = require('../app/query-builder');


function retweet(req, res) {
    const query = queryBuilder.set(req.body);

    if (!query || query === 'no_criteria_provided') {
        res.status(500).json({
            'message': 'invalid_search'
        });
        return;
    }

    async.auto({
        find: (done) => {
            ActionService.search(query, (err, tweetIds) => {
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

            ActionService.retweet(tweetIds, (err, retweetsNumber) => {
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

function like(req, res) {
    const query = queryBuilder.set(req.body);

    if (!query || query === 'no_criteria_provided') {
        res.status(500).json({
            'message': 'invalid_search'
        });
        return;
    }

    async.auto({
        find: (done) => {
            ActionService.search(query, (err, tweetIds) => {
                if (err) {
                    res.status(500).json({
                        'message': err
                    });
                    return;
                }

                done(null, tweetIds);
            });
        },
        like: ['find', (results, done) => {
            const tweetIds = results.find;

            ActionService.like(tweetIds, (err, likesAmount) => {
                if (err) {
                    res.status(500).json({
                        'message': err
                    });
                    return;
                }

                done(null, likesAmount);
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
            'found_including_already_liked': results.find.length,
            'liked': results.like
        });
    });
}

function search(req, res) {
    const query = queryBuilder.set(req.body);

    if (!query || query === 'no_criteria_provided') {
        res.status(500).json({
            'message': 'invalid_search'
        });
        return;
    }

    ActionService.get(query, (err, tweets) => {
        if (err) {
            res.status(500).json({
                'message': err
            });
            return;
        }

        res.status(200).json(tweets);
    });
}

module.exports = {
    retweet: retweet,
    search: search,
    like: like
}