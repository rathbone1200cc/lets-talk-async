'use strict';

var work = require('./mock-work');



////////////////////////////////////////////
// 3 tasks in series - looks like sync code
///////////////////////////////////////////

work.A(_);
work.B(_);
work.C(_);
console.log('continuing after A, B, C in series');

// next example could simply start here.

// passes control on to next example - confusing?
startNextSeries(function(){
  startParallelWork(continueAfterParallelWork);
});




/////////////////////////////////////////
// 3 tasks in series - nested in function
/////////////////////////////////////////

function startNextSeries(_){  // <- the _ is required
  work.I(_);
  work.J(_);
  work.K(_);
  console.log('continuing after I, J, K in series');
}







///////////////////////////////////////////
// 3 tasks in parallel - using special map_
///////////////////////////////////////////


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
