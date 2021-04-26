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






/*

TO DO
- alert passing input arg
- display, show hide
- mouse location
- rollover
- get dimensions of element
- append elements, manipulate DOM
- personal site to play with

*/
