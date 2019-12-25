function $(d){
			var ele=document.getElementById(d);
			return ele;
		}
function Xhr(){
	var xhr=null;
	if (window.XMLHttpRequest)
	{
		xhr=new XMLHttpRequest();
	}
	else{
		xhr=new ActiveXObject("Microsoft.XMLHttp");
	}
	return xhr;
}