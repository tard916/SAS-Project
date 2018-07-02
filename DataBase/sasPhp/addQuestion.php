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
$A = $obj['A'];
$B = $obj['B'];
$C = $obj['C'];
$D = $obj['D'];
$Answer = $obj['Answer'];
$type = 'MCQ';

//$Question = 'Q1';
//$A = 'A';
//$B = 'B';
//$C = 'C';
//$D = 'D';
//$Answer = 'A';


if (!empty($Question ) && !empty($A)&& !empty($B)&& !empty($C)&& !empty($D)&& !empty($Answer) ){

	$sql = "INSERT INTO question (question_ID, question_content, question_Type, qr_ID) VALUES ('$uniqueID','$Question','$type','$qr_ID')";	
		if ($con->query($sql) === TRUE) {
			$sql1 = "INSERT INTO mcq_answer ( mcq_ID ,  mcq_Answer,  mcq_A, mcq_B, mcq_C, mcq_D, question_ID) 
						 VALUES ('$uniqueIDM','$Answer','$A','$B','$C','$D','$uniqueID')";
			if($con->query($sql1) === TRUE){
				$MSG = 'Question added';
				// Converting the message into JSON format.
				$json = json_encode($MSG);
				echo $json ;
			}else{
				echo "Error: " . $sql1 . "<br>" . $con->error;
			}				
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
