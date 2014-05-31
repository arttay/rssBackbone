<?php

$link = mysqli_connect("localhost","root","","rss") or die();

$userData = $userName."Data";
$query = "SELECT userLinks FROM $userData WHERE userName = '$userName'";
$result = mysqli_query($link, $query);  


$myArray = array();

while ($row = $result->fetch_assoc()) {
   $myArray[] = $row['userLinks'];  
}