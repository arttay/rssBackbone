<?php


$link = mysqli_connect("localhost","root","","rss") or die();
$sql="DELETE FROM `data` WHERE userLinks='$feed'";
mysqli_query($link, $sql);  




mysqli_close($link);



