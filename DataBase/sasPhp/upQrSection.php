<?php
session_start();

// conecting to MySQL Database. tested ok with hard coded data
include 'DBconfig.php';

// Getting the received JSON into $json variable.
$json = file_get_contents('php://input');

// decoding the received JSON and store into $obj variable.
$obj = json_decode($json,true);

$ID = $obj['ID'];

$title = $obj['SectionTitle'];
//$title= 'try two';

$description= $obj['SectionDescription'];

//$description= 'one';



if (!empty($title) && !empty($description) ) {


	$sql = "UPDATE  qr_section  SET   qr_Title = '$title', qr_Description = '$description' WHERE qr_ID = '$ID'";			

		if ($con->query($sql) === TRUE) {				
			$MSG = 'Qr Section Updated';
			// Converting the message into JSON format.
			$json = json_encode($MSG);
			echo $json ;
		} else {
			echo "Error: " . $sql . "<br>" . $con->error;
		}
}
else{
	$MSG = 'Please, fill out the fields' ;
			// Converting the message into JSON format.
	$json = json_encode($MSG);
			// Echo the message.
	echo $json ;
}


$con->close();


?>
