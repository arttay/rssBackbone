/*require.config({
  paths: {
    'jquery': 'vendor/jquery/jquery',
    'underscore': 'vendor/underscore/underscore',
    'backbone': 'vendor/backbone/backbone',
  }
});*/


require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  },
  paths: {
    jquery: "vendor/jquery/jquery",
    underscore: "vendor/underscore/underscore",
    backbone: "vendor/backbone/backbone",  
    templates: "templates/",
    views: "views/",
    controllers: "controllers/",
    collections: "collections/",
    models: "models",
  }

});


require(['views/app'], function(AppView) {
  new AppView({ el: "#art" });
});
