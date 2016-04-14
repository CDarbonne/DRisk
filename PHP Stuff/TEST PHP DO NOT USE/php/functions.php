<?php

function dbConnect() {
  $systemDSN = 'MYDB';
  $user = '';
  $pass = '';
  $conn = odbc_connect($systemDSN, $user, $pass);
  return $conn;
}

function doSQL($sql) {
  $conn = dbConnect();
  $result = odbc_exec($conn, $sql);
  return $result;
}

function getUserId($user) {
  $sql = "SELECT `userId` FROM `userInfo` WHERE `userName` = '" . $user . "';";

  $result = doSQL($sql);
  
  $numRows = 0;
  while(odbc_fetch_row($result)) {
	$userId = odbc_result($result, "userId");
    $numRows++;
  }
  
  if($numRows == 1) return $userId;
  else return -1;
}

function getPassword($userId) {
  $sql = "SELECT `password` FROM `userInfo` WHERE `userId` = " . $userId . ";";

  $result = doSQL($sql);
  
  while(odbc_fetch_row($result)) {
    $pass = odbc_result($result, "password");
  }
  
  return $pass;
}

function addUserToDB($userInfoArray) {
  // insert user information into database
  $sql = "INSERT INTO `userInfo` (`userName`, `email`, `password`) ";
  $sql .= "VALUES ('".$userInfoArray['user']."', '".$userInfoArray['email']."', '".$userInfoArray['pass']."');";
  doSQL($sql);
  // initialize scores to 0 for user
  $userId = getUserId($userInfoArray['user']);
  $sql = "INSERT INTO `tripeakScores` (`userId`, `currentScore`, `highScore`, `numGames`, `numWins`) VALUES (".$userId.", 0, 0, 0, 0);";
  doSQL($sql);
}

?>