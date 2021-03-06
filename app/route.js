const controller = require('./controller');

module.exports = function(app) {
    app.route('/api/retweet').post(controller.retweet);
    app.route('/api/like').post(controller.like);
    app.route('/api/search').post(controller.search);
    app.route('/api/tweet').post(controller.tweet);
};