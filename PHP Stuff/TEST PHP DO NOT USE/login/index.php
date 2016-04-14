<?php

$dbName = "db.mdb";
/*
foreach(PDO::getAvailableDrivers() as $driver) echo $driver . "<br>";

die();
$db = new PDO("odbc:Driver={Microsoft Access Driver (*.mdb)}; Dbq=C:\\wamp\\www\\website1\\db.mdb; Uid=; Pwd=;");

$result = $db->query("SELECT * WHERE 1");

while($row = $result->fetch) {
  print_r($row);
}
*/

$errorHTML = '';
if(isset($_GET['error'])) {
  switch($_GET['error']) {
    case 1:
	  $errorHTML .= 'User name invalid.';
	  break;
	case 2:
	  $errorHTML .= 'Password invalid.';
	  break;
  }	
}

?>
<html>
<head>
</head>
<body>

<form method="POST" action="verifyLogin.php">
Username: <input type="text" name="user" autocomplete="off" />
<br>
Password: <input type="password" name="pass" autocomplete="off" />
<br>
<input type="submit" value="Login" />
<br>
<a href="../register">Register</a>
</form>

<div id="errorMessage">
<?php echo $errorHTML; ?>
</div>

</body>
</html>