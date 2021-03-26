const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.sendNotificationToFCMToken = functions.firestore.document('users/{uid}/chats/{cUid}').onWrite(async event => {
  const authorUid = event.after.get('uid');
  const trainerUid = event.after.get('trainer');
  if (trainerUid) {
    const lastUid = event.after.get('last_message_from');
    const online = event.after.get('online').length;
    if (online < 2 && event.after.get('new_messages')) {
      const body = event.after.get('last_message');
      const title = event.after.get('last_message_name');
      const uidNeeded = lastUid === authorUid ? trainerUid : authorUid;
      const userDoc = await admin.firestore().doc(`users/${uidNeeded}`).get();
      const token = userDoc.get('token');

      let response = await admin.messaging().sendToDevice(
        token,
        {
          notification: {
            title,
            body,
            sound: 'default',
            vibrate: 'true'
          },
        },
        {
          // Required for background/quit data-only messages on iOS
          contentAvailable: true,
          // Required for background/quit data-only messages on Android
          priority: 'high',
        },
      );
    }
  }
});

exports.removeUser = functions.https.onCall(async data => {
  admin.auth().deleteUser(data.uid)
    .then(function() {
      return {
        message: 'User deleted!',
      }
    })
    .catch(function(error) {
      return error
    });
});
