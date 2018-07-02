<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include ("DBconfig.php");


$result = $con->query("SELECT * from qr_section");

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