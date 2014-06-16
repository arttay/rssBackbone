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
  "text!templates/groupTemp.html",
  "text!templates/dropDownGroup.html",

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
  htmlT,
  groupsTemp,
  dropDownGroup
	)  {
  var MainView = Backbone.View.extend({
    el: $('body'),
     events: {
      "click .createGroupSub" : "createGroup",
      "click .deleteLink" : "delete",
      "click .groupName" : "slideMenu"
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
                       console.log(data);
                that.updateUI(data);             
             }
      });//end ajax
      
    },
    render: function(data){
    },
    updateUI: function(data){

      var that = this;
      this.groupTemp =  _.template(groupsTemp),

      _.each(data, function(value, key){
        temp = _.template(htmlT, {link: value});
        $(".links").append(temp);
      });

      $(".groupitem").draggable({
           revert : function(event, ui) { 
           if(event){
            var toDelete = $(this).data("link");
            //that.LinkToAdd = toDelete;
            $('.groupitem').filter('[data-link="'+toDelete +'"]').remove();
           } 
            return !event;
          },//end revert
          start: function(event, ui){
            that.LinkToAdd = $(event.currentTarget).children("input").data("link");
          }
      });//end drag
          
        $.when($.ajax({
              type: "POST",
              url: "backend/init.php",
              dataType: 'json',
              data: {functionname: 'getGroups', arguments: ["null", this.userName, "null", "getGroups"]},
      })).then(function(data){
          
           _.each(data[0], function(value){
                     that.groupTemp =  _.template(groupsTemp, {data: value});
                    $(".savedLinks").after(that.groupTemp); 
          });//end each
        
          _.each(data[1], function(value, key){
            dropDownTemp = _.template(dropDownGroup);
              var link = value.links,
                  group = value.GroupName,
                  target = $(".groupWrapper").children("."+group);
                  if(group !== null){
                    $(Ttarget).append(dropDownTemp);
                  }
          });//end each
          _.each($(".groupWrapper"), function(value, key){
             $(value).children("p").wrapAll("<div class='groupDropDown'></div>");
          });
          $( ".groupWrapper" ).droppable({ 
              greedy: true,
              drop: function(event, ui){
                var addtoGroup = event.target.children[0].classList[1];
                $.ajax({
                    type: "POST",
                    url: "backend/init.php",
                    dataType: 'json',
                    data: {functionname: 'addToGroup', arguments: [addtoGroup, that.userName, that.LinkToAdd, "addToGroup"]},
                });//end aja
              }//end drop
          });//end dropable
        }); //end then
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
              data: {functionname: 'createGroup', arguments: ["null", this.userName, "null", "createGroup", text]}
      });
    },
    slideMenu: function(e){
     var t = $(e.target).siblings()[0];
     $(t).slideToggle();
    }
  });

  return MainView;
});