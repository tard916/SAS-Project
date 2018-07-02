<?php
session_start();

// conecting to MySQL Database. tested ok with hard coded data
include 'DBconfig.php';
// Getting the received JSON into $json variable.
$json = file_get_contents('php://input');
// decoding the received JSON and store into $obj variable.
$obj = json_decode($json,true);
$uniqueID = uniqid("QT-", true);
$uniqueIDM = uniqid("MCQ-", true);
$qr_ID = $obj['qr_ID'];
$Question = $obj['Question'];
$type = 'Rating';


if (!empty($Question )){

	$sql = "INSERT INTO question (question_ID, question_content, question_Type, qr_ID) VALUES ('$uniqueID','$Question','$type','$qr_ID')";	
		if ($con->query($sql) === TRUE) {
			
				$MSG = 'Question added';
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
