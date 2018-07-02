<?php
session_start();
include("DBconfig.php");
// Connecting to MySQL Database. tested ok with hard coded data
//$con = new mysqli("localhost", "root", "", "mytube");

 // Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');

 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);

 // Populate pokemon name from JSON $obj array and store into a variable.
 $username = $obj['userName'];
 $_SESSION['loginUsername'] = $username;
 //$username = 'zizou';

 // Populate pokemon level from JSON $obj array and store into a variable.
 $password = $obj['userPassword'];
 //$password = 'abc123';


 // Creating SQL query and insert the record into MySQL database table.
$member_sql = "SELECT * FROM member WHERE username = '$username' and password = '$password' ";
$admin_sql = "SELECT * FROM admin WHERE username = '$username' and password = '$password'";


$member_result = $con->query($member_sql);
$admin_result = $con->query($admin_sql);

if ($member_result->num_rows >0) {
  // If the record inserted successfully then show the message.
  $MSG = 'Member' ;
  // Converting the message into JSON format.
  $json = json_encode($MSG);
  // Echo the message.
  echo $json ;
} else if ($admin_result->num_rows >0) {
  // If the record inserted successfully then show the message.
  $MSG = 'Admin' ;
  // Converting the message into JSON format.
  $json = json_encode($MSG);
  // Echo the message.
  echo $json ;
} else {
  $MSG = 'Fail' ;
  // Converting the message into JSON format.
  $json = json_encode($MSG);
  // Echo the message.
  echo $json ;
}
mysqli_close($con);
?>
