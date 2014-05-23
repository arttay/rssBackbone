<?php

$link = mysqli_connect("localhost","root","","rss") or die();


$query = "SELECT userLinks FROM data WHERE userName = '$userName'";
$result = mysqli_query($link, $query);  


$myArray = array();

while ($row = $result->fetch_assoc()) {
   $myArray[] = $row['userLinks'];  
}