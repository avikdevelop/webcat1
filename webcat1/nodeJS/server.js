const express = require('express') ;
const app = express() ;
const port = 8080;
const fs = require('fs');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
var $ = cheerio.load("file.htm");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

var testFolder = "./../webcat/page";
app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
 app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/intializePageInfoDb', function (req, res) {
	 fs.writeFile("./../webcat1/CA393-09340 - Parts Catalog 7r_files/db/pagesInfo1.js", "var pagesInfo1 = [];", function(err) {
        if(err) {
            return console.log(err);
        }
        res.send("The data was removed!");
    })
})

app.get('/getPageFilesName', function (req, res) {
    var path = "./../webcat1/CA393-09340 - Parts Catalog 7r_files/page";
    fs.readdir(path, function(err, files){
        if (err) return;
        var arrayOfFileName = [];
        files.forEach(function(fileName) {
            var src = fileName.search(".htm");
            var src1 = fileName.search(".html");
            if (src!=-1 || src1!=-1){
                arrayOfFileName.push(fileName)
            }
        });
		if(arrayOfFileName.length==0){
			res.send("there is no files!")
		}
		else{
			res.send(arrayOfFileName);
		}
    });
});

app.post('/gatherPageInfo', function (req, res) {
    var fileName = req.body.fileName;
    var pathPrefix = "./../webcat1/CA393-09340 - Parts Catalog 7r_files/page/";
    var path = pathPrefix+fileName;
	 	fs.readFile(path, 'utf8', function (err,dataArray) {
                  if (err) {
                      return console.log(err);
                  }
				var bodyPosition = dataArray.search("</body>");
                  var untilBody = dataArray.slice(0, bodyPosition);
                  var bodyAndNext = dataArray.slice(bodyPosition);
                  var scriptAdd0 = "<script src='../scripts/highlight.js'></script>";
                  var check0 = dataArray.search(scriptAdd0);
                  var allScript="";
                  if(check0==-1) {
                      allScript += scriptAdd0;
                  }
                  if(allScript!=""){
                      fs.writeFile(path, untilBody +allScript+"\n" + bodyAndNext, function (err) {			
                          if (err) {
                              return console.log(err);
                          }
                      });
                  }
		})
		
           fs.readFile(path, function(err, files){
                if (err) return;		
                $ = cheerio.load(files.toString());
                var title = $('#title').text();
                var bom1 = $('.bom1 td').text();
				var imageArray  =[];
				$("img").each(function (index, element) {
        imageArray.push($(element).attr("src"));
				})
                var obj = {title:title,link:fileName,bom1:bom1,image :imageArray };
                var dbPath = "./../webcat1/CA393-09340 - Parts Catalog 7r_files/db/pagesInfo1.js";
                fs.readFile(dbPath,'utf8', function(err, files1){
                    if (err) return;
                    var db = files1;
                    db = db.slice(17,db.length-1);
                    db = JSON.parse(db);
                    db.push(obj);
                    db = JSON.stringify(db);
                    fs.writeFile(dbPath, "var pagesInfo1 = "+db +";", function(err) {
                        if(err) {
                            return console.log(err);
                        }
                        res.send("The data was saved!");
                    });
                }); 		
       });
});




app.post('/intializeDivInfoDb', function (req, res) {
	 fs.writeFile("./../webcat1/CA393-09340 - Parts Catalog 7r_files/db/divPagesInfo.js", "var divInfo = [];", function(err) {
        if(err) {
            return console.log(err);
        }
        res.send("The data was removed!");
    })
})

app.get('/getDivFilesName', function (req, res) {
    var path = "./../webcat1/CA393-09340 - Parts Catalog 7r_files";
    fs.readdir(path, function(err, files){
        if (err) return;
        var arrayOfFileName = [];
        files.forEach(function(fileName) {
            var src = fileName.search(".htm");
            var src1 = fileName.search(".html");
            if (src!=-1 || src1!=-1){
                arrayOfFileName.push(fileName)
            }
        });
		if(arrayOfFileName.length==0){
			res.send("there is no files!")
		}
		else{
			res.send(arrayOfFileName);
		}
    });
});

app.post('/gatherDivPageInfo', function (req, res) {
      var fileName = req.body.fileName;
	var pathPrefix = "./../webcat1/CA393-09340 - Parts Catalog 7r_files/";
      var path = pathPrefix+fileName;
	var homeSearch = fileName.search("home");
	if(homeSearch!=-1){
		fs.readFile(path, 'utf8', function (err,file) {
			if (err) {
				return console.log(err);
			}
			var bodyPosition = file.search("</body>");
			var untilBody = file.slice(0, bodyPosition);
			var bodyAndNext = file.slice(bodyPosition);
			var scriptHomeAdd0 = "<script src='./db/authorizationInfo.js'></script>";
			var scriptHomeAdd1 = "<script src='./db/divPagesInfo.js'></script>";
			var scriptHomeAdd2 = "<script src='./db/pagesInfo1.js'></script>";
			var scriptHomeAdd3 = "<script src='./scripts/searchResult1.js'></script>";
			var check0 = file.search(scriptHomeAdd0);
			var check1 = file.search(scriptHomeAdd1);
			var check2 = file.search(scriptHomeAdd2);
			var check3 = file.search(scriptHomeAdd3);
			var allScript="";
			if(check0==-1) {
				allScript += scriptHomeAdd0 +"\n";
			}
			if(check1==-1) {
				allScript += scriptHomeAdd1 +"\n";
			}
			if(check2==-1) {
				allScript += scriptHomeAdd2 +"\n";
			}
			if(check3==-1) {
				allScript += scriptHomeAdd3 +"\n";
			}
			if(allScript!=""){
				fs.writeFile(path, untilBody +allScript + bodyAndNext, function (err) {			
					if (err) {
						return console.log(err);
					}
				});
			}
		}) 			
	}
           fs.readFile(path, function(err, files){
                if (err) return;		
		$ = cheerio.load(files.toString());
		var array1 = [];
            var addAttr = "";
            $(".cond").each(function (index, element) {
                var attrObj =($(element).attr());
                for(var key in attrObj){
                    addAttr+= (key+"=\""+attrObj[key]+"\" ");
                }
            array1.push({
            link: fileName,
            div: "<div " +addAttr+">" + $(element).html() + "</div>"
            });
                addAttr = "";
            });
			$(".cond img").each(function (index, element) {
				($(element).attr("src"))
				for(var i=0;i<array1.length;i++){
					if(array1[i].div.indexOf($(element).attr("src"))!=-1){
						array1[i].src = $(element).attr("src")
					}
				}			
            });
			$(".cond a").each(function (index, element) {
				($(element).attr("href"))
				for(var i=0;i<array1.length;i++){
					if(array1[i].div.indexOf($(element).attr("href"))!=-1){
						array1[i].href = $(element).attr("href")
					}
				}			
            });
								
                var dbPath = "./../webcat1/CA393-09340 - Parts Catalog 7r_files/db/divPagesInfo.js";
                fs.readFile(dbPath,'utf8', function(err, files1){
                    if (err) return;
                    var db = files1;
                    db = db.slice(14,db.length-1);
                    db = JSON.parse(db);
                    db = db.concat(array1);
                    db = JSON.stringify(db);
                    fs.writeFile(dbPath, "var divInfo = "+db +";", function(err) {
                        if(err) {
                            return console.log(err);
                        }
                        res.send("The data was saved!");
                    });
                }); 
	
       });
});




app.post('/intializeAuthInfoDb', function (req, res) {
	 fs.writeFile("./../webcat1/CA393-09340 - Parts Catalog 7r_files/db/authorizationInfo.js", "var authInfo = [];", function(err) {
        if(err) {
            return console.log(err);
        }
        res.send("The data was removed!");
    })
})

app.get('/getAuthFilesName', function (req, res) {
    var path = "./../webcat1/CA393-09340 - Parts Catalog 7r_files";
    fs.readdir(path, function(err, files){
        if (err) return;
        var arrayOfFileName = [];
        files.forEach(function(fileName) {
            var src = fileName.search(".htm");
            var src1 = fileName.search(".html");
            if (src!=-1 || src1!=-1){
                arrayOfFileName.push(fileName)
            }
        });
		if(arrayOfFileName.length==0){
			res.send("there is no files!")
		}
		else{
			res.send(arrayOfFileName);
		}
    });
});

app.post('/getAuthInfo', function (req, res) {
    var fileName = req.body.fileName;
    var pathPrefix = "./../webcat1/CA393-09340 - Parts Catalog 7r_files/";
    var path = pathPrefix+fileName;
			fs.readFile(path,'utf8',function(err, files){
					if (err) return console.log(err);		
			var itemSelector = files.search("_itemSelector");
			if(itemSelector !=-1){
					  files = files.slice(itemSelector,files.length);
				var scriptEnd = files.search("</script>");
					  files = files.slice(0,scriptEnd);
				var array1 = files.replace(/}\,/g, "}#&%");
				var array3 = [];
				var array4 = [];
				var array2 = array1.split("#&%");
				for (var i = 0; i < array2.length; i++) {
					if (array2[i].search(/([^\/\/])({.*})/g) != -1) {
						array3.push(array2[i])
					}
				}
				array3[array3.length - 1] = array3[array3.length - 1].replace(array3[array3.length - 1],array3[array3.length - 1].match(/{.*}/g));
				array3[0] = array3[0].replace(array3[0], array3[0].match(/{.*}/g));
				const com = "./node_modules/convert_text/convert_this.js";
				fs.writeFile(com, "<p>[" + array3 + "]</p>", function (err) {
					if (err) {
						return console.log(err);
					}
					fs.readFile(com, function (err1,convertFile) {
						if (err) return console.log(err);
						$ = cheerio.load(convertFile.toString());
						var a = eval($("p").text());
						for (var i = 0; i < a.length; i++) {
							if (typeof(a[i].z) != "undefined") {
								if (typeof(a[i].z) == "object") {
									for (var j = 0; j < a[i].z.length; j++) {
										if (typeof(a[i].min) != "undefined") {
											array4.push({serial: a[i].min, div: a[i].z[j]});
										}
										if (typeof(a[i].max) != "undefined") {
											array4.push({serial: a[i].max, div: a[i].z[j]});
										}
										if (typeof(a[i].sns) != "undefined") {
											if (typeof(a[i].sns) == "object") {
												for (var k = 0; k < a[i].sns.length; k++) {
													array4.push({serial: a[i].sns[k], div: a[i].z[j]})
												}
											}
											else {
												array4.push({serial: a[i].sns, div: a[i].z[j]})
											}
										}
									}
								}
								else{
									if (typeof(a[i].min) != "undefined") {
										array4.push({serial: a[i].min, div: a[i].z});
									}
									if (typeof(a[i].max) != "undefined") {
										array4.push({serial: a[i].max, div: a[i].z});
									}
									if (typeof(a[i].sns) != "undefined") {
										if (typeof(a[i].sns) == "object") {
											for (var k = 0; k < a[i].sns.length; k++) {
												array4.push({serial: a[i].sns[k], div: a[i].z})
											}
										}
										else {
											array4.push({serial: a[i].sns, div: a[i].z})
										}
									}
								}
							}
						}
					var dbPath = "./../webcat1/CA393-09340 - Parts Catalog 7r_files/db/authorizationInfo.js";
					fs.readFile(dbPath,'utf8', function(err, files1){
						if (err) return console.log(err);
						var db = files1;
						db = db.slice(15,db.length-1);
						db = JSON.parse(db);
						db = db.concat(array4);
						db = JSON.stringify(db);
						fs.writeFile(dbPath, "var authInfo = "+db +";", function(err) {
							if(err) {
								return console.log(err);
							}
							res.send("The data was saved!");
						});
					}); 
					});
				});
			}
			else{
				res.send("The data was saved!");
			}
	});
});













