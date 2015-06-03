'use strict';

var work = require('./mock-work');


/////////////////////////////////////////
// 3 tasks in series - pyramid of doom
/////////////////////////////////////////

work.A(function(){
  work.B(function(){
    work.C(function(){
      console.log('continuing after A, B, C in series');
      workOnI();  // passes control on to next example
    });
  });
});






///////////////////////////////////////////////////////
// 3 tasks in series - less nesting, taks still coupled
///////////////////////////////////////////////////////


function workOnI(){ work.I(workOnJ); }
function workOnJ(){ work.J(workOnK); }
function workOnK(){
  work.K(function(){
    console.log('continuing after I, J, K in series');
    startParallelWork();  // pass control on to next example
  });
}



///////////////////////////////////////////////////////
// 3 tasks in parallel - with custom logic to continue
///////////////////////////////////////////////////////


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
    //do we continue?
    if (doneWithWork.X && doneWithWork.Y && doneWithWork.Z){
      console.log('continuing after X, Y, Z in parallel');
    }
  }
}
