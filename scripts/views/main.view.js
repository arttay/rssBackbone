//http://smodcast.com/channels/smodcast/feed/
//http://www.gamerswithjobs.com/taxonomy/term/408/0/feed
define(['jquery', 
  'underscore', 
  'backbone', 
  'collections/main.collection', 
  "rss",
  "rssHelper",
  "text!templates/itemTemp.html",
  "text!templates/main.html",
  "text!templates/entryTemplate.html",
  "text!templates/layoutTemplate.html",
  "text!templates/previousRss.html",
  "text!templates/phpTemp.php",

  ], function
	(
	$,
	_,
	Backbone,
  collection,
  rss,
  rssHelper,
  html,
  mainHtml,
  entryTemplate,
  layoutTemplate,
  previousRss,
  phpTemp
	)  {
  var MainView = Backbone.View.extend({
    el: $('body'),
     events: {
        "click .sub" : "formSub",
        "click .itemObject" : "slideSection",
        "click .previousRss li" : "previousItem"
    },
    template: _.template(html),
    mainTemplate: _.template(mainHtml),
    phpTemp: _.template(phpTemp),
    initialize: function() { 
      this.userName = location.hash.split("/")[1];
      this.render();
    },
    render: function(data){
      $("#main").html(this.mainTemplate());


    },
    formSub: function(e){
      var that = this;
      e.preventDefault();
      var feedUrl = $(".text").val(),
          userName = this.userName,
          userPass = "626292art",
          userInfo = [feedUrl, userName, userPass];
        if(rssHelper.get(userName) !== null) {   
          //that.setPreviousItems(rssHelper.get(userName));
        }
      this.setUserInfo(userInfo);
      this.getRss(feedUrl);
      jQuery.ajax({
              type: "POST",
              url: "backend/init.php",
              dataType: 'json',
              data: {functionname: 'connectDb', arguments: [feedUrl, userName, userPass, "insert"]},
              success: function (data) {
                console.log(data);               
             }
      });
    },
    getRss: function(feedUrl){
      $("#feedData").empty();
      $("#feedData").rss(feedUrl, {
            layoutTemplate: layoutTemplate,
            entryTemplate: entryTemplate,
            outputMode: 'json_xml',
            xmlParseElem: "enclosure",
            limit: 10,
            error: function(){
              $("#feedData").html("<p class='feedError'>It looks like there was an error with the feed url, could you take a look at it.</p>")
            },
      });   
      this.previousRss = _.template(previousRss, {feedUrl: feedUrl});
      if($(".previousRss").children().length >= 5){
        $(".previousRss li:last-child").remove();
      }
      $(".previousRss").prepend(this.previousRss); 
    },
    slideSection: function(e){
      var parent = $(e.currentTarget)[0];
      var nextSib = $(parent).next()[0];
      $(nextSib).slideToggle("slow");
    },
    setUserInfo: function(data){
      var feedUrl = data[0],
          userName = data[1],
          userPass = data[2];
      if(rssHelper.get(userName) == null){
        rssHelper.set(userName, feedUrl);
      } else {
        var storedName = rssHelper.get(userName),
            itemsArray =[],
            splitItem = storedName.split(",");
            _.each(splitItem, function(value){
              itemsArray.push(value);
            });
            itemsArray.push(feedUrl);
            rssHelper.remove(userName);
            rssHelper.set(userName, itemsArray);
      }//end if else
    },
    previousItem: function(e){
      e.preventDefault();
      var clicked = e.currentTarget.innerText;
      this.getRss(clicked);
    }
  });

  return MainView;
});