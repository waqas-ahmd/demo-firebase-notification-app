import "./App.css";
import { useEffect, useState } from "react";
import firebase from "./firebase";

function App() {
  const [token, setToken] = useState("");
  const messaging = firebase.messaging();
  useEffect(() => {
    messaging
      .getToken({
        vapidKey:
          "BCBAsqbh4y6UMX9eOVEFbwt_HVSkdQSdCgMu_Eo-cgsOE0HOpLaD7pnOWB8zIowPD8gLfxlzatNkekFJDvbOlw4",
      })
      .then((currentToken) => {
        if (currentToken) {
          setToken(currentToken);
        }
      });
  });

  const generateToken = async () => {
    await fetch("/.netlify/functions/sendNotification", {
      method: "POST",
      body: JSON.stringify({
        title: "This token is posted from client to server",
        token: token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      });
  };

  return (
    <div className="App">
      <button
        style={{
          padding: "10px",
          background: "orangered",
          color: "white",
          border: "none",
          margin: "5px",
          outline: "none",
        }}
        onClick={generateToken}
      >
        Get Notification
      </button>
      {token !== "" && (
        <div
          style={{
            margin: "auto",
            width: "500px",
            overflowX: "scroll",
            padding: "30px",
            background: "black",
            color: "white",
          }}
        >
          {token}
        </div>
      )}
    </div>
  );
}

export default App;
