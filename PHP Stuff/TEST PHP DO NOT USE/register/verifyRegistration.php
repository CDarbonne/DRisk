<?php

require_once('../php/functions.php');

/*
Errors:
0 User added successfully
1 Username already exists
2 Password confirmation does not match password
*/

$userId = getUserId($_POST['user']);

if($userId < 0) {
  // username does not exist

  if($_POST['pass'] != $_POST['passConfirm']) {
    header('Location: ../register/?error=2');
  } else {
    addUserToDB($_POST);
    header('Location: ../register/?error=0');
  }
} else {
  // username already exists
  header('Location: ../register/?error=1');
}

?>