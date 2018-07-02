<?php
// Connecting to MySQL Database. hard coded data tested ok
	include 'DBconfig.php';

 // Getting the received JSON into $json variable.
 	$json = file_get_contents('php://input');

 // decoding the received JSON and store into $obj variable.
	$obj = json_decode($json,true);

 // Populate Student ID from JSON $obj array and store into $S_ID.
	$ID = $obj['ID'];
	//$ID = 'QR-5af0e1d9262d72.50703668';
	//echo $ID;
if (!empty($ID)) {
	$sql = "DELETE FROM qr_section WHERE qr_ID = '$ID'";			

		if ($con->query($sql) === TRUE) {				
			$MSG = 'Qr Section Deleted';
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
