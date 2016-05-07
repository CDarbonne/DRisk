<?php
/*This will open up a connection to the riskPlayer database, use myPHP to setup
attributes that you want to be tracked, we can simplify the code needed to perform
these task by running the SQL commands one time on myPHP and not having to include them
at run time in the PHP code.*/

$servername = "localhost";
$username = "root";
$password = "root";
$database = "dbtest";
        
$conn = mysqli_connect($servername, $username, $password, $database);

// Check connection
if (mysqli_connect_errno())
  {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
  else
  {
    echo "Connected to database <br>";
  }

/*//Create our database - Leaving this in for now for Basim
 ********************************************************************
 *This database should already be created in myPHP under riskPlayers*
 * ******************************************************************
$sql = "CREATE DATABASE  riskPlayers";

if ($conn->query($sql) === TRUE) {
    echo "Database created successfully";
} else {
    echo "Error creating database: " . $conn->error;
} */

/* Ths is going to be place holder information, this will be inserted at some point into the database
 * for now we're just using defined variables and populating the database with them.
 */

$playerID ="Chris";
$armyColor ="Blue";
$playerEmail ="chris@chris.com";
$numTroops ="42";
$heldCards ="Louisiana, Texas";

//Inserting the player information into the database

$sql = "INSERT INTO riskplayers (`playerHandle`, `armyColor`, `playerEmail`, `numTroops`, `heldCards`) "
        . "VALUES ('$playerID', '$armyColor', '$playerEmail', '$numTroops', '$heldCards')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully <br>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$handle = mysql_query('SELECT playerHandle FROM riskplayers WHERE amryColor =Blue');
$row = mysql_fetch_row($handle);
echo $img[0];

?> 