<?php
	global $session; 
	$current_user = User::find_by_id($session->user_id);
?>
<!DOCTYPE html>
<html>
<head>
	<title>Social Network</title>
	<link rel="stylesheet" type="text/css" href="../stylesheets/style.css" />
	<link rel="stylesheet" type="text/css" href="../stylesheets/main-style.css" />
	<link rel="stylesheet" type="text/css" href="../stylesheets/social-css.css" />
	<link rel="stylesheet" type="text/css" href="../stylesheets/game.css" />
	<link rel="stylesheet" type="text/css" href="../stylesheets/home.css" />
	<link rel="stylesheet" type="text/css" href="../stylesheets/user-search.css" />
</head>
<body>
	<header id="main-header">
	    <div id='user-panel'>
		  <img src="<?php echo $current_user->image_path(); ?>" width="30px">
		  <a href="#"><?php echo $current_user->username; ?></a>
		</div>
		<nav id="main-nav">
			<ul>
				
				<li><a href="index.php">Home</a></li>
				<li><a href="find_users.php">Find Users</a></li>
				<li><a href="game_center.php">Game Center</a></li>
				<li><a href="logout.php">Logout</a></li>
				<li>
					<form id="search" action="index.php" method="get" accept-charset="utf-8">
					  <input type="text" name="search-text" id="search-text" />            
					</form>
				</li>
			</ul>
		</nav>
		<div id="api-buttons"></div>
	</header>
	<div id="main-content">
		
