$(document).ready(function(){
	
		chrome.runtime.sendMessage({getTime: "getTime"}, function (response){
			var timeData = localStorage["timeNow"];
			var timeDate = parseInt(timeData);
			var day = new Date();
			var no = day.getTime();
			var newTime = timeDate + no;
			initializeClock('clockdiv', newTime);
		});
		chrome.runtime.sendMessage({visitBlock: "visitBlock"}, function (){
			
		});
	
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

function getQuote(){
	chrome.tabs.executeScript(null,{
		file: "https://www.brainyquote.com/link/quotebr.js"
	});
}

function getTimeRemaining(endtime){
	var da = new Date ((endtime));
	var t = Date.parse(da) - Date.parse(new Date());
	
	//var t = endtime - (timeData * 60000);
	var seconds = Math.floor((t/1000)%60);
	var minutes = Math.floor((t/1000/60)%60);
	var hours = Math.floor((t/(1000*60*60))%24);
	
	return {
		'total': t,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}
function initializeClock(id, endtime){
		var clock = document.getElementById(id);
	var hoursSpan = clock.querySelector('.hours');
	var minutesSpan = clock.querySelector('.minutes');
	var secondsSpan = clock.querySelector('.seconds');
	

function updateClock(){
	var t = getTimeRemaining(endtime);
	hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
	minutesSpan.innerHTML = ('0' + t.minutes).slice (-2);
	secondsSpan.innerHTML = ('0' + t.seconds).slice (-2);
	if (t.total <= 0){
		clearInterval(timeinterval);
		localStorage["start"] = "false";
		localStorage["startTime"] = undefined;
		localStorage ["time"] = undefined;
	}
}

updateClock();
var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 24 * 60 * 60 * 1000);


