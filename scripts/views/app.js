define(['jquery', 'underscore', 'backbone', 'views/main.view'], function
	(
	$,
	_,
	Backbone,
  main

	)  {
  var App = Backbone.View.extend({
    initialize: function() {
    this.main = new main();
    },
    render: function(){

    }
  });

  return App;
});