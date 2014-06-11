<?php 
$userData = $userName."Groups";
$db_selected = mysqli_select_db($link, $userName);


$sql = "SELECT GroupName FROM $userData";
$result = mysqli_query($link, $sql);  


$groupsArray = array();

while ($row = $result->fetch_assoc()) {
   $groupsArray[] = $row['GroupName'];  
}