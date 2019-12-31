const authResolver = require('./auth');
const studentsResolver = require('./students');
const bookingResolver = require('./booking');
const eventsResolver = require('./events');
const checkingoutResolver = require('./checkingout');
const assetsResolver = require('./assets');
const rootResolver = {
    ...authResolver,
    ...studentsResolver,
    ...bookingResolver,
    ...eventsResolver,
    ...checkingoutResolver,
    ...assetsResolver
};

module.exports = rootResolver;