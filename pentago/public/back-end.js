var current_game = '';
var current_game_state = [];

async function JoinGame(name_string, live = true){
  if (live) { return [false, 'dummy test output', []]; }
  // join an existing game by inputting name of game
  var success_bool = false;
  var return_msg = '';
  var game_state_array = [];
  const findGame = firebase.functions().httpsCallable('loadExistingGame');

  // find if game exists
  return await findGame({
    name: name_string,
  }).then(result => {
    var exists_bool = result.data.exists;
    var game_state = JSON.parse(result.data.state);
    if (exists_bool){
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

async function NewGame(name_string, live = true){
  if(live){ return [false, 'dummy test output'];}

  // make a new game
  var return_msg = '';
  const startNewGame = firebase.functions().httpsCallable('startNewGame');

  // create new game state array
  var new_game_state_array = [[['O','O','O','O','O','O','O','O','O'],['O','O','O','O','O','O','O','O','O'],['O','O','O','O','O','O','O','O','O'],['O','O','O','O','O','O','O','O','O']],0,'W','P',''];

  // add game state to database

  return await startNewGame({
    name: name_string,
    state: JSON.stringify(new_game_state_array)
  }).then(result => {
    var return_msg = result.data.msg;
    var success = result.data.bool;
    if (success){
      current_game = name_string;
      current_game_state = new_game_state_array;
      return [success, return_msg];
    } else {
      return [false,return_msg]
    }
  });

}

function MoveSubmit(move_string,live = true){
  if(live){ return [false, 'dummy test output on input ' + move_string]; }
  // user submits move
  var output_bool = false;
  var return_msg = '';
  const submitMoveToGame = firebase.functions().httpsCallable('makeMove');
  var legal_array = isLegalMove(move_string);
  if (legal_array[0]){
    //update game state

    // TODO game operations on array

    // add game state to database
    return submitMoveToGame({
      name: current_game,
      move: move_string,
      state: current_game_state
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

  return [false,msg_reason]
}











////////// HANDLING ANDY FORM //////////



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
  } else if (s.split(' ')[0] == 'newgame'){
    try {
      const g_name = s.split(' ')[1];
      var output = await NewGame(g_name, false);
      console.log(output);
      output_msg = output[1];
    }  catch(err) {
      console.log(err.message);
    }
  } else if (s.split(' ')[0] == 'move'){
    const move = s.split(' ')[1];
    var output = await MoveSubmit(move, false);
    output_msg = output[1];
  } else if (s.split(' ')[0] == 'load'){
    const g_name = s.split(' ')[1];
    var output = await JoinGame(g_name, false);
    console.log(output[2][1]);
    output_msg = output[1];
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
