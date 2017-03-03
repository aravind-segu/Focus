chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	switch (message.type){
		case "urlCheck":{
			chrome.runtime.sendMessage({user: "focus"}, function(response) {
				if (response.call == "true"){
					var url = message.checkurl;
					run(url);
				}
			});	
		}
		
		default:{
			console.log("cameout");
		}
	}
});


function run(url){
	
			var found = false;
			chrome.runtime.sendMessage({method: "getCounter"}, function(response) {
					for (var i = 1; i <= (response.status); i++){
						var storageName = 'text' + i;
						chrome.runtime.sendMessage({url: "getURL", search: storageName}, function (response){
							var string = response.website;
							var finalString = string.toLowerCase();
							
							if (url.indexOf(response.website) > -1){
								chrome.runtime.sendMessage({found: "found"}, function (response){found = true;});
								
							}
						});
					}
					if (found == false){
					chrome.runtime.sendMessage({notfound: "notfound"}, function (){});
					}
			});
}


