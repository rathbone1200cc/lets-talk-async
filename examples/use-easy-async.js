'use strict';

var work = require('./mock-work');
var easyAsync = require('easy-async');



/////////////////////////////////////////
// 3 tasks in series
/////////////////////////////////////////

easyAsync.start(work.A)
.then(work.B)
.then(work.C)
.then(function() {
  console.log('continuing after I, J, K in series');
  startNextSeries(); // passes control on to next example
});







/////////////////////////////////////////
// 3 tasks in series - wrapped functions
/////////////////////////////////////////

function startNextSeries() {
  easyAsync.start(function(callback) {
    work.I(callback);
  })
  .then(function(callback) {
    work.J(callback);
  })
  .then(function(callback) {
    work.K(callback);
  })
  .then(function() {
    console.log('continuing after I, J, K in series');
    startParallelWork(); // passes control on to next example
  });
}





/////////////////////////////////////////
// 3 tasks in parallel - notice the "and"
/////////////////////////////////////////


function startParallelWork() {
  easyAsync.start(function workOnX(callback) {
    work.X(callback);
  })
  .and(function workOnY(callback) {
    work.Y(callback);
  })
  .and(function workOnZ(callback) {
    work.Z(callback);
  })
  .and(continueAfterParallelWork);
}

function continueAfterParallelWork() {
  console.log('continuing after X, Y, Z in parallel');
}
