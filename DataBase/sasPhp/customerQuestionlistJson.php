<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include ("DBconfig.php");

// Getting the received JSON into $json variable.
$json = file_get_contents('php://input');
// decoding the received JSON and store into $obj variable.
$obj = json_decode($json,true);
$ID = $obj['ID'];
//$ID =  'QR-5aeebfd4733c66.27296106';
$uniqueID = uniqid("JS-", true);

$userName = $obj['user'];
//$userName= 'Rahimi';

$sSql = $con->query("SELECT * FROM member WHERE username='$userName'");
    foreach ($sSql as $key => $r){
        $mID = $r['member_ID'];
    }

$iSql = $con->query("INSERT INTO jsection (JS_UniqueID, member_ID, qr_ID) VALUES ('$uniqueID','$mID','$ID')");

$result = $con->query("SELECT * from question WHERE qr_ID = '$ID' AND answered = 0");

$outp = '[';
$aa=0;

while($rs = $result->fetch_array())
{
	if($aa > 0)
	{
		$outp .= ",";
	}
	
	$outp .= '{"question_ID":"'.$rs["question_ID"].'",';	
	$outp .= '"question_content":"'.$rs["question_content"].'",';
	$outp .= '"question_Type":"'.$rs["question_Type"].'"}';
	
	$aa = 1;
}
$con->close();

$outp .= ']';


echo($outp);
?>