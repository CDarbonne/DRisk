<?php
/*This will open up a connection to the riskPlayer database, use myPHP to setup
attributes that you want to be tracked, we can simplify the code needed to perform
these task by running the SQL commands one time on myPHP and not having to include them
at run time in the PHP code.*/

$servername = "localhost";
$username = "root";
$password = "";
$database = "riskplayers";
        
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

$playerID ="Jonny";
$armyColor ="Red";
$playerEmail ="jonnyutah87@gmail.com";
$numTroops ="42";
$heldCards ="Louisiana, Texas";

//Inserting the player information into the database

$sql = "INSERT INTO playerinfo (`playerHandle`, `armyColor`, `playerEmail`, `numTroops`, `heldCards`) "
        . "VALUES ('$playerID', '$armyColor', '$playerEmail', '$numTroops', '$heldCards')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully <br>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}


echo "What color are Jonny's troops? <br>";

$sql = "SELECT armyColor, playerHandle FROM playerinfo";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
    }
} else {
    echo "0 results";
}

?> 

<html>
    
</html>