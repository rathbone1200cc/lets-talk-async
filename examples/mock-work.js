'use strict';

var _ = require('lodash');

var letters = ['A', 'B', 'C', 'I', 'J', 'K', 'X', 'Y', 'Z'];

_.each(letters, function(letter){
  exports[letter] = function(callback){
    console.log('starting work on ' + letter);
    setTimeout(function(){
      console.log('done with work on ' + letter);
      if (callback){ callback(); }
    }, Math.random() * 500);
  };
});
