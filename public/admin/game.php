<?php require_once("../../includes/initialize.php"); ?>
<?php
	if(isset($_GET['id'])) {
		$game_id = $_GET['id'];
		$game = Game::find_by_id($game_id);
	} else {
		$game = null;
	}
?>
<?php include_layout_template('admin_header.php'); ?>

		<div id="game">
			<div id="title">
				<?php if(!empty($game)) { echo "<img src='../images/" . $game->srcPic . "' width='100px'>"; } ?>
				<?php if(!empty($game)) { echo "<h2>" . $game->name . "</h2>"; } ?>
			</div>
			<div id="wrapper">
				
			</div>
		</div>
	</div>
	<footer>Just a footer.</footer>
	<script language="JavaScript" type="text/javascript" src="../javascripts//jquery-1.10.1.min.js"></script>
	<script type="text/javascript" src="../javascripts/prototypal-ie8.js"></script>
    <script language="JavaScript" type="text/javascript" src="../javascripts//menu.js"></script>
    <?php if(!empty($game)) { echo "<script type='text/javascript' src='../javascripts/" . $game->gameLink . "'></script>"; } ?>
</body>
</html>