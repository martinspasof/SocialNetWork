<?php
	require_once(LIB_PATH.DS.'database.php');

	class Game extends DatabaseObject {
		
		protected static $table_name = "games";
		protected static $db_fields = array("id", "name", "info", "srcPic", "gameLink", "category");
		public $id;
		public $name;
		public $info;
		public $srcPic;
		public $gameLink;
		public $category;

		
	}
?>