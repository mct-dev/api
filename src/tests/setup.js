const mongoose = require('mongoose');

// Load models since we will not be instantiating our express server.
require('../server/models/Fiddle.ts');

beforeEach(function(done) {
  /*
    Define clearDB function that will loop through all
    the collections in our mongoose connection and drop them.
  */
  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {});
    }
    return done();
  }

  /*
    If the mongoose connection is closed,
    start it up using the test url and database name
    provided by the node runtime ENV
  */
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      `mongodb://localhost:27017/${process.env.TEST_SUITE}`, // <------- IMPORTANT
      function(err) {
        if (err) {
          throw err;
        }
        return clearDB();
      }
    );
  } else {
    return clearDB();
  }
});

afterEach(function(done) {
  mongoose.disconnect();
  return done();
});

afterAll(done => {
  return done();
});
