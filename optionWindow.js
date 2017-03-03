var counter = getCounter();
var wrapper = ".txtBoxes";
$(document).ready(function(){
	test1();
	
	var add_button = $("#addBtn");
	$('.add').mouseenter(function(){
		$(this).css("background-color", "#76323F");
		$(this).css("color", "#C09F80");
		
	});
	$('.add').mouseleave(function(){
		$(this).css("background-color", "#C09F80");
		$(this).css("color", "#76323F");
	});
	
	$("#addBtn").click(function(){
		counter++;
		var idName = 'textbox' + counter;
		
		var textBoxes = document.createElement("input");
		textBoxes.setAttribute ("type", "text");
		textBoxes.setAttribute ("class", "textBox");
		textBoxes.setAttribute ("id", idName);
		textBoxes.setAttribute ("placeholder", "eg.facebook");
		var division = document.createElement("div");
		$(division).css("padding", "5px");
		$(wrapper).append(division);
		$(division).append(textBoxes);
		$(division).append ('<div class = "removeText"><strong>x</strong></div></div>');
		
	});
	
	$(wrapper).on("click",".removeText", function(){
		//$(this).setAttribute("id", "remove");
		
		$(this).parent('div').remove();
		//counter--;
		/*
		var removed = 0;
		var data = document.getElementsByClassName("textBox");
		for (i = 1; i <= data.length; i++){
			var idName = data[i].getAttribute("id");
			if ((idName.localeCompare("remove") == 0){
				removed = i;
			}
		}
		for (i = removed; i <= data.length; i++){
			var idName = 'textbox' + (i+1);
			var dataTxt = document.getElementById(idName);
			var newidName = 'textbox' + i;
				dataTxt.setAttribute("id", newidName );
		}
		*/
	});
	$('.removeText').mouseenter(function(){
		$(this).css("background-color", "#76323F");
		$(this).css("color", "#C09F80");
	
	});
	$('.removeText').mouseleave(function(){
		$(this).css("background-color", "#C09F80");
		$(this).css("color", "#76323F");

	});
	
	$('.removeText').click(function(){
		$(".input").children().last().remove();
	});
	
	$('.button').mouseenter(function(){
		$(this).css("background-color", "#76323F");
		$(this).css("color", "#D7CEC7");
	});
	$('.button').mouseleave(function(){
		$(this).css("background-color", "#D7CEC7");
		$(this).css("color", "#76323F");
	});
	$("#save").click(function(){
		saveOptions(counter);
			if(document.getElementById('switch').checked) {
			localStorage["Alarm"] = "On";
		} else {
			
			localStorage["Alarm"] = "Off";
			localStorage["microAlarm"] = " ";
		}
		chrome.runtime.sendMessage({save: "changesSaved"}, function (response){});
		alert ("Changes Saved");
	});
	
});

function getCounter(){
	var counter = localStorage["count"];
	if (counter == undefined){
		
		return 1;
	}else{
		return counter;
	}
	
}
function saveOptions(){
	
	localStorage["count"] = counter;
	for ( i = 1; i <= counter; i++){
		var idName = 'textbox' + i;
		var storageName = 'text' + i;
		if(document.getElementById(idName) == null){
			localStorage.removeItem('text' + i);
			continue;
		}
		var data = document.getElementById(idName).value;
		dataCase = data.toLowerCase();
		if (dataCase == " "){
			
			continue;
		}
		if (dataCase == ""){
			
			continue;
		}
		if (data == undefined){
			localStorage[storageName] = " ";
		}else{
			localStorage [storageName] = dataCase;
		}		
	}
	var timeId = 'timeInput';
	var timeData = document.getElementById(timeId).value;
	if (timeData == undefined){
		localStorage["time"] = " ";
	}else {
		localStorage["time"] = timeData;
	}
	
	
}
function test1(){
		var counter = localStorage ["count"];
		var wrapper = $(".txtBoxes");
		var websites = [];
		for (i = 1; i <= counter; i++){
			var storageName = 'text' + i;
			var web = localStorage[storageName];
			
			if (web == undefined){
				continue;
			}
			websites[i-1] = web;
		}
	$(wrapper).append('<div style = "padding: 5px;" ><input type="text" class = "textBox" id = "textbox1" placeholder = "eg.facebook" name = "mytext[]"></div>');
	if (websites [0] != undefined ){
		var txts = document.getElementById('textbox1');
		txts.value = websites[0];
	}
	for (i = 2; i <= counter; i++){
		var data = websites[i-1];
		if (data == undefined){
			continue;
		}
		var idName = 'textbox' + i;
		var textBox = document.createElement("input");
		textBox.setAttribute ("type", "text");
		textBox.setAttribute ("class", "textBox");
		textBox.setAttribute ("id", idName);
		textBox.setAttribute ("placeholder", "eg.facebook");
		var division = document.createElement("div");
		$(division).css("padding", "5px");
		$(wrapper).append(division);
		$(division).append(textBox);
		$(division).append ('<div class = "removeText"><strong>x</strong></div></div>');
		if (data != undefined){
			var txts = document.getElementById(idName);
			txts.value = data;
		}
	}
	$("#timeText").append('<input id = "timeInput" type="number" name= "time" min="0" placeholder = "Enter time in Minutes">');
	var timeData = localStorage['time'];
	if (timeData != undefined){
		var timeTxt = document.getElementById("timeInput");
		timeTxt.value = timeData;
	}
	$(".switch").append('<input type="checkbox" id = "switch">');
	$(".switch").append('<div class="slider round"></div>');
	if (localStorage["Alarm"] == "On"){
		var button = document.getElementById('switch');
		$('#switch').attr('checked',true);
			
	}
}




