console.log=function(str){
	var txt=document.getElementById("console");
	if (!txt){
		txt=document.createElement("div");
		txt.id="console";
		document.body.appendChild(txt);
	}
	txt.innerHTML+=str+"<br/>";
}