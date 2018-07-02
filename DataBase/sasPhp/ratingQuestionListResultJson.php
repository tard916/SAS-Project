<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include ("DBconfig.php");

// Getting the received JSON into $json variable.
$json = file_get_contents('php://input');
// decoding the received JSON and store into $obj variable.
$obj = json_decode($json,true);
//$ID = $obj['ID'];
$ID =  'QT-5b0785afdd8404.59255387';

//$userName = $obj['user'];
$userName= 'Rahimi';

$sSql = $con->query("SELECT * FROM member WHERE username='$userName'");
    foreach ($sSql as $key => $r){
        $mID = $r['member_ID'];
    }


$result = $con->query("SELECT * FROM member_answer WHERE member_ID ='$mID' AND question_ID = '$ID'");

$outp = '[';
$aa=0;

while($rs = $result->fetch_array())
{
	if($aa > 0)
	{
		$outp .= ",";
	}
	
	$outp .= '{"ratings":"'.$rs["answer"].'"}';
	
	$aa = 1;
}
$con->close();

$outp .= ']';


echo($outp);
?>