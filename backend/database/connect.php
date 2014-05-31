<?php
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









