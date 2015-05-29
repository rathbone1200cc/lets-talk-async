'use strict';

var work = require('./mock-work');

work.A(_);
work.B(_);
work.C(_);
console.log('continuing after A, B, C in series');

startNextSeries(startParallelWork);

function startNextSeries(_){
  work.I(_);
  work.J(_);
  work.K(_);
  console.log('continuing after I, J, K in series');
}

function startParallelWork(){
  [
    work.X,
    work.Y,
    work.Z
  ].map(function(fn){
    return fn();
  });

  continueAfterParallelWork();
}

function continueAfterParallelWork(){
  console.log('continuing after X, Y, Z in parallel');
}
