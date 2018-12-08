const controller = require('./controller');

module.exports = function(app) {
    app.route('/api/retweet').post(controller.start);
};