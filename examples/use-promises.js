'use strict';

var q = require('q');
var work = require('./mock-work');


function makeItAPromise(fn) {
  return q.Promise(function(resolve, reject) {
    fn(function(err) {
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
};


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
    startNextSeries(); // passes control on to next example
  });






/////////////////////////////////////////////////
// 3 tasks in series - double wrapped - readable?
/////////////////////////////////////////////////

function startNextSeries() {

  function makePromiseCallback(fn) {
    return function() {
      return makeItAPromise(fn);
    };
  }

  var pI = makePromiseCallback(work.I),
    pJ = makePromiseCallback(work.J),
    pK = makePromiseCallback(work.K);

  q.fcall(pI)
    .then(pJ)
    .then(pK)
    .then(function() {
      console.log('continuing after I, J, K in series');
      startParallelWork();  // passes control on to next example
    });
}







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
}
