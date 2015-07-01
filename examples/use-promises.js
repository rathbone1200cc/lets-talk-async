'use strict';

var q = require('q');
var work = require('./mock-work');


function makeItAPromise(fn) {
  return q.Promise(function(resolve, reject) {
    fn(function(err, arg) {
      if (err) {
        reject(err);
      }
      else {
        resolve(arg);
      }
    });
  });
}





/////////////////////////////////////////
// 3 tasks in series - chain of promises
/////////////////////////////////////////

var promise =
  makeItAPromise(work.A)
  .then(function() {
    return makeItAPromise(work.B);
  })
  .then(function() {
    return makeItAPromise(work.C);
  })
  .then(function() {
    console.log('continuing after A,B,C in series');
    startParallelWork(); // passes control on to next example
  });












/////////////////////////////////////////
// 3 tasks in parallel with promises
/////////////////////////////////////////

function startParallelWork() {
  q.all([
      makeItAPromise(work.X),
      makeItAPromise(work.Y),
      makeItAPromise(work.Z)
    ])
    .then(continueAfterParallelWork);
}

function continueAfterParallelWork() {
  console.log('continuing after X, Y, Z in parallel');
  startNextSeries();
}











///////////////////////////////////////////////////////
// 3 tasks in series - with arguments & error handling
///////////////////////////////////////////////////////

function startNextSeries(){

  var promise =
    makeItAPromise(work.I)
    .then(
      function(somethingReturnedByI) {
        return makeItAPromise(work.J);
      },
      function(errorFromI){
        // ... handle error from I.
        // doesn't move on to J
      }
    )
    .then(
      function(user) {
        //actually use something returned by task J in task K
        return makeItAPromise(function(callback){
          work.K(user, callback);
        });
      },
      function(errorFromJ) {
        // ... handle error from J.
        // does move on to K
        return makeItAPromise(work.K);
      }
    )
    .then(function() {
      console.log('continuing after I,J,K in series');
    });
}








