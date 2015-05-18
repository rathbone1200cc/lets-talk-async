'use strict';

var _ = require('lodash');
var work = require('./mock-work');

work.A(function(){
  work.B(function(){
    work.C(function(){
      console.log('continuing after A, B, C in series');
      workOnI();
    });
  });
});

function workOnI(){
  work.I(workOnJ);
}
function workOnJ(){
  work.J(workOnK);
}
function workOnK(){
  console.log('continuing after I, J, K in series');
  startParallelWork();
}

function startParallelWork(){
  var doneWithWork = {};
  work.X(function(){
    doneWithWork.X = true;
    continueAfterParallelWork();
  });
  work.Y(function(){
    doneWithWork.Y = true;
    continueAfterParallelWork();
  });
  work.Z(function(){
    doneWithWork.Z = true;
    continueAfterParallelWork();
  });

  function continueAfterParallelWork(){
    if (doneWithWork.X && doneWithWork.Y && doneWithWork.Z){
      console.log('continuing after X, Y, Z in parallel');
    }
  }
}
