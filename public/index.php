<?php require_once("../includes/initialize.php"); ?>
<?php
	if(isset($_POST['submit'])) {
		$username = trim($_POST['username']);
		$password = trim($_POST['password']);

		// Check the database to see if the user and pass exist.
		$found_user = User::authenticate($username, $password);

		if($found_user) {
			$session->login($found_user);
			log_action('Login', "{$found_user->username} logged in.");
			
			// Find all games and save them in a file
			$games = Game::find_all();	// array of Game objects
			
			$games_array = array();
			
			for ($i=0; $i < count($games); $i++) { 
				$games_array[] = $games[$i]->attributes();
			}

			$final_json = array();
			$final_json['games'] = ($games_array);

			// Save the games to file:
			$myFile = "data-base/games.txt";
			$fh = fopen($myFile, 'w') or die("can't open file");
			$stringData = json_encode($final_json);
			fwrite($fh, $stringData);
			fclose($fh);

			// Find all users and save them in a file
			$users = User::find_all();	// array of User objects
			
			$users_array = array();
			
			for ($i=0; $i < count($users); $i++) { 
				$users_array[] = $users[$i]->attributes();
			}

			$final_json = array();
			$final_json['games'] = ($users_array);

			// Save the games to file:
			$myFile = "data-base/users.txt";
			$fh = fopen($myFile, 'w') or die("can't open file");
			$stringData = json_encode($final_json);
			fwrite($fh, $stringData);
			fclose($fh);

			redirect_to("admin/index.php");
		} else {
			$message = "Username / password combination incorrect.";
		}
	}
?>
<?php include_layout_template('header.php'); ?>
<?php echo output_message($message); ?>
<p>Welcome to my social network project. If you already have an account go ahead and log in, otherwise follow the 
	<a href="register.php">Register</a> link.</p>
<form action="index.php" method="post">
	<table>
		<tr>
			<td>Username:</td>
			<td>
				<input type="text" name="username" maxlength="30" />
			</td>
		</tr>
		<tr>
			<td>Password:</td>
			<td>
				<input type="password" name="password" maxlength="30" />
			</td>
		</tr>
		<tr>
			<td colspan="2">
				<input type="submit" name="submit" value="Login" />
			</td>
		</tr>
	</table>
</form>
<?php include_layout_template('footer.php'); ?>