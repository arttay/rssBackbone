<?php
	$userGroups = $userName."Groups";
	$link = mysqli_connect("localhost","root","","rss") or die();

	$checkSql = "SELECT `GroupName` FROM `$userGroups` WHERE GroupName = '$userName'";
	$checkQuery = mysqli_query($link, $checkSql);
	$checkRow = mysqli_fetch_assoc($checkQuery);
	if($checkRow == false){
		$sql="INSERT INTO `rss`.`$userGroups` (`GroupName`, `links`) VALUES ('$groupName', '$feed')";
	mysqli_query($link, $sql)or die("A MySQL error has occurred.<br />Error: (" . mysql_errno() . ") " . mysql_error()."28");
	}

    