
var moveCounter = 1;
var finalMove;
var playerColor = "W";
var gameFlag = 0;
const resultDict = {
  "W": "White Won!",
  "B": "Black Won!",
  "D": "Draw? You both Suck!"
}

async function createGame(){
  var gameName = document.getElementById("gameNameInput").value;
  var backendOutput = await NewGame(gameName);
  if (backendOutput[0]){
    gameFlag = 1;
  }else{
    alert(backendOutput[1]);
  }
}

async function joinExisting(){
  var gameName = document.getElementById("gameNameInput").value;
  var currentBoard = await JoinGame(gameName);
  if(currentBoard[0]){
    //Shows a winner and stops game load
    if(currentBoard[2][3] != 'P'){
      alert(resultDict[currentBoard[2][3]]);
      return;
    }
    //Set whose move
    if(currentBoard[2][1]%2 == 0){
      moveCounter = 1;
    }else{
      moveCounter = 3;
    }
    // Set board positions
    for(var i = 0; i<4 ; i++){
      var quadSpot = document.getElementsByClassName("openSpot" + i);
      for(var j = 0; j < 9; j++){
        if(currentBoard[2][0][i][j] == 'W' || currentBoard[2][0][i][j] == 'B'){
          quadSpot[j].id = currentBoard[2][0][i][j] + i + j;
        }else{
          quadSpot[j].id = 'N' + i + j;
        }
      }
    }
  }else{
    alert(currentBoard[1])
  }
}

function makeMove(clickedEle){
  if(gameFlag == 0){
    console.log("Join or Create Game");
    return;
  }
  if(clickedEle.charAt(0) == 'N'){
    if(moveCounter == 1 || moveCounter == 3){
      changeColor(clickedEle);
    }
    if(moveCounter == 2 || moveCounter == 4){
      console.log("Rotate a Quad");
      checkWin();
    }
    if(moveCounter == 5){
      moveCounter = 1;
    }
  }
  else{
    console.log("Illegal Move");
  }
  console.log(moveCounter);
  return;
}

function changeColor(eleId){
  var newColor;
  var newColorId;
  if(playerColor == "W" && moveCounter == 1){
    newColorId = "W";
    newColor = '#FFFFFF';
    finalMove = "W" + eleId.charAt(1) + eleId.charAt(2);
    var newId = newColorId + eleId.charAt(1) + eleId.charAt(2);
    document.getElementById(eleId).id = newId;
    document.getElementById(newId).style.backgroundColor = newColor;
    moveCounter = moveCounter + 1;
  }
  if(playerColor == "B" && moveCounter == 3){
    newColorId = "B";
    newColor = '#000000';
    finalMove = "B" + eleId.charAt(1) + eleId.charAt(2);
    var newId = newColorId + eleId.charAt(1) + eleId.charAt(2);
    document.getElementById(eleId).id = newId;
    document.getElementById(newId).style.backgroundColor = newColor;
    moveCounter = moveCounter + 1;
  }
  return;
}

function checkWin(){
  checkAcross();
  checkDown();
  checkDiag();
}

function checkAcross(){
  if(moveCounter == 2){
    var winColor = 'W';
  }
  else{
    var winColor = 'B';
  }
  for(var j = 2; j < 4; j++){
    for(var i = 1; i < 10; i++){
      if(i == 1 || i == 4 || i == 7){
        var check1 = i;
        var check2 = i + 1;
        var check3 = i + 2;
        var check4 = check1;
        var check5 = check2;
        var q1 = j;
        var q2 = q1;
        var q3 = q1;
        if(j == 2){
          var q4 = 1;
          var q5 = 1;
        }
        if(j == 3){
          var q4 = 4;
          var q5 = 4;
        }
      }
      if(i == 2 || i == 5 || i == 8){
        var check1 = i;
        var check2 = i + 1;
        var check3 = i - 1;
        var check4 = check1;
        var check5 = check2;
        var q1 = j;
        var q2 = q1;
        if(j == 2){
          var q3 = 1;
          var q4 = 1;
          var q5 = 1;
        }
        if(j == 3){
          var q3 = 4;
          var q4 = 4;
          var q5 = 4;
        }
      }
      var flag = 0;
      if(document.body.contains(document.getElementById(winColor + q1 + check1))){
        flag = flag + 1;
      }
      if(document.body.contains(document.getElementById(winColor + q2 + check2))){
        flag = flag + 1;
      }
      if(document.body.contains(document.getElementById(winColor + q3 + check3))){
        flag = flag + 1;
      }
      if(document.body.contains(document.getElementById(winColor + q4 + check4))){
        flag = flag + 1;
      }
      if(document.body.contains(document.getElementById(winColor + q5 + check5))){
        flag = flag + 1;
      }
      if(flag == 5){
        console.log(winColor + " wins!");
      }
    }
  }
}

function checkDown(){
  if(moveCounter == 2){
    var winColor = 'W';
  }
  else{
    var winColor = 'B';
  }
  for(var j = 1; j < 3; j++){
    for(var i = 1; i < 10; i++){
      if(i == 1 || i == 2 || i == 3){
        var check1 = i;
        var check2 = i + 3;
        var check3 = i + 6;
        var check4 = check1;
        var check5 = check2;
        var q1 = j;
        var q2 = q1;
        var q3 = q1;
        if(j == 2){
          var q4 = 3;
          var q5 = 3;
        }
        if(j == 1){
          var q4 = 4;
          var q5 = 4;
        }
      }
      if(i == 4 || i == 5 || i == 6){
        var check1 = i;
        var check2 = i + 3;
        var check3 = i - 3;
        var check4 = check1;
        var check5 = check2;
        var q1 = j;
        var q2 = q1;
        if(j == 2){
          var q3 = 3;
          var q4 = 3;
          var q5 = 3;
        }
        if(j == 1){
          var q3 = 4;
          var q4 = 4;
          var q5 = 4;
        }
      }
      var flag = 0;
      if(document.body.contains(document.getElementById(winColor + q1 + check1))){
        flag = flag + 1;
      }
      if(document.body.contains(document.getElementById(winColor + q2 + check2))){
        flag = flag + 1;
      }
      if(document.body.contains(document.getElementById(winColor + q3 + check3))){
        flag = flag + 1;
      }
      if(document.body.contains(document.getElementById(winColor + q4 + check4))){
        flag = flag + 1;
      }
      if(document.body.contains(document.getElementById(winColor + q5 + check5))){
        flag = flag + 1;
      }
      if(flag == 5){
        console.log(winColor + " wins!");
      }
    }
  }
}

function checkDiag(){
  if(moveCounter == 2){
    var winColor = 'W';
  }
  else{
    var winColor = 'B';
  }
  for(var j = 1; j < 3; j++){
    for(var i = 1; i < 10; i++){
      if(j == 2){
        var check1 = i;
        var check2 = i + 4;
        var check4 = check1;
        var check5 = check2;
        var q1 = j;
        var q2 = q1;
        var q4 = 4;
        var q5 = 4;
        if(i == 2){
          var check3 = 7;
          var q3 = 1;
        }
        if(i == 1){
          var check3 = check1 + 8;
          var q3 = 2;
        }
        if(i == 5){
          var check3 = check1 - 4;
          var q3 = 4;
        }
        if(i == 4){
          var check3 = 3;
          var q3 = 3;
        }
      }
      if(j == 1){
        var check1 = i;
        var check2 = i + 2;
        var check4 = check1;
        var check5 = check2;
        var q1 = j;
        var q2 = q1;
        var q4 = 3;
        var q5 = 3;
        if(i == 2){
          var check3 = 9;
          var q3 = 2;
        }
        if(i == 3){
          var check3 = check1 + 4;
          var q3 = 1;
        }
        if(i == 5){
          var check3 = check1 - 2;
          var q3 = 3;
        }
        if(i == 6){
          var check3 = 1;
          var q3 = 4;
        }
      }
      var flag = 0;
      if(document.body.contains(document.getElementById(winColor + q1 + check1))){
        flag = flag + 1;
      }
      if(document.body.contains(document.getElementById(winColor + q2 + check2))){
        flag = flag + 1;
      }
      if(document.body.contains(document.getElementById(winColor + q3 + check3))){
        flag = flag + 1;
      }
      if(document.body.contains(document.getElementById(winColor + q4 + check4))){
        flag = flag + 1;
      }
      if(document.body.contains(document.getElementById(winColor + q5 + check5))){
        flag = flag + 1;
      }
      if(flag == 5){
        console.log(winColor + " wins!");
      }
    }
  }
}

function q1RotateC(){
  console.log("rotate 1 C");
  if(moveCounter == 1 || moveCounter == 3){
    console.log("Place a piece");
  }
  if(moveCounter == 2 || moveCounter == 4){
    var quadName = document.getElementById("Quad1");
    if(document.getElementById("Quad1").className == "boardQuad0"){
      var quad1Spots = document.getElementsByClassName("openSpot1");
      quad1Spots[0].id = quad1Spots[0].id[0] + "13";
      quad1Spots[1].id = quad1Spots[1].id[0] + "16";
      quad1Spots[2].id = quad1Spots[2].id[0] + "19";
      quad1Spots[3].id = quad1Spots[3].id[0] + "12";
      quad1Spots[5].id = quad1Spots[5].id[0] + "18";
      quad1Spots[6].id = quad1Spots[6].id[0] + "11";
      quad1Spots[7].id = quad1Spots[7].id[0] + "14";
      quad1Spots[8].id = quad1Spots[8].id[0] + "17";
      document.getElementById("Quad1").className = "boardQuad90";
     }
    else if(document.getElementById("Quad1").className == "boardQuad90"){
      var quad1Spots = document.getElementsByClassName("openSpot1");
      quad1Spots[0].id = quad1Spots[0].id[0] + "19";
      quad1Spots[1].id = quad1Spots[1].id[0] + "18";
      quad1Spots[2].id = quad1Spots[2].id[0] + "17";
      quad1Spots[3].id = quad1Spots[3].id[0] + "16";
      quad1Spots[5].id = quad1Spots[5].id[0] + "14";
      quad1Spots[6].id = quad1Spots[6].id[0] + "13";
      quad1Spots[7].id = quad1Spots[7].id[0] + "12";
      quad1Spots[8].id = quad1Spots[8].id[0] + "11";
      document.getElementById("Quad1").className = "boardQuad180";
    }
    else if(document.getElementById("Quad1").className == "boardQuad180"){
      var quad1Spots = document.getElementsByClassName("openSpot1");
      quad1Spots[0].id = quad1Spots[0].id[0] + "17";
      quad1Spots[1].id = quad1Spots[1].id[0] + "14";
      quad1Spots[2].id = quad1Spots[2].id[0] + "11";
      quad1Spots[3].id = quad1Spots[3].id[0] + "18";
      quad1Spots[5].id = quad1Spots[5].id[0] + "12";
      quad1Spots[6].id = quad1Spots[6].id[0] + "19";
      quad1Spots[7].id = quad1Spots[7].id[0] + "16";
      quad1Spots[8].id = quad1Spots[8].id[0] + "13";
      document.getElementById("Quad1").className = "boardQuad270";
    }
    else if(document.getElementById("Quad1").className == "boardQuad270"){
      var quad1Spots = document.getElementsByClassName("openSpot1");
      quad1Spots[0].id = quad1Spots[0].id[0] + "11";
      quad1Spots[1].id = quad1Spots[1].id[0] + "12";
      quad1Spots[2].id = quad1Spots[2].id[0] + "13";
      quad1Spots[3].id = quad1Spots[3].id[0] + "14";
      quad1Spots[5].id = quad1Spots[5].id[0] + "16";
      quad1Spots[6].id = quad1Spots[6].id[0] + "17";
      quad1Spots[7].id = quad1Spots[7].id[0] + "18";
      quad1Spots[8].id = quad1Spots[8].id[0] + "19";
      document.getElementById("Quad1").className = "boardQuad0";
    }
    finalMove += "C1";
    MoveSubmit(finalMove);
    checkWin();
    moveCounter = moveCounter + 1;
  }
  if(moveCounter == 5){
    moveCounter = 1;
  }
}

function q1RotateCC(){
  console.log("rotate 1 CC");
  if(moveCounter == 1 || moveCounter == 3){
    console.log("Place a piece");
  }
  if(moveCounter == 2 || moveCounter == 4){
    var quadName = document.getElementById("Quad1");
    if(document.getElementById("Quad1").className == "boardQuad180"){
      var quad1Spots = document.getElementsByClassName("openSpot1");
      quad1Spots[0].id = quad1Spots[0].id[0] + "13";
      quad1Spots[1].id = quad1Spots[1].id[0] + "16";
      quad1Spots[2].id = quad1Spots[2].id[0] + "19";
      quad1Spots[3].id = quad1Spots[3].id[0] + "12";
      quad1Spots[5].id = quad1Spots[5].id[0] + "18";
      quad1Spots[6].id = quad1Spots[6].id[0] + "11";
      quad1Spots[7].id = quad1Spots[7].id[0] + "14";
      quad1Spots[8].id = quad1Spots[8].id[0] + "17";
      document.getElementById("Quad1").className = "boardQuad90";
     }
    else if(document.getElementById("Quad1").className == "boardQuad270"){
      var quad1Spots = document.getElementsByClassName("openSpot1");
      quad1Spots[0].id = quad1Spots[0].id[0] + "19";
      quad1Spots[1].id = quad1Spots[1].id[0] + "18";
      quad1Spots[2].id = quad1Spots[2].id[0] + "17";
      quad1Spots[3].id = quad1Spots[3].id[0] + "16";
      quad1Spots[5].id = quad1Spots[5].id[0] + "14";
      quad1Spots[6].id = quad1Spots[6].id[0] + "13";
      quad1Spots[7].id = quad1Spots[7].id[0] + "12";
      quad1Spots[8].id = quad1Spots[8].id[0] + "11";
      document.getElementById("Quad1").className = "boardQuad180";
    }
    else if(document.getElementById("Quad1").className == "boardQuad0"){
      var quad1Spots = document.getElementsByClassName("openSpot1");
      quad1Spots[0].id = quad1Spots[0].id[0] + "17";
      quad1Spots[1].id = quad1Spots[1].id[0] + "14";
      quad1Spots[2].id = quad1Spots[2].id[0] + "11";
      quad1Spots[3].id = quad1Spots[3].id[0] + "18";
      quad1Spots[5].id = quad1Spots[5].id[0] + "12";
      quad1Spots[6].id = quad1Spots[6].id[0] + "19";
      quad1Spots[7].id = quad1Spots[7].id[0] + "16";
      quad1Spots[8].id = quad1Spots[8].id[0] + "13";
      document.getElementById("Quad1").className = "boardQuad270";
    }
    else if(document.getElementById("Quad1").className == "boardQuad90"){
      var quad1Spots = document.getElementsByClassName("openSpot1");
      quad1Spots[0].id = quad1Spots[0].id[0] + "11";
      quad1Spots[1].id = quad1Spots[1].id[0] + "12";
      quad1Spots[2].id = quad1Spots[2].id[0] + "13";
      quad1Spots[3].id = quad1Spots[3].id[0] + "14";
      quad1Spots[5].id = quad1Spots[5].id[0] + "16";
      quad1Spots[6].id = quad1Spots[6].id[0] + "17";
      quad1Spots[7].id = quad1Spots[7].id[0] + "18";
      quad1Spots[8].id = quad1Spots[8].id[0] + "19";
      document.getElementById("Quad1").className = "boardQuad0";
    }
    finalMove += "R1";
    MoveSubmit(finalMove);
    checkWin();
    moveCounter = moveCounter + 1;
  }
  if(moveCounter == 5){
    moveCounter = 1;
  }
}

function q2RotateC(){
  console.log("rotate 2 C");
  if(moveCounter == 1 || moveCounter == 3){
    console.log("Place a piece");
  }
  if(moveCounter == 2 || moveCounter == 4){
    var quadName = document.getElementById("Quad2");
    if(document.getElementById("Quad2").className == "boardQuad0"){
      var quad2Spots = document.getElementsByClassName("openSpot2");
      quad2Spots[0].id = quad2Spots[0].id[0] + "23";
      quad2Spots[1].id = quad2Spots[1].id[0] + "26";
      quad2Spots[2].id = quad2Spots[2].id[0] + "29";
      quad2Spots[3].id = quad2Spots[3].id[0] + "22";
      quad2Spots[5].id = quad2Spots[5].id[0] + "28";
      quad2Spots[6].id = quad2Spots[6].id[0] + "21";
      quad2Spots[7].id = quad2Spots[7].id[0] + "24";
      quad2Spots[8].id = quad2Spots[8].id[0] + "27";
      document.getElementById("Quad2").className = "boardQuad90";
     }
    else if(document.getElementById("Quad2").className == "boardQuad90"){
      var quad2Spots = document.getElementsByClassName("openSpot2");
      quad2Spots[0].id = quad2Spots[0].id[0] + "29";
      quad2Spots[1].id = quad2Spots[1].id[0] + "28";
      quad2Spots[2].id = quad2Spots[2].id[0] + "27";
      quad2Spots[3].id = quad2Spots[3].id[0] + "26";
      quad2Spots[5].id = quad2Spots[5].id[0] + "24";
      quad2Spots[6].id = quad2Spots[6].id[0] + "23";
      quad2Spots[7].id = quad2Spots[7].id[0] + "22";
      quad2Spots[8].id = quad2Spots[8].id[0] + "21";
      document.getElementById("Quad2").className = "boardQuad180";
    }
    else if(document.getElementById("Quad2").className == "boardQuad180"){
      var quad2Spots = document.getElementsByClassName("openSpot2");
      quad2Spots[0].id = quad2Spots[0].id[0] + "27";
      quad2Spots[1].id = quad2Spots[1].id[0] + "24";
      quad2Spots[2].id = quad2Spots[2].id[0] + "21";
      quad2Spots[3].id = quad2Spots[3].id[0] + "28";
      quad2Spots[5].id = quad2Spots[5].id[0] + "22";
      quad2Spots[6].id = quad2Spots[6].id[0] + "29";
      quad2Spots[7].id = quad2Spots[7].id[0] + "26";
      quad2Spots[8].id = quad2Spots[8].id[0] + "23";
      document.getElementById("Quad2").className = "boardQuad270";
    }
    else if(document.getElementById("Quad2").className == "boardQuad270"){
      var quad2Spots = document.getElementsByClassName("openSpot2");
      quad2Spots[0].id = quad2Spots[0].id[0] + "21";
      quad2Spots[1].id = quad2Spots[1].id[0] + "22";
      quad2Spots[2].id = quad2Spots[2].id[0] + "23";
      quad2Spots[3].id = quad2Spots[3].id[0] + "24";
      quad2Spots[5].id = quad2Spots[5].id[0] + "26";
      quad2Spots[6].id = quad2Spots[6].id[0] + "27";
      quad2Spots[7].id = quad2Spots[7].id[0] + "28";
      quad2Spots[8].id = quad2Spots[8].id[0] + "29";
      document.getElementById("Quad2").className = "boardQuad0";
    }
    finalMove += "C2";
    MoveSubmit(finalMove);
    checkWin();
    moveCounter = moveCounter + 1;
  }
  if(moveCounter == 5){
    moveCounter = 1;
  }
}

function q2RotateCC(){
  console.log("rotate 2 CC");
  if(moveCounter == 1 || moveCounter == 3){
    console.log("Place a piece");
  }
  if(moveCounter == 2 || moveCounter == 4){
    var quadName = document.getElementById("Quad2");
    if(document.getElementById("Quad2").className == "boardQuad180"){
      var quad2Spots = document.getElementsByClassName("openSpot2");
      quad2Spots[0].id = quad2Spots[0].id[0] + "23";
      quad2Spots[1].id = quad2Spots[1].id[0] + "26";
      quad2Spots[2].id = quad2Spots[2].id[0] + "29";
      quad2Spots[3].id = quad2Spots[3].id[0] + "22";
      quad2Spots[5].id = quad2Spots[5].id[0] + "28";
      quad2Spots[6].id = quad2Spots[6].id[0] + "21";
      quad2Spots[7].id = quad2Spots[7].id[0] + "24";
      quad2Spots[8].id = quad2Spots[8].id[0] + "27";
      document.getElementById("Quad2").className = "boardQuad90";
     }
    else if(document.getElementById("Quad2").className == "boardQuad270"){
      var quad2Spots = document.getElementsByClassName("openSpot2");
      quad2Spots[0].id = quad2Spots[0].id[0] + "29";
      quad2Spots[1].id = quad2Spots[1].id[0] + "28";
      quad2Spots[2].id = quad2Spots[2].id[0] + "27";
      quad2Spots[3].id = quad2Spots[3].id[0] + "26";
      quad2Spots[5].id = quad2Spots[5].id[0] + "24";
      quad2Spots[6].id = quad2Spots[6].id[0] + "23";
      quad2Spots[7].id = quad2Spots[7].id[0] + "22";
      quad2Spots[8].id = quad2Spots[8].id[0] + "21";
      document.getElementById("Quad2").className = "boardQuad180";
    }
    else if(document.getElementById("Quad2").className == "boardQuad0"){
      var quad2Spots = document.getElementsByClassName("openSpot2");
      quad2Spots[0].id = quad2Spots[0].id[0] + "27";
      quad2Spots[1].id = quad2Spots[1].id[0] + "24";
      quad2Spots[2].id = quad2Spots[2].id[0] + "21";
      quad2Spots[3].id = quad2Spots[3].id[0] + "28";
      quad2Spots[5].id = quad2Spots[5].id[0] + "22";
      quad2Spots[6].id = quad2Spots[6].id[0] + "29";
      quad2Spots[7].id = quad2Spots[7].id[0] + "26";
      quad2Spots[8].id = quad2Spots[8].id[0] + "23";
      document.getElementById("Quad2").className = "boardQuad270";
    }
    else if(document.getElementById("Quad2").className == "boardQuad90"){
      var quad2Spots = document.getElementsByClassName("openSpot2");
      quad2Spots[0].id = quad2Spots[0].id[0] + "21";
      quad2Spots[1].id = quad2Spots[1].id[0] + "22";
      quad2Spots[2].id = quad2Spots[2].id[0] + "23";
      quad2Spots[3].id = quad2Spots[3].id[0] + "24";
      quad2Spots[5].id = quad2Spots[5].id[0] + "26";
      quad2Spots[6].id = quad2Spots[6].id[0] + "27";
      quad2Spots[7].id = quad2Spots[7].id[0] + "28";
      quad2Spots[8].id = quad2Spots[8].id[0] + "29";
      document.getElementById("Quad2").className = "boardQuad0";
    }
    finalMove += "R2";
    MoveSubmit(finalMove);
    checkWin();
    moveCounter = moveCounter + 1;
  }
  if(moveCounter == 5){
    moveCounter = 1;
  }
}

function q3RotateC(){
  console.log("rotate 3 C");
  if(moveCounter == 1 || moveCounter == 3){
    console.log("Place a piece");
  }
  if(moveCounter == 2 || moveCounter == 4){
    var quadName = document.getElementById("Quad3");
    if(document.getElementById("Quad3").className == "boardQuad0"){
      var quad3Spots = document.getElementsByClassName("openSpot3");
      quad3Spots[0].id = quad3Spots[0].id[0] + "33";
      quad3Spots[1].id = quad3Spots[1].id[0] + "36";
      quad3Spots[2].id = quad3Spots[2].id[0] + "39";
      quad3Spots[3].id = quad3Spots[3].id[0] + "32";
      quad3Spots[5].id = quad3Spots[5].id[0] + "38";
      quad3Spots[6].id = quad3Spots[6].id[0] + "31";
      quad3Spots[7].id = quad3Spots[7].id[0] + "34";
      quad3Spots[8].id = quad3Spots[8].id[0] + "37";
      document.getElementById("Quad3").className = "boardQuad90";
     }
    else if(document.getElementById("Quad3").className == "boardQuad90"){
      var quad3Spots = document.getElementsByClassName("openSpot3");
      quad3Spots[0].id = quad3Spots[0].id[0] + "39";
      quad3Spots[1].id = quad3Spots[1].id[0] + "38";
      quad3Spots[2].id = quad3Spots[2].id[0] + "37";
      quad3Spots[3].id = quad3Spots[3].id[0] + "36";
      quad3Spots[5].id = quad3Spots[5].id[0] + "34";
      quad3Spots[6].id = quad3Spots[6].id[0] + "33";
      quad3Spots[7].id = quad3Spots[7].id[0] + "32";
      quad3Spots[8].id = quad3Spots[8].id[0] + "31";
      document.getElementById("Quad3").className = "boardQuad180";
    }
    else if(document.getElementById("Quad3").className == "boardQuad180"){
      var quad3Spots = document.getElementsByClassName("openSpot3");
      quad3Spots[0].id = quad3Spots[0].id[0] + "37";
      quad3Spots[1].id = quad3Spots[1].id[0] + "34";
      quad3Spots[2].id = quad3Spots[2].id[0] + "31";
      quad3Spots[3].id = quad3Spots[3].id[0] + "38";
      quad3Spots[5].id = quad3Spots[5].id[0] + "32";
      quad3Spots[6].id = quad3Spots[6].id[0] + "39";
      quad3Spots[7].id = quad3Spots[7].id[0] + "36";
      quad3Spots[8].id = quad3Spots[8].id[0] + "33";
      document.getElementById("Quad3").className = "boardQuad270";
    }
    else if(document.getElementById("Quad3").className == "boardQuad270"){
      var quad3Spots = document.getElementsByClassName("openSpot3");
      quad3Spots[0].id = quad3Spots[0].id[0] + "31";
      quad3Spots[1].id = quad3Spots[1].id[0] + "32";
      quad3Spots[2].id = quad3Spots[2].id[0] + "33";
      quad3Spots[3].id = quad3Spots[3].id[0] + "34";
      quad3Spots[5].id = quad3Spots[5].id[0] + "36";
      quad3Spots[6].id = quad3Spots[6].id[0] + "37";
      quad3Spots[7].id = quad3Spots[7].id[0] + "38";
      quad3Spots[8].id = quad3Spots[8].id[0] + "39";
      document.getElementById("Quad3").className = "boardQuad0";
    }
    finalMove += "C3";
    MoveSubmit(finalMove);
    checkWin();
    moveCounter = moveCounter + 1;
  }
  if(moveCounter == 5){
    moveCounter = 1;
  }
}

function q3RotateCC(){
  console.log("rotate 3 CC");
  if(moveCounter == 1 || moveCounter == 3){
    console.log("Place a piece");
  }
  if(moveCounter == 2 || moveCounter == 4){
    var quadName = document.getElementById("Quad3");
    if(document.getElementById("Quad3").className == "boardQuad180"){
      var quad3Spots = document.getElementsByClassName("openSpot3");
      quad3Spots[0].id = quad3Spots[0].id[0] + "33";
      quad3Spots[1].id = quad3Spots[1].id[0] + "36";
      quad3Spots[2].id = quad3Spots[2].id[0] + "39";
      quad3Spots[3].id = quad3Spots[3].id[0] + "32";
      quad3Spots[5].id = quad3Spots[5].id[0] + "38";
      quad3Spots[6].id = quad3Spots[6].id[0] + "31";
      quad3Spots[7].id = quad3Spots[7].id[0] + "34";
      quad3Spots[8].id = quad3Spots[8].id[0] + "37";
      document.getElementById("Quad3").className = "boardQuad90";
     }
    else if(document.getElementById("Quad3").className == "boardQuad270"){
      var quad3Spots = document.getElementsByClassName("openSpot3");
      quad3Spots[0].id = quad3Spots[0].id[0] + "39";
      quad3Spots[1].id = quad3Spots[1].id[0] + "38";
      quad3Spots[2].id = quad3Spots[2].id[0] + "37";
      quad3Spots[3].id = quad3Spots[3].id[0] + "36";
      quad3Spots[5].id = quad3Spots[5].id[0] + "34";
      quad3Spots[6].id = quad3Spots[6].id[0] + "33";
      quad3Spots[7].id = quad3Spots[7].id[0] + "32";
      quad3Spots[8].id = quad3Spots[8].id[0] + "31";
      document.getElementById("Quad3").className = "boardQuad180";
    }
    else if(document.getElementById("Quad3").className == "boardQuad0"){
      var quad3Spots = document.getElementsByClassName("openSpot3");
      quad3Spots[0].id = quad3Spots[0].id[0] + "37";
      quad3Spots[1].id = quad3Spots[1].id[0] + "34";
      quad3Spots[2].id = quad3Spots[2].id[0] + "31";
      quad3Spots[3].id = quad3Spots[3].id[0] + "38";
      quad3Spots[5].id = quad3Spots[5].id[0] + "32";
      quad3Spots[6].id = quad3Spots[6].id[0] + "39";
      quad3Spots[7].id = quad3Spots[7].id[0] + "36";
      quad3Spots[8].id = quad3Spots[8].id[0] + "33";
      document.getElementById("Quad3").className = "boardQuad270";
    }
    else if(document.getElementById("Quad3").className == "boardQuad90"){
      var quad3Spots = document.getElementsByClassName("openSpot3");
      quad3Spots[0].id = quad3Spots[0].id[0] + "31";
      quad3Spots[1].id = quad3Spots[1].id[0] + "32";
      quad3Spots[2].id = quad3Spots[2].id[0] + "33";
      quad3Spots[3].id = quad3Spots[3].id[0] + "34";
      quad3Spots[5].id = quad3Spots[5].id[0] + "36";
      quad3Spots[6].id = quad3Spots[6].id[0] + "37";
      quad3Spots[7].id = quad3Spots[7].id[0] + "38";
      quad3Spots[8].id = quad3Spots[8].id[0] + "39";
      document.getElementById("Quad3").className = "boardQuad0";
    }
    finalMove += "R3";
    MoveSubmit(finalMove);
    checkWin();
    moveCounter = moveCounter + 1;
  }
  if(moveCounter == 5){
    moveCounter = 1;
  }
}

function q4RotateC(){
  console.log("rotate 4 C");
  if(moveCounter == 1 || moveCounter == 3){
    console.log("Place a piece");
  }
  if(moveCounter == 2 || moveCounter == 4){
    var quadName = document.getElementById("Quad4");
    if(document.getElementById("Quad4").className == "boardQuad0"){
      var quad4Spots = document.getElementsByClassName("openSpot4");
      quad4Spots[0].id = quad4Spots[0].id[0] + "43";
      quad4Spots[1].id = quad4Spots[1].id[0] + "46";
      quad4Spots[2].id = quad4Spots[2].id[0] + "49";
      quad4Spots[3].id = quad4Spots[3].id[0] + "42";
      quad4Spots[5].id = quad4Spots[5].id[0] + "48";
      quad4Spots[6].id = quad4Spots[6].id[0] + "41";
      quad4Spots[7].id = quad4Spots[7].id[0] + "44";
      quad4Spots[8].id = quad4Spots[8].id[0] + "47";
      document.getElementById("Quad4").className = "boardQuad90";
     }
    else if(document.getElementById("Quad4").className == "boardQuad90"){
      var quad4Spots = document.getElementsByClassName("openSpot4");
      quad4Spots[0].id = quad4Spots[0].id[0] + "49";
      quad4Spots[1].id = quad4Spots[1].id[0] + "48";
      quad4Spots[2].id = quad4Spots[2].id[0] + "47";
      quad4Spots[3].id = quad4Spots[3].id[0] + "46";
      quad4Spots[5].id = quad4Spots[5].id[0] + "44";
      quad4Spots[6].id = quad4Spots[6].id[0] + "43";
      quad4Spots[7].id = quad4Spots[7].id[0] + "42";
      quad4Spots[8].id = quad4Spots[8].id[0] + "41";
      document.getElementById("Quad4").className = "boardQuad180";
    }
    else if(document.getElementById("Quad4").className == "boardQuad180"){
      var quad4Spots = document.getElementsByClassName("openSpot4");
      quad4Spots[0].id = quad4Spots[0].id[0] + "47";
      quad4Spots[1].id = quad4Spots[1].id[0] + "44";
      quad4Spots[2].id = quad4Spots[2].id[0] + "41";
      quad4Spots[3].id = quad4Spots[3].id[0] + "48";
      quad4Spots[5].id = quad4Spots[5].id[0] + "42";
      quad4Spots[6].id = quad4Spots[6].id[0] + "49";
      quad4Spots[7].id = quad4Spots[7].id[0] + "46";
      quad4Spots[8].id = quad4Spots[8].id[0] + "43";
      document.getElementById("Quad4").className = "boardQuad270";
    }
    else if(document.getElementById("Quad4").className == "boardQuad270"){
      var quad4Spots = document.getElementsByClassName("openSpot4");
      quad4Spots[0].id = quad4Spots[0].id[0] + "41";
      quad4Spots[1].id = quad4Spots[1].id[0] + "42";
      quad4Spots[2].id = quad4Spots[2].id[0] + "43";
      quad4Spots[3].id = quad4Spots[3].id[0] + "44";
      quad4Spots[5].id = quad4Spots[5].id[0] + "46";
      quad4Spots[6].id = quad4Spots[6].id[0] + "47";
      quad4Spots[7].id = quad4Spots[7].id[0] + "48";
      quad4Spots[8].id = quad4Spots[8].id[0] + "49";
      document.getElementById("Quad4").className = "boardQuad0";
    }
    finalMove += "C4";
    MoveSubmit(finalMove);
    checkWin();
    moveCounter = moveCounter + 1;
  }
  if(moveCounter == 5){
    moveCounter = 1;
  }
}

function q4RotateCC(){
  console.log("rotate 4 CC");
  if(moveCounter == 1 || moveCounter == 3){
    console.log("Place a piece");
  }
  if(moveCounter == 2 || moveCounter == 4){
    var quadName = document.getElementById("Quad4");
    if(document.getElementById("Quad4").className == "boardQuad180"){
      var quad4Spots = document.getElementsByClassName("openSpot4");
      quad4Spots[0].id = quad4Spots[0].id[0] + "43";
      quad4Spots[1].id = quad4Spots[1].id[0] + "46";
      quad4Spots[2].id = quad4Spots[2].id[0] + "49";
      quad4Spots[3].id = quad4Spots[3].id[0] + "42";
      quad4Spots[5].id = quad4Spots[5].id[0] + "48";
      quad4Spots[6].id = quad4Spots[6].id[0] + "41";
      quad4Spots[7].id = quad4Spots[7].id[0] + "44";
      quad4Spots[8].id = quad4Spots[8].id[0] + "47";
      document.getElementById("Quad4").className = "boardQuad90";
     }
    else if(document.getElementById("Quad4").className == "boardQuad270"){
      var quad4Spots = document.getElementsByClassName("openSpot4");
      quad4Spots[0].id = quad4Spots[0].id[0] + "49";
      quad4Spots[1].id = quad4Spots[1].id[0] + "48";
      quad4Spots[2].id = quad4Spots[2].id[0] + "47";
      quad4Spots[3].id = quad4Spots[3].id[0] + "46";
      quad4Spots[5].id = quad4Spots[5].id[0] + "44";
      quad4Spots[6].id = quad4Spots[6].id[0] + "43";
      quad4Spots[7].id = quad4Spots[7].id[0] + "42";
      quad4Spots[8].id = quad4Spots[8].id[0] + "41";
      document.getElementById("Quad4").className = "boardQuad180";
    }
    else if(document.getElementById("Quad4").className == "boardQuad0"){
      var quad4Spots = document.getElementsByClassName("openSpot4");
      quad4Spots[0].id = quad4Spots[0].id[0] + "47";
      quad4Spots[1].id = quad4Spots[1].id[0] + "44";
      quad4Spots[2].id = quad4Spots[2].id[0] + "41";
      quad4Spots[3].id = quad4Spots[3].id[0] + "48";
      quad4Spots[5].id = quad4Spots[5].id[0] + "42";
      quad4Spots[6].id = quad4Spots[6].id[0] + "49";
      quad4Spots[7].id = quad4Spots[7].id[0] + "46";
      quad4Spots[8].id = quad4Spots[8].id[0] + "43";
      document.getElementById("Quad4").className = "boardQuad270";
    }
    else if(document.getElementById("Quad4").className == "boardQuad90"){
      var quad4Spots = document.getElementsByClassName("openSpot4");
      quad4Spots[0].id = quad4Spots[0].id[0] + "41";
      quad4Spots[1].id = quad4Spots[1].id[0] + "42";
      quad4Spots[2].id = quad4Spots[2].id[0] + "43";
      quad4Spots[3].id = quad4Spots[3].id[0] + "44";
      quad4Spots[5].id = quad4Spots[5].id[0] + "46";
      quad4Spots[6].id = quad4Spots[6].id[0] + "47";
      quad4Spots[7].id = quad4Spots[7].id[0] + "48";
      quad4Spots[8].id = quad4Spots[8].id[0] + "49";
      document.getElementById("Quad4").className = "boardQuad0";
    }
    finalMove += "R4";
    MoveSubmit(finalMove);
    checkWin();
    moveCounter = moveCounter + 1;
  }
  if(moveCounter == 5){
    moveCounter = 1;
  }
}

$( window ).on( "load", function() {
  document.addEventListener('newMove', function(e) {
    try {
      const game_name = e.detail.gamename;
      const game_state = e.detail.newstate;

    // Move received. Update board
    const newId = game_state[4].charAt(0) + game_state[4].charAt(1) + game_state[4].charAt(2);
    if(newId.charAt(0) == "W"){
      const newColor = '#FFFFFF';
    }else{
      const newColor = '#000000';
    }
    document.getElementById("N" + game_state[4].charAt(1) + game_state[4].charAt(2)).id = newId;
    document.getElementById(newId).style.backgroundColor = newColor;
    moveCounter = moveCounter + 1;
    const recQuad = game_state[4].charAt(4);
    const recRotate = game_state[4].charAt(3);
    if(recQuad == 1 && recRotate == 'C'){
      var quadName = document.getElementById("Quad1");
      if(document.getElementById("Quad1").className == "boardQuad0"){
        var quad1Spots = document.getElementsByClassName("openSpot1");
        quad1Spots[0].id = quad1Spots[0].id[0] + "13";
        quad1Spots[1].id = quad1Spots[1].id[0] + "16";
        quad1Spots[2].id = quad1Spots[2].id[0] + "19";
        quad1Spots[3].id = quad1Spots[3].id[0] + "12";
        quad1Spots[5].id = quad1Spots[5].id[0] + "18";
        quad1Spots[6].id = quad1Spots[6].id[0] + "11";
        quad1Spots[7].id = quad1Spots[7].id[0] + "14";
        quad1Spots[8].id = quad1Spots[8].id[0] + "17";
        document.getElementById("Quad1").className = "boardQuad90";
       }
      else if(document.getElementById("Quad1").className == "boardQuad90"){
        var quad1Spots = document.getElementsByClassName("openSpot1");
        quad1Spots[0].id = quad1Spots[0].id[0] + "19";
        quad1Spots[1].id = quad1Spots[1].id[0] + "18";
        quad1Spots[2].id = quad1Spots[2].id[0] + "17";
        quad1Spots[3].id = quad1Spots[3].id[0] + "16";
        quad1Spots[5].id = quad1Spots[5].id[0] + "14";
        quad1Spots[6].id = quad1Spots[6].id[0] + "13";
        quad1Spots[7].id = quad1Spots[7].id[0] + "12";
        quad1Spots[8].id = quad1Spots[8].id[0] + "11";
        document.getElementById("Quad1").className = "boardQuad180";
      }
      else if(document.getElementById("Quad1").className == "boardQuad180"){
        var quad1Spots = document.getElementsByClassName("openSpot1");
        quad1Spots[0].id = quad1Spots[0].id[0] + "17";
        quad1Spots[1].id = quad1Spots[1].id[0] + "14";
        quad1Spots[2].id = quad1Spots[2].id[0] + "11";
        quad1Spots[3].id = quad1Spots[3].id[0] + "18";
        quad1Spots[5].id = quad1Spots[5].id[0] + "12";
        quad1Spots[6].id = quad1Spots[6].id[0] + "19";
        quad1Spots[7].id = quad1Spots[7].id[0] + "16";
        quad1Spots[8].id = quad1Spots[8].id[0] + "13";
        document.getElementById("Quad1").className = "boardQuad270";
      }
      else if(document.getElementById("Quad1").className == "boardQuad270"){
        var quad1Spots = document.getElementsByClassName("openSpot1");
        quad1Spots[0].id = quad1Spots[0].id[0] + "11";
        quad1Spots[1].id = quad1Spots[1].id[0] + "12";
        quad1Spots[2].id = quad1Spots[2].id[0] + "13";
        quad1Spots[3].id = quad1Spots[3].id[0] + "14";
        quad1Spots[5].id = quad1Spots[5].id[0] + "16";
        quad1Spots[6].id = quad1Spots[6].id[0] + "17";
        quad1Spots[7].id = quad1Spots[7].id[0] + "18";
        quad1Spots[8].id = quad1Spots[8].id[0] + "19";
        document.getElementById("Quad1").className = "boardQuad0";
      }
    }
    if(recQuad == 1 && recRotate == 'R'){
      var quadName = document.getElementById("Quad1");
      if(document.getElementById("Quad1").className == "boardQuad180"){
        var quad1Spots = document.getElementsByClassName("openSpot1");
        quad1Spots[0].id = quad1Spots[0].id[0] + "13";
        quad1Spots[1].id = quad1Spots[1].id[0] + "16";
        quad1Spots[2].id = quad1Spots[2].id[0] + "19";
        quad1Spots[3].id = quad1Spots[3].id[0] + "12";
        quad1Spots[5].id = quad1Spots[5].id[0] + "18";
        quad1Spots[6].id = quad1Spots[6].id[0] + "11";
        quad1Spots[7].id = quad1Spots[7].id[0] + "14";
        quad1Spots[8].id = quad1Spots[8].id[0] + "17";
        document.getElementById("Quad1").className = "boardQuad90";
       }
      else if(document.getElementById("Quad1").className == "boardQuad270"){
        var quad1Spots = document.getElementsByClassName("openSpot1");
        quad1Spots[0].id = quad1Spots[0].id[0] + "19";
        quad1Spots[1].id = quad1Spots[1].id[0] + "18";
        quad1Spots[2].id = quad1Spots[2].id[0] + "17";
        quad1Spots[3].id = quad1Spots[3].id[0] + "16";
        quad1Spots[5].id = quad1Spots[5].id[0] + "14";
        quad1Spots[6].id = quad1Spots[6].id[0] + "13";
        quad1Spots[7].id = quad1Spots[7].id[0] + "12";
        quad1Spots[8].id = quad1Spots[8].id[0] + "11";
        document.getElementById("Quad1").className = "boardQuad180";
      }
      else if(document.getElementById("Quad1").className == "boardQuad0"){
        var quad1Spots = document.getElementsByClassName("openSpot1");
        quad1Spots[0].id = quad1Spots[0].id[0] + "17";
        quad1Spots[1].id = quad1Spots[1].id[0] + "14";
        quad1Spots[2].id = quad1Spots[2].id[0] + "11";
        quad1Spots[3].id = quad1Spots[3].id[0] + "18";
        quad1Spots[5].id = quad1Spots[5].id[0] + "12";
        quad1Spots[6].id = quad1Spots[6].id[0] + "19";
        quad1Spots[7].id = quad1Spots[7].id[0] + "16";
        quad1Spots[8].id = quad1Spots[8].id[0] + "13";
        document.getElementById("Quad1").className = "boardQuad270";
      }
      else if(document.getElementById("Quad1").className == "boardQuad90"){
        var quad1Spots = document.getElementsByClassName("openSpot1");
        quad1Spots[0].id = quad1Spots[0].id[0] + "11";
        quad1Spots[1].id = quad1Spots[1].id[0] + "12";
        quad1Spots[2].id = quad1Spots[2].id[0] + "13";
        quad1Spots[3].id = quad1Spots[3].id[0] + "14";
        quad1Spots[5].id = quad1Spots[5].id[0] + "16";
        quad1Spots[6].id = quad1Spots[6].id[0] + "17";
        quad1Spots[7].id = quad1Spots[7].id[0] + "18";
        quad1Spots[8].id = quad1Spots[8].id[0] + "19";
        document.getElementById("Quad1").className = "boardQuad0";
      }
    }
    if(recQuad == 2 && recRotate == 'C'){
      var quadName = document.getElementById("Quad2");
      if(document.getElementById("Quad2").className == "boardQuad0"){
        var quad2Spots = document.getElementsByClassName("openSpot2");
        quad2Spots[0].id = quad2Spots[0].id[0] + "23";
        quad2Spots[1].id = quad2Spots[1].id[0] + "26";
        quad2Spots[2].id = quad2Spots[2].id[0] + "29";
        quad2Spots[3].id = quad2Spots[3].id[0] + "22";
        quad2Spots[5].id = quad2Spots[5].id[0] + "28";
        quad2Spots[6].id = quad2Spots[6].id[0] + "21";
        quad2Spots[7].id = quad2Spots[7].id[0] + "24";
        quad2Spots[8].id = quad2Spots[8].id[0] + "27";
        document.getElementById("Quad2").className = "boardQuad90";
       }
      else if(document.getElementById("Quad2").className == "boardQuad90"){
        var quad2Spots = document.getElementsByClassName("openSpot2");
        quad2Spots[0].id = quad2Spots[0].id[0] + "29";
        quad2Spots[1].id = quad2Spots[1].id[0] + "28";
        quad2Spots[2].id = quad2Spots[2].id[0] + "27";
        quad2Spots[3].id = quad2Spots[3].id[0] + "26";
        quad2Spots[5].id = quad2Spots[5].id[0] + "24";
        quad2Spots[6].id = quad2Spots[6].id[0] + "23";
        quad2Spots[7].id = quad2Spots[7].id[0] + "22";
        quad2Spots[8].id = quad2Spots[8].id[0] + "21";
        document.getElementById("Quad2").className = "boardQuad180";
      }
      else if(document.getElementById("Quad2").className == "boardQuad180"){
        var quad2Spots = document.getElementsByClassName("openSpot2");
        quad2Spots[0].id = quad2Spots[0].id[0] + "27";
        quad2Spots[1].id = quad2Spots[1].id[0] + "24";
        quad2Spots[2].id = quad2Spots[2].id[0] + "21";
        quad2Spots[3].id = quad2Spots[3].id[0] + "28";
        quad2Spots[5].id = quad2Spots[5].id[0] + "22";
        quad2Spots[6].id = quad2Spots[6].id[0] + "29";
        quad2Spots[7].id = quad2Spots[7].id[0] + "26";
        quad2Spots[8].id = quad2Spots[8].id[0] + "23";
        document.getElementById("Quad2").className = "boardQuad270";
      }
      else if(document.getElementById("Quad2").className == "boardQuad270"){
        var quad2Spots = document.getElementsByClassName("openSpot2");
        quad2Spots[0].id = quad2Spots[0].id[0] + "21";
        quad2Spots[1].id = quad2Spots[1].id[0] + "22";
        quad2Spots[2].id = quad2Spots[2].id[0] + "23";
        quad2Spots[3].id = quad2Spots[3].id[0] + "24";
        quad2Spots[5].id = quad2Spots[5].id[0] + "26";
        quad2Spots[6].id = quad2Spots[6].id[0] + "27";
        quad2Spots[7].id = quad2Spots[7].id[0] + "28";
        quad2Spots[8].id = quad2Spots[8].id[0] + "29";
        document.getElementById("Quad2").className = "boardQuad0";
      }
    }
    if(recQuad == 2 && recRotate == 'R'){
      var quadName = document.getElementById("Quad2");
      if(document.getElementById("Quad2").className == "boardQuad180"){
        var quad2Spots = document.getElementsByClassName("openSpot2");
        quad2Spots[0].id = quad2Spots[0].id[0] + "23";
        quad2Spots[1].id = quad2Spots[1].id[0] + "26";
        quad2Spots[2].id = quad2Spots[2].id[0] + "29";
        quad2Spots[3].id = quad2Spots[3].id[0] + "22";
        quad2Spots[5].id = quad2Spots[5].id[0] + "28";
        quad2Spots[6].id = quad2Spots[6].id[0] + "21";
        quad2Spots[7].id = quad2Spots[7].id[0] + "24";
        quad2Spots[8].id = quad2Spots[8].id[0] + "27";
        document.getElementById("Quad2").className = "boardQuad90";
       }
      else if(document.getElementById("Quad2").className == "boardQuad270"){
        var quad2Spots = document.getElementsByClassName("openSpot2");
        quad2Spots[0].id = quad2Spots[0].id[0] + "29";
        quad2Spots[1].id = quad2Spots[1].id[0] + "28";
        quad2Spots[2].id = quad2Spots[2].id[0] + "27";
        quad2Spots[3].id = quad2Spots[3].id[0] + "26";
        quad2Spots[5].id = quad2Spots[5].id[0] + "24";
        quad2Spots[6].id = quad2Spots[6].id[0] + "23";
        quad2Spots[7].id = quad2Spots[7].id[0] + "22";
        quad2Spots[8].id = quad2Spots[8].id[0] + "21";
        document.getElementById("Quad2").className = "boardQuad180";
      }
      else if(document.getElementById("Quad2").className == "boardQuad0"){
        var quad2Spots = document.getElementsByClassName("openSpot2");
        quad2Spots[0].id = quad2Spots[0].id[0] + "27";
        quad2Spots[1].id = quad2Spots[1].id[0] + "24";
        quad2Spots[2].id = quad2Spots[2].id[0] + "21";
        quad2Spots[3].id = quad2Spots[3].id[0] + "28";
        quad2Spots[5].id = quad2Spots[5].id[0] + "22";
        quad2Spots[6].id = quad2Spots[6].id[0] + "29";
        quad2Spots[7].id = quad2Spots[7].id[0] + "26";
        quad2Spots[8].id = quad2Spots[8].id[0] + "23";
        document.getElementById("Quad2").className = "boardQuad270";
      }
      else if(document.getElementById("Quad2").className == "boardQuad90"){
        var quad2Spots = document.getElementsByClassName("openSpot2");
        quad2Spots[0].id = quad2Spots[0].id[0] + "21";
        quad2Spots[1].id = quad2Spots[1].id[0] + "22";
        quad2Spots[2].id = quad2Spots[2].id[0] + "23";
        quad2Spots[3].id = quad2Spots[3].id[0] + "24";
        quad2Spots[5].id = quad2Spots[5].id[0] + "26";
        quad2Spots[6].id = quad2Spots[6].id[0] + "27";
        quad2Spots[7].id = quad2Spots[7].id[0] + "28";
        quad2Spots[8].id = quad2Spots[8].id[0] + "29";
        document.getElementById("Quad2").className = "boardQuad0";
      }
    }
    if(recQuad == 3 && recRotate == 'C'){
      var quadName = document.getElementById("Quad3");
      if(document.getElementById("Quad3").className == "boardQuad0"){
        var quad3Spots = document.getElementsByClassName("openSpot3");
        quad3Spots[0].id = quad3Spots[0].id[0] + "33";
        quad3Spots[1].id = quad3Spots[1].id[0] + "36";
        quad3Spots[2].id = quad3Spots[2].id[0] + "39";
        quad3Spots[3].id = quad3Spots[3].id[0] + "32";
        quad3Spots[5].id = quad3Spots[5].id[0] + "38";
        quad3Spots[6].id = quad3Spots[6].id[0] + "31";
        quad3Spots[7].id = quad3Spots[7].id[0] + "34";
        quad3Spots[8].id = quad3Spots[8].id[0] + "37";
        document.getElementById("Quad3").className = "boardQuad90";
       }
      else if(document.getElementById("Quad3").className == "boardQuad90"){
        var quad3Spots = document.getElementsByClassName("openSpot3");
        quad3Spots[0].id = quad3Spots[0].id[0] + "39";
        quad3Spots[1].id = quad3Spots[1].id[0] + "38";
        quad3Spots[2].id = quad3Spots[2].id[0] + "37";
        quad3Spots[3].id = quad3Spots[3].id[0] + "36";
        quad3Spots[5].id = quad3Spots[5].id[0] + "34";
        quad3Spots[6].id = quad3Spots[6].id[0] + "33";
        quad3Spots[7].id = quad3Spots[7].id[0] + "32";
        quad3Spots[8].id = quad3Spots[8].id[0] + "31";
        document.getElementById("Quad3").className = "boardQuad180";
      }
      else if(document.getElementById("Quad3").className == "boardQuad180"){
        var quad3Spots = document.getElementsByClassName("openSpot3");
        quad3Spots[0].id = quad3Spots[0].id[0] + "37";
        quad3Spots[1].id = quad3Spots[1].id[0] + "34";
        quad3Spots[2].id = quad3Spots[2].id[0] + "31";
        quad3Spots[3].id = quad3Spots[3].id[0] + "38";
        quad3Spots[5].id = quad3Spots[5].id[0] + "32";
        quad3Spots[6].id = quad3Spots[6].id[0] + "39";
        quad3Spots[7].id = quad3Spots[7].id[0] + "36";
        quad3Spots[8].id = quad3Spots[8].id[0] + "33";
        document.getElementById("Quad3").className = "boardQuad270";
      }
      else if(document.getElementById("Quad3").className == "boardQuad270"){
        var quad3Spots = document.getElementsByClassName("openSpot3");
        quad3Spots[0].id = quad3Spots[0].id[0] + "31";
        quad3Spots[1].id = quad3Spots[1].id[0] + "32";
        quad3Spots[2].id = quad3Spots[2].id[0] + "33";
        quad3Spots[3].id = quad3Spots[3].id[0] + "34";
        quad3Spots[5].id = quad3Spots[5].id[0] + "36";
        quad3Spots[6].id = quad3Spots[6].id[0] + "37";
        quad3Spots[7].id = quad3Spots[7].id[0] + "38";
        quad3Spots[8].id = quad3Spots[8].id[0] + "39";
        document.getElementById("Quad3").className = "boardQuad0";
      }
    }
    if(recQuad == 3 && recRotate == 'R'){
      var quadName = document.getElementById("Quad3");
      if(document.getElementById("Quad3").className == "boardQuad180"){
        var quad3Spots = document.getElementsByClassName("openSpot3");
        quad3Spots[0].id = quad3Spots[0].id[0] + "33";
        quad3Spots[1].id = quad3Spots[1].id[0] + "36";
        quad3Spots[2].id = quad3Spots[2].id[0] + "39";
        quad3Spots[3].id = quad3Spots[3].id[0] + "32";
        quad3Spots[5].id = quad3Spots[5].id[0] + "38";
        quad3Spots[6].id = quad3Spots[6].id[0] + "31";
        quad3Spots[7].id = quad3Spots[7].id[0] + "34";
        quad3Spots[8].id = quad3Spots[8].id[0] + "37";
        document.getElementById("Quad3").className = "boardQuad90";
       }
      else if(document.getElementById("Quad3").className == "boardQuad270"){
        var quad3Spots = document.getElementsByClassName("openSpot3");
        quad3Spots[0].id = quad3Spots[0].id[0] + "39";
        quad3Spots[1].id = quad3Spots[1].id[0] + "38";
        quad3Spots[2].id = quad3Spots[2].id[0] + "37";
        quad3Spots[3].id = quad3Spots[3].id[0] + "36";
        quad3Spots[5].id = quad3Spots[5].id[0] + "34";
        quad3Spots[6].id = quad3Spots[6].id[0] + "33";
        quad3Spots[7].id = quad3Spots[7].id[0] + "32";
        quad3Spots[8].id = quad3Spots[8].id[0] + "31";
        document.getElementById("Quad3").className = "boardQuad180";
      }
      else if(document.getElementById("Quad3").className == "boardQuad0"){
        var quad3Spots = document.getElementsByClassName("openSpot3");
        quad3Spots[0].id = quad3Spots[0].id[0] + "37";
        quad3Spots[1].id = quad3Spots[1].id[0] + "34";
        quad3Spots[2].id = quad3Spots[2].id[0] + "31";
        quad3Spots[3].id = quad3Spots[3].id[0] + "38";
        quad3Spots[5].id = quad3Spots[5].id[0] + "32";
        quad3Spots[6].id = quad3Spots[6].id[0] + "39";
        quad3Spots[7].id = quad3Spots[7].id[0] + "36";
        quad3Spots[8].id = quad3Spots[8].id[0] + "33";
        document.getElementById("Quad3").className = "boardQuad270";
      }
      else if(document.getElementById("Quad3").className == "boardQuad90"){
        var quad3Spots = document.getElementsByClassName("openSpot3");
        quad3Spots[0].id = quad3Spots[0].id[0] + "31";
        quad3Spots[1].id = quad3Spots[1].id[0] + "32";
        quad3Spots[2].id = quad3Spots[2].id[0] + "33";
        quad3Spots[3].id = quad3Spots[3].id[0] + "34";
        quad3Spots[5].id = quad3Spots[5].id[0] + "36";
        quad3Spots[6].id = quad3Spots[6].id[0] + "37";
        quad3Spots[7].id = quad3Spots[7].id[0] + "38";
        quad3Spots[8].id = quad3Spots[8].id[0] + "39";
        document.getElementById("Quad3").className = "boardQuad0";
      }
    }
    if(recQuad == 4 && recRotate == 'C'){
      var quadName = document.getElementById("Quad4");
      if(document.getElementById("Quad4").className == "boardQuad0"){
        var quad4Spots = document.getElementsByClassName("openSpot4");
        quad4Spots[0].id = quad4Spots[0].id[0] + "43";
        quad4Spots[1].id = quad4Spots[1].id[0] + "46";
        quad4Spots[2].id = quad4Spots[2].id[0] + "49";
        quad4Spots[3].id = quad4Spots[3].id[0] + "42";
        quad4Spots[5].id = quad4Spots[5].id[0] + "48";
        quad4Spots[6].id = quad4Spots[6].id[0] + "41";
        quad4Spots[7].id = quad4Spots[7].id[0] + "44";
        quad4Spots[8].id = quad4Spots[8].id[0] + "47";
        document.getElementById("Quad4").className = "boardQuad90";
       }
      else if(document.getElementById("Quad4").className == "boardQuad90"){
        var quad4Spots = document.getElementsByClassName("openSpot4");
        quad4Spots[0].id = quad4Spots[0].id[0] + "49";
        quad4Spots[1].id = quad4Spots[1].id[0] + "48";
        quad4Spots[2].id = quad4Spots[2].id[0] + "47";
        quad4Spots[3].id = quad4Spots[3].id[0] + "46";
        quad4Spots[5].id = quad4Spots[5].id[0] + "44";
        quad4Spots[6].id = quad4Spots[6].id[0] + "43";
        quad4Spots[7].id = quad4Spots[7].id[0] + "42";
        quad4Spots[8].id = quad4Spots[8].id[0] + "41";
        document.getElementById("Quad4").className = "boardQuad180";
      }
      else if(document.getElementById("Quad4").className == "boardQuad180"){
        var quad4Spots = document.getElementsByClassName("openSpot4");
        quad4Spots[0].id = quad4Spots[0].id[0] + "47";
        quad4Spots[1].id = quad4Spots[1].id[0] + "44";
        quad4Spots[2].id = quad4Spots[2].id[0] + "41";
        quad4Spots[3].id = quad4Spots[3].id[0] + "48";
        quad4Spots[5].id = quad4Spots[5].id[0] + "42";
        quad4Spots[6].id = quad4Spots[6].id[0] + "49";
        quad4Spots[7].id = quad4Spots[7].id[0] + "46";
        quad4Spots[8].id = quad4Spots[8].id[0] + "43";
        document.getElementById("Quad4").className = "boardQuad270";
      }
      else if(document.getElementById("Quad4").className == "boardQuad270"){
        var quad4Spots = document.getElementsByClassName("openSpot4");
        quad4Spots[0].id = quad4Spots[0].id[0] + "41";
        quad4Spots[1].id = quad4Spots[1].id[0] + "42";
        quad4Spots[2].id = quad4Spots[2].id[0] + "43";
        quad4Spots[3].id = quad4Spots[3].id[0] + "44";
        quad4Spots[5].id = quad4Spots[5].id[0] + "46";
        quad4Spots[6].id = quad4Spots[6].id[0] + "47";
        quad4Spots[7].id = quad4Spots[7].id[0] + "48";
        quad4Spots[8].id = quad4Spots[8].id[0] + "49";
        document.getElementById("Quad4").className = "boardQuad0";
      }
    }
    if(recQuad == 4 && recRotate == 'R'){
      var quadName = document.getElementById("Quad4");
      if(document.getElementById("Quad4").className == "boardQuad180"){
        var quad4Spots = document.getElementsByClassName("openSpot4");
        quad4Spots[0].id = quad4Spots[0].id[0] + "43";
        quad4Spots[1].id = quad4Spots[1].id[0] + "46";
        quad4Spots[2].id = quad4Spots[2].id[0] + "49";
        quad4Spots[3].id = quad4Spots[3].id[0] + "42";
        quad4Spots[5].id = quad4Spots[5].id[0] + "48";
        quad4Spots[6].id = quad4Spots[6].id[0] + "41";
        quad4Spots[7].id = quad4Spots[7].id[0] + "44";
        quad4Spots[8].id = quad4Spots[8].id[0] + "47";
        document.getElementById("Quad4").className = "boardQuad90";
       }
      else if(document.getElementById("Quad4").className == "boardQuad270"){
        var quad4Spots = document.getElementsByClassName("openSpot4");
        quad4Spots[0].id = quad4Spots[0].id[0] + "49";
        quad4Spots[1].id = quad4Spots[1].id[0] + "48";
        quad4Spots[2].id = quad4Spots[2].id[0] + "47";
        quad4Spots[3].id = quad4Spots[3].id[0] + "46";
        quad4Spots[5].id = quad4Spots[5].id[0] + "44";
        quad4Spots[6].id = quad4Spots[6].id[0] + "43";
        quad4Spots[7].id = quad4Spots[7].id[0] + "42";
        quad4Spots[8].id = quad4Spots[8].id[0] + "41";
        document.getElementById("Quad4").className = "boardQuad180";
      }
      else if(document.getElementById("Quad4").className == "boardQuad0"){
        var quad4Spots = document.getElementsByClassName("openSpot4");
        quad4Spots[0].id = quad4Spots[0].id[0] + "47";
        quad4Spots[1].id = quad4Spots[1].id[0] + "44";
        quad4Spots[2].id = quad4Spots[2].id[0] + "41";
        quad4Spots[3].id = quad4Spots[3].id[0] + "48";
        quad4Spots[5].id = quad4Spots[5].id[0] + "42";
        quad4Spots[6].id = quad4Spots[6].id[0] + "49";
        quad4Spots[7].id = quad4Spots[7].id[0] + "46";
        quad4Spots[8].id = quad4Spots[8].id[0] + "43";
        document.getElementById("Quad4").className = "boardQuad270";
      }
      else if(document.getElementById("Quad4").className == "boardQuad90"){
        var quad4Spots = document.getElementsByClassName("openSpot4");
        quad4Spots[0].id = quad4Spots[0].id[0] + "41";
        quad4Spots[1].id = quad4Spots[1].id[0] + "42";
        quad4Spots[2].id = quad4Spots[2].id[0] + "43";
        quad4Spots[3].id = quad4Spots[3].id[0] + "44";
        quad4Spots[5].id = quad4Spots[5].id[0] + "46";
        quad4Spots[6].id = quad4Spots[6].id[0] + "47";
        quad4Spots[7].id = quad4Spots[7].id[0] + "48";
        quad4Spots[8].id = quad4Spots[8].id[0] + "49";
        document.getElementById("Quad4").className = "boardQuad0";
      }
    }



      // below is Andy testing code
      $('#andy-test-events').append('newMove detected in game: ' + game_name + '\n' + game_state);
    } catch(err) {
      console.log(err.message);
    }
    return;
  });
});





/* CORE INTERFACE SPEC - communication protocol between front and back-end

  0. JoinGame(name_string) ==> [success_bool, return_msg, game_state_array]

    Description: join an existing game by inputting name of game

    Input: case-insensitive string of game name, e.g. "pentamos"

    Output: returns array of three elements, indicating if database successfully retrieved game state
      - boolean
      - string
      - array with 5 elements

      game_state_array[0] = positions_array
      game_state_array[1] = integer turns taken so far (7)
      game_state_array[2] = string color to move next ('B')
      game_state_array[3] = string game result ('W' = white won,'B' = black won,'D' = draw,'P' = game in progress)
      game_state_array[4] = string last move command, or empty if new

      positions_array[0] = quadrant 1 array, 9 elements
      positions_array[1] = quadrant 2 array, 9 elements
      positions_array[2] = quadrant 3 array, 9 elements
      positions_array[3] = quadrant 4 array, 9 elements

      Quadrants on the board:

      | Q2 Q1 |
      | Q3 Q4 |


      Positions in a quadrant:

      | 1 2 3 |
      | 4 5 6 |
      | 7 8 9 |


      Example Quadrant: ['B','W','O','O','B','W','B','O','O']

      | B W 0 |
      | 0 B W |
      | B 0 0 |


  1. NewGame(name_string) ==> [success_bool, return_msg]

    Description: make a new game

    Input: desired name of game

    Output: returns array of two elements, indicating if database succeeded in creating new game or not (e.g. name taken)
      - boolean
      - string



  2. MoveSubmit(s) ==> [output_boolean, output_string_2]

    Description: user submits move

    Input: case-insensitive string of the form 'B13C1' or 'W38'. First letter indicates marble color placed, second character is integer 1-4 indicating quadrant (Cartesian plane convention top-right is I, top-left is II, etc), third character is marble position 1-9 within quadrant (left-to-right, top-to-bottom), fourth optional character indicates rotation direction clockwise (C) or counter-clockwise (R), fifth optional character indicates quadrant rotated (required if fourth character present).

    Returns: array of two objects, the first being True if move is valid and succeeds in updating game state, False in all other cases (illegal move, error updating, etc.). Second object is a message string describing the outcome, i.e. explaining the reason the move failed. (Can disregard message if True since it should be a copy of the input string.)

    Example:
      var outcome = MoveSubmit('B13C1');
      if (outcome[0]){
        // execute code for legal, accepted move
      } else {
        console.log(outcome[1]); // message why move failed
      }


  3. Event 'newMove' {              Elaboration of event details
      color: color_str,             'B' or 'W' (color of marble placed)
      quad: quadrant_int,           1-4 (quadrant of marble placement)
      position: pos_int,            1-9 (initially placed hole)
      rotate: quadrant_int,         0-4 (0 = no rotation)
      direction: direction_str,     'C' = clock, 'R' = counter, 'N' = none
    }

    Description: This event will be triggered when another player successfully modifies the game state. The event contains details of the new move so the front-end can update the display accordingly. Front-end should listen for event per implementation instructions below.

    Input: no inputs, triggers on successful database modification from elsewhere in the universe.

    Returns: event detail object described above.

    Implementation Details:

      1) Add an event listener function to the page after the window has finished loading all the elements of our website. You can put this at the top or bottom of the code.js file, or anywhere in between function definitions. For example:

          $( window ).on( "load", function() {
            document.addEventListener('newMove', myNewMoveListenerFunction);
          });

      2) Define the listener function somewhere in code.js file. It has one argument, which is the Event e. It can do whatever you want. Maybe something like:

          function myNewMoveListenerFunction(e){
            console.log('detected new move!');
            console.log(e.color + ' marble placed in Q' + e.quad + ' at position ' + e.position);
            if (e.direction == 'C') {
              console.log( 'Clockwise rotation detected on Q' + e.rotate);
            } else if (e.direction == 'R') {
              console.log('Counter-clock rotation detected on Q' + e.rotate);
            } else {  //redundant catch-all condition
              console.log('No rotation, should be True: ' + e.rotate == 0);
            }
          }

    Reference Docs:
      - great explainer article: https://www.bitdegree.org/learn/javascript-addeventlistener
      - document readiness: https://learn.jquery.com/using-jquery-core/document-ready/
      - introduction to events: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events
      - general event handling: https://developer.mozilla.org/en-US/docs/Web/Events/Event_handlers
      - setting listener: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener, https://www.w3schools.com/jsref/met_document_addeventlistener.asp
      - add number to string: https://stackoverflow.com/a/4234569
      - single vs double quotes difference (none): https://flexiple.com/double-vs-single-quotes-javascript/
*/


/* FUTURE INTERFACE FEATURE BRAINSTORMING
  - clocks for each side move timer
  - create new game with custom name or join game in progress by entering name
  - login system
  - takebacks to undo last move, maybe via request to opponent?
  - retrieve game state history from database (replay games, etc)
  - add ideas as minus bullets, other person change to plus if in agreement?
  - illegal attempted move event from opponenet, alert user and display message secretly insulting the opponent
  -
*/
