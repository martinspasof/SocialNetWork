<?php require_once("../../includes/initialize.php"); 
	if (!$session->is_logged_in()) { redirect_to("../index.php"); }
	
?>
<?php include_layout_template('admin_header.php'); ?>

<div id="home-wrap">
	<div class="image-holder">
		<a href="game_center.php"><img src="../images/game-center.jpg" width="350px"></a>
	</div>
	<div class="image-holder">
		<a href="find_users.php"><img src="../images/users.jpg" width="350px"></a>
	</div>
</div>

<?php include_layout_template('admin_footer.php'); ?>