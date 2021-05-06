window.onload = init;

function click1(){
  //alert("Hello world");
  var i = document.getElementById('andy');
  console.log(i.src);
  console.log(window.location.href.replace("index.html","US.png"));
  if (i.src == window.location.href.replace("index.html","US.png")){
    i.src="https://www.w3schools.com/tryit/avatar.png";
  } else {
    i.src = "US.png";
  }
  grabText();
}

function euler1(){
  var sum = 0;
  for (var i = 0; i < 1000; i++){
    if (i % 3 == 0 || i % 5 == 0){
      sum = sum + i;
    }
  }
  document.getElementById("eulerVal").innerHTML=sum;
  return;
}


function grabText(){
  var textString = document.getElementById("myTextbox").value;
  alert(textString + " :)");
  if (textString == "Remove Button"){
    document.getElementById("eulerButton").style.display = "none";
    $("#eulerVal").hide();
  }
  if (textString == "Give me button"){
    document.getElementById("eulerButton").style.display = "block";
    $("#eulerVal").show();
  }
}

function init() {
	if (window.Event) {
	document.captureEvents(Event.MOUSEMOVE);
	}
	document.onmousemove = getCursorXY;
}

function getCursorXY(e) {
	var x = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	var y = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
  document.getElementById("mouseLocation").innerHTML=x + "," + y;
  return;
}

function getInfo(){
  var info = document.getElementById("eulerVal").getBoundingClientRect()
  console.log("X Position: " + info.right + "\nY Position: " + info.top + "\nHeight: " + info.height + "\nWidth: " + info.width);
  var a = [];
  var images = ["https://andytrattner.com/img/headshot.png","US.png"];
  for (var s of images){
    var x = document.createElement("IMG");
    x.src=s;
    a.push(x);
  }
  timedInject(a);
}

function timedInject(a){
  var counter = 1;
  console.log(a);
  for (var e of a){
    setTimeout(() => {
            document.body.appendChild(e);
    },1000*counter);
    counter++;
  }
}

/*

TO DO
x alert passing input arg
x display, show hide
x mouse location
x rollover
x get dimensions of element
- append elements, manipulate DOM
- personal site to play with

*/
