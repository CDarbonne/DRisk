<?php

session_start();

if(isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == true) header('Location: tripeaks');
else header('Location: login');

?>