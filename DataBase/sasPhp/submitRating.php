<?php
session_start();

// conecting to MySQL Database. tested ok with hard coded data
include 'DBconfig.php';

// Getting the received JSON into $json variable.
$json = file_get_contents('php://input');

// decoding the received JSON and store into $obj variable.
$obj = json_decode($json,true);

$qID = $obj['qID'];
$ratingID = uniqid("RT-", true);

$userName = $obj['user'];
//$userName= 'Rahimi';

$ratingAnswer= $obj['Rating'];

//$ratingAnswer= '1';



if (!empty($userName) && !empty($ratingAnswer) ) {
    
    $sSql = $con->query("SELECT * FROM member WHERE username='$userName'");
    foreach ($sSql as $key => $r){
        $mID = $r['member_ID'];
    }

	$sql = "INSERT INTO member_answer (ma_ID, member_ID, question_ID, answer) VALUES ('$ratingID', '$mID','$qID', '$ratingAnswer')";			

		if ($con->query($sql) === TRUE) {				
			$MSG = 'Rating submited!';
			// Converting the message into JSON format.
			$json = json_encode($MSG);
			echo $json ;
			$uSql = $con->query("UPDATE question SET answered = 1 WHERE question_ID = '$qID'");
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