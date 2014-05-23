define(['jquery', 'underscore', 'backbone', 'views/main.view', "router/router"], function
	(
	$,
	_,
	Backbone,
  main,
  Router

	)  {
  var App = Backbone.View.extend({
    initialize: function() {
      Router.initialize();
    //this.main = new main();
    },
    render: function(){

    }
  });

  return App;
});