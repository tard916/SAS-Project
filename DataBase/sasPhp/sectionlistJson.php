<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include ("DBconfig.php");

// Getting the received JSON into $json variable.
$json = file_get_contents('php://input');

// decoding the received JSON and store into $obj variable.
$obj = json_decode($json,true);

$userName = $obj['user'];
//$userName= 'Rahimi';

$sSql = $con->query("SELECT * FROM member WHERE username='$userName'");
    foreach ($sSql as $key => $r){
        $mID = $r['member_ID'];
    }

$result = $con->query("SELECT * from qr_section,jsection Where qr_section.qr_ID = jsection.qr_ID and jsection.member_ID = '$mID'");

$outp = '[';
$aa=0;

while($rs = $result->fetch_array())
{
	if($aa > 0)
	{
		$outp .= ",";
	}
	
	$outp .= '{"qr_ID":"'.$rs["qr_ID"].'",';
	$outp .= '"qr_Title":"'.$rs["qr_Title"].'",';
	$outp .= '"qr_Description":"'.$rs["qr_Description"].'"}';
	
	
	$aa = 1;
}
$con->close();

$outp .= ']';


echo($outp);
?>