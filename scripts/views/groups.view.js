//http://smodcast.com/channels/smodcast/feed/
//http://www.gamerswithjobs.com/taxonomy/term/408/0/feed
define(['jquery', 
  'underscore', 
  'backbone',
  "ui", 
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
  ui,
  collection,
  rss,
  rssHelper,
  html,
  htmlT
	)  {
  var MainView = Backbone.View.extend({
    el: $('body'),
     events: {
      "click .createGroupSub" : "createGroup",
      "click .deleteLink" : "delete"
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
        $(".links").append(temp);
      });

      $(".groupitem").draggable({
           revert : function(event, ui) {
           if(event){
            var toDelete = $(this).data("link");
            $('.groupitem').filter('[data-link="'+toDelete +'"]').remove();
           }
            $(this).data("uiDraggable").originalPosition = {
                top : 0,
                left : 0
            };
            return !event;
          }
      });//end drag
      $( ".groups" ).droppable();//end drop
    },
    delete: function(){
      $("input[type=checkbox]:checked").each(function(key, value) {
            $(value).parent()[0].remove();
             var dataValue = $(value).data("link");
              $.ajax({
                type: "POST",
                url: "backend/init.php",
                dataType: 'json',
                data: {functionname: 'deleteDB', arguments: [dataValue, "null", "null", "delete"]},
              });//end ajax
      });//end each input 
    },//end delete
    createGroup: function(e){
      e.preventDefault();
      var text = $(".createGroupInput").val();
     $(".groups").append(text);

     
       jQuery.ajax({
              type: "POST",
              url: "backend/init.php",
              dataType: 'json',
              data: {functionname: 'createGroup', arguments: ["null", this.userName, "null", "groups", text]},
              success: function (data) {
                that.updateUI(data);             
             }
      });

    }
  });

  return MainView;
});