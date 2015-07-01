'use strict';

var work = require('./mock-work');
var easyAsync = require('easy-async');



/////////////////////////////////////////
// 3 tasks in series, 3 tasks in parallel
/////////////////////////////////////////

easyAsync.start(work.A)
.then(work.B)
.then(work.C)
.then(function() {
  console.log('continuing after A, B, C in series');
  startParallelWork(); // passes control on to next example
});
// "then" used above for tasks in series,
// "and" used below for tasks in parallel.
function startParallelWork() {
  easyAsync.start(work.X)
  .and(work.Y)
  .and(work.Z)
  .then(function() {
    console.log('continuing after X, Y, Z in parallel');
    startNextSeries(); // passes control on to next example
  });
}









/////////////////////////////////////////
// 3 tasks in series - wrapped functions
/////////////////////////////////////////
function startNextSeries() {
  var user;
  easyAsync.start(function(callback) {
    work.I(callback);
  })
  .then(function(callback) {
    work.J(function(err, u){
      if (err) { return callback(err); }
      user = u;
      callback();
    });
  })
  .then(function(callback) {
    work.K(user, function(){
      callback(new Error('example error'));
    });
  })
  .then(function() {
    console.log('this point will not be reached because of preceeding errors');
  })
  .onError(function(err){
    if (err){
      // ... handle error - which error?
    }
    console.log('continuing after I, J, K in series');
  })
  ;
}


