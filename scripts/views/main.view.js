//http://smodcast.com/channels/smodcast/feed/
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
        "click .sub" : "formSub",
        "click .itemObject" : "slideSection"
    },
    template: _.template(html),
    initialize: function() {

    },
 
    render: function(data){
 
    },
    formSub: function(e){
      
      var that = this;
      e.preventDefault();
      var feedUrl = $(".text").val();
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
        start = 0;
        end = 10;
        $(rss.item).each(function(key, value){
          if(key >= end){
            return;
          }
         // console.log(value.enclosure["@url"]);
          value.url = value.enclosure["@url"];
          console.log(value);
        $("#feedData").append(that.template(value));
        });
    },
    get: function(data){
    
     var item = localStorage.getItem(data);
     return item;


    },
    set: function(name, data){
      localStorage.setItem(name, data);
    },
    slideSection: function(e){
      var parent = $(e.currentTarget)[0];
      console.log(parent);

    }
  
  });

  return MainView;
});