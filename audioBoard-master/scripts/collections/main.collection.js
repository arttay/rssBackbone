define(['jquery', 'underscore', 'backbone', 'models/main.model'], function
	(
	$,
	_,
	Backbone,
	MainModel
	)  {
	var MainCollection = Backbone.Collection.extend({
            model: MainModel,
            initialize: function() {
            

              
            },
            sync: function(method, model, options){
            	   options.timeout = 10000;
   					 options.dataType = 'json';
   					 //options.jsonp = "jsonp";
   					 options.crossDomain = true;
   					  return Backbone.sync(method, model, options);

            },
            url: function(){
            	return "data/data.js";
            },
            parse: function(data){
                  var data = data;
                  var R = [];
                //  console.log(data);
                  _.each(data.items, function(value, key){
                     //   console.log(value);

                       R.push(value);
                  });
                  console.log(R);
                  return R;
            }
         
         
        });

	  return MainCollection;
});