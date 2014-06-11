
define([
  'jquery',
  'underscore',
  'backbone',
  "views/main.view",
  "views/groups.view"
], function ($,
 			_, 
 			Backbone,
 			main,
 			groups
 			) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Pages
      'main/:userName': 'main',
      'groups/:userName' : 'groups',
 
 
    }
  });
 
  var initialize = function(options, userName){
   // var appView = options.appView;
  console.log(options);
  console.log(userName);
    var router = new AppRouter(options);
    router.on('route:main', function () {
    	this.main = new main();
    
     
    });
     router.on('route:groups', function () {
     	this.groups = new groups();
    	
     
    });
   
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});      