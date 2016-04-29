<?php
include_once 'dbconnect.php';
<!doctype html>
<html>
<head>

	<meta charset='utf-8'>
   <link rel="stylesheet" href="assets/css/Menu_styles.css">
   <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
   <script src="JavaScript Files/script.js"></script>

   <title>DRisk</title>
</head>
<body>


<body>
<div id='cssmenu'>

<ul>
   
   <li class='active'>
      <a href='HomePage.php'>
         <span>Home</span>
      </a>
   </li>

  
   <li class='has-sub'><a href='#'><span>Game</span></a>
      <ul>
         <li><a href='#'><span>Play</span></a></li>
         <li><a href="Maps/EasyMap.html"><span>Example Map</span></a></li>
        <!-- <li><a href='#'><span>UPLOAD A MAP</span></a></li> -->
         <li><a href='#'><span>Credits</span></a></li>
      </ul>
   </li>
  
   <li class='has-sub'><a href='#'><span>About</span></a>
      <ul>
         <li>
            <a href='#'>
               <span>Game Rules</span>
            </a>
         </li>
        
         <li class='last'>
            <a href='#'>
               <span>Leaderboard</span>
            </a>
         </li>
      </ul>
   </li>
   
   <li class='last'><a href='#'><span>Contact</span></a></li>
   
   <li class='has-sub'><a href='#'><span>Account</span></a>
      <ul>
             <li><a href="home.php"><span>LOG IN</span></a></li>
            <li><a href="logout.php"><span>LOG OUT</span></a></li>
         
      </ul>
   </li>
</ul>
</div>


</body>
<html>
