<?php


  if(isset($_POST['functionname']) ) { 
      $feed = $_POST['arguments'][0];
      $userName = $_POST['arguments'][1];
      $userPass = $_POST['arguments'][2];
      $state = $_POST['arguments'][3];
      if(isset($_POST['arguments'][4])){
         $groupName = $_POST['arguments'][4];
      }
     





      switch($state) {
        case "insert": 
              connectDb($feed, $userName, $userPass);
          break;
        case "groups": 
              getElems($userName);
          break;
        case "delete":
              deleteDB($feed);
          break;
        case "createGroup":
              createGroup($userName, $groupName, $feed);
          break;
      }
      /*
      if($state == "insert"){
          connectDb($feed, $userName, $userPass);  
      }
      if($state == "groups") {
        getElems($userName);
      }
      */


    }//end init inint
  function connectDb($feed, $userName, $userPass){
    include_once "database/connect.php";
     echo json_encode($userName);
     echo json_encode($groupName);
  }
  function getElems($userName){
    include_once "database/find.php";
    echo json_encode($myArray);
  }
  function deleteDB($feed) {
    include_once "database/delete.php";
  }
  function createGroup($userName, $groupName, $feed) {
    include_once "database/createGroup.php";
  }


?>