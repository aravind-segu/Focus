chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
	
	if (response.method == "getCounter"){
		sendResponse({status: localStorage["count"]});
	}
	if (response.url == "getURL"){
		sendResponse({website: localStorage[response.search]});
	}
	if (response.found == "found"){
		 chrome.tabs.update({
			url: "block.html"
		});
	}
	if (response.close == "close"){
		
		chrome.tabs.getCurrent(function(tab) {
			chrome.tabs.update({url:"https://www.google.ca/"});
		});


	
	}
	if (response.save == "changesSaved"){
		if (localStorage["Alarm"]== "On"){
			chrome.windows.getAll(function(windows) {
				
				if (windows.length == 1 || localStorage["microAlarm"] == undefined || localStorage["microAlarm"] == " ") {
					chrome.alarms.create("microBreaks", {
					periodInMinutes : 15
					});
				localStorage["microAlarm"] = "created";
				}
			});
			}else {
				
			chrome.alarms.clear("microAlarm", function (){
			});
		}		
		}
	
	if (response.user == "focus"){
		var input = localStorage["start"];
		if (input == "true"){
			
			sendResponse({call: "true"});
		}else{
			sendResponse({call: "false"});
		}
	}
	if (response.start == "start"){
	chrome.tabs.executeScript (null, {file: "eyeBreak.js"});
		if (localStorage["start"] == "true"){
			chrome.windows.getAll(function (windows){
				windows.forEach(function(windowN){
					chrome.tabs.getAllInWindow (windowN.id, function(tabs){
						tabs.forEach(function(tab){
							for (var i = 1; i <= (localStorage["count"]); i++){
								var storageName = 'text' + i;
								if ((localStorage[storageName] == "")||(localStorage[storageName] == " ")){
										continue;
									}
										if ((tab.url).indexOf(localStorage[storageName]) > -1){
											if (tabs.length == 1){
												chrome.tabs.create ({windowId: windowN.id}, function (){});
												chrome.tabs.remove(tab.id, function (){});
											}else {
											chrome.tabs.remove(tab.id, function() { });
											}
										}
								
								}
						});
						
					});
				});
			});
				var currentURL;
					chrome.tabs.onUpdated.addListener(function(tabId,changeInfo, tab){
						chrome.tabs.get(tabId, function(tab){
						currentURL = tab.url;
						console.log(currentURL);	
						checkURL();
						});
					});

				var checkURL = function (){
					chrome.tabs.getSelected(null, function(tab){
						console.log(currentURL);
						chrome.tabs.sendMessage (tab.id , {type: "urlCheck", checkurl: currentURL});
					});
				}
					var date = new Date();
					var startTime = date.getTime();
				
					localStorage["startTime"] = startTime;
					var setTime = localStorage["time"];
					var date = startTime + (setTime*60*1000);
					chrome.alarms.create("endTime", {
						when: date
					});
		}
	}
	if (response.start == "stop"){
		chrome.alarms.clear("endTime", function (){
			});
		chrome.tabs.create({
			url: "finish.html"
		});
	}
	if (response.getTime == "getTime"){
		var d = new Date();
		var now = d.getTime();
		
		var StartTime = localStorage ["startTime"];
		var difference = now - StartTime;
	
		var setTime = localStorage ["time"];
		
		var timeNow = (setTime*60*1000) - difference;
		
		localStorage["timeNow"] = timeNow;
	}
	
	if (response.endTime == "endTime"){
		var timeNow = localStorage["timeNow"];
		sendResponse({timeNw: timeNow});
	}
	if (response.setTime == "setTime"){
		var setTime = localStorage ["time"];
		sendResponse({timeSet: setTime});
	}
	if (response.visited == "visited"){
		
		if (localStorage ["visitedBlock"] == null){
			sendResponse({visited: 0});
		}else{
			var visited = localStorage["visitedBlock"];
			
			localStorage["visitedBlock"] = 0;
			sendResponse({visited: visited});
		}
	}
	if (response.visitBlock == "visitBlock"){
	

		if (localStorage ["visitedBlock"] == null){
			
			localStorage["visitedBlock"] = 0;
		}else{
			
			var visited = localStorage["visitedBlock"];
			visited++;
			localStorage["visitedBlock"] = visited;
		}
		
	}
	else sendResponse ({});
});

chrome.alarms.onAlarm.addListener(function (alarm){
	if (alarm.name == "endTime"){
	localStorage["start"] = "false";
	localStorage["startTime"] = undefined;
	chrome.tabs.create({
			url: "finish.html"
		});
	}
	if (alarm.name == "microBreaks"){
		if (localStorage["Alarm"]== "On"){
			chrome.notifications.create('break',
				{type: 'image', 
				iconUrl: 'icon.png', 
				title: "Break", 
				message: "Take your eyes of the screen and look at an object far away to relax your eyes.",
				imageUrl: 'break.png',
				priority: 1}, function (notificationId){});
		//alert (); "		}
	}
}
});


chrome.runtime.onStartup.addListener (function (){
		
		if (localStorage["Alarm"]== "On"){
			
			chrome.windows.getAll(function(windows) {
				
				if (windows.length == 1 || localStorage["microAlarm"] == undefined || localStorage["microAlarm"] == " ") {
					
					chrome.alarms.create("microBreaks", {
					periodInMinutes : 15
					});
				localStorage["microAlarm"] = "created";
				}
			});
		}
});

chrome.runtime.onInstalled.addListener(function(details){
	if (localStorage["start"] == "true"){
			
				localStorage["start"] = "false";
				localStorage["startTime"] = undefined;
				localStorage ["time"] = "";
	}
	chrome.tabs.create({
		url: "instructions.html"
	});
});



				