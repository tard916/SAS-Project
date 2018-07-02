<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include ("DBconfig.php");

// Getting the received JSON into $json variable.
$json = file_get_contents('php://input');
// decoding the received JSON and store into $obj variable.
$obj = json_decode($json,true);
$ID = $obj['ID'];
//$ID =  'QT-5b0785d09ee213.88030061';

$result = $con->query("SELECT * from mcq_answer WHERE question_ID = '$ID'");

$outp = '[';
$aa=0;

while($rs = $result->fetch_array())
{
	if($aa > 0)
	{
		$outp .= ",";
	}
	
	$outp .= '{"mcq_ID":"'.$rs["mcq_ID"].'",';	
	$outp .= '"mcq_Answer":"'.$rs["mcq_Answer"].'",';
	$outp .= '"mcq_A":"'.$rs["mcq_A"].'",';
	$outp .= '"mcq_B":"'.$rs["mcq_B"].'",';
	$outp .= '"mcq_C":"'.$rs["mcq_C"].'",';
	$outp .= '"mcq_D":"'.$rs["mcq_D"].'",';
	$outp .= '"question_ID":"'.$rs["question_ID"].'"}';
	
	$aa = 1;
}
$con->close();

$outp .= ']';


echo($outp);
?>