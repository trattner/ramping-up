var current_game = '';
var current_game_state = [];
const new_game_const = [[['O','O','O','O','O','O','O','O','O'],['O','O','O','O','O','O','O','O','O'],['O','O','O','O','O','O','O','O','O'],['O','O','O','O','O','O','O','O','O']],0,'W','P',''];
const ms_to_check = 5000;



async function timedMoveCheck(){
  // check if a game is selected
  if (current_game==''){return;}
  // check if more moves in db than present in browser
  const grabLatestState = firebase.functions().httpsCallable('grabLatestState');
  return await grabLatestState({
    moves: current_game_state[1] + 1,
    name: current_game
  }).then(result => {
    var bool = result.data.newbool;
    var new_game_state = JSON.parse(result.data.state);
    if (bool){
      fireEvent(new_game_state);
    }
  });
}

$( window ).on( "load", function() {
  var intervalID = setInterval(timedMoveCheck, ms_to_check);
});

/*
async function backendListen(oldgame,newgame){
  const setGameListener = firebase.functions().httpsCallable('setGameListener');
  await setGameListener({
    newname: newgame,
    oldname: oldgame
  }).then(result => {
    var new_game_state = JSON.parse(result.data.state);
    console.log('found new game state: ' + result.data.state);
    current_game_state = new_game_state;
    const event = new CustomEvent('newMove', {
      gamename: current_game,
      newstate: new_game_state
    });
    document.dispatchEvent(event);
  }).catch((error) => {
    console.log(error.toString());
    return 'ERROR: ' + error.toString();
  });
}
*/

async function JoinGame(name_string, live = false){
  if (live) { return [false, 'dummy test output', new_game_const]; }
  // join an existing game by inputting name of game
  var success_bool = false;
  var return_msg = '';
  var game_state_array = [];
  const findGame = firebase.functions().httpsCallable('loadExistingGame');

  // find if game exists
  return await findGame({
    name: name_string,
  }).then(async function(result) {
    var exists_bool = result.data.exists;
    var game_state = JSON.parse(result.data.state);
    if (exists_bool){
      //await backendListen(current_game,name_string);
      current_game = name_string;
      current_game_state = game_state;
      return [true, 'game found', game_state];
    } else {
    // show false
      return [false, 'game not found', []];
    }
  }).catch((error) => {
    return [false, 'ERROR: ' + error.toString(), []];
  });
}

async function NewGame(name_string, live = false){
  if(live){ return [false, 'dummy test output'];}

  // make a new game
  var return_msg = '';
  const startNewGame = firebase.functions().httpsCallable('startNewGame');

  // create new game state array
  var new_game_state_array = new_game_const;

  // add game state to database

  return await startNewGame({
    name: name_string,
    state: JSON.stringify(new_game_state_array)
  }).then(async function(result) {
    var return_msg = result.data.msg;
    var success = result.data.bool;
    if (success){
      //await backendListen(current_game,name_string);
      current_game = name_string;
      current_game_state = new_game_state_array;
      return [success, return_msg];
    } else {
      return [false,return_msg]
    }
  });
}

function MoveSubmit(move_string,live = false){
  if(live){ return [false, 'dummy test output on input ' + move_string]; }
  // user submits move
  var output_bool = false;
  var return_msg = '';
  const submitMoveToGame = firebase.functions().httpsCallable('makeMove');
  var legal_array = isLegalMove(move_string);
  if (legal_array[0]){
    //update game state

    // TODO game operations on array
    const move_color = move_string[0];
    const move_quadrant = parseInt(move_string[1]);
    const move_position = parseInt(move_string[2]);
    var rotate_direction = '';
    var rotate_quadrant = '';
    if (move_string.length == 5) {
      rotate_direction = move_string[3];
      rotate_quadrant = parseInt(move_string[4]);
    }
    // place marble
    current_game_state[0][move_quadrant - 1][move_position-1] = move_color;
    // rotate quadrant
    if (rotate_direction) {
      const q = current_game_state[0][move_quadrant - 1];

      if (rotate_direction == 'C'){
        // clockwise
        current_game_state[0][move_quadrant - 1] = [q[3],q[0],q[1],q[6],q[4],q[2],q[7],q[8],q[5]];
      } else {
        // counter-clock
        current_game_state[0][move_quadrant - 1] = [q[1],q[2],q[5],q[0],q[4],q[8],q[3],q[6],q[7]];
      }
    }

    // add to turn counter
    current_game_state[1] = current_game_state[1] + 1;

    // update next move color
    if (move_color == 'B'){
      current_game_state[2] = 'W';
    } else {
      current_game_state[2] = 'B';
    }

    // check win condition and update game result
    var winners = findWinners();
    if (winners.length == 2){
      // both players got five in a row
      current_game_state[3] = 'D';
    } else if (winners.length == 1){
      // one player got five in a row
      current_game_state[3] = winners[0];
    } else if (current_game_state[1]==36){
      // no five in a row, but all spots filled
      current_game_state[3] = 'D';
    } else {
      // spots remaining and no winner detected
      current_game_state[3] = 'P'
    }

    // update move string
    current_game_state[4] = move_string;
    // TODO - remove redundant from database

    // add game state to database
    return submitMoveToGame({
      name: current_game,
      move: move_string,
      state: JSON.stringify(current_game_state)
    }).then(result => {
      var return_msg = result.data.msg;
      output_bool = result.data.bool;
      return [output_bool, return_msg];
    });
  } else {
    // move not legal
    return [false, legal_array[1]];
  }
}


function isLegalMove(move_string){
  // takes input message from front-end, outputs [bool,msg]
  var msg_reason = 'placeholder message';
  // correct color?
  if (move_string[0]!==current_game_state[2]){
    msg_reason = 'Not the correct color to move!';
    return [false,msg_reason];
  }
  // space occupied?
  const move_quadrant = parseInt(move_string[1]);
  const move_position = parseInt(move_string[2]);
  if (current_game_state[0][move_quadrant - 1][move_position-1] !== 'O'){
    msg_reason = 'Space occuppied, submit different move!';
    return [false,msg_reason];
  };
  // rotation required?
  if (move_string.length < 5) {
    if (rotateQuad(current_game_state[0][0])!==current_game_state[0][0] && rotateQuad(current_game_state[0][1])!==current_game_state[0][1] && rotateQuad(current_game_state[0][2])!==current_game_state[0][2] && rotateQuad(current_game_state[0][3])!==current_game_state[0][3]) {
      msg_reason = 'Rotation required, please submit as part of move!';
      return [false,msg_reason];
    }
  }
  // can check other stuff for strictness but major flags passed above...
  return [true,msg_reason];
}


function rotateQuad(q,direction='C'){
  // given a quadrant and direction, return rotated version
  if (direction == 'C'){
    // clockwise
    return [q[3],q[0],q[1],q[6],q[4],q[2],q[7],q[8],q[5]];
  }
  if (direction == 'R'){
    return [q[1],q[2],q[5],q[0],q[4],q[8],q[3],q[6],q[7]];
  }
  return ['direction not input'];
  /*
      | 1 2 3 |  C   | 4 1 2 |
      | 4 5 6 | ===> | 7 5 3 |
      | 7 8 9 |      | 8 9 6 |

      | 1 2 3 |  R   | 2 3 6 |
      | 4 5 6 | ===> | 1 5 9 |
      | 7 8 9 |      | 4 7 8 |
  */
}

function findWinners(){
  // return list of winning colors if any, from current game
  var winners = [];
  const quads = current_game_state[0];
  // flatten game quads into big array
  const flat = [
    quads[1].slice(0,3).concat(quads[0].slice(0,3)),
    quads[1].slice(3,6).concat(quads[0].slice(3,6)),
    quads[1].slice(6,9).concat(quads[0].slice(6,9)),
    quads[2].slice(0,3).concat(quads[3].slice(0,3)),
    quads[2].slice(3,6).concat(quads[3].slice(3,6)),
    quads[2].slice(6,9).concat(quads[3].slice(6,9))
  ];
  // check verticals
  for (var r = 0; r < 2; r++){
    for (var c = 0; c < 6; c++){
      var win_color = flat[r][c];
      if (win_color == 'O'){ break; }
      var check = 0;
      for (var i = 1; i < 5; i++){
        if (win_color == flat[r+i][c]){
          check ++;
        } else {
          break;
        }
      }
      if (check == 4){
        winners.push(win_color);
      }
    }
  }
  // check horizontals
  for (var r = 0; r < 6; r++){
    for (var c = 0; c < 2; c++){
      var win_color = flat[r][c];
      if (win_color == 'O'){ break; }
      var check = 0;
      for (var i = 1; i < 5; i++){
        if (win_color == flat[r][c+i]){
          check ++;
        } else {
          break;
        }
      }
      if (check == 4){
        winners.push(win_color);
      }
    }
  }
  // check diagonal, top left to bottom right
  for (var r = 0; r < 2; r++){
    for (var c = 0; c < 2; c++){
      var win_color = flat[r][c];
      if (win_color == 'O'){ break; }
      var check = 0;
      for (var i = 1; i < 5; i++){
        if (win_color == flat[r+i][c+i]){
          check ++;
        } else {
          break;
        }
      }
      if (check == 4){
        winners.push(win_color);
      }
    }
  }
  // check diag top right to bottom left
  for (var r = 0; r < 2; r++){
    for (var c = 4; c < 6; c++){
      var win_color = flat[r][c];
      if (win_color == 'O'){ break; }
      var check = 0;
      for (var i = 1; i < 5; i++){
        if (win_color == flat[r+i][c-i]){
          check ++;
        } else {
          break;
        }
      }
      if (check == 4){
        winners.push(win_color);
      }
    }
  }
  return new Set(winners);
}











////////// HANDLING ANDY FORM //////////

function fireEvent(state){
  //var input_string = $('#andy-test-input').val();
  const event = new CustomEvent('newMove', {detail:{
    gamename: current_game,
    newstate: state
  }});
  document.dispatchEvent(event);
}

var junk_counter = 0;

async function andySubmitPress(){
  // take input and print it to output box, maybe do something with it
  var input_string = $('#andy-test-input').val();
  var server_msg = await dumpJunkToFB(input_string);
  console.log(server_msg);
  var current_output = $('#andy-test-output').val();
  if (current_output){
    $('#andy-test-output').val(current_output + '\n' + input_string + '\n' + server_msg);
  } else {
    $('#andy-test-output').val(input_string + '\n' + server_msg);
  }
  var input_string = $('#andy-test-input').val('');
  scrollToBottom();
}

function andyClearOutput(){
  // get rid of content in output text area
  $('#andy-test-output').val('');
}

function scrollToBottom(){
  // scroll to bottom of text area
  var textarea=$('#andy-test-output')[0];
  textarea.scrollTop = textarea.scrollHeight;
}

async function dumpJunkToFB(s){
  const addJunk = firebase.functions().httpsCallable('addJunk');
  const readJunk = firebase.functions().httpsCallable('readJunk');
  var output_msg='';

  if (s.split(' ')[0] == 'read'){
    output_msg = readJunk({ counter: s.split(' ')[1]});
  } else if (s.split(' ')[0] == 'n'){
    try {
      const g_name = s.split(' ')[1];
      var output = await NewGame(g_name, false);
      console.log(output);
      output_msg = output[1];
    }  catch(err) {
      console.log(err.message);
    }
  } else if (s.split(' ')[0] == 'm'){
    const move = s.split(' ')[1];
    var output = await MoveSubmit(move, false);
    output_msg = output[1];
  } else if (s.split(' ')[0] == 'j'){
    const g_name = s.split(' ')[1];
    var output = await JoinGame(g_name, false);
    console.log(output[2][1]);
    output_msg = output[1];
  } else {
    output_msg = 'command not recognized';
    /*addJunk({ text: s, counter: junk_counter}).then(result => {
        // Read result of the Cloud Function.
        var sanitizedMessage = result.data.text;
        console.log(result);
        output_msg = sanitizedMessage;
      });
    junk_counter ++;*/
  }

  return output_msg;

}
