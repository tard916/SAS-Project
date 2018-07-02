<?php
session_start();

// conecting to MySQL Database. tested ok with hard coded data
include 'DBconfig.php';

// Getting the received JSON into $json variable.
$json = file_get_contents('php://input');

// decoding the received JSON and store into $obj variable.
$obj = json_decode($json,true);

$uniqueID = uniqid("QR-", true);

$title= $obj['SectionTitle'];
//$title= 'try two';

$description= $obj['SectionDescription'];

//$description= 'one';



if (!empty($title) && !empty($description) ) {


	$sql = "INSERT INTO qr_section (qr_ID, qr_Title, qr_Description) VALUES ('$uniqueID', '$title', '$description')";			

		if ($con->query($sql) === TRUE) {				
			$MSG = 'Qr Section added';
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
