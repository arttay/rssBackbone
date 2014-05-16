define(['jquery', 'underscore', 'backbone', 'collections/main.collection', "text!templates/itemTemp.html"], function
	(
	$,
	_,
	Backbone,
  collection,
  html

	)  {
  var MainView = Backbone.View.extend({
    el: "#art",
     events: {
        // nothing dotdotdot

    },
    template: _.template(html),
    initialize: function() {
      var that = this;
       localStorage.removeItem("pre");
      this.collection = new collection();
      this.collection.fetch({
        success: function(data){
          var data = data.models;
          that.render(data);
        }
      })
  
   
    },
    flip: function(e){
      console.log("arte");
    },
    render: function(data){
      var that = this;
     _.each(data, function(value, key){
      
      $("#art").append(that.template(value.attributes));
     });

     $('.flip').click(function(e){
          that.audioItem(e);
    
        $(this).find('.card').toggleClass('flipped');

        return false;
    });


    },
    otherFlip: function(){
      console.log(localStorage.getItem("pre"));
    },
    audioItem: function(e){
      var triggerName = e.currentTarget.classList[2],
          triggerState = e.currentTarget.classList[3],
          that = this,
          previousCard = $(e.currentTarget).find(".card"),
          triggers = [triggerName, triggerState, $(previousCard.context)[0].className];
 
         
          if(localStorage.getItem("pre") !== null){
            var localItem = localStorage.getItem("pre"),
                localName = localItem.split(",")[0],
                localState = localItem.split(",")[1];
                previousCard = localItem.split(",")[2],
                previousClass = previousCard.split(" ")[2],
                previousClassFlip = $("."+previousClass).parents(".card");
              /*  if($(previousClassFlip).hasClass("flipped")){
                   $(previousClassFlip).removeClass("flipped");
                }*/
                

                localStorage.removeItem("pre");
                this.pause(localState, localName);
                
          } 
          localStorage.setItem("pre", triggers);
          // console.log($(e.currentTarget).find(".card"));
          




      if(triggerState == "play"){
        this.play(triggerState, triggerName);
        
      }
      else {
        this.pause(triggerState, triggerName);
      }
    },
    play: function(triggerState, triggerName){
    

      $("."+ triggerName).trigger("play");
      $("."+ triggerName).removeClass(triggerState).addClass("pause")
    },
    pause: function(triggerState, triggerName){
      

      $("."+ triggerName).trigger("pause");
      $("."+ triggerName).removeClass(triggerState).addClass("play")
    }
  });

  return MainView;
});