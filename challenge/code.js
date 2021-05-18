window.onload = init;

function init() {
	if (window.Event) {
	document.captureEvents(Event.MOUSEMOVE);
	}
	document.onmousemove = glassMouse;
}
function glassMouse(e){
  var glass = document.getElementById('mouseImg');
	var bigGoogle = document.getElementById("bigImg");
  var x = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	var y = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
  var info = glass.getBoundingClientRect();
	var bigInfo = bigGoogle.getBoundingClientRect();
  var imgWidth = info.width;
  var imgHeight = info.height;
	var bigWidth = bigInfo.width;
	var bigHeight = bigInfo.height;
	var smallX = x;
	var smallY = y;
	var bigX = x;
	var bigY = y;
	var backImgX = 4*x - 300;
	var backImgY = 4*y - 300;
	var finalPosX = x - backImgX;
	var finalPosY = y - backImgY;
  smallX = smallX - (imgWidth/2);
  smallY = smallY - (imgHeight/2);
  glass.style.left = smallX + 'px';
  glass.style.top = smallY + 'px';
	bigY = bigY - (bigHeight/2);
	bigX = bigX + (bigWidth/2) + 100;
		bigGoogle.style.left = bigX + 'px';
	bigGoogle.style.top = bigY + 'px';
	bigGoogle.style.backgroundPosition = finalPosX + 'px ' + finalPosY + 'px';
 	return;
}

function getGlass(){
  document.getElementById("mouseImg").style.opacity=1;
	console.log("Enter");
  return;
}

function noGlass(){
	document.getElementById("mouseImg").style.opacity=0;
	console.log("leave");
	return;
}
