<?php
	require_once('../includes/initialize.php');
?>

<?php

	$max_file_size = 1048576; // 1 MB

	if(isset($_POST['submit'])) {
		$photo = new Photograph();
		$photo->caption = $_POST['caption'];
		$photo->attach_file($_FILES['file_upload']);
		if($photo->save()) {
			$session->message("Photograph uploaded successfully.");
		} else {
			$message = join("<br />", $photo->errors);
		}

		$user = new User();
		$user->username = $_POST['username'];
		$user->password = $_POST['password'];
		$user->first_name = $_POST['first_name'];
		$user->last_name = $_POST['last_name'];
		$user->picture = $photo->filename;
		if($user->save()) {
			$session->message("User created successfully.");
			redirect_to("index.php");
		}
	}
?>

<?php include_layout_template('header.php'); ?>

	<?php echo output_message($message); ?>

	<form action="register.php" enctype="multipart/form-data" method="POST">
		<input type="hidden" name="MAX_FILE_SIZE" value="<?php echo $max_file_size; ?>" />
		<p><input type="file" name="file_upload" /></p>
		<p>Caption: <input type="text" name="caption" value="" /></p>
		<p>Username: <input type="text" name="username" value="" /></p>
		<p>Password: <input type="password" name="password" value="" /></p>
		<p>First name: <input type="text" name="first_name" value="" /></p>
		<p>Last name: <input type="text" name="last_name" value="" /></p>
		<input type="submit" name="submit" value="Submit" />
	</form>

<?php include_layout_template('footer.php'); ?>
		
