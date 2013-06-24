<?php

	function redirect_to($location = NULL) {
		if($location != NULL) {
			header("Location: {$location}");
			exit;
		}
	}

	function output_message($message="") {
		if(!empty($message)) {
			return "<p class=\"message\">{$message}</p>";
		} else {
			return "";
		}
	}

	function include_layout_template($template="") {
		include(SITE_ROOT.DS.'public'.DS.'layouts'.DS.$template);
	}

	function log_action($action, $message="") {
		$logfile = SITE_ROOT.DS.'logs'.DS.'log.txt';
		$new = file_exists($logfile) ? false : true;
		if($handle = fopen($logfile, 'a')) {
			$timestamp = strftime("%Y-%m-%d %H:%M:%S", time());
			$content = "{$timestamp} | {$action}: {$message}\n";
			fwrite($handle, $content);
			fclose($handle);
			if($new) { chmod($logfile, 0755); }
		} else {
			echo "Could not open log file for writing.";
		}
	}

	function datetime_to_text($datetime="") {
		$unixdatetime = strtotime($datetime);
		return strftime("%B  %d, %Y at %I:%M %p", $unixdatetime);
	}
?>