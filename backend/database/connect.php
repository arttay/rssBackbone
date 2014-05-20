<?php
$link = mysqli_connect("localhost","root","","rss") or die();

$result = mysql_query("SELECT userName FROM data WHERE userName = '$userName'");
if(mysql_num_rows($result) == 0) {
   $sql="INSERT INTO `data` (`userName`, `userPassword`, `userLinks`) VALUES ('$userName', '$userPass', '$feed')";
	mysqli_query($link, $sql);
} 


mysqli_close($link);






