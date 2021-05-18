var junk_counter = 0;

function andySubmitPress(){
  // take input and print it to output box, maybe do something with it
  var input_string = $('#andy-test-input').val();
  var server_msg = dumpJunkToFB(input_string);
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
  var addMessage = firebase.functions().httpsCallable('addMessage');
  var helloWorld = firebase.functions().httpsCallable('helloWorld');
  var output_msg='';
  // take input string s and write to firebase junk collection as initial test
  if (s == 'hi') {
    helloWorld().then((result) => {
      var sanitizedMessage = result.data.text;
      console.log('success hi sent');
      output_msg = sanitizedMessage;
    });
  } else {
    addMessage({ text_input: s, counter:junk_counter })
      .then((result) => {
        // Read result of the Cloud Function.
        var sanitizedMessage = result.data.text;
        console.log('success message sent');
        output_msg = sanitizedMessage;
      });
  }
  junk_counter ++;
  return output_msg;
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
