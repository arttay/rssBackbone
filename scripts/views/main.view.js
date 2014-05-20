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

     

      $("#feedData").rss(feedUrl, {
            layoutTemplate: layoutTemplate,
            entryTemplate: entryTemplate,
            outputMode: 'json_xml',
            xmlParseElem: "enclosure",
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
          value.url = value.enclosure["@url"];
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
    },
    toJson: function(xml){
         var obj = {};
    if (xml.nodeType == 1) {                
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { 
        obj = xml.nodeValue;
    }            
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof (obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof (obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
    }

  
  });

  return MainView;
});