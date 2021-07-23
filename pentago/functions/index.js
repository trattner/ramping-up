const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
//const cors = require('cors')({origin: true});
const game_root = '/test-games/';


exports.startNewGame = functions.https.onCall((data, context) => {
  const game_name = data.name;
  const game_state_string = data.state;
  functions.logger.info('creating new game: ' + game_name);
  var output_msg = '';

  return admin.database().ref(game_root + game_name).set({
    0: game_state_string
  }).then(() => {
    functions.logger.info('New game ' + game_name + ' successfully created.');
    return { msg: 'created new game ' + game_name, bool: true };
  }).catch((error) => {
    // Re-throwing the error as an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('unknown', error.message, error);
  });
});


exports.makeMove = functions.https.onCall((data, context) => {
  const game_name = data.name;
  const new_move_string = data.move;
  functions.logger.info('making new move ' + new_move_string + ' in game ' + game_name);
  var output_msg = '';

  return admin.database().ref(game_root + game_name).update({
    1: new_move_string
  }).then(() => {
    functions.logger.info('Move ' + new_move_string + ' successfully made.');
    return { msg: 'made move ' + new_move_string + ' in game ' + game_name, bool: true };
  }).catch((error) => {
    // Re-throwing the error as an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('unknown', error.message, error);
  });
});

exports.loadExistingGame = functions.https.onCall((data, context) => {
  const game_name = data.name;
  const dbRef = admin.database().ref();
  dbRef.child(game_root).child(game_name).get().then((snapshot) => {
    if (snapshot.exists()) {
      functions.logger.info(snapshot.val());
      var game_state = [];
      //var key = Object.keys(snapshot.val())[0];
      //var output = snapshot.val()[key].text.toString();
      return {
        exists: true,
        state: game_state
      };
    } else {
      return {
        exists: false,
        state: []
      };
    }
  }).catch((error) => {
    console.error(error);
    return error;
  });
});


/*
// dummy endpoint
exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(req, res, () => {
      functions.logger.info("Hello logs!", {structuredData: true});
      response.send("Hello from Firebase!");
    })
});*/


exports.helloWorld = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', '*');

  if (request.method === 'OPTIONS') {
    response.end();
  } else {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
  }
});

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.addMessage3 = functions.https.onRequest( (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.end();
  } else {
    try {
      functions.logger.info(req);
      /*
      const root = admin.database().ref();
      admin.database().ref("/test_message/" + req.counter).set(req.text);
      res.json({result: 'cool'});*/
    } catch(err) {
      functions.logger.info(err.message);
    }



    /*
    const original = req.query.text;
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('messages').add({original: original});
    // Send back a message that we've successfully written the message
    res.json({result: `Message with ID: ${writeResult.id} added.`});
    */
  }
});

exports.readJunk = functions.https.onCall((data, context) => {
  const counter = data.counter;
  const dbRef = admin.database().ref();
  dbRef.child("messages").child(counter).get().then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      var key = Object.keys(snapshot.val())[0];
      var output = snapshot.val()[key].text.toString();
      console.log(output);
      return output;
    } else {
      console.log("No data available");
      return "No data available";
    }
  }).catch((error) => {
    console.error(error);
    return error;
  });
});


exports.addJunk = functions.https.onCall((data, context) => {
  const text = data.text;
  const counter = data.counter;
  functions.logger.info(text);
  // Authentication / user information is automatically added to the request.
  //const uid = context.auth.uid || null;
  //const name = context.auth.token.name || null;
  //const picture = context.auth.token.picture || null;
  //const email = context.auth.token.email || null;

  return admin.database().ref('/messages/' + counter).push({
    text: text,
    counter: counter
    //author: { uid, name, picture, email },
  }).then(() => {
    console.log('New Message written');
    // Returning the sanitized message to the client.
    return { text: text };
  }).catch((error) => {
    // Re-throwing the error as an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError('unknown', error.message, error);
    });


/*
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.end();
  } else {
    try {
      // Grab the text parameter.
      const original = req.query.text;
      functions.logger.info(original);
      // Push the new message into Database.
      const result = await admin.database().ref('junk/').set({
        text: original
      }, (error) => {
        if (error) {
          res.json({result: `Junk FAILED: "${original}" `});
        } else {
          res.json({result: `Junk SUCCESS: "${original}" `});
        }
      });
    } catch(err){
      functions.logger.info(err.message);
      res.json({result:`ERROR - ${err.message}`});
    }
  }*/
});


// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().collection('messages').add({original: original});
  // Send back a message that we've successfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
    .onCreate((snap, context) => {
      // Grab the current value of what was written to Firestore.
      const original = snap.data().original;

      // Access the parameter `{documentId}` with `context.params`
      functions.logger.log('Uppercasing', context.params.documentId, original);

      const uppercase = original.toUpperCase();

      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to Firestore.
      // Setting an 'uppercase' field in Firestore document returns a Promise.
      return snap.ref.set({uppercase}, {merge: true});
    });
