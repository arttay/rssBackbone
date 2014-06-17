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
  "text!templates/main/mainGroups.html",

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
      that.feedDates = [];
      groupTemp = _.template(groupTemp, {data: data[0]});
      $("#feedData").append(groupTemp);

      that.d.done(function(data){
        console.log(that.feedDates.length);
      });
      

      $(data[1]).each(function(key, value){
        that.whenAjax(value, key);
      }).promise().done( function(){
          //that.d.resolve();

      });


      /*
      _.each(data[1], function(value, key){
          that.whenAjax(value, key)
        }).done(function(){
          console.log("ldfhjg");
        });
*/

    },
    whenAjax: function(data, key){
      var that = this,
          feed = new google.feeds.Feed(data.links);
       

          feed.load(function(data) {

            var entries = data.feed.entries;
            _.each(entries, function(value, key){
              that.feedDates.push(value.publishedDate);
            });
         
              return that.d.resolve();  
          });//end feed load

  /*
      _.each(data[1], function(value, key){
        var feed = new google.feeds.Feed(value.links);
        feed.load(function(data) {
          var entries = data.feed.entries;
          _.each(entries, function(value, key){
            that.feedDates.push(value.publishedDate);
          });
          return d.resolve();  
        });//end feed load
      });//end each
     return de.resolve();  
     */


    },
    groupsNav: function(e){
      var clicked = e.target.classList.length;

      if(clicked == 1) {
        $(e.target).removeClass("active");
      } else {
        $(".active").removeClass("active");
        $(e.target).addClass("active");
      }//end else 
    },//end groupnac
    sortDate: function(data){
      var that = this;

     



      _.each(data, function(value, key){
        console.log(value);
          var date = value.publishedDate,
              formatedDate = new Date(value.publishedDate),
              newDate = Date.parse(formatedDate);
          that.dateArray.push(formatedDate);
      }); 

       var sortDate = _.sortBy(this.dateArray, function (name) {return name}); 
    
     

    },
    toDate: function(o){
          var parts = o.startDate.split('-');
          o.startDate = new Date(parts[0], parts[1] - 1, parts[2]);
          return o;
    },
    descStartTime: function(o){
       return -o.startDate.getTime();
    }
  });

  return MainView;
});

