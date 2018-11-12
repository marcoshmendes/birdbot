var controller = require('./controller');

module.exports = function(app) {
    app.route('/api/search').post(controller.start);
};