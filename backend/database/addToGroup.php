<?php
	$db_selected = mysqli_select_db($link, $userName);
	$userDB = $userName."Links";
	//feed == group
	//userName == userName
	//userPass = linkToAdd

	$sql = "UPDATE `$userDB` SET `GroupName`='$feed' WHERE `links` = '$userPass'";
mysqli_query($link, $sql);  

mysqli_close($link);