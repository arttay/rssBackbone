<?php
	$userGroups = $userName."Groups";
	$link = mysqli_connect("localhost","root","","$userName") or die();

	$checkSql = "SELECT `GroupName` FROM `$userGroups` WHERE GroupName = '$groupName'";
	$checkQuery = mysqli_query($link, $checkSql);
	$checkRow = mysqli_fetch_assoc($checkQuery);
	if($checkQuery){
		$sql="INSERT INTO `$userGroups` (`GroupName`) VALUES ('$groupName')";
		mysqli_query($link, $sql)or die("A MySQL error has occurred.<br />Error: (" . mysql_errno() . ") " . mysql_error());
	}

    