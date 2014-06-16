<?php 
$userData = $userName."Groups";
$userLink = $userName."Links";
$counter = 0;
$resp = [];
$db_selected = mysqli_select_db($link, $userName);


$sql = "SELECT GroupName FROM $userData";
$result = mysqli_query($link, $sql);  


$groupsArray = array();

while ($row = $result->fetch_assoc()) {
   $groupsArray[] = $row['GroupName'];  

}
$testArray = $groupsArray;



	$linkSql = "SELECT * FROM `artLinks`";
	$linkResult = mysqli_query($link, $linkSql);  
	
	while ($row = $linkResult->fetch_assoc()) {
		 $data_array[] = $row;
	}
	  
	//$itemsArray[$counter] = $data_array;



$resp[0] = $groupsArray;
$resp[1] = $data_array;