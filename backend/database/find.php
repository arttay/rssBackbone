<?php

$userData = $userName."Links";
$link = mysqli_connect("localhost","root","","$userName") or die();


$query = "SELECT links FROM $userData WHERE GroupName = 'null'";
$result = mysqli_query($link, $query);  


$myArray = array();

while ($row = $result->fetch_assoc()) {
   $myArray[] = $row['links'];  
}