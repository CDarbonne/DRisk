

<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "dbtest";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT user_id, user_name, user_email FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
     // output data of each row
     while($row = $result->fetch_assoc()) {
         echo "<br> user_id: ". $row["user_id"]. " - Name: ". $row["user_name"]. " email" . $row["user_email"] . "<br>";
     }
} else {
     echo "0 results";
}

$conn->close();
?>  

