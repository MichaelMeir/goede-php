var canvas;
var g;

let username = "Michael";

window.onload = new function() {

	canvas = document.getElementById("canvas");
	g = canvas.getContext("2d");
	setpixelated(g);
	start();

	getWeather();

	checkOnline("uwucs", "twitch-1");
	checkOnline("gallifreysgod", "twitch-2");
	checkOnline("yogscast", "twitch-3");
}

var currentTime = 0, lastTime = 0;

function start(timeStamp) {

	currentTime = (timeStamp - lastTime);

	if(currentTime > 10000) {
		getWeather();
		checkOnline("uwucs", "twitch-1");
		checkOnline("gallifreysgod", "twitch-2");
		checkOnline("yogscast", "twitch-3");
		lastTime = timeStamp;
	}

	update();

	requestAnimationFrame(start);

}

var font = "25px Bungee";

function update() {

	clock();

	temperature();

}

function getTemp() {
	return ((Math.PI*1.1) - (Math.PI*1.9))/60*-weather["main"]["temp"];
}

function checkEnter(event) {
	if(event.keyCode == 13) {
		window.location = ("http://www.google.nl/search?q=" + document.getElementById("google-search").value.replace(" ", "+"));
	}
}

//http://api.openweathermap.org/data/2.5/weather?q=Rotterdam&APPID=bb780cc3e12957f12b6edffa09ca362a&units=metric

var weather;

function setpixelated(context){
    context['imageSmoothingEnabled'] = false;       /* standard */
    context['mozImageSmoothingEnabled'] = false;    /* Firefox */
    context['oImageSmoothingEnabled'] = false;      /* Opera */
    context['webkitImageSmoothingEnabled'] = false; /* Safari */
    context['msImageSmoothingEnabled'] = false;     /* IE */
}

function getWeather() {
	var httpRequest = new XMLHttpRequest();

	httpRequest.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {

			weather =  JSON.parse(this.responseText);

		}
	}

	httpRequest.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Zwijndrecht,NL&APPID=bb780cc3e12957f12b6edffa09ca362a&units=metric", true);
	httpRequest.send();
}

var clockX = 100, clockY = 100;

var milli, seconds, minutes, hours;

function clock() {
	var d = new Date();
	milli = d.getMilliseconds();
	seconds = d.getSeconds();
	minutes = d.getMinutes();
	hours = d.getHours();

	g.clearRect(0, 0, 1000, 1000);

	g.fillStyle = "#89e1ff";
	g.strokeStyle = "#89e1ff";

	g.beginPath();
	g.arc(clockX, clockY, 75, -(Math.PI/2), (Math.PI / 30) * (milli/1000 + seconds)-(Math.PI/2));
	g.lineWidth = 5;
	g.stroke();

	g.beginPath();
	g.arc(clockX, clockY, 82, -(Math.PI/2), (Math.PI / 30) * minutes-(Math.PI/2));
	g.lineWidth = 5;
	g.stroke();

	g.beginPath();
	g.arc(clockX, clockY, 89, -(Math.PI/2), (Math.PI/12) * hours-(Math.PI/2));
	g.lineWidth = 5;
	g.stroke();

	g.font = font;

	g.fillText(hours + ":" + minutes + ":" + seconds, clockX-57, clockY+5);
}

var tempX, tempY;

function temperature() {
	if(weather != null) {

		g.beginPath();
		g.arc(300, 100, 75, Math.PI*1.1, Math.PI*1.5);
		g.lineWidth = 5;
		g.stroke();
		g.fillStyle = "#ff5f54";
		g.strokeStyle = "#ff5f54";
		g.beginPath();
		g.arc(300, 100, 75, Math.PI*1.5, Math.PI*1.9);
		g.lineWidth = 5;
		g.stroke();
		
		g.lineWidth = 1;
		g.beginPath();
		g.moveTo(300 + Math.cos(getTemp()+(-Math.PI))*5, 90 + Math.sin(getTemp()+(-Math.PI))*5);
		g.lineTo(300 - Math.cos(getTemp()+(-Math.PI))*5, 90 - Math.sin(getTemp()+(-Math.PI))*5);
		g.lineTo(300 + Math.cos(getTemp()+(-Math.PI/2)) * 75, 100 + Math.sin(getTemp()+(-Math.PI/2)) * 75);
		g.stroke();
		g.fill();

		g.fillStyle = "#89e1ff";
		g.strokeStyle = "#89e1ff";

		g.fillText(weather["main"]["temp"] + "°C", 260, 125);
		g.fillText(weather["weather"][0]["main"], 260, 150);

	}
}


//https://api.twitch.tv/kraken/streams/Yogscast?client_id=y7z85v0l98i37ufjgziaamtjtxwp4s
function checkOnline(channel, id) {

	var httpRequest = new XMLHttpRequest();

	httpRequest.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {

			var online =  JSON.parse(this.responseText);

			if(online["stream"] == null) {
				document.getElementById(id).setAttribute("class", "twitch-offline");
			}else{
				document.getElementById(id).setAttribute("class", "twitch-online");
			}

		}
	}

	httpRequest.open("GET", "https://api.twitch.tv/kraken/streams/" + channel + "?client_id=y7z85v0l98i37ufjgziaamtjtxwp4s", true);
	httpRequest.send();

}