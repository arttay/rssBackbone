define(['jquery', 'underscore', 'backbone', 'collections/main.collection', "text!templates/itemTemp.html"], function
	(
	$,
	_,
	Backbone,
  collection,
  html

	)  {
  var MainView = Backbone.View.extend({
    el: $('body'),
     events: {
        "click .sub" : "formSub"
    },
    template: _.template(html),
    initialize: function() {

    },
 
    render: function(data){
 
    },
    formSub: function(e){
      console.log("sub");
      var that = this;
      e.preventDefault();
      var feedUrl = $(".text").val();
        //storage.set(feedUrl);
      jQuery.ajax({
          type: "POST",
          url: 'api/audioApi.php',
          data: {functionname: 'getUrl', arguments: [feedUrl]},
          success: function (data) {
            that.setup(data);
                      
                  },//end sucess
          error: function(data){
            console.log(data);

          }

      });

    },
    setup: function(data){
      var that = this;
        //console.log(self.itemTemp);
      $("#feedData").empty();

    
      var parsed = JSON.parse(data),
        rss = parsed.rss.channel,
        rssTitle = rss.title,
        rssLink = rss.link,
        rssHtml = "<div class='previousItem'><a href="+ rssLink +" >"+rssTitle+"</a></div>";
          $(".previousRss").append(rssHtml);
          console.log(rss),
        start = 0,
        end = 10;
      

        $(rss.item).each(function(key, value){
          console.log(value);
         // var soundApi = value.enclosure;
          //console.log(soundApi.@url);
          if(key >= end){
            return;
          }
         console.log(value);
          /*var template = _.template(that.template, {
          title: value.title,
          link: value.link,
          description: value.description,

          });//end template*/


        $("#feedData").append(that.template(value));

        
        });
      /*_.each(rss.item, function(value, key){
        console.log(key);
        if(key == 10){
          return;
        }
        var template = _.template(self.itemTemp, {
          title: value.title,
          link: value.link,
          description: value.description,

        });
        $("#feedData").append(template);


      });*/
    }
  
  });

  return MainView;
});