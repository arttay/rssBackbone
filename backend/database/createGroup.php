<?php
	$userGroups = $userName."Groups";
	$link = mysqli_connect("localhost","root","","rss") or die();

    $sql="INSERT INTO `rss`.`$userGroups` (`GroupName`, `links`) VALUES ('$groupName', '$feed')";
	mysqli_query($link, $sql);  