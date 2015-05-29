'use strict';

var work = require('./mock-work');

work.A(_);
work.B(_);
work.C(_);
console.log('continuing after A, B, C in series');

startNextSeries(function(){
  startParallelWork(continueAfterParallelWork);
});

function startNextSeries(_){
  work.I(_);
  work.J(_);
  work.K(_);
  console.log('continuing after I, J, K in series');
}

function startParallelWork(_){
  [
    work.X,
    work.Y,
    work.Z
  ].map_(_, 3, function(_, fn){
    return fn(_);
  });
}

function continueAfterParallelWork(){
  console.log('continuing after X, Y, Z in parallel');
}
