'use strict';

var async = require('async');
var work = require('./mock-work');

///////////////////////////////////////////
// 3 tasks in series, 3 tasks in parallel
///////////////////////////////////////////

async.series([
  work.A,
  work.B,
  work.C
], function() {
  console.log('continuing after A, B, C in series');
  startParallelWork(); // passes control on to next example
});

function startParallelWork() {
  async.parallel([
      work.X,
      work.Y,
      work.Z
    ],
    function(){
      console.log('continuing after X, Y, Z in parallel');
      startNextSeries();
    }
  );
}







//////////////////////////////////////////////////////////////
// 3 tasks in series - with wrappers, state, error handling
///////////////////////////////////////////////////////////////


function startNextSeries() {

  var user;

  async.series([
    function(callback) {
      work.I(callback);
    },
    function(callback) {
      work.J(function(err, u){
        if (err) { return callback(err); }
        user = u;
        callback();
      });
    },
    function(callback) {
      work.K(user, function(){
        callback(new Error('example error'));
      });
    }
  ], function(err) {
    if (err){
      // ... handle error - which error?
    }
    console.log('continuing after I, J, K in series');
  });
}

