//http://smodcast.com/channels/smodcast/feed/
define(['jquery', 
  'underscore', 
  'backbone', 
  'collections/main.collection', 
  "rss",
  "text!templates/itemTemp.html",
  "text!templates/entryTemplate.html",
  "text!templates/layoutTemplate.html",
  ], function
	(
	$,
	_,
	Backbone,
  collection,
  rss,
  html,
  entryTemplate,
  layoutTemplate
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
      var feedUrl = $(".text").val(),
          userName = "artthoo.com",
          userPass = "626292art",
          userInfo = [feedUrl, userName, userPass];
      this.setUserInfo(userInfo);

     
      $("#feedData").empty();
      $("#feedData").rss(feedUrl, {
            layoutTemplate: layoutTemplate,
            entryTemplate: entryTemplate,
            outputMode: 'json_xml',
            xmlParseElem: "enclosure",
      });     
    },
    get: function(data){
     var item = localStorage.getItem(data);
     return item;
    },
    set: function(name, data){
      localStorage.setItem(name, data);
    },
    remove: function(key){
      localStorage.removeItem(key);
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
      if(this.get(userName) == null){
          this.set(userName, feedUrl);

      } else {
        var storedName = this.get(userName),
            itemsArray =[],
            splitItem = storedName.split(",");
            _.each(splitItem, function(value){
              itemsArray.push(value);
            });
            itemsArray.push(feedUrl);
            this.remove(userName);
            this.set(userName, itemsArray);
     

      }//end if else
    }
  });

  return MainView;
});