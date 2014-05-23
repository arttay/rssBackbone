<?php
$link = mysqli_connect("localhost","root","","rss") or die();



$result = mysql_query("SELECT userName FROM data WHERE userName = '$userName'");


if(mysql_num_rows($result) == 0) {
 	$sql="INSERT INTO `rss`.`data` (`userName`, `userPassword`, `userLinks`) VALUES ('$userName', '$userPass', '$feed')";
	mysqli_query($link, $sql);  
} else {
    $create = "CREATE TABLE `".$userName."` ("
        . " `userName` VARCHAR(50) NOT NULL,"
        . " `userPassword` VARCHAR(50) NOT NULL, "
        . " `userLinks` VARCHAR(50) NOT NULL, "
        . " )"
        . " ENGINE = myisam;";

    mysql_query($create)or die("A MySQL error has occurred.<br />Error: (" . mysql_errno() . ") " . mysql_error());
}


mysqli_close($link);









