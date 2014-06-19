<?php

$userLinks = $userName."Links";
$link = mysqli_connect("localhost","root","","rss") or die();
$sql="DELETE FROM `$userLinks` WHERE links='$feed'";
mysqli_query($link, $sql);  

 
mysqli_close($link);