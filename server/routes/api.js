module.exports = function(app) {
    'use strict';

  /* GET users listing. */
  app.get('/api/test', function(req, res) {
    res.json([
      {
        a: 'b',
        c: 'd'
      }]);
  });
};


