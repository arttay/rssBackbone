var http = require('http');
		exports.method1=function(){

          }

        exports.method2=function(){

          }

         exports.method3=function(){
         	console.log("kjdfhg");
         }



socket.on("callMethod", function(data) {
    if(data["methodName"] == "method3") {
        exports.method3();
    }
});

app.listen(3000);