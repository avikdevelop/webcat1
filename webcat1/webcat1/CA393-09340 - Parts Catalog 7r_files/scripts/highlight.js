	var add = document.getElementsByTagName("body")
	add.addEventListener("load",highlight())

function highlight() {
    if (typeof(localStorage["word"] != undefined)) {
        var word = localStorage["word"]
	
        var body = document.documentElement.innerHTML
        var word2 = "<span style='background-color: yellow'>" + word + "</span>"
        var regx = new RegExp(word, "gi")
        var go = body.replace(regx, word2)
        document.documentElement.innerHTML = go
    }

}