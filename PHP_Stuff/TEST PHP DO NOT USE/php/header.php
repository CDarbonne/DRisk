<?php

session_start();
if(!(isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'])) header('Location: /website1');

?>