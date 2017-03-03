function saveWebsites (counter, websites){
for ( i = 1; i <= counter; i++){
		var idName = "textbox1";
		//websites.push( document.getElementById(idName).value);
		alert($(idName).val());
	}
	var website = JSON.stringify(websites);
	localStorage.setItem('websites', website);
}