
function intializePageInfoDb(createDb){
	var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	var loadingMas = document.getElementById("pageLoading");
	loadingMas.innerHTML = "";
	createDb();
    }
  };
  xhttp.open("POST", "http://localhost:8080/intializePageInfoDb", true);
  xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send();
}
 
 function getPageInfo(){
var  getPageInfoButton =  document.getElementById("getPageInfo");
	getPageInfoButton.disabled = true;
	var xhttp = new XMLHttpRequest();
  	      xhttp.onreadystatechange = function() {
  	  		if (this.readyState == 4 && this.status == 200) {
				if(this.responseText=="there is no files!"){
			alert("ther is no files in page folder!")
			return
		}
		  	  			var arrayOfPagesName  = this.responseText;
		intializePageInfoDb(function(){
                arrayOfPagesName  = JSON.parse(arrayOfPagesName);
				 function arrayOfPagesNameLengthState(){
						var load = arrayOfPagesName.length;
						var largeThenHundred = (arrayOfPagesName.length>=100);
						load = load-(load%100);
						var load1 =load/100;
							  return {load:load,load1:load1,largeThenHundred:largeThenHundred};
				};
				var load = arrayOfPagesNameLengthState().load;
				var load1 = arrayOfPagesNameLengthState().load1;
				var largeThenHundred =arrayOfPagesNameLengthState().largeThenHundred;
				var percent =0;
				var graf = document.getElementById("pageGraf");
				var loading = document.getElementById("pageLoading");
				var per = document.getElementById("pagePer");
				var graf1 = document.getElementById("pageGraf1");
				loading.innerHTML = "loading..."
				function writToFile(){
				var fileName = 	arrayOfPagesName[0];
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						if(this.responseText=="The data was saved!"){
						arrayOfPagesName.splice(0,1);
								if(arrayOfPagesName.length<load && (arrayOfPagesName.length%load1)==0 && largeThenHundred==true){
									percent ++;
											graf1.style.background = "#ddd";
											loading.innerHTML = "loading..."
											graf.style.width = percent*2;
											per.style.marginLeft = percent*0.8;
											per.innerHTML = percent+"%";
								}
								if(arrayOfPagesName.length!=0){
									writToFile();
								}
								else{
									setTimeout(function(){
											loading.innerHTML = "page data was created!"
											getPageInfoButton.disabled = false;
											graf.style.width = 0;
											graf1.style.background = "none";
											per.style.marginLeft = 0;
											per.innerHTML = "";
											},1300);
								}
							}
					}
				}
				xhttp.open("POST", "http://localhost:8080/gatherPageInfo", true);
				xhttp.setRequestHeader("Content-type", "application/json");
				xhttp.send(JSON.stringify({fileName:fileName}));
				}
				
			writToFile()
	})
  	  		}
  	  	
			
		};
             xhttp.open("GET", "http://localhost:8080/getPageFilesName", true);
             xhttp.send();  
		 
 }




function intializeDivInfoDb(createDb){
	var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	var loadingMas = document.getElementById("divLoading");
	loadingMas.innerHTML = "";
	createDb();
    }
  };
  xhttp.open("POST", "http://localhost:8080/intializeDivInfoDb", true);
  xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send();
}
 
 function getDivInfo(){	
 var  getDivInfoButton =  document.getElementById("getDivInfo");
	getDivInfoButton.disabled = true;
	var xhttp = new XMLHttpRequest();
  	      xhttp.onreadystatechange = function() {
  	  		if (this.readyState == 4 && this.status == 200) {
				if(this.responseText=="there is no files!"){
			alert("ther is no files in page folder!")
			return
		}
		  	  			var arrayOfPagesName  = this.responseText;
		intializeDivInfoDb(function(){
                arrayOfPagesName  = JSON.parse(arrayOfPagesName);
				 function arrayOfPagesNameLengthState(){
						var load = arrayOfPagesName.length;
						var largeThenHundred = (arrayOfPagesName.length>=100);
						load = load-(load%100);
						var load1 =load/100;
							  return {load:load,load1:load1,largeThenHundred:largeThenHundred};
				};
				var load = arrayOfPagesNameLengthState().load;
				var load1 = arrayOfPagesNameLengthState().load1;
				var largeThenHundred =arrayOfPagesNameLengthState().largeThenHundred;
				var percent =0;
				var graf = document.getElementById("divGraf");
				var loading = document.getElementById("divLoading");
				var per = document.getElementById("divPer");
				var graf1 = document.getElementById("divGraf1");
					  loading.innerHTML = "loading..."
				function writToFile(){
				var fileName = 	arrayOfPagesName[0];
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						if(this.responseText=="The data was saved!"){
						arrayOfPagesName.splice(0,1);
								if(arrayOfPagesName.length<load && (arrayOfPagesName.length%load1)==0 && largeThenHundred==true){
									percent ++;
											graf1.style.background = "#ddd";
											loading.innerHTML = "loading..."
											graf.style.width = percent*2;
											per.style.marginLeft = percent*0.8;
											per.innerHTML = percent+"%";
								}
								if(arrayOfPagesName.length!=0){
									writToFile();
								}
								else{
									setTimeout(function(){
											loading.innerHTML = "part-links data was created!"
											getDivInfoButton.disabled = false;
											graf.style.width = 0;
											graf1.style.background = "none";
											per.style.marginLeft = 0;
											per.innerHTML = "";
											},1300);
								}
							}
					}
				}
				xhttp.open("POST", "http://localhost:8080/gatherDivPageInfo", true);
				xhttp.setRequestHeader("Content-type", "application/json");
				xhttp.send(JSON.stringify({fileName:fileName}));
				}
				
			writToFile()
	})
  	  		}
  	  	
			
		};
             xhttp.open("GET", "http://localhost:8080/getDivFilesName", true);
             xhttp.send();  
		 
 }
 
 
 
function intializeAuthInfoDb(createDb){
	var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	var loadingMas = document.getElementById("authLoading");
	loadingMas.innerHTML = "";
	createDb();
    }
  };
  xhttp.open("POST", "http://localhost:8080/intializeAuthInfoDb", true);
  xhttp.setRequestHeader("Content-type", "application/json");
xhttp.send();
}
 
 function getAuthInfo(){
var  getAuthInfoButton =  document.getElementById("getAuthInfo");
	getAuthInfoButton.disabled = true;
	var xhttp = new XMLHttpRequest();
  	      xhttp.onreadystatechange = function() {
  	  		if (this.readyState == 4 && this.status == 200) {
				if(this.responseText=="there is no files!"){
			alert("ther is no files in page folder!")
			return
		}
		  	  			var arrayOfPagesName  = this.responseText;
		intializeAuthInfoDb(function(){
                arrayOfPagesName  = JSON.parse(arrayOfPagesName);
				 function arrayOfPagesNameLengthState(){
						var load = arrayOfPagesName.length;
						var largeThenHundred = (arrayOfPagesName.length>=100);
						load = load-(load%100);
						var load1 =load/100;
							  return {load:load,load1:load1,largeThenHundred:largeThenHundred};
				};
				var load = arrayOfPagesNameLengthState().load;
				var load1 = arrayOfPagesNameLengthState().load1;
				var largeThenHundred =arrayOfPagesNameLengthState().largeThenHundred;
				var percent =0;
				var graf = document.getElementById("authGraf1");
				var loading = document.getElementById("authLoading");
				var per = document.getElementById("authPer");
				var graf1 = document.getElementById("authGraf");
				loading.innerHTML = "loading..."
				function writToFile(){
				var fileName = 	arrayOfPagesName[0];
				var xhttp = new XMLHttpRequest();
				xhttp.onreadystatechange = function() {
					if (this.readyState == 4 && this.status == 200) {
						if(this.responseText=="The data was saved!"){
						arrayOfPagesName.splice(0,1);
								if(arrayOfPagesName.length<load && (arrayOfPagesName.length%load1)==0 && largeThenHundred==true){
									percent ++;
											graf1.style.background = "#ddd";
											loading.innerHTML = "loading..."
											graf.style.width = percent*2;
											per.style.marginLeft = percent*0.8;
											per.innerHTML = percent+"%";
								}
								if(arrayOfPagesName.length!=0){
									writToFile();
								}
								else{
									setTimeout(function(){
											loading.innerHTML = "authorization data was created!";
											getAuthInfoButton.disabled = false;
											graf.style.width = 0;
											graf1.style.background = "none";
											per.style.marginLeft = 0;
											per.innerHTML = "";
											},1300);
								}
							}
					}
				}
				xhttp.open("POST", "http://localhost:8080/getAuthInfo", true);
				xhttp.setRequestHeader("Content-type", "application/json");
				xhttp.send(JSON.stringify({fileName:fileName}));
				}			
			writToFile()
	})
  	  		}
  	  	
		
		};
             xhttp.open("GET", "http://localhost:8080/getAuthFilesName", true);
             xhttp.send();  
		 
 }


