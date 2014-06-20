//http://smodcast.com/channels/smodcast/feed/
//http://www.gamerswithjobs.com/taxonomy/term/408/0/feed
//0
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
      "click .groupName" : "slideMenu",
      "click .deleteGroup" : "deleteGroup"
    },
  
    template: _.template(html),
    
    initialize: function() {
      this.userName = location.hash.split("/")[1];
      var that = this;
    
      //$("#main").empty();
      $("#main").html(this.template);
        jQuery.ajax({
              type: "POST",
              url: "backend/init.php",
              dataType: 'json',
              data: {functionname: 'getElems', arguments: ["null", this.userName, "null", "groups"]},
              success: function (data) {
                that.updateUI(data); 
                console.log("getElems");            
             }
      });//end ajax
      
    },
    render: function(data){
    },
    updateUI: function(data){
      console.log(data);

      var that = this;
      this.groupTemp =  _.template(groupsTemp),

      _.each(data, function(value, key){
        temp = _.template(htmlT, {link: value});
        $(".links").append(temp);
      });
      $(".groupitem").draggable({
           revert : function(event, ui) { 
           if(event){
            var append = event[0].children[1],
                toDelete = $(this).data("link"); //toDelete is link
                console.log(toDelete);
            $(append).append("<p>"+toDelete+"</p>");
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
              success: function(){
                console.log("getGroups");
              }
        })).then(function(data){
           _.each(data[0], function(value){
                     that.groupTemp =  _.template(groupsTemp, {data: value});
               $(".savedLinks").after(that.groupTemp); 
          });//end each*/
          _.each(data[1], function(value, key){
            dropDownTemp = _.template(dropDownGroup, {value: value});
              var link = value.links,
                  group = value.GroupName,
                  target = $(".groupWrapper").children("."+group),
                  Ttarget = target.parents(),
                  rTarget = Ttarget[0];
                  if(group !== null){
                      $(rTarget).append(dropDownTemp);
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
                    success: function(){
                      console.log("addToGroup");
                    }
                });//end aja
              }//end drop
          });//end dropable
        }); //end then
    },
    delete: function(){
      var that = this;
      $("input[type=checkbox]:checked").each(function(key, value) {
            $(value).parent()[0].remove();
             var dataValue = $(value).data("link");
              $.ajax({
                type: "POST",
                url: "backend/init.php",
                dataType: 'json',
                data: {functionname: 'deleteDB', arguments: [dataValue, that.userName, "null", "delete"]},
                success: function(){
                  console.log("delete");
                }
              });//end ajax
      });//end each input 
    },//end delete
    createGroup: function(e){
      e.preventDefault();
      var text = $(".createGroupInput").val(),
          that = this;
      var dropDownTemp = _.template(groupsTemp, {data: text});
      $(".groups").after(dropDownTemp);
      $( ".groupWrapper" ).droppable({ 
              greedy: true,
              drop: function(event, ui){
                var addtoGroup = event.target.children[0].classList[1],
                    item = ui.draggable[0],
                    dataLink = $(item).data("link"),
                    droppedTarget = event.target;
                    $(droppedTarget).append(dataLink);//fix this
                $.ajax({
                    type: "POST",
                    url: "backend/init.php",
                    dataType: 'json',
                    data: {functionname: 'addToGroup', arguments: [addtoGroup, that.userName, that.LinkToAdd, "addToGroup"]},
                    success: function(){
                      console.log("addToGroup");
                    }
                });//end aja
              }//end drop
          });//end dropable
       $.ajax({
              type: "POST",
              url: "backend/init.php",
              dataType: 'json',
              data: {functionname: 'createGroup', arguments: ["null", this.userName, "null", "createGroup", text]},
              success: function(){
                console.log("createGroup");
              }
      });
    },
    slideMenu: function(e){
     var t = $(e.target).siblings()[0];
     $(t).slideToggle();
    },
    deleteGroup: function(e){
      var data = $(".groupName input:checked"),
          dataArray = [],
          that = this;
          this.linkArray = []; 
      _.each(data, function(value, key){
          dataArray.push($(value).data("group"));

      });
      _.each(dataArray, function(value, key){
         var group = $("."+value).siblings()[0],
            groupPara = $(group).find("p");
            _.each(groupPara, function(value, key){
              that.linkArray.push(value.innerText);
              linksTemp = _.template(htmlT, {link: value.innerText});
              $(".links").append(linksTemp);
                $(".groupitem").draggable({
                     revert : function(event, ui) { 
                     if(event){
                      var append = event[0].children[1],
                          toDelete = $(this).data("link"); //toDelete is link
                          console.log(toDelete);
                      $(append).append("<p>"+toDelete+"</p>");
                      $('.groupitem').filter('[data-link="'+toDelete +'"]').remove();
                     } 
                      return !event;
                    },//end revert
                    start: function(event, ui){
                      that.LinkToAdd = $(event.currentTarget).children("input").data("link");
                    }
                });//end drag
            });
           $.ajax({
              type: "POST",
              url: "backend/init.php",
              dataType: 'json',
              data: {functionname: 'deleteGroup', arguments: [value, that.userName, "null", "deleteGroup"]},
              success: function(){
              }
            });//end ajax*/
      });//end each*/
      _.each(that.linkArray, function(value, key){
        $.ajax({
              type: "POST",
              url: "backend/init.php",
              dataType: 'json',
              data: {functionname: 'updateGroup', arguments: [value, that.userName, "null", "updateGroup"]},
              success: function(){
                console.log("updateGroup");
              }
            });//end ajax
      });      
      _.each(dataArray, function(value, key){
       $("."+value).parent().remove();
     });
    },//end delete group
    getGroups: function(){

    }
  });

  return MainView;
});