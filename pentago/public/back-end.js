////////// GENERAL PURPOSE FUNCTIONS //////////

var current_game = '';

function JoinGame(name_string){
  // join an existing game by inputting name of game
  var success_bool = false;
  var return_msg = '';
  var game_state_array = [];
  const findGame = firebase.functions().httpsCallable('loadExistingGame');

  // find if game exists
  findGame({
    name: name_string,
  }).then(result => {
    var exists_bool = result.data.exists;
    var game_state = JSON.parse(result.data.state);
    if (exists_bool){
    // set current game state
      
      return [true, 'game found', game_state];
    } else {
    // show false
      return [false, 'game not found', []];
    }
  }).catch((error) => {
    return [false, 'ERROR: ' + error.toString(), []];
  });
}

function NewGame(name_string){
  // make a new game
  var success_bool = false;
  var return_msg = '';
  const startNewGame = firebase.functions().httpsCallable('startNewGame');

  // create new game state array
  var new_game_state_array = [[['O','O','O','O','O','O','O','O','O'],['O','O','O','O','O','O','O','O','O'],['O','O','O','O','O','O','O','O','O'],['O','O','O','O','O','O','O','O','O']],0,'W','P',''];

  // add game state to database
  startNewGame({
    name: name_string,
    state: JSON.stringify(new_game_state_array)
  }).then(result => {
    var return_msg = result.data.msg;
    var success = result.data.bool;
    if (success){
      current_game = name_string;
    }
  });

  return [success_bool, return_msg];
}

function MoveSubmit(move_string){
// user submits move
  var output_bool = false;
  var return_msg = '';
  const submitMoveToGame = firebase.functions().httpsCallable('makeMove');

  // add game state to database
  submitMoveToGame({
    name: current_game,
    move: move_string
  }).then(result => {
    var return_msg = result.data.msg;
    output_bool = result.data.bool;
  });

  return [output_bool, return_msg];

}

function getGame(game_id){
  // takes game_id string, returns array [exists_bool, state]
}

function changeGame(game_name){
  current_game = game_name;
  return true;
}

function isLegalMove(move_string){
  // takes input message from front-end,
}




////////// HANDLING ANDY FORM //////////


////////// REFERENCE + TESTING //////////


var junk_counter = 0;

function andySubmitPress(){
  // take input and print it to output box, maybe do something with it
  var input_string = $('#andy-test-input').val();
  var server_msg = dumpJunkToFB(input_string);
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

function dumpJunkToFB(s){
  const addJunk = firebase.functions().httpsCallable('addJunk');
  const readJunk = firebase.functions().httpsCallable('readJunk');
  var output_msg='';

  if (s.split(' ')[0] == 'read'){
    output_msg = readJunk({ counter: s.split(' ')[1]});
  } else if (s.split(' ')[0] == 'newgame'){
    const g_name = s.split(' ')[1];
    var output = NewGame(g_name);
    output_msg = output[1];
  } else if (s.split(' ')[0] == 'move'){
    const move = s.split(' ')[1];
    var output = MoveSubmit(move);
    output_msg = output[1];
  } else if (s.split(' ')[0] == 'load'){
    const g_name = s.split(' ')[1];
    var output = JoinGame(g_name);
    output_msg = output[1];
  } else if (s.split(' ')[0] == 'changegame'){
    const g_name = s.split(' ')[1];
    changeGame(g_name);
    console.log('changed game to: ' + current_game);
  } else {
    addJunk({ text: s, counter: junk_counter}).then(result => {
        // Read result of the Cloud Function.
        var sanitizedMessage = result.data.text;
        console.log(result);
        output_msg = sanitizedMessage;
      });
    junk_counter ++;
  }

  return output_msg;

}
