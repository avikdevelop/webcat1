var searchInput = document.getElementById("search");
var onofSaerch = document.getElementById("go")
	  onofSaerch.disabled = true;
var arrayForAuth = [];
var arrayForAuthDivs = [];

function createElementForMes(){
var divOfSearch = document.getElementsByClassName("searchbox")
var pForMes = document.createElement("p")
	  pForMes.id = "notFoundMes";
	  pForMes.style.color = "#009";
	  pForMes.style.fontWeight = "bold";
	  pForMes.style.fontFamily = "arial";
	  divOfSearch[0].appendChild(pForMes)
	  }

function getIdsForAuth(){
	for(var i = 0; i < authInfo.length; i++) {
		if(authInfo[i].serial ==sn){
			arrayForAuth.push(authInfo[i].div)
		}
	}
}

function compareAndGetDivsForAuth(){
	for(var n = 0; n<divInfo.length; n++) {
		for(var o = 0; o<arrayForAuth.length; o++) {
			if(divInfo[n].div.indexOf(arrayForAuth[o])!=-1){
				arrayForAuthDivs.push(divInfo[n])
			}
		}	
	}
}

function ableSearchAndFocusInput(){
	onofSaerch.disabled = false;
	       searchInput.focus();
}

function enter(event){
	var keyBoard = event.which || event.keyCode
	if(keyBoard == 13){
	search()
	}
}

createElementForMes();
getIdsForAuth();
compareAndGetDivsForAuth();
ableSearchAndFocusInput();
document.body.setAttribute("onkeypress","enter(event)")
function search(){
	var searchPart = searchInput.value;
		if(searchPart==""){return ableSearchAndFocusInput()}
	var notFoundMes = document.getElementById("notFoundMes")
	var links = [];	
	var arrayForDiv = [];
	var searchPartUC =  searchPart.toUpperCase();
	var searchPartLC =  searchPart.toLowerCase();
	function searchWordOnPagesInfo1AndGetLinks(){
		for (var m= 0; m<pagesInfo1.length; m++) {
			if(pagesInfo1[m].bom1.indexOf(searchPart)!=-1 || pagesInfo1[m].bom1.indexOf(searchPartUC)!=-1 || pagesInfo1[m].bom1.indexOf(searchPartLC)!=-1){
			links.push(pagesInfo1[m].link)
			}
			else if(pagesInfo1[m].link.indexOf(searchPart)!=-1 || pagesInfo1[m].link.indexOf(searchPartUC)!=-1 || pagesInfo1[m].link.indexOf(searchPartLC)!=-1){
			links.push(pagesInfo1[m].link)
			}
			else if(pagesInfo1[m].title.indexOf(searchPart)!=-1 || pagesInfo1[m].title.indexOf(searchPartUC)!=-1 || pagesInfo1[m].title.indexOf(searchPartLC)!=-1){
			links.push(pagesInfo1[m].link)
			}
		}
	}
	searchWordOnPagesInfo1AndGetLinks();
	if(links.length>0){		
		var arrayForFinalDivs = [];
			for (var l= 0; l < arrayForAuthDivs.length; l++) {
				for (var j= 0; j < links.length; j++) {
				var linksSearchOnDiv = arrayForAuthDivs[l].div.indexOf(links[j]);
					if(linksSearchOnDiv!=-1){
					var exist = false;
						for (var p= 0; p < arrayForFinalDivs.length; p++) {
						if(arrayForAuthDivs[l].href==arrayForFinalDivs[p].href &&  arrayForAuthDivs[l].src==arrayForFinalDivs[p].src){
						exist = true
						}
						}
						if(!exist){
						arrayForFinalDivs.push(arrayForAuthDivs[l])
						}
						else{
								exist = false;
						}
					}
				}
			}
		if(arrayForFinalDivs.length==0){
		notFoundMes.innerHTML = "No match was found!"
		}
		else{
		searchInput.value = "";
		notFoundMes.innerHTML = "";
		ableSearchAndFocusInput();
		var arrayForSend = [];
		for (var q= 0; q < arrayForFinalDivs.length; q++) {
			arrayForSend.push(arrayForFinalDivs[q].div)
		}		
		window.open("./scripts/searchResult1.html",JSON.stringify({divs:arrayForSend,word:searchPart}));
		}
	}	
	else{
		notFoundMes.innerHTML = "No match was found!"
	}
}