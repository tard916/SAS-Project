	<?php
	include("DBconfig.php");
	
	session_start();

// Connecting to MySQL Database. tested ok with hard coded data
//$con = new mysqli("localhost", "root", "", "mytube");

 // Getting the received JSON into $json variable.
	$json = file_get_contents('php://input');

 // decoding the received JSON and store into $obj variable.
	$obj = json_decode($json,true);
	
	$uniqueID = uniqid("MB-", true);

	$fullname = $obj['userFullname'];
	//$fullname = "Thierno Abdoul Rahimi Diallo";
	$username = $obj['userName'];
 	//$username = 'Rahimi';

	$email = $obj['userEmail'];
	//$email = "tard916@gmail.com";

	$password = $obj['userPassword'];
 	//$password = '1234';

	//generating random 6-digit number
	//$tac = rand(100000, 999999);
	
	$company = $obj['userCompany'];
	
	$industry = $obj['userIndustry'];


	if (!empty($username) && !empty($password) && !empty($fullname) && !empty($email)) {


		$sql = "INSERT INTO member (member_ID, member_Name,username, member_Company, member_insdusrtyField, member_Email,password) 
				    VALUES ('$uniqueID','$fullname', '$username', '$company ', '$industry ','$email', '$password')";

	//Checking for duplicates
		$dupesql_username = "SELECT * FROM member where username = '$username'";
		$dupesql_email = "SELECT * FROM member where email = '$email'";

		$duperaw_username = $con->query($dupesql_username);
		$duperaw_email = $con->query($dupesql_email);

		if (mysqli_num_rows($duperaw_username) > 0) {
			$MSG = 'The username already exists' ;
		// Converting the message into JSON format.
			$json = json_encode($MSG);
		// Echo the message.
			echo $json ;
		}

		else if(mysqli_num_rows($duperaw_email) > 0){
			$MSG = 'The email already exists' ;
		// Converting the message into JSON format.
			$json = json_encode($MSG);
		// Echo the message.
			echo $json ;
		}

		else{

			if ($con->query($sql) === TRUE) {
				//I started session, as I wanted to use it in the next page
				$_SESSION['username'] = $username;
				$MSG = 'Thank you for signing up' ;
				// Converting the message into JSON format.
				$json = json_encode($MSG);
				// Echo the message.
				echo $json ;
				
			} else {
				echo "Error: " . $sql . "<br>" . $con->error;
			}

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
