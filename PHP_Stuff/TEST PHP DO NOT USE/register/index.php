<?php
/*
Errors:
0 User added successfully
1 Username already exists
2 Password confirmation does not match password
*/

$errorHTML = '';
if(isset($_GET['error'])) {
  switch($_GET['error']) {
	case 0:
		$errorHTML .= 'Registration successful.';
		break;
	case 1:
		$errorHTML .= 'Username already exists.';
		break;
	case 2:
		$errorHTML .= 'Password confirmation does not match password.';
		break;
  }
}
?>
<html>
<head>
</head>
<body>

<form method="POST" action="verifyRegistration.php">
Username: <input type="text" name="user" autocomplete="off" required />
<br>
Password: <input type="password" name="pass" autocomplete="off" required />
<br>
Confirm Password: <input type="password" name="passConfirm" autocomplete="off" required />
<br>
Email: <input type="text" name="email" autocomplete="off" required />
<br>
<input type="submit" value="Register" autocomplete="off" required />
</form>
<a href="../login">Login</a>
<div id="errorText"><?php echo $errorHTML; ?></div>
</body>
</html>