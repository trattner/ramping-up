////////// GENERAL PURPOSE FUNCTIONS //////////

function JoinGame(name_string){

}

function NewGame(name_string){
  
}

function MoveSubmit(move_string){
  // input case-insensitive string of the form 'B13C1' or 'W38'. First letter indicates marble color placed, second character is integer 1-4 indicating quadrant (Cartesian plane convention top-right is I, top-left is II, etc), third character is marble position 1-9 within quadrant (left-to-right, top-to-bottom), fourth optional character indicates rotation direction clockwise (C) or counter-clockwise (R), fifth optional character indicates quadrant rotated (required if fourth character present).
  //Returns: array of two objects, the first being True if move is valid and succeeds in updating game state, False in all other cases (illegal move, error updating, etc.). Second object is a message string describing the outcome, i.e. explaining the reason the move failed. (Can disregard message if True since it should be a copy of the input string.)

}

Listener
=> throws newMove event
  2. Event 'newMove' {              Elaboration of event details
      color: color_str,             'B' or 'W' (color of marble placed)
      quad: quadrant_int,           1-4 (quadrant of marble placement)
      position: pos_int,            1-9 (initially placed hole)
      rotate: quadrant_int,         0-4 (0 = no rotation)
      direction: direction_str,     'C' = clock, 'R' = counter, 'N' = none
    }


function getGame(game_id){
  // takes game_id string, returns array [exists_bool, state]
}

function isLegalMove(move_string){
  // takes input message from front-end,
}


////////// GENERAL PURPOSE CLASSES + STRUCTURES //////////

state representation
  array [arr_quadrants_positions, turns, to_move, result]

class game
  board
  move counter / color
  result
  db_connection (instantiate / load / process move => write to db)

class board
  quadrants
  update move
    isLegalMove
    update board
  print state
  load existing

class quadrant
  9 positions
  can rotate
  stringify => array of 9 B,W,O
  place marble, throw legal issue

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

  /*
  var helloWorld = firebase.functions().httpsCallable('helloWorld');

  // take input string s and write to firebase junk collection as initial test
  if (s == 'hi') {
    helloWorld().then((result) => {
      console.log(result);
      var sanitizedMessage = result;
      console.log('success hi sent');
      output_msg = sanitizedMessage;
    });
  } else {
    addJunk({ text: s, counter:junk_counter })
      .then((result) => {
        // Read result of the Cloud Function.
        var sanitizedMessage = result.data.text;
        console.log('success message sent');
        output_msg = sanitizedMessage;
      });
  }
  */
}


/*


  // test hello world get endpoint
  var get_url = window.location.href + '/helloWorld';
  console.log('get URL - ' + get_url);
  fetch(get_url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async (response) => {
    try {
      const data = await response.json();
      console.log('response data?', data);
    } catch(error) {
      console.log('Error happened here!');
      console.error(error);
   }
 }).then((data) => {
    if (data['error'] > 0){
      console.log('error happened');
      output_msg = 'error in hello world GET request';
    } else {
      console.log('success: ' + data.toString());
      output_msg = 'success for hello world GET request';
    }
  });

} else {
  var get_url = window.location.href + '/addMessage?input_string=' + s + '&counter=' + junk_counter.toString();
  console.log('get URL - ' + get_url)
  fetch(get_url).then((response) => {
    return response.json();
  }).then((data) => {
    if (data['error'] > 0){
      console.log('error happened');
      output_msg = 'error in addMessage GET request';
    } else {
      console.log('success: ' + data.toString());
      output_msg = 'success for addMessage GET request';
    }
  });
}

*/
