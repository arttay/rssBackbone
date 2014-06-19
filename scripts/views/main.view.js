//http://smodcast.com/channels/smodcast/feed/
//http://www.gamerswithjobs.com/taxonomy/term/408/0/feed
//http://onelifeleft.libsyn.com/rss
define(['jquery', 
  'underscore', 
  'backbone', 
  'collections/main.collection', 
  "rss",
  "rssHelper",
  "async",
  "text!templates/itemTemp.html",
  "text!templates/main.html",
  "text!templates/entryTemplate.html",
  "text!templates/layoutTemplate.html",
  "text!templates/previousRss.html",
  "text!templates/phpTemp.php",
  "text!templates/main/mainGroups.html"
  ], function
	(
	$,
	_,
	Backbone,
  collection,
  rss,
  rssHelper,
  async,
  html,
  mainHtml,
  entryTemplate,
  layoutTemplate,
  previousRss,
  phpTemp,
  groupTemp
	)  {
  var MainView = Backbone.View.extend({
    el: $('body'),
     events: {
        "click .sub" : "formSub",
        "click .itemObject" : "slideSection",
        "click .previousRss li" : "previousItem",
        "click .groups ul li" : "groupsNav",
        "randomevent": "testCall",
    },
    template: _.template(html),
    mainTemplate: _.template(mainHtml),
    phpTemp: _.template(phpTemp),
    initialize: function() { 
      
     
      this.userName = location.hash.split("/")[1];
      this.render();
      this.loadGroups();
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
      $.ajax({
              type: "POST",
              url: "backend/init.php",
              dataType: 'json',
              data: {functionname: 'connectDb', arguments: [feedUrl, userName, userPass, "insert"]},
              success: function (data) {
                console.log(data);               
             }
      });//end ajax
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
    },
    loadGroups: function(){
      var that = this;
       $.ajax({
              type: "POST",
              url: "backend/init.php",
              dataType: 'json',
              data: {functionname: 'getGroups', arguments: ["null", this.userName, "null", "getGroups"]},
              success: function (data) {
                if(data[0] !== 0) {  
                  that.domGroups(data);   
                } else {

                } //end if else       
             }//end success
        });
    },
    domGroups: function(data){
 
      var that = this;
      that.d = $.Deferred();
      that.de = $.Deferred();
      that.feedDates = [];
      that.itemsLen = data[1].length - 1;
      groupTemp = _.template(groupTemp, {data: data[0]});

      //dynamicGroup
      _.each(data[0], function(value){
          $(".dynamicGroup").append("<div class='"+value +"Group groupContent'></div>");
      });


      $(".dynamicGroupHeader").append(groupTemp); 
     $(".groups ul li:first-child").addClass("active");
     

      that.d.done(function(){
        that.sortDate(that.feedDates);
      });
      $(data[1]).each(function(key, value){
        that.whenAjax(value, key);
      });
    },
    whenAjax: function(data, key){

      var that = this,
          feed = new google.feeds.Feed(data.links),
          groupName = data.GroupName;
          feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
         

          feed.load(function(data) {
            var xmlInnerHtml = data.xmlDocument.children[0].innerHTML,
                enclose = $(xmlInnerHtml).find("enclosure"),
                url = $(enclose)[0].getAttribute("url"),
                entries = data.feed.entries;
        
            _.each(entries, function(value, key){
              var item = new Object();
                  item.date = value.publishedDate;
                  item.title = value.title;
                  item.description = value.content;
                  item.link = value.link;
                  item.group = groupName;
                  item.url = $(enclose)[key].getAttribute("url");
             
                  if(item.group !== "null"){
                     that.feedDates.push(item);
                  }
             
            });
            if(key == that.itemsLen){
              return that.d.resolve();  
            }
          });//end feed load
    },
    groupsNav: function(e){
      var clicked = e.target.classList.length,
          that = this,
          activeGroup = $(".active")[0].classList[0].split("Header")[0];
   

          
      if(clicked == 2) {
      } else {
        var currentTarget = e.target.classList[0].split("Header")[0];
        $(".active").removeClass("active");
        $("."+activeGroup+"Group").css("display", "none");
        $(e.target).addClass("active");
        $("."+currentTarget+"Group").css("display", "block");
      }//end else 
    },//end groupnac
    sortDate: function(data){
      var that = this,
          activeGroup = $(".active")[0].classList[0].split("Header")[0];
          that.dateArray = [];

      _.each(data, function(value, key){
          var date = value.date,
              formatedDate = new Date(date),
              newDate = Date.parse(formatedDate);
              value.date = formatedDate;
          that.dateArray.push(value);
      }); 
       var sortDate = _.sortBy(this.dateArray, 'date'); 
       _.each(sortDate, function(value, key){
           $("."+value.group+"Group").append(that.template(value));
       });
       $("."+activeGroup+"Group").css("display", "block");


       
       
    
    },
    clickLoadGroup: function(){

    }
  });

  return MainView;
});

