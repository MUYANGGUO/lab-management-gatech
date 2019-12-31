const authResolver = require('./auth');
const studentsResolver = require('./students');
const bookingResolver = require('./booking');
const eventsResolver = require('./events');

const rootResolver = {
    ...authResolver,
    ...studentsResolver,
    ...bookingResolver,
    ...eventsResolver
};

module.exports = rootResolver;