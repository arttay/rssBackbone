<?php
$db_selected = mysqli_select_db($link, $userName);
$userGroups = $userName."Groups";
$sql="DELETE FROM `$userGroups` WHERE GroupName='$feed'";
mysqli_query($link, $sql)or die ('Unable to execute query. '. mysqli_error());

mysqli_close($link);