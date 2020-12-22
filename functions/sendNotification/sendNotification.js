var admin = require("firebase-admin");

var serviceAccount = {
  type: "service_account",
  project_id: "custom-notification-app",
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email:
    "firebase-adminsdk-usgkj@custom-notification-app.iam.gserviceaccount.com",
  client_id: "106371842359218757591",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-usgkj%40custom-notification-app.iam.gserviceaccount.com",
};

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
