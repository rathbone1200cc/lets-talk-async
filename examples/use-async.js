'use strict';

var async = require('async');
var work = require('./mock-work');

async.series([
  work.A,
  work.B,
  work.C
], function() {
  console.log('continuing after A, B, C in series');
  startNextSeries();
});

function startNextSeries() {
  async.series([
    function workOnI(callback) {
      work.I(callback);
    },
    function workOnJ(callback) {
      work.J(callback);
    },
    function workOnK(callback) {
      work.K(callback);
    }
  ], function() {
    console.log('continuing after I, J, K in series');
    startParallelWork();
  });
}

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
