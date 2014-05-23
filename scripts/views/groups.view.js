//http://smodcast.com/channels/smodcast/feed/
//http://www.gamerswithjobs.com/taxonomy/term/408/0/feed
define(['jquery', 
  'underscore', 
  'backbone', 
  'collections/main.collection', 
  "rss",
  "rssHelper",
  "text!templates/groups.html",
  "text!templates/groupsItem.html",

  ], function
	(
	$,
	_,
	Backbone,
  collection,
  rss,
  rssHelper,
  html,
  htmlT
	)  {
  var MainView = Backbone.View.extend({
    el: $('body'),
     events: {
   
    },
  
    template: _.template(html),
    initialize: function() {
      this.userName = location.hash.split("/")[1];
      var that = this;
    
      $("#main").empty();
      $("#main").html(this.template);
        jQuery.ajax({
              type: "POST",
              url: "backend/init.php",
              dataType: 'json',
              data: {functionname: 'getElems', arguments: ["null", this.userName, "null", "groups"]},
              success: function (data) {
                that.updateUI(data);             
             }
      });



    },
 
    render: function(data){
 
    },
    updateUI: function(data){
      var that = this;

      _.each(data, function(value, key){
        temp = _.template(htmlT, {link: value});
        $(".savedGroups").append(temp);
      });
      

    }
   
  });

  return MainView;
});