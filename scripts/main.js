/*require.config({
  paths: {
    'jquery': 'vendor/jquery/jquery',
    'underscore': 'vendor/underscore/underscore',
    'backbone': 'vendor/backbone/backbone',
  }
});*/


require.config({
  shim: {
    "underscore": {
      exports: '_'
    },
    "backbone": {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    "ui": {
            deps: ['jquery']
    },
    "rss": {
            deps: ['jquery']
    },
    "rssHelper": {
            deps: ['jquery']
    },
  },
  paths: {
    jquery: "vendor/jquery/jquery",
    ui: "http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min",
    underscore: "vendor/underscore/underscore",
    backbone: "vendor/backbone/backbone",  
    templates: "templates/",
    views: "views/",
    controllers: "controllers/",
    collections: "collections/",
    models: "models",
    toJson: "helpers/xmlToJson",
    rss : "helpers/rss",
    rssHelper: "helpers/rssHelper",

  }

});


require(['views/app'], function(AppView) {
  new AppView({ el: "#art" });
});
