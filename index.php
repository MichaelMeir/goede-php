<!DOCTYPE html>
<html>
<head>
	<title>Homepage</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<?php

	$currTime = time();
	$time = date("H", $currTime);

	$lore = "";

	if($time >= 6 && hours < 12) {
		$lore = "Goodmorning!";
		echo "<body style='background-image: url(\"backgrounds/morning.png\")'>";
	}else if($time >= 12 && $time < 15) {
		$lore = "Good Evening!";
		echo "<body style='background-image: url(\"backgrounds/evening.png\")'>";
	}else if($time >= 15 && $time < 23) {
		$lore = "Good Afternoon!";
		echo "<body style='background-image: url(\"backgrounds/afternoon.png\")'>";
	}else if(($time >= 20 && $time < 24) || ($time >= 0 && $time < 6)) {
		$lore = "Good Night!";
		echo "<body style='background-image: url(\"backgrounds/night.png\")'>";
	}

?>

	<canvas id="canvas" width="1000" height="400"></canvas>

	<div id="lore-div">
		<h1 id="lore">
			<?php

			echo $lore;

			?>
		</h1>
	</div>

	<div id="searchbar">
		<input id="google-search" type="text" name="search" onkeydown="checkEnter(event)" autofocus>
	</div>

	<div id="tab-left">
		<div id="youtube">
			<a href="https://www.youtube.com/">Youtube:</a>
			<a href="https://www.youtube.com/watch?v=db8F22GSaog&t=1s">Electro Swing #1</a>
			<a href="https://www.youtube.com/watch?v=RPMTZfNSXYQ&t=1s">Electro Swing #2</a>
			<a href="https://www.youtube.com/watch?v=bcnj9btzcm8&t=1s">Electro Swing #3</a>
			<br>
			<a href="https://www.twitch.tv/">Twitch:</a>
			<p id="twitch-1" class="twitch"></p><a class="pl15" href="https://www.twitch.tv/uwucs">UwU</a>
			<p id="twitch-2" class="twitch"></p><a class="pl15" href="https://www.twitch.tv/gallifreysgod">Galli</a>
			<p id="twitch-3" class="twitch"></p><a class="pl15" href="https://www.twitch.tv/yogscast">Yogscast</a>
		</div>
	</div>

	<script type="text/javascript" src="Core.js"></script>

</body>
</html>