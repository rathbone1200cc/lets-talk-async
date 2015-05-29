'use strict';

var work = require('./mock-work');
var easyAsync = require('easy-async');

easyAsync.start(work.A)
.then(work.B)
.then(work.C)
.then(startNextSeries);

function startNextSeries(){
  easyAsync.start(function workOnI(callback){ work.I(callback); })
  .then(function workOnJ(callback){ work.J(callback); })
  .then(function workOnK(callback){ work.K(callback); })
  .then(function(){
    console.log('continuing after I, J, K in series');
    startParallelWork();
  });
}

function startParallelWork(){
  easyAsync.start(function workOnX(callback){ work.X(callback); })
  .and(function workOnY(callback){ work.Y(callback); })
  .and(function workOnZ(callback){ work.Z(callback); })
  .and(continueAfterParallelWork);
}

function continueAfterParallelWork(){
  console.log('continuing after X, Y, Z in parallel');
}

