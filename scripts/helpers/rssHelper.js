define(["jquery"], function($) {
    "use strict";
     var rssHelper = {};
  
     rssHelper.set = function(name, data) {
     localStorage.setItem(name, data);
     },
     rssHelper.get = function(data){
     	var item = localStorage.getItem(data);
		    return item;
     },
     rssHelper.remove = function(key){
     	localStorage.removeItem(key);
     }
     return rssHelper;
});
