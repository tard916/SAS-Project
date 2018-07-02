<?php
//connection to link to the server with database and php
$host = "127.0.0.1"; /* Host name */
$user = "k24tmxzc_rahimi"; /* User */
$password = "@26041991Conakry"; /* Password */
$dbname = "k24tmxzc_sas"; /* Database name */

$con = mysqli_connect($host, $user, $password,$dbname);
// Check connection
if (!$con) {
 die("Failed to connect to MySQL: " . mysqli_connect_error());
}

?>