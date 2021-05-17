console.log(window.location.href);

var junk_counter = 0;

function andySubmitPress(){
  // take input and print it to output box, maybe do something with it
  var input_string = $('#andy-test-input').val();
  dumpJunkToFB(input_string);
  var current_output = $('#andy-test-output').val();
  if (current_output){
    $('#andy-test-output').val(current_output + '\n' + input_string);
  } else {
    $('#andy-test-output').val(input_string);
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
  // take input string s and write to firebase junk collection as initial test
  firebase.database().ref('junk/' + junk_counter).set({
    junk: s,
    counter: junk_counter
  });
}
