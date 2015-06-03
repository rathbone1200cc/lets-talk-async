'use strict';

var _ = require('lodash');

var letters = ['A', 'B', 'C', 'I', 'J', 'K', 'X', 'Y', 'Z'];

_.each(letters, function(letter){
  exports[letter] = function(callback){
    console.log(letter + letter + letter + ' work starting');
    setTimeout(function(){
      console.log( letter + letter + letter + ' work complete');
      if (callback){ callback(); }
    }, 1000);
  };
});
