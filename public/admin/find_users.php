<?php require_once("../../includes/initialize.php"); 
	if (!$session->is_logged_in()) { redirect_to("../index.php"); }
	$users = User::find_all();
?>
<?php include_layout_template('admin_header.php'); ?>

		<div id="users">
			<?php
			for ($i = 0; $i < count($users); $i++) {
                $username = $users[$i]->username;
                $firstName = $users[$i]->first_name;
                $lastName = $users[$i]->last_name;
                $picture = $users[$i]->picture;

                echo "<div class='user-container'>";

                    echo "<div>" . "<a href='#'>" . $username . "</a>" . "</div>";
                    echo "<div>" . "<a href='#'> Name: " . $firstName . " " . $lastName . "</a>" . "</div>";
                    echo "<img src='../images/" . $picture . "' width='120px' height='100px'>";


                echo "</div>";
            }
            ?>
		</div>
	</div>
	<footer>
		Copyright <?php echo date("Y", time()); ?>, Victor Tsenkov.
	</footer>
	<script type="text/javascript" src="../javascripts/jquery-1.10.1.min.js"></script>
	<script type="text/javascript" src="../javascripts/user-search.js"></script>
</body>
</html>