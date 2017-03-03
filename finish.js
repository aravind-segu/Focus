$(document).ready(function(){
time();
visited();
$('.button').mouseenter(function(){
		$(this).css("background-color", "#76323F");
		$(this).css("color", "#D7CEC7");
	});
	$('.button').mouseleave(function(){
		$(this).css("background-color", "#D7CEC7");
		$(this).css("color", "#76323F");
	});
$('.button').click(function(){
		chrome.runtime.sendMessage({close: "close"}, function (response){
	});
});
});

function time (){
	var lastedMinutes;
	chrome.runtime.sendMessage({endTime: "endTime"}, function (response){
		var timeN = response.timeNw;
		chrome.runtime.sendMessage({setTime: "setTime"}, function (response){
			var timeS = response.timeSet;
			
			var minutes = Math.floor((timeN/1000/60)%60);
			
			lastedMinutes = timeS - minutes;	
			var string = "Your Focus Session Lasted For " + lastedMinutes + " minutes.";
			document.getElementById("body").innerHTML = string;
		});
	});
	
	
}

function visited(){
	
	chrome.runtime.sendMessage({visited: "visited"}, function (response){
		var string = "You visited Blocked Sites " + response.visited + " times.";
		document.getElementById("visited").innerHTML = string;
	});
}
