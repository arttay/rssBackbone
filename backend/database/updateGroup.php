<?php	
	$db_selected = mysqli_select_db($link, $userName);
	$userDB = $userName."Links";
	//feed == group
	//userName == userName
	//userPass = linkToAdd

	$sql = "UPDATE `$userDB` SET `GroupName`='null' WHERE `links` = '$feed'";
mysqli_query($link, $sql);  