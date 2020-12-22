var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const handler = async (event) => {
  var registrationToken = JSON.parse(event.body).token;
  var message = {
    data: {
      score: "850",
      time: "2:45",
    },
    token: registrationToken,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });

  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Message Sent" }),
    };
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
