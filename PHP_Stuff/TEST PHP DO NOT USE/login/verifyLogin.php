<?php

require_once('../php/functions.php');

$userId = getUserId($_POST['user']);

if($userId > 0) {
  $pass = getPassword($userId);
  if($pass == $_POST['pass']) {
	session_start();
	$_SESSION['loggedIn'] = true;
	$_SESSION['userId'] = $userId;
	header('Location: ../tripeaks/');
  } else header('Location: index.php?error=2');
} else {
  header('Location: index.php?error=1');
}



/*
$conn = dbConnect();

$sql = "SELECT * FROM `userInfo` WHERE `userName` = '" . $_POST['user'] . "';";
echo $sql;

$result = odbc_exec($conn, $sql);
echo odbc_num_rows($result);
echo "<pre>";
print_r($_POST);
echo "</pre>";

echo "Users matching " . $_POST['user'] . ":<br>";
while(odbc_fetch_row($result)) {
  echo odbc_result($result, "userName") . "<br>";
}
*/


?>
