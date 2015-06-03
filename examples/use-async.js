'use strict';

var async = require('async');
var work = require('./mock-work');

/////////////////////////////////////////
// 3 tasks in series
/////////////////////////////////////////

async.series([
  work.A,
  work.B,
  work.C
], function() {
  console.log('continuing after A, B, C in series');
  startNextSeries(); // passes control on to next example
});






/////////////////////////////////////////
// 3 tasks in series - with wrappers
/////////////////////////////////////////

function startNextSeries() {
  async.series([
    function(callback) {
      work.I(callback);
    },
    function(callback) {
      work.J(callback);
    },
    function(callback) {
      work.K(function(){
        callback(new Error('example error'));
      });
    }
  ], function(err) {
    console.log('continuing after I, J, K in series');
    startParallelWork(); // passes control on to next example
  });
}





/////////////////////////////////////////
// 3 tasks in paralllel
/////////////////////////////////////////

function startParallelWork() {
  async.parallel([
      work.X,
      work.Y,
      work.Z
    ],
    continueAfterParallelWork
  );
}

function continueAfterParallelWork() {
  console.log('continuing after X, Y, Z in parallel');
}
