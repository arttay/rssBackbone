<?php
/*
$link = mysqli_connect("localhost","root","","rss") or  die("A MySQL error has occurred.<br />Error: (" . mysql_errno() . ") " . mysql_error()."2");


$dataName = $userName."Data";
$result = mysql_query("SELECT userName FROM $dataName WHERE userName = '$userName'");


if($result !== false){ 
	if(mysql_num_rows($result) == 0) {
	 	$sql="INSERT INTO `rss`.`$dataName` (`userName`, `userPassword`, `userLinks`) VALUES ('$userName', '$userPass', '$feed')";
		mysqli_query($link, $sql);  
	} 
} else {
	$groupName = $userName."Groups";
    $groups = "CREATE TABLE IF NOT EXISTS `$groupName` (
    `GroupName` varchar(255) NOT NULL default '',
    `links` varchar(255) NOT NULL default ''
)";

    $data = "CREATE TABLE IF NOT EXISTS `$dataName` (
    `userName` varchar(255) NOT NULL default '',
    `userPassword` varchar(255) NOT NULL default '',
    `userLinks` varchar(255) NOT NULL default ''
)";


	
    mysqli_query($link, $groups)or die("A MySQL error has occurred.<br />Error: (" . mysql_errno() . ") " . mysql_error()."27");
    mysqli_query($link, $data)or die("A MySQL error has occurred.<br />Error: (" . mysql_errno() . ") " . mysql_error()."28");
    $sql="INSERT INTO `rss`.`$dataName` (`userName`, `userPassword`, `userLinks`) VALUES ('$userName', '$userPass', '$feed')";
		mysqli_query($link, $sql);  

    

}


mysqli_close($link);
*/



$link = mysqli_connect("localhost","root","");
if (!$link) {
    //if connection failed
} else {
        $db_selected = mysqli_select_db($link, $userName);
        if (!$db_selected) {
          $sql = "CREATE DATABASE `".$userName."`";
          if (mysqli_query($link, $sql)) {
              echo "Database my_db created successfully\n";
          } else {
              echo mysqli_error($link);
          }
           createGroups($link, $userName);
           previousLinks($link, $userName);
        }//end db select
}//end else 
insertFeed($feed, $userName, $link);


function createGroups($link, $userName){
   $db_select = mysqli_select_db($link, $userName);
              $groupName = $userName."Groups";
                  $groups = "CREATE TABLE IF NOT EXISTS `$groupName` (
                  `key` int NOT NULL auto_increment PRIMARY KEY,
                  `GroupName` varchar(255) NOT NULL default ''
              )";
            mysqli_query($link, $groups)or die("A MySQL error has occurred.<br />Error: (" . mysql_errno() . ") " . mysql_error()."71");

}//end createGroups
function previousLinks($link, $userName) {

    $db_select = mysqli_select_db($link, $userName);
              $linkName = $userName."Links";
                  $links = "CREATE TABLE IF NOT EXISTS `$linkName` (
                  `links` varchar(255) NOT NULL default '',
                  `GroupName` varchar(255) NOT NULL default ''
              )";
            mysqli_query($link, $links)or die("A MySQL error has occurred.<br />Error: (" . mysql_errno() . ") " . mysql_error()."82");
}//end previousLinks
function insertFeed($feed, $userName, $link){
   // $db_select = mysqli_select_db($link, $userName);
    $table = $userName."Links";
    $sql="INSERT INTO `$table`(`links`, `GroupName` ) VALUES ('$feed', 'null')";
    mysqli_query($link, $sql)or die("A MySQL error has occurred.<br />Error: (" . mysql_errno() . ") " . mysql_error()."88");
}




$db_select = mysqli_select_db($link, $userName);
if (!$db_select) {
    //i db select failed
} else {

}



mysqli_close($link);





