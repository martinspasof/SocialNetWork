<?php require_once("../../includes/initialize.php"); 
	if (!$session->is_logged_in()) { redirect_to("../index.php"); }
	
?>
<?php include_layout_template('admin_header.php'); ?>
		<div id="slider">
			<div id="slider-content" title="Hover"></div>
		</div>
		
		<div id="users"></div>
	</div>
	<footer>Copyright 2013 Redcurrent.</footer>
	<script type="text/javascript" src="../javascripts//jquery-1.10.1.min.js"></script>
	<script type="text/javascript" src="../javascripts/prototypal-ie8.js"></script>
	<script type="text/javascript" src="../javascripts//sliderItem.js"></script>
	<script type="text/javascript" src="../javascripts//slider.js"></script>
	<script type="text/javascript" src="../javascripts//socialButtons.js"></script>
	<script type="text/javascript" src="../javascripts//gamePortalController.js"></script>
    <script type="text/javascript" src="../javascripts//menu.js"></script> 
</body>
</html>