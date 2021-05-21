
var moveCounter = 1;

function makeMove(clickedEle){
  if(clickedEle.charAt(0) == 'N'){
    if(moveCounter == 1){
      changeColor(clickedEle);
    }
    if(moveCounter == 2){
      /*For rotating quad on white turn*/
      rotateQuad();
      checkWin();
    }
    if(moveCounter == 3){
      changeColor(clickedEle);
    }
    if(moveCounter == 4){
      /*For rotating quad on black turn*/
      rotateQuad();
      checkWin();
    }
    moveCounter = moveCounter + 1;
    if(moveCounter == 5){
      moveCounter = 1;
    }
  }
  else{
    console.log("Illegal Move");
  }
  return;
}

function changeColor(eleId){
  var newColor;
  var newColorId;
  if(moveCounter == 1){
    newColorId = "W";
    newColor = '#FFFFFF';
  }
  if(moveCounter == 3){
    newColorId = "B";
    newColor = '#000000';
  }
  var newId = newColorId + eleId.charAt(1) + eleId.charAt(2);
  document.getElementById(eleId).id = newId;
  document.getElementById(newId).style.backgroundColor = newColor;
  return;
}

function rotateQuad(){
  console.log("Rotate");
  return;
}

function checkWin(){
  console.log("Did someone win");
}

/* CORE INTERFACE SPEC - communication protocol between front and back-end

  1. MoveSubmit(s) ==> [output_boolean, output_string_2]

    Description: Client submits move (clicking the pentago board). Front-end code calls this function at some point. Function verifies if move is legal on the back-end, updates database + internal game state accordingly, and outputs result in array for front-end to display messages to user and/or update the game display.

    Input: case-insensitive string of the form 'B13C1' or 'W38'. First letter indicates marble color placed, second character is integer 1-4 indicating quadrant (Cartesian plane convention top-right is I, top-left is II, etc), third character is marble position 1-9 within quadrant (left-to-right, top-to-bottom), fourth optional character indicates rotation direction clockwise (C) or counter-clockwise (R), fifth optional character indicates quadrant rotated (required if fourth character present).

    Returns: array of two objects, the first being True if move is valid and succeeds in updating game state, False in all other cases (illegal move, error updating, etc.). Second object is a message string describing the outcome, i.e. explaining the reason the move failed. (Can disregard message if True since it should be a copy of the input string.)

  2. Event 'newMove' {              Elaboration of event details
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
