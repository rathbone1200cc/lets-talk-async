'use strict';

var work = require('./mock-work');



////////////////////////////////////////////
// 3 tasks in series - looks like sync code
///////////////////////////////////////////

work.A(_);
work.B(_);
work.C(_);
console.log('continuing after A, B, C in series');

// passes control on to next example
startParallelWork(_);
//alternateParallelWork(_);

console.log('continuing after X, Y, Z in parallel');

// passes control on to next example
startNextSeries(_);










///////////////////////////////////////////
// 3 tasks in parallel - using special map_
///////////////////////////////////////////


function startParallelWork(_){  // <- the _ is required
  [
    work.X,
    work.Y,
    work.Z
  ].map_(_, 3, function(_, fn){
    return fn(_);
  });
}

function alternateParallelWork(_){  // <- the _ is required
  var fX = work.X(!_);
  var fY = work.Y(!_);
  var fZ = work.Z(!_);
  return [fX(_), fY(_), fZ(_)];
}











///////////////////////////////////////////////////
// 3 tasks in series - handling arguments & errors
///////////////////////////////////////////////////

function startNextSeries(_){
  var resultOfI = work.I(_);
  work.J(resultOfI, _);
  try {
    work.K(_);
  }
  catch(err){
    //... handle error
  }
  console.log('continuing after I, J, K in series');
}







